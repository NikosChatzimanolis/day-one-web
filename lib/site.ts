// ── lib/site.ts ──
// Single source of truth for site-wide constants: contact details, nav,
// booking flow, and the legal entity line. Keeps voice + facts consistent.

export const site = {
  name: 'Day One',
  legalName: 'Nikolaos Chatzimanolis trading as Day One Web Studio',
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
} as const

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Forge', href: '/forge' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const

// Primary CTA target across the site. The Book-a-call action always lands on
// the contact page's booking block (or the external calendar when configured).
export const bookCallHref = '/contact#book'
