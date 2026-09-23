// ── components/products/AttendanceMock.tsx ──
// Attendance platform: a phone frame on the clock-in screen. Big time,
// "Clocked in" state, rust "Clock out" button, four-tab bar. Placeholder
// data only.
import { Home, CalendarDays, Users, BarChart3, MapPin } from 'lucide-react'

const tabs = [
  { label: 'Home', icon: Home, active: true },
  { label: 'Leave', icon: CalendarDays },
  { label: 'Team', icon: Users },
  { label: 'Reports', icon: BarChart3 },
]

export default function AttendanceMock() {
  return (
    <div className="flex h-full max-h-[440px] flex-col overflow-hidden rounded-[1.6rem] border border-border-strong bg-card text-[10px] leading-none sm:text-[11px]" style={{ aspectRatio: '9 / 19' }}>
      {/* status bar */}
      <div className="flex items-center justify-between px-4 pt-3 text-text-tertiary">
        <span className="tabular-nums">9:41</span>
        <span className="flex gap-0.5">
          <span className="block h-1 w-1 rounded-full bg-text-tertiary" />
          <span className="block h-1 w-1 rounded-full bg-text-tertiary" />
          <span className="block h-1 w-1 rounded-full bg-text-tertiary" />
        </span>
      </div>

      <div className="flex flex-1 flex-col px-4 pt-3">
        <span className="font-display text-[14px] text-text-primary sm:text-[16px]">Attendance</span>

        <div className="mt-3 flex flex-1 flex-col items-center justify-center rounded-lg border border-line bg-bg px-3 py-4 text-center">
          <span className="text-text-tertiary">Today</span>
          <span className="mt-1.5 font-display text-[26px] font-light tabular-nums text-text-primary sm:text-[30px]">09:24</span>
          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-1 text-text-primary">
            <span className="block h-1.5 w-1.5 rounded-full bg-[#8FAF7E]" />
            Clocked in
          </span>
          <span className="mt-2 inline-flex items-center gap-1 text-text-tertiary">
            <MapPin size={9} strokeWidth={1.6} />
            Main office
          </span>
          <span className="mt-4 block w-full rounded-full bg-rust py-2 text-center font-medium text-bg">
            Clock out
          </span>
        </div>
      </div>

      {/* tab bar */}
      <div className="mt-3 grid grid-cols-4 border-t border-line px-2 pb-3 pt-2">
        {tabs.map(({ label, icon: Icon, active }) => (
          <span
            key={label}
            className={active ? 'flex flex-col items-center gap-1 text-rust' : 'flex flex-col items-center gap-1 text-text-tertiary'}
          >
            <Icon size={11} strokeWidth={1.6} />
            <span className="text-[8px] sm:text-[9px]">{label}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
