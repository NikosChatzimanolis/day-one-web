// ── components/contact/ContactForm.tsx ──
'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { copy } from '@/lib/copy'
import { contactIntents, type ContactIntent } from '@/lib/site'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const inputBase =
  'w-full bg-bg border border-border-strong rounded-sm px-4 py-3 font-body text-sm text-text-primary placeholder:text-text-tertiary transition-colors duration-200 focus:border-accent focus:outline-none'

const labelClass = 'block font-body text-xs font-medium uppercase tracking-wide text-text-tertiary mb-2'

interface ContactFormProps {
  /** Pre-selected intent, usually from ?intent= on the contact page. */
  defaultIntent?: ContactIntent
}

export default function ContactForm({ defaultIntent }: ContactFormProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setError(null)

    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot: a real person never fills this hidden field.
    if ((data.get('company') as string)?.trim()) {
      setStatus('success')
      form.reset()
      return
    }

    const payload = {
      name: (data.get('name') as string) ?? '',
      email: (data.get('email') as string) ?? '',
      intent: (data.get('intent') as string) ?? '',
      message: (data.get('message') as string) ?? '',
      company: (data.get('company') as string) ?? '',
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Something went wrong. Please try again.')
      }
      setStatus('success')
      form.reset()
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div data-no-grid className="rounded-lg border border-border bg-bg p-8 md:p-10">
        <p className="eyebrow mb-4">Sent</p>
        <h3 className="font-display text-2xl font-light text-text-primary mb-3">Thank you. We&rsquo;ve got it.</h3>
        <p className="font-body text-sm text-text-secondary leading-relaxed">
          We read every message ourselves and reply within one business day. If it&rsquo;s urgent, WhatsApp is the fastest way to reach us.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {/* Honeypot */}
      <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="intent" className={labelClass}>
          {copy.contact.intentLabel}
        </label>
        <select
          id="intent"
          name="intent"
          required
          defaultValue={defaultIntent ?? ''}
          className={cn(inputBase, 'appearance-none bg-[length:12px_12px] bg-[position:right_1rem_center] bg-no-repeat pr-10')}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' fill='none' stroke='%236E6657' stroke-width='1.2'%3E%3Cpath d='M2.5 4.5 6 8l3.5-3.5'/%3E%3C/svg%3E\")",
          }}
        >
          <option value="" disabled>
            Choose one
          </option>
          {contactIntents.map((intent) => (
            <option key={intent} value={intent}>
              {copy.contact.intents[intent]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input id="name" name="name" type="text" required minLength={2} placeholder="Your name" className={inputBase} />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input id="email" name="email" type="email" required placeholder="you@company.com" className={inputBase} />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          What are you building?
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={5}
          placeholder="A sentence or two on what you need, and where you are with it."
          className={cn(inputBase, 'resize-none')}
        />
      </div>

      {status === 'error' && error && (
        <p className="font-body text-sm text-accent" role="alert">{error}</p>
      )}

      <button
        type="submit"
        data-no-grid
        disabled={status === 'submitting'}
        className="mt-1 inline-flex items-center justify-center rounded-full bg-text-primary px-7 py-3.5 font-body text-sm text-bg transition-all duration-250 hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send enquiry'}
      </button>

      <p className="font-body text-xs text-text-tertiary">
        Prefer to talk first? Book a call above. We reply to enquiries within one business day.
      </p>
    </form>
  )
}
