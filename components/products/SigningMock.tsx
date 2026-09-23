// ── components/products/SigningMock.tsx ──
// Document signing: a document card with a four-step rail (Upload, Sign,
// Review, Complete) and a rust "Sign document" button. Placeholder document,
// placeholder initials.
import { cn } from '@/lib/utils'

const steps = [
  { label: 'Upload', state: 'done' },
  { label: 'Sign', state: 'active' },
  { label: 'Review', state: 'todo' },
  { label: 'Complete', state: 'todo' },
] as const

const lines = ['w-[86%]', 'w-[72%]', 'w-[80%]', 'w-[58%]', 'w-[66%]']

export default function SigningMock() {
  return (
    <div className="w-[92%] max-w-[460px] rounded-md border border-line bg-card p-3.5 text-[10px] leading-none sm:p-5 sm:text-[11px]">
      <div className="flex items-center justify-between">
        <span className="font-display text-[12px] text-text-primary sm:text-[13px]">Sign document</span>
        <span className="rounded border border-line px-1.5 py-1 text-text-tertiary">1 of 1</span>
      </div>

      <div className="mt-3 grid grid-cols-[1.35fr_1fr] gap-3 sm:gap-4">
        {/* document preview */}
        <div className="rounded-[3px] border border-line bg-bg p-3 sm:p-4">
          <span className="block text-text-primary">Service Agreement</span>
          <span className="mt-1 block text-text-tertiary">Document A · 2 pages</span>
          <div className="mt-3 flex flex-col gap-1.5">
            {lines.map((w, i) => (
              <span key={i} className={cn('block h-1 rounded-full bg-surface-deep', w)} />
            ))}
          </div>
          <div className="mt-4 border-t border-dashed border-border-strong pt-2">
            <span className="block text-text-tertiary">Signature</span>
            <span className="mt-1 block font-script text-[18px] leading-none text-text-primary sm:text-[22px]">
              A. B.
            </span>
          </div>
        </div>

        {/* step rail */}
        <div className="flex flex-col justify-between">
          <ol className="relative flex flex-col gap-3">
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
          <span className="mt-4 block rounded-full bg-rust py-1.5 text-center font-medium text-bg">Sign document</span>
        </div>
      </div>
    </div>
  )
}
