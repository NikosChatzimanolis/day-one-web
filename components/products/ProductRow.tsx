// ── components/products/ProductRow.tsx ──
// One product, one row (used on /products): text left, mockup right.
import ProductFrame from '@/components/products/ProductFrame'
import ProductText from '@/components/products/ProductText'
import type { ProductCopy } from '@/lib/copy'

interface ProductRowProps {
  product: ProductCopy
  href: string
  mock: React.ReactNode
  learnMore: string
  variant?: 'bleed' | 'center' | 'fill'
  lazy?: boolean
  headingLevel?: 'h2' | 'h3'
}

export default function ProductRow({
  product,
  href,
  mock,
  learnMore,
  variant = 'center',
  lazy = true,
  headingLevel = 'h3',
}: ProductRowProps) {
  return (
    <div className="grid gap-8 py-10 md:py-12 lg:grid-cols-12 lg:items-center lg:gap-10">
      <ProductText product={product} href={href} learnMore={learnMore} headingLevel={headingLevel} className="lg:col-span-4" />
      <div className="lg:col-span-7 lg:col-start-6">
        <ProductFrame variant={variant} lazy={lazy} className="aspect-[4/3] md:aspect-[3/2]">
          {mock}
        </ProductFrame>
      </div>
    </div>
  )
}
