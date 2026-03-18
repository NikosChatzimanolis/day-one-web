// ── types/index.ts ──

export interface NavLink {
  label: string
  href: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon?: string
  featured?: boolean
}

export interface Project {
  id: string
  name: string
  description: string
  url: string
  tags: string[]
  accentColor?: string
}

export interface Testimonial {
  id: string
  quote: string
  clientName: string
  clientRole: string
  clientCompany: string
}

export interface PricingTier {
  id: string
  name: string
  price: string
  priceNote?: string
  description?: string
  features: string[]
  highlighted?: boolean
  cta: string
}

export interface ContactFormData {
  name: string
  email: string
  message: string
}

export type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export interface FormState {
  status: FormStatus
  error?: string
}

export interface Stat {
  value: string
  label: string
  numeric: number
}

export interface ProcessStep {
  number: string
  title: string
  description: string
}
