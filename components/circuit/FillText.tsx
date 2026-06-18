// ── components/circuit/FillText.tsx ──
// Renders text twice: a dull base (inherits the surrounding dull color) and a
// terracotta copy stacked exactly on top, revealed bottom-up by a vertical
// clip-path driven by --fill. Registers with a fill band so short text eases
// across a small travel. Decorative: the base copy carries the real text; the
// terracotta overlay is aria-hidden.
'use client'

import { cn } from '@/lib/utils'
import { useFill } from './useFill'

export default function FillText({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const ref = useFill({ band: 80 })
  return (
    <span ref={ref} className={cn('circuit-filltext', className)}>
      <span className="circuit-filltext-base">{children}</span>
      <span aria-hidden="true" className="circuit-filltext-fill">
        {children}
      </span>
    </span>
  )
}
