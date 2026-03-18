// ── components/sections/About.tsx ──
'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'
import SectionWrapper from '@/components/ui/SectionWrapper'

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

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

function GeometricPhotoPlaceholder() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden bg-surface border border-border">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(145deg, var(--color-surface) 0%, var(--color-bg) 100%)',
        }}
      />

      {/* Geometric composition */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Large circle — background */}
        <circle cx="320" cy="60" r="140" fill="rgba(196,82,42,0.04)" />

        {/* Grid lines */}
        <line x1="0" y1="100" x2="400" y2="100" stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="0" y1="200" x2="400" y2="200" stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="133" y1="0" x2="133" y2="300" stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="267" y1="0" x2="267" y2="300" stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="4 4" />

        {/* Large rectangle — left block */}
        <rect x="40" y="60" width="110" height="145" rx="2" fill="rgba(196,82,42,0.08)" stroke="rgba(196,82,42,0.2)" strokeWidth="1" />

        {/* Smaller rectangles stacked */}
        <rect x="170" y="80" width="80" height="50" rx="2" fill="rgba(26,26,24,0.06)" />
        <rect x="170" y="142" width="80" height="30" rx="2" fill="rgba(26,26,24,0.04)" />
        <rect x="170" y="184" width="80" height="20" rx="2" fill="rgba(26,26,24,0.03)" />

        {/* Top right block */}
        <rect x="272" y="80" width="90" height="60" rx="2" fill="rgba(196,82,42,0.06)" stroke="rgba(196,82,42,0.15)" strokeWidth="0.75" />

        {/* Bottom right accent squares */}
        <rect x="272" y="155" width="42" height="42" rx="2" fill="var(--color-accent)" opacity="0.15" />
        <rect x="320" y="155" width="42" height="42" rx="2" fill="var(--color-border)" opacity="0.6" />
        <rect x="272" y="203" width="42" height="22" rx="2" fill="var(--color-border)" opacity="0.4" />
        <rect x="320" y="203" width="42" height="22" rx="2" fill="rgba(196,82,42,0.1)" />

        {/* Studio name text */}
        <text
          x="95"
          y="138"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="13"
          fill="rgba(196,82,42,0.6)"
          fontStyle="italic"
        >
          Day One
        </text>
        <text
          x="95"
          y="155"
          textAnchor="middle"
          fontFamily="system-ui, sans-serif"
          fontSize="7"
          fill="rgba(26,26,24,0.3)"
          letterSpacing="2"
        >
          STUDIO · CYPRUS
        </text>

        {/* Dot accent */}
        <circle cx="40" cy="60" r="4" fill="var(--color-accent)" opacity="0.5" />
        <circle cx="150" cy="60" r="3" fill="var(--color-border)" />
        <circle cx="150" cy="205" r="3" fill="var(--color-accent)" opacity="0.3" />
      </svg>

      {/* Corner label */}
      <div className="absolute bottom-4 left-4">
        <p className="font-body text-xs text-text-secondary/50 tracking-label">
          TEAM PHOTO · COMING SOON
        </p>
      </div>
    </div>
  )
}

export default function About() {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: false, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="about"
      className="section-py bg-bg"
      aria-label="About Day One"
    >
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Text column */}
          <motion.div
            variants={shouldReduceMotion ? undefined : containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.p
              className="section-label mb-6"
              variants={shouldReduceMotion ? undefined : itemVariants}
            >
              About us
            </motion.p>

            <motion.h2
              className="font-display text-4xl md:text-5xl font-[400] text-text-primary leading-tight mb-8"
              variants={shouldReduceMotion ? undefined : itemVariants}
            >
              A small studio that does the work properly
            </motion.h2>

            <motion.div
              className="flex flex-col gap-5"
              variants={shouldReduceMotion ? undefined : itemVariants}
            >
              <p className="font-body text-base text-text-secondary leading-relaxed">
                Day One is a small studio in Cyprus. We work with a small number of clients at a time so every project gets proper attention.
              </p>
              <p className="font-body text-base text-text-secondary leading-relaxed">
                We prefer short calls and early drafts over long documents. Most of our projects start from something half-built — a Wix site, a logo file, a few screenshots of what you like. That&apos;s usually enough to get started.
              </p>
            </motion.div>

            {/* Key facts */}
            <motion.div
              className="mt-10 grid grid-cols-2 gap-6 pt-10 border-t border-border"
              variants={shouldReduceMotion ? undefined : itemVariants}
            >
              <div>
                <p className="font-display text-3xl font-[600] text-text-primary">Cyprus</p>
                <p className="font-body text-sm text-text-secondary mt-1">Based in Limassol</p>
              </div>
              <div>
                <p className="font-display text-3xl font-[600] text-text-primary">Remote-first</p>
                <p className="font-body text-sm text-text-secondary mt-1">Work with clients across EU</p>
              </div>
              <div>
                <p className="font-display text-3xl font-[600] text-text-primary">~2 weeks</p>
                <p className="font-body text-sm text-text-secondary mt-1">Average delivery time</p>
              </div>
              <div>
                <p className="font-display text-3xl font-[600] text-accent">WhatsApp</p>
                <p className="font-body text-sm text-text-secondary mt-1">Always reachable</p>
              </div>
            </motion.div>

            {/* Contact nudge */}
            <motion.div
              className="mt-8"
              variants={shouldReduceMotion ? undefined : itemVariants}
            >
              <a
                href="https://wa.me/35796254148"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-sm font-[500] text-accent hover:gap-3 transition-all duration-200"
              >
                Message us on WhatsApp
                <span aria-hidden="true">→</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Photo placeholder column — outer div handles sticky (no transform), inner SectionWrapper animates */}
          <div className="lg:sticky lg:top-24">
            <SectionWrapper>
              <GeometricPhotoPlaceholder />

              {/* Caption */}
              <p className="font-body text-xs text-text-secondary/60 mt-3 italic">
                Day One studio — Cyprus
              </p>
            </SectionWrapper>
          </div>
        </div>
      </div>
    </section>
  )
}
