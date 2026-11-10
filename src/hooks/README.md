# hooks

## Overview
Custom React hooks used by portfolio UI for timed visual effects and viewport-based reveal behavior.

## Interface
- `useGlitchPulse(trigger, minMs?, maxMs?, burstMs?)` — returns `glitching: boolean`; schedules randomized pulse bursts while `trigger` is true (defaults: 3000–8000ms delay, 500ms burst). [useGlitchPulse.ts:useGlitchPulse]
- `useInView<T extends HTMLElement>(threshold?, rootMargin?)` — returns `{ ref, visible }` (attach `ref` to the DOM element to observe); uses `IntersectionObserver` (default `threshold=0.2`), sets `visible` once on first intersection, then disconnects. [useInView.ts:useInView]

## Invariants
- `useGlitchPulse` schedules the next burst only while triggered and cleans up timers on effect teardown/dependency changes. [useGlitchPulse.ts:useGlitchPulse]
- `useInView` is one-way: once visible, it remains `true` for the hook instance and the observer is disconnected. [useInView.ts:useInView]

## Side Effects
- `useGlitchPulse` uses `setTimeout`/`clearTimeout`. [useGlitchPulse.ts:useGlitchPulse]
- `useInView` creates/disconnects an `IntersectionObserver` and reads `ref.current`. [useInView.ts:useInView]

## Verification
- Run: `npm run typecheck`
- Run: `npm run lint`
