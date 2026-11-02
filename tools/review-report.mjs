#!/usr/bin/env node
// Runs ESLint (+ optionally the n8n workflow), writes reports/code-review.html,
// opens it in the browser when there are errors, and exits 1 so the commit stops.
//
// Usage:  node review-report.mjs                -> all .ts/.tsx files in src/
//         node review-report.mjs src/a.tsx ...  -> specific files (lint-staged passes these)
// Env:    REVIEW_URL = n8n webhook URL (optional, adds the extra n8n rules)
//         OPEN=0     = never open the browser
import { spawnSync, spawn } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, appendFileSync } from 'node:fs';
import { resolve, relative, join } from 'node:path';

const CODE = /\.(ts|tsx)$/;
const OUT_DIR = 'reports';
const OUT = join(OUT_DIR, 'code-review.html');
const N8N_URL = process.env.REVIEW_URL || '';

// ESLint rules that catch "silent" failures
const SILENT = new Set([
  '@typescript-eslint/no-floating-promises',
  '@typescript-eslint/no-misused-promises',
  '@typescript-eslint/await-thenable',
  '@typescript-eslint/require-await',
  '@typescript-eslint/ban-ts-comment',
  'no-empty',
]);

function walk(dir, acc = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', 'dist', '.git', 'reports'].includes(e.name)) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, acc); else acc.push(p);
  }
  return acc;
}

const args = process.argv.slice(2);
const files = (args.length ? args : existsSync('src') ? walk('src') : [])
  .filter((f) => CODE.test(f) && existsSync(f))
  .map((f) => resolve(f));

if (!files.length) { console.log('No .ts/.tsx files to review.'); process.exit(0); }

const findings = []; // { file, line, severity, source, rule, message, silent }

// ---------- 1) ESLint ----------
const es = spawnSync('npx', ['eslint', '--format', 'json', ...files], {
  encoding: 'utf8',
  maxBuffer: 64 * 1024 * 1024,
  shell: process.platform === 'win32',
});
let results;
try {
  results = JSON.parse(es.stdout);
} catch {
  console.error(es.stderr || es.stdout || 'ESLint failed to run.');
  process.exit(1);
}
for (const r of results) {
  for (const m of r.messages) {
    findings.push({
      file: relative(process.cwd(), r.filePath),
      line: m.line || 1,
      severity: m.severity === 2 ? 'error' : 'warning',
      source: 'eslint',
      rule: m.ruleId || 'parse-error',
      message: m.message,
      silent: SILENT.has(m.ruleId),
    });
  }
}

// ---------- 2) n8n workflow (optional) ----------
let n8nNote = N8N_URL ? 'n8n workflow: OK' : 'n8n workflow: skipped (REVIEW_URL not set)';
if (N8N_URL) {
  try {
    const payload = files.map((f) => ({ path: relative(process.cwd(), f), content: readFileSync(f, 'utf8') }));
    const res = await fetch(N8N_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ files: payload }),
      signal: AbortSignal.timeout(8000),
    });
    const report = await res.json();
    for (const f of report.files || []) {
      for (const x of f.findings) {
        findings.push({
          file: f.filePath,
          line: x.line,
          severity: x.severity === 'critical' || x.severity === 'high' ? 'error' : 'warning',
          source: 'n8n',
          rule: x.rule,
          message: x.message,
          silent: x.category === 'silent_bug',
        });
      }
    }
  } catch (e) {
    n8nNote = 'n8n workflow: unreachable (' + e.message + ')';
  }
}

// ---------- 3) HTML report ----------
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const errors = findings.filter((f) => f.severity === 'error').length;
const warnings = findings.length - errors;
const silent = findings.filter((f) => f.silent).length;

const byFile = new Map();
for (const f of findings) {
  if (!byFile.has(f.file)) byFile.set(f.file, []);
  byFile.get(f.file).push(f);
}
const reviewed = files.map((f) => relative(process.cwd(), f));
const cleanFiles = reviewed.filter((f) => !byFile.has(f));

