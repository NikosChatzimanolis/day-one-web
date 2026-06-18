# Circuit Fill Mechanic — Design

**Date:** 2026-06-18
**Source brief:** [2026-06-18-circuit-fill-brief.md](./2026-06-18-circuit-fill-brief.md)
**Supersedes:** the reverted `living-thread` work (commit `8075d0c`) and its specs/plans.

This document is the **reconciliation** of the brief with the real codebase and the
decisions taken during brainstorming. The brief remains the authoritative description
of the mechanic; where the brief and this doc differ (stack, scope, staging), this doc
wins.

---

## Decisions (locked in brainstorming)

1. **Staging:** Implement **Phase 0 + Phase 1 only** this round. Stop at the static,
   dull skeleton for live review before any fill logic. Phases 2–4 are designed here
   but built later.
2. **Numbering:** Box + (later) fill **only the existing editorial numerals** —
   home's horizons `01–03` and "How we work" beats `01–04`. No new auto-incrementing
   section numbers.
3. **Route scope:** **Home fully converted** into `<Section>` blocks with dividers.
   Inner routes (Services, Work, Forge, About, Contact) get the **global rails only**
   for now; their sections are converted in a follow-up.
4. **Center spine removed:** The fixed center hairline is gone. `SpineAlignedLogo`
   becomes a plainly-centered `Logo`. The hero gets a short stem under the logo's `|`
   that forks out to the edge rails.
5. **Render tech:** The circuit is a **single `position: fixed` full-viewport SVG
   overlay**. Rails + dividers are `<line>`/`<rect>`. (Phase 3 stroke-fill uses SVG
   natively.)
6. **Stem alignment:** **Reuse the measured alignment** approach (font-ready + resize)
   to drop the stem exactly under the logo glyph's `|`.

## Stack reconciliation

The brief lists Next 15 / shadcn. The real stack is **Next 16, React 18,
Tailwind v3.4, framer-motion** (no shadcn). The fill engine (Phase 2+) is
**vanilla `requestAnimationFrame` + CSS custom properties**, *not* framer-motion:
the brief mandates one global rAF loop computing a positional `fillFrontDocY`, which is
the opposite of framer's scroll-progress springs. The legacy mechanic's use of
`useScroll`/`useSpring`/`pathLength` is exactly what gets torn down.

Tokens already exist in `globals.css`:
- Dull / empty: `--color-muted` = `#9A8F82`
- Filled: `--color-rust` = `#C04C2A`

No third color. Every fillable element interpolates between these two.

---

## Core model (from the brief — unchanged)

One global value, **`fillFrontDocY`**, a Y coordinate in *document* space:

```
fillFrontDocY = clamp(window.scrollY + window.innerHeight * REF, forkDocY, pageBottomDocY)
REF ≈ 0.5   // tunable viewport reference line
```

Above the front = filled (terracotta); below = dull (gray); straddling = partial.
This is a **pure function of viewport position in the document** — not scroll
accumulation or velocity. Consequences that are requirements, not side effects:

- Anchor/button jumps land already-correct (no catch-up animation).
- Fully reversible (scroll up drains).

Per-element local fill:

```
localFill = clamp((fillFrontDocY - elementTopDocY) / elementSpan, 0, 1)
```

Thin elements (dividers, borders, digits) use a deliberate **fill band** (~80–120px,
tunable per type) so they interpolate across a short travel instead of snapping.

---

## Architecture

### Layering (z-index)
1. `ReactiveGrid` (dotted texture) — kept, bottom.
2. **`<CircuitLayout>`** SVG overlay — new, above the grid, below content.
3. Content (`container-wide`, sections) — top, unchanged.

Rails/dividers may pass behind thin, low-contrast text; dividers live in inter-section
gutters, never through a text block.

### Components

**`<CircuitLayout>`** (root layout, client)
- Single fixed full-viewport SVG (`pointer-events-none`, `aria-hidden`).
- Renders two edge **rails** (inset per breakpoint: ~16px mobile, ~24px desktop),
  from the fork Y (home) or a fixed top anchor below the header (inner pages) to page
  bottom.
- Home only: **stem + fork** — short center stem under the hero logo `|`, horizontal
  fork to both edges, rails descend from the edge points.
- Phase 1: all dull, static. Phase 2+: hosts the terracotta fill layers + the rAF
  `<FillProvider>`.

