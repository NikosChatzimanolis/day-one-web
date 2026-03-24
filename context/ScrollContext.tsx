// ── context/ScrollContext.tsx ──
'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from 'react'

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
  scrollToSection: (index: number) => void
  sectionRefs: RefObject<(HTMLElement | null)[]>
}

const ScrollContext = createContext<ScrollContextValue | null>(null)

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  // IntersectionObserver to track which section is most visible
  useEffect(() => {
    const refs = sectionRefs.current
    if (!refs.length) return

    // Debounce to avoid flicker during scroll-snap transitions
    let debounceTimer: ReturnType<typeof setTimeout> | null = null

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const idx = refs.indexOf(entry.target as HTMLElement)
            if (idx !== -1) {
              if (debounceTimer) clearTimeout(debounceTimer)
              debounceTimer = setTimeout(() => setCurrentIndex(idx), 50)
            }
          }
        })
      },
      { threshold: 0.5 }
    )

    refs.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => {
      observer.disconnect()
      if (debounceTimer) clearTimeout(debounceTimer)
    }
  }, [])

  const scrollToSection = useCallback((index: number) => {
    const el = sectionRefs.current[index]
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <ScrollContext.Provider value={{ currentIndex, scrollToSection, sectionRefs }}>
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
