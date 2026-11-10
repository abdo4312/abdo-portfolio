# Scripts

## Overview
Utility scripts for the `abdo-portfolio` repository. This directory contains a file-watcher autosave tool that commits/pushes source changes and a CLI comment-stripping utility. Both files are executable Node.js scripts intended to be run directly (`#!/usr/bin/env node`) [autosave.mjs:1, clean-comments.js:1].

## Interface
- `autosave.mjs` (CLI script, no exports): watches configured repo paths and, after a debounce window, stages and commits/pushes changes when the working tree is dirty.
  - `stamp()` [autosave.mjs:43]: returns a local timestamp string (`YYYY-MM-DD HH:mm:ss`) used in logs and commit messages.
  - `log(line)` [autosave.mjs:44]: writes a timestamped entry to stdout and appends it to the autosave log file.
  - `save()` [autosave.mjs:54] (async): checks `git status --porcelain` [autosave.mjs:61]; if clean logs `"nothing to save"` [autosave.mjs:63]; otherwise runs `git add -A` [autosave.mjs:67] and `git commit -m "chore(autosave): <stamp>"` [autosave.mjs:68-70]; on commit success logs file count [autosave.mjs:75] and attempts `git push` [autosave.mjs:77]. Commit/push failures are caught and logged, not thrown [autosave.mjs:71-81].
  - `schedule()` [autosave.mjs:91]: clears any existing debounce timer and sets a new `setTimeout(save, DEBOUNCE)` [autosave.mjs:92-93].
  - Startup/CLI behavior: creates `reports/` log directory [autosave.mjs:39-41], watches each existing target with recursive `fs.watch` [autosave.mjs:97-108], logs startup state [autosave.mjs:110], and exits cleanly on `SIGINT` [autosave.mjs:111-114].
  - Configuration/constants: `ROOT` resolves to repo root [autosave.mjs:23]; `DEBOUNCE` defaults to `60000` ms via `AUTOSAVE_DEBOUNCE_MS` [autosave.mjs:24]; `TARGETS` lists watched paths (`src`, `public`, `index.html`, `package.json`, `vite.config.ts`, `tsconfig*.json`, `eslint.config.js`, `README.md`) [autosave.mjs:25-36]; `IGNORE` regex excludes `node_modules|dist|reports|.git` [autosave.mjs:37]; `LOG_FILE` is `reports/autosave.log` [autosave.mjs:40].
- `clean-comments.js` (CLI script, no exports): accepts a file path from `process.argv[2]` [clean-comments.js:5]; exits silently if missing or non-existent [clean-comments.js:6].
  - Behavior: reads file content [clean-comments.js:8]; removes non-JSDoc block comments via `/\/\*(?!\*)([\s\S]*?)\*\//g` [clean-comments.js:16]; performs a line-by-line heuristic to strip `//` comments outside single/double/backtick strings while preserving JSDoc-like lines (`trim().startsWith('*')` or containing `/**`) [clean-comments.js:19-57]; overwrites the file and prints `Cleaned comments in <file>` only when content changed [clean-comments.js:61-64].

## Invariants
- `autosave.mjs`: edits are debounced; `schedule()` resets the timer so commits occur after changes settle, not on an interval [autosave.mjs:91-94, autosave.mjs:99-101].
- `autosave.mjs`: an empty diff produces no commit (`git status --porcelain` must be non-empty) [autosave.mjs:61-65].
- `autosave.mjs`: only one save runs at a time; concurrent triggers set `pending` and re-schedule after completion [autosave.mjs:55-88].
- `autosave.mjs`: commit/push failures are logged and non-fatal; the watcher continues and future changes can retry [autosave.mjs:71-81, autosave.mjs:103].
- `clean-comments.js`: exits without action when no valid file argument is provided [clean-comments.js:5-6].
- `clean-comments.js`: comment stripping is heuristic (string/comment parsing is simplified), not a full parser; behavior is limited to what the script explicitly implements [clean-comments.js:11-18, clean-comments.js:27-49].

## Side Effects
- `autosave.mjs`: creates `reports/` directory and appends to `reports/autosave.log` [autosave.mjs:39-41, autosave.mjs:44-48]; writes log lines to stdout [autosave.mjs:46, autosave.mjs:110].
- `autosave.mjs`: installs recursive filesystem watchers on configured targets and schedules timers [autosave.mjs:92-93, autosave.mjs:97-104].
- `autosave.mjs`: executes Git commands in the repo root (`git status --porcelain`, `git add -A`, `git commit -m ...`, `git push`) [autosave.mjs:61, autosave.mjs:67, autosave.mjs:70, autosave.mjs:77].
- `autosave.mjs`: registers `SIGINT` handler that logs and calls `process.exit(0)` [autosave.mjs:111-114].
- `clean-comments.js`: reads the target file and overwrites it in place when modified [clean-comments.js:8, clean-comments.js:62]; writes status to stdout on modification [clean-comments.js:63].

## Verification
- Run: `npm run autosave` (invokes `node scripts/autosave.mjs` per package script context).
- Run: `node scripts/clean-comments.js <file>` (manual CLI verification on a target file; no automated test command identified in this directory).
