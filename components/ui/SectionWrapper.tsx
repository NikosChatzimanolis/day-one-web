// ── components/ui/SectionWrapper.tsx ──
'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from 'framer-motion'

interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
}

export default function SectionWrapper({
  children,
  className = '',
}: SectionWrapperProps) {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
    // 0 = section top reaches viewport bottom (entering from below)
    // 1 = section bottom reaches viewport top (fully exited top)
  })

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.85, 1],
    [0, 1, 1, 0]
  )
  const y = useTransform(
    scrollYProgress,
    [0, 0.12, 0.85, 1],
    [60, 0, 0, -50]
  )

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity, y }}
    >
      {children}
    </motion.div>
  )
}

/* ── Stagger container — opacity stays 1; SectionWrapper handles outer fade ── */
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

/* ── Stagger items — children own their own opacity + y on entry ── */
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}
