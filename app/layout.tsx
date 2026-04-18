// ── app/layout.tsx ──
import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans, Alex_Brush, Jost } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/ui/CustomCursor'
import LanguageProvider from '@/context/LanguageContext'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
})

const alexBrush = Alex_Brush({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-script',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-jost',
  display: 'swap',
})

const siteTitle = 'Day One — Websites & Your Marketing Team | Cyprus & Greece'
const siteDescription =
  'Day One builds your website and becomes your marketing team. We run your Google presence, manage your social, track what works, and improve every month. Built for small businesses in Cyprus and Greece. From €550 one-time, or €350/mo for your full marketing team.'

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: [
    'web development Cyprus',
    'web development Greece',
    'marketing team Cyprus',
    'marketing team Greece',
    'website maintenance Cyprus',
    'website maintenance Greece',
    'social media management Cyprus',
    'social media management Greece',
    'website design Cyprus',
    'small business website Cyprus',
    'web agency Cyprus',
    'social media marketing Cyprus',
    'website support Cyprus',
    'ongoing website maintenance',
    'digital marketing Cyprus',
    'web development Paphos',
    'social media Paphos',
  ],
  authors: [{ name: 'Day One Studio', url: 'https://dayone-web.com' }],
  creator: 'Day One Studio',
  alternates: {
    canonical: 'https://dayone-web.com',
    languages: {
      'en': 'https://dayone-web.com',
      'x-default': 'https://dayone-web.com',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dayone-web.com',
    siteName: 'Day One',
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: 'https://dayone-web.com/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Day One — Websites & Your Marketing Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['https://dayone-web.com/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} ${alexBrush.variable} ${jost.variable}`}
    >
      <body className="font-body bg-bg text-text-primary antialiased">
        <LanguageProvider>
          <CustomCursor />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
