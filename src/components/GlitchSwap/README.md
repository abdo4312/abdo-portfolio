# GlitchSwap

## Overview
Text effect component that periodically swaps displayed text to an alternate string with a timed "glitch burst" CSS state. Activation is controlled by a `trigger` prop.

## Interface
- `GlitchSwap` (default export) — props `text`, `altText`, `trigger`, optional `intervalMs` (default 4000) and `className`; renders a `<span>` with glitch classes and `data-text`. [GlitchSwap.tsx:GlitchSwap]

## Invariants
- When `trigger` is false, no burst timers/intervals are scheduled. [GlitchSwap.tsx:GlitchSwap]
- Burst sequence toggles display `text → altText → text` and sets/removes `is-glitching` state on fixed delays. [GlitchSwap.tsx:GlitchSwap]

## Side Effects
- Schedules `setTimeout` and `setInterval` while active; clears all timers on cleanup or dependency change. [GlitchSwap.tsx:GlitchSwap]

## Verification
- Run: `npm run typecheck`
- Run: `npm run lint`
