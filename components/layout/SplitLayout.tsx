// ── components/layout/SplitLayout.tsx ──
'use client'

import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useScrollContext } from '@/context/ScrollContext'
import { useScrollController } from '@/hooks/useScrollController'
import Panel, { type PanelContent } from '@/components/ui/Panel'
import ProgressIndicator from '@/components/ui/ProgressIndicator'
import ScrollHint from '@/components/ui/ScrollHint'

interface SplitLayoutProps {
  panels: PanelContent[]
}

export default function SplitLayout({ panels }: SplitLayoutProps) {
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
