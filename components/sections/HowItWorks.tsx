// ── components/sections/HowItWorks.tsx ──
'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'
import type { ProcessStep } from '@/types'
import SectionWrapper from '@/components/ui/SectionWrapper'

const steps: ProcessStep[] = [
  {
    number: '01',
    title: 'Free mockup',
    description:
      'Tell us about your business. We put together a visual preview and send it before you decide anything.',
  },
  {
    number: '02',
    title: 'Build together',
    description:
      'Short calls, real drafts, fast feedback. You see work in progress from day one.',
  },
  {
    number: '03',
    title: 'Launch & stay ready',
    description:
      'We launch your site and stay reachable on WhatsApp and email for updates and support.',
  },
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

export default function HowItWorks() {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: false, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="how-it-works"
      className="section-py section-dark"
      aria-label="How it works"
    >
      <div className="container-wide">
        {/* Section header */}
        <SectionWrapper className="mb-16 md:mb-20">
          <div className="max-w-xl">
            <p className="section-label text-accent mb-4">How it works</p>
            <h2 className="font-display text-4xl md:text-5xl font-[400] text-[#F7F4EF] leading-tight">
              From first message to live site
            </h2>
          </div>
        </SectionWrapper>

        {/* Steps */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0"
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
              {/* Connector line between steps (desktop) */}
              {i < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-8 left-[calc(100%-0px)] w-full h-px"
                  style={{
                    background: 'linear-gradient(90deg, rgba(196,82,42,0.4) 0%, rgba(196,82,42,0.1) 100%)',
                    width: 'calc(100% - 2rem)',
                    left: 'calc(2rem + 32px)',
                    zIndex: 0,
                  }}
                  aria-hidden="true"
                />
              )}

              <div className="relative z-10 md:pr-12">
                {/* Step number */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-sm border border-[#333330] flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-2xl font-[600] text-accent leading-none">
                      {step.number}
                    </span>
                  </div>
                  <div
                    className="flex-1 h-px"
                    style={{ background: 'var(--color-dark-border)' }}
                    aria-hidden="true"
                  />
                </div>

                <h3 className="font-display text-2xl md:text-3xl font-[400] text-[#F7F4EF] mb-3 leading-tight">
                  {step.title}
                </h3>
                <p className="font-body text-[0.9375rem] text-[#9C9790] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA at bottom */}
        <SectionWrapper className="mt-16 md:mt-20 pt-10 border-t border-[#333330]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="font-body text-base text-[#9C9790] max-w-sm leading-relaxed">
              Most projects start with a 20-minute call and a screenshot of what you like.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 font-body font-[500] text-sm bg-accent text-white rounded-sm hover:bg-accent-dark transition-colors duration-250 flex-shrink-0"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Get a free mockup
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </SectionWrapper>
      </div>
    </section>
  )
}
