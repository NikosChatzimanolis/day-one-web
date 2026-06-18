// ── components/ui/LivingThread.tsx ──
// The site's connective current. Born at the hero logo divider, it splits to two
// side rails, lights the existing horizontal section dividers as rust rungs, and
// energizes the section numerals as the scroll front reaches them, converging
// back into the footer logo divider. Measured from real DOM (no hardcoded
// coords). Home only; hidden < md; static-and-complete under reduced motion.
'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion'

interface Rung { y: number; threshold: number }
interface Geo {
  w: number
  h: number
  termX: number
  termY: number
  railTopY: number
  railBotY: number
  railL: number
  railR: number
  splitL: string
  splitR: string
  railLPath: string
  railRPath: string
  convL: string
  convR: string
  rungs: Rung[]
}

export default function LivingThread() {
  const pathname = usePathname()
  const reduce = useReducedMotion()
  const svgRef = useRef<SVGSVGElement>(null)
  const [geo, setGeo] = useState<Geo | null>(null)
  const nodesRef = useRef<{ el: HTMLElement; threshold: number }[]>([])
  const maxRef = useRef(0)
  const chargedApplier = useRef<(m: number) => void>(() => {})

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.5 })
  // Rust leads the eye and is fully drawn by ~85% scroll.
  const lead = useTransform(progress, [0, 0.85], [reduce ? 1 : 0.03, 1])

  // Measure + build geometry from tagged DOM.
  useEffect(() => {
    if (pathname !== '/') return
    const svg = svgRef.current
    const wrap = svg?.parentElement
    if (!wrap) return

    document.documentElement.classList.add('thread-active')

    const applyCharged = (m: number) => {
      for (const n of nodesRef.current) {
        if (m >= n.threshold) n.el.classList.add('charged')
      }
    }
    chargedApplier.current = applyCharged

    const build = () => {
      if (window.innerWidth < 768) {
        setGeo(null)
        return
      }
      const wr = wrap.getBoundingClientRect()
      const W = wr.width
      const H = wrap.offsetHeight
      const center = (el: Element) => {
        const r = el.getBoundingClientRect()
        return { x: r.left + r.width / 2 - wr.left, y: r.top + r.height / 2 - wr.top }
      }
      const topY = (el: Element) => el.getBoundingClientRect().top - wr.top

      const dividers = wrap.querySelectorAll('[data-logo-divider]')
      const origin = dividers[0] ? center(dividers[0]) : { x: W / 2, y: H * 0.06 }
      const term = dividers[dividers.length - 1]
        ? center(dividers[dividers.length - 1])
        : { x: W / 2, y: H - 80 }

      const railInset = Math.min(56, Math.max(20, W * 0.03))
      const railL = railInset
      const railR = W - railInset
      const railTopY = origin.y + H * 0.05
      const railBotY = term.y - H * 0.03

      const rungs: Rung[] = [...wrap.querySelectorAll('[data-thread-rung]')]
        .map((el) => {
          const y = topY(el)
          return { y, threshold: y / H }
        })
        .filter((r) => r.y > railTopY && r.y < railBotY)
        .sort((a, b) => a.y - b.y)

      nodesRef.current = [...wrap.querySelectorAll('[data-thread-node]')].map((el) => ({
        el: el as HTMLElement,
        threshold: center(el).y / H,
      }))
      // Re-evaluate charged state for the new thresholds.
      applyCharged(maxRef.current)

      const splitL = `M ${origin.x} ${origin.y} C ${origin.x} ${origin.y + H * 0.03}, ${railL + W * 0.14} ${railTopY - 28}, ${railL} ${railTopY}`
      const splitR = `M ${origin.x} ${origin.y} C ${origin.x} ${origin.y + H * 0.03}, ${railR - W * 0.14} ${railTopY - 28}, ${railR} ${railTopY}`
      const railLPath = `M ${railL} ${railTopY} L ${railL} ${railBotY}`
      const railRPath = `M ${railR} ${railTopY} L ${railR} ${railBotY}`
      const convL = `M ${railL} ${railBotY} C ${railL + W * 0.14} ${term.y + 18}, ${term.x} ${term.y}, ${term.x} ${term.y}`
      const convR = `M ${railR} ${railBotY} C ${railR - W * 0.14} ${term.y + 18}, ${term.x} ${term.y}, ${term.x} ${term.y}`

      setGeo({
        w: W, h: H, termX: term.x, termY: term.y,
        railTopY, railBotY, railL, railR,
        splitL, splitR, railLPath, railRPath, convL, convR, rungs,
      })
    }

    build()
    const ro = new ResizeObserver(build)
    ro.observe(wrap)
    window.addEventListener('resize', build)
    const t = window.setTimeout(build, 500)
    if (document.fonts?.ready) document.fonts.ready.then(build)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', build)
      window.clearTimeout(t)
      document.documentElement.classList.remove('thread-active')
      for (const n of nodesRef.current) n.el.classList.remove('charged')
    }
  }, [pathname])

  // Latch progress and charge numerals as the front passes them.
  useMotionValueEvent(progress, 'change', (v) => {
    if (reduce) return
    if (v > maxRef.current) {
      maxRef.current = v
      chargedApplier.current(maxRef.current)
    }
  })

  // Reduced motion: charge everything once, render static full geometry.
  useEffect(() => {
    if (pathname === '/' && reduce) {
      const id = window.setTimeout(() => {
        for (const n of nodesRef.current) n.el.classList.add('charged')
      }, 300)
      return () => window.clearTimeout(id)
    }
  }, [pathname, reduce])

  if (pathname !== '/') return null

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full md:block"
      viewBox={geo ? `0 0 ${geo.w} ${geo.h}` : undefined}
      preserveAspectRatio="none"
      fill="none"
    >
      {geo && (
        <>
          {/* soft always-visible guides */}
          {[geo.splitL, geo.splitR, geo.railLPath, geo.railRPath, geo.convL, geo.convR].map((d, i) => (
            <path key={`g${i}`} d={d} stroke="var(--color-rust)" strokeWidth={1.25} strokeOpacity={0.18} vectorEffect="non-scaling-stroke" />
          ))}
          {geo.rungs.map((r, i) => (
            <line key={`gr${i}`} x1={geo.railL} y1={r.y} x2={geo.railR} y2={r.y} stroke="var(--color-rust)" strokeWidth={1} strokeOpacity={0.14} vectorEffect="non-scaling-stroke" />
          ))}

          {/* split (draws first) */}
          <Draw d={geo.splitL} progress={lead} range={[0, 0.06]} reduce={!!reduce} />
          <Draw d={geo.splitR} progress={lead} range={[0, 0.06]} reduce={!!reduce} />
          {/* rails */}
          <motion.path d={geo.railLPath} stroke="var(--color-rust)" strokeWidth={1.5} strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ pathLength: reduce ? 1 : lead }} />
          <motion.path d={geo.railRPath} stroke="var(--color-rust)" strokeWidth={1.5} strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ pathLength: reduce ? 1 : lead }} />
          {/* rungs */}
          {geo.rungs.map((r, i) => (
            <Rung key={`r${i}`} x1={geo.railL} x2={geo.railR} y={r.y} threshold={r.threshold} progress={lead} reduce={!!reduce} />
          ))}
          {/* convergence */}
          <Draw d={geo.convL} progress={lead} range={[0.9, 1]} reduce={!!reduce} />
          <Draw d={geo.convR} progress={lead} range={[0.9, 1]} reduce={!!reduce} />

          {/* charge heads */}
          {!reduce && <ChargeHead x={geo.railL} topY={geo.railTopY} botY={geo.railBotY} progress={lead} />}
          {!reduce && <ChargeHead x={geo.railR} topY={geo.railTopY} botY={geo.railBotY} progress={lead} />}
        </>
      )}
    </svg>
  )
}

