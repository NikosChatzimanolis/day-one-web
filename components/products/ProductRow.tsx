// ── components/products/ProductRow.tsx ──
// One product, one row: name, two-line description, meta line and link on the
// left; the mockup in its fixed-aspect frame on the right. Shared by the
// homepage PRODUCTS section and the /products index so the three products
// always carry equal weight.
import Link from 'next/link'
import ProductFrame from '@/components/products/ProductFrame'
import type { ProductCopy } from '@/lib/copy'

interface ProductRowProps {
  product: ProductCopy
  href: string
  mock: React.ReactNode
  learnMore: string
  /** Below the fold: defer layout/paint of the mockup. */
  lazy?: boolean
  headingLevel?: 'h2' | 'h3'
}

export default function ProductRow({ product, href, mock, learnMore, lazy = true, headingLevel = 'h3' }: ProductRowProps) {
  const Heading = headingLevel
  return (
    <div className="grid gap-8 py-12 md:py-14 lg:grid-cols-12 lg:items-center lg:gap-10">
      <div className="lg:col-span-4">
        <Heading className="t-h3 text-text-primary">
          <Link href={href} className="transition-colors duration-250 hover:text-accent">
            {product.name}
          </Link>
        </Heading>
        <p className="measure mt-4 font-body text-base leading-relaxed text-text-secondary">{product.tagline}</p>
        {product.meta && (
          <p className="mt-4 font-body text-sm text-text-tertiary">{product.meta}</p>
        )}
        <Link
          href={href}
          className="group mt-6 inline-flex items-center gap-1.5 font-body text-sm text-accent transition-colors duration-250 hover:text-accent-dark"
        >
          {learnMore}
          <span aria-hidden="true" className="transition-transform duration-250 group-hover:translate-x-0.5">→</span>
        </Link>
      </div>
      <div className="lg:col-span-7 lg:col-start-6">
        <ProductFrame lazy={lazy}>{mock}</ProductFrame>
      </div>
    </div>
  )
}
