// ── components/sections/Contact.tsx ──
'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion, type Variants } from 'framer-motion'
import { MessageSquare, Mail, Phone, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ContactFormData, FormStatus } from '@/types'
import SectionWrapper from '@/components/ui/SectionWrapper'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface FieldError {
  name?: string
  email?: string
  message?: string
}

function validate(data: ContactFormData): FieldError {
  const errors: FieldError = {}
  if (!data.name.trim()) errors.name = 'Name is required.'
  else if (data.name.trim().length < 2) errors.name = 'Name must be at least 2 characters.'

  if (!data.email.trim()) errors.email = 'Email is required.'
  else if (!EMAIL_REGEX.test(data.email)) errors.email = 'Please enter a valid email address.'

  if (!data.message.trim()) errors.message = 'Message is required.'
  else if (data.message.trim().length < 10) errors.message = 'Message must be at least 10 characters.'
  else if (data.message.length > 2000) errors.message = 'Message must be under 2000 characters.'

  return errors
}

const errorVariants: Variants = {
  hidden: { opacity: 0, y: -6, height: 0 },
  visible: {
    opacity: 1,
    y: 0,
    height: 'auto',
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -4,
    height: 0,
    transition: { duration: 0.15 },
  },
}

const successVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
}

function FormField({
  label,
  id,
  error,
  children,
}: {
  label: string
  id: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-body text-sm font-[500] text-text-primary"
      >
        {label}
      </label>
      {children}
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key={error}
            className="flex items-center gap-1.5 font-body text-xs text-red-600 overflow-hidden"
            variants={errorVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="alert"
          >
            <AlertCircle size={12} className="flex-shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Standalone form card — reusable in any context ──────────────────────────
export function ContactFormCard() {
  const shouldReduceMotion = useReducedMotion()

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<FieldError>({})
  const [touched, setTouched] = useState<Partial<Record<keyof ContactFormData, boolean>>>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [serverError, setServerError] = useState<string>('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (touched[name as keyof ContactFormData]) {
      const newData = { ...formData, [name]: value }
      const newErrors = validate(newData)
      setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FieldError] }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const newErrors = validate(formData)
    setErrors((prev) => ({ ...prev, [name]: newErrors[name as keyof FieldError] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, email: true, message: true })
    const validationErrors = validate(formData)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return
    setStatus('loading')
    setServerError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong. Please try again.')
      }
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setTouched({})
      setErrors({})
    } catch (err) {
      setStatus('error')
      setServerError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  const inputClass = (fieldName: keyof ContactFormData) =>
    cn(
      'w-full px-4 py-3 font-body text-sm text-text-primary bg-bg border rounded-sm',
      'placeholder:text-text-secondary/50 outline-none',
      'transition-all duration-200',
      'focus:ring-2 focus:ring-accent/20 focus:border-accent',
      errors[fieldName] && touched[fieldName]
        ? 'border-red-400 bg-red-50/30'
        : 'border-border hover:border-text-secondary/30'
    )

  return (
    <div className="bg-bg rounded-md border border-border p-7 md:p-8">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            className="flex flex-col items-center justify-center py-12 text-center"
            variants={shouldReduceMotion ? undefined : successVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="w-14 h-14 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mb-5">
              <CheckCircle size={24} className="text-green-600" />
            </div>
            <h3 className="font-display text-2xl font-[400] text-text-primary mb-2">
              Message sent
            </h3>
            <p className="font-body text-sm text-text-secondary leading-relaxed max-w-xs">
              We&apos;ll review it and get back to you within 24 hours. Keep an eye on your inbox.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-6 font-body text-sm text-accent hover:underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
            noValidate
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FormField label="Your name" id="name" error={touched.name ? errors.name : undefined}>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Nikos Papadopoulos"
                className={inputClass('name')}
                autoComplete="name"
                aria-invalid={!!errors.name && touched.name}
              />
            </FormField>

            <FormField label="Email address" id="email" error={touched.email ? errors.email : undefined}>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="nikos@yourbusiness.com"
                className={inputClass('email')}
                autoComplete="email"
                aria-invalid={!!errors.email && touched.email}
              />
            </FormField>

            <FormField label="Tell us about your project" id="message" error={touched.message ? errors.message : undefined}>
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="I run a small restaurant in Limassol and need a website to show our menu and take bookings..."
                  rows={4}
                  maxLength={2000}
                  className={cn(inputClass('message'), 'resize-none')}
                  aria-invalid={!!errors.message && touched.message}
                />
                <span className="absolute bottom-3 right-3 font-body text-xs text-text-secondary/40">
                  {formData.message.length}/2000
                </span>
              </div>
            </FormField>

            <AnimatePresence>
              {status === 'error' && serverError && (
                <motion.div
                  className="flex items-start gap-2 px-3 py-2.5 rounded-sm bg-red-50 border border-red-200"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="alert"
                >
                  <AlertCircle size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <p className="font-body text-xs text-red-700">{serverError}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={status === 'loading'}
              className="relative flex items-center justify-center overflow-hidden px-6 py-3.5 font-body font-[500] text-sm text-white bg-accent rounded-sm disabled:opacity-70 disabled:cursor-not-allowed mt-1"
              whileHover={shouldReduceMotion || status === 'loading' ? {} : { scale: 1.01 }}
              whileTap={shouldReduceMotion || status === 'loading' ? {} : { scale: 0.99 }}
              transition={{ duration: 0.15 }}
            >
              {status !== 'loading' && (
                <motion.span
                  className="absolute inset-0 bg-accent-dark"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {status === 'loading' ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send message'
                )}
              </span>
            </motion.button>

            <p className="font-body text-xs text-text-secondary/60 text-center">
              No commitment. We&apos;ll reply with a free visual mockup.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null)

  return (
    <section
      ref={ref}
      id="contact"
      className="section-py bg-surface"
      aria-label="Contact Day One"
    >
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left column — info */}
          <SectionWrapper>
            <p className="section-label mb-6">Get in touch</p>
            <h2 className="font-display text-4xl md:text-5xl font-[400] text-text-primary leading-tight mb-6">
              Let&apos;s build something worth visiting
            </h2>
            <p className="font-body text-base text-text-secondary leading-relaxed mb-10 max-w-sm">
              Tell us about your business and what you need. We&apos;ll put together a free visual mockup before you commit to anything.
            </p>

            <div className="flex flex-col gap-5">
              <a
                href="https://wa.me/35796254148"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-sm bg-bg border border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all duration-200">
                  <MessageSquare size={16} className="text-text-secondary group-hover:text-accent transition-colors" />
                </div>
                <div>
                  <p className="font-body text-xs text-text-secondary/60 mb-0.5">WhatsApp</p>
                  <p className="font-body text-sm font-[500] text-text-primary group-hover:text-accent transition-colors">+357 96 254 148</p>
                </div>
              </a>

              <a href="mailto:contact@dayone-web.com" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-sm bg-bg border border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all duration-200">
                  <Mail size={16} className="text-text-secondary group-hover:text-accent transition-colors" />
                </div>
                <div>
                  <p className="font-body text-xs text-text-secondary/60 mb-0.5">Email</p>
                  <p className="font-body text-sm font-[500] text-text-primary group-hover:text-accent transition-colors">contact@dayone-web.com</p>
                </div>
              </a>

              <a href="tel:+35796254148" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-sm bg-bg border border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all duration-200">
                  <Phone size={16} className="text-text-secondary group-hover:text-accent transition-colors" />
                </div>
                <div>
                  <p className="font-body text-xs text-text-secondary/60 mb-0.5">Phone</p>
                  <p className="font-body text-sm font-[500] text-text-primary group-hover:text-accent transition-colors">+357 96 254 148</p>
                </div>
              </a>
            </div>

            <p className="font-body text-xs text-text-secondary/60 mt-8 italic">
              We usually respond within 24 hours.
            </p>
          </SectionWrapper>

          {/* Right column — form */}
          <SectionWrapper>
            <ContactFormCard />
          </SectionWrapper>
        </div>
      </div>
    </section>
  )
}
