// ── components/products/ProductText.tsx ──
// The identical text treatment every product gets, wherever it appears:
// name, two-line description, meta line, link. Keeps the products at equal
// weight even when their visuals take different shapes. A product with its
// own site (Steer) can add a second link to it, opening in a new tab.
import Link from 'next/link'
import type { ProductCopy } from '@/lib/copy'

interface ProductTextProps {
  product: ProductCopy
  href: string
  learnMore: string
  headingLevel?: 'h2' | 'h3'
  className?: string
  /** External site of the product. Needs siteLabel. */
  siteHref?: string
  siteLabel?: string
}

export default function ProductText({
  product,
  href,
  learnMore,
  headingLevel = 'h3',
  className,
  siteHref,
  siteLabel,
}: ProductTextProps) {
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
      {siteHref && siteLabel && (
        <a
          href={siteHref}
          target="_blank"
          rel="noopener noreferrer"
          className="group ml-6 mt-5 inline-flex items-center gap-1.5 font-body text-sm text-accent transition-colors duration-250 hover:text-accent-dark"
        >
          {siteLabel}
          <span aria-hidden="true" className="transition-transform duration-250 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
        </a>
      )}
    </div>
  )
}
