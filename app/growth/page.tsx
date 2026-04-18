// ── app/growth/page.tsx — Growth standalone page (your marketing team) ──
'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion'
import { ArrowRight, ArrowLeft, Home, Check } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/context/LanguageContext'
import { t, languages, type Language, type TranslationKey } from '@/lib/translations'
import Logo from '@/components/ui/Logo'
import Footer from '@/components/layout/Footer'
import ScrollProvider from '@/context/ScrollContext'
import { JsonLd } from '../jsonld'

// ─── Data ────────────────────────────────────────────────────────────────────

interface FeatureGroup {
  number: string
  headingKey: TranslationKey
  outcomeKey: TranslationKey
  bulletKeys: TranslationKey[]
}

const groups: FeatureGroup[] = [
  {
    number: '01',
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
    number: '02',
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
    number: '03',
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
    number: '04',
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
    number: '05',
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

// ─── Animation variants ──────────────────────────────────────────────────────

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

// ─── Group component ─────────────────────────────────────────────────────────

function GroupItem({ group, lang }: { group: FeatureGroup; lang: Language }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="group relative grid grid-cols-[auto_1fr] gap-6 md:gap-10"
      variants={shouldReduceMotion ? undefined : staggerItem}
    >
      {/* Group number */}
      <div className="flex flex-col items-center">
        <span className="font-display text-4xl md:text-5xl lg:text-6xl font-[300] text-accent leading-none select-none">
          {group.number}
        </span>
        {/* Timeline connector */}
        <div className="w-px flex-1 bg-border mt-4 group-last:hidden" />
      </div>

      {/* Content */}
      <div className="pb-14 md:pb-20 group-last:pb-0">
        <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-[300] text-text-primary leading-tight mb-3">
          {t(group.headingKey, lang)}
        </h3>
        <p className="font-body text-base md:text-lg text-text-primary/90 leading-relaxed max-w-xl mb-5">
          {t(group.outcomeKey, lang)}
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 max-w-2xl">
          {group.bulletKeys.map((bk) => (
            <li key={bk} className="flex items-start gap-2.5">
              <Check size={14} className="mt-1 flex-shrink-0 text-accent" />
              <span className="font-body text-sm text-text-secondary leading-snug">
                {t(bk, lang)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
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
              {t('growthDetails.cta', lang)}
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

function GrowthContent() {
  const shouldReduceMotion = useReducedMotion()
  const { lang } = useLanguage()
  const groupsRef = useRef<HTMLDivElement>(null)
  const groupsInView = useInView(groupsRef as React.RefObject<Element>, { once: true, margin: '-60px' })

  return (
    <div className="min-h-screen bg-bg">
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Growth — Marketing Team Service',
        serviceType: 'Marketing Team Service',
        url: 'https://dayone-web.com/growth',
        description:
          "Day One Growth is your marketing team. We build your website, run your Google presence, manage your social, track what's working, and improve every month.",
        provider: {
          '@type': 'ProfessionalService',
          name: 'Day One Web Studio',
          url: 'https://dayone-web.com',
        },
        areaServed: [
          { '@type': 'Country', name: 'Cyprus' },
          { '@type': 'Country', name: 'Greece' },
        ],
        offers: {
          '@type': 'Offer',
          priceCurrency: 'EUR',
          price: '350',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '350',
            priceCurrency: 'EUR',
            unitText: 'MONTH',
          },
        },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://dayone-web.com',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Growth',
              item: 'https://dayone-web.com/growth',
            },
          ],
        },
      }} />
      <FloatingHomeButton />
      <PageHeader />

      {/* Hero */}
      <section className="pt-[72px]">
        <div className="container-wide py-20 md:py-28 lg:py-36">
          <motion.div
            className="max-w-3xl"
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
            <p className="section-label mb-4">{t('pricing.growth', lang)}</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-[300] text-text-primary leading-[1.1] mb-5">
              {t('growthDetails.heading', lang)}
            </h1>
            <p className="font-display text-lg md:text-xl lg:text-2xl font-[400] text-accent leading-snug mb-6">
              {t('growthDetails.subheading', lang)}
            </p>
            <p className="font-body text-sm md:text-base text-text-secondary leading-relaxed max-w-2xl mb-10">
              {t('growthDetails.description', lang)}
            </p>

            {/* Price + primary CTA */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 font-body font-[500] text-sm bg-accent text-white rounded-sm hover:bg-accent-dark transition-colors duration-250"
              >
                {t('growthDetails.cta', lang)}
                <ArrowRight size={14} />
              </Link>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-[500] text-text-primary leading-none">
                  €350<span className="font-body text-sm font-[400] text-text-secondary">/mo</span>
                </span>
                <span className="font-body text-xs text-text-secondary mt-1">
                  {t('pricing.growth.setup', lang)} · {t('pricing.growth.minimum', lang)}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature groups */}
      <section className="pb-0">
        <div className="container-wide pb-20 md:pb-32">
          <motion.div
            ref={groupsRef}
            className="max-w-3xl ml-0 md:ml-16 lg:ml-24"
            variants={shouldReduceMotion ? undefined : staggerContainer}
            initial="hidden"
            animate={groupsInView ? 'visible' : 'hidden'}
          >
            {groups.map((group) => (
              <GroupItem key={group.number} group={group} lang={lang} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Closing — accent background, single statement */}
      <section className="bg-accent">
        <div className="container-wide py-20 md:py-28 lg:py-36 text-center">
          <motion.p
            className="font-display text-2xl md:text-4xl lg:text-5xl font-[400] text-white leading-snug max-w-4xl mx-auto"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('growthDetails.closing', lang)}
          </motion.p>
          <motion.div
            className="mt-10 md:mt-14"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 font-body font-[500] text-sm md:text-base bg-white text-accent rounded-sm hover:bg-bg transition-colors duration-250"
            >
              {t('growthDetails.cta', lang)}
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function GrowthPage() {
  return (
    <ScrollProvider>
      <GrowthContent />
    </ScrollProvider>
  )
}
