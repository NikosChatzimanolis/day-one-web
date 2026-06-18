// ── components/circuit/Section.tsx ──
// A full-bleed page band that emits a dull rail-to-rail top divider into the
// circuit layer and registers itself with the fill engine via useFill. Authoring
// a page = composing <Section> blocks; dividers are never hardcoded. Pass
// `firstBand` to suppress the divider where a band should not have one (e.g. the
// band right under the hero fork). The inner centered container lives in the
// children. (Phase 2: the section registers and the engine drives its --fill, but
// nothing consumes it visually yet — section/divider fill visuals arrive in
// Phase 3. The divider stays dull this round.)
'use client'

import { cn } from '@/lib/utils'
import { useFill } from './useFill'

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
  const fillRef = useFill()

  return (
    <section ref={fillRef} id={id} className={cn('relative', className)}>
      {!firstBand && <span aria-hidden="true" className="circuit-divider" />}
      {children}
    </section>
  )
}
