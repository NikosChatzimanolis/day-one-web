// ── components/ui/ReactiveGrid.tsx ──
// The living layer. A single fixed canvas, present site-wide, that keeps the
// faint graph-paper grid quietly alive: dots ease toward a soft rust pool under
// the cursor, drift with scroll depth (parallax), and flip tone (ink ↔ cream)
// across dark sections so the grid stays continuous from light bands into dark.
//
// Design constraints it honours:
//  • felt, not seen — base contrast is a whisper; the accent only blooms near
//    the cursor, which is exactly where the reader is looking, never over a
//    paragraph they're mid-read on.
//  • GPU-cheap — one rAF loop that sleeps when nothing is moving and re-wakes on
//    pointer / scroll; paused while the tab is hidden; DPR-capped.
//  • degrades — reduced-motion gets one static tone-aware pass (no loop, no
//    pool); coarse pointers (touch) get a lighter, pointer-free version.
'use client'

import { useEffect, useRef } from 'react'

const SPACING = 46 // grid rhythm (px) — sits with the editorial 48px feel
const DOT = 1.6 // dot side (px)
const POOL_RADIUS = 200 // cursor influence radius (px)
const PARALLAX = 0.055 // how much the field drifts against scroll depth

// tone palette (r,g,b) — pulled from the brand tokens
const INK = [26, 24, 22] // light-section dots
const CREAM = [245, 240, 234] // dark-section dots
const RUST_LIGHT = [181, 85, 47] // --color-accent
const RUST_DARK = [217, 113, 79] // dark-section rust (#D9714F)

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

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
    let step = SPACING

    // eased cursor pool
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, target: 0, glow: 0 }
    // eased parallax offset of the dot field
    let offsetY = 0
    let maxScroll = 1
    let darkBands: Array<[number, number]> = []

    let running = false
    let rafId = 0

    function computeBands() {
      const els = document.querySelectorAll<HTMLElement>('.section-dark, .forge-dark')
      const sy = window.scrollY
      const bands: Array<[number, number]> = []
      els.forEach((el) => {
        const r = el.getBoundingClientRect()
        bands.push([r.top + sy, r.bottom + sy])
      })
      darkBands = bands
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    }

    function inDark(docY: number) {
      for (let i = 0; i < darkBands.length; i++) {
        if (docY >= darkBands[i][0] && docY < darkBands[i][1]) return true
      }
      return false
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      vw = window.innerWidth
      vh = window.innerHeight
      step = coarse ? SPACING * 1.4 : SPACING
      canvas!.width = Math.floor(vw * dpr)
      canvas!.height = Math.floor(vh * dpr)
      canvas!.style.width = `${vw}px`
      canvas!.style.height = `${vh}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      computeBands()
      wake()
    }

    function draw() {
      ctx.clearRect(0, 0, vw, vh)
      const sy = window.scrollY
      const progress = Math.min(1, sy / maxScroll)
      const glow = pointer.glow
      const px = pointer.x
      const py = pointer.y
      const off = ((offsetY % step) + step) % step

      for (let x = -step; x <= vw + step; x += step) {
        for (let gy = -step; gy <= vh + step; gy += step) {
          const y = gy + off
          const dark = inDark(y + sy)
          const dot = dark ? CREAM : INK
          const rust = dark ? RUST_DARK : RUST_LIGHT

          // base whisper, evolving a touch denser/brighter deeper down the page
          let a = (dark ? 0.06 : 0.045) + progress * 0.012
          let cr = dot[0]
          let cg = dot[1]
          let cb = dot[2]
          let dx = 0
          let dy = 0

          if (glow > 0.001) {
            const ox = x - px
            const oy = y - py
            const dist = Math.sqrt(ox * ox + oy * oy)
            if (dist < POOL_RADIUS) {
              const p = 1 - dist / POOL_RADIUS
              const pe = p * p * glow // smooth falloff scaled by pool intensity
              a += pe * 0.42
              const mix = pe * 0.95
              cr = lerp(cr, rust[0], mix)
              cg = lerp(cg, rust[1], mix)
              cb = lerp(cb, rust[2], mix)
              if (dist > 0.001) {
                const pull = pe * 8 // subtle warp toward the cursor
                dx = -(ox / dist) * pull
                dy = -(oy / dist) * pull
              }
            }
          }

          if (a <= 0.003) continue
          ctx.globalAlpha = a
          ctx.fillStyle = `rgb(${cr | 0},${cg | 0},${cb | 0})`
          ctx.fillRect(x + dx - DOT / 2, y + dy - DOT / 2, DOT, DOT)
        }
      }
      ctx.globalAlpha = 1
    }

    function frame() {
      pointer.x = lerp(pointer.x, pointer.tx, 0.1)
      pointer.y = lerp(pointer.y, pointer.ty, 0.1)
      pointer.glow = lerp(pointer.glow, pointer.target, 0.08)
      const targetOffset = -window.scrollY * PARALLAX
      offsetY = lerp(offsetY, targetOffset, 0.08)

      draw()

      const posSettled =
        Math.abs(pointer.x - pointer.tx) < 0.5 && Math.abs(pointer.y - pointer.ty) < 0.5
      const glowSettled = Math.abs(pointer.glow - pointer.target) < 0.004
      const offsetSettled = Math.abs(offsetY - targetOffset) < 0.3

      if (posSettled && glowSettled && offsetSettled) {
        running = false // sleep; the last frame (incl. a resting pool) stays drawn
        return
      }
      rafId = requestAnimationFrame(frame)
    }

    function drawStatic() {
      // reduced-motion: tone-aware texture, no pool, no drift
      offsetY = 0
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
      wake()
    }
    function onVisibility() {
      if (document.hidden) {
        if (rafId) cancelAnimationFrame(rafId)
        running = false
      } else {
        computeBands()
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

    // section positions settle after fonts/layout — recompute a few times
    const t1 = window.setTimeout(() => { computeBands(); wake() }, 400)
    const t2 = window.setTimeout(() => { computeBands(); wake() }, 1400)
    if (document.fonts?.ready) document.fonts.ready.then(() => { computeBands(); wake() })

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
