# CaseStudy

## Overview
Components that render the case-study gallery and its animated SVG spine. Provides station-based image galleries with lightbox enlargement, insight bubbles, and a scroll-synchronized spine/track visualization driven by GSAP ScrollTrigger.

## Interface
- `CaseStudyGallery` (default export) — renders `GalleryStation` list from `CaseStudyStation[]`, manages enlarged image state, and mounts `ImageLightbox`. [CaseStudyGallery.tsx:CaseStudyGallery]
- `GalleryStation` (default export) — renders a station header, frame thumbnails (glitch layers), and a `GalleryInsightBubble`; reports visibility via `useInView`; invokes `onEnlarge` for lightbox. [GalleryStation.tsx:GalleryStation]
- `GalleryInsightBubble` (default export) — displays "UNDER THE HOOD" insight text with a randomly selected word that pulses via `useGlitchPulse`. [GalleryInsightBubble.tsx:GalleryInsightBubble]
- `CaseStudySpine` (default export) — wraps children in a spine zone and builds an SVG spine/track overlay synchronized to scroll; uses GSAP + `ScrollTrigger` and DOM measurements (`data-spine-*` markers). [CaseStudySpine.tsx:CaseStudySpine]

## Invariants
- Gallery enlargement state holds a single `GalleryImage | null`; lightbox renders only when an image is selected. [CaseStudyGallery.tsx:CaseStudyGallery]
- Difficulty labels/classes are derived from `StationDifficulty` via local mapping helpers. [GalleryStation.tsx:difficultyLabel,difficultyClass]
- Insight glitch target word index is chosen once per mount (`useState` initializer). [GalleryInsightBubble.tsx:GalleryInsightBubble]
- Spine animation is skipped (`prefers-reduced-motion: reduce`) and paths/nodes are revealed without timeline drawing. [CaseStudySpine.tsx:CaseStudySpine]

## Side Effects
- Registers GSAP `ScrollTrigger` plugin at module load. [CaseStudySpine.tsx:gsap.registerPlugin]
- `CaseStudySpine` reads layout/DOM (`getBoundingClientRect`/offset measurements), creates GSAP timelines/ScrollTriggers and event listeners (resize/load/fonts/image listeners, RAF, timeouts), and cleans them up on unmount. [CaseStudySpine.tsx:CaseStudySpine]
- Observes viewport intersection via `useInView` in stations/gallery consumers. [GalleryStation.tsx:useInView]

## Verification
- Run: `npm run typecheck`
- Run: `npm run lint`
