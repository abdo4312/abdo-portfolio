# shared

## Overview
Small reusable UI primitives shared across portfolio sections: decorative corner marks, an image lightbox dialog wrapper, and a section header layout.

## Interface
- `CornerMarks` (default export) — renders four absolutely positioned corner glyphs for framed containers. [CornerMarks.tsx:CornerMarks]
- `ImageLightbox` (default export) — props `{src, alt, caption?, open, onClose}`; renders a `<dialog>` lightbox with backdrop-click-to-close and ESC/close handling. [ImageLightbox.tsx:ImageLightbox]
- `SectionHeader` (default export) — props `{eyebrow, title, meta?}`; renders standardized section eyebrow/title/meta block. [SectionHeader.tsx:SectionHeader]

## Invariants
- `ImageLightbox` synchronizes the native dialog `open` state with the `open` prop using `showModal()`/`close()`. [ImageLightbox.tsx:ImageLightbox]
- Backdrop click closes only when the event target is the dialog itself. [ImageLightbox.tsx:ImageLightbox]

## Side Effects
- `ImageLightbox` imperatively controls a `<dialog>` element (modal display/close). [ImageLightbox.tsx:ImageLightbox]
- `SectionHeader` and `CornerMarks` have no side effects.

## Verification
- Run: `npm run typecheck`
- Run: `npm run lint`
