# Hero

## Overview
Landing hero section for the portfolio home page. Displays identity, CTAs, verified stats, and a "Selected Builds" panel. Entry animation is driven by GSAP when `entered` becomes true (with reduced-motion handling).

## Interface
- `Hero` (default export) — props `{ entered: boolean }`; renders section `#top` with hero copy, CTAs, stat tiles (`STATS`), and build summaries (`BUILDS`). [Hero.tsx:Hero]
- Uses `CornerMarks` for decorative frame marks. [Hero.tsx:CornerMarks]

## Invariants
- Pre-entry state sets hero-animated elements to hidden/offset; on entry, elements animate or snap visible depending on `prefers-reduced-motion`. [Hero.tsx:Hero]
- Stats and builds render in the fixed order of local `STATS`/`BUILDS` arrays. [Hero.tsx:STATS,BUILDS]

## Side Effects
- Uses GSAP (`gsap.set`/`gsap.fromTo`) to mutate animated element styles. [Hero.tsx:Hero]

## Verification
- Run: `npm run typecheck`
- Run: `npm run lint`
