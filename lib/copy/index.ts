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
