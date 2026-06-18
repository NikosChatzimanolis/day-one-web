// ── components/sections/HorizonRows.tsx ──
// The Build / Scale / Maintain horizons. The connecting line and node-warming
// that used to live here (a framer scroll-progress thread) were removed during
// the circuit teardown — the new circuit rails/dividers and (Phase 3) fillable
// numerals replace it. This now renders the editorial grid only, statically.
import NumberBox from '@/components/circuit/NumberBox'

export interface Horizon {
  no: string
  name: string
  line: string
}

export default function HorizonRows({ tracks }: { tracks: Horizon[] }) {
  return (
    <div className="relative">
      {tracks.map((track, i) => (
        <div
          key={track.no}
          className={`grid grid-cols-1 items-baseline gap-3 border-t border-dark-border py-9 md:grid-cols-12 md:gap-8 md:py-12 ${
            i === tracks.length - 1 ? 'border-b' : ''
          }`}
        >
          <div className="md:col-span-1">
            <NumberBox tone="dark">{track.no}</NumberBox>
          </div>
          <h3 className="t-h2 text-dark-text md:col-span-4">{track.name}</h3>
          <p className="font-body text-base leading-relaxed text-dark-text-secondary measure-lg md:col-span-6 md:col-start-7 md:text-lg">
            {track.line}
          </p>
        </div>
      ))}
    </div>
  )
}
