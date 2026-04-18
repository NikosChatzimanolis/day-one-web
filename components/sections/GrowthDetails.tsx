// ── components/sections/GrowthDetails.tsx — Expanded Growth positioning ──
'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'
import { Check } from 'lucide-react'
import { useScrollContext } from '@/context/ScrollContext'
import { useLanguage } from '@/context/LanguageContext'
import { t, type Language, type TranslationKey } from '@/lib/translations'

interface FeatureGroup {
  headingKey: TranslationKey
  outcomeKey: TranslationKey
  bulletKeys: TranslationKey[]
}

const groups: FeatureGroup[] = [
  {
    headingKey: 'growthDetails.g1.heading',
    outcomeKey: 'growthDetails.g1.outcome',
    bulletKeys: [
      'growthDetails.g1.s1',
      'growthDetails.g1.s2',
      'growthDetails.g1.s3',
      'growthDetails.g1.s4',
      'growthDetails.g1.s5',
    ],
  },
  {
    headingKey: 'growthDetails.g2.heading',
    outcomeKey: 'growthDetails.g2.outcome',
    bulletKeys: [
      'growthDetails.g2.s1',
      'growthDetails.g2.s2',
      'growthDetails.g2.s3',
      'growthDetails.g2.s4',
    ],
  },
  {
    headingKey: 'growthDetails.g3.heading',
    outcomeKey: 'growthDetails.g3.outcome',
    bulletKeys: [
      'growthDetails.g3.s1',
      'growthDetails.g3.s2',
      'growthDetails.g3.s3',
      'growthDetails.g3.s4',
    ],
  },
  {
    headingKey: 'growthDetails.g4.heading',
    outcomeKey: 'growthDetails.g4.outcome',
    bulletKeys: [
      'growthDetails.g4.s1',
      'growthDetails.g4.s2',
      'growthDetails.g4.s3',
      'growthDetails.g4.s4',
    ],
  },
  {
    headingKey: 'growthDetails.g5.heading',
    outcomeKey: 'growthDetails.g5.outcome',
    bulletKeys: [
      'growthDetails.g5.s1',
      'growthDetails.g5.s2',
      'growthDetails.g5.s3',
      'growthDetails.g5.s4',
    ],
  },
]

const groupVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
}

const staggerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

function GroupBlock({ group, lang }: { group: FeatureGroup; lang: Language }) {
  return (
    <motion.div
      className="flex flex-col gap-3 border-t border-border pt-8 md:pt-10"
      variants={groupVariants}
    >
      <h3 className="font-display text-2xl md:text-3xl font-[400] text-text-primary leading-tight">
        {t(group.headingKey, lang)}
      </h3>
      <p className="font-body text-base md:text-lg text-text-primary/90 leading-relaxed max-w-3xl">
        {t(group.outcomeKey, lang)}
      </p>
      <ul className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 max-w-3xl">
        {group.bulletKeys.map((bk) => (
          <li key={bk} className="flex items-start gap-2.5">
            <Check size={14} className="mt-1 flex-shrink-0 text-accent" />
            <span className="font-body text-sm text-text-secondary leading-snug">
              {t(bk, lang)}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function GrowthDetails() {
  const { lang } = useLanguage()
  const { scrollToSection } = useScrollContext()
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, {
    once: false,
    margin: '-120px',
  })

  const handleCta = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollToSection(3)
  }

  return (
    <div
      id="growth-details"
      ref={ref}
      aria-label="Growth — your marketing team"
      className="w-full mt-16 md:mt-24 scroll-mt-24"
    >
      <div className="bg-bg border-t border-border">
        <div className="container-wide py-16 md:py-24">
          <motion.div
            className="flex flex-col gap-6 max-w-3xl mb-12 md:mb-16"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display text-3xl md:text-5xl font-[400] text-text-primary leading-tight">
              {t('growthDetails.heading', lang)}
            </h2>
            <p className="font-body text-lg md:text-xl text-accent font-[500] leading-snug">
              {t('growthDetails.subheading', lang)}
            </p>
            <p className="font-body text-base md:text-lg text-text-secondary leading-relaxed">
              {t('growthDetails.description', lang)}
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col gap-8 md:gap-10"
            variants={shouldReduceMotion ? undefined : staggerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {groups.map((group) => (
              <GroupBlock key={group.headingKey} group={group} lang={lang} />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="bg-accent">
        <div className="container-wide py-16 md:py-24 text-center">
          <motion.p
            className="font-display text-2xl md:text-4xl font-[400] text-white leading-snug max-w-3xl mx-auto"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('growthDetails.closing', lang)}
          </motion.p>
          <motion.div
            className="mt-10"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#contact"
              onClick={handleCta}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-accent font-body font-[500] text-sm rounded-sm hover:bg-bg transition-colors duration-250"
              data-cursor-hover
            >
              {t('growthDetails.cta', lang)}
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
