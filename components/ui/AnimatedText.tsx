// ── components/ui/AnimatedText.tsx ──
'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  mode?: 'words' | 'chars'
  staggerDelay?: number
  initialDelay?: number
  once?: boolean
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

const charVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function AnimatedText({
  text,
  className = '',
  as: Tag = 'span',
  mode = 'words',
  staggerDelay = 0.08,
  initialDelay = 0,
  once = true,
}: AnimatedTextProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <Tag className={className}>{text}</Tag>
  }

  if (mode === 'words') {
    const words = text.split(' ')
    return (
      <Tag className={`${className} inline`} aria-label={text}>
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className="inline-block mr-[0.22em] last:mr-0"
            custom={i + initialDelay / staggerDelay}
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            aria-hidden="true"
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    )
  }

  const chars = text.split('')
  return (
    <Tag className={`${className} inline`} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          custom={i}
          variants={charVariants}
          initial="hidden"
          animate="visible"
          aria-hidden="true"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </Tag>
  )
}
