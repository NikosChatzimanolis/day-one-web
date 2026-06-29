'use client'
// ── lib/analytics.ts ──
// Consent-gated Google Analytics. GA is cookie-based, so it loads ONLY after
// the visitor explicitly accepts (GDPR/ePrivacy — Day One is EU-based). The
// choice is stored in localStorage; nothing loads until then. Measurement ID
// comes from NEXT_PUBLIC_GA_ID — when unset, analytics stays off entirely.

export type Consent = 'granted' | 'denied'

const CONSENT_KEY = 'dayone_consent_v1'
// Day One's own GA4 property. Public by nature (ships to the browser), so it's
// safe as a default — overridable via NEXT_PUBLIC_GA_ID for staging/other envs.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-V016EQ2Y75'

export function getConsent(): Consent | null {
  if (typeof window === 'undefined') return null
  const raw = window.localStorage.getItem(CONSENT_KEY)
  return raw === 'granted' || raw === 'denied' ? raw : null
}

export function setConsent(value: Consent): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(CONSENT_KEY, value)
}

let loaded = false

export function loadAnalytics(): void {
  if (loaded || typeof window === 'undefined' || !GA_ID) return
  if (document.querySelector(`script[data-ga-src="${GA_ID}"]`)) return
  loaded = true

  const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }
  w.dataLayer = w.dataLayer || []
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments)
  }
  w.gtag('js', new Date())
  w.gtag('config', GA_ID, { anonymize_ip: true })

  const s = document.createElement('script')
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  s.async = true
  s.setAttribute('data-ga-src', GA_ID)
  document.head.appendChild(s)
}

export function trackEvent(name: string, props?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  const w = window as unknown as { gtag?: (command: string, name: string, props?: Record<string, unknown>) => void }
  if (typeof w.gtag === 'function') w.gtag('event', name, props)
}
