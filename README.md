# Abdelrhman Khaled Diab | Portfolio

A personal portfolio built as a set of engineering blueprints. Every project opens as a technical sheet: the stack, the role, the constraints, and the decisions behind it, instead of a wall of screenshots.

Live site: **https://abdo-portfolio-three.vercel.app**

## What is inside

- A home page with seven sections: hero, about, selected work, process, engineering decisions, tech specs, and contact.
- Three case studies, each with its own layout, gallery, and written reasoning.
- A full mobile layout under 1024px with a bottom tab bar and a single column flow.
- A blueprint design system: grid background, squared corners, mono labels, and one accent color.

## Case studies

| Sheet | Project | Type | Stack | Role |
| --- | --- | --- | --- | --- |
| A-01 | Bookstore Order Manager | Windows desktop | Electron, React, TypeScript, SQLite, Supabase | Solo developer: architecture, UI, both backends |
| A-02 | Road to Islam | Android | React, Capacitor, 17 native Java files | Solo developer: React UI and the native Android layer |
| A-03 | Aroma Corner | Web | React, Zustand, TanStack Query, Zod | Product and UX direction, AI assisted |

The Bookstore app runs seasonal school book reservations for a real shop, in Arabic, with local first storage and versioned releases. Road to Islam is a daily practice companion with prayer times, Qibla, and a learning program. Aroma Corner is a coffee box builder with a shared cart across two routes.

## Stack

- React 19 and TypeScript
- Vite 8
- Tailwind CSS 4
- GSAP for scroll and entrance animation
- React Router 7

No backend. The site is a static single page app, and all content lives in `src/data`.

## Design system

The visual language is a drafting sheet, not a marketing page.

| Token | Value |
| --- | --- |
| Background | `#0B0E14` |
| Surface | `#11161F` |
| Primary | `#4FA8E0` |
| Glow | `#7EC4F0` |
| Grid line | `#1E2A3A` |
| Text | `#E8EDF2` |
| Secondary text | `#8694A3` |
| Muted text | `#4A5768` |
| Critical | `#D9534F` |

Type: Archivo for display, Inter for body, JetBrains Mono for labels and measurements.

Rules: no rounded corners, no drop shadows, one accent color, and every section carries a number or a revision tag. The tokens are declared once in `src/index.css` under `@theme` and used through Tailwind classes.

## Project structure

```
src/
  components/     one folder per home section, plus shared primitives
  pages/          HomePage and the case study pages, each with its own CSS
  data/           projects.ts and caseStudies.ts, the single source of content
  hooks/          useActiveSection, useInView, useMediaQuery, useGlitchPulse
  styles/         glitch, neon trace, and shared animation keyframes
  assets/         project screenshots
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Home |
| `/work/bookstore` | Bookstore Order Manager |
| `/work/aroma` | Aroma Corner |
| `/work/:slug` | Remaining case studies, driven by `src/data` |

`vercel.json` rewrites every path to `index.html` so deep links resolve on refresh.

## Run it locally

```bash
npm install
npm run dev        # dev server
npm run build      # type check plus production build
npm run preview    # serve the built output
npm run lint       # eslint
```

## Deploy

The repository is connected to Vercel. Every push to `main` builds and deploys to production, and pull requests get their own preview URL. Nothing else is needed: no environment variables, no server.

## Editing content

Projects are objects in `src/data/projects.ts`. Each one carries its sheet code, title, viewport, role, stack, key points, metric, and gallery. Case study text lives in `src/data/caseStudies.ts`. Adding a project means adding an object, not touching layout code.
