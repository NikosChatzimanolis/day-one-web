// ── components/sections/HowItWorks.tsx — Process Section ──
'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'
import Link from 'next/link'
import type { ProcessStep } from '@/types'
import SectionWrapper from '@/components/ui/SectionWrapper'
import { useScrollContext } from '@/context/ScrollContext'

const steps: ProcessStep[] = [
  {
    number: '01',
    title: 'Understand & Position',
    description:
      'We quickly understand your business, your customers, and what actually drives results. Then we define how your website should convert visitors into calls, bookings, or messages — not just exist online.',
  },
  {
    number: '02',
    title: 'Design, Build & Optimise',
    description:
      'We build your full online presence — structure, design, and messaging. Mobile-first, fast, and focused on conversion. Everything is set up to turn visitors into real customers.',
  },
  {
    number: '03',
    title: 'Activate Visibility',
    description:
      'A website alone isn\u2019t enough. We set up your Google presence, structure your visibility, and guide how customers will actually find you. Everything is aligned to bring traffic that converts.',
  },
  {
    number: '04',
    title: 'Ongoing Growth',
    description:
      'We continuously improve your system — updates, content, optimisation, and expansion. Your online presence evolves instead of becoming outdated.',
  },
]

const clientParts = [
  'Your part: a short call',
  'Your part: review and approve',
  'Your part: nothing — we handle it',
  'Your part: optional — for businesses that want to grow',
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
            <p className="section-label text-accent mb-4">How we work</p>
            <h2 className="font-display text-4xl md:text-5xl font-[300] text-[#F7F4EF] leading-tight">
              We build the system — not just the site
            </h2>
            <p className="font-body text-base text-[#9C9790] mt-4 leading-relaxed max-w-md">
              Most studios hand you a website and disappear. We build something that brings customers in — and keep improving it over time.
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
          {steps.map((step, i) => (
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
                    {step.title}
                  </h3>
                </div>

                <p className="font-body text-[0.9375rem] text-[#9C9790] leading-relaxed pl-[calc(3.5rem+1rem)]">
                  {step.description}
                </p>

                <p className="font-body text-xs text-accent/70 mt-3 pl-[calc(3.5rem+1rem)]">
                  {clientParts[i]}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Result statement */}
        <SectionWrapper className="mt-16 md:mt-20 pt-10 border-t border-[#333330]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="font-body text-base text-[#F7F4EF] max-w-md leading-relaxed">
              Your system is built to bring in customers — not just sit online.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 font-body font-[500] text-sm bg-accent text-white rounded-sm hover:bg-accent-dark transition-colors duration-250 flex-shrink-0"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(5)
                }}
              >
                Get started
                <span aria-hidden="true">→</span>
              </a>
              <Link
                href="/how-we-work"
                className="inline-flex items-center gap-2 px-7 py-3.5 font-body font-[500] text-sm border border-[#333330] text-[#F7F4EF] rounded-sm hover:border-accent hover:text-accent transition-colors duration-250 flex-shrink-0"
              >
                See the full process
              </Link>
            </div>
          </div>
        </SectionWrapper>
      </div>
    </section>
  )
}
