// ── components/circuit/Section.tsx ──
// A full-bleed page band that emits a fillable rail-to-rail top divider into the
// circuit layer. Authoring a page = composing <Section> blocks; dividers are
// never hardcoded. Pass `firstBand` to suppress the divider where a band should
// not have one (e.g. the band right under the hero fork). The inner centered
// container lives in the children. The <Divider> registers with the fill engine;
// Section itself no longer registers (its Phase-1 stub registration was visual-
// less and is dropped now that the divider is the real fill participant).
'use client'

import { cn } from '@/lib/utils'
import Divider from './Divider'

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
  return (
    <section id={id} className={cn('relative', className)}>
      {!firstBand && <Divider />}
      {children}
    </section>
  )
}
