// ── components/ui/ReactiveGrid.tsx ──
// The living layer. A single fixed overlay canvas, present site-wide, that
// paints the faint graph-paper grid and brightens whole cells in rust near the
// cursor. The grid appears only on bare light (bg-bg) background; dark sections,
// deeper-cream surface bands, cards (.svc, .tile), buttons, and [data-no-grid]
// regions are cut out via clearRect. Lines are static (no parallax) — only the
// cursor bloom animates.
//
// Design constraints it honours:
//  • felt, not seen — base lines are a whisper; the rust cells only bloom near
//    the cursor, exactly where the reader is looking.
//  • GPU-cheap — one rAF loop that sleeps when nothing is moving and re-wakes on
//    pointer / scroll; paused while the tab is hidden; DPR-capped.
//  • degrades — reduced-motion gets one static pass (no loop, no cells); coarse
//    pointers (touch) get the lines without the cursor bloom.
'use client'

import { useEffect, useRef } from 'react'

const CELL = 46 // grid rhythm (px)
const POOL_RADIUS = 150 // half-width of the slice / radius of the pool at rest (px)
const PARALLAX = 0 // horizontal lines stay pixel-aligned (no scroll drift)

// The bloom "cuts" along the cursor's path: a tight leading point races ahead
// while a slower trailing point lags, so the lit pool stretches into a slice
// while moving and heals back into a round pool at rest — knife-through-butter.
const HEAD_EASE = 0.24 // leading edge — tracks the cursor tightly
const TAIL_EASE = 0.085 // trailing edge — lags, giving the slice its length
const TAIL_MAX_LEN = 240 // px — cap the slice so a fast flick doesn't streak forever
const CELL_ATTACK = 0.18 // how fast a cell brightens toward its target
const CELL_RELEASE = 0.06 // how fast it fades back — slower = silkier trail

// tone palette (r,g,b) — pulled from the brand tokens
const INK = [26, 24, 22] // light-section lines
const RUST_LIGHT = [192, 76, 42] // --color-rust (#C04C2A)
const BASE_LIGHT = 0.05 // ink line alpha on light bands
const CELL_MAX = 0.16 // rust cell fill peak alpha

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
// smoothstep — softens the falloff at the edge of the pool
const smooth = (t: number) => t * t * (3 - 2 * t)
// shortest distance from a point to the segment a→b (the cursor's recent path),
// so cells light by their distance to the whole slice, not just its centre.
const segDist = (
  px: number, py: number,
  ax: number, ay: number,
  bx: number, by: number,
) => {
  const dx = bx - ax
  const dy = by - ay
  const len2 = dx * dx + dy * dy
  let t = len2 > 0 ? ((px - ax) * dx + (py - ay) * dy) / len2 : 0
  t = t < 0 ? 0 : t > 1 ? 1 : t
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy))
}

type Rect = [left: number, top: number, right: number, bottom: number]

