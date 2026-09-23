// ── lib/copy/request.ts ──
// Request-scoped locale for server components, so deep components (footer,
// CTA band, home sections) can read the right dictionary without every
// parent threading a prop. React's cache() is per render request, including
// each page's static generation at build time. The [locale] layout and every
// page call setRequestLocale() first (layouts and pages can render in
// parallel, so both set it). Server components only: client components get
// their strings as props.
import { cache } from 'react'
import { getCopy, defaultLocale, localizePath, type Locale, type Copy } from '@/lib/copy'

const requestLocale = cache(() => ({ locale: defaultLocale as Locale }))

export function setRequestLocale(locale: Locale): void {
  requestLocale().locale = locale
}

export function getRequestLocale(): Locale {
  return requestLocale().locale
}

/** The dictionary for the current request's locale. */
export function t(): Copy {
  return getCopy(getRequestLocale())
}

/** An internal path with the current locale's prefix (none for English). */
export function localeHref(path: string): string {
  return localizePath(path, getRequestLocale())
}
