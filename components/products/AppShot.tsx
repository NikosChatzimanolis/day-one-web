// ── components/products/AppShot.tsx ──
// Real screenshots of the products, framed to match the CSS panels. Sources
// are demo / seed instances only (fictional data): the CY-Construction demo
// tenant and the attendance app's seed database. Regenerate the files in
// public/products when either UI changes.
import Image from 'next/image'
import { cn } from '@/lib/utils'

export const shots = {
  cyDashboard: '/products/cy-construction-dashboard.jpg',
  attendanceClock: '/products/attendance-clock.png',
} as const

interface ShotProps {
  src: string
  sizes?: string
  priority?: boolean
  className?: string
}

/** Desktop app screen: fills its frame, anchored top-left so the bleed crop
 *  runs off the right and bottom. Decorative (the copy carries the meaning). */
export function DashboardShot({ src, sizes = '(min-width: 1024px) 820px, 100vw', priority = false, className }: ShotProps) {
  return (
    <div className={cn('relative h-full w-full overflow-hidden rounded-md border border-line bg-card', className)}>
      <Image src={src} alt="" fill sizes={sizes} priority={priority} className="object-cover object-left-top" />
    </div>
  )
}

/** Phone screen in a rounded device frame; height-driven, 375:812. */
export function PhoneShot({ src, sizes = '260px', priority = false, className }: ShotProps) {
  return (
    <div
      className={cn('relative h-full overflow-hidden rounded-[1.6rem] border border-border-strong bg-card', className)}
      style={{ aspectRatio: '375 / 812' }}
    >
      <Image src={src} alt="" fill sizes={sizes} priority={priority} className="object-cover object-top" />
    </div>
  )
}
