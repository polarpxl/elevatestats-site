# 404 ("Off-side.") Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the default Vercel 404 with a custom on-brand "Off-side." 404 page on the elevatestats-site marketing site.

**Architecture:** A single Next.js App Router special file (`src/app/not-found.tsx`) renders inside the existing `Nav` and `FooterCta` chrome. The page is a server component with no state, no motion, and no images — a typographic `404` sits just above a full-bleed brand-blue rink line to literally demonstrate an off-side, with a witty headline and two CTAs underneath.

**Tech Stack:** Next.js 16 App Router, React 19, Tailwind CSS 4, existing `Nav` / `FooterCta` / `Container` / `Button` primitives, existing brand color tokens (`--color-brand-blue`, `--color-ink`, `--color-brand-gray`, `--color-surface-alt`).

**Spec:** [docs/superpowers/specs/2026-05-03-not-found-page-design.md](../specs/2026-05-03-not-found-page-design.md)

**Verification approach:** This codebase has no automated test runner (only `eslint` and `next build` in `package.json` scripts). Verification per task is the appropriate combination of: visual inspection in the dev server, ESLint, and a production build. Each task ends with a commit on a known-good state.

**Files touched (entire plan):**
- Create: `src/app/not-found.tsx`

That is the only file change. No edits to `Nav`, `FooterCta`, `Container`, `Button`, brand tokens, or any other file.

---

## Task 1: Create not-found.tsx with content (no off-side line yet)

**Goal of this task:** Land a working 404 page rendering Nav + a centered section (sr-only label, big `404`, headline, subhead, two buttons) + FooterCta. The off-side line and skid marks come in Task 2 — this task ends with the page already useful and committable.

**Files:**
- Create: `src/app/not-found.tsx`

- [ ] **Step 1: Create the file with the full Task-1 content**

Write `src/app/not-found.tsx` with exactly this content:

```tsx
import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { FooterCta } from '@/components/sections/FooterCta'
import { Nav } from '@/components/sections/Nav'
import { links } from '@/lib/links'

export const metadata: Metadata = {
  title: 'Page not found — Elevate Hockey Stats',
  description: "That page isn't here. Head home or check support.",
}

export default function NotFound() {
  return (
    <>
      <Nav />
      <main>
        <section className="bg-surface-alt py-20 md:py-28 lg:py-32">
          <Container>
            <div className="text-center">
              <span className="sr-only">Error 404 — page not found.</span>
              <p
                aria-hidden="true"
                className="font-heading text-7xl font-extrabold leading-none tracking-tight text-ink md:text-8xl lg:text-9xl"
              >
                404
              </p>

              <h1 className="mt-8 font-heading text-4xl font-extrabold tracking-tight text-ink md:mt-10 md:text-5xl lg:text-6xl">
                Off-side.
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-lg text-brand-gray md:text-xl">
                You&apos;re a step ahead of us. That page isn&apos;t here yet.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="/" variant="primary" size="lg">
                  Take me home
                </Button>
                <Button href={links.support} variant="secondary" size="lg">
                  Visit support
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <FooterCta />
    </>
  )
}
```

- [ ] **Step 2: Start the dev server (background) and visit a non-existent route**

Run in background: `npm run dev`

