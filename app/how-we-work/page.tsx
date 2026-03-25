// ── app/how-we-work/page.tsx — Step-by-step walkthrough ──
'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion'
import { ArrowRight, MessageSquare, Palette, Globe, TrendingUp, ArrowLeft, Home } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/context/LanguageContext'
import { t, languages, type TranslationKey } from '@/lib/translations'
import Logo from '@/components/ui/Logo'
import Footer from '@/components/layout/Footer'
import ScrollProvider from '@/context/ScrollContext'

// ─── Data ────────────────────────────────────────────────────────────────────

const steps = [
  {
    number: '01',
    titleKey: 'hww.step1.title' as TranslationKey,
    subtitleKey: 'hww.step1.subtitle' as TranslationKey,
    descriptionKey: 'hww.step1.description' as TranslationKey,
    detailKeys: ['hww.step1.d1', 'hww.step1.d2', 'hww.step1.d3', 'hww.step1.d4'] as TranslationKey[],
    icon: MessageSquare,
    durationKey: 'hww.step1.duration' as TranslationKey,
  },
  {
    number: '02',
    titleKey: 'hww.step2.title' as TranslationKey,
    subtitleKey: 'hww.step2.subtitle' as TranslationKey,
    descriptionKey: 'hww.step2.description' as TranslationKey,
    detailKeys: ['hww.step2.d1', 'hww.step2.d2', 'hww.step2.d3', 'hww.step2.d4', 'hww.step2.d5'] as TranslationKey[],
    icon: Palette,
    durationKey: 'hww.step2.duration' as TranslationKey,
  },
  {
    number: '03',
    titleKey: 'hww.step3.title' as TranslationKey,
    subtitleKey: 'hww.step3.subtitle' as TranslationKey,
    descriptionKey: 'hww.step3.description' as TranslationKey,
    detailKeys: ['hww.step3.d1', 'hww.step3.d2', 'hww.step3.d3', 'hww.step3.d4', 'hww.step3.d5'] as TranslationKey[],
    icon: Globe,
    durationKey: 'hww.step3.duration' as TranslationKey,
  },
  {
    number: '04',
    titleKey: 'hww.step4.title' as TranslationKey,
    subtitleKey: 'hww.step4.subtitle' as TranslationKey,
    descriptionKey: 'hww.step4.description' as TranslationKey,
    detailKeys: ['hww.step4.d1', 'hww.step4.d2', 'hww.step4.d3', 'hww.step4.d4', 'hww.step4.d5'] as TranslationKey[],
    icon: TrendingUp,
    durationKey: 'hww.step4.duration' as TranslationKey,
  },
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
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const detailItem: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
}

// ─── Step component ──────────────────────────────────────────────────────────

function StepSection({ step, index }: { step: typeof steps[0]; index: number }) {
  const shouldReduceMotion = useReducedMotion()
  const { lang } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-100px' })
  const isEven = index % 2 === 0

  const Icon = step.icon

  return (
    <div ref={ref} className="relative">
      <motion.div
        className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center`}
        variants={shouldReduceMotion ? undefined : fadeUp}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Visual side */}
        <div className="flex-1 w-full">
          <motion.div
            className="relative bg-bg border border-border rounded-md p-8 md:p-10 overflow-hidden"
            whileHover={shouldReduceMotion ? {} : { y: -4, boxShadow: '0 12px 40px rgba(26, 26, 24, 0.08)' }}
            transition={{ duration: 0.3 }}
          >
            {/* Step number watermark — hidden on mobile to avoid overlapping text */}
            <span className="absolute -top-2 -right-2 font-display text-[5rem] md:text-[8rem] font-[200] text-accent/[0.04] leading-none select-none pointer-events-none hidden md:block">
              {step.number}
            </span>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-md bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={24} className="text-accent" />
                </div>
                <div>
                  <span className="font-body text-xs font-[500] text-accent uppercase tracking-wider">
                    {t('hww.step', lang)} {step.number}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-[300] text-text-primary leading-tight">
                    {t(step.titleKey, lang)}
                  </h3>
                </div>
              </div>

              <p className="font-body text-sm text-text-secondary leading-relaxed mb-6">
                {t(step.descriptionKey, lang)}
              </p>

              <div className="flex items-center gap-3 px-4 py-2.5 rounded-sm bg-accent/[0.06] border border-accent/10">
                <span className="font-body text-xs text-accent font-[500]">{t(step.subtitleKey, lang)}</span>
                <span className="ml-auto font-body text-xs text-text-secondary/60">{t(step.durationKey, lang)}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Details side */}
        <div className="flex-1 w-full">
          <motion.ul
            className="flex flex-col gap-4"
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {step.detailKeys.map((dk, i) => (
              <motion.li
                key={dk}
                className="flex items-start gap-3"
                variants={shouldReduceMotion ? undefined : detailItem}
              >
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="font-body text-xs font-[600] text-accent">{i + 1}</span>
                </div>
                <p className="font-body text-sm text-text-secondary leading-relaxed">
                  {t(dk, lang)}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </div>
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
              {t('hww.cta.preview', lang)}
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
  return (
    <div className="min-h-screen bg-bg">
      <FloatingHomeButton />
      <PageHeader />

      {/* Hero */}
      <section className="pt-[72px]">
        <div className="container-wide py-20 md:py-28">
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
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-[300] text-text-primary leading-[1.1] mb-6">
              {t('hww.heading', lang)}
            </h1>
            <p className="font-body text-base md:text-lg text-text-secondary leading-relaxed max-w-lg">
              {t('hww.description', lang)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="relative pb-20 md:pb-32">
        <div className="container-wide">
          <div className="flex flex-col gap-24 md:gap-32 relative">
            {steps.map((step, i) => (
              <StepSection key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-dark">
        <div className="container-wide py-20 md:py-28">
          <motion.div
            className="text-center max-w-xl mx-auto"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-[300] text-[#F7F4EF] leading-tight mb-5">
              {t('hww.cta.heading', lang)}
            </h2>
            <p className="font-body text-base text-[#9C9790] leading-relaxed mb-8">
              {t('hww.cta.description', lang)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-body font-[500] text-sm bg-accent text-white rounded-sm hover:bg-accent-dark transition-colors duration-250"
              >
                {t('hww.cta.preview', lang)}
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/35796254148"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-body font-[500] text-sm border border-[#333330] text-[#F7F4EF] rounded-sm hover:border-accent hover:text-accent transition-colors duration-250"
              >
                <MessageSquare size={16} />
                {t('hww.cta.whatsapp', lang)}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Shared Footer */}
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
