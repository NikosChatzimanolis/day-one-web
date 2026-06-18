// ── components/circuit/Divider.tsx ──
// A rail-to-rail section divider. Dull base line + two terracotta segments that
// grow inward from each rail (scaleX) to meet at center as the fill front
// crosses. Plus a node-marker dot at each rail end that warms dull→terracotta
// with the same --fill (the dot matches the "01" node in the mockup). Registers
// with a fill band so it eases across ~100px of travel. The engine writes --fill
// to this element; children read it via CSS-variable inheritance.
'use client'

import { useFill } from './useFill'

export default function Divider() {
  const ref = useFill({ band: 100 })
  return (
    <span ref={ref} aria-hidden="true" className="circuit-divider">
      <span className="circuit-divider-seg circuit-divider-seg-l" />
      <span className="circuit-divider-seg circuit-divider-seg-r" />
      <span className="circuit-node circuit-node-l" />
      <span className="circuit-node circuit-node-r" />
    </span>
  )
}
