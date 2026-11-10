# code-review-tools (Peanut)

Component package for the portfolio code-review toolchain. Type: module. Declared deps: `axios`, `chokidar` (the three entry scripts below use Node built-ins only).

## Entry points

- `code-review-watch.js` — watches `src/` for `.ts`/`.tsx` changes (debounce 500ms) and re-runs `tools/review-report.mjs`. Invoked as `npm run review:watch` from the project root. Runs a review immediately at startup via `run('startup')` [`code-review-watch.js:48`], then `watch(SRC, { recursive: true }, ...)` [`code-review-watch.js:42`].
- `review-client.mjs` — sends files to the n8n code-review webhook (`REVIEW_URL`, default `http://localhost:5678/webhook/code-review`) [`review-client.mjs:10`]. With no args, uses `git diff --cached --name-only --diff-filter=ACM` [`review-client.mjs:14`]; otherwise reviews the argv-listed files [`review-client.mjs:12`]. Prints findings and exits `0`/`1` by `report.passed` [`review-client.mjs:35`].
- `review-report.mjs` — runs ESLint (`npx eslint --format json`) [`review-report.mjs:47`] plus optional n8n webhook pass (`REVIEW_URL`, 8s abort timeout) [`review-report.mjs:78`], writes `reports/code-review.html` [`review-report.mjs:163`], optionally appends `reports/` to `.gitignore` [`review-report.mjs:166`], opens the HTML on errors unless `OPEN=0` [`review-report.mjs:180`], exits `1` on errors [`review-report.mjs:188`]. With no args, reviews all `.ts`/`.tsx` under `src/` via `walk('src')` [`review-report.mjs:38`]; accepts argv file lists [`review-report.mjs:38`].

## Interface

- `code-review-watch.js`:
  - `SRC = 'src'` [`code-review-watch.js:6`]
  - `DEBOUNCE_MS = 500` [`code-review-watch.js:7`]
  - `CODE = /\.(ts|tsx)$/` [`code-review-watch.js:8`]
  - `notify(title, body)` — `spawnSync('notify-send', ['-u','critical', title, body], { stdio: 'ignore' })` [`code-review-watch.js:19`]
  - `run(reason)` — clears console, spawns `node tools/review-report.mjs` with `OPEN=0`, handles `running`/`again` re-entrancy, notifies on errors [`code-review-watch.js:24`]
- `review-client.mjs`:
  - `URL` — `process.env.REVIEW_URL || 'http://localhost:5678/webhook/code-review'` [`review-client.mjs:10`]
  - Top-level CLI: argv files or git staged files [`review-client.mjs:12`]; `files = [{ path, content }]` via `readFileSync` [`review-client.mjs:17`]; `fetch` POST [`review-client.mjs:22`]; `process.exit(report.passed ? 0 : 1)` [`review-client.mjs:36`]
- `review-report.mjs`:
  - `CODE = /\.(ts|tsx)$/` [`review-report.mjs:13`]
  - `OUT_DIR = 'reports'` [`review-report.mjs:14`]
  - `OUT = join(OUT_DIR, 'code-review.html')` [`review-report.mjs:15`]
  - `N8N_URL = process.env.REVIEW_URL || ''` [`review-report.mjs:16`]
  - `SILENT = new Set([...])` — silent-failure ESLint rules [`review-report.mjs:19`]
  - `walk(dir, acc)` — recursive walk skipping `node_modules`, `dist`, `.git`, `reports` [`review-report.mjs:28`]
  - Top-level CLI [`review-report.mjs:37`]

## Invariants

- `code-review-watch.js`: exits `1` if `src/` does not exist [`code-review-watch.js:10`]
- `review-client.mjs`: exits `0` when no JS/TS files match [`review-client.mjs:20`]
- `review-report.mjs`: exits `0` when no `.ts`/`.tsx` files found [`review-report.mjs:42`]; ESLint JSON parse failure → `console.error` + `process.exit(1)` [`review-report.mjs:56`]; `process.exit(errors ? 1 : 0)` [`review-report.mjs:188`]

## Side effects

- `code-review-watch.js`: `console.clear()`/`console.log` stdout [`code-review-watch.js:27`]; `spawnSync('notify-send', ...)` Linux desktop notification [`code-review-watch.js:21`]; `spawnSync('node', ['tools/review-report.mjs'], { stdio: 'inherit' })` child process [`code-review-watch.js:29`]; recursive `fs.watch` on `src/` [`code-review-watch.js:42`]
- `review-client.mjs`: `execSync('git diff --cached ...')` reads git index [`review-client.mjs:14`]; `readFileSync` reads listed files [`review-client.mjs:18`]; `fetch` POST to `URL` [`review-client.mjs:22`]; `process.exit(0|1)` [`review-client.mjs:20`,`review-client.mjs:36`]
- `review-report.mjs`: `spawnSync('npx', ['eslint', ...])` runs ESLint [`review-report.mjs:47`]; `fetch` POST to `N8N_URL` with `AbortSignal.timeout(8000)` [`review-report.mjs:78`]; `mkdirSync('reports', { recursive: true })` + `writeFileSync('reports/code-review.html', ...)` [`review-report.mjs:162`]; conditional `appendFileSync('.gitignore', '\nreports/\n')` [`review-report.mjs:166`]; `spawn('open'|'cmd /c start'|'xdg-open', ..., { detached: true }).unref()` opens browser when errors and `OPEN !== '0'` [`review-report.mjs:180`]; `process.exit(0|1)` [`review-report.mjs:188`]
