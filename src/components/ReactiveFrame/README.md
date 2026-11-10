# ReactiveFrame

## Overview
Wrapper component that renders edge "glitch tick" markers around its container and activates nearby ticks based on global mouse proximity. Tick density adapts to container size.

## Interface
- `ReactiveFrame` (default export) — props `children`, `className`, `tickGap` (default 40), `radius` (default 55); renders content plus dynamically computed tick elements. [ReactiveFrame.tsx:ReactiveFrame]
- Helpers: `getTickPoint` maps tick side/position to coordinates for proximity checks. [ReactiveFrame.tsx:getTickPoint]

## Invariants
- Tick configuration is recomputed from container dimensions via `ResizeObserver`. [ReactiveFrame.tsx:ReactiveFrame]
- Mouse proximity checks are throttled with `requestAnimationFrame`; a tick activates by adding `is-active` and removes it on `animationend`. [ReactiveFrame.tsx:ReactiveFrame]

## Side Effects
- Observes container size with `ResizeObserver`. [ReactiveFrame.tsx:ReactiveFrame]
- Registers/removes global `window` `mousemove` listener and uses RAF; mutates tick DOM class lists directly via refs. [ReactiveFrame.tsx:ReactiveFrame]

## Verification
- Run: `npm run typecheck`
- Run: `npm run lint`
