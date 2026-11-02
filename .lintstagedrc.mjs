export default {
  // 1) review only the staged files (ESLint + optional n8n) -> blocks the commit on errors
  '*.{ts,tsx}': (files) => `node tools/review-report.mjs ${files.map((f) => JSON.stringify(f)).join(' ')}`,
}
