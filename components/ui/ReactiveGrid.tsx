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
const POOL_RADIUS = 150 // cursor influence radius (px)
const PARALLAX = 0 // horizontal lines stay pixel-aligned (no scroll drift)

// tone palette (r,g,b) — pulled from the brand tokens
const INK = [26, 24, 22] // light-section lines
const RUST_LIGHT = [192, 76, 42] // --color-rust (#C04C2A)
const BASE_LIGHT = 0.05 // ink line alpha on light bands
const CELL_MAX = 0.16 // rust cell fill peak alpha

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

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

    // eased cursor pool
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, target: 0, glow: 0 }
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

      // rust-brightened cells near the cursor (drawn over the lines, inset 1px so
      // the grid still frames each cell).
      const glow = pointer.glow
      if (glow > 0.002 && pointer.x > -100) {
        const px = pointer.x
        const py = pointer.y
        const R = POOL_RADIUS
        const i0 = Math.floor((px - R) / CELL)
        const i1 = Math.ceil((px + R) / CELL)
        const j0 = Math.floor((py + off - R) / CELL)
        const j1 = Math.ceil((py + off + R) / CELL)
        for (let i = i0; i <= i1; i++) {
          for (let j = j0; j <= j1; j++) {
            const cellX = i * CELL
            const cellY = j * CELL - off
            const cxp = cellX + CELL / 2
            const cyp = cellY + CELL / 2
            if (inNoGrid(cxp, cyp)) continue
            const d = Math.hypot(cxp - px, cyp - py)
            if (d >= R) continue
            const a = 1 - d / R
            ctx.fillStyle = `rgba(${RUST_LIGHT[0]},${RUST_LIGHT[1]},${RUST_LIGHT[2]},${a * a * CELL_MAX * glow})`
            ctx.fillRect(cellX + 1, cellY + 1, CELL - 2, CELL - 2)
          }
        }
      }
    }

    function frame() {
      pointer.x = lerp(pointer.x, pointer.tx, 0.12)
      pointer.y = lerp(pointer.y, pointer.ty, 0.12)
      pointer.glow = lerp(pointer.glow, pointer.target, 0.08)
      const targetOffset = window.scrollY * PARALLAX
      offsetY = lerp(offsetY, targetOffset, 0.12)

      draw()

      const posSettled =
        Math.abs(pointer.x - pointer.tx) < 0.5 && Math.abs(pointer.y - pointer.ty) < 0.5
      const glowSettled = Math.abs(pointer.glow - pointer.target) < 0.004
      const offsetSettled = Math.abs(offsetY - window.scrollY * PARALLAX) < 0.3

      if (posSettled && glowSettled && offsetSettled) {
        running = false // sleep; the last frame stays drawn
        return
      }
      rafId = requestAnimationFrame(frame)
    }

    function drawStatic() {
      // reduced-motion: static lines at the current scroll, no cells, no loop
      offsetY = window.scrollY * PARALLAX
      pointer.glow = 0
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
      pointer.target = 1
      wake()
    }
    function onLeave() {
      pointer.target = 0
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
