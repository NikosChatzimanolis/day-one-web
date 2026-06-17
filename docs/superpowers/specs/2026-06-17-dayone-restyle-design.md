# Day One Web — Reference Restyle Design

**Date:** 2026-06-17
**Type:** Visual restyle of existing Next.js app (no routing/architecture/content change)
**Reference:** `~/Downloads/dayone.html` (single-page design study)

## Goal

Apply the reference HTML's design language — layout structure, spacing rhythm,
component shapes, and motion — across the existing multi-page Day One app. Keep
routing, component architecture, and all copy. Change only the look.

Take from the reference: layout/section composition, spacing rhythm, grids,
motion/interaction patterns, component shapes (hero, nav, cards, buttons).

Ignore from the reference: all copy, tone, section topics, colors, fonts, brand
marks. Keep Day One's instead.

## Locked decisions

1. **Typography: Jost-only.** Drop Fraunces (display serif) and DM Sans (body)
   entirely. All headings/body/UI become Jost (200 for display/headings, 300 for
   body/UI). Alex Brush stays for the logo script only. Cormorant Garamond is
   left untouched — it is Astrala's own brand voice inside the Astrala
   case-study mockup, not Day One's type.
2. **Multi-page kept.** Restyle all six routes (home, services, work, forge,
   about, contact) with one consistent visual grammar. No collapse to a single
   scroll page. Routing/component architecture unchanged.
3. **Two-rust system kept.** `#C04C2A` for the logo and large/structural accents
   (spine, card left-bar, tile glow, eyebrows on dark). `#B5552F` for small
   accent text and links on the light background, to preserve AA contrast on the
   warm blush.
4. **All four reference motion extras:** center scroll spine, card left-bar +
   lift hover, work-tile rust glow (+ numbered + locked state), animated scroll
   cue. Cursor / reactive grid / magnetic / Forge board already exist and are
   retuned, not rebuilt.

## Brand tokens (override reference where they conflict)

Put these in the Tailwind theme / CSS vars — never hardcode per component.

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#FAEADB` | warm blush background |
| `--color-bg-soft` | `#F2DECF` | raised band |
| `--color-card` | `#F7F3EC` | card surface |
| `--color-text` | `#1A1816` | near-black text / dark sections |
| `--color-rust` | `#C04C2A` | logo + large/structural accents |
| `--color-accent` | `#B5552F` | small accent text / links (AA on blush) |
| `--color-muted` | `#9A8F82` | warm gray — meta / labels |
| `--color-line` | `rgba(26,24,22,.10)` | hairline borders |

Fonts: Alex Brush (logo script), Jost 200 ("ONE" + display/headings), Jost 300
("WEB STUDIO" + body/UI). Logo lockup unchanged: "Day" (Alex Brush, rust) +
"ONE" (Jost 200) + "WEB STUDIO" (Jost 300, letter-spaced).

## Architecture / approach

The restyle hangs off the **token + type-class layer** so per-page edits stay
minimal:

- `tailwind.config.ts` — remap color tokens, collapse `fontFamily` to Jost +
  script, keep the existing scale utilities.
- `app/globals.css` — repoint surface/accent/line vars to the new palette;
  rewrite `.t-display / .t-h1 / .t-h2` from Fraunces serif to Jost 200 with the
  reference's tight tracking + clamp sizes; `.t-h3 / .t-lead` to Jost 300;
  eyebrow to the rust `.42em` uppercase label; add `.sec-pad`, `.svc`, `.tile`,
  spine, scroll-cue primitives mirroring the reference.
- `app/layout.tsx` — remove Fraunces + DM Sans `next/font` imports and `<html>`
  variable classes; mount new `<Spine />`.

### Global primitives

- **`components/ui/Spine.tsx` (new)** — fixed center hairline, rust fill driven
  by scroll progress (`--draw`). Hidden < 760px and under reduced-motion.
- **CustomCursor / ReactiveGrid / Magnetic** — retune to new tokens (rust
  cursor + ring, 46px grid cell, cursor-proximity rust glow). Restyle only.
- **Reveal** — match the reference's blur + translateY + d1–d4 stagger timing.
- **Button / Logo** — square-ish bordered shapes; logo lockup colors to tokens.

### Component shapes

- **Service cards (`.svc`)** — cream card, hairline border, rust left-bar that
  grows to full height on hover, `translateY(-4px)` lift, border warms to rust.
- **Work tiles (`.tile`)** — dark `16/10` tile, radial rust glow intensifying on
  hover, numbered (`tnum`), grayscale `locked` state with badge.
- **Forge board** — dark section, draggable tickets, drag-over column highlight,
  check-to-complete, touch tap-to-advance fallback. Already exists; retune to
  tokens and the reference's board styling.

## Per-page application

| Route | Treatment |
|---|---|
| `/` (home) | Full-height centered hero with logo lockup + scroll cue; restyled promise/horizons/proof/how-we-work bands using `sec-pad`, eyebrow + thin Jost title, card/tile grids. |
| `/services` | Eyebrow + thin title; 2-up `.svc` card grid. |
| `/work` | Eyebrow + thin title; `.tile` grid with glow + locked state. |
| `/forge` | Dark board section restyled to reference. |
| `/about` | Centered statement + body measure. |
| `/contact` | Centered eyebrow + title + magnetic mail link with underline-sweep. |

`PageHero`, `CtaSection`, `HorizonRows`, `Navbar`, `Footer` restyled to the same
grammar. Existing copy and section topics unchanged.

## Responsive & reduced motion

- < 760px: grids → 1 column, spine hidden, reduced `sec-pad`.
- `prefers-reduced-motion: reduce`: disable reveals, scroll cue, spine draw, and
  custom cursor; `scroll-behavior: auto`.
- Touch / coarse pointer: custom cursor hidden; Forge tap-to-advance fallback.

## Files expected to change

`tailwind.config.ts`, `app/globals.css`, `app/layout.tsx`, the six page files
under `app/`, `components/ui/{CustomCursor,ReactiveGrid,Reveal,Magnetic,Button,
Logo}.tsx`, `components/sections/{PageHero,CtaSection,HorizonRows}.tsx`,
`components/forge/ForgeBoard.tsx`, `components/layout/{Navbar,Footer}.tsx`, plus
new `components/ui/Spine.tsx`.

## Verification

- `next build` completes clean (no type/lint errors; note repo's inline-style
  eslint rule — keep styling in CSS/Tailwind, not inline).
- Visual check across all six routes at desktop + < 760px.
- Reduced-motion verified (no reveal/cursor/spine).

## Out of scope

- No new framework, no app-shell rewrite, no routing changes.
- No copy/content rewrites.
- No change to Cormorant usage in the Astrala mockup.
