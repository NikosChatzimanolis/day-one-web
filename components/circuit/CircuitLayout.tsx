// ── components/circuit/CircuitLayout.tsx ──
// The background circuit: two edge rails spanning the document, plus (home only)
// a short stem under the hero logo's "|" that forks out to both rail tops.
// Phase 1 is static + dull. Geometry is measured into state (no animation here,
// so re-renders are fine); Phase 2 adds the rAF fill loop on top of the same SVG.
'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

const STEM_LENGTH = 56 // px: fallback hero stem drop if the eyebrow isn't found
const FORK_GAP = 20 // px: clearance kept between the fork line and the eyebrow
const TOP_ANCHOR = 120 // px: where inner-page rails begin (below the fixed header)
const DULL = 'var(--color-muted)'

interface Geometry {
  docWidth: number
  docHeight: number
  inset: number
  /** Y where rails start: fork Y on home, TOP_ANCHOR on inner pages. */
  railTop: number
  /** Home-only stem/fork; null on inner pages or before the logo is measured. */
  fork: { x: number; y: number; stemTop: number } | null
}

export default function CircuitLayout() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [geo, setGeo] = useState<Geometry | null>(null)

  useEffect(() => {
    const measure = () => {
      const doc = document.documentElement
      const inset =
        parseInt(getComputedStyle(doc).getPropertyValue('--circuit-inset'), 10) || 16
      const docWidth = doc.clientWidth
      const docHeight = doc.scrollHeight

      let railTop = TOP_ANCHOR
      let fork: Geometry['fork'] = null

      if (isHome) {
        // The hero lockup — not the navbar or footer logo, which also carry the
        // divider attribute. The hero logo is the first one inside <main>.
        const divider = document.querySelector<HTMLElement>('#main [data-logo-divider]')
        if (divider) {
          const r = divider.getBoundingClientRect()
          const x = r.left + r.width / 2 + window.scrollX
          const stemTop = r.bottom + window.scrollY
          // Place the fork a clear gap ABOVE the hero eyebrow ("A technical
          // partner — Paphos…"), so the split never crosses or touches it.
          // Falls back to a fixed stem drop if the eyebrow can't be measured.
          const eyebrow = document.querySelector<HTMLElement>('#main .eyebrow')
          let y = stemTop + STEM_LENGTH
          if (eyebrow) {
            const eyebrowTop = eyebrow.getBoundingClientRect().top + window.scrollY
            y = Math.max(stemTop + 16, eyebrowTop - FORK_GAP)
          }
          fork = { x, y, stemTop }
          railTop = y
        }
      }

      setGeo({ docWidth, docHeight, inset, railTop, fork })
    }

    measure()
    window.addEventListener('resize', measure)
    const t = window.setTimeout(measure, 400) // settle after font swap
    if (document.fonts?.ready) document.fonts.ready.then(measure)
    const ro = new ResizeObserver(measure)
    ro.observe(document.body)

    return () => {
      window.removeEventListener('resize', measure)
      window.clearTimeout(t)
      ro.disconnect()
    }
  }, [isHome, pathname])

  if (!geo) return null

  const { docWidth, docHeight, inset, railTop, fork } = geo
  const xL = inset
  const xR = docWidth - inset

  return (
    <svg
      className="circuit-layer"
      width={docWidth}
      height={docHeight}
      viewBox={`0 0 ${docWidth} ${docHeight}`}
      aria-hidden="true"
    >
      {/* Left + right rails */}
      <line x1={xL} y1={railTop} x2={xL} y2={docHeight} stroke={DULL} strokeWidth="1" />
      <line x1={xR} y1={railTop} x2={xR} y2={docHeight} stroke={DULL} strokeWidth="1" />

      {/* Home-only stem + fork */}
      {fork && (
        <>
          {/* vertical stem under the logo "|" */}
          <line x1={fork.x} y1={fork.stemTop} x2={fork.x} y2={fork.y} stroke={DULL} strokeWidth="1" />
          {/* horizontal fork out to both rails */}
          <line x1={xL} y1={fork.y} x2={xR} y2={fork.y} stroke={DULL} strokeWidth="1" />
        </>
      )}
    </svg>
  )
}
