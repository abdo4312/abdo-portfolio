# Background

## Overview
Fixed, non-interactive blueprint-style background used behind the site. Combines a CSS grid layer with deterministically placed animated star points.

## Interface
- `BlueprintBackground` (default export) — React functional component; renders a fixed full-viewport decorative layer (`aria-hidden`, `pointer-events-none`). [BlueprintBackground.tsx:BlueprintBackground]
- `seeded` / `rand` — local deterministic PRNG helpers used to generate stable star positions across renders/loads. [BlueprintBackground.tsx:seeded]
- `STARS` — precomputed array of star descriptors (position, size, animation timing/peak opacity). [BlueprintBackground.tsx:STARS]

## Invariants
- Star field is generated once at module scope from a fixed seed (`42`), so layout does not vary per render. [BlueprintBackground.tsx:seeded,STARS]
- Background root is marked decorative (`aria-hidden="true"`) and non-interactive (`pointer-events-none`). [BlueprintBackground.tsx:BlueprintBackground]

## Side Effects
- None (no timers, observers, network, or storage in JS; animations are CSS-driven via `blueprint-background.css` custom properties). [BlueprintBackground.tsx:blueprint-background.css]

## Verification
- Run: `npm run typecheck`
- Run: `npm run lint`
