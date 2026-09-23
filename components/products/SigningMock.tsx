// ── components/products/SigningMock.tsx ──
// Document signing: a document card with a four-step rail (Upload, Sign,
// Review, Complete) and a rust "Sign document" button. Placeholder document,
// placeholder initials. `compact` is the small-panel version used on the
// homepage; the default fills a product-page frame.
import { cn } from '@/lib/utils'

const steps = [
  { label: 'Upload', state: 'done' },
  { label: 'Sign', state: 'active' },
  { label: 'Review', state: 'todo' },
  { label: 'Complete', state: 'todo' },
] as const

const lines = ['w-[86%]', 'w-[72%]', 'w-[80%]', 'w-[58%]', 'w-[66%]']

export default function SigningMock({ compact = false }: { compact?: boolean }) {
  const previewLines = compact ? lines.slice(0, 3) : lines
  return (
    <div
      className={cn(
        'w-full rounded-md border border-line bg-card leading-none',
        compact ? 'max-w-[300px] p-3 text-[10px]' : 'max-w-[480px] p-4 text-[11px] sm:p-5 sm:text-[12px]'
      )}
    >
      <div className="flex items-center justify-between">
        <span className={cn('font-display text-text-primary', compact ? 'text-[11px]' : 'text-[12px] sm:text-[13px]')}>
          Sign document
        </span>
        {!compact && <span className="rounded border border-line px-1.5 py-1 text-text-tertiary">1 of 1</span>}
      </div>

      <div className={cn('grid grid-cols-[1.3fr_1fr]', compact ? 'mt-2.5 gap-2.5' : 'mt-3 gap-3 sm:gap-4')}>
        {/* document preview */}
        <div className={cn('rounded-[3px] border border-line bg-bg', compact ? 'p-2.5' : 'p-3 sm:p-4')}>
          <span className="block text-text-primary">Service Agreement</span>
          {!compact && <span className="mt-1 block text-text-tertiary">Document A · 2 pages</span>}
          <div className={cn('flex flex-col', compact ? 'mt-2.5 gap-1.5' : 'mt-3 gap-1.5')}>
            {previewLines.map((w, i) => (
              <span key={i} className={cn('block h-1 rounded-full bg-surface-deep', w)} />
            ))}
          </div>
          <div className={cn('border-t border-dashed border-border-strong', compact ? 'mt-3 pt-2' : 'mt-4 pt-2')}>
            <span className="block text-text-tertiary">Signature</span>
            <span
              className={cn(
                'mt-1 block font-script leading-none text-text-primary',
                compact ? 'text-[18px]' : 'text-[22px] sm:text-[26px]'
              )}
            >
              A. B.
            </span>
          </div>
        </div>

        {/* step rail */}
        <div className="flex flex-col justify-between">
          <ol className={cn('relative flex flex-col', compact ? 'gap-2' : 'gap-3')}>
            <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-line" />
            {steps.map((s, i) => (
              <li key={s.label} className="relative flex items-center gap-2">
                <span
                  className={cn(
                    'z-10 flex h-[15px] w-[15px] items-center justify-center rounded-full border text-[8px] tabular-nums',
                    s.state === 'todo'
                      ? 'border-border-strong bg-card text-text-tertiary'
                      : 'border-rust bg-rust text-bg'
                  )}
                >
                  {i + 1}
                </span>
                <span className={s.state === 'todo' ? 'text-text-tertiary' : 'text-text-primary'}>{s.label}</span>
              </li>
            ))}
          </ol>
          <span className={cn('block rounded-full bg-rust text-center font-medium text-bg', compact ? 'mt-3 py-1.5' : 'mt-4 py-1.5')}>
            Sign document
          </span>
        </div>
      </div>
    </div>
  )
}
