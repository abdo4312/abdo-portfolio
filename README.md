# Auto code review setup

Copy into the project root (overwrite package.json scripts / lint-staged):

    tools/review-report.mjs      ESLint + optional n8n -> reports/code-review.html
    tools/code-review-watch.js   re-runs the review on every save
    tools/review-client.mjs      manual n8n client (optional)
    .lintstagedrc.mjs            runs the review on staged files
    .husky/pre-commit            "npx lint-staged"   (then: chmod +x .husky/pre-commit)
    package.json                 scripts: review, review:watch, typecheck (lint-staged key removed)

Run:
    npm run review:watch   # while coding
    npm run review         # whole project once
    git commit             # blocked automatically if there are errors
Optional n8n rules: REVIEW_URL=http://localhost:5678/webhook/code-review npm run review

## Autosave

Commit and push automatically once edits settle, instead of remembering to do it.

    npm run autosave                            # commit + push after 60s without edits
    AUTOSAVE_DEBOUNCE_MS=15000 npm run autosave # shorter settle window

Watches `src/`, `public/` and the root config files. Empty diffs produce no
commit. A blocked commit (lint-staged) or a failed push is written to
`reports/autosave.log` and retried on the next change.

<!-- autosave probe -->
