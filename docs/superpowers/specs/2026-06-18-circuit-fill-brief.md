# Day One — Circuit Fill Mechanic — Implementation Brief

Build in **four sequential phases**. Each phase is a self-contained, reviewable milestone. Do not start a phase until the previous one passes its "done when" checks. The risky part (the positional model) is isolated in Phase 2 and proven on the simplest element before fanning out.

## Stack
Next.js 15, TypeScript, Tailwind, shadcn. The mechanic is client-side; the orchestrator and fillable primitives are client components. Static styling via Tailwind; dynamic fill driven by CSS custom properties written from a single rAF loop.

## Tokens
- Dull (empty) state: warm gray `#9A8F82`
- Filled state: terracotta `#C04C2A`
- Every fillable element interpolates between these two. No third color.

---

## Core Model — fill is POSITIONAL, not scroll-accumulated  *(read before Phase 2)*

One global value: **`fillFrontDocY`** — a Y coordinate in *document* space (not viewport space).

```
fillFrontDocY = clamp(window.scrollY + window.innerHeight * REF, forkDocY, pageBottomDocY)
REF ≈ 0.5   // tunable: the viewport reference line that defines the fill front
```

Everything above `fillFrontDocY` is filled (terracotta); everything below is dull (gray); elements straddling it are partially filled.

This must be a **pure function of viewport position in the document**, NOT of how much the user scrolled or scroll velocity. Requirements, not side effects:

- **Anchor / button jumps land already-correct.** Jump to the Build section → rails and everything above are instantly filled to that exact point, no catch-up animation. This is the whole reason for the positional model.
- **Fully reversible.** Scroll up → `fillFrontDocY` decreases → elements drain. No one-way latching.

Each fillable element computes its **local fill** `0..1` from its own document geometry:

```
localFill = clamp((fillFrontDocY - elementTopDocY) / elementSpan, 0, 1)
```

For thin elements (dividers, button borders, the number), `elementSpan` is a deliberate **fill band** (~80–120px) centered on the element, so they interpolate smoothly across a short stretch of travel instead of snapping. Band size tunable per element type.

---

## Phase 0 — Teardown (remove the old mechanic first)

**Goal:** the site already has scattered, partial versions of this — vertical lines, scroll-fill effects, per-section dividers, the orange center guideline. The new system replaces ALL of it. Strip the legacy implementations first so the new `<CircuitLayout>` is the single source of truth and nothing competes or double-renders.

Do:
- **Audit every route** (home, Services, Work, Forge, About, Contact) for: existing vertical lines, scroll-driven fill/progress effects, per-section divider lines, the orange center guideline, and any related scroll listeners, animation state, CSS, or components.
- **Remove or isolate** all of it. Delete legacy line/fill components, their CSS, and any scroll/IntersectionObserver logic that drove them.
- **Don't guess on ambiguous cases.** If a line element is doing double duty (also a layout divider that content depends on), flag it in a short list rather than silently deleting — leave a comment/TODO and surface it for review.
- Leave the pages rendering cleanly with no orphaned line/fill code and no console errors from removed listeners.

**Done when:**
1. No legacy vertical-line or scroll-fill code remains on any route.
2. Pages render with none of the old lines/dividers/guideline visible.
3. No dead scroll/observer listeners or unused animation state left behind.
4. Ambiguous removals are listed for review, not deleted blind.

---

## Phase 1 — Skeleton (static, dull only)

**Goal:** the entire circuit exists, correctly laid out, in dull gray, with zero motion. A fully reviewable structural milestone before any fill logic.

**Decision (locked):** rails at screen edges; horizontal dividers cross full width edge-to-edge; the circuit is a **background layer**, content floats above it.

Build:
- **`<CircuitLayout>`** in the root layout: renders the background circuit once, shared across all routes (rails are global — Services, Work, Forge, About, Contact inherit it).
- **Layering:** circuit layer z-index above the dotted texture, below all content. Content keeps its centered max-width container at higher z-index. Dividers/rails may pass behind text (thin, low-contrast); keep dividers in inter-section gutters, never through a text block.
- **Rails:** two vertical lines at left/right edge, fixed inset (~16–24px desktop), fork Y → page bottom.
- **Stem + fork (home only):** short center stem starting just under the hero logo's `|`, aligned to it, meeting a horizontal fork line out to both edges; rails descend from those edge points. Logo glyph stays in content; align stem so it reads as a seamless extension.
- **`<Section>`** wrapper: emits its own full-width top divider (rail-to-rail) into the circuit layer and registers its document bounds. Authoring a page = composing `<Section>` blocks. Do not hardcode dividers per page. Restructure existing pages into `<Section>` blocks.
- **Boxed elements:** wrap section number in a border box; wrap button borders — built as outlines, dull, ready to be made fillable later.
- **Vertical rhythm:** uniform section padding so boundaries are predictable and the circuit reads continuous — no long dead run of rail with nothing on it.
- **Inner pages:** stem + fork are home-only. Inner pages' rails begin at a fixed top anchor (below header) → page bottom.
- **Responsive:** define rail inset per breakpoint; scale logo line / fork with the hero; confirm rails don't crowd content on narrow viewports.

