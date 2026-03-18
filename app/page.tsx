// ── app/page.tsx ──
'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'
import { Globe, Search, Palette, Camera, Share2, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import ScrollProvider, { useScrollContext } from '@/context/ScrollContext'
import SplitLayout from '@/components/layout/SplitLayout'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HowItWorks from '@/components/sections/HowItWorks'
import Pricing from '@/components/sections/Pricing'
import Contact, { ContactFormCard } from '@/components/sections/Contact'
import type { Service, Project, Stat } from '@/types'

// ─── Shared data ──────────────────────────────────────────────────────────────

const stats: Stat[] = [
  { value: '12+',  label: 'clients served',    numeric: 12 },
  { value: '2 wks', label: 'average delivery', numeric: 2 },
  { value: '€350', label: 'starting price',    numeric: 350 },
]

const services: Service[] = [
  {
    id: 'website',
    title: 'Website Development',
    description: 'A clean, fast, mobile-ready website with clear sections: who you are, what you do, proof of work, and a way to get in touch.',
    icon: 'globe',
    featured: true,
  },
  {
    id: 'google',
    title: 'Google Presence',
    description: 'We set up and optimise your Google Business profile so people can actually find you.',
    icon: 'search',
  },
  {
    id: 'brand',
    title: 'Brand Strategy',
    description: 'Colours, fonts, tone of voice — simple rules so everything you put online feels consistent.',
    icon: 'palette',
  },
  {
    id: 'photo',
    title: 'Photography & Editing',
    description: 'On-location photos of your space, team, or products, edited to look clean and professional.',
    icon: 'camera',
  },
  {
    id: 'social',
    title: 'Social Media',
    description: 'Monthly content planning and caption writing, sent to you for approval before anything goes live.',
    icon: 'share',
  },
]

const projects: Project[] = [
  {
    id: 'opostofantastikes',
    name: 'Opostofantastikes.gr',
    description: 'One-page site for a wedding and event planner: about, services, and contact — elegant, focused, built to convert.',
    url: 'https://opostofantastikes.vercel.app/',
    tags: ['Website Development'],
    accentColor: '#C4522A',
  },
  {
    id: 'idees-kai-luseis',
    name: 'Idees kai Luseis',
    description: 'Renovation company in Greece. Website with a light rebrand, structured service packages, and a before-and-after gallery.',
    url: '#',
    tags: ['Website Development', 'Branding'],
    accentColor: '#6B6660',
  },
]

const iconMap = {
  globe: Globe,
  search: Search,
  palette: Palette,
  camera: Camera,
  share: Share2,
}

// ─── Shared animation variants ────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

// ─── Hero helpers ─────────────────────────────────────────────────────────────

function useCounter(target: number, duration: number = 1200, start: boolean = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(ease * target))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(target)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])
  return count
}

function StatCounter({ stat, delay = 0 }: { stat: Stat; delay?: number }) {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-50px' })
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (isInView && !started) {
      const timer = setTimeout(() => setStarted(true), delay)
      return () => clearTimeout(timer)
    }
  }, [isInView, started, delay])

  const count = useCounter(stat.numeric, 1200, started && !shouldReduceMotion)

  const displayValue = shouldReduceMotion
    ? stat.value
    : stat.value.startsWith('€')
    ? `€${count}`
    : stat.value.includes('+')
    ? `${count}+`
    : `${count} wks`

  return (
    <motion.div
      ref={ref}
      className="flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: delay / 1000 + 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="font-display text-3xl md:text-4xl font-[600] text-text-primary leading-none">
        {displayValue}
      </span>
      <span className="font-body text-sm text-text-secondary mt-1">{stat.label}</span>
    </motion.div>
  )
}

// ─── Service card (copied from Services.tsx) ──────────────────────────────────

