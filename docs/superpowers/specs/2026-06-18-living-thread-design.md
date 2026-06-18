# Living Thread — Design Spec

**Date:** 2026-06-18
**Type:** New interactive motion system on the existing Day One site (home page first)
**Supersedes:** the plain center `Spine` on the home route (kept on interior pages for now)

## Concept

A single continuous rust "current" that is **wired into the real structure of the
page**, not drawn in the margin as decoration. It is born at the `Day | ONE`
logo divider (the origin), runs the whole page as one unbroken line, and the
page's own elements — primarily the **section numbers** — are *stations* on it.

As the visitor scrolls, a charge flows down the current. When the front reaches a
station, the vein into it fills and the **number energizes** (muted outline →
solid rust, one soft pulse, then stays lit). Behind the visitor the page reads
"warm/complete"; ahead it reads "cool/pending." The current completes into the
**footer logo divider** — the loop closes back into the mark.

**Why it earns its place:** it literally draws Day One's line — *one continuous
relationship, everything starts on day one*. Every numbered moment becomes a beat
in one sequence instead of an isolated label. It rewards scrolling, it is
unmistakably bespoke, and it embodies "a system that is alive" — which is what
the studio sells. No motion without meaning.

## Locked decisions

1. **Geometry — rail + veins.** A main current runs the left gutter; a short
   vein branches off to each section number, terminating *into* the numeral. The
   number is the node at the vein's end. (Chosen for clean routing, scalability,
   and low body-text collision.)
2. **Activation — outline → solid rust + pulse.** Each station numeral renders as
   a muted/hollow outline ahead of the front, fills to solid rust with a single
   soft pulse as the current arrives, then stays lit. Scrolling back up leaves it
   lit (state tracks furthest progress, not instantaneous position — see below).
3. **Travelling charge head.** A subtly brighter head rides the front of the fill
   so the current visibly flows rather than just lengthening.
4. **Scope — home first, reusable controller.** Build on `/` with a generic,
   DOM-anchored controller that can be rolled out to interior routes later by
   tagging their numbers. Interior pages keep the plain `Spine` until then.

## Anchor model

Stations are **real DOM elements**, tagged so the controller can find and measure
them. No hardcoded coordinates.

- `data-thread-origin` — the hero logo divider (already `data-logo-divider`; the
  controller can reuse that within the hero, or we add `data-thread-origin`).
- `data-thread-node` — each section numeral that should sit on the current. On
  the home page that is: the Build / Scale / Maintain numerals (HorizonRows) and
  the "how we work" 01–04 index numerals. (The hero has no number; the proof rows
  and CTA may be added as nodes in a later pass — kept minimal for v1.)
- `data-thread-terminus` — the footer logo divider.

Each tagged numeral also needs an **activation hook**: a wrapper/class the
controller toggles (`is-charged`) so the numeral can render its outline→fill
state in CSS. The numeral markup stays; we add the hook + outline styling.

## Architecture

Three pieces, driven by **one scroll-progress value** so the line fill and the
number activation never desync.

1. **`ThreadController` (client, home page).** Replaces `LivingThread`'s
   procedural path with a measured one.
   - On mount / resize / font-settle / reflow (`ResizeObserver` on the page
     wrapper): measure the wrapper box, the origin, every `data-thread-node`, and
     the terminus, all **relative to the wrapper**.
   - Build (a) the SVG path — rail down the gutter with a vein curving from the
     rail to each node's measured position — and (b) a sorted list of node
     **activation thresholds** = each node's vertical center ÷ wrapper height,
     expressed as scroll progress.
   - Provide the scroll progress (`useScroll` over the page, smoothed with
     `useSpring`) to both the SVG fill and the node activation logic.
2. **SVG overlay.** Absolute, behind text (`z-0`), `viewBox` = wrapper px box
   (1:1, `non-scaling-stroke`). Renders: a soft always-visible rust guide (full
   route, low opacity), the bright main fill (`pathLength` ← progress, leading
   the scroll so more reads filled), each vein (fills in its own sub-range around
   its node threshold), and a **charge head** (a brighter dot/glow positioned at
   the current fill front).
