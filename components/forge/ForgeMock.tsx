// ── components/forge/ForgeMock.tsx ──
// A faithful, static impression of the Forge Queue — the view the team works
// in. CSS-only, non-interactive (pointer-events-none). Matches the real early-
// access onboarding state: groups rail, empty urgent lane, normal tasks.
import Image from 'next/image'
import { ChevronRight, Key, Plus, Settings, Sun, Trash2, Users } from 'lucide-react'

const ink = '#141210'
const inkRaised = '#1A1816'
const inkBlock = '#262320'
const cream = '#F5F0EA'
const creamMuted = '#A39E96'
const creamDim = '#6B665F'
const terracotta = '#C04C2A'

function TaskCard({ title, meta }: { title: string; meta: string }) {
  return (
    <div
      className="rounded-lg px-4 py-3.5"
      style={{ background: inkBlock, border: '1px solid #34302B' }}
    >
      <p className="font-body text-sm font-medium leading-snug" style={{ color: cream }}>
        {title}
      </p>
      <p className="mt-2 font-body text-xs leading-none" style={{ color: creamDim }}>
        {meta}
      </p>
    </div>
  )
}

export default function ForgeMock() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none rounded-xl overflow-hidden shadow-card"
      style={{ background: ink, border: '1px solid #34302B' }}
    >
      <div className="flex" style={{ minHeight: 460 }}>
        {/* sidebar */}
        <aside
          className="hidden sm:flex w-[13rem] shrink-0 flex-col p-6"
          style={{ background: inkRaised, borderRight: '1px solid #34302B' }}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <Image src="/forge-mark.png" alt="" width={26} height={26} className="rounded-[6px] shrink-0" />
              <span className="font-display text-base tracking-wide truncate" style={{ color: cream }}>
                Forge
              </span>
            </div>
            <span className="shrink-0 opacity-40" style={{ color: creamMuted }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <rect x="1" y="2" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M5 2v10" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </span>
          </div>

          <div className="mt-7">
            <div className="flex items-center justify-between mb-2">
              <span className="font-body text-[0.625rem] uppercase tracking-[0.2em]" style={{ color: creamDim }}>
                Groups
              </span>
              <Plus size={13} strokeWidth={2} style={{ color: creamDim }} />
            </div>
            <div
              className="flex items-center justify-between rounded-md px-2 py-1.5"
              style={{ background: inkBlock }}
            >
              <span className="flex items-center gap-1 font-body text-[0.6875rem] uppercase tracking-[0.14em]" style={{ color: creamMuted }}>
                <ChevronRight size={12} strokeWidth={2} style={{ color: creamDim }} />
                Getting started
              </span>
              <span className="font-body text-xs tabular-nums" style={{ color: creamDim }}>
                2
              </span>
            </div>
          </div>

          <div className="mt-auto flex items-center gap-3 pt-6" style={{ color: creamDim }}>
            <Sun size={14} strokeWidth={1.8} />
            <Trash2 size={14} strokeWidth={1.8} />
            <Key size={14} strokeWidth={1.8} />
            <Users size={14} strokeWidth={1.8} />
            <Settings size={14} strokeWidth={1.8} />
          </div>
        </aside>

        {/* queue */}
        <div className="relative flex-1 min-w-0 p-6 sm:p-8">
          <div className="absolute top-6 right-6 sm:top-8 sm:right-8">
            <span
              className="rounded-full px-3 py-1 font-body text-[0.625rem] font-medium uppercase tracking-[0.18em]"
              style={{ background: 'rgba(192,76,42,0.16)', color: terracotta, border: '1px solid rgba(192,76,42,0.3)' }}
            >
              Early access
            </span>
          </div>

          <div className="flex flex-col gap-7 pt-1">
            {/* Urgent */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: terracotta }} />
                <span
                  className="font-body text-[0.625rem] font-medium uppercase tracking-[0.2em]"
                  style={{ color: terracotta }}
                >
                  Urgent
                </span>
              </div>
              <div
                className="rounded-lg flex items-center justify-center px-6 py-10 text-center"
                style={{
                  background: 'rgba(242,237,228,0.025)',
                  border: '1px dashed #34302B',
                }}
              >
                <p className="font-body text-sm leading-relaxed max-w-[16rem]" style={{ color: creamDim }}>
                  No interrupts. Drag something here to jump the line.
                </p>
              </div>
            </div>

            {/* Normal */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: creamDim }} />
                <span
                  className="font-body text-[0.625rem] font-medium uppercase tracking-[0.2em]"
                  style={{ color: creamMuted }}
                >
                  Normal
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <TaskCard title="Welcome to Forge — this is a task" meta="Getting started 1/3" />
                <TaskCard
                  title="Try the AI — press Tidy on this note, then Suggest steps"
                  meta="Getting started 0/4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
