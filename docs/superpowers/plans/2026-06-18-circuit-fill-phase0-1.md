# Circuit Fill — Phase 0 + 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tear down the legacy center-spine / scroll-fill mechanic and stand up the static, dull-gray "circuit" skeleton — edge rails on every route, a hero stem/fork on home, rail-to-rail section dividers on home, and boxed editorial numerals — with zero motion, ready to receive the fill engine in Phase 2.

**Architecture:** A single document-spanning, absolutely-positioned SVG overlay (`<CircuitLayout>`, mounted once in the root layout) draws the two edge rails and, on home only, the stem+fork under the hero logo. Geometry is measured in a React effect (`scrollHeight`, rail inset from a CSS var, logo-divider position) and held in state — normal re-renders are fine because Phase 1 has no animation. A `<Section>` wrapper renders a full-bleed band plus a dull rail-to-rail top divider and registers itself in `CircuitContext` (registration is a stub now, consumed by the Phase 2 fill engine). The home page is restructured into `<Section>` blocks; inner routes inherit the global rails only.

**Tech Stack:** Next 16 (App Router), React 18, TypeScript, Tailwind v3.4, plain CSS custom properties. No framer-motion in the new code (the legacy mechanic's framer scroll springs are what we remove). No test runner exists in this project (`package.json` scripts are `dev`/`build`/`start`/`lint`), so each task is verified with `npm run lint` + `npx tsc --noEmit` and a browser-preview visual check against the brief's "done when" criteria.

**Reference docs:**
- Brief: `docs/superpowers/specs/2026-06-18-circuit-fill-brief.md`
- Design: `docs/superpowers/specs/2026-06-18-circuit-fill-design.md`

**Tokens (already in `app/globals.css`):** dull `--color-muted` = `#9A8F82`; filled `--color-rust` = `#C04C2A` (filled is unused until Phase 2).

---

## File Structure

**Phase 0 (teardown):**
- Delete `components/ui/Spine.tsx`
- Delete `components/ui/SpineAlignedLogo.tsx`
- Modify `app/layout.tsx` — drop `<Spine />` import/mount
- Modify `app/page.tsx` — replace `SpineAlignedLogo` with plain centered `Logo`
- Modify `components/sections/HorizonRows.tsx` — strip framer scroll-thread + SVG nodes, keep editorial grid, render dull/static

**Phase 1 (skeleton):**
- Create `components/circuit/CircuitContext.tsx` — context, provider, registration types
- Create `components/circuit/CircuitLayout.tsx` — the SVG overlay (rails + home stem/fork), geometry measurement
- Create `components/circuit/Section.tsx` — full-bleed band + dull rail-to-rail top divider + registration
- Create `components/circuit/NumberBox.tsx` — dull bordered box around a numeral
- Modify `app/globals.css` — `--circuit-inset` responsive var + circuit z-index/divider/box utility styles
- Modify `app/layout.tsx` — wrap content in `<CircuitProvider>` and mount `<CircuitLayout />`
- Modify `app/page.tsx` — restructure sections into `<Section>`, box the "How we work" numerals
- Modify `components/sections/HorizonRows.tsx` — box the 01/02/03 numerals

---

# PHASE 0 — TEARDOWN

### Task 1: Remove the center spine

**Files:**
- Delete: `components/ui/Spine.tsx`
- Modify: `app/layout.tsx` (remove import line + `<Spine />` element)

- [ ] **Step 1: Delete the component file**

```bash
git rm components/ui/Spine.tsx
```

- [ ] **Step 2: Remove the import in `app/layout.tsx`**

Delete this line (currently line 7):

```tsx
import Spine from '@/components/ui/Spine'
```

- [ ] **Step 3: Remove the mount in `app/layout.tsx`**

In the body, delete the `<Spine />` line so the block reads:

```tsx
        <ReactiveGrid />
        <CustomCursor />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
```

- [ ] **Step 4: Verify it compiles with no dangling references**

Run: `npx tsc --noEmit && grep -rn "Spine\b" app components`
Expected: tsc passes; grep returns nothing (no remaining `Spine` references — `SpineAlignedLogo` is handled in Task 2).

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx components/ui/Spine.tsx
git commit -m "refactor: remove legacy center spine (circuit teardown)"
```

---

### Task 2: Replace SpineAlignedLogo with a plainly-centered Logo

**Files:**
- Delete: `components/ui/SpineAlignedLogo.tsx`
- Modify: `app/page.tsx` (hero lockup)

- [ ] **Step 1: Swap the import in `app/page.tsx`**

Replace (line 3):

```tsx
import SpineAlignedLogo from '@/components/ui/SpineAlignedLogo'
```

with:

```tsx
import Logo from '@/components/ui/Logo'
```

- [ ] **Step 2: Swap the usage in the hero**

Replace:

```tsx
            <Reveal className="mb-8 sm:mb-10">
              <SpineAlignedLogo variant="primary" size="2xl" />
            </Reveal>
```

with:

```tsx
            <Reveal className="mb-8 sm:mb-10">
              <Logo variant="primary" size="2xl" />
            </Reveal>
```

(The logo keeps `data-logo-divider` on its `|`; the Phase-1 stem measures that, so no per-logo offset is needed anymore — the lockup just sits centered.)

- [ ] **Step 3: Delete the now-unused component**

```bash
git rm components/ui/SpineAlignedLogo.tsx
```

- [ ] **Step 4: Verify no dangling references**

Run: `npx tsc --noEmit && grep -rn "SpineAlignedLogo" app components`
Expected: tsc passes; grep returns nothing.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx components/ui/SpineAlignedLogo.tsx
git commit -m "refactor: plain centered hero logo (drop spine-aligned variant)"
```

---

### Task 3: Strip the framer scroll-thread from HorizonRows (keep editorial grid, dull/static)

**Files:**
- Modify: `components/sections/HorizonRows.tsx` (full rewrite — remove framer-motion, SVG thread, nodes, measurement)

- [ ] **Step 1: Replace the entire file contents**

Overwrite `components/sections/HorizonRows.tsx` with:

```tsx
// ── components/sections/HorizonRows.tsx ──
// The Build / Scale / Maintain horizons. The connecting line and node-warming
// that used to live here (a framer scroll-progress thread) were removed during
// the circuit teardown — the new circuit rails/dividers and (Phase 3) fillable
// numerals replace it. This now renders the editorial grid only, statically.
import NumberBox from '@/components/circuit/NumberBox'

export interface Horizon {
  no: string
  name: string
  line: string
}

export default function HorizonRows({ tracks }: { tracks: Horizon[] }) {
  return (
    <div className="relative">
      {tracks.map((track, i) => (
        <div
          key={track.no}
          className={`grid grid-cols-1 items-baseline gap-3 border-t border-dark-border py-9 md:grid-cols-12 md:gap-8 md:py-12 ${
            i === tracks.length - 1 ? 'border-b' : ''
          }`}
        >
          <div className="md:col-span-1">
            <NumberBox tone="dark">{track.no}</NumberBox>
          </div>
          <h3 className="t-h2 text-dark-text md:col-span-4">{track.name}</h3>
          <p className="font-body text-base leading-relaxed text-dark-text-secondary measure-lg md:col-span-6 md:col-start-7 md:text-lg">
            {track.line}
          </p>
        </div>
      ))}
    </div>
  )
}
```

> Note: `NumberBox` is created in Task 7. This file will not typecheck until then — that is expected; Task 3 and Task 7 are committed together is NOT required, but run the Step-2 check only after Task 7 if executing strictly in order. To keep Task 3 independently green, you may temporarily inline `<span className="t-index text-muted">{track.no}</span>` and switch to `NumberBox` in Task 7. The reviewer should pick one; the recommended path is to do Task 7 (NumberBox) before re-running typecheck here.

- [ ] **Step 2: Verify no framer/scroll code remains in this file**

Run: `grep -nE "framer-motion|useScroll|useSpring|useTransform|pathLength|IntersectionObserver" components/sections/HorizonRows.tsx`
Expected: returns nothing.

- [ ] **Step 3: Commit**

```bash
git add components/sections/HorizonRows.tsx
git commit -m "refactor: strip scroll-thread from HorizonRows (static editorial grid)"
```

---

### Task 4: Confirm teardown is clean (audit + ScrollCue decision)

**Files:** none (verification + a flagged-for-review note already recorded in the design doc).

- [ ] **Step 1: Confirm no legacy spine/scroll-fill mechanic code remains**

Run:
```bash
grep -rnE "Spine|scrollYProgress|useScroll" app components | grep -vE "Navbar.tsx|Magnetic.tsx|ReactiveGrid.tsx|CustomCursor.tsx"
```
Expected: returns nothing. (Navbar/Magnetic/ReactiveGrid/CustomCursor keep their own unrelated scroll/pointer logic — they are NOT part of the circuit mechanic and stay.)

- [ ] **Step 2: Record the ScrollCue decision**

No code change. `components/ui/ScrollCue.tsx` + the `.scrollcue-line` keyframe in `globals.css` are a hero scroll *hint*, not a rail/fill effect. Per the design doc they are **kept and flagged**, not deleted blind. Leave them in place. (If the reviewer wants them gone, that is a one-line removal from `app/page.tsx` + the CSS block — do it on their say-so, not speculatively.)

- [ ] **Step 3: Verify the app still builds after teardown**

Run: `npx tsc --noEmit && npm run lint`
Expected: passes (assuming Task 7's `NumberBox` exists; if executing strictly top-to-bottom, this check moves to after Task 7).

No commit (verification only).

---

# PHASE 1 — SKELETON

### Task 5: Circuit context + CSS tokens

**Files:**
- Create: `components/circuit/CircuitContext.tsx`
- Modify: `app/globals.css` (append circuit styles)

- [ ] **Step 1: Create the context and provider**

Create `components/circuit/CircuitContext.tsx`:

```tsx
// ── components/circuit/CircuitContext.tsx ──
// Shared registry for circuit-fill participants. In Phase 1 registration is a
// no-op stub used only so <Section> (and later fillable primitives) can register
// without knowing about the engine. Phase 2 replaces the stub body with the rAF
// fill loop; the public API (register/unregister) stays the same.
'use client'

import { createContext, useCallback, useContext, useMemo, useRef } from 'react'

export interface FillRegistration {
  /** The element whose document geometry the engine tracks. */
  el: HTMLElement
  /** Optional fill band (px) for thin elements; undefined = use element height. */
  band?: number
}

export interface CircuitContextValue {
  register: (reg: FillRegistration) => () => void
}

const CircuitContext = createContext<CircuitContextValue | null>(null)

export function CircuitProvider({ children }: { children: React.ReactNode }) {
  // Phase 1: hold registrations but do nothing with them. Phase 2 reads this set
  // each animation frame.
  const registry = useRef<Set<FillRegistration>>(new Set())

  const register = useCallback((reg: FillRegistration) => {
    registry.current.add(reg)
    return () => {
      registry.current.delete(reg)
    }
  }, [])

  const value = useMemo<CircuitContextValue>(() => ({ register }), [register])

  return <CircuitContext.Provider value={value}>{children}</CircuitContext.Provider>
}

/** Returns the circuit registry, or null if used outside a provider. */
export function useCircuit(): CircuitContextValue | null {
  return useContext(CircuitContext)
}
```

- [ ] **Step 2: Append circuit tokens + utilities to `app/globals.css`**

Add at the end of `app/globals.css`:

```css
/* ── Circuit fill mechanic ─────────────────────────────────────────────
   Edge rails + section dividers, drawn dull-gray in Phase 1. The rail inset
   is the single source of truth for both the SVG rails (read in JS) and the
   rail-to-rail dividers (used in CSS). */
:root { --circuit-inset: 16px; }
@media (min-width: 768px) { :root { --circuit-inset: 24px; } }

/* SVG overlay: spans the document, sits above the dotted grid (z-1) and below
   the navbar (z-50). Geometry/lines are set inline by <CircuitLayout>. */
.circuit-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  pointer-events: none;
}

/* A section's full-bleed top divider, rail-to-rail, dull. */
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

/* Dull bordered numeral box (light + dark tone). Becomes fillable in Phase 3. */
.circuit-numbox {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-muted);
  padding: 0.25rem 0.6rem;
  line-height: 1;
}
```

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: passes.

- [ ] **Step 4: Commit**

```bash
git add components/circuit/CircuitContext.tsx app/globals.css
git commit -m "feat: circuit context registry + dull-skeleton CSS tokens"
```

---

### Task 6: CircuitLayout — edge rails + home stem/fork

**Files:**
- Create: `components/circuit/CircuitLayout.tsx`
- Modify: `app/layout.tsx` (wrap in provider + mount)

- [ ] **Step 1: Create `components/circuit/CircuitLayout.tsx`**

```tsx
// ── components/circuit/CircuitLayout.tsx ──
// The background circuit: two edge rails spanning the document, plus (home only)
// a short stem under the hero logo's "|" that forks out to both rail tops.
// Phase 1 is static + dull. Geometry is measured into state (no animation here,
// so re-renders are fine); Phase 2 adds the rAF fill loop on top of the same SVG.
'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const STEM_LENGTH = 56 // px: hero stem drop from the logo divider to the fork
const TOP_ANCHOR = 120 // px: where inner-page rails begin (below the fixed header)
const DULL = 'var(--color-muted)'

interface Geometry {
  docWidth: number
  docHeight: number
  inset: number
  /** Y where rails start: fork Y on home, TOP_ANCHOR on inner pages. */
  railTop: number
  /** Home-only stem/fork; null on inner pages or before the logo is measured. */
  fork: { x: number; y: number; stemTop: number } | null
}

export default function CircuitLayout() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [geo, setGeo] = useState<Geometry | null>(null)

  useEffect(() => {
    const measure = () => {
      const doc = document.documentElement
      const inset =
        parseInt(getComputedStyle(doc).getPropertyValue('--circuit-inset'), 10) || 16
      const docWidth = doc.clientWidth
      const docHeight = doc.scrollHeight

      let railTop = TOP_ANCHOR
      let fork: Geometry['fork'] = null

      if (isHome) {
        const divider = document.querySelector<HTMLElement>('[data-logo-divider]')
        if (divider) {
          const r = divider.getBoundingClientRect()
          const x = r.left + r.width / 2 + window.scrollX
          const stemTop = r.bottom + window.scrollY
          const y = stemTop + STEM_LENGTH
          fork = { x, y, stemTop }
          railTop = y
        }
      }

      setGeo({ docWidth, docHeight, inset, railTop, fork })
    }

    measure()
    window.addEventListener('resize', measure)
    const t = window.setTimeout(measure, 400) // settle after font swap
    if (document.fonts?.ready) document.fonts.ready.then(measure)
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)

    return () => {
      window.removeEventListener('resize', measure)
      window.clearTimeout(t)
      ro.disconnect()
    }
  }, [isHome, pathname])

  if (!geo) return null

  const { docWidth, docHeight, inset, railTop, fork } = geo
  const xL = inset
  const xR = docWidth - inset

  return (
    <svg
      className="circuit-layer"
      width={docWidth}
      height={docHeight}
      viewBox={`0 0 ${docWidth} ${docHeight}`}
      aria-hidden="true"
    >
      {/* Left + right rails */}
      <line x1={xL} y1={railTop} x2={xL} y2={docHeight} stroke={DULL} strokeWidth="1" />
      <line x1={xR} y1={railTop} x2={xR} y2={docHeight} stroke={DULL} strokeWidth="1" />

      {/* Home-only stem + fork */}
      {fork && (
        <>
          {/* vertical stem under the logo "|" */}
          <line x1={fork.x} y1={fork.stemTop} x2={fork.x} y2={fork.y} stroke={DULL} strokeWidth="1" />
          {/* horizontal fork out to both rails */}
          <line x1={xL} y1={fork.y} x2={xR} y2={fork.y} stroke={DULL} strokeWidth="1" />
        </>
      )}
    </svg>
  )
}
```

- [ ] **Step 2: Mount it in `app/layout.tsx`**

Add imports near the other component imports:

```tsx
import CircuitLayout from '@/components/circuit/CircuitLayout'
import { CircuitProvider } from '@/components/circuit/CircuitContext'
```

Wrap the body content so the provider spans everything and the overlay mounts once:

```tsx
      <body className="font-body bg-bg text-text-primary antialiased">
        <JsonLd
          data={{
            /* …unchanged… */
          }}
        />
        <CircuitProvider>
          <ReactiveGrid />
          <CircuitLayout />
          <CustomCursor />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </CircuitProvider>
      </body>
```

(Leave the `<JsonLd …>` block exactly as it is; only the wrapping `<CircuitProvider>` and the `<CircuitLayout />` line are new.)

- [ ] **Step 3: Verify compile + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: passes.

- [ ] **Step 4: Visual check (rails on every route, fork on home)**

Start the dev server and check in the browser preview:
- Home `/`: two dull vertical lines at the left/right edges; a short vertical stem under the logo's `|` meeting a horizontal line that runs to both edges; rails descend from the fork to the page bottom. Nothing above the fork.
- An inner route (e.g. `/services`): rails present from below the header to the bottom; **no** fork.
- Rails read cleanly over both light and `.section-dark` bands.

Expected: matches the above; no console errors.

- [ ] **Step 5: Commit**

```bash
git add components/circuit/CircuitLayout.tsx app/layout.tsx
git commit -m "feat: dull circuit rails (all routes) + hero stem/fork (home)"
```

---

### Task 7: NumberBox + box the editorial numerals

**Files:**
- Create: `components/circuit/NumberBox.tsx`
- Modify: `app/page.tsx` (box "How we work" 01–04)
- (`HorizonRows.tsx` already references `NumberBox` from Task 3)

- [ ] **Step 1: Create `components/circuit/NumberBox.tsx`**

```tsx
// ── components/circuit/NumberBox.tsx ──
// A numeral wrapped in a dull bordered box. Static + dull in Phase 1; the border
// and digits become fillable (DrawBorder + FillText) in Phase 3, which is why it
// is its own primitive rather than an inline span.
import { cn } from '@/lib/utils'

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
      {children}
    </span>
  )
}
```

- [ ] **Step 2: Box the "How we work" numerals in `app/page.tsx`**

Add the import:

```tsx
import NumberBox from '@/components/circuit/NumberBox'
```

Replace the beat numeral:

```tsx
                  <span className="t-index text-accent">{String(i + 1).padStart(2, '0')}</span>
```

with:

```tsx
                  <NumberBox>{String(i + 1).padStart(2, '0')}</NumberBox>
```

- [ ] **Step 3: Verify compile + lint (this also un-blocks Task 3's typecheck)**

Run: `npx tsc --noEmit && npm run lint`
Expected: passes; `HorizonRows.tsx` now resolves its `NumberBox` import.

- [ ] **Step 4: Visual check**

In the preview: the home "How we work" 01–04 and the Build/Scale/Maintain 01–03 numerals each render inside a thin dull-gray box; digits read dull (not rust). Dark-section boxes (horizons) read cleanly against near-black.

- [ ] **Step 5: Commit**

```bash
git add components/circuit/NumberBox.tsx app/page.tsx components/sections/HorizonRows.tsx
git commit -m "feat: dull bordered NumberBox around editorial numerals"
```

---

### Task 8: `<Section>` wrapper + rail-to-rail dividers on home

**Files:**
- Create: `components/circuit/Section.tsx`
- Modify: `app/page.tsx` (convert the home `<section>` bands to `<Section>`)

- [ ] **Step 1: Create `components/circuit/Section.tsx`**

```tsx
// ── components/circuit/Section.tsx ──
// A full-bleed page band that emits a dull rail-to-rail top divider into the
// circuit layer and registers itself with the circuit engine. Authoring a page
// = composing <Section> blocks; dividers are never hardcoded. Pass `firstBand`
// to suppress the divider where a band should not have one (e.g. right under the
// hero fork). The inner centered container still lives in the children.
'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { useCircuit } from './CircuitContext'

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
  const ref = useRef<HTMLElement>(null)
  const circuit = useCircuit()

  useEffect(() => {
    if (!circuit || !ref.current) return
    // Phase 1: registration is a no-op stub; Phase 2 consumes it. Registering the
    // section element here means new <Section> blocks participate automatically.
    return circuit.register({ el: ref.current })
  }, [circuit])

  return (
    <section ref={ref} id={id} className={cn('relative', className)}>
      {!firstBand && <span aria-hidden="true" className="circuit-divider" />}
      {children}
    </section>
  )
}
```

- [ ] **Step 2: Convert the home bands in `app/page.tsx`**

Add the import:

```tsx
import Section from '@/components/circuit/Section'
```

For each content band below the hero, change the wrapping `<section …>` to `<Section …>` and drop its `border-t border-border` (the circuit divider replaces it). Specifically:

- The hero stays a plain `<section className="relative overflow-hidden">` (it is above the fork — no divider).
- "Why us" band: `<section className="border-t border-border bg-bg">` → `<Section className="bg-bg">`
- "What we do" band: `<section className="section-dark">` → `<Section className="section-dark">`
- "Proof" band: `<section className="bg-bg border-t border-border">` → `<Section className="bg-bg">`
- "How we work" band: `<section className="bg-surface border-t border-border">` → `<Section className="bg-surface">`

Close each with `</Section>` instead of `</section>`. Leave the inner `<div className="container-wide section">…</div>` untouched in every band.

> `CtaSection` is a separate component; leave it as-is in Phase 1 (it gets its own divider when inner sections are converted in the follow-up).

- [ ] **Step 3: Verify compile + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: passes.

- [ ] **Step 4: Visual check (dividers rail-to-rail, in gutters, no double lines)**

In the preview on `/`:
- Each home band boundary (below the hero) shows a single dull horizontal line running from the left rail to the right rail, sitting in the gutter between bands.
- No leftover `border-t` doubling the divider.
- Lines do not cross any text block; rails + dividers form a continuous circuit with no long bare rail stretch.

- [ ] **Step 5: Commit**

```bash
git add components/circuit/Section.tsx app/page.tsx
git commit -m "feat: <Section> wrapper emits rail-to-rail dividers on home"
```

---

### Task 9: Responsive + dark-section verification pass

**Files:** none (verification; small CSS tweaks only if a check fails).

- [ ] **Step 1: Breakpoint check**

In the preview, resize to ~375px (mobile), ~768px (tablet), ~1280px (desktop). Confirm:
- Rail inset switches (16px < md, 24px ≥ md) and rails never crowd or overlap the centered content.
- The hero stem stays centered under the logo `|` after font load at every width.
- Dividers stay rail-to-rail at each inset.

- [ ] **Step 2: Dark-section legibility**

Confirm dull-gray rails/dividers/number boxes read cleanly against `.section-dark` (near-black) without looking muddy. If too faint, bump the dull line opacity by switching `--color-muted` usages in the circuit CSS to `rgba(154,143,130,0.6)`+ as needed (adjust only the `.circuit-*` rules, not the global token).

- [ ] **Step 3: No-motion + console check**

Confirm: nothing animates (no fill, no draw) — the skeleton is fully static. No console errors/warnings from removed listeners.

- [ ] **Step 4: Full build**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 5: Commit any tweaks**

```bash
git add -A
git commit -m "fix: circuit dark-section legibility + responsive tuning"
```

(If no tweaks were needed, skip the commit.)

---

## Done When (Phase 0 + 1)

- No legacy center-spine / scroll-fill mechanic code remains; `grep` for `Spine`/`scrollYProgress`/`useScroll` (excluding Navbar/Magnetic/ReactiveGrid/CustomCursor) is empty.
- Rails render dull on every route; the hero stem/fork renders on home only, starting at the fork (nothing above it).
- Home is composed of `<Section>` blocks, each boundary carrying a single rail-to-rail dull divider; no doubled `border-t`.
- Editorial numerals (01–03, 01–04) sit in dull bordered boxes; buttons remain outlined (their borders become fillable in Phase 3).
- Everything is static and dull `#9A8F82`; layout holds at mobile/tablet/desktop; dark sections read cleanly.
- `npm run build` + `npm run lint` pass; no console errors.

## Deferred to later phases (NOT in this plan)
- Phase 2: `<FillProvider>` rAF loop + `useFill` positional engine, proven on rails.
- Phase 3: `<Divider>` / `<FillText>` / `<DrawBorder>` fillable primitives; numerals + buttons fill terracotta.
- Phase 4: reduced-motion, IntersectionObserver perf gating, node markers, cross-browser, `REF` tuning.
- Inner routes (Services/Work/Forge/About/Contact) converted to `<Section>` blocks with dividers.

---

## Self-Review

- **Spec coverage (Phase 0/1):** teardown of spine (T1), spine-aligned logo (T2), HorizonRows thread (T3), audit + ScrollCue flag (T4); skeleton CircuitLayout rails+fork (T6), Section + dividers (T8), boxed numerals (T7), responsive + dark-section (T9). All Phase 0/1 "done when" items map to a task. ✓
- **Cross-task type consistency:** `NumberBox` props (`children`/`tone`/`className`) used identically in T3 and T7; `useCircuit()`/`register({ el })` defined in T5 and consumed in T8; `--circuit-inset` defined in T5, read in T6 (JS) and used in T8's `.circuit-divider` (CSS). ✓
- **Known ordering note:** T3 references `NumberBox` (created in T7). Flagged inline in T3 with a temporary-inline fallback so each task can stay green; recommended order keeps T3→T7 close and re-runs typecheck after T7. ✓
- **Placeholders:** none — every code step shows complete code. ✓
