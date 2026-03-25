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
  title: 'Day One — Website Studio for Small Businesses in Cyprus & Greece',
  description:
    'We design and build fast, professional websites for small businesses in Cyprus and Greece — then stay available as you grow. From €350. Free mockup before you decide.',
  keywords: [
    'website design Cyprus',
    'website development Greece',
    'small business website',
    'web studio Cyprus',
    'professional website Cyprus',
    'website Cyprus',
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
    title: 'Day One — Website Studio for Small Businesses in Cyprus & Greece',
    description:
      'Fast, professional websites for small businesses in Cyprus and Greece. Free mockup before you decide. From €350.',
    images: [
      {
        url: 'https://dayone-web.com/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Day One — Website Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Day One — Website Studio for Cyprus & Greece',
    description: 'Fast, professional websites for small businesses. Free mockup before you decide.',
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
