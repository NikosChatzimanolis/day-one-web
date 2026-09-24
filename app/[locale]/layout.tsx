// ── app/[locale]/layout.tsx ──
// Root layout, once per locale (en unprefixed via proxy.ts, /el, /ru).
import type { Metadata } from 'next'
import { Alex_Brush, Jost, Cormorant_Garamond } from 'next/font/google'
import '../globals.css'
import { notFound } from 'next/navigation'
import CustomCursor from '@/components/ui/CustomCursor'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CookieConsent from '@/components/layout/CookieConsent'
import { JsonLd } from '../jsonld'
import { site, navItems, bookCallHref } from '@/lib/site'
import { getCopy, locales, localizePath, isLocale, defaultLocale, type Locale } from '@/lib/copy'
import { setRequestLocale } from '@/lib/copy/request'

const alexBrush = Alex_Brush({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
})

// Cormorant Garamond: the hero's italic headline line and the closing band.
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  // One file only: the 400 italic carries the hero's second headline line
  // (the mobile LCP element) and the closing band. Every extra face is bytes
  // ahead of that paint on a slow connection.
  weight: ['400'],
  style: ['italic'],
  variable: '--font-cormorant',
  display: 'swap',
  preload: true,
})

const keywords = [
  'technical partner',
  'embedded development team',
  'white-label development for agencies',
  'custom software development',
  'construction operations software',
  'attendance and leave platform',
  'document signing service',
  'Cyprus software studio',
]

type LayoutParams = { params: Promise<{ locale: string }> }

export function generateStaticParams() {
  return (Object.keys(locales) as Locale[]).map((locale) => ({ locale }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: LayoutParams): Promise<Metadata> {
  const { locale: raw } = await params
  const locale: Locale = isLocale(raw) ? raw : defaultLocale
  const c = getCopy(locale)
  const languages: Record<string, string> = {}
  for (const l of Object.keys(locales) as Locale[]) languages[l] = `${site.url}${localizePath('/', l)}`
  languages['x-default'] = site.url
  const ogLocale = { en: 'en_US', el: 'el_GR', ru: 'ru_RU' }[locale]
  return {
    metadataBase: new URL(site.url),
    title: { default: c.meta.home.title, template: '%s | Day One' },
    description: c.meta.home.description,
    keywords,
    authors: [{ name: 'Day One Web Studio', url: site.url }],
    creator: 'Day One Web Studio',
    alternates: { canonical: `${site.url}${localizePath('/', locale)}`, languages },
    openGraph: {
      type: 'website',
      locale: ogLocale,
      url: `${site.url}${localizePath('/', locale)}`,
      siteName: 'Day One',
      title: c.meta.home.title,
      description: c.meta.home.description,
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: c.meta.home.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: c.meta.home.title,
      description: c.meta.home.description,
      images: ['/opengraph-image'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  }
}

export default async function RootLayout({ children, params }: { children: React.ReactNode } & LayoutParams) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale: Locale = raw
  setRequestLocale(locale)
  const c = getCopy(locale)
  const usesCalendar = Boolean(site.bookingUrl)
  return (
    <html
      lang={locale}
      className={`${alexBrush.variable} ${jost.variable} ${cormorant.variable}`}
    >
      <body className="font-body bg-bg text-text-primary antialiased">
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'Day One Web Studio',
            url: site.url,
            description: c.meta.home.description,
            email: site.email,
            telephone: site.phoneHref,
            address: { '@type': 'PostalAddress', addressLocality: 'Paphos', addressCountry: 'CY' },
            founder: { '@type': 'Person', name: 'Nikolaos Chatzimanolis' },
            serviceType: ['Embedded Development Teams', 'White-label Engineering', 'Custom Software Development', 'Software Products', 'Security and GDPR Review'],
          }}
        />
        <CustomCursor />
        <Navbar
          locale={locale}
          items={navItems.map((item) => ({ label: c.nav[item.key], href: localizePath(item.href, locale) }))}
          bookCall={{
            label: c.nav.bookCall,
            href: usesCalendar ? site.bookingUrl : localizePath(bookCallHref, locale),
            external: usesCalendar,
          }}
          labels={{ menuOpen: c.nav.menuOpen, menuClose: c.nav.menuClose, home: c.nav.home }}
        />
        <main id="main">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}
