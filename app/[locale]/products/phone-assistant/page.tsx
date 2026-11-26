// ── app/products/phone-assistant/page.tsx ──
import type { Metadata } from 'next'
import ProductPage from '@/components/products/ProductPage'
import PhoneAssistantMock from '@/components/products/PhoneAssistantMock'
import PhoneAssistantExtras from '@/components/products/PhoneAssistantExtras'
import { getCopy, type Locale } from '@/lib/copy'
import { setRequestLocale } from '@/lib/copy/request'
import { pageMetadata } from '@/lib/copy/metadata'

type PageProps = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata(locale, getCopy(locale).meta.phoneAssistant, '/products/phone-assistant')
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