function ServiceCard({ service }: { service: Service }) {
  const shouldReduceMotion = useReducedMotion()
  const IconComponent = iconMap[service.icon as keyof typeof iconMap]

  if (service.featured) {
    return (
      <motion.article
        className="relative flex flex-col justify-between p-6 rounded-md border border-border bg-surface overflow-hidden group"
        variants={cardVariants}
        whileHover={shouldReduceMotion ? {} : { y: -4, boxShadow: '0 8px 32px 0 rgba(26,26,24,0.12)', borderColor: 'var(--color-accent)' }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        data-cursor-hover
      >
        <div
          className="absolute top-0 right-0 w-24 h-24 opacity-5"
          style={{ background: 'radial-gradient(circle at top right, var(--color-accent), transparent 70%)' }}
          aria-hidden="true"
        />
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-sm bg-accent/10 flex items-center justify-center group-hover:bg-accent/15 transition-colors duration-250">
              {IconComponent && <IconComponent size={16} className="text-accent" />}
            </div>
            <span className="section-label">Featured</span>
          </div>
          <h3 className="font-display text-xl font-[400] text-text-primary mb-2 leading-snug">
            {service.title}
          </h3>
          <p className="font-body text-sm text-text-secondary leading-relaxed">
            {service.description}
          </p>
        </div>
      </motion.article>
    )
  }

  return (
    <motion.article
      className={cn(
        'relative flex flex-col justify-between p-5 rounded-md border border-border bg-bg overflow-hidden group',
        service.id === 'social' ? 'opacity-80' : ''
      )}
      variants={cardVariants}
      whileHover={shouldReduceMotion ? {} : { y: -4, boxShadow: '0 6px 24px 0 rgba(26,26,24,0.1)', borderColor: 'var(--color-accent)' }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      data-cursor-hover
    >
      <div>
        <div className="w-8 h-8 rounded-sm bg-surface flex items-center justify-center mb-3 group-hover:bg-accent/10 transition-colors duration-250">
          {IconComponent && <IconComponent size={15} className="text-text-secondary group-hover:text-accent transition-colors duration-250" />}
        </div>
        <h3 className="font-display text-lg font-[400] text-text-primary mb-1.5 leading-snug">
          {service.title}
        </h3>
        <p className="font-body text-sm text-text-secondary leading-relaxed">
          {service.description}
        </p>
      </div>
    </motion.article>
  )
}

// ─── Project card (copied from Work.tsx) ──────────────────────────────────────

function BrowserMockup({ project }: { project: Project }) {
  const lines = [
    { w: '60%', opacity: 0.5 },
    { w: '85%', opacity: 0.3 },
    { w: '45%', opacity: 0.4 },
    { w: '70%', opacity: 0.25 },
    { w: '55%', opacity: 0.3 },
  ]
  return (
    <div className="browser-frame aspect-[4/3] overflow-hidden">
      <div className="browser-frame-header">
        <div className="browser-frame-dot" style={{ background: '#FF5F57' }} />
        <div className="browser-frame-dot" style={{ background: '#FFBD2E' }} />
        <div className="browser-frame-dot" style={{ background: '#28CA41' }} />
        <div className="browser-frame-bar" />
        <div className="w-14 h-1.5 rounded-full ml-2" style={{ background: 'var(--color-border)' }} />
      </div>
      <div className="p-4 h-full bg-surface flex flex-col gap-2.5">
        <div
          className="rounded-sm h-12 flex items-center justify-center mb-1"
          style={{ background: `linear-gradient(135deg, ${project.accentColor}18, ${project.accentColor}08)`, border: `1px solid ${project.accentColor}20` }}
        >
          <div className="flex gap-2 items-center">
            <div className="w-10 h-1.5 rounded-full" style={{ background: project.accentColor, opacity: 0.6 }} />
            <div className="w-5 h-1.5 rounded-full" style={{ background: project.accentColor, opacity: 0.3 }} />
          </div>
        </div>
        <div className="flex gap-2.5 items-center px-1 mb-1">
          {[40, 28, 36, 24].map((w, i) => (
            <div key={i} className="h-1 rounded-full" style={{ width: `${w}px`, background: 'var(--color-text-secondary)', opacity: 0.2 }} />
          ))}
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          {lines.map((line, i) => (
            <div key={i} className="h-1.5 rounded-full" style={{ width: line.w, background: 'var(--color-text)', opacity: line.opacity }} />
          ))}
          <div className="mt-2 rounded-sm h-14 w-full" style={{ background: `linear-gradient(135deg, var(--color-border) 0%, ${project.accentColor}15 100%)` }} />
          <div className="mt-1.5">
            <div className="h-4 w-16 rounded-sm" style={{ background: project.accentColor, opacity: 0.7 }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const shouldReduceMotion = useReducedMotion()
  return (
    <motion.article
      className="group relative"
      variants={cardVariants}
      data-cursor-hover
    >
      <motion.div
        className="rounded-md overflow-hidden border border-border"
        whileHover={shouldReduceMotion ? {} : { y: -4, boxShadow: '0 10px 40px rgba(26,26,24,0.12)' }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <BrowserMockup project={project} />
        <div className="p-5 bg-bg border-t border-border">
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <h3 className="font-display text-xl font-[400] text-text-primary leading-tight">
              {project.name}
            </h3>
            <a
              href={project.url}
              target={project.url !== '#' ? '_blank' : undefined}
              rel={project.url !== '#' ? 'noopener noreferrer' : undefined}
              className={cn(
                'flex items-center justify-center w-8 h-8 rounded-sm border border-border text-text-secondary hover:text-accent hover:border-accent transition-colors duration-200 flex-shrink-0 mt-0.5',
                project.url === '#' ? 'opacity-40 pointer-events-none' : ''
              )}
              aria-label={`View ${project.name}`}
            >
              <ArrowUpRight size={14} />
            </a>
          </div>
          <p className="font-body text-sm text-text-secondary leading-relaxed mb-3">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded-sm bg-surface border border-border font-body text-xs text-text-secondary">
                {tag}
              </span>
            ))}
          </div>
          {project.url !== '#' && (
            <div className="mt-3 pt-3 border-t border-border">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-body text-sm font-[500] text-accent hover:gap-2.5 transition-all duration-200"
              >
                View project <span aria-hidden="true">→</span>
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.article>
  )
}

// ─── About helpers ────────────────────────────────────────────────────────────

function GeometricPhotoPlaceholder() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden bg-surface border border-border">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(145deg, var(--color-surface) 0%, var(--color-bg) 100%)' }} />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="320" cy="60" r="140" fill="rgba(196,82,42,0.04)" />
        <line x1="0" y1="100" x2="400" y2="100" stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="0" y1="200" x2="400" y2="200" stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="133" y1="0" x2="133" y2="300" stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="4 4" />
        <line x1="267" y1="0" x2="267" y2="300" stroke="var(--color-border)" strokeWidth="0.5" strokeDasharray="4 4" />
        <rect x="40" y="60" width="110" height="145" rx="2" fill="rgba(196,82,42,0.08)" stroke="rgba(196,82,42,0.2)" strokeWidth="1" />
        <rect x="170" y="80" width="80" height="50" rx="2" fill="rgba(26,26,24,0.06)" />
        <rect x="170" y="142" width="80" height="30" rx="2" fill="rgba(26,26,24,0.04)" />
        <rect x="170" y="184" width="80" height="20" rx="2" fill="rgba(26,26,24,0.03)" />
        <rect x="272" y="80" width="90" height="60" rx="2" fill="rgba(196,82,42,0.06)" stroke="rgba(196,82,42,0.15)" strokeWidth="0.75" />
        <rect x="272" y="155" width="42" height="42" rx="2" fill="var(--color-accent)" opacity="0.15" />
        <rect x="320" y="155" width="42" height="42" rx="2" fill="var(--color-border)" opacity="0.6" />
        <rect x="272" y="203" width="42" height="22" rx="2" fill="var(--color-border)" opacity="0.4" />
        <rect x="320" y="203" width="42" height="22" rx="2" fill="rgba(196,82,42,0.1)" />
        <text x="95" y="138" textAnchor="middle" fontFamily="Georgia, serif" fontSize="13" fill="rgba(196,82,42,0.6)" fontStyle="italic">Day One</text>
        <text x="95" y="155" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="7" fill="rgba(26,26,24,0.3)" letterSpacing="2">STUDIO · CYPRUS</text>
        <circle cx="40" cy="60" r="4" fill="var(--color-accent)" opacity="0.5" />
        <circle cx="150" cy="60" r="3" fill="var(--color-border)" />
        <circle cx="150" cy="205" r="3" fill="var(--color-accent)" opacity="0.3" />
      </svg>
      <div className="absolute bottom-4 left-4">
        <p className="font-body text-xs text-text-secondary/50 tracking-label">TEAM PHOTO · COMING SOON</p>
      </div>
    </div>
  )
}

// ─── Panel content components ─────────────────────────────────────────────────

function HeroLeft() {
  const { goTo } = useScrollContext()
  const shouldReduceMotion = useReducedMotion()

  const headline = 'Your first great website.'
  const headline2 = 'Built in two weeks.'
  const words1 = headline.split(' ')
  const words2 = headline2.split(' ')

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { delay: 0.2 + i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    }),
  }

  return (
    <div className="relative flex flex-col justify-center min-h-full px-6 lg:px-14 pt-24 pb-10 bg-bg overflow-hidden">
      {/* Gradient mesh — matches HeroRight */}
      <div className="absolute inset-0 gradient-mesh" aria-hidden="true" />
      {/* Subtle grid texture — matches HeroRight */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--color-text) 1px, transparent 1px), linear-gradient(90deg, var(--color-text) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />
      <motion.p
        className="relative z-10 section-label mb-6"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        Web studio — Cyprus &amp; Greece
      </motion.p>

      <h1
        className="relative z-10 font-display text-4xl md:text-5xl lg:text-6xl font-[400] text-text-primary leading-[1.1] mb-6"
        aria-label={`${headline} ${headline2}`}
      >
        <span className="block" aria-hidden="true">
          {words1.map((word, i) => (
            <motion.span
              key={`h1-${i}`}
              className="inline-block mr-[0.2em] last:mr-0"
              custom={i}
              variants={shouldReduceMotion ? undefined : wordVariants}
              initial="hidden"
              animate="visible"
            >
              {word}
            </motion.span>
          ))}
        </span>
        <span className="block text-accent" aria-hidden="true">
          {words2.map((word, i) => (
            <motion.span
              key={`h2-${i}`}
              className="inline-block mr-[0.2em] last:mr-0"
              custom={words1.length + i}
              variants={shouldReduceMotion ? undefined : wordVariants}
              initial="hidden"
              animate="visible"
            >
              {word}
            </motion.span>
          ))}
        </span>
      </h1>

      <motion.p
        className="relative z-10 font-body text-base md:text-lg text-text-secondary leading-relaxed max-w-md mb-8"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        We design and build fast, professional websites for small businesses in Cyprus and Greece — then stay available as you grow.
      </motion.p>

      <motion.div
        className="relative z-10 flex flex-col sm:flex-row gap-3"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault()
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
            if (isMobile) {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
            } else {
              goTo(5)
            }
          }}
          className="inline-flex items-center justify-center px-6 py-3 font-body font-[500] text-sm text-white bg-accent rounded-sm hover:bg-accent-dark transition-colors duration-250"
        >
          Get a free mockup
        </a>
      </motion.div>

      <motion.div
        className="relative z-10 mt-12 flex flex-row gap-8 md:gap-12"
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.4 }}
      >
        {stats.map((stat, i) => (
          <StatCounter key={stat.label} stat={stat} delay={i * 150} />
        ))}
      </motion.div>
    </div>
  )
}

