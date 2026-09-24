// ── components/ui/Reveal.tsx ──
'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'

interface RevealProps {
  children: React.ReactNode
  className?: string
  /** Stagger delay in seconds for sequenced reveals */
  delay?: number
  as?: 'div' | 'li' | 'section' | 'span'
  y?: number
}

/**
 * Restrained scroll-entrance. Fades and lifts once, never loops. Kept short
 * (0.5s, no blur filter) so the page feels quick; blur on large images was
 * expensive to composite and made sections feel late. Respects
 * prefers-reduced-motion.
 */
export default function Reveal({ children, className, delay = 0, as = 'div', y = 14 }: RevealProps) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as]

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: Math.min(delay, 0.2), ease: [0.22, 0.61, 0.36, 1] },
    },
  }

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      {children}
    </MotionTag>
  )
}

/** Container that staggers Reveal children. Use with RevealItem. */
export function RevealGroup({
  children,
  className,
  stagger = 0.06,
}: {
  children: React.ReactNode
  className?: string
  stagger?: number
}) {
  const reduce = useReducedMotion()
  const variants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : Math.min(stagger, 0.06) } },
  }
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({
  children,
  className,
  y = 14,
  as = 'div',
}: {
  children: React.ReactNode
  className?: string
  y?: number
  as?: 'div' | 'li' | 'span'
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as]
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] } },
  }
  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  )
}
