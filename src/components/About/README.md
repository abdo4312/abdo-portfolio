# About

## Overview
Portfolio "About" section component. Renders a profile card and a narrative column with production context, key project highlights, and a technology list. Visibility transitions are driven by an intersection observer hook.

## Interface
- `About` (default export) — React functional component; renders `<section id="about">` with profile metadata, explanatory copy, and tech chips. [About.tsx:About]
- Uses `GlitchSwap` for animated title text, `ReactiveFrame`/`CornerMarks`/`SectionHeader` for layout primitives, and `useInView` for reveal state. [About.tsx:GlitchSwap,ReactiveFrame,CornerMarks,SectionHeader,useInView]

## Invariants
- `PROFILE_ROWS` and `TECH` are static local arrays rendered in order. [About.tsx:PROFILE_ROWS,TECH]
- Section reveal class switches on `visible` from `useInView<HTMLElement>(0.2)`. [About.tsx:useInView]

## Side Effects
- None (pure render from props/local constants and hook state; no network, storage, or timers in this module).

## Verification
- Run: `npm run typecheck`
- Run: `npm run lint`