Then open `http://localhost:3000/__force-not-found-test` in a browser (any path that doesn't match an existing route).

Expected:
- Nav renders at the top.
- A light-gray section in the middle shows: a giant `404`, the headline `Off-side.`, the subhead, and two buttons (`Take me home` orange, `Visit support` white).
- The gradient CTA + dark footer (`FooterCta`) renders at the bottom.
- No console errors in the browser dev tools.

- [ ] **Step 3: Run lint**

Run: `npm run lint`

Expected: exits with status 0, no errors or warnings introduced by `src/app/not-found.tsx`.

- [ ] **Step 4: Commit**

```bash
git add src/app/not-found.tsx
git commit -m "$(cat <<'EOF'
feat(404): add custom not-found page with Off-side. headline

Replaces the default Vercel 404 with an on-brand page that renders
inside the standard Nav + FooterCta chrome. This task ships the
typography and CTAs; the off-side rink-line visual gag follows in a
separate commit.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Add the off-side line and skid marks

**Goal of this task:** Add the visual gag — a full-bleed brand-blue line below the `404` digits, with two small angled skid-mark strokes crossing it. The digits sit *above* the line so the page literally demonstrates an off-side.

**Files:**
- Modify: `src/app/not-found.tsx`

**Implementation approach (locked, resolving the spec's "open question"):**
- The line is a full-bleed sibling of the `Container`, not inside it. Because `Container` constrains width via `max-w-*` + horizontal padding, a plain `<div className="w-full h-1.5 ...">` outside the `Container` is naturally edge-to-edge within the section.
- The skid marks are an inline SVG positioned absolutely on a `relative` wrapper around the line. They use `currentColor` so a single `text-ink/40` class controls their tint, keeping them in sync with the brand ink token.

- [ ] **Step 1: Modify `src/app/not-found.tsx` to its final shape**

Replace the entire file with:

```tsx
import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { FooterCta } from '@/components/sections/FooterCta'
import { Nav } from '@/components/sections/Nav'
import { links } from '@/lib/links'

export const metadata: Metadata = {
  title: 'Page not found — Elevate Hockey Stats',
  description: "That page isn't here. Head home or check support.",
}

export default function NotFound() {
  return (
    <>
      <Nav />
      <main>
        <section className="bg-surface-alt py-20 md:py-28 lg:py-32">
          <Container>
            <div className="text-center">
              <span className="sr-only">Error 404 — page not found.</span>
              <p
                aria-hidden="true"
                className="font-heading text-7xl font-extrabold leading-none tracking-tight text-ink md:text-8xl lg:text-9xl"
              >
                404
              </p>
            </div>
          </Container>

          {/* Off-side rink line: full-bleed sibling of Container */}
          <div className="relative mt-4 md:mt-6">
            <div className="h-1.5 w-full bg-brand-blue md:h-2" />
            {/* Skid marks crossing the line, slightly left of center */}
            <svg
              aria-hidden="true"
              viewBox="0 0 40 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              className="absolute left-[28%] -top-1 h-4 w-10 text-ink/40 md:-top-1.5 md:h-5 md:w-12"
            >
              <line x1="6" y1="2" x2="14" y2="14" />
              <line x1="22" y1="2" x2="30" y2="14" />
            </svg>
          </div>

          <Container>
            <div className="text-center">
              <h1 className="mt-8 font-heading text-4xl font-extrabold tracking-tight text-ink md:mt-10 md:text-5xl lg:text-6xl">
                Off-side.
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-lg text-brand-gray md:text-xl">
                You&apos;re a step ahead of us. That page isn&apos;t here yet.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button href="/" variant="primary" size="lg">
                  Take me home
                </Button>
                <Button href={links.support} variant="secondary" size="lg">
                  Visit support
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <FooterCta />
    </>
  )
}
```

- [ ] **Step 2: Reload the dev server tab and inspect the visual**

Hard-refresh `http://localhost:3000/__force-not-found-test` in the browser.

Expected:
- The brand-blue (cyan) line runs edge-to-edge across the section, *below* the `404` digits.
- The `404` digits sit *above* the line with a small visible gap — selling the "off-side" gag.
- Two short dark angled strokes cross the line on the left side (~28% from the left edge).
- `Off-side.` headline appears below the line, then subhead and buttons.
- No horizontal scrollbar on the page (confirms the line isn't overflowing the viewport).
- Verify on mobile width as well (resize devtools to ~375px): digits remain centered, line spans the full width, skid marks remain visible.

- [ ] **Step 3: Run lint**

Run: `npm run lint`

Expected: exits with status 0, no new errors or warnings.

- [ ] **Step 4: Commit**

```bash
git add src/app/not-found.tsx
git commit -m "$(cat <<'EOF'
feat(404): add brand-blue rink line and skid marks for off-side gag

The 404 digits now sit above a full-bleed brand-blue line with two
small skid-mark strokes crossing it, literally demonstrating an
off-side and earning the headline copy.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Verify HTTP 404 status, lint, and production build

**Goal of this task:** Confirm the page actually returns HTTP 404 (Next.js does this automatically for `not-found.tsx`, but trust-but-verify), and that the change passes the project's full lint + build pipeline.

**Files:**
- None modified in this task unless lint or build surfaces an issue.

- [ ] **Step 1: Verify HTTP 404 status from the dev server**

With the dev server still running, run:

```bash
curl -sI http://localhost:3000/__force-not-found-test | head -1
```

Expected: `HTTP/1.1 404 Not Found`

If the status is anything other than 404, stop and investigate before proceeding — the App Router should set 404 automatically for unmatched routes that hit `not-found.tsx`, so a non-404 means something is misconfigured.

- [ ] **Step 2: Stop the dev server**

Stop the background `npm run dev` process before running `next build` (they can't share the same port).

- [ ] **Step 3: Run lint a final time**

Run: `npm run lint`

Expected: exits with status 0.

- [ ] **Step 4: Run production build**

Run: `npm run build`

Expected:
- Build completes successfully (exit status 0).
- TypeScript compilation succeeds (no type errors).
- The output route table includes a `/_not-found` entry (Next.js's internal name for the App Router 404 special file).

If type errors surface, fix them in `src/app/not-found.tsx` and re-run the build.

- [ ] **Step 5: If any fixes were needed in steps 3 or 4, commit them**

```bash
git status
# If src/app/not-found.tsx is modified:
git add src/app/not-found.tsx
git commit -m "$(cat <<'EOF'
fix(404): address lint/build issues surfaced during verification

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

If nothing changed in steps 3 or 4, this step is a no-op — skip the commit.

---

## Self-review (already performed)

- **Spec coverage:** Every requirement in the spec maps to a step.
  - File location, page structure, metadata → Task 1, Step 1.
  - 404 typography, sr-only label, headline, subhead, buttons → Task 1, Step 1.
  - Off-side line, skid marks, full-bleed implementation → Task 2, Step 1.
  - Accessibility (aria-hidden on decorative bits, sr-only label, real Button components) → Task 1, Step 1.
  - Responsive sizing → Task 1 + Task 2 className stacks; verified Task 2, Step 2.
  - HTTP 404 status → Task 3, Step 1.
- **Placeholder scan:** No `TBD`, `TODO`, "implement later", or hand-wave language. Every step has either complete code, an exact command, or an explicit visual-check instruction.
- **Type/name consistency:** Component imports (`Button`, `Container`, `FooterCta`, `Nav`) and `links.support` match the existing exports (`src/components/ui/Button.tsx`, `src/components/ui/Container.tsx`, `src/components/sections/FooterCta.tsx`, `src/components/sections/Nav.tsx`, `src/lib/links.ts`). The full file contents in Task 2, Step 1 are a strict superset of Task 1, Step 1 — no renamed identifiers between tasks.
- **Scope:** Single file. No drift.
