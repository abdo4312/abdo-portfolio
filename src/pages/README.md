# pages

## Overview
Route-level page components for the portfolio SPA. Includes the home page composition, dynamic case-study rendering (slug-driven), and bespoke case-study pages for Aroma and Bookstore with rich section layouts and assets.

## Interface
- `HomePage` (default export) — composes site sections (`Hero`, `About`, `ProjectTabs` (Work), `Process`, `TechSpecs`, `EngineeringDecisions`, `Contact`, `Footer`), manages first-entry curtain state via `sessionStorage`, and passes `siteRef`/`onComplete` to `Curtain` and `entered` to `Hero`. [HomePage.tsx:HomePage]

- `CaseStudyPage` (default export) — route `/work/:slug`; looks up content via `getCaseStudyBySlug`, scrolls to top on slug change, renders a not-found state or a full case-study layout with `CaseStudySpine`, `CaseStudyGallery`, and content sections. [CaseStudyPage.tsx:CaseStudyPage]
- `AromaCaseStudyPage` (default export) — dedicated `/work/aroma` page with custom hero/meta, image figures, and reveal/presentation sections; uses local presentation helpers for figures, reveal sections, and a shopping-flow diagram (not module exports). [AromaCaseStudyPage.tsx:AromaCaseStudyPage]
- `BookstoreCaseStudyPage` (default export) — dedicated `/work/bookstore` page with blueprint-style sections, figures, metrics/spec tables, diagrams, and internal/footer navigation handling; uses local presentation helpers (not module exports). [BookstoreCaseStudyPage.tsx:BookstoreCaseStudyPage]

## Invariants
- `HomePage` shows `Curtain` only when `sessionStorage.hasEntered !== 'true'`; completion hides curtain and unblocks hero entry animation. [HomePage.tsx:HomePage]
- `CaseStudyPage` returns a not-found UI when no case study matches the route slug. [CaseStudyPage.tsx:CaseStudyPage]
- Page components render using shared layout primitives (`Navbar`, `BlueprintBackground`) and route links consistent with `App` routes. [CaseStudyPage.tsx,HomePage.tsx,AromaCaseStudyPage.tsx,BookstoreCaseStudyPage.tsx]

## Side Effects
- Reads `sessionStorage` key `hasEntered` in `HomePage` to decide first-entry curtain state; `Curtain` writes `hasEntered='true'` on completion (session-driven UI state). [HomePage.tsx:HomePage,Curtain.tsx:Curtain]

- Calls `window.scrollTo({ top: 0 })` on case-study slug changes. [CaseStudyPage.tsx:CaseStudyPage]
- Uses intersection observers/reveal hooks and, in bespoke pages, DOM/asset loading patterns for presentation (no data mutation/network writes in module code). [CaseStudyPage.tsx,AromaCaseStudyPage.tsx,BookstoreCaseStudyPage.tsx]

## Verification
- Run: `npm run typecheck`
- Run: `npm run lint`