**Done when:**
1. Every section boundary has a full-width divider; no boundary lacks a connector.
2. Rails + fork (home) + dividers render behind content; text stays legible over them.
3. Section numbers boxed; buttons outlined. All static, all dull gray.
4. Rails present and continuous on all routes; fork on home only.
5. No long stretch of rail without a divider to attach to.
6. Layout holds across breakpoints; dark sections (near-black) read cleanly with dull gray lines.

---

## Phase 2 — Fill engine, proven on rails only

**Goal:** stand up the positional model and prove it end-to-end on the simplest element (the rails) before touching anything else.

Build:
- **`<FillProvider>`** (context): owns ONE `requestAnimationFrame` loop. Each frame: read `scrollY` + viewport height, compute `fillFrontDocY`, update registered elements. One loop for the whole page — never per-element scroll listeners.
- **`useFill(ref, { band? })`** hook: registers the element, caches its document geometry, writes its `localFill` to the element as a CSS variable (`--fill`). Must NOT trigger React re-renders per frame — write to `ref.current.style` directly.
- **Geometry cache:** measure each element's document `top`/`height` once; recompute on resize, `ResizeObserver`, `document.fonts.ready`, image load. Never measure in the write phase — batch all reads, then all writes.
- **Wire rails only:** dull base line always visible; terracotta line layered on top with `transform: scaleY(var(--fill))`, `transform-origin: top`.

**Done when (measured on rails):**
1. At `scrollY = 0`, fill starts at the fork — never above it.
2. Scrolling down advances fill; scrolling up drains it; state always matches viewport position.
3. A button/anchor jump to a lower section lands with rails above already filled, instantly, no catch-up.
4. Reloading mid-document (restored scroll position) shows correct fill on load.
5. No per-frame React re-renders; only CSS-var writes to refs.

---

## Phase 3 — Fill all element types

**Goal:** extend the proven engine to every fillable element. Use `transform`, `opacity`, `clip-path`, SVG `stroke-dashoffset` only.

Primitives + techniques:
- **`<Divider>`** (rail-to-rail): dull base; two terracotta segments over it — left segment `scaleX` from `transform-origin: left`, right from `transform-origin: right` — both driven by the divider's `--fill`, growing inward from each rail to meet in the middle.
- **`<FillText>`** (the digits): dull text color; terracotta copy revealed by a vertical `clip-path: inset(...)` (or `background-clip: text` with moving gradient), filling bottom-up to match the upward front.
- **`<DrawBorder>`** (number box, buttons): SVG `rect`/`path` with `pathLength="1"` and `stroke-dashoffset` driven by `--fill` for a continuous draw-on effect.

**Done when:**
1. Dividers fill inward from both rails and meet in the center as the front crosses them.
2. Section number's border AND digits both fill terracotta as the front passes.
3. Button borders draw on terracotta as the front passes.
4. Every element type is positional + reversible, consistent with the rails.

---

## Phase 4 — Polish & hardening

- **Reduced motion:** respect `prefers-reduced-motion` — keep positional mapping (color-correct for position) but disable easing/smoothing/catch-up. Add no motion the user didn't initiate by scrolling.
- **Performance:** `IntersectionObserver` so offscreen elements aren't updated per frame; GPU-friendly properties only; `will-change` sparingly on actively-filling elements; passive listeners; recompute geometry only on resize / ResizeObserver / fonts-ready / image load. Target smooth 60fps on a mid-range laptop, no layout thrash in the profiler.
- **Node markers (optional):** small dots where a rail meets a divider (matches the dot at `01` in the mockup).
- **Dark-section legibility:** verify dull gray rails/dividers read against near-black sections without looking muddy; adjust dull opacity if needed.
- **Cross-browser:** the JS rAF approach is chosen over CSS `animation-timeline` for Safari reliability — verify in Safari, Chrome, Firefox.
- **Tune `REF`:** confirm the fill-front reference line feels right relative to eyeline.

**Done when:** all Phase 1–3 criteria still pass, reduced-motion behaves, and performance budget is met across target browsers.

---

## Out of scope / notes
- Accessibility: the effect is decorative — it must not gate content visibility, focus order, or keyboard nav. All content readable in the dull state.
- Privacy/data: none involved.
- Do not hardcode element lists — register fillable elements through the hook so new outlined elements added later participate automatically.