3. **Node activation.** As smoothed progress crosses a node's threshold, the
   node is marked charged (a `charged` flag pushed to that numeral's hook — via a
   small context, a per-node subscription, or toggling a class on the measured
   element). Charged numerals animate outline → solid rust + one pulse and stay
   lit. "Stay lit" = latch on furthest-reached progress so scrolling up does not
   un-charge passed stations.

## Routing model (rail + veins)

- **Origin → rail:** from the logo divider, ease down and sweep into the left
  gutter rail (`rail = max(36, (W − 1200) / 2)`), as in the prototype.
- **Rail:** descend the gutter with restrained S-waves to the terminus.
- **Veins:** for each node, a short curve from the rail's current x at that y out
  to the node's measured (x, y), tucking under the numeral so the line reads as
  feeding into it. Veins stay short and curve organically (the ~20% organic
  feel), but now land on **real** positions instead of fixed fractions.
- **Terminus:** the rail resolves into the footer logo divider's position.

## Activation mechanics

- **Numerals:** restyle the `.t-index` station numerals to support a two-state
  look — ahead of the front: outline / muted (`color: transparent` with a muted
  text-stroke, or a muted fill); charged: solid rust. Transition on a `charged`
  class. One-time pulse via a keyframe (scale 1 → 1.12 → 1) respecting
  reduced-motion.
- **Veins + nodes:** vein `pathLength` and a small node dot animate in across a
  scroll sub-range bracketing the node threshold; both latch lit.
- **Charge head:** a brighter circle (rust, soft blur/glow) bound to the fill
  front's position along the main path. Hidden under reduced motion.

## Scroll / progress mapping

- Single source: `useScroll()` page progress → `useSpring` (smoothing) →
  `useTransform` to lead slightly so the fill stays ahead of the eye.
- Per-node threshold = nodeCenterY / wrapperHeight. Vein draw range ≈
  `[threshold − 0.05, threshold + 0.04]`. Numeral charges at ≈ `threshold`.
- Latch: track `maxProgress`; activation compares against `maxProgress` so passed
  nodes stay lit.

## Layering

- SVG `z-0` (behind grid `z-1` and text `z-10`); veins tuck behind numerals so
  they read as connecting into them.
- Charge head may sit slightly above the guide but stays below text.

## Performance

- Heavy work (measure + path build) runs only on layout changes (mount, resize,
  font-ready, `ResizeObserver`), never per frame.
- Per-frame work is only `pathLength` / transform / opacity on a handful of
  motion values — GPU-cheap.
- Recompute is debounced; `ResizeObserver` guards against image/font reflow
  shifting node positions.

## Responsive & reduced motion

- **< md:** the SVG rail is hidden (as the spine is). Numbers still energize on
  arrival via the same threshold logic (or a fallback `IntersectionObserver`), so
  the "fills as you reach it" payoff survives without the line.
- **prefers-reduced-motion:** full guide + all veins drawn, all numerals lit, no
  travelling charge, no pulse. Static but complete.

## Out of scope (v1)

- Rolling the thread out to `/services`, `/work`, `/forge`, `/about`, `/contact`
  (the controller is built to allow it; tagging happens later).
- Branching veins for the two service offerings, dark-section glow boosts, and
  proof/CTA stations — candidate v2 embellishments.
- Any copy / palette / layout change beyond the numeral two-state styling.

## Verification

- `npm run build` clean; no new inline-style lint violations (SVG/motion styles
  only, consistent with existing components).
- Home: the current is visible at all scroll positions (soft guide), the bright
  fill leads the scroll, each tagged numeral fills outline → rust with a pulse as
  reached and stays lit, the charge head flows, terminus meets the footer
  divider.
- Resize + font reload: path and thresholds recompute; nodes still land on the
  numerals. < md: line hidden, numbers still energize. Reduced-motion: static and
  complete.
