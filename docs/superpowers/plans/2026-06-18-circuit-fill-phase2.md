# Circuit Fill — Phase 2 (Fill Engine, Proven on Rails) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the positional fill engine — one global `requestAnimationFrame` loop computing a document-space `fillFrontDocY` — and prove it end-to-end on the simplest element (the two edge rails) before any other element type is touched.

**Architecture:** The existing `CircuitProvider` (a no-op registry in Phase 1) becomes the engine: it owns ONE rAF loop, caches each registered element's document geometry (measured in a separate READ phase, never during writes), and each frame writes a `0..1` positional fill to every registered element's `--fill` CSS variable — directly via `el.style`, never through React state, so there are zero per-frame re-renders. A `useFill()` callback-ref hook registers a DOM node when it mounts and unregisters when it unmounts. `CircuitLayout` gains a terracotta fill `<line>` over each dull rail; CSS turns `--fill` into a stroke-dash reveal that grows from the fork downward.

**Tech Stack:** Next 16 (App Router), React 18, TypeScript, Tailwind v3.4, plain CSS custom properties + `requestAnimationFrame`. No framer-motion (its scroll springs are exactly the scroll-accumulated model this replaces). No test runner exists in this project (`package.json` scripts are `dev`/`build`/`start`/`lint`, and `next lint` is removed in Next 16 with no ESLint config present), so each task is verified with `npx tsc --noEmit` plus measurable assertions read from the live DOM via the browser preview against the brief's Phase-2 "done when" criteria.

**Reference docs:**
- Brief: `docs/superpowers/specs/2026-06-18-circuit-fill-brief.md` (Phase 2 section + Core Model)
- Design: `docs/superpowers/specs/2026-06-18-circuit-fill-design.md` (Architecture → Fill engine)
- Prior plan (done): `docs/superpowers/plans/2026-06-18-circuit-fill-phase0-1.md`

**Tokens (already in `app/globals.css`):** dull `--color-muted` = `#9A8F82` (rails base, unchanged); filled `--color-rust` = `#C04C2A` (terracotta fill, first used here).

**Scope guard — Phase 2 is RAILS ONLY.** Dividers, number boxes, button borders, digits, and the hero stem/fork stay dull this round. They register (sections already do) so the engine drives them, but only the rails get a terracotta visual. Fanning out to other element types is Phase 3. Do not add fill visuals to anything but the two rails.

---

## Core model (from the brief — implemented here)

One global value, `fillFrontDocY`, a Y coordinate in *document* space:

```
fillFrontDocY = clamp(window.scrollY + window.innerHeight * REF, forkDocY, pageBottomDocY)
REF = 0.5
```

