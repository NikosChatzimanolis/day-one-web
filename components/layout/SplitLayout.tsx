// ── components/layout/SplitLayout.tsx ──
'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useScrollContext, SECTIONS } from '@/context/ScrollContext'
import { useScrollController } from '@/hooks/useScrollController'
import Panel, { type PanelContent } from '@/components/ui/Panel'
import ProgressIndicator from '@/components/ui/ProgressIndicator'
import ScrollHint from '@/components/ui/ScrollHint'

interface SplitLayoutProps {
  panels: PanelContent[]
}

// ── Desktop: scroll-locked panel system (unchanged) ───────────────────────────
function DesktopPanels({ panels }: SplitLayoutProps) {
  const { currentIndex, clearTransition } = useScrollContext()

  // Register all scroll/touch/keyboard event listeners
  useScrollController()

  // Lock scroll on mount, unlock on unmount
  useEffect(() => {
    document.documentElement.classList.add('scroll-locked')
    return () => {
      document.documentElement.classList.remove('scroll-locked')
    }
  }, [])

  return (
    <div className="relative w-full h-[100svh] overflow-hidden overscroll-none">
      <AnimatePresence mode="sync" initial={false}>
        <Panel
          key={currentIndex}
          index={currentIndex}
          content={panels[currentIndex] ?? {}}
          onSettled={clearTransition}
        />
      </AnimatePresence>
      <ProgressIndicator />
      <ScrollHint />
    </div>
  )
}

// ── Mobile: native-scroll stacked layout ──────────────────────────────────────
function MobileStack({ panels }: SplitLayoutProps) {
  return (
    <div className="w-full">
      {SECTIONS.map((section, i) => {
        const content = panels[i] ?? {}
        const isHero = i === 0

        if (section.type === 'full') {
          return (
            <div
              key={section.id}
              id={section.id}
              style={{ background: section.bg }}
            >
              {content.children}
            </div>
          )
        }

        // Split panel — stack left then right vertically on mobile
        return (
          <div
            key={section.id}
            id={section.id}
            className={isHero ? 'min-h-svh' : undefined}
            style={{ background: section.bg }}
          >
            {content.left && <div className="w-full">{content.left}</div>}
            {content.right && <div className="w-full">{content.right}</div>}
          </div>
        )
      })}
    </div>
  )
}

// ── Orchestrator: detects viewport, renders correct layout ─────────────────────
export default function SplitLayout({ panels }: SplitLayoutProps) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (isMobile) return <MobileStack panels={panels} />
  return <DesktopPanels panels={panels} />
}
