# Restyle Plan — Day One Site

**Reference file:** `dayone_3.html`
**Scope:** Visual + structural restyle only. The site must look and feel like the reference. Nothing about *what the site says or does* may change.

---

## Golden rule

Every existing page, section, route, string of copy, and piece of logic stays. You are repainting and re-arranging the furniture, not throwing any of it out. If the current site has a section the reference doesn't, that section **stays** — restyle it in the same visual language. If you're ever unsure whether to drop something, keep it.

---

## Do NOT touch

- Page content or copy (headings, body, labels, links, email addresses)
- Routes, page structure, component logic, data, state, handlers
- Brand tokens / colors — must remain exactly:
  - `--rust: #C04C2A`
  - `--ink: #1A1816`
  - `--muted: #9A8F82`
  - `--bg: #FAEADB`
  - `--bg-soft: #F2DECF`
- Fonts: **Alex Brush** (display / logo script) + **Jost** (everything else)
- Any existing functionality (forms, board, drag-and-drop, etc.)

If the current site uses different token *names* but the same hex values, keep the names — just make sure the values match the palette above.

---

## What to change (look + feel only)

Pull the following from `dayone_3.html` and apply it across the existing site:

### Layout & structure
- **No sticky/persistent header or nav bar.** Navigation is removed from the top. The logo lives in the hero.
- **Centered logo lockup** as the hero centerpiece: `Day` (Alex Brush script) over `ONE` (Jost, wide letter-spacing, rust) over `WEB STUDIO` (small, heavily tracked, muted).
- **Full-viewport hero** — `min-height: 100vh`, content vertically + horizontally centered, with the scroll cue pinned to the bottom.
- **Single-column editorial vertical scroll.** Sections stack with consistent generous vertical padding (`~120px` desktop, `~84px` mobile). Max content width ~1180px, side padding ~32px.
- **Centered section heads**: small uppercase rust *eyebrow* (wide letter-spacing) above a thin-weight large *title*.

### Type treatment
- Display/logo: Alex Brush, very large, tight line-height.
- Titles: Jost weight 200, large clamp sizing, slightly negative letter-spacing.
- Eyebrows / labels / captions: small, uppercase, wide letter-spacing (`.4em`+), muted or rust.
- Body: Jost weight 300, line-height ~1.55.

### Components
- **Cards** (e.g. services): soft card background, hairline border, a rust left-border accent that animates from 0 to full height on hover, slight lift on hover.
- **Tiles** (e.g. work/portfolio): dark `--ink` background with a rust radial glow in one corner, content bottom-aligned, small tracked index label top-left.
- **Dark feature block** (e.g. the Forge / tool section): full-width `--ink` background that breaks up the warm page, light text, rust accents — same content, just restyled to this dark treatment.
- **Contact**: centered, oversized email link with an animated underline on hover.
- **Footer**: hairline top border, small tracked muted text, centered.

### Motion & atmosphere (desktop; degrade gracefully)
- **Custom cursor**: small rust dot + a larger lagging ring that scales up over interactive elements. Disabled on touch/coarse pointers (`cursor: auto`).
- **Reactive background grid**: faint canvas grid that brightens cells near the pointer in rust. Sits behind everything (`z-index` below content). Static fallback fine on mobile.
- **Connecting spine**: thin vertical center line running the page height that fills with rust proportional to scroll progress.
- **Reveal on scroll**: sections fade up (opacity + slight translateY + slight blur) via IntersectionObserver, with small stagger delays.
- **Magnetic hover** on key interactive elements (logo, primary links).
- **Scroll cue** in the hero: a small tracked label with an animated drawing line beneath it.

### Accessibility / quality floor (keep intact)
- Fully responsive down to mobile (single column, reduced padding, grids collapse to 1fr).
- Respect `prefers-reduced-motion`: disable reveals, cue animation, smooth scroll.
- Disable the custom cursor and pointer-driven grid effects on `(hover: none), (pointer: coarse)`.
- Keep visible keyboard focus.

---

## How to apply it (process)

1. Read `dayone_3.html` end to end — note its CSS variables, the section padding rhythm, the component patterns, and the JS for cursor / grid / spine / reveal / magnetic.
2. Map each existing page section to the closest reference pattern (hero → centered lockup, card sections → service cards, portfolio → tiles, tool/feature → dark block, contact → oversized mail link, footer → hairline footer).
3. Restyle in place. Reuse the reference's CSS approach and the supporting JS (cursor, grid, spine, reveal, magnetic) adapted to the existing markup. Don't rewrite working logic — wire the new classes onto existing elements.
4. For any existing section with no direct reference equivalent, style it in the same visual language (warm bg, hairline borders, eyebrow + thin title, reveal on scroll) rather than removing it.
5. Verify nothing was dropped: every route and every block of copy that existed before still exists after.

---

## Done when

- The site visually reads like `dayone_3.html` — centered logo, no header, editorial vertical flow, the cursor/grid/spine/reveal motion system, rust-on-warm palette with the dark feature block.
- Every original page, section, and word of copy is still present.
- All original functionality still works.
- Responsive + reduced-motion + touch fallbacks intact.
