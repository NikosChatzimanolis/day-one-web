// ── components/products/WindowFrame.tsx ──
// A desktop window around an app screenshot: a chrome bar with the three
// traffic-light dots, then the screen. Static markup; the body keeps a
// 16:10 aspect so the frame sizes from its width alone.
import { cn } from '@/lib/utils'

export default function WindowFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('overflow-hidden rounded-xl border border-line bg-card', className)}>
      <div className="flex h-8 items-center gap-1.5 border-b border-line bg-surface px-3.5">
        <span className="block h-2.5 w-2.5 rounded-full bg-[#E0573F]/70" />
        <span className="block h-2.5 w-2.5 rounded-full bg-[#E0A23F]/60" />
        <span className="block h-2.5 w-2.5 rounded-full bg-[#8FAF7E]/60" />
      </div>
      <div className="relative aspect-[16/10] w-full">{children}</div>
    </div>
  )
}
