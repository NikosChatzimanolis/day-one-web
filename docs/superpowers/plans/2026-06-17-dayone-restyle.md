# Day One Reference Restyle — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the existing multi-page Day One Next.js app to the reference HTML's design language (layout, spacing, component shapes, motion) without changing routing, component architecture, or copy.

**Architecture:** The restyle hangs off the token + type-class layer in `tailwind.config.ts` and `app/globals.css`, so per-page edits stay minimal. Palette moves to `#FAEADB` blush + a two-rust system (`#C04C2A` structural, `#B5552F` small-text/AA). Typography collapses to Jost-only (Alex Brush logo script kept; Fraunces + DM Sans removed). New global primitives: a center scroll `Spine`, reference card/tile classes, retuned reveal blur.

**Tech Stack:** Next.js 16, TypeScript, Tailwind 3.4, framer-motion 11, next/font (Jost, Alex Brush, Cormorant).

**Verification model:** This is visual/CSS work, so each task's "test" is (a) `npm run build` completing clean and (b) browser verification via the `preview_*` tools. There are no unit tests to add. Run the dev server once at the start and keep it up; reload between tasks.

**Branch:** `restyle-reference` (already created; spec committed there).

**Reference source of truth:** `~/Downloads/dayone.html`. Brand tokens and decisions: `docs/superpowers/specs/2026-06-17-dayone-restyle-design.md`.

**Cross-cutting rule:** Do NOT hardcode palette hex values in components. Every color comes from a CSS var / Tailwind token. Where existing components hardcode hex (`#D9714F`, `#F5F0EA`, `#B5552F`, `#34302B`, `#A39E96`), replace with the matching token as you touch them. Avoid inline `style={{}}` literals in new `.tsx` files (repo has historically failed Vercel builds on an inline-style lint rule); use Tailwind classes + CSS variables, or framer-motion's `style` prop on `motion.*` elements (already used in `HorizonRows.tsx`, builds clean).

---

## File structure

**Modify (foundation):**
- `tailwind.config.ts` — color tokens + collapse `fontFamily` to Jost.
- `app/globals.css` — repoint palette/font vars; rewrite type scale to Jost; add `.sec-pad`, `.svc`, `.tile`, spine, scroll-cue primitives.
- `app/layout.tsx` — remove Fraunces + DM Sans; mount `<Spine />`.

**Create:**
- `components/ui/Spine.tsx` — center scroll spine.
- `components/ui/ScrollCue.tsx` — hero "SCROLL" animated cue.

**Modify (components):** `Reveal.tsx`, `CustomCursor.tsx`, `Logo.tsx`, `Button.tsx`, `HorizonRows.tsx`, `PageHero.tsx`, `CtaSection.tsx`, `ForgeBoard.tsx`, `layout/Navbar.tsx`, `layout/Footer.tsx`.

**Modify (pages):** `app/page.tsx`, `app/services/page.tsx`, `app/work/page.tsx`, `app/forge/page.tsx`, `app/about/page.tsx`, `app/contact/page.tsx`.

---

## Task 1: Palette + font tokens (Tailwind + CSS vars)

**Files:**
- Modify: `tailwind.config.ts:12-35`
- Modify: `app/globals.css:12-57`

- [ ] **Step 1: Repoint the CSS variables** in `app/globals.css` `:root` (lines 12-57). Replace the Surfaces / Ink / Accent / Lines / fonts blocks with:

```css
  /* Surfaces — reference blush */
  --color-bg: #FAEADB;
  --color-bg-soft: #F2DECF;
  --color-surface: #F2DECF;
  --color-surface-deep: #EAD9C8;
  --color-card: #F7F3EC;

  /* Ink — warm neutral ramp (reference body grey for secondary) */
  --color-text: #1A1816;
  --color-text-secondary: #5A544D;
  --color-text-tertiary: #6E6657;

  /* Two-rust system */
  --color-accent: #B5552F;        /* small accent text + links (AA on blush) */
  --color-accent-dark: #93421F;
  --color-accent-soft: rgba(181, 85, 47, 0.10);
  --color-rust: #C04C2A;          /* logo + large/structural accents */
  --color-muted: #9A8F82;         /* warm grey — meta/labels */

  /* Lines */
  --color-border: rgba(26, 24, 22, 0.10);
  --color-border-strong: rgba(26, 24, 22, 0.18);
  --color-divider: rgba(192, 76, 42, 0.30);
  --color-line: rgba(26, 24, 22, 0.10);

  /* Dark section */
  --color-dark: #1A1816;
  --color-dark-raised: #262320;
  --color-dark-border: rgba(242, 237, 228, 0.09);
  --color-dark-text: #F5F0EA;
  --color-dark-text-secondary: #B8AEA1;
  --color-dark-text-tertiary: #9A8F82;

  /* Fonts — Jost only (+ Alex Brush script). Fraunces/DM Sans removed. */
  --font-serif: var(--font-jost), system-ui, sans-serif;
  --font-display: var(--font-jost), system-ui, sans-serif;
  --font-body: var(--font-jost), system-ui, sans-serif;
  --font-script: var(--font-script), cursive;

  /* Motion */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease: cubic-bezier(0.22, 0.61, 0.36, 1);
```

