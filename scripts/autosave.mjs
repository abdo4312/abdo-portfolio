#!/usr/bin/env node
/**
 * Autosave: watch the source tree, and after edits settle, commit and push.
 * No dependencies. Node 20+ (recursive fs.watch on Linux).
 *
 *   npm run autosave
 *   AUTOSAVE_DEBOUNCE_MS=15000 npm run autosave   # faster settle window
 *
 * Design choices:
 * - Debounce, not interval: nothing is committed while you are still typing.
 * - Empty diffs produce no commit, ever.
 * - A failed commit (lint-staged, hooks) or failed push is logged, not fatal.
 *   The next change retries.
 * - Log lives in reports/, which is gitignored, so it never commits itself.
 */
import { watch, mkdirSync, appendFileSync } from 'node:fs'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { resolve } from 'node:path'

const run = promisify(execFile)

const ROOT = resolve(import.meta.dirname, '..')
const DEBOUNCE = Number(process.env.AUTOSAVE_DEBOUNCE_MS ?? 60_000)
const TARGETS = [
  'src',
  'public',
  'index.html',
  'package.json',
  'vite.config.ts',
  'tsconfig.json',
  'tsconfig.app.json',
  'tsconfig.node.json',
  'eslint.config.js',
  'README.md',
]
const IGNORE = /(^|\/)(node_modules|dist|reports|\.git)(\/|$)/

const LOG_DIR = resolve(ROOT, 'reports')
const LOG_FILE = resolve(LOG_DIR, 'autosave.log')
mkdirSync(LOG_DIR, { recursive: true })

const stamp = () => new Date().toISOString().replace('T', ' ').slice(0, 19)
const log = (line) => {
  const entry = `[${stamp()}] ${line}\n`
  process.stdout.write(entry)
  appendFileSync(LOG_FILE, entry)
}

let timer = null
let saving = false
let pending = false

async function save() {
  if (saving) {
    pending = true
    return
  }
  saving = true
  try {
    const { stdout: status } = await run('git', ['status', '--porcelain'], { cwd: ROOT })
    if (!status.trim()) {
      log('nothing to save')
      return
    }
    const files = status.trim().split('\n').length
    await run('git', ['add', '-A'], { cwd: ROOT })
    const message = `chore(autosave): ${stamp()}`
    try {
      await run('git', ['commit', '-m', message], { cwd: ROOT })
    } catch (err) {
      log(`commit blocked: ${(err.stderr || err.message).toString().split('\n')[0]}`)
      return
    }
    log(`committed ${files} file(s)`)
    try {
      await run('git', ['push'], { cwd: ROOT })
      log('pushed')
    } catch (err) {
      log(`push failed, will retry: ${(err.stderr || err.message).toString().split('\n')[0]}`)
    }
  } finally {
    saving = false
    if (pending) {
      pending = false
      schedule()
    }
  }
}

function schedule() {
  if (timer) clearTimeout(timer)
  timer = setTimeout(save, DEBOUNCE)
}

let watched = 0
for (const target of TARGETS) {
  try {
    const watcher = watch(resolve(ROOT, target), { recursive: true }, (_event, filename) => {
      if (!filename || IGNORE.test(filename)) return
      schedule()
    })
    watcher.on('error', (err) => log(`watch error on ${target}: ${err.message}`))
    watched += 1
  } catch {
    // Target may not exist yet; skip it silently.
  }
}

log(`watching ${watched} target(s), settle window ${Math.round(DEBOUNCE / 1000)}s, root ${ROOT}`)
process.on('SIGINT', () => {
  log('stopped')
  process.exit(0)
})
