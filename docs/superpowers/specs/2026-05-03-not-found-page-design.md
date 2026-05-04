# Design — Custom 404 page ("Off-side.")

## Goal

Replace the default Vercel 404 (`404: NOT_FOUND`) shown on unmatched routes with an on-brand, witty 404 page that fits the rest of the marketing site. Keep the implementation small: one new file, no new dependencies, no licensed imagery.

## Voice and concept

- Headline copy: **"Off-side."**
- Subhead: **"You're a step ahead of us. That page isn't here yet."**
- Visual gag: a giant `404` numeral block sits *just above* a horizontal brand-blue rink line, literally demonstrating an off-side. Two small dark "skid marks" cross the line below the digits to sell the motion.

## Architecture

- **File:** new `src/app/not-found.tsx` — Next.js App Router special file. Automatically rendered for unmatched routes and when `notFound()` is called from a server component. This satisfies all 404 cases on the marketing site.
- **No new components.** Reuses `Nav`, `FooterCta`, `Container`, `Button` from existing `src/components`.
- **No data or state.** Pure static markup; can be a server component (no `'use client'`).
- **No motion library required.** Page is static; no Framer Motion.

## Page structure

```tsx
<Nav />
<main>
  <NotFoundSection />
</main>
<FooterCta />
```

`NotFoundSection` is defined inline in `not-found.tsx` (no separate component file — it has one consumer).

## Section layout

A single `<section>` with vertical rhythm matching the Hero (`py-20 md:py-28 lg:py-32`) and `bg-surface-alt` so it sits as a distinct surface above the gradient `FooterCta`.

Inside, centered, in this stacking order:

1. **Screen-reader-only label** — `<span className="sr-only">Error 404 — page not found.</span>`. Ensures screen readers always get the error context, since the visual `404` is decorative.
2. **Giant `404` digits** — `aria-hidden="true"`. Classes: `font-heading font-extrabold tracking-tight text-ink text-7xl md:text-8xl lg:text-9xl leading-none`. Centered.
3. **Off-side line** — full-bleed horizontal `bg-brand-blue` stripe. Sits ~16–24px below the digits' visual baseline. Approximate spacing: `mt-4 md:mt-6` on the line wrapper. Height `h-1.5 md:h-2`. The line breaks out of the `Container` via a wrapping div with negative horizontal margins (e.g. `-mx-4 sm:-mx-6 lg:-mx-8` matching `Container`'s padding) — or the simpler approach: render the line as a sibling of the `Container`, positioned absolutely inside the `<section>` at the right vertical offset. Implementation detail to be decided in the plan; both yield the same visual.
4. **Skid marks** — two short angled SVG strokes (~20px long, ~30deg from horizontal, `stroke-ink`, `stroke-width="2"`, `opacity-40`), positioned on top of the line slightly left of center (~25–35% from the left). Inline SVG; `aria-hidden`.
5. **Headline `<h1>`** — text "Off-side." Classes: `mt-8 md:mt-10 font-heading font-extrabold tracking-tight text-ink text-4xl md:text-5xl lg:text-6xl`.
6. **Subhead `<p>`** — text "You're a step ahead of us. That page isn't here yet." Classes: `mx-auto mt-5 max-w-xl text-lg md:text-xl text-brand-gray`.
7. **Buttons row** — `mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center`:
    - `<Button href="/" variant="primary" size="lg">Take me home</Button>`
    - `<Button href={links.support} variant="secondary" size="lg">Visit support</Button>`

## Metadata

Exported from `not-found.tsx`:

```ts
export const metadata: Metadata = {
  title: 'Page not found — Elevate Hockey Stats',
  description: "That page isn't here. Head home or check support.",
}
```

Next.js automatically returns HTTP 404 for the App Router `not-found.tsx` file — no manual status handling needed.

## Accessibility

- Screen readers receive "Error 404 — page not found." via the `sr-only` label, then the H1 "Off-side." for context.
- Decorative `404` digits and skid-mark SVG are `aria-hidden`.
- Buttons are real `<Button>` components (anchors under the hood) — keyboard-focusable, with the existing focus-ring styles.
- Color contrast: `text-ink` on `bg-surface-alt` (existing brand pairing, already passes AA elsewhere on the site).

## Responsive behavior

- Digits scale: `text-7xl` (mobile) → `text-8xl` (md) → `text-9xl` (lg). Line height `leading-none` keeps the off-side gap consistent.
- Buttons stack vertically on mobile; row on `sm:` and up.
- Blue line stays full-bleed at all sizes. Skid marks scale down marginally on mobile (use `w-4 md:w-5` or equivalent).

## What this page does NOT do

- No animation, parallax, or motion effects.
- No images, photos, or illustrations beyond the inline SVG skid marks.
- No new design tokens; uses existing `--color-brand-blue`, `--color-ink`, `--color-brand-gray`, `--color-surface-alt`.
- No analytics events. (Can be added later if needed.)
- No localized copy; English only, matching the rest of the site.

## Files touched

- **Create:** `src/app/not-found.tsx`

That is the entire change.

## Open questions for the implementation plan

- Decide between absolute-positioned blue line vs. negative-margin full-bleed wrapper. Both work; pick whichever yields cleaner markup when implementing.
- Decide exact SVG geometry for the skid marks (length, angle, gap between the two strokes). Tune visually during implementation.
