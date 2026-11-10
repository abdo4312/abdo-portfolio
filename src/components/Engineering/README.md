# Engineering

## Overview
Static "Engineering Decisions" section presenting per-project architecture/implementation decisions as cards. Content is local constant data rendered into the portfolio section layout.

## Interface
- `EngineeringDecisions` (default export) — renders section `#decisions` with a `SectionHeader` and a grid of decision articles sourced from `DECISIONS`. [EngineeringDecisions.tsx:EngineeringDecisions]
- `DECISIONS` — local array of decision records (`ref`, `kind`, `project`, `decision`, `detail`, `tags`). [EngineeringDecisions.tsx:DECISIONS]

## Invariants
- Decision cards render in the fixed order defined by `DECISIONS`. [EngineeringDecisions.tsx:DECISIONS,EngineeringDecisions]

## Side Effects
- None.

## Verification
- Run: `npm run typecheck`
- Run: `npm run lint`
