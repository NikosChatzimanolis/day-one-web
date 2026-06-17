// ── components/ui/Spine.tsx ──
// Fixed center hairline that fills with rust as the page scrolls. Mirrors the
// reference's connecting spine. Hidden on small screens and under reduced motion.
'use client'

import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'

export default function Spine() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const draw = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })

  if (reduce) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-0 left-1/2 z-0 hidden w-px -translate-x-1/2 overflow-hidden bg-line md:block"
    >
      <motion.div
        className="absolute inset-x-0 top-0 origin-top bg-rust"
        style={{ height: '100%', scaleY: draw }}
      />
    </div>
  )
}
