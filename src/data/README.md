# data

## Overview
Static typed data modules used by portfolio pages and components. Contains project card metadata (images, stack, metrics, galleries) and evidence-backed case study content for dynamic case-study rendering.

## Interface
- `projects.ts`
  - `ProjectKeyPoint` — key point item (`number`, `text`). [projects.ts:ProjectKeyPoint]
  - `GalleryImage` — image + caption pair. [projects.ts:GalleryImage]
  - `Project` — project record (id/labels, viewport, role/stack, key points, metric, title block, image, optional gallery). [projects.ts:Project]
  - `projects` — exported array of `Project` entries (`bookstore`, `road-to-islam`, `aroma`) with imported asset URLs. [projects.ts:projects]
- `caseStudies.ts`
  - Types: `StationDifficulty`, `CaseStudyStation`, `CaseStudyFeature`, `CaseStudyChallengePiece`, `CaseStudyPlaybackMode`, `CaseStudyContent`. [caseStudies.ts:StationDifficulty,CaseStudyStation,CaseStudyFeature,CaseStudyChallengePiece,CaseStudyPlaybackMode,CaseStudyContent]
  - `caseStudies` — exported array of case study content objects (currently includes `road-to-islam`). [caseStudies.ts:caseStudies]
  - `getCaseStudyBySlug(slug)` — lookup helper returning matching `CaseStudyContent` or `undefined`. [caseStudies.ts:getCaseStudyBySlug]

## Invariants
- Data is module-static and read-only at runtime; consumers render in array order. [projects.ts:projects,caseStudies.ts:caseStudies]
- `getCaseStudyBySlug` performs a direct slug equality lookup over `caseStudies`. [caseStudies.ts:getCaseStudyBySlug]
- Case study content includes explicit evidence/policy comments and is intended to remain grounded in cited sources (enforced by content convention in module comments). [caseStudies.ts]

## Side Effects
- Module-scope asset imports resolve image URLs via the bundler (Vite). [projects.ts,caseStudies.ts]

## Verification
- Run: `npm run typecheck`
- Run: `npm run lint`
