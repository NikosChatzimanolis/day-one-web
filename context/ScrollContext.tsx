// ── context/ScrollContext.tsx ──
'use client'

import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react'

export interface SectionDef {
  id: string
  label: string
  type: 'split' | 'full'
  bg: string
  splitRatio?: [number, number]
}

export const SECTIONS: SectionDef[] = [
  { id: 'hero',          label: 'Hero',          type: 'split', bg: '#F7F4EF', splitRatio: [55, 45] },
  { id: 'services',      label: 'Services',      type: 'split', bg: '#F7F4EF', splitRatio: [40, 60] },
  { id: 'how-it-works',  label: 'How it works',  type: 'full',  bg: '#1A1A18' },
  { id: 'work',          label: 'Work',          type: 'split', bg: '#F7F4EF', splitRatio: [50, 50] },
  { id: 'pricing',       label: 'Pricing',       type: 'full',  bg: '#F0EBE3' },
  { id: 'about',         label: 'About',         type: 'split', bg: '#F7F4EF', splitRatio: [45, 55] },
]

interface ScrollContextValue {
  currentIndex: number
  direction: 'up' | 'down'
  isTransitioning: boolean
  contactUnlocked: boolean
  totalSections: number
  goTo: (index: number) => boolean
  unlock: () => void
  resetContact: () => void
  clearTransition: () => void
}

const ScrollContext = createContext<ScrollContextValue | null>(null)

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<'up' | 'down'>('down')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [contactUnlocked, setContactUnlocked] = useState(false)

  // Internal refs so goTo is stable (empty deps) and avoids stale closures
  const currentIndexRef    = useRef(0)
  const isTransitioningRef = useRef(false)
  const safetyTimerRef     = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Fallback duration covering longest animation path:
  // 600ms CUBIC (full panels) or spring + 150ms right-half delay (split panels)
  const TRANSITION_MS = 750

  // Called by Panel.onAnimationComplete (primary) or safety timer (fallback for reduced motion)
  const clearTransition = useCallback(() => {
    if (safetyTimerRef.current) {
      clearTimeout(safetyTimerRef.current)
      safetyTimerRef.current = null
    }
    isTransitioningRef.current = false
    setIsTransitioning(false)
  }, [])

  const goTo = useCallback((nextIndex: number): boolean => {
    if (nextIndex === currentIndexRef.current) return false
    if (isTransitioningRef.current) return false
    const newDirection: 'up' | 'down' = nextIndex > currentIndexRef.current ? 'down' : 'up'
    currentIndexRef.current = nextIndex
    isTransitioningRef.current = true
    // React 18 batches these three setState calls in a single render
    setDirection(newDirection)
    setCurrentIndex(nextIndex)
    setIsTransitioning(true)
    // Safety fallback — cleared early if Panel signals onAnimationComplete
    safetyTimerRef.current = setTimeout(clearTransition, TRANSITION_MS)
    return true
  }, [clearTransition])

  const unlock = useCallback(() => {
    setContactUnlocked(true)
    document.documentElement.classList.remove('scroll-locked')
  }, [])

  const resetContact = useCallback(() => {
    setContactUnlocked(false)
    document.documentElement.classList.add('scroll-locked')
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <ScrollContext.Provider
      value={{
        currentIndex,
        direction,
        isTransitioning,
        contactUnlocked,
        totalSections: SECTIONS.length,
        goTo,
        unlock,
        resetContact,
        clearTransition,
      }}
    >
      {children}
    </ScrollContext.Provider>
  )
}

export function useScrollContext() {
  const ctx = useContext(ScrollContext)
  if (!ctx) throw new Error('useScrollContext must be used within ScrollProvider')
  return ctx
}

export default ScrollProvider
