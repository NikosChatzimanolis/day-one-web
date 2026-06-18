// ── components/circuit/DrawBorder.tsx ──
// A terracotta border that draws itself on as the fill front passes. An
// absolutely-positioned SVG <rect> overlay sized to its (position:relative)
// parent; pathLength=1 normalizes the perimeter so stroke-dashoffset can reveal
// 0..1 of it from --fill. Drawn OVER the host's existing dull CSS border (which
// stays as the base). Registers with a fill band (default 120px). aria-hidden /
// pointer-events:none — purely decorative.
'use client'

import { cn } from '@/lib/utils'
import { useFill } from './useFill'

export default function DrawBorder({
  radius = 2,
  band = 120,
  className,
}: {
  /** Corner radius in px to match the host (0 for the square number box). */
  radius?: number
  /** Fill band in px over which the border draws on. */
  band?: number
  className?: string
}) {
  const ref = useFill({ band })
  return (
    <svg
      ref={ref}
      className={cn('circuit-drawborder', className)}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <rect x="0" y="0" width="100%" height="100%" rx={radius} pathLength={1} />
    </svg>
  )
}
