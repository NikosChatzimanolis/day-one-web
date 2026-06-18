# Circuit Fill — Phase 3 (Fill All Element Types) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend the proven Phase-2 positional fill engine from the rails to every remaining fillable element — section dividers fill inward from both rails to meet at center, editorial numerals' boxes draw on and their digits fill terracotta, and outline button borders draw on — all positional and reversible, consistent with the rails.

**Architecture:** No engine changes. Every new primitive registers through the existing `useFill()` callback-ref hook (the engine writes its positional `0..1` to the element's `--fill` CSS var each frame); the visual is pure CSS/SVG reading `var(--fill)`. Thin elements register a **fill band** (px) so they ease across a short travel instead of snapping — the `band` option already exists in the engine and is unused until now. Three new primitives: `<Divider>` (dull base + two terracotta `scaleX` segments growing inward), `<FillText>` (dull text + terracotta copy revealed by a bottom-up `clip-path`), `<DrawBorder>` (absolutely-positioned SVG `<rect pathLength=1>` overlay, `stroke-dashoffset` draw-on). `<Section>`, `NumberBox`, and outline `Button`s compose these.

**Tech Stack:** Next 16 (App Router), React 18, TypeScript, Tailwind v3.4, plain CSS custom properties + SVG. No framer-motion. No test runner (no ESLint config either — `next lint` is gone in Next 16); each task is verified with `npx tsc --noEmit` + measurable DOM assertions in the browser preview. **Preview gotcha (from Phase 2):** the preview tab is `visibilityState:hidden`, so `requestAnimationFrame` is PAUSED and the engine never auto-ticks there — `--fill` stays `0`. To verify fill visuals, pump the engine manually: it exposes nothing by default, so verification temporarily writes representative `--fill` values to elements via `el.style.setProperty('--fill', v)` (the Phase-2 criteria already proved the engine computes the correct values), then inspects the resulting CSS. Use `behavior:'instant'` for any scroll.

**Reference docs:**
- Brief: `docs/superpowers/specs/2026-06-18-circuit-fill-brief.md` (Phase 3 section)
- Design: `docs/superpowers/specs/2026-06-18-circuit-fill-design.md` (Fillable primitives)
- Phase 2 plan (done): `docs/superpowers/plans/2026-06-18-circuit-fill-phase2.md`

**Tokens (in `app/globals.css`):** dull `--color-muted` `#9A8F82`; filled `--color-rust` `#C04C2A`. Every element interpolates between these two; no third color.

---

## Decisions locked here (flag at review if you disagree)

1. **Outline buttons draw on; the solid primary does not.** The two outline buttons (`variant="outline"` / `outline-dark`) get a terracotta draw-on border. The solid "Book a call" (`variant="primary"`, filled accent bg) is left untouched — drawing a border on an already-solid button reads as noise.
2. **Stem + fork fill** (Task 6, optional, last). They sit at/above the fork, so they fill first as scrolling begins — making the terracotta read as flowing *from the logo down into the rails* rather than the rails lighting up out of a dull fork. Built last and clearly isolated so it can be dropped without affecting the brief's Phase-3 "done when" (which covers dividers/numerals/buttons only).
3. **Inner routes stay rails-only.** Converting Services/Work/Forge/About/Contact to `<Section>` blocks remains a separate follow-up (per the design doc), NOT part of Phase 3.
4. **Divider fill = two `scaleX` segments meeting at center**; **digits = bottom-up `clip-path`**; **borders = SVG `stroke-dashoffset` overlay over the existing dull CSS border** (the dull border stays the base; terracotta draws over it). Bands: divider 100px, digits 80px, boxes/buttons 120px (tunable in Task 7).

---

## File Structure

- **Create** `components/circuit/Divider.tsx` — dull rail-to-rail line + two inward terracotta segments; registers with `band:100`.
- **Create** `components/circuit/FillText.tsx` — dull text + bottom-up terracotta `clip-path` overlay; registers with `band:80`.
- **Create** `components/circuit/DrawBorder.tsx` — absolutely-positioned SVG rect overlay, `stroke-dashoffset` draw-on; registers with `band` prop (default 120).
- **Modify** `components/circuit/Section.tsx` — render `<Divider/>` instead of the raw `.circuit-divider` span; drop Section's own (now redundant) registration.
- **Modify** `components/circuit/NumberBox.tsx` — compose `<DrawBorder/>` (box) + `<FillText>` (digits); becomes a client component.
- **Modify** `components/ui/Button.tsx` — outline variants host a `<DrawBorder/>`; add `position:relative`.
- **Modify** `app/globals.css` — styles for `.circuit-divider` segments, `.circuit-filltext`, `.circuit-drawborder`; `position:relative` on `.circuit-numbox`.
- **Modify** `components/circuit/CircuitLayout.tsx` (Task 6 only) — fill the stem + fork.

No engine (`CircuitContext.tsx`) or `useFill.ts` changes. No `app/layout.tsx` changes.

---

# PHASE 3 — FILLABLE PRIMITIVES

### Task 1: `<Divider>` — fill inward from both rails

**Files:**
- Create: `components/circuit/Divider.tsx`
- Modify: `components/circuit/Section.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Create `components/circuit/Divider.tsx`**

```tsx
// ── components/circuit/Divider.tsx ──
// A rail-to-rail section divider. Dull base line + two terracotta segments that
// grow inward from each rail (scaleX from the left/right origins) to meet at the
// center as the fill front crosses the divider. Registers with a fill band so it
// eases across ~100px of travel instead of snapping. The engine writes --fill to
// this element; the segments read it via CSS-variable inheritance.
'use client'

import { useFill } from './useFill'

export default function Divider() {
  const ref = useFill({ band: 100 })
  return (
    <span ref={ref} aria-hidden="true" className="circuit-divider">
      <span className="circuit-divider-seg circuit-divider-seg-l" />
      <span className="circuit-divider-seg circuit-divider-seg-r" />
    </span>
  )
}
```

- [ ] **Step 2: Modify `components/circuit/Section.tsx`**

Overwrite the file with (it no longer needs `useFill` — the `<Divider>` registers itself; Section's own Phase-1 stub registration drove nothing visual and is removed):

```tsx
// ── components/circuit/Section.tsx ──
// A full-bleed page band that emits a fillable rail-to-rail top divider into the
// circuit layer. Authoring a page = composing <Section> blocks; dividers are
// never hardcoded. Pass `firstBand` to suppress the divider where a band should
// not have one (e.g. the band right under the hero fork). The inner centered
// container lives in the children. The <Divider> registers with the fill engine;
// Section itself no longer registers (its Phase-1 stub registration was visual-
// less and is dropped now that the divider is the real fill participant).
'use client'

import { cn } from '@/lib/utils'
import Divider from './Divider'

export default function Section({
  children,
  className,
  firstBand = false,
  id,
}: {
  children: React.ReactNode
  className?: string
  /** Suppress the top divider (e.g. the band immediately under the hero fork). */
  firstBand?: boolean
  id?: string
}) {
  return (
    <section id={id} className={cn('relative', className)}>
      {!firstBand && <Divider />}
      {children}
    </section>
  )
}
```

- [ ] **Step 3: Update the divider CSS in `app/globals.css`**

Replace the existing `.circuit-divider { … }` rule (it currently sets `background: var(--color-muted)`) with the base + segments below. Find the rule (around line 375) and replace it entirely with:

```css
/* A section's full-bleed top divider, rail-to-rail. Dull base line; two
   terracotta segments grow inward from each rail (scaleX) to meet at center as
   --fill goes 0→1. */
.circuit-divider {
  position: absolute;
  top: 0;
  left: var(--circuit-inset);
  right: var(--circuit-inset);
  height: 1px;
  background: var(--color-muted);
  z-index: 2;
  pointer-events: none;
}
.circuit-divider-seg {
  position: absolute;
  top: 0;
  height: 100%;
  width: 50%;
  background: var(--color-rust);
  transform: scaleX(var(--fill, 0));
}
.circuit-divider-seg-l {
  left: 0;
  transform-origin: left center;
}
.circuit-divider-seg-r {
  right: 0;
  transform-origin: right center;
}
```

- [ ] **Step 4: Verify compile**

Run: `npx tsc --noEmit`
Expected: passes.

- [ ] **Step 5: Visual check (preview)**

Reload `/`. In `preview_eval`, write a mid value to the dividers and confirm the two segments grow inward:
```js
(() => {
  const ds = [...document.querySelectorAll('.circuit-divider')];
  ds.forEach(d => d.style.setProperty('--fill', '0.5'));
  const seg = document.querySelector('.circuit-divider-seg-l');
  return JSON.stringify({ dividers: ds.length, segTransform: getComputedStyle(seg).transform });
})()
```
Expected: `dividers` ≥ 4; `segTransform` is a matrix scaling X to ~0.5 (e.g. `matrix(0.5, 0, 0, 1, 0, 0)`). At `--fill:1` both segments span 50% each and meet at center; at `0` they vanish, leaving only the dull base. Screenshot at `--fill:1` to confirm a continuous terracotta line rail-to-rail.

- [ ] **Step 6: Commit**

```bash
git add components/circuit/Divider.tsx components/circuit/Section.tsx app/globals.css
git commit -m "feat: fillable Divider — terracotta segments meet at center"
```

---

### Task 2: `<FillText>` — digits fill bottom-up

**Files:**
- Create: `components/circuit/FillText.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Create `components/circuit/FillText.tsx`**

```tsx
// ── components/circuit/FillText.tsx ──
// Renders text twice: a dull base (inherits the surrounding dull color) and a
// terracotta copy stacked exactly on top, revealed bottom-up by a vertical
// clip-path driven by --fill. Registers with a fill band so short text eases
// across a small travel. Decorative: the base copy carries the real text; the
// terracotta overlay is aria-hidden.
'use client'

import { cn } from '@/lib/utils'
import { useFill } from './useFill'

export default function FillText({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useFill({ band: 80 })
  return (
    <span ref={ref} className={cn('circuit-filltext', className)}>
      <span className="circuit-filltext-base">{children}</span>
      <span aria-hidden="true" className="circuit-filltext-fill">
        {children}
      </span>
    </span>
  )
}
```

- [ ] **Step 2: Add `FillText` CSS to `app/globals.css`**

Append after the `.circuit-divider-*` rules:

```css
/* Two stacked copies of the same text: dull base (inherits color) + terracotta
   overlay revealed bottom-up by a clip-path as --fill goes 0→1. */
.circuit-filltext {
  position: relative;
  display: inline-block;
}
.circuit-filltext-fill {
  position: absolute;
  inset: 0;
  color: var(--color-rust);
  /* inset(top right bottom left): clip from the TOP by (1-fill)*100% so the fill
     is revealed from the bottom up. fill=0 → fully clipped; fill=1 → fully shown. */
  clip-path: inset(calc((1 - var(--fill, 0)) * 100%) 0 0 0);
}
```

- [ ] **Step 3: Verify compile**

Run: `npx tsc --noEmit`
Expected: passes.

- [ ] **Step 4: Visual check (deferred to Task 3)**

`FillText` is exercised once it's placed inside `NumberBox` (Task 3). No standalone page usage yet — proceed to commit; Task 3 verifies it on screen.

- [ ] **Step 5: Commit**

```bash
git add components/circuit/FillText.tsx app/globals.css
git commit -m "feat: FillText — terracotta digits revealed bottom-up via clip-path"
```

---

### Task 3: `<DrawBorder>` + box/fill the editorial numerals

**Files:**
- Create: `components/circuit/DrawBorder.tsx`
- Modify: `components/circuit/NumberBox.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Create `components/circuit/DrawBorder.tsx`**

```tsx
// ── components/circuit/DrawBorder.tsx ──
// A terracotta border that draws itself on as the fill front passes. An
// absolutely-positioned SVG <rect> overlay sized to its (position:relative)
// parent; pathLength=1 normalizes the perimeter so stroke-dashoffset can reveal
// 0..1 of it from --fill. Drawn OVER the host's existing dull CSS border (which
// stays as the base). Registers with a fill band (default 120px). aria-hidden /
// pointer-events:none — purely decorative.
'use client'

import { cn } from '@/lib/utils'
import { useFill } from './useFill'

export default function DrawBorder({
  radius = 2,
  band = 120,
  className,
}: {
  /** Corner radius in px to match the host (0 for the square number box). */
  radius?: number
  /** Fill band in px over which the border draws on. */
  band?: number
  className?: string
}) {
  const ref = useFill({ band })
  return (
    <svg
      ref={ref}
      className={cn('circuit-drawborder', className)}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <rect x="0" y="0" width="100%" height="100%" rx={radius} pathLength={1} />
    </svg>
  )
}
```

- [ ] **Step 2: Rewrite `components/circuit/NumberBox.tsx`**

```tsx
// ── components/circuit/NumberBox.tsx ──
// A numeral in a bordered box. Dull base (CSS border + dull digits); as the fill
// front passes, the border draws on (DrawBorder) and the digits fill terracotta
// (FillText). Its own primitive so the two fill behaviors compose in one place.
'use client'

import { cn } from '@/lib/utils'
import DrawBorder from './DrawBorder'
import FillText from './FillText'

export default function NumberBox({
  children,
  tone = 'light',
  className,
}: {
  children: React.ReactNode
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <span
      className={cn(
        'circuit-numbox t-index',
        tone === 'dark' ? 'text-dark-text-secondary' : 'text-muted',
        className,
      )}
    >
      <DrawBorder radius={0} band={100} />
      <FillText>{children}</FillText>
    </span>
  )
}
```

- [ ] **Step 3: Add `DrawBorder` CSS + make the box positioned in `app/globals.css`**

Modify the existing `.circuit-numbox` rule to add `position: relative;` (so the overlay anchors to it), and append the `.circuit-drawborder` rules. The `.circuit-numbox` rule becomes:

```css
/* Dull bordered numeral box (light + dark tone). position:relative anchors the
   terracotta DrawBorder overlay; the CSS border is the dull base. */
.circuit-numbox {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-muted);
  padding: 0.25rem 0.6rem;
  line-height: 1;
}
```

And append:

```css
/* Terracotta draw-on border overlay. overflow:visible so the 1px non-scaling
   stroke isn't clipped at the SVG edge; stroke-dashoffset reveals --fill of the
   normalized (pathLength=1) perimeter. */
