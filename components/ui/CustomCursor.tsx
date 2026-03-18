// ── components/ui/CustomCursor.tsx ──
'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion'

export default function CustomCursor() {
  const shouldReduceMotion = useReducedMotion()
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { stiffness: 500, damping: 40, mass: 0.5 }
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)

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

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
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
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleHoverStart)
    document.addEventListener('mouseout', handleHoverEnd)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
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

      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 36 : 12,
          height: isHovering ? 36 : 12,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isHovering ? 'rgba(196, 82, 42, 0.85)' : '#ffffff',
          mixBlendMode: isHovering ? 'normal' : 'difference',
        }}
        transition={{
          width: { duration: 0.2, ease: 'easeOut' },
          height: { duration: 0.2, ease: 'easeOut' },
          opacity: { duration: 0.15 },
          backgroundColor: { duration: 0.2 },
        }}
      />
    </>
  )
}
