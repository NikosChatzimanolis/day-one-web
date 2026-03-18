// ── components/sections/Hero.tsx ──
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, useInView, type Variants } from 'framer-motion'
import type { Stat } from '@/types'

const stats: Stat[] = [
  { value: '12+', label: 'clients served', numeric: 12 },
  { value: '2 wks', label: 'average delivery', numeric: 2 },
  { value: '€350', label: 'starting price', numeric: 350 },
]

const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

function useCounter(target: number, duration: number = 1200, start: boolean = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(ease * target))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])

  return count
}

function StatCounter({ stat, delay = 0 }: { stat: Stat; delay?: number }) {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-50px' })
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (isInView && !started) {
      const timer = setTimeout(() => setStarted(true), delay)
      return () => clearTimeout(timer)
    }
  }, [isInView, started, delay])

  const count = useCounter(stat.numeric, 1200, started && !shouldReduceMotion)

  const displayValue = shouldReduceMotion
    ? stat.value
    : stat.value.startsWith('€')
    ? `€${count}`
    : stat.value.includes('+')
    ? `${count}+`
    : `${count} wks`

  return (
    <motion.div
      ref={ref}
      className="flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: delay / 1000 + 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="font-display text-3xl md:text-4xl font-[600] text-text-primary leading-none">
        {displayValue}
      </span>
      <span className="font-body text-sm text-text-secondary mt-1">{stat.label}</span>
    </motion.div>
  )
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.35, 0.75], [1, 1, 0])
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  const headline = 'Your first great website.'
  const headline2 = 'Built in two weeks.'
  const words1 = headline.split(' ')
  const words2 = headline2.split(' ')
  const allWords = [...words1, ...words2]

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        delay: 0.2 + i * 0.08,
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  }

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden hero-clip"
      aria-label="Hero section"
    >
      {/* Animated gradient mesh background */}
      <motion.div
        className="absolute inset-0 gradient-mesh"
        style={shouldReduceMotion ? {} : { y: bgY }}
        aria-hidden="true"
      />

      {/* Subtle grid texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--color-text) 1px, transparent 1px),
                            linear-gradient(90deg, var(--color-text) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        className="relative z-10 container-wide pt-32 pb-24 md:pt-36 md:pb-32"
        style={shouldReduceMotion ? {} : { y: contentY, opacity: contentOpacity }}
      >
        <div className="max-w-3xl">
          {/* Label */}
          <motion.p
            className="section-label mb-8"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            Web studio — Cyprus &amp; Greece
          </motion.p>

          {/* Headline — animated word by word */}
          <h1
            className="font-display text-5xl md:text-6xl lg:text-7xl font-[400] text-text-primary leading-[1.1] mb-8"
            aria-label={`${headline} ${headline2}`}
          >
            <span className="block" aria-hidden="true">
              {words1.map((word, i) => (
                <motion.span
                  key={`h1-${i}`}
                  className="inline-block mr-[0.2em] last:mr-0"
                  custom={i}
                  variants={shouldReduceMotion ? undefined : wordVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="block text-accent" aria-hidden="true">
              {words2.map((word, i) => (
                <motion.span
                  key={`h2-${i}`}
                  className="inline-block mr-[0.2em] last:mr-0"
                  custom={words1.length + i}
                  variants={shouldReduceMotion ? undefined : wordVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Subheadline */}
          <motion.p
            className="font-body text-lg md:text-xl text-text-secondary leading-relaxed max-w-xl mb-10"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            We design and build fast, professional websites for small businesses in Cyprus and Greece — then stay available as you grow.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <CTAButton
              href="#contact"
              primary
            >
              Get a free mockup
            </CTAButton>
            <CTAButton href="#work">
              See our work ↓
            </CTAButton>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="mt-20 md:mt-24 flex flex-row gap-10 md:gap-14"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.4 }}
        >
          {stats.map((stat, i) => (
            <StatCounter key={stat.label} stat={stat} delay={i * 150} />
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        style={shouldReduceMotion ? {} : { opacity: scrollIndicatorOpacity }}
        aria-hidden="true"
      >
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-text-secondary/40 to-transparent"
          animate={shouldReduceMotion ? {} : { scaleY: [1, 0.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}

function CTAButton({
  href,
  children,
  primary = false,
}: {
  href: string
  children: React.ReactNode
  primary?: boolean
}) {
  const shouldReduceMotion = useReducedMotion()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  if (primary) {
    return (
      <motion.a
        href={href}
        onClick={handleClick}
        className="relative inline-flex items-center justify-center overflow-hidden px-7 py-3.5 font-body font-[500] text-white bg-accent rounded-sm group"
        whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
        transition={{ duration: 0.15 }}
        data-cursor-hover
      >
        {/* Hover sweep overlay */}
        <motion.span
          className="absolute inset-0 bg-accent-dark"
          initial={{ x: '-100%' }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        />
        <span className="relative z-10">{children}</span>
      </motion.a>
    )
  }

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      className="inline-flex items-center justify-center px-7 py-3.5 font-body font-[400] text-text-primary border border-border rounded-sm hover:border-accent hover:text-accent transition-colors duration-250"
      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
      transition={{ duration: 0.15 }}
      data-cursor-hover
    >
      {children}
    </motion.a>
  )
}