.circuit-drawborder {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}
.circuit-drawborder rect {
  fill: none;
  stroke: var(--color-rust);
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
  stroke-dasharray: 1;
  stroke-dashoffset: calc(1 - var(--fill, 0));
}
```

- [ ] **Step 4: Verify compile**

Run: `npx tsc --noEmit`
Expected: passes. `HorizonRows.tsx` and `app/page.tsx` already import `NumberBox` with the same `children`/`tone` props — unchanged.

- [ ] **Step 5: Visual check (preview)**

Reload `/`. Write a mid value to the number boxes and inspect both the border draw and the digit fill:
```js
(() => {
  const boxes = [...document.querySelectorAll('.circuit-numbox')];
  // write --fill to the DrawBorder svg and FillText span inside each box
  document.querySelectorAll('.circuit-drawborder, .circuit-filltext').forEach(el => el.style.setProperty('--fill', '0.6'));
  const rect = document.querySelector('.circuit-drawborder rect');
  const fillText = document.querySelector('.circuit-filltext-fill');
  return JSON.stringify({
    boxes: boxes.length,
    rectDashoffset: getComputedStyle(rect).strokeDashoffset,
    digitClip: getComputedStyle(fillText).clipPath,
    digitColor: getComputedStyle(fillText).color
  });
})()
```
Expected: `boxes` = 7; `rectDashoffset` resolves to ~0.4 (1 − 0.6); `digitClip` is an `inset(...)` clipping ~40% from the top; `digitColor` is rust `rgb(192, 76, 42)`. Screenshot at `--fill:1` — each box shows a full terracotta border and fully terracotta digits; at `0`, dull border + dull digits. Confirm the terracotta border aligns acceptably over the dull CSS border (if it sits visibly inset, note for Task 7 tuning).

- [ ] **Step 6: Commit**

```bash
git add components/circuit/DrawBorder.tsx components/circuit/NumberBox.tsx app/globals.css
git commit -m "feat: DrawBorder + numerals fill (box draws on, digits fill terracotta)"
```

---

### Task 4: Outline button borders draw on

**Files:**
- Modify: `components/ui/Button.tsx`

- [ ] **Step 1: Add the DrawBorder overlay to outline variants in `components/ui/Button.tsx`**

The outline variants keep their dull CSS border as the base and host a terracotta `DrawBorder`. The button must be `position:relative` so the overlay anchors to it. Make these changes:

Add the import at the top:
```tsx
import DrawBorder from '@/components/circuit/DrawBorder'
```

Add `'use client'` as the very first line (DrawBorder is a client component):
```tsx
'use client'
```

Add `relative` to the `base` class string so it reads:
```tsx
const base =
  'group relative inline-flex items-center justify-center gap-2 font-body font-medium rounded-sm transition-all duration-250 ease-out-expo focus-visible:outline-2 focus-visible:outline-offset-2'
