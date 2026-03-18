// ── components/ui/Panel.tsx ──
'use client'

import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useScrollContext, SECTIONS } from '@/context/ScrollContext'
import type { ReactNode } from 'react'

export interface PanelContent {
  left?: ReactNode
  right?: ReactNode
  children?: ReactNode
}

const SPRING = { type: 'spring', stiffness: 80, damping: 20, mass: 1 } as const
const CUBIC = { duration: 0.6, ease: [0.76, 0, 0.24, 1] } as const

export default function Panel({
  index,
  content,
  onSettled,
}: {
  index: number
  content: PanelContent
  onSettled?: () => void
}) {
  const { direction } = useScrollContext()
  const shouldReduceMotion = useReducedMotion()

  // Each Panel instance fires onAnimationComplete for both its enter AND exit animation.
  // hasSettledRef ensures we only call onSettled once — on the enter animation.
  // The exiting Panel (old key) already has hasSettledRef=true from when it entered,
  // so its exit fire is ignored. The entering Panel (new key) starts fresh at false.
  const hasSettledRef = useRef(false)
  function handleSettled() {
    if (hasSettledRef.current) return
    hasSettledRef.current = true
    onSettled?.()
  }

  const section = SECTIONS[index]
  const splitRatio = section?.splitRatio ?? [50, 50]
  const isFull = section?.type === 'full'

  // Full panels slide vertically (direction-aware).
  // Split panels open/close horizontally — left from left edge, right from right edge,
  // always regardless of scroll direction. The two halves meet in the centre.
  const fromY = direction === 'down' ? '100vh' : '-100vh'
  const exitY = direction === 'down' ? '-100vh' : '100vh'

  if (isFull) {
    return (
      <motion.div
        className="absolute inset-0"
        style={{ background: section?.bg }}
        initial={shouldReduceMotion ? undefined : { y: fromY }}
        animate={shouldReduceMotion ? undefined : { y: 0, transition: CUBIC }}
        exit={shouldReduceMotion ? undefined : { y: exitY, transition: CUBIC }}
        onAnimationComplete={handleSettled}
      >
        <div className="w-full h-full overflow-hidden">
          {content.children}
        </div>
      </motion.div>
    )
  }

  // Split panel — each half slides in from its own edge.
  // onSettled is attached to the RIGHT half — it has a 0.15s stagger so it settles last.
  return (
    <div className="absolute inset-0 flex flex-col md:flex-row">
      {/* Left half — enters from left edge, exits to left edge */}
      <motion.div
        className="panel-half"
        style={{ '--panel-width': `${splitRatio[0]}%` } as React.CSSProperties}
        initial={shouldReduceMotion ? undefined : { x: '-100vw' }}
        animate={shouldReduceMotion ? undefined : { x: 0, transition: { ...SPRING, delay: 0 } }}
        exit={shouldReduceMotion ? undefined : { x: '-100vw', transition: { ...SPRING, delay: 0 } }}
      >
        <div className="w-full h-full overflow-hidden">
          {content.left}
        </div>
      </motion.div>

      {/* Right half — enters from right edge with 150ms stagger, exits to right edge */}
      <motion.div
        className="panel-half"
        style={{ '--panel-width': `${splitRatio[1]}%` } as React.CSSProperties}
        initial={shouldReduceMotion ? undefined : { x: '100vw' }}
        animate={shouldReduceMotion ? undefined : { x: 0, transition: { ...SPRING, delay: 0.15 } }}
        exit={shouldReduceMotion ? undefined : { x: '100vw', transition: { ...SPRING, delay: 0 } }}
        onAnimationComplete={handleSettled}
      >
        <div className="w-full h-full overflow-hidden">
          {content.right}
        </div>
      </motion.div>
    </div>
  )
}
