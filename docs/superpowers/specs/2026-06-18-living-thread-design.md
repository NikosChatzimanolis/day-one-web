# Living Thread — Design Spec

**Date:** 2026-06-18
**Type:** New interactive motion system on the existing Day One site (home page first)
**Supersedes:** the plain center `Spine` on the home route (kept on interior pages for now)

## Concept

A single continuous rust "current" wired into the **real structure of the page**.
It is born at the `Day | ONE` logo divider (the origin), **splits and runs out to
two vertical rails — one down each side of the screen** — and the page's existing
**horizontal section dividers become the rungs** that connect the two rails. At
the bottom the rails **converge back into the footer logo divider** — a bookend:
born from the mark, returns to the mark.

As the visitor scrolls, rust charge descends both rails (a brighter head leading
each). Each horizontal section line fills with rust as the front reaches it,
joining the two rails, and each **section numeral energizes** (muted outline →
solid rust, one soft pulse) as its section connects. Behind the visitor the page
reads warm/complete; ahead, cool/pending. Content sits inside a frame that comes
alive top-to-bottom — and because the rails live at the edges and the rungs are
existing borders, **nothing ever crosses body text.**

**Why it earns its place:** it literally draws Day One's line — *one continuous
relationship, everything starts on day one* — using the page's own architecture
(its borders, its numbers) rather than decoration. No motion without meaning.

## Locked decisions

1. **Two side rails.** One vertical rail just inside each viewport edge. No veins.
2. **Horizontal section lines are the connectors.** The existing hairline
   dividers between the major sections become full-width rust rungs that draw in
   (rail-to-rail) as the scroll front reaches them.
3. **Numbers energize too.** Each section numeral renders as a muted outline
   ahead of the front, fills to solid rust with one soft pulse as its section
   connects, then stays lit.
4. **Origin + terminus on the logo.** The current is born at the hero logo
   divider, splits outward to both rails, and converges back into the footer logo
   divider at the bottom.
5. **Travelling charge head.** A subtly brighter head leads the fill down each
   rail so the current visibly flows.
6. **Scope — home first, reusable controller.** Built on `/` with a generic,
   DOM-anchored controller; interior routes keep the plain `Spine` until a later
   rollout.

## Anchor model

All positions are **measured from real DOM**, never hardcoded.

- `data-thread-origin` — hero logo divider (top split point). Reuses the existing
  `data-logo-divider` within the hero.
- `data-thread-rung` — each major section divider element on the home page whose
  hairline should become a rust connector. Tagged on the section boundaries
  (e.g. the `border-t` wrappers between the promise / proof / how-we-work bands
  and the HorizonRows row borders). The controller measures each rung's y.
- `data-thread-node` — each section numeral that should energize (Build / Scale /
  Maintain numerals; the "how we work" 01–04). Gets a `charged` hook for the
  outline → fill state.
- `data-thread-terminus` — footer logo divider (bottom convergence point).

## Architecture

One **scroll-progress value** drives the rails, the rungs, and the numerals so
they never desync.

1. **`ThreadController` (client, home page).**
   - On mount / resize / font-settle / reflow (`ResizeObserver` on the page
     wrapper): measure the wrapper box, the origin, every `data-thread-rung` y,
     every `data-thread-node` center, and the terminus — all relative to the
     wrapper.
   - Build the SVG geometry: the **origin split** (two curves from the divider out
     to each rail top), the **two rails** (left + right verticals down to the
     terminus), the **convergence** (both rails curving into the footer divider),
     and a **rung segment** per measured divider (full width, rail-to-rail).
   - Compute per-rung and per-node **thresholds** = element y ÷ wrapper height.
   - Expose smoothed scroll progress (`useScroll` + `useSpring`, leading slightly)
     and a latched `maxProgress`.
2. **SVG overlay.** Absolute, behind text (`z-0`), `viewBox` = wrapper px box
   (1:1, `non-scaling-stroke`). Renders, each over a soft always-visible rust
   guide: the split, the two rails (`pathLength` ← progress), the rungs (each
   draws across its own sub-range around its threshold), the convergence, and a
   **charge head** per rail at the fill front.
3. **Numeral activation.** As latched progress crosses a node threshold, toggle
   `charged` on that numeral; CSS animates outline → solid rust + a one-time
   pulse (reduced-motion respected). Latched so scrolling up keeps it lit.

## Geometry / routing

- **Origin split:** from the logo divider, two symmetric curves ease down and out
  to the tops of the left and right rails.
- **Rails:** `railInset ≈ clamp(20px, ~3vw, 56px)` from each viewport edge;
  straight (or with a very faint waver) from the split down to the convergence.
- **Rungs:** for each measured section divider, a horizontal rust line spanning
  left-rail-x → right-rail-x at that y. It overlays/extends the existing CSS
  hairline edge-to-edge and draws in (from the rails inward, or left→right) as the
  front passes. The existing `border-*` stays as the cool/pending state.
- **Convergence:** below the last rung, both rails curve inward to meet the footer
  logo divider position.

## Activation & fill mechanics

- **Rails:** `pathLength` bound to progress, leading the scroll so more reads
  filled; a brighter charge head (rust, soft glow) at each front. Soft rust guide
  underneath so the rails are visible at all scroll positions.
- **Rungs:** each draws across `[threshold − 0.04, threshold + 0.03]` and latches
  lit.
- **Numerals:** `.t-index` station numerals get a two-state style — ahead of the
  front: muted outline (`-webkit-text-stroke` muted + transparent fill, with a
  solid-color fallback); charged: solid rust. Transition + one pulse keyframe on
  the `charged` class.

## Scroll / progress mapping

- Single source: `useScroll()` page progress → `useSpring` smoothing →
  `useTransform` leading slightly.
- Per-rung / per-node threshold = elementCenterY / wrapperHeight.
- Latch `maxProgress`; rungs and numerals compare against it so passed elements
  stay lit when scrolling back up.

## Layering

- SVG `z-0` (behind grid `z-1`, behind text `z-10`). Rails are at the edges and
  rungs are horizontal, so the current never overlaps copy. Charge heads stay
  below text.

## Performance

- Measurement + geometry build runs only on layout changes (mount, resize,
  font-ready, `ResizeObserver`), debounced — never per frame.
- Per-frame work is only `pathLength` / opacity / transform on a small set of
  motion values.

## Responsive & reduced motion

- **< md:** rails + rungs hidden (as the spine is). Numerals still energize on
  arrival (same threshold logic or an `IntersectionObserver` fallback), so the
  payoff survives without the frame.
- **prefers-reduced-motion:** rails, rungs, and numerals all rendered fully lit,
  no travelling head, no pulse. Static but complete.

## Out of scope (v1)

- Rollout to `/services`, `/work`, `/forge`, `/about`, `/contact` (controller is
  built to allow it; tagging happens later).
- Dark-section glow boosts, doubled rails, CTA/proof rungs — candidate v2.
- Any copy / palette / layout change beyond the numeral two-state styling and the
  rung overlay.

## Verification

- `npm run build` clean; no new inline-style lint violations (SVG/motion styles
  only).
- Home: rails visible at all scroll positions (soft guide), bright fill leads the
  scroll with a charge head per rail, each tagged section divider fills rail-to-
  rail as reached, each tagged numeral fills outline → rust with a pulse and stays
  lit, origin splits from the logo and rails converge into the footer divider.
- Resize + font reload: geometry + thresholds recompute; rungs still land on the
  dividers. < md: frame hidden, numbers still energize. Reduced-motion: static and
  complete.