```

Compute whether this variant draws a border (outline variants only), and render the overlay inside `inner`:
```tsx
  const drawsBorder = variant === 'outline' || variant === 'outline-dark'
  const inner = (
    <>
      {drawsBorder && <DrawBorder radius={2} band={120} />}
      {children}
      {arrow && (
        <span
          aria-hidden="true"
          className="transition-transform duration-250 ease-out-expo group-hover:translate-x-0.5"
        >
          →
        </span>
      )}
    </>
  )
```

(Leave the `primary`/`ghost` variants and the `external`/`Link` branches exactly as they are. `rounded-sm` = 2px, matching `radius={2}`.)

- [ ] **Step 2: Verify compile**

Run: `npx tsc --noEmit`
Expected: passes. `Button` is already used across routes with the same props; adding an internal overlay doesn't change its API.

- [ ] **Step 3: Visual check (preview)**

Reload `/`. The home hero "See our work" (`outline`) and "What we do" `/services` (`outline-dark`) buttons each contain a `.circuit-drawborder`. Write a value and confirm:
```js
(() => {
  const btnBorders = [...document.querySelectorAll('a .circuit-drawborder, button .circuit-drawborder')];
  btnBorders.forEach(el => el.style.setProperty('--fill', '0.7'));
  const rect = btnBorders[0] && btnBorders[0].querySelector('rect');
  return JSON.stringify({ outlineButtonsWithBorder: btnBorders.length, dashoffset: rect && getComputedStyle(rect).strokeDashoffset });
})()
```
Expected: at least 2 outline buttons carry a DrawBorder; `dashoffset` ~0.3. Screenshot at `--fill:1` — outline buttons show a terracotta border drawn over their dull edge; the solid "Book a call" is unchanged. Confirm hover still works (CSS hover border unaffected).

- [ ] **Step 4: Commit**

```bash
git add components/ui/Button.tsx
git commit -m "feat: outline button borders draw on terracotta with the fill front"
```

---

### Task 5: Full element-type verification (brief Phase-3 done-when)

**Files:** none (verification; tuning fixes only if a check fails).

Because rAF is paused in the hidden preview tab, verification writes representative `--fill` values directly (the Phase-2 criteria already proved the engine computes correct positional values; here we verify each element type *renders* correctly across the 0→1 range and is reversible).

- [ ] **Step 1: Sweep every element type 0 → 0.5 → 1**

```js
(() => {
  const set = v => document.querySelectorAll('.circuit-divider, .circuit-drawborder, .circuit-filltext').forEach(el => el.style.setProperty('--fill', String(v)));
  const read = () => ({
    divSeg: getComputedStyle(document.querySelector('.circuit-divider-seg-l')).transform,
    rectOff: getComputedStyle(document.querySelector('.circuit-drawborder rect')).strokeDashoffset,
    textClip: getComputedStyle(document.querySelector('.circuit-filltext-fill')).clipPath,
  });
  set(0); const z = read(); set(0.5); const h = read(); set(1); const o = read(); set(0);
  return JSON.stringify({ zero: z, half: h, one: o }, null, 1);
})()
```
Expected: at 0 — divider segment `scaleX(0)` (matrix …0,0…), rect dashoffset ~1 (undrawn), text clip `inset(100% …)` (hidden). At 1 — segment `scaleX(1)`, dashoffset ~0 (fully drawn), clip `inset(0% …)` (fully shown). At 0.5 — all halfway. Reversibility is inherent (pure CSS function of `--fill`).

- [ ] **Step 2: Screenshots at fill extremes**

Set all `--fill` to `1`, screenshot `/` (light hero + dark "What we do") → every divider is a full terracotta rail-to-rail line, every numeral box + digits terracotta, outline buttons fully bordered. Set to `0`, screenshot → everything dull, only the dull bases visible. Confirm dark-section elements read cleanly (rust on near-black).

- [ ] **Step 3: Brief Phase-3 "done when" confirmation**

Confirm against the brief: (1) dividers fill inward from both rails and meet center ✓; (2) number box border AND digits fill ✓; (3) button borders draw on ✓; (4) every type is positional + reversible, consistent with rails ✓ (all read the same `--fill` the engine writes).

- [ ] **Step 4: console + build**

`preview_console_logs` (error): empty. Run `npm run build`: succeeds.

- [ ] **Step 5: Commit any tuning fixes**

```bash
git add -A
git commit -m "fix: circuit Phase 3 fill tuning (alignment/bands)"
```
(Skip if none needed.)

---

### Task 6 (OPTIONAL — per Decision 2): Stem + fork fill

**Files:**
- Modify: `components/circuit/CircuitLayout.tsx`
- Modify: `app/globals.css`

Only do this if Decision 2 stands (stem/fork should fill). If the reviewer wants the stem/fork to stay dull, skip this task — Phase 3's brief criteria are already met by Tasks 1–5.

- [ ] **Step 1: Add terracotta fill lines for the stem + fork in `components/circuit/CircuitLayout.tsx`**

In the home-only `{fork && ( … )}` block, after the existing dull stem + fork `<line>`s, add terracotta overlays registered via `useFill`. Add two more fill refs near `leftFillRef`/`rightFillRef`:
```tsx
  const stemFillRef = useFill()
  const forkFillRef = useFill()