Per-element local fill (written to that element's `--fill`):

```
localFill = clamp((fillFrontDocY - elementTopDocY) / elementSpan, 0, 1)
```

`forkDocY` / `pageBottomDocY` are derived from the registered elements themselves
(min top / max bottom), so the engine needs no coupling back to `CircuitLayout`'s
geometry — the rails, which start at the fork, set the lower bound naturally.

**Reconciliation note (rails fill technique):** the brief suggests `transform: scaleY`
for the rails. This plan uses SVG **`stroke-dashoffset`** instead (`pathLength={1}`,
`stroke-dasharray: 1`, `stroke-dashoffset: calc(1 - var(--fill))`). Same visual —
a terracotta line growing from the fork (the line's start point) downward — but it
avoids SVG `transform-box`/`transform-origin` cross-browser pitfalls and is identical
to the stroke-fill technique the design already commits to for Phase 3 borders. The
design doc grants this doc authority to reconcile technique with the real codebase.

---

## File Structure

- **Modify** `components/circuit/CircuitContext.tsx` — replace the no-op registry body with the rAF engine (geometry cache, READ/WRITE split, `fillFrontDocY`, per-element `--fill` writes). Public API (`CircuitProvider`, `useCircuit`, `register`) is unchanged so `app/layout.tsx` needs no edits.
- **Create** `components/circuit/useFill.ts` — a callback-ref hook that registers a node on mount / unregisters on unmount.
- **Modify** `components/circuit/Section.tsx` — use `useFill()` instead of the inline `useCircuit()` effect (DRY; same behavior).
- **Modify** `components/circuit/CircuitLayout.tsx` — add a terracotta fill `<line>` over each dull rail, registered via `useFill()`.
- **Modify** `app/globals.css` — add the `.circuit-rail-fill` rule + `--fill` default.

No new dependencies. No changes to `app/layout.tsx`, `app/page.tsx`, or any route.

---

# PHASE 2 — FILL ENGINE

### Task 1: The rAF fill engine (CircuitContext)

**Files:**
- Modify: `components/circuit/CircuitContext.tsx` (full rewrite of the provider body; types + exports stay compatible)

- [ ] **Step 1: Replace the file contents**

Overwrite `components/circuit/CircuitContext.tsx` with:

```tsx
// ── components/circuit/CircuitContext.tsx ──
// The circuit fill ENGINE. Owns one requestAnimationFrame loop for the whole
// page. Each frame it computes a single document-space fill front
// (fillFrontDocY = scrollY + innerHeight*REF, clamped to the fork/page-bottom)
// and writes each registered element's positional fill (0..1) to its --fill CSS
// variable, directly via el.style — NEVER through React state, so scrolling
// triggers zero re-renders. Geometry is measured in a separate READ phase
// (getBoundingClientRect) and only when flagged dirty; the per-frame WRITE phase
// never reads layout, so there is no read/write thrash.
'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'

export interface FillRegistration {
  /** The element whose document geometry the engine tracks. */
  el: HTMLElement | SVGElement
  /** Optional fill band (px) for thin elements; undefined = use element height. */
  band?: number
}

export interface CircuitContextValue {
  register: (reg: FillRegistration) => () => void
}

// Viewport reference line (fraction of viewport height) defining the fill front
// in document space. 0.5 = mid-viewport. Tunable in Phase 4.
const REF = 0.5

interface Geometry {
  /** Document-space top of the element's fill span. */
  top: number
  /** Length (px) over which the element interpolates 0→1. */
  span: number
}

const CircuitContext = createContext<CircuitContextValue | null>(null)

export function CircuitProvider({ children }: { children: React.ReactNode }) {
  const registry = useRef<Set<FillRegistration>>(new Set())
  const geometry = useRef<Map<FillRegistration, Geometry>>(new Map())
  const bounds = useRef({ forkY: 0, pageBottom: 0 })
  const lastFill = useRef<Map<FillRegistration, number>>(new Map())
  const needsMeasure = useRef(true)

  const register = useCallback((reg: FillRegistration) => {
    registry.current.add(reg)
    needsMeasure.current = true
    return () => {
      registry.current.delete(reg)
      geometry.current.delete(reg)
      lastFill.current.delete(reg)
      needsMeasure.current = true
    }
  }, [])

  useEffect(() => {
    let raf = 0

    // READ phase — the ONLY place layout is read. Runs on mount, on flagged
    // changes (resize / fonts / load / register), never inside the write loop.
    const measure = () => {
      const scrollY = window.scrollY
      let forkY = Infinity
      let pageBottom = 0
      geometry.current.clear()
      registry.current.forEach((reg) => {
        const r = reg.el.getBoundingClientRect()
        const top = r.top + scrollY
        if (reg.band) {
          // Thin element: a fill band centered on it, so it eases across a short
          // travel instead of snapping.
          const center = top + r.height / 2
          geometry.current.set(reg, { top: center - reg.band / 2, span: reg.band })
        } else {
          // Tall element (rail, section): fill across its own height.
          geometry.current.set(reg, { top, span: r.height || 1 })
        }
        const g = geometry.current.get(reg)!
        forkY = Math.min(forkY, g.top)
        pageBottom = Math.max(pageBottom, g.top + g.span)
      })
      bounds.current = {
        forkY: forkY === Infinity ? 0 : forkY,
        pageBottom: Math.max(pageBottom, document.documentElement.scrollHeight),
      }
      needsMeasure.current = false
    }

    // WRITE phase — style writes only, no layout reads.
    const tick = () => {
      if (needsMeasure.current) measure()
      const { forkY, pageBottom } = bounds.current
      const front = Math.min(
        Math.max(window.scrollY + window.innerHeight * REF, forkY),
        pageBottom,
      )
      registry.current.forEach((reg) => {
        const g = geometry.current.get(reg)
        if (!g) return
        const fill = Math.min(Math.max((front - g.top) / g.span, 0), 1)
        if (lastFill.current.get(reg) !== fill) {
          reg.el.style.setProperty('--fill', String(fill))
          lastFill.current.set(reg, fill)
        }
      })
      raf = requestAnimationFrame(tick)
    }

    const flagMeasure = () => {
      needsMeasure.current = true
    }
    window.addEventListener('resize', flagMeasure, { passive: true })
    window.addEventListener('load', flagMeasure)
    const ro = new ResizeObserver(flagMeasure)
    ro.observe(document.body)
    if (document.fonts?.ready) document.fonts.ready.then(flagMeasure)
    const settle = window.setTimeout(flagMeasure, 400) // re-measure after font swap

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', flagMeasure)
      window.removeEventListener('load', flagMeasure)
      ro.disconnect()
      window.clearTimeout(settle)
    }
  }, [])

  const value = useMemo<CircuitContextValue>(() => ({ register }), [register])

  return <CircuitContext.Provider value={value}>{children}</CircuitContext.Provider>
}

/** Returns the circuit engine, or null if used outside a provider. */
export function useCircuit(): CircuitContextValue | null {
  return useContext(CircuitContext)
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: passes (no output). `FillRegistration.el` is widened to `HTMLElement | SVGElement`; the existing `Section.tsx` passes an `HTMLElement`, still assignable.

- [ ] **Step 3: Commit**

```bash
git add components/circuit/CircuitContext.tsx
git commit -m "feat: circuit fill engine — single rAF loop, positional fillFrontDocY"
```

---

### Task 2: `useFill()` callback-ref hook + Section adoption

**Files:**
- Create: `components/circuit/useFill.ts`
- Modify: `components/circuit/Section.tsx`

- [ ] **Step 1: Create `components/circuit/useFill.ts`**

```tsx
// ── components/circuit/useFill.ts ──
// Registers a DOM node as a circuit-fill participant. Returns a *callback ref*:
// React calls it with the node when it mounts and with null when it unmounts, so
// registration tracks the element's real lifecycle (this matters for elements
// that mount late — e.g. the rails, which only render after CircuitLayout has
// measured its geometry). The engine writes the node's positional fill to its
// --fill CSS variable each frame; this hook never causes a re-render. Pass `band`
// (px) for thin elements that should ease across a short travel; omit for tall
// elements (rails, sections).
'use client'

import { useCallback, useRef } from 'react'
import { useCircuit } from './CircuitContext'

export function useFill({ band }: { band?: number } = {}) {
  const circuit = useCircuit()
  const cleanup = useRef<(() => void) | null>(null)

  return useCallback(
    (el: HTMLElement | SVGElement | null) => {
      if (cleanup.current) {
        cleanup.current()
        cleanup.current = null
      }
      if (el && circuit) {
        cleanup.current = circuit.register({ el, band })
      }
    },
    [circuit, band],
  )
}
```

- [ ] **Step 2: Refactor `components/circuit/Section.tsx` to use it**

Overwrite `components/circuit/Section.tsx` with:

```tsx
// ── components/circuit/Section.tsx ──
// A full-bleed page band that emits a dull rail-to-rail top divider into the
// circuit layer and registers itself with the fill engine via useFill. Authoring
// a page = composing <Section> blocks; dividers are never hardcoded. Pass
// `firstBand` to suppress the divider where a band should not have one (e.g. the
// band right under the hero fork). The inner centered container lives in the
// children. (Phase 2: the section registers and the engine drives its --fill, but
// nothing consumes it visually yet — section/divider fill visuals arrive in
// Phase 3. The divider stays dull this round.)
'use client'

import { cn } from '@/lib/utils'
import { useFill } from './useFill'

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
  const fillRef = useFill()

  return (
    <section ref={fillRef} id={id} className={cn('relative', className)}>
      {!firstBand && <span aria-hidden="true" className="circuit-divider" />}
      {children}
    </section>
  )
}
```

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: passes. `useFill()` returns `(el: HTMLElement | SVGElement | null) => void`; React accepts it as a `ref` on the `<section>`.

- [ ] **Step 4: Visual smoke check (no regression)**

Ensure the dev server is running (`day-one-web` preview, port 3007) and reload `/`.
Expected: the skeleton is unchanged from Phase 1 — dull rails, fork, 4 dividers, 7 boxes; no console errors. (No fill visual yet; that is Task 3.)

- [ ] **Step 5: Commit**

```bash
git add components/circuit/useFill.ts components/circuit/Section.tsx
git commit -m "feat: useFill callback-ref hook; Section registers via it"
```

---

### Task 3: Terracotta rail fill (CircuitLayout + CSS)

**Files:**
- Modify: `components/circuit/CircuitLayout.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Add the fill `<line>`s to `components/circuit/CircuitLayout.tsx`**

Add the import near the top (after the existing imports):

```tsx
import { useFill } from './useFill'
```

Inside `CircuitLayout`, declare two fill refs at the top of the component body, immediately after the existing `const [geo, setGeo] = useState<Geometry | null>(null)` line:

```tsx
  const leftFillRef = useFill()
  const rightFillRef = useFill()
```

Then, in the returned SVG, add the two terracotta fill lines directly **after** the existing dull rail lines (the two `<line … />` for `xL`/`xR`). The dull rails stay exactly as they are; the fill lines are drawn over them:

```tsx
      {/* Terracotta fill over each rail — grows from the fork downward as the
          engine writes --fill. pathLength normalizes the dash math to 0..1. */}
      <line
        ref={leftFillRef}
        className="circuit-rail-fill"
        x1={xL}
        y1={railTop}
        x2={xL}
        y2={docHeight}
        pathLength={1}
      />
      <line
        ref={rightFillRef}
        className="circuit-rail-fill"
        x1={xR}
        y1={railTop}
        x2={xR}
        y2={docHeight}
        pathLength={1}
      />
```

The `if (!geo) return null` early return stays. Because `useFill` returns a callback
ref, when `geo` transitions `null → set` and the lines mount, React calls the ref
with the node → it registers; the engine flags a re-measure and starts filling.

- [ ] **Step 2: Add the `.circuit-rail-fill` rule to `app/globals.css`**

Append at the end of the existing circuit block (right after the `.circuit-numbox { … }` rule, around line 394):

```css
/* Terracotta rail fill, drawn over the dull rail. The engine writes --fill
   (0..1); the dash reveals that fraction of the line from its start point (the
   fork) downward. stroke-dashoffset (not transform) keeps it Safari-reliable and
   consistent with the Phase 3 stroke-fill borders. */
.circuit-rail-fill {
  stroke: var(--color-rust);
  stroke-width: 1;
  stroke-dasharray: 1;
  stroke-dashoffset: calc(1 - var(--fill, 0));
  pointer-events: none;
}
```

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: passes. (`pathLength` is a valid SVG attribute in React's typings as a number.)

- [ ] **Step 4: Visual check — fill appears and grows**

Reload `/` in the preview and screenshot.
Expected: a short terracotta segment at the top of both rails just below the fork at load; no terracotta above the fork; the stem/fork themselves stay dull (rails-only scope). No console errors.

- [ ] **Step 5: Commit**

```bash
git add components/circuit/CircuitLayout.tsx app/globals.css
git commit -m "feat: terracotta rail fill driven by the positional engine"
```

---

### Task 4: Prove the positional model (Phase 2 done-when verification)

**Files:** none (verification only; small fixes to Task 1–3 files if a check fails).

All checks run in the preview via `preview_eval`. Because the page uses CSS
`scroll-behavior: smooth`, **always scroll with `behavior: 'instant'`** (or read
`--fill` a moment after) so reads reflect the target position, not the in-flight
animation. Helper used below:

```js
const railFill = () => parseFloat(
  document.querySelector('.circuit-rail-fill').style.getPropertyValue('--fill') || '0'
)
const jump = (y) => window.scrollTo({ top: y, behavior: 'instant' })
```

- [ ] **Step 1: Criterion 1 — fill starts at the fork at `scrollY = 0`, never above**

Run in `preview_eval`:
```js
(() => {
  window.scrollTo({ top: 0, behavior: 'instant' });
  const f = parseFloat(document.querySelector('.circuit-rail-fill').style.getPropertyValue('--fill') || '0');
  const svg = document.querySelector('svg.circuit-layer');
  const fillLine = svg.querySelector('.circuit-rail-fill');
  const dullTop = +svg.querySelector('line').getAttribute('y1');   // dull rail y1 = fork
  const fillTop = +fillLine.getAttribute('y1');                    // fill line y1
  return JSON.stringify({ fillAtTop: f, startsAtFork: fillTop === dullTop, aboveFork: f < 0 });
})()
```
Expected: `fillAtTop` is a small positive number (≈0.01–0.03, = `(innerHeight*0.5 − forkY) / railSpan`), `startsAtFork` is `true`, `aboveFork` is `false`. The terracotta originates exactly at the fork — never higher.

- [ ] **Step 2: Criterion 2 — scroll down advances, scroll up drains, monotonic with position**

Run:
```js
(() => {
  const r = () => parseFloat(document.querySelector('.circuit-rail-fill').style.getPropertyValue('--fill') || '0');
  const J = (y) => window.scrollTo({ top: y, behavior: 'instant' });
  const H = document.documentElement.scrollHeight;
  J(0);              const a = r();
  J(H * 0.25);       const b = r();
  J(H * 0.6);        const c = r();
  J(H * 0.25);       const d = r();
  J(0);              const e = r();
  return JSON.stringify({ a, b, c, d, e, ascending: a < b && b < c, drainsBack: Math.abs(d - b) < 0.02 && Math.abs(e - a) < 0.02 });
})()
```
Expected: `ascending` is `true` (more scroll → more fill), `drainsBack` is `true` (returning to a prior position restores that position's fill — fully reversible, no latching).

- [ ] **Step 3: Criterion 3 — a jump lands already-correct, no catch-up**

Run (read immediately after the instant jump — a positional engine needs no settling frames):
```js
(() => {
  const J = (y) => window.scrollTo({ top: y, behavior: 'instant' });
  const r = () => parseFloat(document.querySelector('.circuit-rail-fill').style.getPropertyValue('--fill') || '0');
  J(0);
  const target = document.documentElement.scrollHeight * 0.7;
  J(target);
  const immediate = r();
  // expected positional value from the model:
  const svg = document.querySelector('svg.circuit-layer');
  const forkY = +svg.querySelector('line').getAttribute('y1');
  const bottom = +svg.querySelector('line').getAttribute('y2');
  const front = Math.min(Math.max(target + innerHeight * 0.5, forkY), Math.max(bottom, document.documentElement.scrollHeight));
  const expected = Math.min(Math.max((front - forkY) / (bottom - forkY), 0), 1);
  return JSON.stringify({ immediate, expected, lands: Math.abs(immediate - expected) < 0.03 });
})()
```
Expected: `lands` is `true` — the post-jump fill matches the positional formula within rounding, with no animated catch-up (the value is correct on the first read).

- [ ] **Step 4: Criterion 4 — reload mid-document shows correct fill on load**

In `preview_eval`, scroll to the middle and reload, then (after reload) read the fill:
```js
// First call:
window.scrollTo({ top: document.documentElement.scrollHeight * 0.5, behavior: 'instant' }); location.reload();
```
After the reload completes, run:
```js
(() => {
  const f = parseFloat(document.querySelector('.circuit-rail-fill').style.getPropertyValue('--fill') || '0');
  return JSON.stringify({ scrollY: Math.round(window.scrollY), fill: f, midRange: f > 0.2 && f < 0.9 });
})()
```
Expected: after reload the browser restores the mid-document scroll position and `fill` reflects it (`midRange` true) — the fill is a pure function of position, not of a scroll journey from the top.

- [ ] **Step 5: Criterion 5 — no per-frame React re-renders**

The engine writes only to `el.style`. Confirm: (a) `--fill` is an *inline* style on the rail (proves a direct style write, not a class/state change), and (b) attributes that only change on a `CircuitLayout` re-render (the SVG `width`/`height`) stay constant while scrolling — i.e. scrolling does not re-render the component:
```js
(() => {
  const svg = document.querySelector('svg.circuit-layer');
  const before = svg.getAttribute('width') + 'x' + svg.getAttribute('height');
  const J = (y) => window.scrollTo({ top: y, behavior: 'instant' });
  const H = document.documentElement.scrollHeight;
  for (let i = 0; i <= 10; i++) J(H * i / 10);
  const after = svg.getAttribute('width') + 'x' + svg.getAttribute('height');
  const fillLine = document.querySelector('.circuit-rail-fill');
  const inlineFill = fillLine.style.getPropertyValue('--fill') !== '';
  return JSON.stringify({ before, after, noReRenderDuringScroll: before === after, writesInlineStyle: inlineFill });
})()
```
Expected: `noReRenderDuringScroll` is `true` (SVG dims unchanged across a full scroll sweep → no re-render driven by scroll) and `writesInlineStyle` is `true` (engine mutates `style` directly).

- [ ] **Step 6: Responsive + dark-section re-check + console**

- `preview_resize` to mobile (375), tablet (768), desktop (1280): rails + fill stay at the correct inset; fill still grows from the fork; no layout break.
- Confirm the terracotta reads cleanly over `.section-dark` bands (rust on near-black).
- `preview_console_logs` (level `error`): empty.

- [ ] **Step 7: Full build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 8: Commit any fixes**

```bash
git add -A
git commit -m "fix: circuit Phase 2 verification tuning"
```
(Skip if no fixes were needed — Task 1–3 commits already stand.)

---

## Done When (Phase 2)

- `scrollY = 0` → rail fill starts exactly at the fork, never above (Task 4 Step 1).
- Scrolling down advances fill; scrolling up drains it; fill always matches viewport position and is fully reversible (Step 2).
- A jump to a lower position lands with the rails-above already filled, instantly, no catch-up (Step 3).
- Reloading mid-document shows the correct fill on load (Step 4).
- No per-frame React re-renders; the engine only writes `--fill` to refs (Step 5).
- One global rAF loop (in `CircuitProvider`); no per-element scroll listeners.
- Rails only — no other element type has a fill visual yet.
- `npx tsc --noEmit` and `npm run build` pass; no console errors; responsive + dark-section verified.

## Deferred to later phases (NOT in this plan)

- **Phase 3:** `<Divider>` (inward-from-rails), `<FillText>` (digits via clip-path), `<DrawBorder>` (number box + button borders via stroke-dashoffset); stem/fork fill if desired.
- **Phase 4:** `prefers-reduced-motion` (keep positional color, drop easing/catch-up), `IntersectionObserver` gating so offscreen elements skip per-frame writes, `will-change` on actively-filling elements, 60fps profiling, optional node markers, cross-browser (Safari) verification, `REF` tuning.
- Inner routes (Services/Work/Forge/About/Contact) converted to `<Section>` blocks with dividers.

---

## Self-Review

- **Spec coverage (brief Phase 2):** `<FillProvider>` one-rAF-loop + `fillFrontDocY` (Task 1); `useFill(ref, {band})` registering + writing `--fill` to refs, no re-renders (Tasks 1–2); geometry cache measured once + on resize/RO/fonts/load, batched reads-then-writes (Task 1 `measure`/`tick` split); wire rails only, dull base + terracotta over it (Task 3). All five "done when (measured on rails)" items map to a Task 4 step (1→S1, 2→S2, 3→S3, 4→S4, 5→S5). ✓
- **Type consistency:** `FillRegistration { el: HTMLElement | SVGElement; band? }` defined in Task 1, consumed by `register` (Task 1) and `useFill` (Task 2), which passes `{ el, band }`; `useFill()` returns a callback ref `(el: HTMLElement | SVGElement | null) => void` used on a `<section>` (Task 2) and `<line>` (Task 3) — both valid React ref targets. `useCircuit()` unchanged. ✓
- **Placeholder scan:** every code step shows complete code; every verification step shows the exact `preview_eval` expression and expected result. No TBD/TODO. ✓
- **Project-fit note:** no test runner exists, so verification follows the established Phase 0/1 pattern (tsc + measurable DOM assertions in the preview) rather than a unit-test harness — deliberate, matches the codebase. ✓
- **Scope guard:** only the two rails get a fill visual; sections register but render no fill; stem/fork stay dull — consistent with the brief's "proven on rails only." ✓
```