export default function ReactiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    // Non-null assertion: control-flow narrowing from a guard doesn't reach the
    // nested closures below (resize/draw), matching the `canvas!` usage here.
    const ctx = canvas.getContext('2d')!
    if (!ctx) return

    const reduceMql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const coarseMql = window.matchMedia('(pointer: coarse)')
    let reduce = reduceMql.matches
    let coarse = coarseMql.matches

    let vw = 0
    let vh = 0
    let dpr = 1

    // eased cursor pool — `cells` holds each brightened cell's current/target
    // alpha, so cells fade in and out independently (no popping when the cursor
    // jumps between them).
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 }
    let active = false // cursor is currently on the page
    let primed = false // bloom has been snapped onto the first cursor position
    type Cell = { i: number; j: number; cur: number; tgt: number }
    const cells = new Map<string, Cell>()
    let cellsMoving = false
    // trailing point of the slice (the head is `pointer.x/y`)
    let tailX = -9999
    let tailY = -9999
    // eased parallax offset of the horizontal lines
    let offsetY = 0
    let noGridRects: Rect[] = []
    let boundsDirty = true

    let running = false
    let rafId = 0

    function computeNoGridRects() {
      const els = document.querySelectorAll<HTMLElement>(
        '.section-dark, .forge-dark, .svc, .tile, [data-no-grid]'
      )
      const rects: Rect[] = []
      els.forEach((el) => {
        const r = el.getBoundingClientRect()
        rects.push([r.left, r.top, r.right, r.bottom])
      })
      noGridRects = rects
    }

    function inNoGrid(x: number, y: number) {
      for (let i = 0; i < noGridRects.length; i++) {
        const [left, top, right, bottom] = noGridRects[i]
        if (x >= left && x < right && y >= top && y < bottom) return true
      }
      return false
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      vw = window.innerWidth
      vh = window.innerHeight
      canvas!.width = Math.floor(vw * dpr)
      canvas!.height = Math.floor(vh * dpr)
      canvas!.style.width = `${vw}px`
      canvas!.style.height = `${vh}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      boundsDirty = true
      draw() // synchronous first paint — no empty flash, survives a paused rAF
      wake()
    }

    // Draw the full line grid (verticals + parallax-drifted horizontals) in one
    // tone, within whatever clip is currently set.
    function drawLines(rgb: number[], alpha: number, off: number) {
      ctx.lineWidth = 1
      ctx.strokeStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`
      ctx.beginPath()
      for (let x = 0; x <= vw; x += CELL) {
        ctx.moveTo(x + 0.5, 0)
        ctx.lineTo(x + 0.5, vh)
      }
      for (let y = -CELL; y <= vh + CELL; y += CELL) {
        const yy = y - off
        ctx.moveTo(0, yy + 0.5)
        ctx.lineTo(vw, yy + 0.5)
      }
      ctx.stroke()
    }

    function draw() {
      if (boundsDirty) {
        computeNoGridRects()
        boundsDirty = false
      }

      ctx.clearRect(0, 0, vw, vh)
      const off = ((offsetY % CELL) + CELL) % CELL

      drawLines(INK, BASE_LIGHT, off)

      for (let i = 0; i < noGridRects.length; i++) {
        const [left, top, right, bottom] = noGridRects[i]
        ctx.clearRect(left - 1, top - 1, right - left + 2, bottom - top + 2)
      }

      if (reduce) {
        cellsMoving = false
        return
      }

      // Refresh targets: every tracked cell decays to 0 unless the cursor is on
      // the page and within reach, where it aims for a smoothstepped, distance-
      // based peak.
      cells.forEach((c) => {
        c.tgt = 0
      })
      if (active && primed) {
        const hx = pointer.x
        const hy = pointer.y
        const ax = tailX
        const ay = tailY
        const R = POOL_RADIUS
        // bounding box of the whole capsule (tail → head, padded by R)
        const i0 = Math.floor((Math.min(hx, ax) - R) / CELL)
        const i1 = Math.ceil((Math.max(hx, ax) + R) / CELL)
        const j0 = Math.floor((Math.min(hy, ay) + off - R) / CELL)
        const j1 = Math.ceil((Math.max(hy, ay) + off + R) / CELL)
        for (let i = i0; i <= i1; i++) {
          for (let j = j0; j <= j1; j++) {
            const cxp = i * CELL + CELL / 2
            const cyp = j * CELL - off + CELL / 2
            if (inNoGrid(cxp, cyp)) continue
            const d = segDist(cxp, cyp, ax, ay, hx, hy)
            if (d >= R) continue
            const tgt = smooth(1 - d / R) * CELL_MAX
            const key = i + ',' + j
            const existing = cells.get(key)
            if (existing) existing.tgt = tgt
            else cells.set(key, { i, j, cur: 0, tgt })
          }
        }
      }

      // Ease each cell toward its target and paint it (inset 1px so the grid
      // still frames the cell). Fully-faded cells are dropped; `cellsMoving`
      // keeps the loop alive until the last one settles.
      let moving = false
      cells.forEach((c, key) => {
        const rate = c.tgt > c.cur ? CELL_ATTACK : CELL_RELEASE
        c.cur += (c.tgt - c.cur) * rate
        if (c.cur < 0.002 && c.tgt === 0) {
          cells.delete(key)
          return
        }
        if (Math.abs(c.tgt - c.cur) > 0.0016) moving = true
        ctx.fillStyle = `rgba(${RUST_LIGHT[0]},${RUST_LIGHT[1]},${RUST_LIGHT[2]},${c.cur})`
        ctx.fillRect(c.i * CELL + 1, c.j * CELL - off + 1, CELL - 2, CELL - 2)
      })
      cellsMoving = moving
    }

    function frame() {
      // leading edge tracks tightly; trailing edge lags to form the slice
      pointer.x = lerp(pointer.x, pointer.tx, HEAD_EASE)
      pointer.y = lerp(pointer.y, pointer.ty, HEAD_EASE)
      tailX = lerp(tailX, pointer.tx, TAIL_EASE)
      tailY = lerp(tailY, pointer.ty, TAIL_EASE)
      // cap how far the tail may trail the head so a fast flick slices a fixed
      // length instead of streaking across the whole viewport
      const dxT = tailX - pointer.x
      const dyT = tailY - pointer.y
      const lenT = Math.hypot(dxT, dyT)
      if (lenT > TAIL_MAX_LEN) {
        tailX = pointer.x + (dxT / lenT) * TAIL_MAX_LEN
        tailY = pointer.y + (dyT / lenT) * TAIL_MAX_LEN
      }
      const targetOffset = window.scrollY * PARALLAX
      offsetY = lerp(offsetY, targetOffset, 0.12)

      draw()

      const posSettled =
        Math.abs(pointer.x - pointer.tx) < 0.5 &&
        Math.abs(pointer.y - pointer.ty) < 0.5 &&
        Math.abs(tailX - pointer.tx) < 0.5 &&
        Math.abs(tailY - pointer.ty) < 0.5
      const offsetSettled = Math.abs(offsetY - window.scrollY * PARALLAX) < 0.3

      if (posSettled && offsetSettled && !cellsMoving) {
        running = false // sleep; the last frame stays drawn
        return
      }
      rafId = requestAnimationFrame(frame)
    }

    function drawStatic() {
      // reduced-motion: static lines at the current scroll, no cells, no loop
      offsetY = window.scrollY * PARALLAX
      draw()
    }

    function wake() {
      if (reduce) {
        drawStatic()
        return
      }
      if (!running) {
        running = true
        rafId = requestAnimationFrame(frame)
      }
    }

    function onMove(e: MouseEvent) {
      pointer.tx = e.clientX
      pointer.ty = e.clientY
      // snap the bloom onto the cursor the first time so it doesn't slide in
      // from the corner; ease from there on.
      if (!primed) {
        pointer.x = e.clientX
        pointer.y = e.clientY
        tailX = e.clientX
        tailY = e.clientY
        primed = true
      }
      active = true
      wake()
    }
    function onLeave() {
      active = false
      wake()
    }
    function onScroll() {
      boundsDirty = true
      wake()
    }
    function onVisibility() {
      if (document.hidden) {
        if (rafId) cancelAnimationFrame(rafId)
        running = false
      } else {
        boundsDirty = true
        wake()
      }
    }
    function onMotionPref() {
      reduce = reduceMql.matches
      if (reduce) {
        if (rafId) cancelAnimationFrame(rafId)
        running = false
        drawStatic()
      } else {
        wake()
      }
    }

    resize()

    window.addEventListener('resize', resize)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)
    if (!coarse) {
      window.addEventListener('mousemove', onMove, { passive: true })
      document.addEventListener('mouseleave', onLeave)
    }
    reduceMql.addEventListener('change', onMotionPref)

    // element positions settle after fonts/layout — recompute a few times
    const t1 = window.setTimeout(() => { boundsDirty = true; draw(); wake() }, 400)
    const t2 = window.setTimeout(() => { boundsDirty = true; draw(); wake() }, 1400)
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => { boundsDirty = true; draw(); wake() })
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      reduceMql.removeEventListener('change', onMotionPref)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1]"
    />
  )
}
