// ── components/ui/CustomCursor.tsx ──
'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion'

export default function CustomCursor() {
  const shouldReduceMotion = useReducedMotion()
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const [isOnDark, setIsOnDark] = useState(false)

  // Bound directly to the raw pointer — no spring — so the cursor tracks the
  // hand 1:1 with no drag or momentum. Only the size/fill on hover animates.
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile || shouldReduceMotion) return

    let lastX = -100
    let lastY = -100
    let rafId = 0

    const checkDark = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = 0
        const el = document.elementFromPoint(lastX, lastY) as HTMLElement | null
        setIsOnDark(!!el?.closest('.section-dark, .forge-dark'))
      })
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      lastX = e.clientX
      lastY = e.clientY
      checkDark()
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-cursor-hover]') ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON'
      ) {
        setIsHovering(true)
      }
    }

    const handleHoverEnd = () => setIsHovering(false)

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('scroll', checkDark, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleHoverStart)
    document.addEventListener('mouseout', handleHoverEnd)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('scroll', checkDark)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleHoverStart)
      document.removeEventListener('mouseout', handleHoverEnd)
    }
  }, [isMobile, shouldReduceMotion, cursorX, cursorY, isVisible])

  if (isMobile || shouldReduceMotion) return null

  return (
    <>
      {/* Hide default cursor on desktop */}
      <style>{`
        @media (min-width: 1024px) {
          *, *::before, *::after { cursor: none !important; }
        }
      `}</style>

      {/* Intentional, on-brand cursor. At rest it's a small filled near-black
          dot on light sections, cream on dark sections. On interactive elements
          it grows into a filled rust circle. */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 34 : 16,
          height: isHovering ? 34 : 16,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isHovering
            ? 'rgba(181, 85, 47, 0.9)'
            : isOnDark
              ? 'rgba(245, 240, 234, 0.92)'
              : 'rgba(26, 24, 22, 0.92)',
        }}
        transition={{
          width: { duration: 0.25, ease: 'easeOut' },
          height: { duration: 0.25, ease: 'easeOut' },
          opacity: { duration: 0.15 },
          backgroundColor: { duration: 0.2 },
        }}
      />
    </>
  )
}
