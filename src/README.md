# src

## Overview
Application source root for the portfolio SPA (Vite + React + TypeScript). Defines the browser entry point, global styles, top-level router, and feature-organized modules for pages, components, data, and hooks.

## Interface
- `main.tsx` — browser/bootstrap entry; mounts React app into `#root` with `StrictMode` and `BrowserRouter`, and imports global styles. [main.tsx:createRoot,App]
- `App.tsx` — top-level route map (`/`, `/work/aroma`, `/work/bookstore`, `/work/:slug`) rendering page components. [App.tsx:App]
- `index.css` — global theme tokens, Tailwind import, base typography/scroll behavior, and body defaults. [index.css]

## Subdirectories & Boundaries
- [components](./components/README.md) — reusable and feature UI components (sections, case-study UI, effects, shared primitives).
- [data](./data/README.md) — typed static content for projects and case studies.
- [hooks](./hooks/README.md) — shared hooks for reveal/glitch timing behavior.
- [pages](./pages/README.md) — route-level page compositions and case-study pages.

## Invariants
- Routing is defined centrally in `App.tsx`; bespoke pages take precedence for `/work/aroma` and `/work/bookstore` before dynamic `/work/:slug`. [App.tsx:App]
- Application is mounted once from `main.tsx` under React `StrictMode`. [main.tsx]

## Side Effects
- `main.tsx` performs DOM mount into `document.getElementById('root')`. [main.tsx:createRoot]
- Global CSS is imported at entry (`index.css`). [main.tsx]

## Verification
- Run: `npm run typecheck`
- Run: `npm run lint`
