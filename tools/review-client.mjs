#!/usr/bin/env node
// Sends changed files to the n8n code-review webhook and prints the findings.
// Usage:  node review-client.mjs                 -> staged git files
//         node review-client.mjs src/a.ts b.tsx  -> specific files
// Env:    REVIEW_URL (default: http://localhost:5678/webhook/code-review)
//         MIN_SEVERITY = low | medium | high | critical
import { execSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';

const URL = process.env.REVIEW_URL || 'http://localhost:5678/webhook/code-review';
const args = process.argv.slice(2);
const list = args.length
  ? args
  : execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf8' }).split('\n').filter(Boolean);

const files = list
  .filter((f) => /\.(ts|tsx|js|jsx|mjs|cjs)$/.test(f) && existsSync(f))
  .map((path) => ({ path, content: readFileSync(path, 'utf8') }));

if (!files.length) { console.log('No JS/TS files to review.'); process.exit(0); }

const res = await fetch(URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ files, options: { minSeverity: process.env.MIN_SEVERITY || 'low' } }),
});
const report = await res.json();

for (const f of report.files) {
  for (const x of f.findings) {
    console.log(`${f.filePath}:${x.line}  [${x.severity}/${x.category}] ${x.message}`);
  }
}
const s = report.summary;
console.log(`\n${s.totalFindings} issue(s) in ${s.filesWithIssues}/${s.totalFiles} file(s) — ${report.passed ? 'PASSED' : 'FAILED (critical/high found)'}`);
process.exit(report.passed ? 0 : 1);
