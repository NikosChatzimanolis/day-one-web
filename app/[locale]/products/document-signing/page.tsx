// ── app/products/document-signing/page.tsx ──
import type { Metadata } from 'next'
import ProductPage from '@/components/products/ProductPage'
import SigningMock from '@/components/products/SigningMock'
import { getCopy, type Locale } from '@/lib/copy'
import { setRequestLocale } from '@/lib/copy/request'
import { pageMetadata } from '@/lib/copy/metadata'

type PageProps = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  return pageMetadata(locale, getCopy(locale).meta.documentSigning, '/products/document-signing')
}

export default async function DocumentSigningPage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ProductPage product={getCopy(locale).products.documentSigning} mock={<SigningMock />} />
}
