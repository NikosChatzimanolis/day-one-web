// ── components/circuit/NumberBox.tsx ──
// A numeral wrapped in a dull bordered box. Static + dull in Phase 1; the border
// and digits become fillable (DrawBorder + FillText) in Phase 3, which is why it
// is its own primitive rather than an inline span.
import { cn } from '@/lib/utils'

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
      {children}
    </span>
  )
}
