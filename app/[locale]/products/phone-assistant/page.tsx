// ── app/products/phone-assistant/page.tsx ──
import type { Metadata } from 'next'
import ProductPage from '@/components/products/ProductPage'
import PhoneAssistantMock from '@/components/products/PhoneAssistantMock'
import PhoneAssistantExtras from '@/components/products/PhoneAssistantExtras'
import { getCopy, localizePath, type Locale } from '@/lib/copy'
import { setRequestLocale } from '@/lib/copy/request'
import { pageMetadata } from '@/lib/copy/metadata'
import { site } from '@/lib/site'

type PageProps = { params: Promise<{ locale: Locale }> }

// The link to this page is what prospects are sent on WhatsApp and by email,
// so it unfolds into its own picture: the share card for the reader's
// language (public/share, drawn by scripts/share-cards). The file name
// carries a version because WhatsApp and the image CDN cache by address.
const shareImage = (locale: Locale) => `/share/phone-assistant-${locale}-og-v1.jpg`

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const meta = getCopy(locale).meta.phoneAssistant
  const base = pageMetadata(locale, meta, '/products/phone-assistant')
  const image = { url: shareImage(locale), width: 1200, height: 630, alt: meta.title }
  return {
    ...base,
    openGraph: {
      type: 'website',
      siteName: site.name,
      title: meta.title,
      description: meta.description,
      url: `${site.url}${localizePath('/products/phone-assistant', locale)}`,
      images: [image],
    },
    twitter: { card: 'summary_large_image', title: meta.title, description: meta.description, images: [image.url] },
  }
}

export default async function PhoneAssistantPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  const products = getCopy(locale).products
  return (
    <ProductPage
      product={products.phoneAssistant}
      mock={<PhoneAssistantMock />}
      siteHref="#demo"
      siteLabel={products.common.tryDemo}
      extra={<PhoneAssistantExtras />}
    />
  )
}
