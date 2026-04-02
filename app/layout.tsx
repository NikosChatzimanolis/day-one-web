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

export const metadata: Metadata = {
  title: 'Day One — Web Development, Maintenance & Social Media | Cyprus & Greece',
  description:
    'Web development, website maintenance, and social media management for businesses in Cyprus and Greece. We build, maintain, and grow your online presence. Live in days, not months.',
  keywords: [
    'web development Cyprus',
    'web development Greece',
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
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dayone-web.com',
    siteName: 'Day One',
    title: 'Day One — Web Development, Maintenance & Social Media | Cyprus & Greece',
    description:
      'Web development, website maintenance, and social media management in Cyprus and Greece. We build, maintain, and grow your online presence. Live in days, not months.',
    images: [
      {
        url: 'https://dayone-web.com/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Day One — Web Development, Maintenance & Social Media',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Day One — Web Development, Maintenance & Social Media | Cyprus & Greece',
    description: 'Web development, website maintenance, and social media management in Cyprus & Greece. Live in days, not months.',
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
