// ── components/ui/Magnetic.tsx ──
// Two small cursor-aware behaviours sharing one eased core:
//   mode="hover"   → the element pulls a few px toward the cursor while hovered
//                    and eases home on leave (the magnetic primary buttons).
//   mode="ambient" → the element drifts gently toward the cursor's position in
//                    the viewport even without a direct hover (the hero
//                    wordmark, which is pointer-events:none but still alive).
// All movement is transform-only and spring-eased. Touch never triggers it
// (no mousemove); reduced-motion renders a plain wrapper.
'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

interface MagneticProps {
  children: React.ReactNode
  className?: string
  mode?: 'hover' | 'ambient'
  /** hover: fraction of cursor offset applied. ambient: fraction of distance. */
  strength?: number
  /** ambient: max drift in px on each axis */
  maxShift?: number
}

export default function Magnetic({
  children,
  className,
  mode = 'hover',
  strength = mode === 'hover' ? 0.32 : 0.04,
  maxShift = 16,
}: MagneticProps) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const config = mode === 'hover'
    ? { stiffness: 220, damping: 18, mass: 0.4 }
    : { stiffness: 90, damping: 22, mass: 0.6 }
  const sx = useSpring(x, config)
  const sy = useSpring(y, config)

  useEffect(() => {
    if (reduce || mode !== 'ambient') return
    let raf = 0
    const onMove = (e: MouseEvent) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const clamp = (v: number) => Math.max(-maxShift, Math.min(maxShift, v))
        x.set(clamp((e.clientX - cx) * strength))
        y.set(clamp((e.clientY - cy) * strength))
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduce, mode, strength, maxShift, x, y])

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  const hoverHandlers =
    mode === 'hover'
      ? {
          onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => {
            const el = ref.current
            if (!el) return
            const r = el.getBoundingClientRect()
            x.set((e.clientX - (r.left + r.width / 2)) * strength)
            y.set((e.clientY - (r.top + r.height / 2)) * strength)
          },
          onMouseLeave: () => {
            x.set(0)
            y.set(0)
          },
        }
      : {}

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      {...hoverHandlers}
    >
      {children}
    </motion.div>
  )
}
