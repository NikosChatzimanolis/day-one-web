# Circuit Fill — Phase 4 (Polish & Hardening) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Harden the proven circuit-fill engine for production — gate per-frame work to on-screen elements (IntersectionObserver), idle the loop when nothing moves, hint the compositor only while actively filling (`will-change`), honor `prefers-reduced-motion`, add the optional rail∩divider node markers, and verify Phase 1–3 still pass with a clean perf profile across target browsers.

**Architecture:** Only the engine (`CircuitContext.tsx`) and the `Divider`/CSS gain changes. The positional model, the public API (`CircuitProvider`/`useCircuit`/`register`), and every Phase 1–3 primitive are unchanged. The engine adds: (1) an `IntersectionObserver` so the per-frame write loop iterates only on-screen registrants; (2) an idle short-circuit that skips the loop when `scrollY` is unchanged and nothing is dirty; (3) a `data-filling` attribute toggled while `0<fill<1`, which CSS uses to apply per-element-type `will-change`. `prefers-reduced-motion` needs no behavioral change (the mechanic adds no time-based motion — fill is a pure function of scroll position), so it's handled by an explicit CSS guard + verification.

**Tech Stack:** Next 16, React 18, TypeScript, Tailwind v3.4, CSS custom properties + `requestAnimationFrame` + `IntersectionObserver`. No test runner / no ESLint config — verify with `npx tsc --noEmit` + `npm run build` + measurable DOM assertions in the preview. **Preview gotcha:** the preview tab is `visibilityState:hidden` → rAF is paused; drive verification by actively scrolling and/or writing representative `--fill` values, and read DOM/CSS state.

**Reference docs:**
- Brief: `docs/superpowers/specs/2026-06-18-circuit-fill-brief.md` (Phase 4)
- Phase 2 plan (engine): `docs/superpowers/plans/2026-06-18-circuit-fill-phase2.md`
- Phase 3 plan (primitives): `docs/superpowers/plans/2026-06-18-circuit-fill-phase3.md`

---

## File Structure

- **Modify** `components/circuit/CircuitContext.tsx` — IntersectionObserver gating, idle short-circuit, `data-filling` toggle. (Full rewrite; public API + positional math unchanged.)
- **Modify** `components/circuit/Divider.tsx` — add two node-marker dots at the rail ends.
- **Modify** `app/globals.css` — per-type `will-change` under `[data-filling]`, reduced-motion guard, node-marker styles.

No changes to `useFill.ts`, `CircuitLayout.tsx`, `Section.tsx`, `FillText.tsx`, `DrawBorder.tsx`, `NumberBox.tsx`, `Button.tsx`, `app/layout.tsx`, or any route.

---

# PHASE 4 — POLISH & HARDENING

### Task 1: Engine hardening — IO gating, idle short-circuit, will-change hint

**Files:**
- Modify: `components/circuit/CircuitContext.tsx` (full rewrite of the provider body; types + exports unchanged)

- [ ] **Step 1: Overwrite `components/circuit/CircuitContext.tsx` with:**

