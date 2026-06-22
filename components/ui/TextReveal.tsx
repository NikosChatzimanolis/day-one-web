// ── components/ui/TextReveal.tsx ──
// Word-by-word entrance for the lines that carry weight. Each word resolves
// into place — a small rise with a blur clearing — staggered so the phrase
// assembles rather than fading as one block. Used two ways:
//   trigger="load"   → the hero headline assembles the moment the page settles
//   trigger="inview" → a statement line resolves as it scrolls into frame
// Splitting is purely visual: the full phrase is exposed to assistive tech via
// aria-label, and the per-word spans are hidden. Reduced-motion renders the
// text plainly with no split and no motion.
'use client'

import { createElement } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span'

export interface RevealLine {
  text: string
  className?: string
}

interface TextRevealProps {
  lines: RevealLine[]
  as?: Tag
  className?: string
  trigger?: 'load' | 'inview'
  baseDelay?: number
  stagger?: number
  /** vertical lift each word travels, px */
  wordY?: number
  /** starting blur, px */
  blur?: number
  duration?: number
}

export default function TextReveal({
  lines,
  as = 'h2',
  className,
  trigger = 'inview',
  baseDelay = 0,
  stagger = 0.05,
  wordY = 14,
  blur = 6,
  duration = 0.8,
}: TextRevealProps) {
  const reduce = useReducedMotion()
  const fullText = lines.map((l) => l.text).join(' ')

  // reduced motion: plain, recognisable, no split
  if (reduce) {
    return createElement(
      as,
      { className },
      lines.map((line, i) => (
        <span key={i} className={cn('block', line.className)}>
          {line.text}
        </span>
      ))
    )
  }

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: wordY, filter: `blur(${blur}px)` },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration, ease: [0.16, 1, 0.3, 1], delay: baseDelay + i * stagger },
    }),
  }

  const MotionTag = motion[as]
  const triggerProps =
    trigger === 'load'
      ? { animate: 'visible' as const }
      : { whileInView: 'visible' as const, viewport: { once: true, margin: '-80px' } }

  let wordIndex = 0

  return (
    <MotionTag
      className={className}
      aria-label={fullText}
      variants={{ hidden: {}, visible: {} }}
      initial="hidden"
      {...triggerProps}
    >
      {lines.map((line, li) => (
        <span key={li} aria-hidden="true" className={cn('block', line.className)}>
          {line.text.split(' ').map((word, wi) => {
            const i = wordIndex++
            return (
              <span key={wi} className="inline-block whitespace-pre">
                <motion.span
                  className="inline-block will-change-[transform,filter]"
                  variants={wordVariants}
                  custom={i}
                >
                  {word}
                </motion.span>
                {wi < line.text.split(' ').length - 1 ? ' ' : ''}
              </span>
            )
          })}
        </span>
      ))}
    </MotionTag>
  )
}
