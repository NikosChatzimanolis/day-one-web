// ── components/circuit/useFill.ts ──
// Registers a DOM node as a circuit-fill participant. Returns a *callback ref*:
// React calls it with the node when it mounts and with null when it unmounts, so
// registration tracks the element's real lifecycle (this matters for elements
// that mount late — e.g. the rails, which only render after CircuitLayout has
// measured its geometry). The engine writes the node's positional fill to its
// --fill CSS variable each frame; this hook never causes a re-render. Pass `band`
// (px) for thin elements that should ease across a short travel; omit for tall
// elements (rails, sections).
'use client'

import { useCallback, useRef } from 'react'
import { useCircuit } from './CircuitContext'

export function useFill({ band }: { band?: number } = {}) {
  const circuit = useCircuit()
  const cleanup = useRef<(() => void) | null>(null)

  return useCallback(
    (el: HTMLElement | SVGElement | null) => {
      if (cleanup.current) {
        cleanup.current()
        cleanup.current = null
      }
      if (el && circuit) {
        cleanup.current = circuit.register({ el, band })
      }
    },
    [circuit, band],
  )
}