```tsx
// ── components/circuit/CircuitContext.tsx ──
// The circuit fill ENGINE. Owns one requestAnimationFrame loop for the whole
// page. Each frame it computes a single document-space fill front
// (fillFrontDocY = scrollY + innerHeight*REF, clamped to fork/page-bottom) and
// writes each registered element's positional fill (0..1) to its --fill CSS
// variable, directly via el.style — never through React state, so scrolling
// triggers zero re-renders.
//
// Phase 4 hardening:
//  • IntersectionObserver: the per-frame write loop iterates only ON-SCREEN
//    registrants (offscreen elements keep their last correct fill — fully above
//    the front = 1, fully below = 0 — so skipping them is safe).
//  • Idle short-circuit: when scrollY is unchanged and nothing is dirty, the
//    frame does no work beyond a scrollY read.
//  • will-change: a `data-filling` attribute is toggled while 0<fill<1; CSS uses
//    it to hint the compositor only on actively-filling elements.
//  • Reduced motion: the mechanic adds no time-based motion (fill is a pure
//    function of scroll position), so no behavioral change is needed; a CSS
//    guard makes the intent explicit.
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
// in document space. 0.5 = mid-viewport.
const REF = 0.5

interface Geometry {
  top: number
  span: number
}

const CircuitContext = createContext<CircuitContextValue | null>(null)

export function CircuitProvider({ children }: { children: React.ReactNode }) {
  const registry = useRef<Set<FillRegistration>>(new Set())
  const geometry = useRef<Map<FillRegistration, Geometry>>(new Map())
  const bounds = useRef({ forkY: 0, pageBottom: 0 })
  const lastFill = useRef<Map<FillRegistration, number>>(new Map())
  const needsMeasure = useRef(true)
  const visible = useRef<Set<FillRegistration>>(new Set())
  const elToReg = useRef<Map<Element, FillRegistration>>(new Map())
  const io = useRef<IntersectionObserver | null>(null)
  const dirtyVisible = useRef(true)

  const register = useCallback((reg: FillRegistration) => {
    registry.current.add(reg)
    elToReg.current.set(reg.el, reg)
    visible.current.add(reg) // assume visible until the observer says otherwise
    io.current?.observe(reg.el)
    needsMeasure.current = true
    dirtyVisible.current = true
    return () => {
      registry.current.delete(reg)
      geometry.current.delete(reg)
      lastFill.current.delete(reg)
      visible.current.delete(reg)
      elToReg.current.delete(reg.el)
      io.current?.unobserve(reg.el)
      reg.el.removeAttribute('data-filling')
      needsMeasure.current = true
      dirtyVisible.current = true
    }
  }, [])

  useEffect(() => {
    let raf = 0
    let lastScrollY = -1

    // Observe registrants; toggle membership in the visible set. rootMargin pads
    // by half a viewport each way so elements just off-screen update smoothly.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const reg = elToReg.current.get(e.target)
          if (!reg) continue
          if (e.isIntersecting) visible.current.add(reg)
          else visible.current.delete(reg)
        }
        dirtyVisible.current = true
      },
      { rootMargin: '50% 0px 50% 0px' },
    )
    io.current = observer
    registry.current.forEach((reg) => observer.observe(reg.el))

    // READ phase — the ONLY place layout is read. Measures ALL registrants (so an
    // element's geometry is ready the moment it scrolls into view).
    const measure = () => {
      const scrollY = window.scrollY
      let forkY = Infinity
      let pageBottom = 0
      geometry.current.clear()
      registry.current.forEach((reg) => {
        const r = reg.el.getBoundingClientRect()
        const top = r.top + scrollY
        if (reg.band) {
          const center = top + r.height / 2
          geometry.current.set(reg, { top: center - reg.band / 2, span: reg.band })
        } else {
          geometry.current.set(reg, { top, span: r.height || 1 })
        }
        const g = geometry.current.get(reg)!
        forkY = Math.min(forkY, g.top)
        pageBottom = Math.max(pageBottom, g.top + g.span)
      })
      // forkY / pageBottom are GLOBAL bounds across ALL registrants (min top / max
      // bottom) used to clamp the single shared fill front.
      bounds.current = {
        forkY: forkY === Infinity ? 0 : forkY,
        pageBottom: Math.max(pageBottom, document.documentElement.scrollHeight),
      }
      needsMeasure.current = false
    }

    // WRITE phase — style writes only, no layout reads. Iterates only the VISIBLE
    // set; skips entirely when nothing changed since the last frame.
    const tick = () => {
      const measured = needsMeasure.current
      if (measured) measure()
      const sy = window.scrollY
      if (sy !== lastScrollY || measured || dirtyVisible.current) {
        const { forkY, pageBottom } = bounds.current
        const front = Math.min(Math.max(sy + window.innerHeight * REF, forkY), pageBottom)
        visible.current.forEach((reg) => {
          const g = geometry.current.get(reg)
          if (!g) return
          const fill = Math.min(Math.max((front - g.top) / g.span, 0), 1)
          if (lastFill.current.get(reg) !== fill) {
            reg.el.style.setProperty('--fill', String(fill))
            // will-change only while actively filling (0<fill<1).
            if (fill > 0 && fill < 1) reg.el.setAttribute('data-filling', '')
            else reg.el.removeAttribute('data-filling')
            lastFill.current.set(reg, fill)
          }
        })
        lastScrollY = sy
        dirtyVisible.current = false
      }
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
    const settle = window.setTimeout(flagMeasure, 400)

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', flagMeasure)
      window.removeEventListener('load', flagMeasure)
      ro.disconnect()
      observer.disconnect()
      io.current = null
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

- [ ] **Step 2: Verify compile**

Run: `npx tsc --noEmit`
Expected: passes. Public API and `FillRegistration` type unchanged → all callers compile.

- [ ] **Step 3: Functional + perf check (preview)**

Reload `/`. Confirm the positional model still works AND that offscreen elements aren't being touched. Actively scroll (the preview ticks rAF when driven), then:
```js
(() => {
  // After scrolling: elements far above should read --fill 1, far below 0; the
  // one(s) near the front should be partial and carry data-filling.
  const rail = document.querySelector('.circuit-rail-fill');
  const dividers = [...document.querySelectorAll('.circuit-divider')];
  return JSON.stringify({
    railFill: rail.style.getPropertyValue('--fill'),
    dividerFills: dividers.map(d => d.style.getPropertyValue('--fill') || '(unset)'),
    activelyFilling: document.querySelectorAll('[data-filling]').length,
    scrollY: Math.round(window.scrollY)
  });
})()
```
Expected: rail has a fractional `--fill`; dividers show a mix of `1` (passed), partial, and `0`/unset (below); `activelyFilling` is small (only elements straddling the front carry `data-filling`). Re-run the Phase-2 jump test (scroll instant to 70% → rail `--fill` matches the positional formula) to confirm IO gating didn't break correctness.

- [ ] **Step 4: Commit**

```bash
git add components/circuit/CircuitContext.tsx
git commit -m "perf: IntersectionObserver gating + idle short-circuit + will-change hint"
```

---

### Task 2: Per-type `will-change`, reduced-motion guard, node markers

**Files:**
- Modify: `components/circuit/Divider.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Add node-marker dots to `components/circuit/Divider.tsx`**

