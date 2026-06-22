// ── components/ui/BrowserFrame.tsx ──
// The shared browser-chrome frame for case-study visuals. As it enters view the
// chrome "assembles": the three traffic-light dots pop in sequence and a hair-
// line accent sweeps the bottom of the chrome bar, like the frame powering on,
// before the content reads. Movement lives inside the chrome only, so it layers
// cleanly under the section's own entrance and never shifts layout. Reduced
// motion renders the frame fully settled.
'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

interface BrowserFrameProps {
  url?: string
  tone?: 'light' | 'dark'
  className?: string
  children: React.ReactNode
}

const barV: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.12 } },
}
const dotV: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
}
const pillV: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}
const sweepV: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: [0, 1, 0], transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
}

export default function BrowserFrame({ url, tone = 'light', className, children }: BrowserFrameProps) {
  const reduce = useReducedMotion()
  const dark = tone === 'dark'

  const dotClass = 'w-2.5 h-2.5 rounded-full'
  const dots = ['bg-[#E0573F]/70', 'bg-[#E0A23F]/60', 'bg-[#8FAF7E]/60']

  return (
    <div
      data-no-grid
      className={cn(
        'rounded-xl overflow-hidden shadow-card border',
        dark ? 'border-dark-border bg-dark' : 'border-border bg-bg',
        className
      )}
    >
      <motion.div
        className={cn(
          'relative flex items-center gap-2 px-4 py-3 border-b',
          dark ? 'bg-dark-raised border-dark-border' : 'bg-surface border-border'
        )}
        variants={reduce ? undefined : barV}
        initial={reduce ? false : 'hidden'}
        whileInView={reduce ? undefined : 'visible'}
        viewport={{ once: true, margin: '-60px' }}
      >
        <span className="flex gap-1.5" aria-hidden="true">
          {dots.map((d) => (
            <motion.span
              key={d}
              className={cn(dotClass, d)}
              variants={reduce ? undefined : dotV}
            />
          ))}
        </span>
        {url && (
          <motion.span
            variants={reduce ? undefined : pillV}
            className={cn(
              'flex-1 mx-3 rounded-sm px-3 py-1 text-xs font-body truncate text-center',
              dark ? 'bg-dark text-[#A39E96]' : 'bg-bg text-text-tertiary'
            )}
          >
            {url}
          </motion.span>
        )}
        {!reduce && (
          <motion.span
            aria-hidden="true"
            variants={sweepV}
            className="absolute left-0 -bottom-px h-px w-full origin-left"
            style={{ background: 'linear-gradient(90deg, transparent, var(--color-accent), transparent)' }}
          />
        )}
      </motion.div>
      <div className="relative">{children}</div>
    </div>
  )
}
