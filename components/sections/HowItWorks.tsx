// ── components/sections/HowItWorks.tsx — Process Section ──
'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'
import Link from 'next/link'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { useScrollContext } from '@/context/ScrollContext'
import { useLanguage } from '@/context/LanguageContext'
import { t, type TranslationKey } from '@/lib/translations'

const stepKeys: { title: TranslationKey; description: TranslationKey; part: TranslationKey; number: string }[] = [
  { number: '01', title: 'process.step1.title', description: 'process.step1.description', part: 'process.step1.part' },
  { number: '02', title: 'process.step2.title', description: 'process.step2.description', part: 'process.step2.part' },
  { number: '03', title: 'process.step3.title', description: 'process.step3.description', part: 'process.step3.part' },
  { number: '04', title: 'process.step4.title', description: 'process.step4.description', part: 'process.step4.part' },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export default function Process() {
  const shouldReduceMotion = useReducedMotion()
  const { scrollToSection } = useScrollContext()
  const { lang } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: false, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="section-py section-dark"
      aria-label="Our process"
    >
      <div className="container-wide">
        {/* Section header */}
        <SectionWrapper className="mb-16 md:mb-20">
          <div className="max-w-xl">
            <p className="section-label text-accent mb-4">{t('process.label', lang)}</p>
            <h2 className="font-display text-4xl md:text-5xl font-[300] text-[#F7F4EF] leading-tight">
              {t('process.heading', lang)}
            </h2>
            <p className="font-body text-base text-[#9C9790] mt-4 leading-relaxed max-w-md">
              {t('process.description', lang)}
            </p>
          </div>
        </SectionWrapper>

        {/* Steps — 2×2 grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-x-12 md:gap-y-14"
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {stepKeys.map((step) => (
            <motion.div
              key={step.number}
              className="relative"
              variants={shouldReduceMotion ? undefined : stepVariants}
            >
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-sm border border-[#333330] flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-xl font-[500] text-accent leading-none">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-[300] text-[#F7F4EF] leading-tight">
                    {t(step.title, lang)}
                  </h3>
                </div>

                <p className="font-body text-[0.9375rem] text-[#9C9790] leading-relaxed pl-[calc(3.5rem+1rem)]">
                  {t(step.description, lang)}
                </p>

                <p className="font-body text-xs text-accent/70 mt-3 pl-[calc(3.5rem+1rem)]">
                  {t(step.part, lang)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Result statement */}
        <SectionWrapper className="mt-16 md:mt-20 pt-10 border-t border-[#333330]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="font-body text-base text-[#F7F4EF] max-w-md leading-relaxed">
              {t('process.result', lang)}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 font-body font-[500] text-sm bg-accent text-white rounded-sm hover:bg-accent-dark transition-colors duration-250 flex-shrink-0"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(3)
                }}
              >
                {t('process.getStarted', lang)}
                <span aria-hidden="true">→</span>
              </a>
              <Link
                href="/how-we-work"
                className="inline-flex items-center gap-2 px-7 py-3.5 font-body font-[500] text-sm border border-[#333330] text-[#F7F4EF] rounded-sm hover:border-accent hover:text-accent transition-colors duration-250 flex-shrink-0"
              >
                {t('process.seeFullProcess', lang)}
              </Link>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </section>
  )
}
