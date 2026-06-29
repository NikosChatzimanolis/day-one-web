// ── app/layout.tsx ──
import type { Metadata } from 'next'
import { Alex_Brush, Jost, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/ui/CustomCursor'
import ReactiveGrid from '@/components/ui/ReactiveGrid'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CookieConsent from '@/components/layout/CookieConsent'
import { JsonLd } from './jsonld'
import { site } from '@/lib/site'

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

// Astrala Advisory's own brand serif — used ONLY inside the Astrala case-study
// brand mockup so it reads as their real system, not Day One's. preload:false
// keeps it off every other route (it's only needed on /work).
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
  preload: false,
})

const siteTitle = 'Day One — A technical partner that ships like a founder'
const siteDescription =
  'Day One builds the systems funded startups and scale-ups run on. One team, from build to scale to maintain. We stay past launch.'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: siteTitle,
    template: '%s — Day One',
  },
  description: siteDescription,
  keywords: [
    'technical partner for startups',
    'custom software development',
    'web platforms',
    'product engineering studio',
    'startup development partner',
    'scale-up engineering',
    'Next.js development studio',
    'Cyprus software studio',
  ],
  authors: [{ name: 'Day One Web Studio', url: site.url }],
  creator: 'Day One Web Studio',
  alternates: { canonical: site.url },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    siteName: 'Day One',
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Day One — A technical partner that ships like a founder',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${alexBrush.variable} ${jost.variable} ${cormorant.variable}`}
    >
      <body className="font-body bg-bg text-text-primary antialiased">
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'Day One Web Studio',
            url: site.url,
            description: siteDescription,
            email: site.email,
            telephone: site.phoneHref,
            address: { '@type': 'PostalAddress', addressLocality: 'Paphos', addressCountry: 'CY' },
            founder: { '@type': 'Person', name: 'Nikolaos Chatzimanolis' },
            serviceType: ['Custom Software Development', 'Web Platforms', 'Product Engineering', 'Growth Partnership'],
          }}
        />
        <ReactiveGrid />
        <CustomCursor />
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  )
}
