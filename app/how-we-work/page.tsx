// ── app/how-we-work/page.tsx — How We Work — redesigned ──
'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion'
import { ArrowRight, ArrowLeft, Home } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/context/LanguageContext'
import { t, languages, type TranslationKey } from '@/lib/translations'
import Logo from '@/components/ui/Logo'
import Footer from '@/components/layout/Footer'
import ScrollProvider from '@/context/ScrollContext'

// ─── Data ────────────────────────────────────────────────────────────────────

const steps: { number: string; titleKey: TranslationKey; descriptionKey: TranslationKey }[] = [
  { number: '01', titleKey: 'hww.step1.title', descriptionKey: 'hww.step1.description' },
  { number: '02', titleKey: 'hww.step2.title', descriptionKey: 'hww.step2.description' },
  { number: '03', titleKey: 'hww.step3.title', descriptionKey: 'hww.step3.description' },
  { number: '04', titleKey: 'hww.step4.title', descriptionKey: 'hww.step4.description' },
  { number: '05', titleKey: 'hww.step5.title', descriptionKey: 'hww.step5.description' },
  { number: '06', titleKey: 'hww.step6.title', descriptionKey: 'hww.step6.description' },
]

// ─── Animation variants ──────────────────────────────────────────────────────

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

// ─── Step component ──────────────────────────────────────────────────────────

