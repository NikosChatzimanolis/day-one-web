// ── components/circuit/Divider.tsx ──
// A rail-to-rail section divider. Dull base line + two terracotta segments that
// grow inward from each rail (scaleX from the left/right origins) to meet at the
// center as the fill front crosses the divider. Registers with a fill band so it
// eases across ~100px of travel instead of snapping. The engine writes --fill to
// this element; the segments read it via CSS-variable inheritance.
'use client'

import { useFill } from './useFill'

export default function Divider() {
  const ref = useFill({ band: 100 })
  return (
    <span ref={ref} aria-hidden="true" className="circuit-divider">
      <span className="circuit-divider-seg circuit-divider-seg-l" />
      <span className="circuit-divider-seg circuit-divider-seg-r" />
    </span>
  )
}
