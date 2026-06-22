// ── components/contact/ContactForm.tsx ──
'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const inputBase =
  'w-full bg-bg border border-border-strong rounded-sm px-4 py-3 font-body text-sm text-text-primary placeholder:text-text-tertiary transition-colors duration-200 focus:border-accent focus:outline-none'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    setError(null)

    const form = e.currentTarget
    const data = new FormData(form)

    // Honeypot — a real person never fills this hidden field.
    if ((data.get('company') as string)?.trim()) {
      setStatus('success')
      form.reset()
      return
    }

    const payload = {
      name: (data.get('name') as string) ?? '',
      email: (data.get('email') as string) ?? '',
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
        <label htmlFor="name" className="block font-body text-xs font-medium uppercase tracking-wide text-text-tertiary mb-2">
          Name
        </label>
        <input id="name" name="name" type="text" required minLength={2} placeholder="Your name" className={inputBase} />
      </div>

      <div>
        <label htmlFor="email" className="block font-body text-xs font-medium uppercase tracking-wide text-text-tertiary mb-2">
          Email
        </label>
        <input id="email" name="email" type="email" required placeholder="you@company.com" className={inputBase} />
      </div>

      <div>
        <label htmlFor="message" className="block font-body text-xs font-medium uppercase tracking-wide text-text-tertiary mb-2">
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
        className="mt-1 inline-flex items-center justify-center px-7 py-3.5 rounded-sm bg-accent text-white font-body text-sm font-medium transition-all duration-250 hover:bg-accent-dark disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Sending…' : 'Send enquiry'}
      </button>

      <p className="font-body text-xs text-text-tertiary">
        Prefer to talk first? Book a call above. We reply to enquiries within one business day.
      </p>
    </form>
  )
}