function Draw({ d, progress, range, reduce }: { d: string; progress: MotionValue<number>; range: [number, number]; reduce: boolean }) {
  const len = useTransform(progress, range, [0, 1])
  return <motion.path d={d} stroke="var(--color-rust)" strokeWidth={1.5} strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ pathLength: reduce ? 1 : len }} />
}

function Rung({ x1, x2, y, threshold, progress, reduce }: { x1: number; x2: number; y: number; threshold: number; progress: MotionValue<number>; reduce: boolean }) {
  const len = useTransform(progress, [threshold - 0.04, threshold + 0.03], [0, 1])
  return <motion.line x1={x1} y1={y} x2={x2} y2={y} stroke="var(--color-rust)" strokeWidth={1.25} vectorEffect="non-scaling-stroke" style={{ pathLength: reduce ? 1 : len }} />
}

function ChargeHead({ x, topY, botY, progress }: { x: number; topY: number; botY: number; progress: MotionValue<number> }) {
  const cy = useTransform(progress, [0, 1], [topY, botY])
  const opacity = useTransform(progress, [0, 0.02, 0.97, 1], [0, 1, 1, 0])
  return <motion.circle cx={x} r={3.5} fill="var(--color-rust)" vectorEffect="non-scaling-stroke" style={{ cy, opacity }} />
}
