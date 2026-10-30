// ── components/products/ProductRow.tsx ──
// One product, one row (used on /products): text left, mockup right.
import ProductFrame, { type FrameTone } from '@/components/products/ProductFrame'
import ProductText from '@/components/products/ProductText'
import type { ProductCopy } from '@/lib/copy'

interface ProductRowProps {
  product: ProductCopy
  href: string
  mock: React.ReactNode
  learnMore: string
  variant?: 'bleed' | 'center' | 'fill'
  /** Frame tone (Steer passes "steer" for its coloured stage). */
  tone?: FrameTone
  lazy?: boolean
  headingLevel?: 'h2' | 'h3'
  /** Optional second link to the product's own site (see ProductText). */
  siteHref?: string
  siteLabel?: string
}

export default function ProductRow({
  product,
  href,
  mock,
  learnMore,
  variant = 'center',
  tone = 'default',
  lazy = true,
  headingLevel = 'h3',
  siteHref,
  siteLabel,
}: ProductRowProps) {
  return (
    <div className="grid gap-8 py-10 md:py-12 lg:grid-cols-12 lg:items-center lg:gap-10">
      <ProductText
        product={product}
        href={href}
        learnMore={learnMore}
        headingLevel={headingLevel}
        siteHref={siteHref}
        siteLabel={siteLabel}
        className="lg:col-span-4"
      />
      <div className="lg:col-span-7 lg:col-start-6">
        <ProductFrame variant={variant} tone={tone} lazy={lazy} className="aspect-[4/3] md:aspect-[3/2]">
          {mock}
        </ProductFrame>
      </div>
    </div>
  )
}
