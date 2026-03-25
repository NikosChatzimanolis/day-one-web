// ── app/how-we-work/page.tsx — Step-by-step walkthrough ──
'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion'
import { ArrowRight, MessageSquare, Palette, Globe, TrendingUp, ArrowLeft, Home } from 'lucide-react'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'

// ─── Data ────────────────────────────────────────────────────────────────────

const steps = [
  {
    number: '01',
    title: 'Understand & Position',
    subtitle: 'Your part: a short call',
    description:
      'We start with a quick call to understand your business, your customers, and what actually drives results. Then we define how your website should convert visitors into calls, bookings, or messages — not just exist online.',
    details: [
      'Quick discovery call (15–20 minutes)',
      'We research your market and competitors',
      'Define your conversion strategy',
      'Agree on structure, messaging, and goals',
    ],
    icon: MessageSquare,
    duration: '1–2 days',
  },
  {
    number: '02',
    title: 'Design, Build & Optimise',
    subtitle: 'Your part: review and approve',
    description:
      'We build your full online presence — structure, design, and messaging. Mobile-first, fast, and focused on conversion. Everything is set up to turn visitors into real customers.',
    details: [
      'Custom design — no templates',
      'Mobile-first, fast-loading build',
      'Conversion-focused layout and copy',
      'Contact systems (forms, WhatsApp, calls)',
      'You get a free preview before paying',
    ],
    icon: Palette,
    duration: '3–5 days',
  },
  {
    number: '03',
    title: 'Activate Visibility',
    subtitle: 'Your part: nothing — we handle it',
    description:
      'A website alone isn\'t enough. We set up your Google presence, structure your visibility, and guide how customers will actually find you. Everything is aligned to bring traffic that converts.',
    details: [
      'Google Business profile setup',
      'Basic SEO + structured data',
      'Local visibility optimisation',
      'Analytics and conversion tracking',
    ],
    icon: Globe,
    duration: '1–2 days',
  },
  {
    number: '04',
    title: 'Ongoing Growth',
    subtitle: 'Your part: optional — for businesses that want to grow',
    description:
      'We continuously improve your system — updates, content, optimisation, and expansion. Your online presence evolves instead of becoming outdated.',
    details: [
      'Continuous improvements and optimisation',
      'Content updates handled for you',
      'Performance insights and reporting',
      'Priority support and fast updates',
    ],
    icon: TrendingUp,
    duration: 'Ongoing',
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
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-100px' })
  const isEven = index % 2 === 0

  const Icon = step.icon

  return (
    <div ref={ref} className="relative">
      {/* Connecting line */}
      {index < steps.length - 1 && (
        <div className="absolute left-1/2 -translate-x-px top-full w-0.5 h-24 md:h-32 bg-gradient-to-b from-accent/30 to-transparent" />
      )}

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
            {/* Step number watermark */}
            <span className="absolute -top-2 -right-2 font-display text-[8rem] font-[200] text-accent/[0.04] leading-none select-none pointer-events-none">
              {step.number}
            </span>

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-md bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={24} className="text-accent" />
                </div>
                <div>
                  <span className="font-body text-xs font-[500] text-accent uppercase tracking-wider">
                    Step {step.number}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-[300] text-text-primary leading-tight">
                    {step.title}
                  </h3>
                </div>
              </div>

              <p className="font-body text-sm text-text-secondary leading-relaxed mb-6">
                {step.description}
              </p>

              <div className="flex items-center gap-3 px-4 py-2.5 rounded-sm bg-accent/[0.06] border border-accent/10">
                <span className="font-body text-xs text-accent font-[500]">{step.subtitle}</span>
                <span className="ml-auto font-body text-xs text-text-secondary/60">{step.duration}</span>
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
            {step.details.map((detail, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3"
                variants={shouldReduceMotion ? undefined : detailItem}
              >
                <div className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="font-body text-xs font-[600] text-accent">{i + 1}</span>
                </div>
                <p className="font-body text-sm text-text-secondary leading-relaxed">
                  {detail}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Timeline progress ───────────────────────────────────────────────────────

function TimelineProgress() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={ref} className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px -translate-x-px hidden md:block pointer-events-none">
      <div className="absolute inset-0 bg-border" />
      <motion.div
        className="absolute top-0 left-0 right-0 bg-accent origin-top"
        style={{ scaleY, height: '100%' }}
      />
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

function FloatingHomeButton() {
  const shouldReduceMotion = useReducedMotion()
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
        <span className="font-body text-xs font-[500]">Back to home</span>
      </Link>
    </motion.div>
  )
}

export default function HowWeWorkPage() {
  const shouldReduceMotion = useReducedMotion()
  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef as React.RefObject<Element>, { once: true })

  return (
    <div className="min-h-screen bg-bg">
      {/* Floating home button */}
      <FloatingHomeButton />

      {/* Nav */}
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
                Home
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center px-5 py-2.5 text-sm font-body font-[500] bg-accent text-white rounded-sm hover:bg-accent-dark transition-colors duration-250"
              >
                Get your free preview
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section ref={heroRef} className="pt-[72px]">
        <div className="container-wide py-20 md:py-28">
          <motion.div
            className="max-w-2xl"
            variants={shouldReduceMotion ? undefined : fadeUp}
            initial="hidden"
            animate={heroInView ? 'visible' : 'hidden'}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-body text-sm text-text-secondary hover:text-accent transition-colors mb-8 md:hidden"
            >
              <ArrowLeft size={14} />
              Back to home
            </Link>
            <p className="section-label mb-4">How we work</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-[300] text-text-primary leading-[1.1] mb-6">
              From first call to live website — in days, not months
            </h1>
            <p className="font-body text-base md:text-lg text-text-secondary leading-relaxed max-w-lg">
              We keep it simple. Four clear steps, full transparency, and you see a free preview before you pay anything.
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
              Ready to get started?
            </h2>
            <p className="font-body text-base text-[#9C9790] leading-relaxed mb-8">
              It starts with a short conversation. Tell us about your business and we&apos;ll show you what we can build — for free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-body font-[500] text-sm bg-accent text-white rounded-sm hover:bg-accent-dark transition-colors duration-250"
              >
                Get your free preview
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/35796254148"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-body font-[500] text-sm border border-[#333330] text-[#F7F4EF] rounded-sm hover:border-accent hover:text-accent transition-colors duration-250"
              >
                <MessageSquare size={16} />
                WhatsApp us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark border-t border-[#333330]">
        <div className="container-wide py-8 flex items-center justify-between">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Logo variant="dark" size="sm" showTagline={false} />
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="font-body text-xs text-[#9C9790] hover:text-[#F7F4EF] transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft size={12} />
              Back to home
            </Link>
            <p className="font-body text-xs text-[#6B6660]">
              &copy; 2026 Day One. Cyprus.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
