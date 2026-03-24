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
      sectionRefs.current[index] = el
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
              <div className="h-full overflow-y-auto">
                {content.children}
              </div>
            </section>
          )
        }

        // Split layout — side by side on desktop, stacked on mobile
        const [leftPct, rightPct] = section.splitRatio ?? [50, 50]

        return (
          <section
            key={section.id}
            id={section.id}
            ref={setRef(i)}
            className="snap-section"
            style={{ backgroundColor: section.bg }}
          >
            <div className="h-full flex flex-col md:flex-row overflow-y-auto md:overflow-hidden">
              <div
                className="w-full md:h-full md:overflow-y-auto"
                style={{ flex: `0 0 ${leftPct}%` }}
              >
                {content.left}
              </div>
              <div
                className="w-full md:h-full md:overflow-y-auto"
                style={{ flex: `0 0 ${rightPct}%` }}
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
