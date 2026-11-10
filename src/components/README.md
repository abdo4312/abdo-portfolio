# components

## Overview
React UI components for the portfolio application, grouped by feature/section. Includes page sections (Hero, About, Work/Projects, Process, Tech Specs, Decisions, Contact, Footer), navigation/chrome (Navbar, Curtain, Background), case-study presentation (CaseStudy), and reusable primitives/effects (shared, ReactiveFrame, GlitchSwap). Page sections and chrome are composed by route-level pages in [../pages/README.md](../pages/README.md) (e.g., Home and CaseStudy pages).

## Subdirectories & Boundaries
- [About](./About/README.md) — profile/about section with static content, reveal state, and project/tech highlights.
- [Background](./Background/README.md) — fixed decorative blueprint grid + deterministic animated stars.
- [CaseStudy](./CaseStudy/README.md) — gallery stations, insight bubbles, lightbox integration, and GSAP ScrollTrigger spine visualization.
- [Contact](./Contact/README.md) — mailto-based contact form and copy-to-clipboard/direct links.
- [Curtain](./Curtain/README.md) — first-entry intro overlay with GSAP exit animation and session persistence.
- [Engineering](./Engineering/README.md) — static engineering decisions cards.
- [Footer](./Footer/README.md) — site footer navigation and contact/status information.
- [GlitchSwap](./GlitchSwap/README.md) — timed text swap/glitch burst effect controlled by trigger.
- [Hero](./Hero/README.md) — landing hero with GSAP entry animation, stats, and featured builds.
- [Navbar](./Navbar/README.md) — fixed header navigation with hash routing/scroll offset handling.
- [Process](./Process/README.md) — static workflow stages section.
- [Projects](./Projects/README.md) — project cards and case-study link resolution from project data.
- [ReactiveFrame](./ReactiveFrame/README.md) — mouse-proximity activated edge tick/glitch markers around framed content.
- [TechSpecs](./TechSpecs/README.md) — grouped tech stack listing with reveal animation.
- [shared](./shared/README.md) — reusable primitives (`CornerMarks`, `ImageLightbox`, `SectionHeader`).
