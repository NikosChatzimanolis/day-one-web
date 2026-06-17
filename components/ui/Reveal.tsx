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
 * Restrained scroll-entrance. Fades and lifts once, never loops.
 * Respects prefers-reduced-motion.
 */
export default function Reveal({ children, className, delay = 0, as = 'div', y = 22 }: RevealProps) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as]

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y, filter: reduce ? 'blur(0px)' : 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.95, delay, ease: [0.22, 0.61, 0.36, 1] },
    },
  }

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-90px' }}
    >
      {children}
    </MotionTag>
  )
}

/** Container that staggers Reveal children. Use with RevealItem. */
export function RevealGroup({
  children,
  className,
  stagger = 0.1,
}: {
  children: React.ReactNode
  className?: string
  stagger?: number
}) {
  const reduce = useReducedMotion()
  const variants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : stagger } },
  }
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-90px' }}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({
  children,
  className,
  y = 22,
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
    hidden: { opacity: 0, y: reduce ? 0 : y, filter: reduce ? 'blur(0px)' : 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.9, ease: [0.22, 0.61, 0.36, 1] } },
  }
  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  )
}