**`<Section>`** (wrapper, client)
- Emits a full-width rail-to-rail **top divider** into the circuit layer.
- Registers its document bounds for fill (Phase 1: registration is a no-op stub;
  wired in Phase 2).
- Authoring a page = composing `<Section>` blocks; dividers are never hardcoded
  per page.

**Fillable primitives** (Phase 3, designed now):
- `<Divider>` — dull base + two terracotta segments (`scaleX` from left/right
  origins) growing inward to meet center.
- `<FillText>` — dull digits + terracotta copy revealed by vertical `clip-path`
  filling bottom-up.
- `<DrawBorder>` — SVG `rect`/`path`, `pathLength="1"` + `stroke-dashoffset` driven
  by `--fill` for a draw-on border (number box, buttons).

**Fill engine** (Phase 2, designed now):
- `<FillProvider>` — owns ONE rAF loop. Per frame: read `scrollY` + viewport height,
  compute `fillFrontDocY`, update registered elements. Never per-element scroll
  listeners.
- `useFill(ref, { band? })` — registers element, caches document geometry, writes
  `localFill` to `ref.current.style` as `--fill`. **No React re-render per frame.**
- Geometry cache — measure document `top`/`height` once; recompute on resize,
  `ResizeObserver`, `document.fonts.ready`, image load. Batch reads then writes; never
  measure in the write phase.

---

## Phase 0 — Teardown (this round)

| Target | Action |
|---|---|
| `components/ui/Spine.tsx` | Delete; remove import + `<Spine />` from `app/layout.tsx`. |
| `components/ui/SpineAlignedLogo.tsx` | Replace usage in `app/page.tsx` with plain centered `Logo`; stem alignment moves into the hero/circuit. Keep the measuring helper if reused for the stem. |
| `components/sections/HorizonRows.tsx` | Strip framer scroll-thread (`useScroll`/`useSpring`/`useTransform`) + SVG nodes; keep the editorial 01/02/03 grid, render dull/static. Becomes fillable in Phase 3. |
| Home per-section `border-t border-border` boundaries | Replaced by circuit `<Divider>`s (Phase 1). |
| `components/ui/ReactiveGrid.tsx` | **Keep** (dotted texture under the circuit). |
| `components/ui/ScrollCue.tsx` + `.scrollcue-line` keyframe | **Flagged, default keep** — hero scroll hint, not a rail. Surfaced for review, not deleted blind. |

**Done when:** no legacy center-spine / scroll-fill code remains; pages render with
none of the old center line / drawn thread; no dead scroll/observer listeners; the
ScrollCue ambiguity is surfaced (this list), not deleted blind.

## Phase 1 — Skeleton (this round)

- `<CircuitLayout>` mounted in root layout, rails on all routes, fork on home only.
- Home restructured into `<Section>` blocks emitting dull rail-to-rail dividers.
- Inner routes: rails only (no dividers yet).
- Editorial numerals boxed (dull outline); buttons rendered as dull outlines.
- Uniform section rhythm so the rail never runs long with nothing attached.
- All dull `#9A8F82`. Layout holds across breakpoints; dark sections read cleanly.

**Done when:** every home section boundary has a full-width dull divider; rails +
fork render behind legible content; numerals boxed + buttons outlined, all static
dull; rails continuous on all routes, fork home-only; no long rail stretch without a
divider; breakpoints + dark sections verified.

## Phases 2–4 (later, designed above)

- **Phase 2:** stand up `<FillProvider>` + `useFill`, prove the positional model on
  **rails only** (fork start at `scrollY=0`; reversible; jump lands correct; reload
  mid-page correct; no per-frame re-renders).
- **Phase 3:** extend to `<Divider>`, `<FillText>`, `<DrawBorder>` — all positional +
  reversible, consistent with rails.
- **Phase 4:** reduced-motion (keep positional color, drop easing/catch-up),
  performance (IntersectionObserver gating, GPU-only props, passive listeners, 60fps
  target), optional node markers, dark-section legibility, cross-browser (Safari
  verified — the reason rAF was chosen over CSS `animation-timeline`), tune `REF`.

## Out of scope / invariants
- Decorative only — must not gate content visibility, focus order, or keyboard nav.
  All content readable in the dull state.
- No hardcoded element lists — fillable elements register through `useFill` so new
  outlined elements participate automatically.
