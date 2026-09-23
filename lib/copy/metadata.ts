// ── lib/copy/metadata.ts ──
// Per-locale page metadata: title, description, canonical for this locale,
// and hreflang alternates for all three (x-default = English).
import type { Metadata } from 'next'
import { site } from '@/lib/site'
import { locales, localizePath, defaultLocale, type Locale } from '@/lib/copy'

export function pageMetadata(
  locale: Locale,
  meta: { title: string; description: string },
  path: string
): Metadata {
  const languages: Record<string, string> = {}
  for (const l of Object.keys(locales) as Locale[]) languages[l] = `${site.url}${localizePath(path, l)}`
  languages['x-default'] = `${site.url}${localizePath(path, defaultLocale)}`
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `${site.url}${localizePath(path, locale)}`, languages },
  }
}
