// ── components/sections/Work.tsx ──
'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Project } from '@/types'
import SectionWrapper from '@/components/ui/SectionWrapper'

const projects: Project[] = [
  {
    id: 'opostofantastikes',
    name: 'Opostofantastikes.gr',
    description:
      'One-page site for a wedding and event planner: about, services, and contact — elegant, focused, built to convert.',
    url: 'https://opostofantastikes.vercel.app/',
    tags: ['Website Development'],
    accentColor: '#C4522A',
  },
  {
    id: 'idees-kai-luseis',
    name: 'Idees kai Luseis',
    description:
      'Renovation company in Greece. Website with a light rebrand, structured service packages, and a before-and-after gallery.',
    url: '#',
    tags: ['Website Development', 'Branding'],
    accentColor: '#6B6660',
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
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

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
      {/* Browser chrome */}
      <div className="browser-frame-header">
        <div className="browser-frame-dot" style={{ background: '#FF5F57' }} />
        <div className="browser-frame-dot" style={{ background: '#FFBD2E' }} />
        <div className="browser-frame-dot" style={{ background: '#28CA41' }} />
        <div className="browser-frame-bar" />
        <div
          className="w-16 h-1.5 rounded-full ml-2"
          style={{ background: 'var(--color-border)' }}
        />
      </div>

      {/* Mock page content */}
      <div className="p-5 h-full bg-surface flex flex-col gap-3">
        {/* Hero area */}
        <div
          className="rounded-sm h-14 flex items-center justify-center mb-1"
          style={{
            background: `linear-gradient(135deg, ${project.accentColor}18, ${project.accentColor}08)`,
            border: `1px solid ${project.accentColor}20`,
          }}
        >
          <div className="flex gap-2 items-center">
            <div
              className="w-12 h-1.5 rounded-full"
              style={{ background: project.accentColor, opacity: 0.6 }}
            />
            <div
              className="w-6 h-1.5 rounded-full"
              style={{ background: project.accentColor, opacity: 0.3 }}
            />
          </div>
        </div>

        {/* Nav simulation */}
        <div className="flex gap-3 items-center px-1 mb-2">
          {[40, 28, 36, 24].map((w, i) => (
            <div
              key={i}
              className="h-1 rounded-full"
              style={{
                width: `${w}px`,
                background: 'var(--color-text-secondary)',
                opacity: 0.2,
              }}
            />
          ))}
        </div>

        {/* Content lines */}
        <div className="flex flex-col gap-2 flex-1">
          {lines.map((line, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full"
              style={{
                width: line.w,
                background: 'var(--color-text)',
                opacity: line.opacity,
              }}
            />
          ))}

          {/* Image placeholder block */}
          <div
            className="mt-3 rounded-sm h-16 w-full"
            style={{
              background: `linear-gradient(135deg, var(--color-border) 0%, ${project.accentColor}15 100%)`,
            }}
          />

          {/* CTA button sim */}
          <div className="mt-2">
            <div
              className="h-5 w-20 rounded-sm"
              style={{ background: project.accentColor, opacity: 0.7 }}
            />
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
        whileHover={
          shouldReduceMotion
            ? {}
            : {
                y: -6,
                boxShadow: '0 12px 48px rgba(26, 26, 24, 0.12)',
              }
        }
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        {/* Browser mockup */}
        <BrowserMockup project={project} />

        {/* Card content */}
        <div className="p-6 bg-bg border-t border-border">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="font-display text-2xl font-[400] text-text-primary leading-tight">
              {project.name}
            </h3>
            <a
              href={project.url}
              target={project.url !== '#' ? '_blank' : undefined}
              rel={project.url !== '#' ? 'noopener noreferrer' : undefined}
              className={cn(
                'flex items-center justify-center w-9 h-9 rounded-sm border border-border',
                'text-text-secondary hover:text-accent hover:border-accent',
                'transition-colors duration-200 flex-shrink-0 mt-0.5',
                project.url === '#' ? 'opacity-40 pointer-events-none' : ''
              )}
              aria-label={`View ${project.name}`}
            >
              <ArrowUpRight size={16} />
            </a>
          </div>

          <p className="font-body text-sm text-text-secondary leading-relaxed mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-1 rounded-sm bg-surface border border-border font-body text-xs text-text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.url !== '#' && (
            <div className="mt-4 pt-4 border-t border-border">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-body text-sm font-[500] text-accent hover:gap-2.5 transition-all duration-200"
              >
                View project
                <span aria-hidden="true">→</span>
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.article>
  )
}

export default function Work() {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: false, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="work"
      className="section-py bg-surface"
      aria-label="Portfolio"
    >
      <div className="container-wide">
        {/* Section header */}
        <SectionWrapper className="mb-14 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="section-label mb-4">Recent work</p>
              <h2 className="font-display text-4xl md:text-5xl font-[400] text-text-primary leading-tight">
                Sites we&apos;ve built
              </h2>
            </div>
            <p className="font-body text-sm text-text-secondary max-w-[260px] leading-relaxed">
              Small teams, real businesses, live and working.
            </p>
          </div>
        </SectionWrapper>

        {/* Project grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
