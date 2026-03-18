// ── components/sections/Testimonials.tsx ──
'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'
import type { Testimonial } from '@/types'
import SectionWrapper from '@/components/ui/SectionWrapper'

const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: '[CLIENT QUOTE — Replace with real testimonial. This space is designed and ready for your words.]',
    clientName: '[CLIENT NAME]',
    clientRole: '[Role]',
    clientCompany: '[Company]',
  },
  {
    id: '2',
    quote: '[CLIENT QUOTE — Replace with real testimonial. The card layout, spacing, and typography are already set.]',
    clientName: '[CLIENT NAME]',
    clientRole: '[Role]',
    clientCompany: '[Company]',
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.article
      className="relative flex flex-col justify-between p-8 md:p-10 bg-surface border border-border rounded-md overflow-hidden"
      variants={cardVariants}
    >
      {/* Large decorative quote mark */}
      <div
        className="absolute top-6 right-8 font-display text-[7rem] leading-none text-border select-none pointer-events-none"
        aria-hidden="true"
        style={{ lineHeight: 0.8 }}
      >
        &ldquo;
      </div>

      {/* Quote */}
      <div className="relative z-10 mb-8">
        <p className="font-display text-xl md:text-2xl font-[400] text-text-primary leading-relaxed italic">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      {/* Client info */}
      <div className="relative z-10 flex items-center gap-4 pt-6 border-t border-border">
        {/* Avatar placeholder */}
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-border to-surface border border-border flex items-center justify-center flex-shrink-0">
          <span className="font-body text-xs text-text-secondary font-[500] select-none">
            {testimonial.clientName.replace('[', '').slice(0, 2).toUpperCase()}
          </span>
        </div>

        <div>
          <p className="font-body text-sm font-[500] text-text-primary">{testimonial.clientName}</p>
          <p className="font-body text-xs text-text-secondary mt-0.5">
            {testimonial.clientRole}, {testimonial.clientCompany}
          </p>
        </div>

        {/* Star rating */}
        <div className="ml-auto flex gap-0.5" aria-label="5 stars">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="var(--color-accent)"
              aria-hidden="true"
            >
              <path d="M6 0.5l1.545 3.13 3.455.502-2.5 2.437.59 3.44L6 8.317 2.91 9.995l.59-3.44L1 4.132l3.455-.502L6 .5z" />
            </svg>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

export default function Testimonials() {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: false, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="testimonials"
      className="section-py bg-bg"
      aria-label="Testimonials"
    >
      <div className="container-wide">
        {/* Section header */}
        <SectionWrapper className="mb-14 md:mb-16">
          <div className="max-w-lg">
            <p className="section-label mb-4">What clients say</p>
            <h2 className="font-display text-4xl md:text-5xl font-[400] text-text-primary leading-tight">
              From the people we&apos;ve worked with
            </h2>
          </div>
        </SectionWrapper>

        {/* Testimonial cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </motion.div>

        {/* Placeholder note — styled tastefully */}
        <SectionWrapper className="mt-8 text-center">
          <p className="font-body text-sm text-text-secondary/50 italic">
            Testimonials coming soon — we&apos;re collecting them now.
          </p>
        </SectionWrapper>
      </div>
    </section>
  )
}