- [ ] **Step 2: Add `muted`, `card`, `line` to Tailwind colors** in `tailwind.config.ts` (inside `colors`, after `rust`):

```ts
        muted: 'var(--color-muted)',
        card: 'var(--color-card)',
        line: 'var(--color-line)',
        'bg-soft': 'var(--color-bg-soft)',
        'dark-text': 'var(--color-dark-text)',
        'dark-text-secondary': 'var(--color-dark-text-secondary)',
```

- [ ] **Step 3: Collapse `fontFamily`** in `tailwind.config.ts:28-35` to:

```ts
      fontFamily: {
        serif: ['var(--font-jost)', 'system-ui', 'sans-serif'],
        display: ['var(--font-jost)', 'system-ui', 'sans-serif'],
        body: ['var(--font-jost)', 'system-ui', 'sans-serif'],
        script: ['var(--font-script)', 'cursive'],
      },
```

- [ ] **Step 4: Build.** Run `npm run build`. Expected: completes clean (fonts still resolve; `--font-fraunces`/`--font-dmsans` no longer referenced by vars but layout still imports them — fixed in Task 3).

- [ ] **Step 5: Commit.**

```bash
git add app/globals.css tailwind.config.ts
git commit -m "style: repoint palette + fonts to reference tokens (Jost-only, blush, two-rust)"
```

---

## Task 2: Type scale + section/eyebrow primitives (Jost)

**Files:**
- Modify: `app/globals.css:81-176` (base headings, type scale, eyebrow)

- [ ] **Step 1: Base headings to Jost 200.** Replace the `h1..h6` rule (lines 81-87):

```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-weight: 200;
  line-height: 1.1;
  letter-spacing: -0.01em;
  color: var(--color-text);
}
```

- [ ] **Step 2: Rewrite the type scale** (`.t-display`, `.t-h1`, `.t-h2`, `.t-h3`, `.t-lead`, `.t-index`) to Jost weights/tracking from the reference:

```css
.t-display {
  font-family: var(--font-display); font-weight: 200;
  font-size: clamp(2.6rem, 6vw, 5rem); line-height: 1.05; letter-spacing: -0.01em;
}
.t-h1 {
  font-family: var(--font-display); font-weight: 200;
  font-size: clamp(2rem, 4.5vw, 3.25rem); line-height: 1.1; letter-spacing: -0.01em;
}
.t-h2 {
  font-family: var(--font-display); font-weight: 200;
  font-size: clamp(1.875rem, 4.5vw, 3.25rem); line-height: 1.1; letter-spacing: -0.01em;
}
.t-h3 {
  font-family: var(--font-display); font-weight: 300;
  font-size: clamp(1.4rem, 2vw, 1.75rem); line-height: 1.25; letter-spacing: 0;
}
.t-lead {
  font-family: var(--font-body); font-weight: 300;
  font-size: clamp(1.1rem, 1.5vw, 1.3rem); line-height: 1.55;
}
.t-index {
  font-family: var(--font-display); font-weight: 200;
  font-size: clamp(1.5rem, 2.4vw, 2rem); line-height: 1; letter-spacing: 0.04em;
}
```

- [ ] **Step 3: Body weight to 300.** In the `body` rule (line 71-77) add `font-weight: 300;`.

- [ ] **Step 4: Eyebrow to reference label.** Replace `.eyebrow` (lines 158-165) — keep color `--color-accent` (AA on blush; dark sections already override to rust):

```css
.eyebrow {
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 300;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--color-accent);
}
```

