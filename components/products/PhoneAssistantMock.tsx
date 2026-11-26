// ── components/products/PhoneAssistantMock.tsx ──
// Phone assistant: a phone on a live voice call. It is a call, not a chat,
// so there are no message bubbles: the caller's number and the call clock,
// the voice bars moving while the assistant speaks, what it has done so far
// as three ticked steps, and the booking as a calendar card at the bottom.
// Placeholder data only. Sits in the shared device frame (PhoneFrame), so
// every size inside is in cqw and scales with the phone. The type is large
// for a phone screen on purpose: the mock is shown small (the homepage hero)
// and has to read there.
import { CalendarCheck, Check, PhoneCall } from 'lucide-react'
import { PhoneFrame } from '@/components/products/AppShot'

// Resting heights of the voice bars (percent of the row), loud in the middle.
const bars = [26, 44, 34, 62, 48, 80, 58, 100, 70, 90, 54, 76, 42, 58, 30]

const steps = ['Wants an appointment', 'Offered 9:00 or 10:20', 'Booked Friday 10:20']

export default function PhoneAssistantMock({ className = 'h-full' }: { className?: string }) {
  return (
    <PhoneFrame dark className={className}>
      <div className="absolute inset-0 flex flex-col text-[#F7F4EE]" style={{ padding: '9cqw 8cqw 7cqw', fontSize: '5cqw', lineHeight: 1.2 }}>
        {/* who is calling, and for how long */}
        <span className="inline-flex items-center self-center text-[#D8D0C4]" style={{ gap: '2cqw', fontSize: '4.6cqw' }}>
          <PhoneCall className="text-[#D98A70]" style={{ width: '5cqw', height: '5cqw' }} strokeWidth={1.8} />
          Call in progress
        </span>
        <span className="self-center font-display tabular-nums" style={{ marginTop: '4cqw', fontSize: '10.5cqw', lineHeight: 1 }}>
          99 12 34 56
        </span>
        <span className="self-center tabular-nums text-[#A8A198]" style={{ marginTop: '2.4cqw', fontSize: '4.8cqw' }}>
          0:42
        </span>

        {/* the assistant's voice */}
        <div className="flex items-center justify-center" style={{ height: '30cqw', gap: '2.1cqw', marginTop: '9cqw' }}>
          {bars.map((h, i) => (
            <span
              key={i}
              className="voice-bar block rounded-full"
              style={{
                width: '2.3cqw',
                height: `${h}%`,
                backgroundColor: i % 3 === 1 ? '#D98A70' : '#F7F4EE',
                opacity: i % 3 === 1 ? 1 : 0.85,
                animationDelay: `${(i * 0.08).toFixed(2)}s`,
              }}
            />
          ))}
        </div>

        {/* what it has done so far */}
        <div className="flex flex-col" style={{ gap: '4.6cqw', marginTop: '10cqw' }}>
          {steps.map((s) => (
            <span key={s} className="flex items-center" style={{ gap: '3.2cqw' }}>
              <span className="flex shrink-0 items-center justify-center rounded-full bg-[#F7F4EE]/15" style={{ width: '7.4cqw', height: '7.4cqw' }}>
                <Check className="text-[#D98A70]" style={{ width: '4.4cqw', height: '4.4cqw' }} strokeWidth={2.6} />
              </span>
              {s}
            </span>
          ))}
        </div>

        {/* the result: it is in the calendar */}
        <div className="mt-auto flex items-center bg-[#F7F4EE] text-[#242320]" style={{ gap: '3.6cqw', padding: '4.4cqw', borderRadius: '5cqw' }}>
          <span className="flex shrink-0 items-center justify-center rounded-full bg-[#A64B32]" style={{ width: '13cqw', height: '13cqw' }}>
            <CalendarCheck className="text-[#F7F4EE]" style={{ width: '7cqw', height: '7cqw' }} strokeWidth={1.8} />
          </span>
          <span className="flex min-w-0 flex-col" style={{ gap: '1.4cqw' }}>
            <span className="font-medium" style={{ fontSize: '5.2cqw', lineHeight: 1.1 }}>
              Fri 27 Nov · 10:20
            </span>
            <span className="text-[#625D55]" style={{ fontSize: '4.3cqw', lineHeight: 1.15 }}>
              Anna, in your calendar
            </span>
          </span>
        </div>
      </div>
    </PhoneFrame>
  )
}
