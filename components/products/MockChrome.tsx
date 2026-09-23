// ── components/products/MockChrome.tsx ──
// The thin browser-style bar on top of the app mockups: three muted dots and
// a blank address pill. Static markup, no motion.
export default function MockChrome({ label }: { label?: string }) {
  return (
    <div className="flex shrink-0 items-center gap-2 border-b border-line bg-surface px-3 py-2">
      <span className="flex gap-1">
        <span className="block h-2 w-2 rounded-full bg-surface-deep" />
        <span className="block h-2 w-2 rounded-full bg-surface-deep" />
        <span className="block h-2 w-2 rounded-full bg-surface-deep" />
      </span>
      <span className="mx-2 flex h-4 flex-1 items-center justify-center rounded-sm bg-bg text-[9px] text-text-tertiary">
        {label}
      </span>
    </div>
  )
}
