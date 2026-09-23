// ── app/products/cy-construction/page.tsx ──
import type { Metadata } from 'next'
import ProductPage from '@/components/products/ProductPage'
import CyConstructionMock from '@/components/products/CyConstructionMock'
import { copy } from '@/lib/copy'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: copy.meta.cyConstruction.title,
  description: copy.meta.cyConstruction.description,
  alternates: { canonical: `${site.url}/products/cy-construction` },
}

export default function CyConstructionPage() {
  return <ProductPage product={copy.products.cyConstruction} mock={<CyConstructionMock />} frameVariant="bleed" />
}
