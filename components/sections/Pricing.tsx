// ── components/sections/Pricing.tsx — Offer Section ──
'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { useScrollContext } from '@/context/ScrollContext'
import { useLanguage } from '@/context/LanguageContext'
import { t, type Language, type TranslationKey } from '@/lib/translations'

interface TierDef {
  id: string
  nameKey: TranslationKey
  price: string
  priceNoteKey: TranslationKey
  featureKeys: TranslationKey[]
  ctaKey: TranslationKey
  highlighted?: boolean
  noteKey?: TranslationKey
}

const tiers: TierDef[] = [
  {
    id: 'launch',
    nameKey: 'pricing.launch',
    price: '€550',
    priceNoteKey: 'pricing.oneTime',
    featureKeys: [
      'pricing.launch.f1', 'pricing.launch.f2', 'pricing.launch.f3', 'pricing.launch.f4',
      'pricing.launch.f5', 'pricing.launch.f6', 'pricing.launch.f7', 'pricing.launch.f8',
    ],
    ctaKey: 'pricing.getPreview',
  },
  {
    id: 'advanced',
    nameKey: 'pricing.advanced',
    price: '€950',
    priceNoteKey: 'pricing.oneTime',
    featureKeys: [
      'pricing.advanced.f1', 'pricing.advanced.f2', 'pricing.advanced.f3', 'pricing.advanced.f4',
      'pricing.advanced.f5', 'pricing.advanced.f6', 'pricing.advanced.f7', 'pricing.advanced.f8',
    ],
    ctaKey: 'pricing.getPreview',
  },
  {
    id: 'growth',
    nameKey: 'pricing.growth',
    price: '€550 + €199/mo',
    priceNoteKey: 'pricing.ongoingManagement',
    featureKeys: [
      'pricing.growth.f1', 'pricing.growth.f2', 'pricing.growth.f3',
      'pricing.growth.f4', 'pricing.growth.f5', 'pricing.growth.f6',
    ],
    highlighted: true,
    ctaKey: 'pricing.startGrowing',
    noteKey: 'pricing.growth.note',
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const cardVariants: Variants = {
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

function PricingCard({ tier, lang }: { tier: TierDef; lang: Language }) {
  const shouldReduceMotion = useReducedMotion()
  const { scrollToSection } = useScrollContext()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    scrollToSection(3)
  }

  return (
    <motion.div
      className={cn(
        'relative flex flex-col rounded-md overflow-hidden',
        tier.highlighted
          ? 'bg-dark border border-accent/30 shadow-accent'
          : 'bg-bg border border-border'
      )}
      variants={cardVariants}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              y: -6,
              boxShadow: tier.highlighted
                ? '0 12px 48px rgba(196, 82, 42, 0.2)'
                : '0 8px 32px rgba(26, 26, 24, 0.1)',
            }
      }
      transition={{ duration: 0.25, ease: 'easeOut' }}
      data-cursor-hover
    >
      {tier.highlighted && (
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent" />
      )}

      <div
        className={cn(
          'px-6 pt-7 pb-5 border-b',
          tier.highlighted ? 'border-[#333330]' : 'border-border'
        )}
      >
        {tier.highlighted && (
          <span className="inline-flex items-center px-2.5 py-1 rounded-sm bg-accent/15 text-accent font-body text-xs font-[500] mb-4">
            {t('pricing.recommended', lang)}
          </span>
        )}
        <h3
          className={cn(
            'font-display text-2xl font-[300] leading-tight mb-3',
            tier.highlighted ? 'text-[#F7F4EF]' : 'text-text-primary'
          )}
        >
          {t(tier.nameKey, lang)}
        </h3>
        <div className="flex items-baseline gap-2">
          <span
            className={cn(
              'font-display text-3xl font-[500]',
              tier.highlighted ? 'text-[#F7F4EF]' : 'text-text-primary'
            )}
          >
            {tier.price}
          </span>
          <span
            className={cn(
              'font-body text-xs',
              tier.highlighted ? 'text-[#9C9790]' : 'text-text-secondary'
            )}
          >
            {t(tier.priceNoteKey, lang)}
          </span>
        </div>
        {tier.noteKey && (
          <p className="font-body text-xs text-text-secondary mt-2">
            {t(tier.noteKey, lang)}
          </p>
        )}
      </div>

      <div className="flex flex-col flex-1 px-6 py-5">
        <ul className="flex flex-col gap-2.5 flex-1">
          {tier.featureKeys.map((fk) => (
            <li key={fk} className="flex items-start gap-2.5">
              <Check
                size={14}
                className="mt-0.5 flex-shrink-0 text-accent"
              />
              <span
                className={cn(
                  'font-body text-sm leading-snug',
                  tier.highlighted ? 'text-[#C9C4BC]' : 'text-text-secondary'
                )}
              >
                {t(fk, lang)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <a
            href="#contact"
            onClick={handleClick}
            className={cn(
              'flex items-center justify-center w-full py-3 rounded-sm font-body text-sm font-[500] transition-colors duration-250',
              tier.highlighted
                ? 'bg-accent text-white hover:bg-accent-dark'
                : 'border border-border text-text-primary hover:border-accent hover:text-accent'
            )}
          >
            {t(tier.ctaKey, lang)}
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Offer() {
  const shouldReduceMotion = useReducedMotion()
  const { scrollToSection } = useScrollContext()
  const { lang } = useLanguage()
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: false, margin: '-80px' })

  return (
    <section
      ref={ref}
      className="section-py bg-surface"
      aria-label="Pricing"
    >
      <div className="container-wide">
        <SectionWrapper className="mb-14 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="section-label mb-4">{t('pricing.label', lang)}</p>
              <h2 className="font-display text-4xl md:text-5xl font-[300] text-text-primary leading-tight">
                {t('pricing.heading', lang)}
              </h2>
            </div>
            <p className="font-body text-sm text-text-secondary max-w-[300px] leading-relaxed">
              {t('pricing.subtitle', lang)}
            </p>
          </div>
        </SectionWrapper>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4"
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {tiers.map((tier) => (
            <PricingCard key={tier.id} tier={tier} lang={lang} />
          ))}
        </motion.div>

        <SectionWrapper className="mt-10 text-center">
          <p className="font-body text-sm text-text-secondary">
            {t('pricing.vatNote', lang)}{' '}
            <a
              href="#contact"
              className="text-accent hover:underline"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(3)
              }}
            >
              {t('pricing.questions', lang)}
            </a>
          </p>
        </SectionWrapper>

        <SectionWrapper className="mt-6">
          <div className="mx-auto max-w-xl rounded-md border border-accent/15 bg-accent/[0.04] px-6 py-5 text-center">
            <p className="font-body text-sm text-text-secondary leading-relaxed">
              <span className="font-[500] text-text-primary">{t('pricing.contentTitle', lang)}</span>{' '}
              {t('pricing.contentText', lang)}{' '}
              <a
                href="#contact"
                className="text-accent hover:underline"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(3)
                }}
              >
                {t('pricing.contentCta', lang)}
              </a>
            </p>
          </div>
        </SectionWrapper>
      </div>
    </section>
  )
}
