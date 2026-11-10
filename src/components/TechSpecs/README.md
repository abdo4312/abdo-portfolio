# TechSpecs

## Overview
Static "Tech Stack" section that lists tools grouped into suites, with project usage labels. Uses intersection observer to reveal the section.

## Interface
- `TechSpecs` (default export) — renders section `#tools` with `SectionHeader`, suite cards, and a source note. [TechSpecs.tsx:TechSpecs]
- `SUITES` — local constant describing suite ids, titles, and item `{name, used}` entries. [TechSpecs.tsx:SUITES]
- Uses `CornerMarks` and `useInView`. [TechSpecs.tsx:CornerMarks,useInView]

## Invariants
- Suites and items render in the fixed order defined by `SUITES`. [TechSpecs.tsx:SUITES,TechSpecs]
- Reveal transition is controlled by `visible` from `useInView<HTMLElement>(0.1)`. [TechSpecs.tsx:TechSpecs]

## Side Effects
- Observes viewport intersection via `useInView` (IntersectionObserver). [TechSpecs.tsx:useInView]

## Verification
- Run: `npm run typecheck`
- Run: `npm run lint`
