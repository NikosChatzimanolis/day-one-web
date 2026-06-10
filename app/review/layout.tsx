import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Leave a review | Day One',
  description:
    'Worked with Day One? Tell us how it went — a couple of minutes helps us improve and helps the next business owner decide.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: 'https://dayone-web.com/review',
    languages: {
      'en': 'https://dayone-web.com/review',
      'x-default': 'https://dayone-web.com/review',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://dayone-web.com/review',
    title: 'Leave a review | Day One',
    description:
      'Worked with Day One? Tell us how it went — a couple of minutes helps us improve and helps the next business owner decide.',
    images: [
      {
        url: 'https://dayone-web.com/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Day One — Leave a review',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leave a review | Day One',
    description: 'Worked with Day One? Tell us how it went.',
    images: ['https://dayone-web.com/opengraph-image'],
  },
}

export default function ReviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