function HeroRight() {
  return (
    <div className="relative hidden md:flex items-center justify-center min-h-full bg-bg overflow-hidden">
      {/* Gradient mesh */}
      <div
        className="absolute inset-0 gradient-mesh"
        aria-hidden="true"
      />
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--color-text) 1px, transparent 1px), linear-gradient(90deg, var(--color-text) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />
      {/* Large decorative display text */}
      <div className="relative z-10 text-center select-none pointer-events-none" aria-hidden="true">
        <p
          className="font-display leading-none text-text-primary"
          style={{ fontSize: 'clamp(6rem, 14vw, 11rem)', opacity: 0.05, fontWeight: 400 }}
        >
          Day<br />One
        </p>
      </div>
    </div>
  )
}

function ServicesLeft() {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: false, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      className="flex flex-col justify-center min-h-full px-6 lg:px-12 pt-24 pb-10 bg-bg"
      variants={shouldReduceMotion ? undefined : containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.p className="section-label mb-5" variants={shouldReduceMotion ? undefined : itemVariants}>
        What we do
      </motion.p>
      <motion.h2
        className="font-display text-3xl md:text-4xl font-[400] text-text-primary leading-tight mb-5"
        variants={shouldReduceMotion ? undefined : itemVariants}
      >
        Services built around your business
      </motion.h2>
      <motion.p
        className="font-body text-sm text-text-secondary leading-relaxed mb-8 max-w-xs"
        variants={shouldReduceMotion ? undefined : itemVariants}
      >
        Website development is our primary focus. Everything else supports it.
      </motion.p>
      <motion.ul className="flex flex-col gap-3" variants={shouldReduceMotion ? undefined : itemVariants}>
        {services.map((service) => (
          <li key={service.id} className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
            <span
              className={cn(
                'font-body text-sm',
                service.featured ? 'text-text-primary font-[500]' : 'text-text-secondary'
              )}
            >
              {service.title}
            </span>
          </li>
        ))}
      </motion.ul>
    </motion.div>
  )
}

