# Curtain

## Overview
Intro "curtain" overlay shown on first entry. Animates split panels and site scale on enter, then records entry in session storage and invokes completion callback.

## Interface
- `Curtain` (default export) — component accepting `siteRef` and `onComplete`; renders the curtain UI and an ENTER control that triggers GSAP exit animation. [Curtain.tsx:Curtain]

## Invariants
- While mounted, body scrolling is disabled and restored on cleanup/completion. [Curtain.tsx:Curtain,handleEnter]
- Initial site scale is set to `1.05` when `siteRef.current` exists. [Curtain.tsx:Curtain]

## Side Effects
- Mutates `document.body.style.overflow`. [Curtain.tsx:Curtain,handleEnter]
- Applies GSAP tweens/timeline to DOM refs and `siteRef` content. [Curtain.tsx:Curtain,handleEnter]
- Writes `sessionStorage` key `hasEntered='true'` on completion. [Curtain.tsx:handleEnter]

## Verification
- Run: `npm run typecheck`
- Run: `npm run lint`
