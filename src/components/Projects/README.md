# Projects

## Overview
Project presentation components for the portfolio "Work" section. Renders project metadata from `src/data/projects`, provides screenshot enlargement via `ImageLightbox`, and links to case studies when available.

## Interface
- `ProjectTabs` (default export) — section `#work`; maps `projects` to `ProjectCard`s and resolves case-study hrefs (special cases for `aroma`/`bookstore`, otherwise `getCaseStudyBySlug`). Uses `useInView` for reveal. [ProjectTabs.tsx:ProjectTabs,getCaseStudyHref]
- `ProjectCard` (default export) — displays a single `Project` summary (image, key points, stack, metric, title block) with screenshot enlarge action and optional case-study CTA. [ProjectCard.tsx:ProjectCard]

## Invariants
- Project lists render in the order provided by `projects` data / props. [ProjectTabs.tsx:ProjectTabs]
- Lightbox open state is local to the card (`enlarged` boolean) and closes via `onClose`. [ProjectCard.tsx:ProjectCard]
- Case-study link resolution is deterministic from project id/slug lookup. [ProjectTabs.tsx:getCaseStudyHref]

## Side Effects
- Uses viewport intersection observation via `useInView` in `ProjectTabs`. [ProjectTabs.tsx:useInView]
- Renders `ImageLightbox` which controls a `<dialog>` element (see shared contract). [ProjectCard.tsx:ImageLightbox]

## Verification
- Run: `npm run typecheck`
- Run: `npm run lint`