Overwrite the file with (adds two dots at the divider's rail ends; they warm to terracotta with the divider's `--fill`):

```tsx
// ── components/circuit/Divider.tsx ──
// A rail-to-rail section divider. Dull base line + two terracotta segments that
// grow inward from each rail (scaleX) to meet at center as the fill front
// crosses. Plus a node-marker dot at each rail end that warms dull→terracotta
// with the same --fill (the dot matches the "01" node in the mockup). Registers
// with a fill band so it eases across ~100px of travel. The engine writes --fill
// to this element; children read it via CSS-variable inheritance.
'use client'

import { useFill } from './useFill'

export default function Divider() {
  const ref = useFill({ band: 100 })
  return (
    <span ref={ref} aria-hidden="true" className="circuit-divider">
      <span className="circuit-divider-seg circuit-divider-seg-l" />
      <span className="circuit-divider-seg circuit-divider-seg-r" />
      <span className="circuit-node circuit-node-l" />
      <span className="circuit-node circuit-node-r" />
    </span>
  )
}
```

- [ ] **Step 2: Add the CSS in `app/globals.css`**

Append at the end of the circuit block:

```css
/* Node markers: a dot at each rail end of a divider. Dull base + a terracotta
   overlay that fades in with --fill (matches the "01" node in the mockup). */
.circuit-node {
  position: absolute;
  top: 50%;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--color-muted);
  transform: translate(-50%, -50%);
}
.circuit-node-l {
  left: 0;
}
.circuit-node-r {
  left: auto;
  right: 0;
  transform: translate(50%, -50%);
}
.circuit-node::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--color-rust);
  opacity: var(--fill, 0);
}

/* will-change, applied ONLY while an element is actively filling (the engine
   toggles [data-filling] while 0<fill<1), per element type's animated property. */
.circuit-rail-fill[data-filling] { will-change: stroke-dashoffset; }
.circuit-divider[data-filling] .circuit-divider-seg { will-change: transform; }
.circuit-drawborder[data-filling] rect { will-change: stroke-dashoffset; }
.circuit-filltext[data-filling] .circuit-filltext-fill { will-change: clip-path; }

/* Reduced motion: the circuit adds no time-based motion (fill maps purely to
   scroll position), so behavior is unchanged; this guard makes the intent
   explicit and defends against any future transition creeping in. */
@media (prefers-reduced-motion: reduce) {
  .circuit-divider-seg,
  .circuit-rail-fill,
  .circuit-drawborder rect,
  .circuit-filltext-fill,
  .circuit-node::after {
    transition: none !important;
  }
}
```

- [ ] **Step 3: Verify compile**

Run: `npx tsc --noEmit`
Expected: passes.

- [ ] **Step 4: Visual check (preview)**

Reload `/`. Write a value to the dividers and confirm the node dots warm up:
```js
(() => {
  document.querySelectorAll('.circuit-divider').forEach(d => d.style.setProperty('--fill','1'));
  const node = document.querySelector('.circuit-node');
  const after = node && getComputedStyle(node, '::after');
  return JSON.stringify({
    nodes: document.querySelectorAll('.circuit-node').length,
    nodeBase: node && getComputedStyle(node).backgroundColor,
    nodeOverlayOpacity: after && after.opacity
  });
})()
```
Expected: `nodes` = 8 (2 per divider × 4); `nodeBase` dull `rgb(154, 143, 130)`; `nodeOverlayOpacity` `1` at `--fill:1`. Screenshot a divider — a small dot sits centered on each rail at the divider line, terracotta when filled.