function ServicesRight() {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: false, margin: '-40px' })

  return (
    <div ref={ref} className="min-h-full bg-surface overflow-hidden px-5 pt-24 pb-10">
      <motion.div
        className="grid grid-cols-2 gap-3"
        variants={shouldReduceMotion ? undefined : containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {services.map((service) =>
          service.featured ? (
            <div key={service.id} className="col-span-2">
              <ServiceCard service={service} />
            </div>
          ) : (
            <ServiceCard key={service.id} service={service} />
          )
        )}
      </motion.div>
    </div>
  )
}

function WorkLeft() {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: false, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      className="flex flex-col justify-center min-h-full px-6 lg:px-12 pt-24 pb-10 bg-bg"
      variants={shouldReduceMotion ? undefined : containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.p className="section-label mb-5" variants={shouldReduceMotion ? undefined : itemVariants}>
        Recent work
      </motion.p>
      <motion.h2
        className="font-display text-3xl md:text-4xl font-[400] text-text-primary leading-tight mb-4"
        variants={shouldReduceMotion ? undefined : itemVariants}
      >
        Ta Pinakia
      </motion.h2>
      <motion.p
        className="font-body text-sm text-text-secondary leading-relaxed mb-8 max-w-xs"
        variants={shouldReduceMotion ? undefined : itemVariants}
      >
        A modern restaurant website with online reservations, bilingual menu, and mobile-first design — built in two weeks.
      </motion.p>
      <motion.div className="flex flex-wrap gap-2 mb-10" variants={shouldReduceMotion ? undefined : itemVariants}>
        {['Next.js 14', 'Tailwind CSS', 'Framer Motion'].map(tag => (
          <span key={tag} className="inline-block px-3 py-1 text-xs border border-border text-text-secondary rounded-full">
            {tag}
          </span>
        ))}
      </motion.div>
      <motion.div variants={shouldReduceMotion ? undefined : itemVariants}>
        <Link
          href="/work/tapinakia"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white text-sm rounded-sm hover:bg-accent-dark transition-colors duration-250"
        >
          View project →
        </Link>
      </motion.div>
    </motion.div>
  )
}

