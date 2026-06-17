// ── components/ui/ScrollCue.tsx ──
// Hero "SCROLL" label with the reference's drawing-line animation underneath.
// The line animation lives in globals.css (.scrollcue-line / @keyframes cue) and
// is disabled under prefers-reduced-motion.
'use client'

export default function ScrollCue() {
  return (
    <div aria-hidden="true" className="scrollcue absolute bottom-9 left-1/2 -translate-x-1/2 text-center text-muted">
      SCROLL
      <span className="scrollcue-line" />
    </div>
  )
}
