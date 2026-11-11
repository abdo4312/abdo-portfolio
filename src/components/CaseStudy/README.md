# CaseStudy

## Overview
Components that render the case-study gallery. Provides station-based image galleries with lightbox enlargement and insight bubbles: a two-column grid of station cards on desktop and a swipeable carousel below 1024px.

## Interface
- `CaseStudyGallery` (default export) — picks the layout with `useMediaQuery('(min-width: 1024px)')`: a two-column grid of `GalleryStation` on desktop, `GalleryCarousel` otherwise. Manages enlarged image state and mounts `ImageLightbox`. [CaseStudyGallery.tsx:CaseStudyGallery]
- `GalleryStation` (default export) — renders one station. Default variant is a card with header, difficulty badge, an image grid where each image is a button, and a `GalleryInsightBubble`. The `compact` variant is the centered carousel slide. Reports visibility via `useInView`; invokes `onEnlarge` for the lightbox. [GalleryStation.tsx:GalleryStation]
- `GalleryCarousel` (default export) — horizontal scroll-snap carousel of compact `GalleryStation` slides with previous/next buttons and an `n / total` counter. [GalleryCarousel.tsx:GalleryCarousel]
- `GalleryInsightBubble` (default export) — displays "UNDER THE HOOD" insight text with a randomly selected word that pulses via `useGlitchPulse`. [GalleryInsightBubble.tsx:GalleryInsightBubble]

## Invariants
- Gallery enlargement state holds a single `GalleryImage | null`; lightbox renders only when an image is selected. [CaseStudyGallery.tsx:CaseStudyGallery]
- Difficulty labels, classes and tones are derived from `StationDifficulty` via local mapping helpers. [GalleryStation.tsx:difficultyLabel,difficultyClass,difficultyTone]
- Carousel index is derived from the track scroll position and clamped to the station range. [GalleryCarousel.tsx:handleScroll]
- Insight glitch target word index is chosen once per mount (`useState` initializer). [GalleryInsightBubble.tsx:GalleryInsightBubble]

## Side Effects
- Observes viewport intersection via `useInView` in stations. [GalleryStation.tsx:useInView]
- Subscribes to the `(min-width: 1024px)` media query in `CaseStudyGallery`. [CaseStudyGallery.tsx:useMediaQuery]
- `GalleryCarousel` scrolls its track programmatically and reads `prefers-reduced-motion` and the computed text direction when navigating. [GalleryCarousel.tsx:goTo]

## Verification
- Run: `npm run typecheck`
- Run: `npm run lint`
