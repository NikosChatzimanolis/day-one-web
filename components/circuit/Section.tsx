// ── components/circuit/Section.tsx ──
// A full-bleed page band that emits a dull rail-to-rail top divider into the
// circuit layer and registers itself with the circuit engine. Authoring a page
// = composing <Section> blocks; dividers are never hardcoded. Pass `firstBand`
// to suppress the divider where a band should not have one (e.g. right under the
// hero fork). The inner centered container still lives in the children.
'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { useCircuit } from './CircuitContext'

export default function Section({
  children,
  className,
  firstBand = false,
  id,
}: {
  children: React.ReactNode
  className?: string
  /** Suppress the top divider (e.g. the band immediately under the hero fork). */
  firstBand?: boolean
  id?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const circuit = useCircuit()

  useEffect(() => {
    if (!circuit || !ref.current) return
    // Phase 1: registration is a no-op stub; Phase 2 consumes it. Registering the
    // section element here means new <Section> blocks participate automatically.
    return circuit.register({ el: ref.current })
  }, [circuit])

  return (
    <section ref={ref} id={id} className={cn('relative', className)}>
      {!firstBand && <span aria-hidden="true" className="circuit-divider" />}
      {children}
    </section>
  )
}
