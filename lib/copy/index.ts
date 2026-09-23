// ── lib/copy/index.ts ──
// The site renders English today (there is no locale routing in this repo).
// Every new string is still keyed here so EL and RU ship alongside EN and a
// locale switch can be added later without touching page code. Pages import
// `copy`; `getCopy(locale)` is the seam a future locale layer plugs into.
import { en, type Copy, type ProductCopy } from './en'
import { el } from './el'
import { ru } from './ru'

export type { Copy, ProductCopy }

export const locales = { en, el, ru } as const
export type Locale = keyof typeof locales
export const defaultLocale: Locale = 'en'

export const copy: Copy = en

export function getCopy(locale: Locale = defaultLocale): Copy {
  return locales[locale]
}

// ── Locale-aware paths ─────────────────────────────────────────────────────
// English is served unprefixed (/partner); Greek and Russian carry a prefix
// (/el/partner, /ru/partner). proxy.ts rewrites unprefixed requests to the
// /en segment internally so page files live once under app/[locale]/.
export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(locales, value)
}

export function localizePath(path: string, locale: Locale): string {
  if (locale === defaultLocale) return path
  if (path === '/' || path === '') return `/${locale}`
  return `/${locale}${path}`
}

export function stripLocale(pathname: string): { locale: Locale; path: string } {
  const m = pathname.match(/^\/(el|ru)(?=\/|$)/)
  if (m) return { locale: m[1] as Locale, path: pathname.slice(m[0].length) || '/' }
  return { locale: defaultLocale, path: pathname || '/' }
}

export const localeLabels: Record<Locale, string> = { en: 'EN', el: 'EL', ru: 'RU' }
