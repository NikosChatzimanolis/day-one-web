// ── components/sections/Pricing.tsx ──
'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PricingTier } from '@/types'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { useScrollContext } from '@/context/ScrollContext'

const tiers: PricingTier[] = [
  {
    id: 'one-page',
    name: 'One-page website',
    price: 'from €350',
    priceNote: 'one-time',
    features: [
      'Mobile-first design',
      '4–6 sections',
      'Contact form',
      'Basic SEO setup',
      'Fast load time',
      'Delivered in ~2 weeks',
    ],
    cta: 'Get started',
  },
  {
    id: 'multi-page',
    name: 'Multi-page website',
    price: 'from €650',
    priceNote: 'one-time',
    features: [
      'Everything in one-page',
      'Multiple pages',
      'CMS option (easy editing)',
      'Advanced SEO',
      'Google Analytics setup',
      'Priority delivery',
    ],
    highlighted: true,
    cta: 'Get started',
  },
  {
    id: 'branding',
    name: 'Branding & social',
    price: 'On request',
    features: [
      'Brand strategy session',
      'Visual identity',
      'Colour & font system',
      'Content planning',
      'Monthly caption writing',
      'Review before posting',
    ],
    cta: 'Let\'s talk',
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

function PricingCard({ tier }: { tier: PricingTier }) {
  const shouldReduceMotion = useReducedMotion()
  const { goTo } = useScrollContext()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    goTo(4)
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

      {/* Card header */}
      <div
        className={cn(
          'px-7 pt-8 pb-6 border-b',
          tier.highlighted ? 'border-[#333330]' : 'border-border'
        )}
      >
        {tier.highlighted && (
          <span className="inline-flex items-center px-2.5 py-1 rounded-sm bg-accent/15 text-accent font-body text-xs font-[500] mb-4">
            Most popular
          </span>
        )}
        <h3
          className={cn(
            'font-display text-2xl font-[400] leading-tight mb-3',
            tier.highlighted ? 'text-[#F7F4EF]' : 'text-text-primary'
          )}
        >
          {tier.name}
        </h3>
        <div className="flex items-baseline gap-2">
          <span
            className={cn(
              'font-display text-4xl font-[600]',
              tier.highlighted ? 'text-[#F7F4EF]' : 'text-text-primary'
            )}
          >
            {tier.price}
          </span>
          {tier.priceNote && (
            <span
              className={cn(
                'font-body text-sm',
                tier.highlighted ? 'text-[#9C9790]' : 'text-text-secondary'
              )}
            >
              {tier.priceNote}
            </span>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="flex flex-col flex-1 px-7 py-6">
        <ul className="flex flex-col gap-3 flex-1">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check
                size={15}
                className={cn(
                  'mt-0.5 flex-shrink-0',
                  tier.highlighted ? 'text-accent' : 'text-accent'
                )}
              />
              <span
                className={cn(
                  'font-body text-sm leading-snug',
                  tier.highlighted ? 'text-[#C9C4BC]' : 'text-text-secondary'
                )}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-8">
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
            {tier.cta}
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Pricing() {
  const shouldReduceMotion = useReducedMotion()
  const { goTo } = useScrollContext()
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: false, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="pricing"
      className="section-py bg-surface"
      aria-label="Pricing"
    >
      <div className="container-wide">
        {/* Section header */}
        <SectionWrapper className="mb-14 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="section-label mb-4">Transparent pricing</p>
              <h2 className="font-display text-4xl md:text-5xl font-[400] text-text-primary leading-tight">
                Simple, honest prices
              </h2>
            </div>
            <p className="font-body text-sm text-text-secondary max-w-[260px] leading-relaxed">
              Most projects are scoped on a free call. No surprises.
            </p>
          </div>
        </SectionWrapper>

        {/* Pricing grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-4"
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {tiers.map((tier) => (
            <PricingCard key={tier.id} tier={tier} />
          ))}
        </motion.div>

        {/* Fine print */}
        <SectionWrapper className="mt-10 text-center">
          <p className="font-body text-sm text-text-secondary">
            All prices exclude VAT where applicable. Hosting and domain costs are separate.{' '}
            <a
              href="#contact"
              className="text-accent hover:underline"
              onClick={(e) => {
                e.preventDefault()
                goTo(4)
              }}
            >
              Questions? Just ask.
            </a>
          </p>
        </SectionWrapper>
      </div>
    </section>
  )
}
