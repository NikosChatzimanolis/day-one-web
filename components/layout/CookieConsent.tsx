'use client'
// ── components/layout/CookieConsent.tsx ──
// Minimal consent banner. Shows once (until a choice is stored); on "Accept"
// it loads Google Analytics, on "Decline" nothing loads. Re-applies a prior
// "granted" choice on return visits without showing the banner again.
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { getConsent, setConsent, loadAnalytics } from '@/lib/analytics'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const existing = getConsent()
    if (!existing) setVisible(true)
    else if (existing === 'granted') loadAnalytics()
  }, [])

  function choose(value: 'granted' | 'denied') {
    setConsent(value)
    if (value === 'granted') loadAnalytics()
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-consent-title"
      data-no-grid
      className="fixed inset-x-4 bottom-4 z-[60] mx-auto max-w-md rounded-sm border border-border-strong bg-bg p-5 shadow-lg sm:inset-x-auto sm:right-6 sm:bottom-6"
    >
      <p id="cookie-consent-title" className="font-body text-sm font-medium text-text-primary">
        We use analytics cookies
      </p>
      <p className="mt-2 font-body text-sm leading-relaxed text-muted">
        We&rsquo;d like to use Google Analytics to understand how the site is used. No tracking
        happens until you accept. See our{' '}
        <Link href="/privacy" className="text-accent underline-offset-2 hover:underline">
          privacy notice
        </Link>
        .
      </p>
      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => choose('denied')}
          className="font-body text-sm font-medium text-text-primary transition-colors duration-250 hover:text-accent"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={() => choose('granted')}
          className={cn(
            'ml-auto inline-flex items-center justify-center rounded-sm bg-accent px-5 py-2.5 font-body text-sm font-medium text-white transition-all duration-250 ease-out-expo hover:bg-accent-dark',
          )}
        >
          Accept
        </button>
      </div>
    </div>
  )
}
