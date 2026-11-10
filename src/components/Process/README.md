# Process

## Overview
Static "How I Work" section describing the development workflow as ordered stage cards.

## Interface
- `Process` (default export) — renders section `#process` with `SectionHeader` and stage articles from `STAGES`. [Process.tsx:Process]
- `STAGES` — local array of stage records (`ref`, `name`, `text`). [Process.tsx:STAGES]

## Invariants
- Stages render in the fixed order defined by `STAGES`. [Process.tsx:STAGES,Process]

## Side Effects
- None.

## Verification
- Run: `npm run typecheck`
- Run: `npm run lint`