function WorkRight() {
  return (
    <div className="relative flex items-center justify-center min-h-full bg-surface overflow-hidden px-8 pt-16 pb-10">
      {/* Browser chrome mockup with live scaled iframe */}
      <div className="w-full max-w-lg rounded-xl overflow-hidden shadow-2xl border border-border">
        {/* Title bar */}
        <div className="bg-[#E8E3DC] px-4 py-2.5 flex items-center gap-2 flex-shrink-0">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex-1 mx-3 bg-white/60 rounded px-3 py-1 text-xs text-text-secondary truncate font-mono">
            dayone-web.com/work/tapinakia
          </div>
        </div>
        {/* Live scaled iframe — 900px viewport scaled to ~360px display */}
        <Link href="/work/tapinakia" className="block relative overflow-hidden" style={{ height: 240 }}>
          <div style={{ width: 900, height: 600, transform: 'scale(0.4)', transformOrigin: 'top left', pointerEvents: 'none' }}>
            <iframe
              src="/preview/tapinakia/index.html"
              style={{ width: '100%', height: '100%', border: 0 }}
              title="Ta Pinakia preview"
              tabIndex={-1}
            />
          </div>
          {/* Clickable overlay */}
          <div className="absolute inset-0 cursor-pointer hover:bg-accent/5 transition-colors" />
        </Link>
      </div>
    </div>
  )
}

