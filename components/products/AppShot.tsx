// ── components/products/AppShot.tsx ──
// Real screenshots of the products, framed to match the CSS panels. Sources
// are demo / seed instances only (fictional data): the CY-Construction demo
// tenant and the attendance app's seed database. Regenerate the files in
// public/products when either UI changes.
import Image from 'next/image'
import { cn } from '@/lib/utils'

export const shots = {
  cyDashboard: '/products/cy-construction-dashboard-v2.jpg',
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

/** Phone in a device frame: dark bezel, side buttons, status bar with the
 *  island, then the app screen (375 x 726, tab bar at the bottom). Width or
 *  height driven via className; everything inside scales with it (cqw). */
export function PhoneShot({ src, sizes = '280px', priority = false, className }: ShotProps) {
  return (
    <div
      className={cn('relative h-full aspect-[387/782] bg-[#1A1816] p-[1.6%]', className)}
      style={{ borderRadius: '12% / 5.9%', containerType: 'inline-size' }}
    >
      {/* side buttons */}
      <span aria-hidden="true" className="absolute -left-[1.1%] top-[15%] h-[3.2%] w-[1.1%] rounded-l-[2px] bg-[#1A1816]" />
      <span aria-hidden="true" className="absolute -left-[1.1%] top-[20.5%] h-[5.5%] w-[1.1%] rounded-l-[2px] bg-[#1A1816]" />
      <span aria-hidden="true" className="absolute -left-[1.1%] top-[27.5%] h-[5.5%] w-[1.1%] rounded-l-[2px] bg-[#1A1816]" />
      <span aria-hidden="true" className="absolute -right-[1.1%] top-[22%] h-[8.5%] w-[1.1%] rounded-r-[2px] bg-[#1A1816]" />

      <div className="relative flex h-full w-full flex-col overflow-hidden bg-[#F5F6EF]" style={{ borderRadius: '10.8% / 5.3%' }}>
        {/* status bar */}
        <div className="flex h-[5.7%] shrink-0 items-center justify-between px-[7%] text-[#1F1F1F]" style={{ fontSize: '3.6cqw' }}>
          <span className="font-body font-medium tabular-nums">17:36</span>
          <span className="flex items-center" style={{ gap: '1.6cqw' }}>
            <span className="flex items-end" style={{ gap: '0.6cqw' }}>
              <span className="block bg-[#1F1F1F]" style={{ width: '0.9cqw', height: '1.4cqw', borderRadius: '0.3cqw' }} />
              <span className="block bg-[#1F1F1F]" style={{ width: '0.9cqw', height: '2cqw', borderRadius: '0.3cqw' }} />
              <span className="block bg-[#1F1F1F]" style={{ width: '0.9cqw', height: '2.6cqw', borderRadius: '0.3cqw' }} />
              <span className="block bg-[#1F1F1F]" style={{ width: '0.9cqw', height: '3.2cqw', borderRadius: '0.3cqw' }} />
            </span>
            <span
              className="relative block border border-[#1F1F1F]"
              style={{ width: '6.4cqw', height: '3.1cqw', borderRadius: '0.9cqw', padding: '0.5cqw' }}
            >
              <span className="block h-full w-[78%] bg-[#1F1F1F]" style={{ borderRadius: '0.4cqw' }} />
            </span>
          </span>
        </div>
        {/* island */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-[1.5%] h-[3.3%] w-[27%] -translate-x-1/2 rounded-full bg-[#1A1816]"
        />
        {/* screen */}
        <div className="relative min-h-0 flex-1">
          <Image src={src} alt="" fill sizes={sizes} priority={priority} className="object-cover object-top" />
        </div>
      </div>
    </div>
  )
}
