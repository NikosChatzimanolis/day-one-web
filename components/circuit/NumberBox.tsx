// ── components/circuit/NumberBox.tsx ──
// A numeral in a bordered box. Dull base (CSS border + dull digits); as the fill
// front passes, the border draws on (DrawBorder) and the digits fill terracotta
// (FillText). Its own primitive so the two fill behaviors compose in one place.
'use client'

import { cn } from '@/lib/utils'
import DrawBorder from './DrawBorder'
import FillText from './FillText'

export default function NumberBox({
  children,
  tone = 'light',
  className,
}: {
  children: React.ReactNode
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <span
      className={cn(
        'circuit-numbox t-index',
        tone === 'dark' ? 'text-dark-text-secondary' : 'text-muted',
        className,
      )}
    >
      <DrawBorder radius={0} band={100} />
      <FillText>{children}</FillText>
    </span>
  )
}