function StepItem({ step }: { step: typeof steps[0] }) {
  const shouldReduceMotion = useReducedMotion()
  const { lang } = useLanguage()

  return (
    <motion.div
      className="group relative grid grid-cols-[auto_1fr] gap-6 md:gap-10"
      variants={shouldReduceMotion ? undefined : staggerItem}
    >
      {/* Step number */}
      <div className="flex flex-col items-center">
        <span className="font-display text-4xl md:text-5xl lg:text-6xl font-[300] text-accent leading-none select-none">
          {step.number}
        </span>
        {/* Timeline connector */}
        <div className="w-px flex-1 bg-border mt-4 group-last:hidden" />
      </div>

      {/* Content */}
      <div className="pb-14 md:pb-20 group-last:pb-0">
        <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-[300] text-text-primary leading-tight mb-3">
          {t(step.titleKey, lang)}
        </h3>
        <p className="font-body text-sm md:text-base text-text-secondary leading-relaxed max-w-xl">
          {t(step.descriptionKey, lang)}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Social media clarity block ──────────────────────────────────────────────

function SocialMediaBlock() {
  const shouldReduceMotion = useReducedMotion()
  const { lang } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-80px' })

  const blocks: { labelKey: TranslationKey; label: string }[] = [
    { labelKey: 'hww.social.setup', label: 'Setup' },
    { labelKey: 'hww.social.ongoing', label: 'Ongoing' },
    { labelKey: 'hww.social.content', label: 'Content Production' },
  ]

  return (
    <section ref={ref} className="bg-surface">
      <div className="container-wide section-py">
        <motion.div
          className="max-w-3xl mx-auto"
          variants={shouldReduceMotion ? undefined : fadeUp}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-[300] text-text-primary leading-tight mb-4">
            {t('hww.social.heading', lang)}
          </h2>
          <p className="font-body text-sm md:text-base text-text-secondary leading-relaxed mb-10 md:mb-14">
            {t('hww.social.intro', lang)}
          </p>

          <div className="flex flex-col gap-8 md:gap-10">
            {blocks.map((block) => (
              <div key={block.label}>
                <p className="font-body text-sm md:text-base text-text-secondary leading-relaxed">
                  {t(block.labelKey, lang)}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Page header ─────────────────────────────────────────────────────────────

function PageHeader() {
  const { lang, setLang } = useLanguage()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[rgba(247,244,239,0.95)] backdrop-blur-md border-b border-border">
      <div className="container-wide">
        <div className="flex items-center justify-between h-[72px]">
          <Link href="/" className="hover:opacity-80 transition-opacity duration-250">
            <Logo variant="primary" size="sm" showTagline={false} />
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-body font-[400] text-text-secondary hover:text-accent transition-colors duration-250"
            >
              <ArrowLeft size={14} />
              {t('hww.home', lang)}
            </Link>

            {/* Language switcher */}
            <div className="hidden md:flex items-center gap-0.5" aria-label="Language switcher">
              {languages.map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={cn(
                    'px-2 py-1 font-body text-xs rounded-sm transition-all duration-200',
                    lang === l
                      ? 'bg-accent/10 text-accent font-[500]'
                      : 'text-text-secondary hover:text-text-primary'
                  )}
                  aria-label={`Switch to ${l}`}
                >
                  {l}
                </button>
              ))}
            </div>

            <Link
              href="/#contact"
              className="inline-flex items-center px-5 py-2.5 text-sm font-body font-[500] bg-accent text-white rounded-sm hover:bg-accent-dark transition-colors duration-250 max-sm:text-xs max-sm:px-3 max-sm:py-2"
            >
              {t('hww.cta.button', lang)}
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

// ─── Floating home button ────────────────────────────────────────────────────

function FloatingHomeButton() {
  const shouldReduceMotion = useReducedMotion()
  const { lang } = useLanguage()
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0])

  return (
    <motion.div
      className="fixed bottom-8 left-8 z-50 hidden md:block"
      style={{ opacity: shouldReduceMotion ? 1 : opacity }}
    >
      <Link
        href="/"
        className="group flex items-center gap-2.5 pl-3.5 pr-5 py-2.5 bg-dark/90 backdrop-blur-sm text-[#F7F4EF] rounded-full shadow-lg hover:bg-accent transition-colors duration-300"
      >
        <Home size={14} className="text-accent group-hover:text-white transition-colors" />
        <span className="font-body text-xs font-[500]">{t('hww.backHome', lang)}</span>
      </Link>
    </motion.div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

function HowWeWorkContent() {
  const shouldReduceMotion = useReducedMotion()
  const { lang } = useLanguage()
  const stepsRef = useRef<HTMLDivElement>(null)
  const stepsInView = useInView(stepsRef as React.RefObject<Element>, { once: true, margin: '-60px' })

  return (
    <div className="min-h-screen bg-bg">
      <FloatingHomeButton />
      <PageHeader />

      {/* Hero */}
      <section className="pt-[72px]">
        <div className="container-wide py-20 md:py-28 lg:py-36">
          <motion.div
            className="max-w-2xl"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-body text-sm text-text-secondary hover:text-accent transition-colors mb-8 md:hidden"
            >
              <ArrowLeft size={14} />
              {t('hww.backHome', lang)}
            </Link>
            <p className="section-label mb-4">{t('hww.label', lang)}</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-[300] text-text-primary leading-[1.1] mb-5">
              {t('hww.heading', lang)}
            </h1>
            <p className="font-display text-lg md:text-xl lg:text-2xl font-[300] text-accent leading-snug mb-6">
              {t('hww.subheading', lang)}
            </p>
            <p className="font-body text-sm md:text-base text-text-secondary leading-relaxed max-w-xl">
              {t('hww.intro', lang)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="pb-0">
        <div className="container-wide pb-20 md:pb-32">
          <motion.div
            ref={stepsRef}
            className="max-w-2xl ml-0 md:ml-16 lg:ml-24"
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial="hidden"
            animate={stepsInView ? 'visible' : 'hidden'}
          >
            {steps.map((step) => (
              <StepItem key={step.number} step={step} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Social Media Clarity Block */}
      <SocialMediaBlock />

      {/* Closing + CTA */}
      <section className="section-dark">
        <div className="container-wide py-20 md:py-28 lg:py-36">
          <motion.div
            className="text-center max-w-xl mx-auto"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-body text-base md:text-lg text-[#9C9790] leading-relaxed mb-10">
              {t('hww.closing', lang)}
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 font-body font-[500] text-sm md:text-base bg-accent text-white rounded-sm hover:bg-[#A33D20] transition-colors duration-250"
            >
              {t('hww.cta.button', lang)}
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function HowWeWorkPage() {
  return (
    <ScrollProvider>
      <HowWeWorkContent />
    </ScrollProvider>
  )
}
