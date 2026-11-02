// Watches src/ and re-runs the full review whenever a .ts/.tsx file changes.
// Usage: npm run review:watch   (leave it running in a terminal while you code)
import { watch, existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

const SRC = 'src'
const DEBOUNCE_MS = 500
const CODE = /\.(ts|tsx)$/

if (!existsSync(SRC)) {
  console.error(`'${SRC}' folder not found. Run this from the project root.`)
  process.exit(1)
}

let timer = null
let running = false
let again = false

function notify(title, body) {
  // Linux desktop notification; silently ignored if notify-send isn't installed
  spawnSync('notify-send', ['-u', 'critical', title, body], { stdio: 'ignore' })
}

function run(reason) {
  if (running) { again = true; return }
  running = true
  console.clear()
  console.log(`🔍 Reviewing (${reason}) — ${new Date().toLocaleTimeString()}\n`)
  const r = spawnSync('node', ['tools/review-report.mjs'], {
    stdio: 'inherit',
    env: { ...process.env, OPEN: '0' },
  })
  if (r.status === 0) console.log('\n✅ Clean')
  else {
    console.log('\n❌ Fix the errors above (HTML: reports/code-review.html)')
    notify('Code review: errors found', `Changed: ${reason}`)
  }
  running = false
  if (again) { again = false; run('changes during review') }
}

watch(SRC, { recursive: true }, (_event, filename) => {
  if (!filename || !CODE.test(filename)) return
  clearTimeout(timer)
  timer = setTimeout(() => run(filename), DEBOUNCE_MS)
})

run('startup')
console.log('\n👀 Watching src/ … (Ctrl+C to stop)')
