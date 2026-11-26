// ── components/products/PhoneAssistantMock.tsx ──
// Phone assistant: a phone on a live call. The caller's and the assistant's
// turns as bubbles, then the booking confirmation. Placeholder data only.
import { Check, PhoneCall } from 'lucide-react'

const turns: { who: 'caller' | 'assistant'; text: string }[] = [
  { who: 'caller', text: 'Hello, I need an appointment tomorrow morning.' },
  { who: 'assistant', text: 'Tomorrow I have 9:00 or 10:20. Which suits you?' },
  { who: 'caller', text: '10:20, please.' },
  { who: 'assistant', text: 'Under which name shall I book it?' },
  { who: 'caller', text: 'Anna.' },
]

export default function PhoneAssistantMock() {
  return (
    <div
      className="flex h-full max-h-[520px] flex-col overflow-hidden rounded-[1.6rem] border border-border-strong bg-card text-[10px] leading-snug sm:text-[11px]"
      style={{ aspectRatio: '9 / 19' }}
    >
      {/* status bar */}
      <div className="flex items-center justify-between px-4 pt-3 leading-none text-text-tertiary">
        <span className="tabular-nums">9:41</span>
        <span className="flex gap-0.5">
          <span className="block h-1 w-1 rounded-full bg-text-tertiary" />
          <span className="block h-1 w-1 rounded-full bg-text-tertiary" />
          <span className="block h-1 w-1 rounded-full bg-text-tertiary" />
        </span>
      </div>

      {/* call header */}
      <div className="mx-4 mt-3 flex items-center justify-between border-b border-line pb-2 leading-none">
        <span className="inline-flex items-center gap-1.5 text-text-primary">
          <PhoneCall size={10} strokeWidth={1.6} className="text-rust" />
          Call in progress
        </span>
        <span className="tabular-nums text-text-tertiary">0:42</span>
      </div>

      {/* conversation */}
      <div className="flex flex-1 flex-col justify-end gap-1.5 px-3 py-3">
        {turns.map((t) => (
          <span
            key={t.text}
            className={
              t.who === 'caller'
                ? 'max-w-[82%] self-end rounded-xl rounded-br-sm bg-text-primary px-2.5 py-1.5 text-card'
                : 'max-w-[82%] self-start rounded-xl rounded-bl-sm border border-line bg-bg px-2.5 py-1.5 text-text-primary'
            }
          >
            {t.text}
          </span>
        ))}
      </div>

      {/* booked */}
      <div className="mx-3 mb-3 rounded-lg bg-rust px-3 py-2 text-bg">
        <span className="flex items-center gap-1.5 font-medium leading-none">
          <Check size={11} strokeWidth={2} />
          Booked · Fri 10:20
        </span>
        <span className="mt-1 block leading-none opacity-80">Anna · added to your calendar</span>
      </div>
    </div>
  )
}
