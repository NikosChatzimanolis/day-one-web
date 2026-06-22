// ── components/work/AstralaVisual.tsx ──
// Represents Day One's actual deliverable for Astrala Advisory: the social /
// editorial system. It mirrors the real brand Day One directs for them — their
// palette (navy / gold / teal / cream), Cormorant Garamond display serif, the
// Operations·Technology·Trust pillars and a LinkedIn-first cadence. It shows our
// CONTENT output (a social feed preview), never Astrala's product/platform UI,
// and deliberately omits any product names, AI/recruitment framing or metrics.
// Framed in the same browser chrome as Delbeteris for visual uniformity.
import BrowserFrame from '@/components/ui/BrowserFrame'

const A = {
  navy: '#0E1B47',
  navyDeep: '#08122E',
  navyMid: '#14245A',
  cream: '#F1ECE0',
  creamWarm: '#E8E2D2',
  teal: '#5DCFE0',
  gold: '#D4A943',
  lavender: '#E8E5F2',
}
const serif = 'var(--font-cormorant), Georgia, serif'

function Tile({
  bg,
  color,
  children,
}: {
  bg: string
  color: string
  children: React.ReactNode
}) {
  return (
    <div
      className="relative flex aspect-square flex-col overflow-hidden rounded-[3px] p-3"
      style={{ background: bg, color }}
    >
      {children}
    </div>
  )
}

export default function AstralaVisual() {
  return (
    <BrowserFrame>
      <div className="p-5 sm:p-6" style={{ background: A.cream }}>
        {/* Identity */}
        <div
          className="flex items-baseline justify-between pb-4"
          style={{ borderBottom: '1px solid rgba(14,27,71,0.15)' }}
        >
          <span style={{ fontFamily: serif, color: A.navy, fontSize: '1.35rem', fontWeight: 600, letterSpacing: '-0.01em' }}>
            Astrala Advisory
          </span>
          <span className="font-body text-[0.625rem] font-medium uppercase tracking-[0.22em]" style={{ color: A.gold }}>
            Social system
          </span>
        </div>

        {/* The feed — Day One's content output, in Astrala's brand */}
        <div className="mt-5 grid grid-cols-2 gap-1.5 xs:grid-cols-3">
          {/* 1 — Mantra */}
          <Tile bg={A.creamWarm} color={A.navy}>
            <div className="m-auto text-center" style={{ fontFamily: serif, fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.3 }}>
              Operations.
              <span className="mx-auto my-1 block h-px w-4" style={{ background: A.gold }} />
              Technology.
              <span className="mx-auto my-1 block h-px w-4" style={{ background: A.gold }} />
              Trust.
            </div>
          </Tile>

          {/* 2 — Carousel cover */}
          <Tile bg={A.navy} color={A.cream}>
            <span style={{ fontFamily: serif, color: A.gold, fontSize: '1.7rem', fontWeight: 600, lineHeight: 1 }}>5</span>
            <span className="mt-auto" style={{ fontFamily: serif, fontSize: '0.78rem', lineHeight: 1.25 }}>
              What CFOs get wrong about scaling ops.
            </span>
            <span className="mt-2 flex gap-1">
              <span className="h-1 w-1 rounded-full" style={{ background: A.gold }} />
              <span className="h-1 w-1 rounded-full" style={{ background: 'rgba(241,236,224,0.3)' }} />
              <span className="h-1 w-1 rounded-full" style={{ background: 'rgba(241,236,224,0.3)' }} />
            </span>
          </Tile>

          {/* 3 — Why Cyprus video */}
          <Tile bg={A.navyDeep} color={A.cream}>
            <span
              className="pointer-events-none absolute left-1/2 top-1/2"
              style={{ width: '128%', height: '46%', border: `1px solid ${A.teal}`, borderRadius: '50%', transform: 'translate(-50%,-50%) rotate(-18deg)', opacity: 0.5 }}
            />
            <span className="relative m-auto flex flex-col items-center">
              <span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: A.gold }}>
                <svg viewBox="0 0 24 24" width="12" height="12" style={{ fill: A.navyDeep, marginLeft: 1 }}>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="mt-2" style={{ fontFamily: serif, fontStyle: 'italic', fontSize: '0.82rem' }}>Why Cyprus?</span>
            </span>
          </Tile>

          {/* 4 — Quote */}
          <Tile bg={A.lavender} color={A.navy}>
            <span style={{ fontFamily: serif, color: A.gold, fontSize: '2rem', lineHeight: 0.8 }}>&ldquo;</span>
            <span style={{ fontFamily: serif, fontStyle: 'italic', fontSize: '0.84rem', fontWeight: 500, lineHeight: 1.3 }}>
              We architect past the ceiling.
            </span>
            <span className="mt-auto font-body text-[0.5625rem] uppercase tracking-[0.18em]" style={{ color: 'rgba(14,27,71,0.55)' }}>
              — Astrala
            </span>
          </Tile>

          {/* 5 — Multi-jurisdiction */}
          <Tile bg={A.navy} color={A.cream}>
            <span className="font-body text-[0.5625rem] uppercase tracking-[0.12em]" style={{ color: A.gold }}>Multi-currency</span>
            <span className="mt-auto" style={{ fontFamily: serif, fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.01em' }}>
              EUR<span style={{ color: A.teal }}> · </span>GBP<span style={{ color: A.teal }}> · </span>AED<span style={{ color: A.teal }}> · </span>INR
            </span>
            <span className="mt-1 h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,169,67,0.6), transparent)' }} />
          </Tile>

          {/* 6 — Brand mark */}
          <Tile bg={A.cream} color={A.navy}>
            <span className="m-auto flex flex-col items-center text-center">
              <span style={{ color: A.gold, fontSize: '0.9rem' }}>✦</span>
              <span className="mt-1" style={{ fontFamily: serif, fontSize: '0.95rem', fontWeight: 600 }}>Astrala</span>
              <span className="mt-1.5 font-body text-[0.5rem] uppercase tracking-[0.2em]" style={{ color: 'rgba(14,27,71,0.5)' }}>
                Institutional · Cosmic
              </span>
            </span>
          </Tile>
        </div>

        {/* System footer */}
        <div className="mt-4 flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(14,27,71,0.12)' }}>
          <span className="font-body text-[0.5625rem] uppercase tracking-[0.18em]" style={{ color: 'rgba(14,27,71,0.5)' }}>
            LinkedIn-first · Cormorant Garamond
          </span>
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-3.5 w-3.5 rounded-full" style={{ background: A.navy }} />
            <span className="h-3.5 w-3.5 rounded-full" style={{ background: A.gold }} />
            <span className="h-3.5 w-3.5 rounded-full" style={{ background: A.teal }} />
            <span className="h-3.5 w-3.5 rounded-full" style={{ background: A.cream, boxShadow: 'inset 0 0 0 1px rgba(14,27,71,0.15)' }} />
          </span>
        </div>
      </div>
    </BrowserFrame>
  )
}