function AboutLeft() {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: false, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      className="flex flex-col justify-center min-h-full px-6 lg:px-12 pt-24 pb-10 bg-bg overflow-hidden"
      variants={shouldReduceMotion ? undefined : containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.p className="section-label mb-5" variants={shouldReduceMotion ? undefined : itemVariants}>
        About us
      </motion.p>
      <motion.h2
        className="font-display text-3xl md:text-4xl font-[400] text-text-primary leading-tight mb-6"
        variants={shouldReduceMotion ? undefined : itemVariants}
      >
        A small studio that does the work properly
      </motion.h2>
      <motion.div className="flex flex-col gap-4" variants={shouldReduceMotion ? undefined : itemVariants}>
        <p className="font-body text-sm text-text-secondary leading-relaxed">
          Day One is a small studio in Cyprus. We work with a small number of clients at a time so every project gets proper attention.
        </p>
        <p className="font-body text-sm text-text-secondary leading-relaxed">
          We prefer short calls and early drafts over long documents. Most of our projects start from something half-built — a Wix site, a logo file, a few screenshots of what you like. That&apos;s usually enough to get started.
        </p>
      </motion.div>
      <motion.div
        className="mt-8 grid grid-cols-2 gap-5 pt-8 border-t border-border"
        variants={shouldReduceMotion ? undefined : itemVariants}
      >
        <div>
          <p className="font-display text-2xl font-[600] text-text-primary">Cyprus</p>
          <p className="font-body text-xs text-text-secondary mt-0.5">Based in Limassol</p>
        </div>
        <div>
          <p className="font-display text-2xl font-[600] text-text-primary">Remote-first</p>
          <p className="font-body text-xs text-text-secondary mt-0.5">Work with clients across EU</p>
        </div>
        <div>
          <p className="font-display text-2xl font-[600] text-text-primary">~2 weeks</p>
          <p className="font-body text-xs text-text-secondary mt-0.5">Average delivery time</p>
        </div>
        <div>
          <p className="font-display text-2xl font-[600] text-accent">WhatsApp</p>
          <p className="font-body text-xs text-text-secondary mt-0.5">Always reachable</p>
        </div>
      </motion.div>
      <motion.div className="mt-6" variants={shouldReduceMotion ? undefined : itemVariants}>
        <a
          href="https://wa.me/35796254148"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-body text-sm font-[500] text-accent hover:gap-3 transition-all duration-200"
        >
          Message us on WhatsApp <span aria-hidden="true">→</span>
        </a>
      </motion.div>
    </motion.div>
  )
}

function AboutRight() {
  return (
    <div className="flex flex-col justify-center items-center min-h-full px-6 lg:px-10 pt-24 pb-10 bg-surface overflow-y-auto">
      <div className="w-full max-w-md">
        <ContactFormCard />
      </div>
    </div>
  )
}

// ─── Back to top (shown below Contact) ────────────────────────────────────────

function BackToTop() {
  return (
    <div className="text-center py-6 bg-surface border-t border-border">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="font-body text-sm text-text-secondary/60 hover:text-text-secondary transition-colors duration-200"
      >
        ↑ Back to top
      </button>
    </div>
  )
}

// ─── Panel definitions ────────────────────────────────────────────────────────

const PANELS = [
  { left: <HeroLeft />,     right: <HeroRight /> },
  { left: <ServicesLeft />, right: <ServicesRight /> },
  { children: <HowItWorks /> },
  { left: <WorkLeft />,     right: <WorkRight /> },
  { children: <Pricing /> },
  { left: <AboutLeft />,    right: <AboutRight /> },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <ScrollProvider>
      <Navbar />
      <main>
        <SplitLayout panels={PANELS} />
        <div id="contact">
          <Contact />
        </div>
        <BackToTop />
      </main>
      <Footer />
    </ScrollProvider>
  )
}
