// ── components/products/ProductText.tsx ──
// The identical text treatment every product gets, wherever it appears:
// name, one line on what it does (in full ink, so it reads), the meta as
// chips, and its links as buttons. Keeps the products at equal weight even
// when their visuals take different shapes. A product with its own site or
// demo (Steer, the phone assistant) adds a second button to it, opening in a
// new tab.
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
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

/** A meta line ("Web + mobile · English, Greek") as its parts. */
export const metaParts = (meta: string) => meta.split(' · ').map((s) => s.trim().replace(/\.$/, '')).filter(Boolean)

export function MetaChips({ meta, className }: { meta: string; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className ?? ''}`}>
      {metaParts(meta).map((part) => (
        <li key={part} className="rounded-full border border-border-strong bg-card px-3 py-1 font-body text-[13px] leading-snug text-text-primary">
          {part}
        </li>
      ))}
    </ul>
  )
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
      <Heading className="font-display text-[clamp(1.6rem,2.3vw,2.1rem)] font-normal leading-[1.15] text-text-primary">
        <Link href={href} className="transition-colors duration-250 hover:text-accent">
          {product.name}
        </Link>
      </Heading>
      <p className="measure mt-3 font-body text-lg leading-relaxed text-text-primary">{product.tagline}</p>
      {product.meta && <MetaChips meta={product.meta} className="mt-5" />}
      <div className="mt-7 flex flex-wrap items-center gap-3">
        <Button href={href} size="md" arrow>
          {learnMore}
        </Button>
        {siteHref && siteLabel && (
          <Button href={siteHref} external variant="outline" size="md">
            {siteLabel} <span aria-hidden="true">↗</span>
          </Button>
        )}
      </div>
    </div>
  )
}
