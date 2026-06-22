// ── components/ui/BuiltByDayOne.tsx ──
// The attribution mark. ALWAYS primary variant colors (rust #C04C2A,
// near-black #1A1816, warm gray #9A8F82) on a cream surface — never
// theme-swapped, regardless of where it sits.
import { cn } from '@/lib/utils'
import Logo from '@/components/ui/Logo'

export default function BuiltByDayOne({ className }: { className?: string }) {
  return (
    <span
      data-no-grid
      className={cn(
        'inline-flex items-center gap-3 rounded-md bg-[#F5F0EA] border border-[rgba(192,76,42,0.18)] px-4 py-3',
        className
      )}
    >
      <span className="font-body text-[0.625rem] font-medium uppercase tracking-[0.22em] text-[#9A8F82] leading-none">
        Built by
      </span>
      <Logo variant="primary" size="sm" showTagline={false} />
    </span>
  )
}
