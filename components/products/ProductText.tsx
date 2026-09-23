// ── components/products/ProductText.tsx ──
// The identical text treatment every product gets, wherever it appears:
// name, two-line description, meta line, link. Keeps the three products at
// equal weight even when their visuals take different shapes.
import Link from 'next/link'
import type { ProductCopy } from '@/lib/copy'

interface ProductTextProps {
  product: ProductCopy
  href: string
  learnMore: string
  headingLevel?: 'h2' | 'h3'
  className?: string
}

export default function ProductText({ product, href, learnMore, headingLevel = 'h3', className }: ProductTextProps) {
  const Heading = headingLevel
  return (
    <div className={className}>
      <Heading className="t-h3 text-text-primary">
        <Link href={href} className="transition-colors duration-250 hover:text-accent">
          {product.name}
        </Link>
      </Heading>
      <p className="measure mt-3 font-body text-base leading-relaxed text-text-secondary">{product.tagline}</p>
      {product.meta && <p className="mt-3 font-body text-sm text-text-tertiary">{product.meta}</p>}
      <Link
        href={href}
        className="group mt-5 inline-flex items-center gap-1.5 font-body text-sm text-accent transition-colors duration-250 hover:text-accent-dark"
      >
        {learnMore}
        <span aria-hidden="true" className="transition-transform duration-250 group-hover:translate-x-0.5">→</span>
      </Link>
    </div>
  )
}