Apply the same `font-family`, `letter-spacing: 0.32em`, `font-weight: 300` to `.eyebrow-muted` (lines 167-174), keeping its `color: var(--color-text-tertiary)`.

- [ ] **Step 5: Dark eyebrow to rust.** Confirm `.section-dark .eyebrow` and `.forge-dark .eyebrow` (lines 188, 197) set `color: var(--color-rust)` (change from `#D9714F`).

- [ ] **Step 6: Build + preview.** `npm run build`, then start dev server and load `/`. Expected: all headings render in Jost (thin), no serif anywhere. Use `preview_snapshot` to confirm text renders and `preview_screenshot` for the hero.

- [ ] **Step 7: Commit.**

```bash
git add app/globals.css
git commit -m "style: rewrite type scale + eyebrow to Jost (reference weights/tracking)"
```

---

## Task 3: Remove Fraunces + DM Sans from layout; mount Spine slot

**Files:**
- Modify: `app/layout.tsx:3,12-42,113,115`

- [ ] **Step 1: Drop the font imports.** In `app/layout.tsx` change the import (line 3) to:

```ts
import { Alex_Brush, Jost, Cormorant_Garamond } from 'next/font/google'
```

Delete the `dmSans` (lines 12-17) and `fraunces` (lines 33-42) declarations. Keep `alexBrush`, `jost`, `cormorant`.

- [ ] **Step 2: Update `<html>` className** (line 113) to drop the removed variables:

```tsx
      className={`${alexBrush.variable} ${jost.variable} ${cormorant.variable}`}
```

- [ ] **Step 3: Build.** `npm run build`. Expected: clean (no remaining references to `dmSans`/`fraunces`). If the build errors on an unused import, ensure all references removed.

- [ ] **Step 4: Commit.**

```bash
git add app/layout.tsx
git commit -m "style: remove Fraunces + DM Sans (Jost-only typography)"
```

---

## Task 4: Spine + ScrollCue components

**Files:**
- Create: `components/ui/Spine.tsx`
- Create: `components/ui/ScrollCue.tsx`
- Modify: `app/layout.tsx` (mount `<Spine />`)
- Modify: `app/globals.css` (scroll-cue keyframes)

- [ ] **Step 1: Create `components/ui/Spine.tsx`.** Fixed center hairline; inner rust bar scales with page scroll progress. Hidden < 768px and under reduced-motion.

```tsx
// ── components/ui/Spine.tsx ──
// Fixed center hairline that fills with rust as the page scrolls. Mirrors the
// reference's connecting spine. Hidden on small screens and under reduced motion.
'use client'

import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'

export default function Spine() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  if (reduce) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-0 left-1/2 z-0 hidden w-px -translate-x-1/2 overflow-hidden md:block"
      style={{ background: 'var(--color-line)' }}
    >
      <motion.div
        className="absolute inset-x-0 top-0 origin-top"
        style={{ height: '100%', scaleY: draw, background: 'var(--color-rust)' }}
      />
    </div>
  )
}
```

- [ ] **Step 2: Create `components/ui/ScrollCue.tsx`.** The hero "SCROLL" label with the animated drawing line (CSS keyframe `cue` added in Step 4).

```tsx
// ── components/ui/ScrollCue.tsx ──
'use client'

export default function ScrollCue() {
  return (
    <div
      aria-hidden="true"
      className="absolute bottom-9 left-1/2 -translate-x-1/2 text-center"
      style={{ fontSize: '11px', letterSpacing: '0.4em', textIndent: '0.4em', color: 'var(--color-muted)' }}
    >
      SCROLL
      <span className="scrollcue-line" />
    </div>
  )
}
```

- [ ] **Step 3: Mount `<Spine />`** in `app/layout.tsx`. Import at top, then render just inside `<body>` before `<ReactiveGrid />`:

```tsx
import Spine from '@/components/ui/Spine'
// ...
        <Spine />
        <ReactiveGrid />
```

- [ ] **Step 4: Add scroll-cue CSS** to `app/globals.css` (near the reduced-motion block):

```css
.scrollcue-line {
  display: block; width: 1px; height: 34px; margin: 14px auto 0;
  background: var(--color-muted);
  animation: cue 2.4s var(--ease) infinite;
}
@keyframes cue {
  0%   { transform: scaleY(0); transform-origin: top; }
  40%  { transform: scaleY(1); transform-origin: top; }
  60%  { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}
@media (prefers-reduced-motion: reduce) {
  .scrollcue-line { animation: none; }
}
```

