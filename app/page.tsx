// ── app/page.tsx ──
'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import ScrollProvider, { useScrollContext } from '@/context/ScrollContext'
import { useLanguage } from '@/context/LanguageContext'
import { t } from '@/lib/translations'
import SplitLayout from '@/components/layout/SplitLayout'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Process from '@/components/sections/HowItWorks'
import Offer from '@/components/sections/Pricing'
import { ContactFormCard } from '@/components/sections/Contact'
import Logo from '@/components/ui/Logo'

// ─── Shared animation variants ────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroLeft() {
  const { scrollToSection } = useScrollContext()
  const { lang } = useLanguage()
  const shouldReduceMotion = useReducedMotion()

  const headline = t('hero.headline1', lang)
  const headline2 = t('hero.headline2', lang)
  const words1 = headline.split(' ')
  const words2 = headline2.split(' ')

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { delay: 0.2 + i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    }),
  }

  return (
    <div className="relative flex flex-col justify-center min-h-full px-6 lg:px-14 pt-24 pb-10 bg-bg overflow-hidden">
      <div className="absolute inset-0 gradient-mesh" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--color-text) 1px, transparent 1px), linear-gradient(90deg, var(--color-text) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <motion.p
        className="relative z-10 section-label mb-6"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {t('hero.label', lang)}
      </motion.p>

      <h1
        className="relative z-10 font-display text-4xl md:text-5xl lg:text-6xl font-[300] text-text-primary leading-[1.1] mb-6"
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

      <motion.p
        className="relative z-10 font-body text-base md:text-lg text-text-secondary leading-relaxed max-w-md mb-8"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {t('hero.description', lang)}
      </motion.p>

      <motion.div
        className="relative z-10 flex flex-col sm:flex-row gap-3"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection(3)
          }}
          className="inline-flex items-center justify-center px-6 py-3 font-body font-[500] text-sm text-white bg-accent rounded-sm hover:bg-accent-dark transition-colors duration-250"
        >
          {t('hero.cta', lang)}
        </a>
      </motion.div>

      <motion.p
        className="relative z-10 mt-5 font-body text-xs text-text-secondary/60"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.4 }}
      >
        {t('hero.note', lang)}
      </motion.p>
    </div>
  )
}

function HeroRight() {
  return (
    <div className="relative hidden md:flex items-center justify-center min-h-full bg-bg overflow-hidden">
      <div className="absolute inset-0 gradient-mesh" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--color-text) 1px, transparent 1px), linear-gradient(90deg, var(--color-text) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 select-none pointer-events-none" aria-hidden="true">
        <Logo variant="primary" size="2xl" />
      </div>
    </div>
  )
}

// ─── Demo (placeholder) ───────────────────────────────────────────────────────

function DemoLeft() {
  const shouldReduceMotion = useReducedMotion()
  const { scrollToSection } = useScrollContext()
  const { lang } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: false, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      className="flex flex-col justify-center min-h-full px-6 lg:px-12 pt-24 pb-10 bg-bg"
      variants={shouldReduceMotion ? undefined : containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.p className="section-label mb-5" variants={shouldReduceMotion ? undefined : itemVariants}>
        {t('demo.label', lang)}
      </motion.p>
      <motion.h2
        className="font-display text-3xl md:text-4xl font-[300] text-text-primary leading-tight mb-5"
        variants={shouldReduceMotion ? undefined : itemVariants}
      >
        {t('demo.heading', lang)}
      </motion.h2>
      <motion.p
        className="font-body text-sm text-text-secondary leading-relaxed mb-8 max-w-xs"
        variants={shouldReduceMotion ? undefined : itemVariants}
      >
        {t('demo.description', lang)}
      </motion.p>
      <motion.div variants={shouldReduceMotion ? undefined : itemVariants}>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection(3)
          }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white text-sm rounded-sm hover:bg-accent-dark transition-colors duration-250"
        >
          {t('demo.cta', lang)} <span aria-hidden="true">→</span>
        </a>
      </motion.div>
    </motion.div>
  )
}

