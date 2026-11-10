# Contact

## Overview
Contact section with a mailto-based message form and direct contact links. No backend submission; form data is encoded into a `mailto:` URL and the user’s email client handles delivery.

## Interface
- `Contact` (default export) — React component rendering section `#contact` with name/email/message form, copy-to-clipboard email action, GitHub link, and location/status text. [Contact.tsx:Contact]

## Invariants
- Submission is handled client-side only: `handleSubmit` prevents default and navigates to a constructed `mailto:` URL. [Contact.tsx:handleSubmit]
- Email copy state (`copied`) is transient and reset after a timeout. [Contact.tsx:copyEmail]

## Side Effects
- On submit, sets `window.location.href` to a `mailto:` URL. [Contact.tsx:handleSubmit]
- Uses `navigator.clipboard.writeText` and `setTimeout` for copy feedback. [Contact.tsx:copyEmail]

## Verification
- Run: `npm run typecheck`
- Run: `npm run lint`