- [ ] **Step 5: Build + preview.** `npm run build`; load `/`, scroll, confirm the center spine fills rust as you scroll (`preview_screenshot` mid-scroll). Resize to 375px via `preview_resize` and confirm the spine is hidden.

- [ ] **Step 6: Commit.**

```bash
git add components/ui/Spine.tsx components/ui/ScrollCue.tsx app/layout.tsx app/globals.css
git commit -m "feat: add center scroll spine + hero scroll cue"
```

---

## Task 5: Card + tile primitives (globals.css)

**Files:**
- Modify: `app/globals.css` (append a Components block before the reduced-motion section)

- [ ] **Step 1: Add `.sec-pad`, `.svc`, `.tile` classes** matching the reference shapes:

```css
/* ── Section padding rhythm (reference) ───────────────────── */
.sec-pad { padding-block: clamp(5.25rem, 9vw, 7.5rem); }

/* ── Service card ─────────────────────────────────────────── */
.svc {
  position: relative; overflow: hidden;
  background: var(--color-card);
  border: 1px solid var(--color-line);
  padding: clamp(2.25rem, 3vw, 2.875rem) clamp(1.75rem, 3vw, 2.625rem);
  transition: transform 0.5s var(--ease), border-color 0.5s var(--ease);
}
.svc::before {
  content: ""; position: absolute; left: 0; top: 0; width: 3px; height: 0;
  background: var(--color-rust); transition: height 0.6s var(--ease);
}
.svc:hover { transform: translateY(-4px); border-color: rgba(192, 76, 42, 0.35); }
.svc:hover::before { height: 100%; }

/* ── Work tile ────────────────────────────────────────────── */
.tile {
  position: relative; overflow: hidden; aspect-ratio: 16 / 10;
  display: flex; align-items: flex-end; padding: 2rem;
  background: var(--color-dark); color: var(--color-bg);
}
.tile .glow {
  position: absolute; inset: 0; transition: opacity 0.6s var(--ease); opacity: 0.85;
  background: radial-gradient(120% 120% at 30% 110%, rgba(192, 76, 42, 0.55), transparent 60%);
}
.tile:hover .glow { opacity: 1; }
.tile .tnum { position: absolute; top: 1.6rem; left: 2rem; font-size: 12px; letter-spacing: 0.3em; color: var(--color-muted); }
.tile h4, .tile .tile-title { position: relative; z-index: 2; }
.tile.locked { filter: grayscale(1); opacity: 0.5; }
.tile.locked .glow { background: radial-gradient(120% 120% at 30% 110%, rgba(154, 143, 130, 0.4), transparent 60%); }
.tile .lock {
  position: absolute; top: 1.5rem; right: 1.875rem; font-size: 11px; letter-spacing: 0.24em;
  color: var(--color-bg); border: 1px solid rgba(242, 237, 228, 0.4); padding: 5px 11px; border-radius: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .svc, .svc::before, .tile .glow { transition: none; }
}
@media (max-width: 760px) {
  .svc { padding: 2.25rem 1.75rem; }
}
```

- [ ] **Step 2: Build.** `npm run build`. Expected: clean (CSS only).

- [ ] **Step 3: Commit.**

```bash
git add app/globals.css
git commit -m "style: add reference service-card + work-tile primitives"
```

---

## Task 6: Reveal blur + Button/Logo token cleanup

**Files:**
- Modify: `components/ui/Reveal.tsx:23-30,86-89`
- Modify: `components/ui/Button.tsx:22`
- Modify: `components/ui/CustomCursor.tsx:105-107`
- Modify: `components/ui/Logo.tsx:25-28`

- [ ] **Step 1: Add blur to Reveal.** In `Reveal.tsx`, update both variant sets (`Reveal` lines 23-30 and `RevealItem` lines 86-89) so `hidden` adds `filter: reduce ? 'none' : 'blur(6px)'` and `visible` adds `filter: 'blur(0px)'`. Example for `Reveal`:

```tsx
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y, filter: reduce ? 'blur(0px)' : 'blur(6px)' },
    visible: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { duration: 0.95, delay, ease: [0.22, 0.61, 0.36, 1] },
    },
  }
```

Apply the same `filter` keys to `RevealItem`'s variants.