const sections = [...byFile.entries()].map(([file, list]) => {
  list.sort((a, b) => a.line - b.line);
  const rows = list.map((f) => `
      <tr>
        <td class="ln">${f.line}</td>
        <td><span class="badge ${f.severity}">${f.severity}</span>${f.silent ? ' <span class="badge silent">silent bug</span>' : ''}</td>
        <td>${esc(f.message)}</td>
        <td class="rule">${esc(f.rule)}<br><small>${f.source}</small></td>
      </tr>`).join('');
  return `<section><h2>❌ ${esc(file)} <small>(${list.length})</small></h2>
    <table><thead><tr><th>Line</th><th>Type</th><th>Problem</th><th>Rule</th></tr></thead><tbody>${rows}</tbody></table></section>`;
}).join('\n');

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Code Review Report</title>
<style>
  :root { --bg:#fff; --fg:#1a1a1a; --card:#f5f5f4; --line:#e2e2df; --err:#b42318; --warn:#b54708; --ok:#067647; --silent:#6941c6; }
  @media (prefers-color-scheme: dark) { :root { --bg:#161615; --fg:#ecebe8; --card:#22221f; --line:#34342f; --err:#f97066; --warn:#fdb022; --ok:#47cd89; --silent:#b692f6; } }
  body { font-family: system-ui, sans-serif; background:var(--bg); color:var(--fg); margin:0; padding:24px; max-width:1000px; margin-inline:auto; }
  h1 { margin:0 0 4px; } .sub { opacity:.65; margin-bottom:20px; }
  .cards { display:flex; gap:12px; flex-wrap:wrap; margin-bottom:24px; }
  .card { background:var(--card); border:1px solid var(--line); border-radius:10px; padding:12px 18px; min-width:120px; }
  .card b { display:block; font-size:26px; }
  section { margin-bottom:28px; } h2 { font-size:16px; word-break:break-all; } h2 small { opacity:.6; font-weight:400; }
  table { width:100%; border-collapse:collapse; display:block; overflow-x:auto; }
  th, td { text-align:left; padding:8px 10px; border-bottom:1px solid var(--line); vertical-align:top; }
  .ln { font-family:monospace; opacity:.8; } .rule { font-family:monospace; font-size:12px; } small { opacity:.6; }
  .badge { font-size:12px; padding:2px 8px; border-radius:99px; border:1px solid currentColor; white-space:nowrap; }
  .badge.error { color:var(--err); } .badge.warning { color:var(--warn); } .badge.silent { color:var(--silent); }
  .ok { color:var(--ok); }
</style></head><body>
<h1>${errors ? '❌ Code Review: issues found' : '✅ Code Review: clean'}</h1>
<div class="sub">${new Date().toLocaleString()} · ${reviewed.length} file(s) · ${esc(n8nNote)}</div>
<div class="cards">
  <div class="card"><b style="color:var(--err)">${errors}</b>errors</div>
  <div class="card"><b style="color:var(--warn)">${warnings}</b>warnings</div>
  <div class="card"><b style="color:var(--silent)">${silent}</b>silent bugs</div>
  <div class="card"><b class="ok">${cleanFiles.length}</b>clean files</div>
</div>
${sections || '<p class="ok">No problems found 🎉</p>'}
${cleanFiles.length ? `<section><h2 class="ok">✅ Clean files</h2><ul>${cleanFiles.map((f) => `<li>${esc(f)}</li>`).join('')}</ul></section>` : ''}
</body></html>`;

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT, html);

// keep reports out of git
if (existsSync('.gitignore') && !/^\/?reports\/?$/m.test(readFileSync('.gitignore', 'utf8'))) {
  appendFileSync('.gitignore', '\nreports/\n');
}

// ---------- 4) console summary + open ----------
for (const [file, list] of byFile) {
  console.log(`\n${file}`);
  for (const f of list) {
    console.log(`  ${f.line}  ${f.severity === 'error' ? 'error' : 'warn '}  ${f.silent ? '[silent] ' : ''}${f.message}  (${f.rule})`);
  }
}
console.log(`\n${errors} error(s), ${warnings} warning(s), ${silent} silent bug(s) in ${byFile.size}/${reviewed.length} file(s)`);
console.log('HTML report: ' + resolve(OUT));

if (errors && process.env.OPEN !== '0') {
  const [cmd, cmdArgs] =
    process.platform === 'darwin' ? ['open', [OUT]]
    : process.platform === 'win32' ? ['cmd', ['/c', 'start', '', OUT]]
    : ['xdg-open', [OUT]];
  try { spawn(cmd, cmdArgs, { detached: true, stdio: 'ignore' }).on('error', () => {}).unref(); } catch { /* ignore */ }
}

process.exit(errors ? 1 : 0);
