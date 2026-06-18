// ── components/sections/HorizonRows.tsx ──
// The Build / Scale / Maintain horizons, strung together by a single thread
// that DRAWS down the left rail as you scroll through them — the one place a
// generative line is earned (here only, never site-wide). A rust hairline
// connects the three numbered nodes; its length is bound to the section's
// scroll progress, and each node warms as the draw reaches it. The numerals,
// names and copy keep the exact editorial layout they had before.
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useTransform, useReducedMotion, type MotionValue } from 'framer-motion'

export interface Horizon {
  no: string
  name: string
  line: string
}

export default function HorizonRows({ tracks }: { tracks: Horizon[] }) {
  const reduce = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])
  const [nodes, setNodes] = useState<number[]>([])

  useEffect(() => {
    const measure = () => {
      const ys = rowRefs.current.map((r) => (r ? r.offsetTop + r.offsetHeight / 2 : 0))
      setNodes(ys)
    }
    measure()
    window.addEventListener('resize', measure)
    const t = window.setTimeout(measure, 500)
    if (document.fonts?.ready) document.fonts.ready.then(measure)
    return () => {
      window.removeEventListener('resize', measure)
      window.clearTimeout(t)
    }
  }, [tracks.length])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.78', 'end 0.62'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 30, mass: 0.5 })

  const firstY = nodes[0] ?? 0
  const lastY = nodes[nodes.length - 1] ?? 0
  const span = Math.max(1, lastY - firstY)
  const showThread = !reduce && nodes.length > 1 && lastY > firstY

  return (
    <div ref={containerRef} className="relative">
      {showThread && (
        <svg
          className="pointer-events-none absolute left-0 top-0 h-full"
          width="8"
          style={{ overflow: 'visible' }}
          aria-hidden="true"
        >
          {/* faint full-height guide the draw rides over */}
          <line x1="1" x2="1" y1={firstY} y2={lastY} stroke="var(--color-dark-border)" strokeWidth="1" />
          <motion.line
            x1="1"
            x2="1"
            y1={firstY}
            y2={lastY}
            stroke="var(--color-rust)"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={{ pathLength: progress }}
          />
          {nodes.map((y, i) => (
            <Node key={i} y={y} at={(y - firstY) / span} progress={progress} />
          ))}
        </svg>
      )}

      {tracks.map((track, i) => (
        <motion.div
          key={track.no}
          ref={(el) => {
            rowRefs.current[i] = el
          }}
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`grid grid-cols-1 items-baseline gap-3 border-t border-dark-border py-9 md:grid-cols-12 md:gap-8 md:py-12 ${
            i === tracks.length - 1 ? 'border-b' : ''
          }`}
        >
          <span className="t-index text-rust md:col-span-1">{track.no}</span>
          <h3 className="t-h2 text-dark-text md:col-span-4">{track.name}</h3>
          <p className="font-body text-base leading-relaxed text-dark-text-secondary measure-lg md:col-span-6 md:col-start-7 md:text-lg">
            {track.line}
          </p>
        </motion.div>
      ))}
    </div>
  )
}

function Node({ y, at, progress }: { y: number; at: number; progress: MotionValue<number> }) {
  // node warms from hairline to rust just as the draw reaches its position
  const fill = useTransform(progress, [at - 0.02, at + 0.04], [0, 1])
  const scale = useTransform(progress, [at - 0.02, at + 0.04], [0.7, 1])
  return (
    <g>
      <circle cx="1" cy={y} r="3.25" fill="var(--color-dark)" stroke="var(--color-dark-border)" strokeWidth="1" />
      <motion.circle
        cx="1"
        cy={y}
        r="3.25"
        fill="var(--color-rust)"
        style={{ opacity: fill, scale, transformBox: 'fill-box', transformOrigin: 'center' }}
      />
    </g>
  )
}
