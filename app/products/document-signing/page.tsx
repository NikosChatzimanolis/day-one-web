// ── app/products/document-signing/page.tsx ──
import type { Metadata } from 'next'
import ProductPage from '@/components/products/ProductPage'
import SigningMock from '@/components/products/SigningMock'
import { copy } from '@/lib/copy'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: copy.meta.documentSigning.title,
  description: copy.meta.documentSigning.description,
  alternates: { canonical: `${site.url}/products/document-signing` },
}

export default function DocumentSigningPage() {
  return <ProductPage product={copy.products.documentSigning} mock={<SigningMock />} />
}
