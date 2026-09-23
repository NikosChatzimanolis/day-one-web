// ── components/products/ProductFrame.tsx ──
// The fixed-aspect surface every product mockup sits in, so the three
// products carry equal visual weight whatever shape their UI is. Pure CSS.
// `lazy` adds content-visibility for below-the-fold placements.
import { cn } from '@/lib/utils'

interface ProductFrameProps {
  children: React.ReactNode
  className?: string
  lazy?: boolean
}

export default function ProductFrame({ children, className, lazy = false }: ProductFrameProps) {
  return (
    <div
      data-no-grid
      aria-hidden="true"
      className={cn(
        'pointer-events-none relative aspect-[4/3] w-full select-none overflow-hidden rounded-lg border border-line bg-surface md:aspect-[16/10]',
        lazy && 'lazy-block',
        className
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center p-[5%] sm:p-[6%]">{children}</div>
    </div>
  )
}
