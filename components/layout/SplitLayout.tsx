// ── components/layout/SplitLayout.tsx ──
'use client'

import { useCallback } from 'react'
import { useScrollContext, SECTIONS } from '@/context/ScrollContext'
import ProgressIndicator from '@/components/ui/ProgressIndicator'
import ScrollHint from '@/components/ui/ScrollHint'

export interface PanelContent {
  left?: React.ReactNode
  right?: React.ReactNode
  children?: React.ReactNode
}

interface SplitLayoutProps {
  panels: PanelContent[]
  /** Content rendered after snap sections (Contact, Footer, etc.) — no snap alignment */
  after?: React.ReactNode
}

export default function SplitLayout({ panels, after }: SplitLayoutProps) {
  const { sectionRefs } = useScrollContext()

  const setRef = useCallback(
    (index: number) => (el: HTMLElement | null) => {
      if (sectionRefs.current) sectionRefs.current[index] = el
    },
    [sectionRefs]
  )

  return (
    <div className="snap-container">
      {SECTIONS.map((section, i) => {
        const content = panels[i] ?? {}

        if (section.type === 'full') {
          return (
            <section
              key={section.id}
              id={section.id}
              ref={setRef(i)}
              className="snap-section"
              style={{ backgroundColor: section.bg }}
            >
              <div className="flex-1 md:h-full md:overflow-y-auto">
                {content.children}
              </div>
            </section>
          )
        }

        // Split layout — side by side on desktop, stacked on mobile.
        // --md-flex is picked up by the media query rule in globals.css
        // so the fixed split ratio only applies on md+ (side-by-side).
        // On mobile, panels stack and size naturally via flex-1 / auto.
        const [leftPct, rightPct] = section.splitRatio ?? [50, 50]

        return (
          <section
            key={section.id}
            id={section.id}
            ref={setRef(i)}
            className="snap-section"
            style={{ backgroundColor: section.bg }}
          >
            <div className="flex-1 flex flex-col md:flex-row md:h-full md:overflow-hidden">
              <div
                className="flex-1 flex flex-col w-full md:flex-none md:h-full md:overflow-y-auto"
                style={{ ['--md-flex' as string]: `0 0 ${leftPct}%` }}
              >
                {content.left}
              </div>
              <div
                className="w-full md:h-full md:overflow-y-auto"
                style={{ ['--md-flex' as string]: `0 0 ${rightPct}%` }}
              >
                {content.right}
              </div>
            </div>
          </section>
        )
      })}

      {/* Contact / Footer — rendered directly, each can snap independently */}
      {after}

      <ProgressIndicator />
      <ScrollHint />
    </div>
  )
}
