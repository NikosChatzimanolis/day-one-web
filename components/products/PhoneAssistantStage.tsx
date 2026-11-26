// ── components/products/PhoneAssistantStage.tsx ──
// The phone assistant page's hero visual: the phone on a call in the middle
// of its panel, a warm glow and two widening rings behind it (sound leaving
// the phone), and three small cards drifting around it that say what the
// call produces: the notice, the calendar entry, the languages. The cards
// are hidden on small screens, where the phone needs the room. Placeholder
// data only. Goes inside ProductFrame variant="fill".
import { Bell, CalendarCheck, Languages } from 'lucide-react'
import PhoneAssistantMock from '@/components/products/PhoneAssistantMock'

const card =
  'absolute hidden items-center gap-3 rounded-2xl border border-line bg-card px-4 py-3 shadow-[0_18px_40px_-24px_rgba(36,35,32,0.55)] md:flex'
const icon = 'flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-rust'
const small = 'block font-body text-[11px] uppercase tracking-[0.14em] text-text-tertiary'
const big = 'mt-0.5 block font-body text-sm text-text-primary'

export default function PhoneAssistantStage() {
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute left-1/2 top-1/2 aspect-square h-[105%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(166,75,50,0.22), rgba(166,75,50,0) 72%)' }}
      />
      <span className="ring-wave" />
      <span className="ring-wave is-late" />

      <div className="absolute inset-0 flex items-center justify-center p-[6%]">
        <PhoneAssistantMock />
      </div>

      <div className={`${card} float-a left-[5%] top-[16%]`}>
        <span className={icon}>
          <Bell size={17} strokeWidth={1.6} />
        </span>
        <span>
          <span className={small}>New booking</span>
          <span className={big}>Anna · Fri 10:20</span>
        </span>
      </div>

      <div className={`${card} float-b bottom-[15%] right-[4%]`}>
        <span className={icon}>
          <CalendarCheck size={17} strokeWidth={1.6} />
        </span>
        <span>
          <span className={small}>In your calendar</span>
          <span className={big}>Fri 27 Nov · 10:20</span>
        </span>
      </div>

      <div className={`${card} float-c right-[7%] top-[11%] !gap-2.5 !rounded-full !py-2 !pl-2.5 !pr-4`}>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-text-primary text-card">
          <Languages size={14} strokeWidth={1.7} />
        </span>
        <span className="font-body text-[13px] text-text-primary">5 languages</span>
      </div>
    </div>
  )
}