- [ ] **Step 5: Commit**

```bash
git add components/circuit/Divider.tsx app/globals.css
git commit -m "feat: rail/divider node markers + per-type will-change + reduced-motion guard"
```

---

### Task 3: Verification — Phase 1–3 regression, perf, reduced-motion, cross-browser

**Files:** none (verification; small fixes only if a check fails).

- [ ] **Step 1: Phase 1–3 regression sweep**

Reload `/`. Confirm every element type still interpolates 0→0.5→1 and is reversible (re-run the Phase-3 sweep): dividers `scaleX`, borders `stroke-dashoffset`, digits `clip-path` bottom-up, rails/stem/fork. No regression from the engine rewrite.

- [ ] **Step 2: Perf — IO gating actually reduces work**

Confirm offscreen registrants are not iterated each frame. After scrolling to mid-document and idling:
```js
(() => JSON.stringify({
  registered: document.querySelectorAll('.circuit-divider, .circuit-drawborder, .circuit-filltext, .circuit-rail-fill').length,
  activelyFilling: document.querySelectorAll('[data-filling]').length
}))()
```
Expected: `registered` is the full count (~24 on home), `activelyFilling` is small (only those straddling the front). Spot-check in DevTools Performance (manual, in a real browser) that the rAF loop is cheap when idle (idle short-circuit) and there's no layout thrash.

- [ ] **Step 3: Reduced motion**

In the preview, emulate reduced motion (`preview_resize` supports color scheme; for reduced-motion use the browser emulation if available, else reason): confirm the fill still maps to scroll position (color-correct) and that no element has a CSS `transition` on its fill property. The mechanic must add no motion the user didn't initiate by scrolling — verified by construction (no `transition`/spring anywhere) + the `@media` guard.

- [ ] **Step 4: Dark-section legibility + REF**

Confirm terracotta dividers/borders/digits/nodes read cleanly over `.section-dark`. Confirm `REF = 0.5` (fill front at mid-viewport) feels right relative to eyeline — leave at 0.5 unless visibly off.

- [ ] **Step 5: Cross-browser note**

The rAF + CSS-var approach was chosen over CSS `animation-timeline` specifically for Safari reliability. Full Safari/Chrome/Firefox verification is a manual real-browser step (the preview is headless Chromium). Record that it needs a real-browser pass; nothing here uses a Chromium-only API (`IntersectionObserver`, `ResizeObserver`, `clip-path`, `stroke-dashoffset`, CSS vars, `color`-free node overlay are all broadly supported).

- [ ] **Step 6: Build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 7: Commit any fixes**

```bash
git add -A && git commit -m "fix: circuit Phase 4 tuning"
```
(Skip if none.)

---

## Done When (Phase 4)

- All Phase 1–3 criteria still pass (positional, reversible, every element type fills).
- The per-frame write loop iterates only on-screen elements (IntersectionObserver) and short-circuits when idle.
- `will-change` is applied only while an element is actively filling (`[data-filling]`), per its animated property.
- `prefers-reduced-motion` is respected (no time-based motion exists; CSS guard explicit).
- Node markers render at rail∩divider intersections and warm with the fill.
- `npx tsc --noEmit` + `npm run build` pass; dark sections legible; cross-browser pass noted for a real-browser session.

## Deferred / separate

- Inner routes (Services/Work/Forge/About/Contact) → `<Section>` blocks with dividers: separate plan `2026-06-18-circuit-fill-inner-routes.md`.

---

## Self-Review

- **Spec coverage (brief Phase 4):** reduced-motion (Task 2 CSS guard + Task 3 verify — no behavioral change needed since the model is pure-positional); performance via IntersectionObserver gating + idle short-circuit + GPU props (already) + passive listeners (already) + geometry only on resize/RO/fonts/load (already) (Task 1); `will-change` sparingly on actively-filling elements (Task 1 `data-filling` + Task 2 CSS); node markers (Task 2); dark-section legibility + REF (Task 3); cross-browser noted (Task 3). ✓
- **No behavior regression:** positional math, bounds, band logic, and the public API are byte-for-byte the same as Phase 2/3; only gating (which set is iterated) and hints (`data-filling`, `will-change`) are added. Offscreen-skip is safe because an offscreen element's correct fill is always its current latched value (1 above the front, 0 below). ✓
- **Type/lifecycle:** IO created/observed/disconnected within the single effect; `register`/unregister add/remove observation + clean `data-filling`; `elToReg` keyed by element for the IO callback. ✓
- **Placeholder scan:** complete code in every code step; exact `preview_eval` + expected results in every check. ✓
```