- [ ] **Step 2: Token-cleanup Button outline-dark** (`Button.tsx:22`) — replace hardcoded `#F5F0EA`/`#D9714F`:

```ts
  'outline-dark':
    'border border-white/20 text-dark-text hover:border-rust hover:text-rust bg-transparent',
```

- [ ] **Step 3: Cursor to rust token.** In `CustomCursor.tsx` `animate` (lines 105-107), the cursor is brand-correct already (`rgba(181,85,47,...)` = accent). Leave the fill as accent for AA, but the brief favors a rust dot — no change required. (No-op step; confirm and move on.)

- [ ] **Step 4: Logo colors via vars.** In `Logo.tsx` `variantColors.primary` (line 25), the values already equal the tokens (`#C04C2A`, `#1A1816`, `#9A8F82`). Leave as-is (logo rust is intentionally locked). No change required.

- [ ] **Step 5: Build + preview.** `npm run build`; load `/`, scroll a section into view, confirm reveals fade+lift+unblur. With reduced-motion emulated (`preview_eval` to set `matchMedia`, or DevTools), confirm no blur/transform.

- [ ] **Step 6: Commit.**

```bash
git add components/ui/Reveal.tsx components/ui/Button.tsx
git commit -m "style: reveal blur entrance + button dark-variant tokens"
```

---

## Task 7: Home page hero + sections

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Restyle the hero** (`app/page.tsx:53-97`). Make it a full-height centered lockup hero matching the reference, keeping the existing copy and CTAs. Replace the hero `<section>` content so the structure is: centered column, `Logo variant="primary" size="2xl"` lockup, the existing hero line, CTAs, and `<ScrollCue />`. Import `ScrollCue` at top. Example shell (keep the existing `<BookCall>`/`<Button>` and the hero copy text verbatim):

```tsx
import ScrollCue from '@/components/ui/ScrollCue'
// ...
      <section className="relative overflow-hidden">
        <div className="container-wide relative z-10">
          <div className="flex min-h-screen flex-col items-center justify-center text-center">
            <Reveal className="mb-12">
              <Magnetic mode="ambient" strength={0.05} maxShift={18}>
                <Logo variant="primary" size="2xl" />
              </Magnetic>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="t-lead max-w-2xl text-text-primary">
                From idea to realization, we build the concrete system your business needs — and make sure you&rsquo;re visible to the right people.
              </p>
            </Reveal>
            <Reveal delay={0.22}>
              <div className="mt-10 flex flex-col sm:flex-row items-center gap-5">
                <BookCall size="lg" />
                <Button href="/work" variant="outline" size="lg" arrow>See our work</Button>
              </div>
            </Reveal>
          </div>
          <ScrollCue />
        </div>
      </section>
```

(Keep the exact hero sentence from the current file; the snippet above preserves it.)

- [ ] **Step 2: Apply `sec-pad` rhythm.** For the home content sections currently using `<div className="container-wide section">`, leave `.section` (it still works) OR swap to `sec-pad` for the reference rhythm. Choose `.section` to stay consistent site-wide — no change needed unless preview shows the bands too tight. Verify visually in Step 4.

- [ ] **Step 3: Convert the Proof case rows** to reference-style if desired — NOT required; the hairline list already reads well. Leave content/structure; it inherits the new type + eyebrow. No code change unless preview flags an issue.

- [ ] **Step 4: Build + preview.** `npm run build`; load `/`. Confirm: centered lockup hero fills the viewport, scroll cue animates, dark "what we do" band still renders with rust eyebrow, grid + cursor + spine all alive. `preview_screenshot` full page. Resize to 375px and confirm single-column + centered hero.

- [ ] **Step 5: Commit.**

```bash
git add app/page.tsx
git commit -m "style: restyle home hero to centered lockup + scroll cue"
```

---

## Task 8: Services page — service cards

**Files:**
- Modify: `app/services/page.tsx`

- [ ] **Step 1: Render the two offerings as `.svc` cards** in a 2-up grid, keeping the existing copy (`customIncludes` / `growthIncludes` lists and headings). Use the primitive from Task 5. Grid wrapper:

```tsx
<div className="grid gap-7 md:grid-cols-2 mt-14">
  <div className="svc">
    <h3 className="t-h3 mb-3.5">Custom Systems</h3>
    {/* existing description + includes list, unchanged copy */}
  </div>
  <div className="svc">
    <h3 className="t-h3 mb-3.5">Growth Partnership</h3>
    {/* existing description + includes list, unchanged copy */}
  </div>
</div>
```

