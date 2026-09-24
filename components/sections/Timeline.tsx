// ── components/sections/Timeline.tsx ──
// The Build → Scale → Maintain line: three rust nodes on a hairline, labels
// beneath. `animate` draws the rail and pops the nodes on mount (hero);
// the closing band renders it settled.
import { cn } from '@/lib/utils'

interface TimelineProps {
  labels: readonly [string, string, string]
  tone?: 'light' | 'dark'
  animate?: boolean
  className?: string
}

const delays = ['0.15s', '0.4s', '0.65s']

export default function Timeline({ labels, tone = 'dark', animate = false, className }: TimelineProps) {
  const dark = tone === 'dark'
  const align = ['items-start', 'items-center', 'items-end'] as const
  return (
    <div className={cn('relative', animate && 'tl-animate', className)} aria-hidden="true">
      {/* the rail, running through the centre of the nodes */}
      <span
        className={cn(
          'tl-line absolute left-[5px] right-[5px] top-[5px] h-px',
          'bg-rust'
        )}
      />
      <div className="relative flex justify-between">
        {labels.map((label, i) => (
          <span key={label} className={cn('flex flex-col gap-3', align[i])}>
            <span
              className={cn(
                'tl-node block h-[11px] w-[11px] rounded-full border border-rust',
                dark ? 'bg-dark' : 'bg-bg'
              )}
              style={animate ? { animationDelay: delays[i] } : undefined}
            />
            <span
              className={cn(
                'font-body text-[0.8125rem] tracking-wide',
                dark ? 'text-dark-text-secondary' : 'text-text-secondary'
              )}
            >
              {label}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