function DemoRight() {
  const { lang } = useLanguage()

  return (
    <div className="relative flex items-center justify-center min-h-full bg-surface overflow-hidden px-8 pt-16 pb-10">
      <div className="w-full max-w-lg">
        <div className="rounded-xl overflow-hidden border border-border bg-bg shadow-lg">
          {/* Browser chrome */}
          <div className="bg-[#E8E3DC] px-4 py-2.5 flex items-center gap-2 flex-shrink-0">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
            </div>
            <div className="flex-1 mx-3 bg-white/60 rounded px-3 py-1 text-xs text-text-secondary truncate font-mono">
              your-business.com
            </div>
          </div>
          {/* Placeholder content */}
          <div className="p-8 flex flex-col items-center justify-center min-h-[260px] text-center">
            <div className="w-12 h-12 rounded-sm bg-accent/10 flex items-center justify-center mb-4">
              <span className="text-accent text-lg">▶</span>
            </div>
            <p className="font-display text-xl font-[300] text-text-primary mb-2">
              {t('demo.placeholder.title', lang)}
            </p>
            <p className="font-body text-sm text-text-secondary max-w-xs">
              {t('demo.placeholder.text', lang)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function ContactLeft() {
  const shouldReduceMotion = useReducedMotion()
  const { lang } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: false, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      className="flex flex-col justify-center min-h-full px-6 lg:px-12 pt-24 pb-10 bg-bg overflow-hidden"
      variants={shouldReduceMotion ? undefined : containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.p className="section-label mb-5" variants={shouldReduceMotion ? undefined : itemVariants}>
        {t('contact.label', lang)}
      </motion.p>
      <motion.h2
        className="font-display text-3xl md:text-4xl font-[300] text-text-primary leading-tight mb-6"
        variants={shouldReduceMotion ? undefined : itemVariants}
      >
        {t('contact.heading', lang)}
      </motion.h2>
      <motion.p
        className="font-body text-sm text-text-secondary leading-relaxed mb-8"
        variants={shouldReduceMotion ? undefined : itemVariants}
      >
        {t('contact.description', lang)}
      </motion.p>

      {/* Trust elements */}
      <motion.div
        className="flex flex-col gap-4 mb-8"
        variants={shouldReduceMotion ? undefined : itemVariants}
      >
        {[
          { icon: '💬', label: t('contact.whatsapp', lang), value: '+357 96 254 148' },
          { icon: '✉', label: t('contact.email', lang), value: 'contact@dayone-web.com' },
          { icon: '📍', label: t('contact.basedIn', lang), value: t('contact.location', lang) },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className="text-lg" aria-hidden="true">{item.icon}</span>
            <div>
              <p className="font-body text-xs text-text-secondary">{item.label}</p>
              <p className="font-body text-sm text-text-primary font-[500]">{item.value}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.p
        className="font-body text-xs text-text-secondary/60 italic"
        variants={shouldReduceMotion ? undefined : itemVariants}
      >
        {t('contact.responseTime', lang)}
      </motion.p>
    </motion.div>
  )
}

function ContactRight() {
  return (
    <div className="flex flex-col justify-center items-center min-h-full px-6 lg:px-10 pt-24 pb-10 bg-surface overflow-y-auto">
      <div className="w-full max-w-md">
        <ContactFormCard />
      </div>
    </div>
  )
}

// ─── Back to top ──────────────────────────────────────────────────────────────

function BackToTop() {
  const { scrollToSection } = useScrollContext()
  const { lang } = useLanguage()
  return (
    <div className="text-center py-6 bg-surface border-t border-border">
      <button
        onClick={() => scrollToSection(0)}
        className="font-body text-sm text-text-secondary/60 hover:text-text-secondary transition-colors duration-200"
      >
        {t('backToTop', lang)}
      </button>
    </div>
  )
}

// ─── Panel definitions ────────────────────────────────────────────────────────

const PANELS = [
  { left: <HeroLeft />,     right: <HeroRight /> },      // 0: hero
  { children: <Process /> },                               // 1: process (full)
  { children: <Offer /> },                                 // 2: offer (full)
  { left: <ContactLeft />,   right: <ContactRight /> },   // 3: contact
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <ScrollProvider>
      <Navbar />
      <main>
        <SplitLayout
          panels={PANELS}
          after={
            <>
              <div className="snap-section-end">
                <BackToTop />
                <Footer />
              </div>
            </>
          }
        />
      </main>
    </ScrollProvider>
  )
}