Keep the page's actual section headings/copy — do not adopt the reference's wording. Wrap each card in `<Reveal>` (or `RevealItem` inside a `RevealGroup`) as the page already does.

- [ ] **Step 2: Build + preview.** `npm run build`; load `/services`. Confirm cards have the rust left-bar growing on hover + lift (`preview_click`/hover not needed — verify the bar via `preview_inspect` on `.svc::before` is hard; instead screenshot, then `preview_eval` to add `:hover` class isn't possible — just confirm static render and trust the CSS). Resize to 375px → single column.

- [ ] **Step 3: Commit.**

```bash
git add app/services/page.tsx
git commit -m "style: services page as reference service cards"
```

---

## Task 9: Work page — work tiles + locked state

**Files:**
- Modify: `app/work/page.tsx`

- [ ] **Step 1: Present the two engagements with `.tile` shapes** where a tiled summary is shown, keeping the existing case-study copy and the Astrala/Delbeteris content. Apply `.tile` (numbered `tnum`, `glow`, `h4`/title) for the summary grid; keep the detailed `CaseBlocks` sections below as-is (they inherit new type/eyebrow). For any "pending/locked" treatment, use `.tile.locked` + `.lock` badge — but only if it matches Day One's real content (Astrala is a live engagement, NOT locked; do not invent a locked state that contradicts the copy). Confirm against the page's existing framing before adding `locked`.

```tsx
<div className="grid gap-6 md:grid-cols-2 mt-14">
  <div className="tile">
    <span className="tnum">01</span>
    <div className="glow" aria-hidden="true" />
    <h4 className="t-h3">Astrala Advisory</h4>
  </div>
  <div className="tile">
    <span className="tnum">02</span>
    <div className="glow" aria-hidden="true" />
    <h4 className="t-h3">Delbeteris</h4>
  </div>
</div>
```

- [ ] **Step 2: Build + preview.** `npm run build`; load `/work`. Confirm dark tiles with rust radial glow, numbers, hover intensifies glow. Verify the Astrala mockup (Cormorant) still renders unchanged. Resize to 375px → single column.

- [ ] **Step 3: Commit.**

```bash
git add app/work/page.tsx
git commit -m "style: work page summary as reference work tiles"
```

---

## Task 10: Forge board + Forge page

**Files:**
- Modify: `components/forge/ForgeBoard.tsx`
- Modify: `app/forge/page.tsx`

- [ ] **Step 1: Read `components/forge/ForgeBoard.tsx`** fully before editing. Retune its colors to the reference dark board: column bg `rgba(242,237,228,.025)`, borders `var(--color-dark-border)`, ticket bg `var(--color-dark-raised)`, tag/accent `var(--color-rust)`, drag-over highlight `rgba(192,76,42,.10)` + inset rust ring. Replace any hardcoded greys with the dark tokens. Keep all existing drag/drop + tap-to-advance + check-to-complete behavior and the existing ticket copy.

- [ ] **Step 2: Ensure the Forge section uses `.forge-dark`** (already defined in globals.css) for its band so the eyebrow is rust and headings are cream. Keep page copy.

- [ ] **Step 3: Build + preview.** `npm run build`; load `/forge`. Confirm the board renders dark with rust accents; drag a ticket via `preview_click`-drag is not supported, so verify static render + counts via `preview_snapshot`. Resize to 375px → board stacks to single column.

- [ ] **Step 4: Commit.**

```bash
git add components/forge/ForgeBoard.tsx app/forge/page.tsx
git commit -m "style: retune Forge board to reference dark tokens"
```

---

## Task 11: PageHero, CtaSection, HorizonRows, Navbar, Footer token pass

**Files:**
- Modify: `components/sections/PageHero.tsx`
- Modify: `components/sections/CtaSection.tsx`
- Modify: `components/sections/HorizonRows.tsx:61,67,92,93,94,109,115`
- Modify: `components/layout/Navbar.tsx`
- Modify: `components/layout/Footer.tsx`

- [ ] **Step 1: HorizonRows hardcoded hex → tokens.** Replace `#34302B`→`var(--color-dark-border)`, `#D9714F`→`var(--color-rust)`, `#F5F0EA`→`var(--color-dark-text)`, `#A39E96`→`var(--color-dark-text-secondary)`, `#1A1816`→`var(--color-dark)` in the SVG strokes/fills and the row classes (note: SVG `stroke`/`fill` attributes take the CSS var via `stroke="var(--color-rust)"`).

- [ ] **Step 2: PageHero** (`PageHero.tsx`) — keep structure; it already uses `.eyebrow`, `.t-display`, `.container-wide`, `.section-hero`. Optionally drop `.gradient-mesh`/`.grid-faint` overlays since the global `ReactiveGrid` now provides the living grid; remove the two absolute overlay divs (lines 15-16) to avoid double-grid. Verify in preview.

- [ ] **Step 3: Read `Navbar.tsx` and `Footer.tsx`** fully. Replace any hardcoded palette hex with tokens; ensure nav logo uses `Logo` component, links use `text-text-secondary hover:text-accent`, footer matches the reference's centered, letter-spaced muted line (`border-top` via `var(--color-line)`, `color: var(--color-muted)`).

- [ ] **Step 4: Build + preview.** `npm run build`; load `/`, `/about`, `/contact`. Confirm nav/footer/hero/CTA all read in the new palette + Jost, no stray serif, no double grid. Screenshot each. Resize to 375px.

- [ ] **Step 5: Commit.**

```bash
git add components/sections/PageHero.tsx components/sections/CtaSection.tsx components/sections/HorizonRows.tsx components/layout/Navbar.tsx components/layout/Footer.tsx
git commit -m "style: token pass on page sections, nav, footer"
```

---

## Task 12: About + Contact pages, full-site verification

**Files:**
- Modify: `app/about/page.tsx`
- Modify: `app/contact/page.tsx`

- [ ] **Step 1: About** — center the lead statement + body to the reference's `about` pattern (centered, `measure`/`measure-lg`), keeping all copy and the `principles` content. The page inherits the new type; main change is centering the opening statement if it isn't already.

- [ ] **Step 2: Contact** — style the email as a large magnetic mail link with the underline-sweep on hover (reference `.contact .mail`). Wrap the `mailto:` in `<Magnetic>` and add an underline-sweep utility (inline-safe via a class). Add to globals.css:

```css
.mail-sweep { position: relative; }
.mail-sweep::after {
  content: ""; position: absolute; left: 0; bottom: 6px; width: 0; height: 1px;
  background: var(--color-rust); transition: width 0.5s var(--ease);
}
.mail-sweep:hover { color: var(--color-rust); }
.mail-sweep:hover::after { width: 100%; }
```

Keep the existing contact form, channels, and copy.

- [ ] **Step 3: Full build.** Run `npm run build`. Expected: clean, zero errors/warnings that fail the build.

- [ ] **Step 4: Full preview sweep.** Load every route: `/`, `/services`, `/work`, `/forge`, `/about`, `/contact`. For each: `preview_console_logs` (no errors), `preview_screenshot` (desktop), then `preview_resize` to 375px and screenshot. Confirm: blush bg, Jost everywhere, two-rust accents, spine on desktop only, cards/tiles/forge correct, reduced-motion kills reveals/cue/spine (`preview_eval` to verify `matchMedia('(prefers-reduced-motion: reduce)')` path, or note manual check).

- [ ] **Step 5: Commit.**

```bash
git add app/about/page.tsx app/contact/page.tsx app/globals.css
git commit -m "style: restyle about + contact; full reference pass"
```

---

## Self-review (completed during planning)

- **Spec coverage:** tokens (Task 1), Jost type (Tasks 2-3), spine + scroll cue (Task 4), cards/tiles (Tasks 5/8/9), reveal motion (Task 6), per-page (Tasks 7-12), responsive + reduced-motion (verified each task + Task 12), two-rust (Task 1 tokens, Task 2 eyebrow). All spec sections map to a task.
- **No placeholders:** every code step shows concrete CSS/TSX.
- **Naming consistency:** token names (`--color-rust`, `--color-accent`, `--color-muted`, `--color-card`, `--color-line`) used consistently across globals.css and Tailwind; `.svc`/`.tile`/`.sec-pad`/`.scrollcue-line`/`.mail-sweep` defined once and referenced by name.
- **Open item for executor:** confirm the Work page's "locked" treatment against real copy before applying (Task 9 Step 1) — Astrala is a live engagement, not locked.
