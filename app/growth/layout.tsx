import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Growth — Your marketing team | Day One',
  description:
    'Day One Growth is your marketing team. We build your website, run your Google presence, manage your social, track what works, and improve every month. €350/mo. Built for small businesses in Cyprus and Greece.',
  alternates: {
    canonical: 'https://dayone-web.com/growth',
    languages: {
      'en': 'https://dayone-web.com/growth',
      'x-default': 'https://dayone-web.com/growth',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://dayone-web.com/growth',
    title: 'Growth — Your marketing team | Day One',
    description:
      'Day One Growth is your marketing team. We build your website, run your Google presence, manage your social, track what works, and improve every month.',
    images: [
      {
        url: 'https://dayone-web.com/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Day One Growth — Your Marketing Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Growth — Your marketing team | Day One',
    description:
      'Day One Growth is your marketing team. €350/mo. Small businesses in Cyprus and Greece.',
    images: ['https://dayone-web.com/opengraph-image'],
  },
}

export default function GrowthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
