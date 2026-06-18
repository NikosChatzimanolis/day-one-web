# Living Thread Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the home page's prototype thread with a DOM-anchored "living current": a current born at the logo divider that splits into two side rails, lights the existing horizontal section dividers as rust rungs, and energizes section numerals (outline → solid rust) as the scroll front reaches them — converging back into the footer logo divider.

**Architecture:** A single client controller (`LivingThread`) mounted in the layout, wrapping `<main>` + `<Footer>` so its SVG overlay spans hero → footer. It measures tagged DOM anchors (`data-logo-divider`, `data-thread-rung`, `data-thread-node`) relative to that wrapper, builds the SVG geometry (split, rails, rungs, convergence) and per-element scroll thresholds, and drives everything from one smoothed `useScroll` value. Numeral activation is an imperative `charged` class toggle latched on furthest progress; rung/rail fill is `pathLength`. Gated to `/`, hidden < md, static-and-complete under reduced motion.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind 3.4, framer-motion 11, SVG.

**Verification model:** Visual feature — no unit tests. Each task verifies with (a) `npm run build` clean and (b) `preview_*` browser checks. Dev server runs on port 3007 (`.claude/launch.json`, name `day-one-web`); keep it up and reload between tasks. Do NOT add inline `style={{}}` literals to non-`motion` elements (repo's eslint inline-style rule fails Vercel); SVG attributes and `motion.*` `style` props are fine.

**Branch:** `restyle-reference` (current).

**Reference:** `docs/superpowers/specs/2026-06-18-living-thread-design.md`.

---

## File structure

**Modify:**
- `app/globals.css` — numeral two-state styles (`.thread-num`, `.charged`, pulse keyframe, reduced-motion + `@supports` fallback), gated by a `thread-active` root class.
- `components/ui/LivingThread.tsx` — rewrite the prototype into the measured two-rail controller.
- `app/layout.tsx` — wrap `<main>` + `<Footer>` in a relative container and mount `<LivingThread />` there (so the overlay spans hero → footer).
- `app/page.tsx` — remove the prototype's `relative` wrapper + `<LivingThread />`; tag section dividers (`data-thread-rung`) and the "how we work" numerals (`data-thread-node` + `thread-num`).
- `components/sections/HorizonRows.tsx` — tag the Build/Scale/Maintain numerals (`data-thread-node` + `thread-num`).
- `components/layout/Footer.tsx` — tag the footer logo divider as the terminus is automatic (it already has `data-logo-divider`); no change needed unless verification shows the wrapper excludes it.

**Create:** none (controller stays in `LivingThread.tsx`; helper subcomponents live in the same file).

---

## Task 1: Numeral two-state styles

**Files:**
- Modify: `app/globals.css` (append near the reduced-motion block)

- [ ] **Step 1: Add the numeral styles.** Append to `app/globals.css` before the `@media (prefers-reduced-motion: reduce)` block:

```css
/* ─────────────────────────────────────────
   Living thread — station numerals
   Default (no JS / fallback): solid accent, unchanged look.
   With the controller mounted (.thread-active on <html>): the numeral is a
   muted outline until the current reaches it, then fills to solid rust + pulses.
───────────────────────────────────────── */
.thread-num {
  color: var(--color-accent);
  transition: color 0.5s var(--ease);
}
.thread-active .thread-num {
  color: transparent;
  -webkit-text-stroke: 1px var(--color-muted);
  transition: color 0.5s var(--ease), -webkit-text-stroke-color 0.5s var(--ease);
}
.thread-active .thread-num.charged {
  color: var(--color-rust);
  -webkit-text-stroke-color: var(--color-rust);
  animation: thread-pulse 0.5s var(--ease);
}
/* Browsers without text-stroke: keep numerals visible (muted → rust) */
@supports not ((-webkit-text-stroke: 1px black)) {
  .thread-active .thread-num { color: var(--color-muted); }
  .thread-active .thread-num.charged { color: var(--color-rust); }
}
@keyframes thread-pulse {
  0% { transform: scale(1); }
  40% { transform: scale(1.12); }
  100% { transform: scale(1); }
}
```

- [ ] **Step 2: Reduced-motion + dark-section fallback.** Inside the existing `@media (prefers-reduced-motion: reduce)` block in `app/globals.css`, add:

```css
  .thread-active .thread-num { color: var(--color-rust); -webkit-text-stroke-color: var(--color-rust); }
  .thread-active .thread-num.charged { animation: none; }
```

- [ ] **Step 3: Build.** Run `npm run build`. Expected: completes clean (CSS only).

- [ ] **Step 4: Commit.**

```bash
git add app/globals.css
git commit -m "style: add living-thread numeral two-state (outline -> rust)"
```

---

## Task 2: Tag the DOM anchors

**Files:**
- Modify: `components/sections/HorizonRows.tsx:92`
- Modify: `app/page.tsx` (how-we-work numerals + section dividers)

- [ ] **Step 1: Tag the Build/Scale/Maintain numerals.** In `components/sections/HorizonRows.tsx`, change the numeral span (currently `<span className="t-index text-rust md:col-span-1">{track.no}</span>`) to:

```tsx
          <span data-thread-node className="t-index thread-num md:col-span-1">{track.no}</span>
```

(Drop `text-rust` — `.thread-num` now owns the color.)

- [ ] **Step 2: Tag the "how we work" numerals.** In `app/page.tsx`, the `beats.map` block renders `<span className="t-index text-accent">{String(i + 1).padStart(2, '0')}</span>`. Change to:

```tsx
                  <span data-thread-node className="t-index thread-num">{String(i + 1).padStart(2, '0')}</span>
```

- [ ] **Step 3: Tag the section dividers as rungs.** In `app/page.tsx`, add `data-thread-rung` to the section elements that carry the full-width top hairline. Add the attribute to these opening tags (leave classes unchanged):
  - The "promise" section: `<section className="border-t border-border bg-bg">` → add `data-thread-rung`.
  - The "proof" section: `<section className="bg-bg border-t border-border">` → add `data-thread-rung`.
  - The "how we work" section: `<section className="bg-surface border-t border-border">` → add `data-thread-rung`.

Example (promise section):

```tsx
      <section data-thread-rung className="border-t border-border bg-bg">
```

- [ ] **Step 4: Build.** Run `npm run build`. Expected: clean. (Numerals now use `.thread-num`; since `.thread-active` is not yet added by any controller, they render solid accent — unchanged look. Confirmed by the fallback rule in Task 1.)

- [ ] **Step 5: Commit.**

```bash
git add app/page.tsx components/sections/HorizonRows.tsx
git commit -m "feat: tag thread anchors (rungs + station numerals)"
```

---

## Task 3: Rewrite LivingThread into the measured controller

**Files:**
- Modify (full rewrite): `components/ui/LivingThread.tsx`

- [ ] **Step 1: Replace the file contents.** Overwrite `components/ui/LivingThread.tsx` with:

```tsx
// ── components/ui/LivingThread.tsx ──
// The site's connective current. Born at the hero logo divider, it splits to two
// side rails, lights the existing horizontal section dividers as rust rungs, and
// energizes the section numerals as the scroll front reaches them, converging
// back into the footer logo divider. Measured from real DOM (no hardcoded
// coords). Home only; hidden < md; static-and-complete under reduced motion.
'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion'

interface Rung { y: number; threshold: number }
interface Geo {
  w: number
  h: number
  termX: number
  termY: number
  railTopY: number
  railBotY: number
  railL: number
  railR: number
  splitL: string
  splitR: string
  railLPath: string
  railRPath: string
  convL: string
  convR: string
  rungs: Rung[]
}

export default function LivingThread() {
  const pathname = usePathname()
  const reduce = useReducedMotion()
  const svgRef = useRef<SVGSVGElement>(null)
  const [geo, setGeo] = useState<Geo | null>(null)
  const nodesRef = useRef<{ el: HTMLElement; threshold: number }[]>([])
  const maxRef = useRef(0)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.5 })
  // Rust leads the eye and is fully drawn by ~85% scroll.
  const lead = useTransform(progress, [0, 0.85], [reduce ? 1 : 0.03, 1])

  // Measure + build geometry from tagged DOM.
  useEffect(() => {
    if (pathname !== '/') return
    const svg = svgRef.current
    const wrap = svg?.parentElement
    if (!wrap) return

    document.documentElement.classList.add('thread-active')

    const build = () => {
      if (window.innerWidth < 768) {
        setGeo(null)
        return
      }
      const wr = wrap.getBoundingClientRect()
      const W = wr.width
      const H = wrap.offsetHeight
      const center = (el: Element) => {
        const r = el.getBoundingClientRect()
        return { x: r.left + r.width / 2 - wr.left, y: r.top + r.height / 2 - wr.top }
      }
      const topY = (el: Element) => el.getBoundingClientRect().top - wr.top

      const dividers = wrap.querySelectorAll('[data-logo-divider]')
      const origin = dividers[0] ? center(dividers[0]) : { x: W / 2, y: H * 0.06 }
      const term = dividers[dividers.length - 1]
        ? center(dividers[dividers.length - 1])
        : { x: W / 2, y: H - 80 }

      const railInset = Math.min(56, Math.max(20, W * 0.03))
      const railL = railInset
      const railR = W - railInset
      const railTopY = origin.y + H * 0.05
      const railBotY = term.y - H * 0.03

      const rungs: Rung[] = [...wrap.querySelectorAll('[data-thread-rung]')]
        .map((el) => {
          const y = topY(el)
          return { y, threshold: y / H }
        })
        .filter((r) => r.y > railTopY && r.y < railBotY)
        .sort((a, b) => a.y - b.y)

      nodesRef.current = [...wrap.querySelectorAll('[data-thread-node]')].map((el) => ({
        el: el as HTMLElement,
        threshold: center(el).y / H,
      }))
      // Re-evaluate charged state for the new thresholds.
      applyCharged(maxRef.current)

      const splitL = `M ${origin.x} ${origin.y} C ${origin.x} ${origin.y + H * 0.03}, ${railL + W * 0.14} ${railTopY - 28}, ${railL} ${railTopY}`
      const splitR = `M ${origin.x} ${origin.y} C ${origin.x} ${origin.y + H * 0.03}, ${railR - W * 0.14} ${railTopY - 28}, ${railR} ${railTopY}`
      const railLPath = `M ${railL} ${railTopY} L ${railL} ${railBotY}`
      const railRPath = `M ${railR} ${railTopY} L ${railR} ${railBotY}`
      const convL = `M ${railL} ${railBotY} C ${railL + W * 0.14} ${term.y + 18}, ${term.x} ${term.y}, ${term.x} ${term.y}`
      const convR = `M ${railR} ${railBotY} C ${railR - W * 0.14} ${term.y + 18}, ${term.x} ${term.y}, ${term.x} ${term.y}`

      setGeo({
        w: W, h: H, termX: term.x, termY: term.y,
        railTopY, railBotY, railL, railR,
        splitL, splitR, railLPath, railRPath, convL, convR, rungs,
      })
    }

    const applyCharged = (m: number) => {
      for (const n of nodesRef.current) {
        if (m >= n.threshold) n.el.classList.add('charged')
      }
    }
    // expose for the motion-value listener
    chargedApplier.current = applyCharged

    build()
    const ro = new ResizeObserver(build)
    ro.observe(wrap)
    window.addEventListener('resize', build)
    const t = window.setTimeout(build, 500)
    if (document.fonts?.ready) document.fonts.ready.then(build)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', build)
      window.clearTimeout(t)
      document.documentElement.classList.remove('thread-active')
      for (const n of nodesRef.current) n.el.classList.remove('charged')
    }
  }, [pathname])

  // Latch progress and charge numerals as the front passes them.
  const chargedApplier = useRef<(m: number) => void>(() => {})
  useMotionValueEvent(progress, 'change', (v) => {
    if (reduce) return
    if (v > maxRef.current) {
      maxRef.current = v
      chargedApplier.current(maxRef.current)
    }
  })

  // Reduced motion: charge everything once, render static full geometry.
  useEffect(() => {
    if (pathname === '/' && reduce) {
      const id = window.setTimeout(() => {
        for (const n of nodesRef.current) n.el.classList.add('charged')
      }, 300)
      return () => window.clearTimeout(id)
    }
  }, [pathname, reduce])

  if (pathname !== '/') return null

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full md:block"
      viewBox={geo ? `0 0 ${geo.w} ${geo.h}` : undefined}
      preserveAspectRatio="none"
      fill="none"
    >
      {geo && (
        <>
          {/* soft always-visible guides */}
          {[geo.splitL, geo.splitR, geo.railLPath, geo.railRPath, geo.convL, geo.convR].map((d, i) => (
            <path key={`g${i}`} d={d} stroke="var(--color-rust)" strokeWidth={1.25} strokeOpacity={0.18} vectorEffect="non-scaling-stroke" />
          ))}
          {geo.rungs.map((r, i) => (
            <line key={`gr${i}`} x1={geo.railL} y1={r.y} x2={geo.railR} y2={r.y} stroke="var(--color-rust)" strokeWidth={1} strokeOpacity={0.14} vectorEffect="non-scaling-stroke" />
          ))}

          {/* split (draws first) */}
          <Draw d={geo.splitL} progress={lead} range={[0, 0.06]} reduce={!!reduce} />
          <Draw d={geo.splitR} progress={lead} range={[0, 0.06]} reduce={!!reduce} />
          {/* rails */}
          <motion.path d={geo.railLPath} stroke="var(--color-rust)" strokeWidth={1.5} strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ pathLength: reduce ? 1 : lead }} />
          <motion.path d={geo.railRPath} stroke="var(--color-rust)" strokeWidth={1.5} strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ pathLength: reduce ? 1 : lead }} />
          {/* rungs */}
          {geo.rungs.map((r, i) => (
            <Rung key={`r${i}`} x1={geo.railL} x2={geo.railR} y={r.y} threshold={r.threshold} progress={lead} reduce={!!reduce} />
          ))}
          {/* convergence */}
          <Draw d={geo.convL} progress={lead} range={[0.9, 1]} reduce={!!reduce} />
          <Draw d={geo.convR} progress={lead} range={[0.9, 1]} reduce={!!reduce} />

          {/* charge heads */}
          {!reduce && <ChargeHead x={geo.railL} topY={geo.railTopY} botY={geo.railBotY} progress={lead} />}
          {!reduce && <ChargeHead x={geo.railR} topY={geo.railTopY} botY={geo.railBotY} progress={lead} />}
        </>
      )}
    </svg>
  )
}

function Draw({ d, progress, range, reduce }: { d: string; progress: MotionValue<number>; range: [number, number]; reduce: boolean }) {
  const len = useTransform(progress, range, [0, 1])
  return <motion.path d={d} stroke="var(--color-rust)" strokeWidth={1.5} strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ pathLength: reduce ? 1 : len }} />
}

function Rung({ x1, x2, y, threshold, progress, reduce }: { x1: number; x2: number; y: number; threshold: number; progress: MotionValue<number>; reduce: boolean }) {
  const len = useTransform(progress, [threshold - 0.04, threshold + 0.03], [0, 1])
  return <motion.line x1={x1} y1={y} x2={x2} y2={y} stroke="var(--color-rust)" strokeWidth={1.25} vectorEffect="non-scaling-stroke" style={{ pathLength: reduce ? 1 : len }} />
}

function ChargeHead({ x, topY, botY, progress }: { x: number; topY: number; botY: number; progress: MotionValue<number> }) {
  const cy = useTransform(progress, [0, 1], [topY, botY])
  const opacity = useTransform(progress, [0, 0.02, 0.97, 1], [0, 1, 1, 0])
  return <motion.circle cx={x} r={3.5} fill="var(--color-rust)" vectorEffect="non-scaling-stroke" style={{ cy, opacity }} />
}
```

- [ ] **Step 2: Build.** Run `npm run build`. Expected: clean. If TS complains about `chargedApplier` ordering, confirm it is declared with `useRef` (it is, just before `useMotionValueEvent`).

- [ ] **Step 3: Commit.**

```bash
git add components/ui/LivingThread.tsx
git commit -m "feat: measured two-rail living thread controller"
```

---

## Task 4: Mount in the layout (span hero → footer); remove from page

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Wrap main + footer and mount the thread.** In `app/layout.tsx`, import the component and wrap `<main>` + `<Footer />` in a relative container with `<LivingThread />` inside it. Change:

```tsx
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
```

to:

```tsx
        <Navbar />
        <div className="relative">
          <LivingThread />
          <main id="main">{children}</main>
          <Footer />
        </div>
```

Add the import near the other component imports:

```tsx
import LivingThread from '@/components/ui/LivingThread'
```

- [ ] **Step 2: Remove the prototype mount from the home page.** In `app/page.tsx`:
  - Delete the import line `import LivingThread from '@/components/ui/LivingThread'`.
  - Change the opening `<div className="relative">` + `<LivingThread />` back to a fragment. Replace:

```tsx
    <div className="relative">
      <LivingThread />

      {/* ── Hero — centered lockup, full height ────────────── */}
```

with:

```tsx
    <>
      {/* ── Hero — centered lockup, full height ────────────── */}
```

  - And change the closing `</div>` (the final one before `)`) back to `</>`:

```tsx
      <CtaSection />
    </>
  )
}
```

- [ ] **Step 3: Build.** Run `npm run build`. Expected: clean.

- [ ] **Step 4: Preview — verify the full flow.** Ensure the dev server is up (`preview_start` name `day-one-web`), load `/`, `preview_resize` to width 1280. Then:
  - `preview_console_logs` level error → none.
  - `preview_eval`: confirm the overlay spans hero→footer and anchors resolved:

```js
(()=>{const wrap=document.querySelector('.relative > svg[preserveAspectRatio]')?.parentElement;const svg=wrap?.querySelector('svg[preserveAspectRatio]');const dividers=wrap?wrap.querySelectorAll('[data-logo-divider]').length:0;const rungs=wrap?wrap.querySelectorAll('[data-thread-rung]').length:0;const nodes=wrap?wrap.querySelectorAll('[data-thread-node]').length:0;return {viewBox:svg?.getAttribute('viewBox'),dividers,rungs,nodes,threadActive:document.documentElement.classList.contains('thread-active')};})()
```

  Expected: `viewBox` height ≈ full document (thousands), `dividers` = 2 (hero + footer), `rungs` ≥ 3, `nodes` ≥ 7, `threadActive` true.
  - Scroll through (`window.scrollTo` in steps) and `preview_screenshot` mid-page + near footer: rails fill with a charge head, rungs light as reached, numerals fill outline → rust, rails converge into the footer divider.

- [ ] **Step 5: Commit.**

```bash
git add app/layout.tsx app/page.tsx
git commit -m "feat: mount living thread across main+footer; drop prototype mount"
```

---

## Task 5: Responsive + reduced-motion verification

**Files:**
- Modify (only if a fix is needed): `components/ui/LivingThread.tsx`, `app/globals.css`

- [ ] **Step 1: Mobile.** `preview_resize` preset `mobile` (375), reload `/`. `preview_eval` to confirm the SVG `viewBox` is absent/`geo` null (rails hidden < md) and that numerals are NOT stuck transparent:

```js
(()=>{const n=document.querySelector('.thread-num');return {numColor: n?getComputedStyle(n).color:null, hasSvgViewBox: !!document.querySelector('.relative > svg[viewBox]')};})()
```

Expected: `hasSvgViewBox` false at 375. `numColor` must be visible — under the controller, `<md` numerals stay outline (muted stroke) uncharged; they should still be readable. If numerals are invisible on mobile (transparent fill, no stroke shows), add to `app/globals.css` a small-screen rule so numerals stay solid below md:

```css
@media (max-width: 767px) {
  .thread-active .thread-num { color: var(--color-accent); -webkit-text-stroke-width: 0; }
}
```

Re-run `npm run build` and re-check if you added this.

- [ ] **Step 2: Reduced motion.** `preview_resize` with `colorScheme` unaffected; emulate reduced motion via `preview_eval` is unreliable, so verify the code path by reading: confirm in `LivingThread.tsx` that `reduce` forces `pathLength: 1`, charges all nodes after mount, and renders no `ChargeHead`. Confirm `app/globals.css` reduced-motion block sets `.thread-num` to solid rust. Note this as a manual/code-verified check.

- [ ] **Step 3: Desktop regression.** `preview_resize` width 1280, reload, scroll top→bottom. `preview_console_logs` error → none. Confirm: numerals start as muted outlines and fill to rust as reached, and stay lit when scrolling back up (latch). `preview_screenshot` at top, mid, footer.

- [ ] **Step 4: Full build.** `npm run build`. Expected: clean, no lint/type errors.

- [ ] **Step 5: Commit (only if Step 1/2 required a change).**

```bash
git add components/ui/LivingThread.tsx app/globals.css
git commit -m "fix: living thread responsive + reduced-motion polish"
```

---

## Self-review (completed during planning)

- **Spec coverage:** two rails (Task 3 geometry), origin split from logo + convergence to footer divider (Task 3 splitL/splitR/convL/convR + Task 4 mount spanning footer), horizontal section lines as rungs (Task 2 tagging + Task 3 `Rung`), numerals outline→rust+pulse (Task 1 CSS + Task 2 tagging + Task 3 latch), travelling charge head (Task 3 `ChargeHead`), always-visible soft guide (Task 3 guide paths), measured/DOM-anchored + ResizeObserver (Task 3), home-only + < md hidden + reduced-motion static (Tasks 3–5). All spec sections map to a task.
- **No placeholders:** every code step shows complete CSS/TSX; the controller, `Draw`, `Rung`, `ChargeHead` are fully specified.
- **Type consistency:** `Geo` fields (`railL/railR/railTopY/railBotY/splitL/splitR/railLPath/railRPath/convL/convR/rungs/termX/termY/w/h`) are produced in `build()` and consumed in the JSX; `Rung` `{y, threshold}` consistent; helper props match call sites.
- **Open item for executor:** confirm the three `data-thread-rung` sections in `app/page.tsx` still carry `border-t border-border` (class strings quoted in Task 2 Step 3); if a class string differs, match on the section's role, not the exact class.
