// ── components/sections/Services.tsx ──
'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion'
import { Globe, Search, Palette, Camera, Share2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Service } from '@/types'
import SectionWrapper from '@/components/ui/SectionWrapper'

const services: Service[] = [
  {
    id: 'website',
    title: 'Website Development',
    description:
      'A clean, fast, mobile-ready website with clear sections: who you are, what you do, proof of work, and a way to get in touch.',
    icon: 'globe',
    featured: true,
  },
  {
    id: 'google',
    title: 'Google Presence',
    description:
      'We set up and optimise your Google Business profile so people can actually find you.',
    icon: 'search',
  },
  {
    id: 'brand',
    title: 'Brand Strategy',
    description:
      'Colours, fonts, tone of voice — simple rules so everything you put online feels consistent.',
    icon: 'palette',
  },
  {
    id: 'photo',
    title: 'Photography & Editing',
    description:
      'On-location photos of your space, team, or products, edited to look clean and professional.',
    icon: 'camera',
  },
  {
    id: 'social',
    title: 'Social Media',
    description:
      'Monthly content planning and caption writing, sent to you for approval before anything goes live.',
    icon: 'share',
  },
]

const iconMap = {
  globe: Globe,
  search: Search,
  palette: Palette,
  camera: Camera,
  share: Share2,
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
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

function ServiceCard({ service }: { service: Service }) {
  const shouldReduceMotion = useReducedMotion()
  const IconComponent = iconMap[service.icon as keyof typeof iconMap]

  if (service.featured) {
    return (
      <motion.article
        className={cn(
          'service-featured relative flex flex-col justify-between',
          'p-8 md:p-10 rounded-md border border-border bg-surface',
          'overflow-hidden group'
        )}
        variants={cardVariants}
        whileHover={
          shouldReduceMotion
            ? {}
            : {
                y: -6,
                boxShadow: '0 12px 48px 0 rgba(26, 26, 24, 0.12)',
                borderColor: 'var(--color-accent)',
              }
        }
        transition={{ duration: 0.25, ease: 'easeOut' }}
        data-cursor-hover
      >
        {/* Decorative corner accent */}
        <div
          className="absolute top-0 right-0 w-32 h-32 opacity-5"
          style={{
            background:
              'radial-gradient(circle at top right, var(--color-accent), transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-sm bg-accent/10 flex items-center justify-center group-hover:bg-accent/15 transition-colors duration-250">
              {IconComponent && <IconComponent size={18} className="text-accent" />}
            </div>
            <span className="section-label">Featured service</span>
          </div>

          <h3 className="font-display text-3xl md:text-4xl font-[400] text-text-primary mb-4 leading-tight">
            {service.title}
          </h3>
          <p className="font-body text-base text-text-secondary leading-relaxed max-w-md">
            {service.description}
          </p>
        </div>

        <div className="mt-8">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 font-body text-sm font-[500] text-accent hover:gap-3 transition-all duration-200"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Start a project
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </motion.article>
    )
  }

  return (
    <motion.article
      className={cn(
        'relative flex flex-col justify-between',
        'p-6 rounded-md border border-border bg-bg',
        'overflow-hidden group',
        service.id === 'social' ? 'opacity-80' : ''
      )}
      variants={cardVariants}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              y: -6,
              boxShadow: '0 8px 32px 0 rgba(26, 26, 24, 0.1)',
              borderColor: 'var(--color-accent)',
            }
      }
      transition={{ duration: 0.25, ease: 'easeOut' }}
      data-cursor-hover
    >
      <div>
        <div className="w-9 h-9 rounded-sm bg-surface flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors duration-250">
          {IconComponent && <IconComponent size={16} className="text-text-secondary group-hover:text-accent transition-colors duration-250" />}
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

export default function Services() {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: false, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="services"
      className="section-py bg-bg"
      aria-label="Services"
    >
      <div className="container-wide">
        {/* Section header */}
        <SectionWrapper className="mb-14 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="section-label mb-4">What we do</p>
              <h2 className="font-display text-4xl md:text-5xl font-[400] text-text-primary leading-tight max-w-sm">
                Services built around your business
              </h2>
            </div>
            <p className="font-body text-base text-text-secondary max-w-xs leading-relaxed">
              Website development is our primary focus. Everything else supports it.
            </p>
          </div>
        </SectionWrapper>

        {/* Services grid */}
        <motion.div
          className="services-grid"
          variants={shouldReduceMotion ? undefined : containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
