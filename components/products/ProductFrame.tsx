// ── components/products/ProductFrame.tsx ──
// The panel every mockup sits in. Three placements:
//   bleed  → the mock is inset top-left and runs off the right and bottom
//            edges (dashboards: the frame crops it, nothing floats)
//   center → the mock is centred with a small margin (phones, cards)
//   fill   → the mock covers the panel edge to edge
// Pure CSS. `lazy` adds content-visibility for below-the-fold placements.
import { cn } from '@/lib/utils'

type Variant = 'bleed' | 'center' | 'fill'

interface ProductFrameProps {
  children: React.ReactNode
  /** Aspect and any sizing for the outer panel. */
  className?: string
  variant?: Variant
  lazy?: boolean
}

const inner: Record<Variant, string> = {
  bleed: 'absolute left-[6%] top-[8%] h-[104%] w-[104%]',
  center: 'absolute inset-0 flex items-center justify-center p-[6%]',
  fill: 'absolute inset-0',
}

export default function ProductFrame({ children, className, variant = 'center', lazy = false }: ProductFrameProps) {
  return (
    <div
      data-no-grid
      aria-hidden="true"
      className={cn(
        'pointer-events-none relative w-full select-none overflow-hidden rounded-lg border border-line bg-surface',
        !className?.includes('aspect-') && 'aspect-[4/3] md:aspect-[16/10]',
        lazy && 'lazy-block',
        className
      )}
    >
      <div className={inner[variant]}>{children}</div>
    </div>
  )
}
