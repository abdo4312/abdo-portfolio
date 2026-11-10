# Navbar

## Overview
Fixed top navigation for the portfolio. Handles in-page hash navigation across routes by normalizing targets to the home route and scrolling with header offset.

## Interface
- `Navbar` (default export) — renders header/nav links (`LINKS`) and a disabled language switch placeholder. [Navbar.tsx:Navbar]
- `scrollToHash(hash)` — scrolls to element by hash, applying fixed-header offset; scrolls to top for empty id. [Navbar.tsx:scrollToHash]
- `navigateToHash(navigate, location, href)` — builds target path (`/` + hash when off home) and navigates via React Router. [Navbar.tsx:navigateToHash]
- `LINKS` — static navigation config for home/about/work/contact anchors. [Navbar.tsx:LINKS]

## Invariants
- Hash scrolling runs in `useLayoutEffect` when `location.hash` changes. [Navbar.tsx:Navbar]
- Link clicks prevent default anchor behavior and route through `navigateToHash`. [Navbar.tsx:handleLinkClick]

## Side Effects
- Reads DOM (`document.getElementById`, `document.querySelector('header')`) and calls `window.scrollTo`. [Navbar.tsx:scrollToHash]
- Uses React Router navigation (`useNavigate`) to change location. [Navbar.tsx:navigateToHash]

## Verification
- Run: `npm run typecheck`
- Run: `npm run lint`
