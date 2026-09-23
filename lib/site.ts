// ── lib/site.ts ──
// Single source of truth for site-wide constants: contact details, nav,
// booking flow, and the legal entity line. Keeps voice + facts consistent.
import { copy } from '@/lib/copy'

export const site = {
  name: 'Day One',
  legalName: 'Nikolaos Chatzimanolis trading as Day One Web Studio',
  studioName: 'Day One Web Studio',
  domain: 'dayone-web.com',
  url: 'https://dayone-web.com',
  email: 'contact@dayone-web.com',
  phone: '+357 96 254 148',
  phoneHref: '+35796254148',
  whatsapp: 'https://wa.me/35796254148',
  location: 'Paphos, Cyprus',
  // Optional calendar link. When set (e.g. Cal.com / Calendly), "Book a call"
  // opens it directly; otherwise it routes to the contact page booking block.
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? '',
  // Forge early-access signup. Override per environment.
  forgeUrl: process.env.NEXT_PUBLIC_FORGE_URL ?? 'https://forge-dayone.com',
  // Strategic partner site, linked from the Astrala band and /astrala.
  astralaUrl: 'https://astralaadvisory.eu.com',
} as const

export type NavItem = { label: string; href: string; highlight?: boolean }

// Header + footer navigation. /forge keeps its route but is no longer listed;
// /services and /white-label redirect to /partner (see next.config.ts).
export const nav: readonly NavItem[] = [
  { label: copy.nav.partner, href: '/partner' },
  { label: copy.nav.products, href: '/products' },
  { label: copy.nav.work, href: '/work' },
  { label: copy.nav.astrala, href: '/astrala' },
  { label: copy.nav.security, href: '/security' },
  { label: copy.nav.about, href: '/about' },
  { label: copy.nav.contact, href: '/contact' },
]

// Primary CTA target across the site. The Book-a-call action always lands on
// the contact page's booking block (or the external calendar when configured).
export const bookCallHref = '/contact#book'

// Contact form intents. The value is what travels in ?intent= and in the
// enquiry email; the label comes from the copy dictionary.
export const contactIntents = ['partnership', 'demo', 'project', 'security'] as const
export type ContactIntent = (typeof contactIntents)[number]

export function isContactIntent(value: unknown): value is ContactIntent {
  return typeof value === 'string' && (contactIntents as readonly string[]).includes(value)
}

export const demoHref = '/contact?intent=demo'