```
And inside the `{fork && (` fragment, after the two dull lines:
```tsx
          <line
            ref={stemFillRef}
            className="circuit-rail-fill"
            x1={fork.x}
            y1={fork.stemTop}
            x2={fork.x}
            y2={fork.y}
            pathLength={1}
          />
          <line
            ref={forkFillRef}
            className="circuit-rail-fill"
            x1={xL}
            y1={fork.y}
            x2={xR}
            y2={fork.y}
            pathLength={1}
          />
```
(Reuses the existing `.circuit-rail-fill` class — same stroke-dashoffset reveal. The stem fills top→bottom from the logo; the fork's `<line>` starts at `xL`, so it reveals left→right. Since the stem/fork sit at/above the global `forkY`, they reach `--fill:1` almost immediately as scrolling begins, reading as the circuit powering on from the logo.)

- [ ] **Step 2: Verify compile**

Run: `npx tsc --noEmit`
Expected: passes.

- [ ] **Step 3: Visual check**

Reload `/`. Write `--fill:1` to all `.circuit-rail-fill` and screenshot the hero: the stem under the logo `|`, the horizontal fork, and both rails are continuous terracotta. At `--fill:0` they're dull. Confirm the stem aligns under the logo glyph.

- [ ] **Step 4: Commit**

```bash
git add components/circuit/CircuitLayout.tsx
git commit -m "feat: hero stem + fork fill with the circuit (powers on from the logo)"
```

---

### Task 7: Tuning pass (bands, alignment, dark-section)

**Files:** `app/globals.css` and/or band props (only if a check flagged something).

- [ ] **Step 1: Band feel** — if any thin element snaps too hard or eases too slowly, adjust its `band` (divider 100, digits 80, box 100, button 120 as starting points). Bands are passed at the call sites / primitives.
- [ ] **Step 2: Border alignment** — if a `DrawBorder` terracotta stroke sits visibly inset from the dull CSS border, nudge `.circuit-drawborder { inset: -1px; }` (or per-host) so the draw-on sits on the border edge.
- [ ] **Step 3: Dark-section legibility** — confirm terracotta dividers/borders/digits read cleanly on `.section-dark`; rust is saturated so this should pass, but verify.
- [ ] **Step 4: Final build + console** — `npm run build` succeeds; no console errors.
- [ ] **Step 5: Commit** any tweaks: `git commit -am "fix: circuit Phase 3 tuning"` (skip if none).

---

## Done When (Phase 3)

- Section dividers fill inward from both rails and meet at center as the front crosses them.
- Editorial numerals: box border draws on AND digits fill terracotta bottom-up.
- Outline button borders draw on terracotta; the solid primary is unchanged.
- (If Task 6 done) the hero stem + fork fill.
- Every element type reads the same engine `--fill` → positional + reversible, consistent with the rails.
- `npx tsc --noEmit` + `npm run build` pass; no console errors; dark sections read cleanly.

## Deferred to later (NOT in this plan)

- **Phase 4:** `prefers-reduced-motion` (keep positional color, drop easing/catch-up), `IntersectionObserver` gating so offscreen elements skip per-frame writes, `will-change` on actively-filling elements, 60fps profiling, optional node markers (dots where rail meets divider), cross-browser (Safari) verification, tune `REF`.
- Inner routes (Services/Work/Forge/About/Contact) converted to `<Section>` blocks with dividers.

---

## Self-Review

- **Spec coverage (brief Phase 3):** `<Divider>` inward-from-rails (Task 1); `<FillText>` digits (Task 2); `<DrawBorder>` for number box (Task 3) + buttons (Task 4); all positional/reversible via the shared `--fill` (Task 5). Brief's 4 "done when" items each map to a task. Stem/fork (Task 6) is beyond the brief's Phase-3 criteria and explicitly optional. ✓
- **Type consistency:** all three primitives call `useFill({ band })` (returns a callback ref `(el: HTMLElement | SVGElement | null) => void`) and attach it to a `<span>`/`<svg>` — both valid ref targets, matching the Phase-2 hook signature. `NumberBox` keeps its `children`/`tone`/`className` API (used unchanged in `HorizonRows`/`page.tsx`). `Button` keeps its public props (overlay is internal). ✓
- **Placeholder scan:** every code step shows complete code; every verification step shows the exact `preview_eval` and expected result. ✓
- **CSS-var inheritance:** the engine writes `--fill` to the registered element (Divider span, FillText span, DrawBorder svg); child segments/overlays read `var(--fill)` via inheritance — verified each registered element is the ancestor of the elements consuming the var. ✓
- **Scope discipline:** only dividers/numerals/outline-buttons (+ optional stem/fork) fill; inner routes and all Phase-4 perf/motion work deferred; solid primary untouched. ✓
- **Known tuning risk:** DrawBorder alignment over the CSS border and band feel are visual-tune items, isolated in Task 7 with a concrete fix (`inset:-1px`) rather than left vague. ✓
```
