# Footer

## Overview
Site footer with identity/location block, section navigation links, contact links, and copyright/status line.

## Interface
- `Footer` (default export) — renders `<footer>` with static `SECTIONS` anchors and contact links (mailto, GitHub). [Footer.tsx:Footer]
- `SECTIONS` — local array of in-page navigation targets (`label`, `href`). [Footer.tsx:SECTIONS]

## Invariants
- Copyright year is computed from `new Date().getFullYear()` at render time. [Footer.tsx:Footer]
- External GitHub link uses `target="_blank"` with `rel="noopener noreferrer"`. [Footer.tsx:Footer]

## Side Effects
- None (navigation is handled by anchor elements).

## Verification
- Run: `npm run typecheck`
- Run: `npm run lint`
