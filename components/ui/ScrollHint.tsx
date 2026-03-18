// ── components/ui/ScrollHint.tsx ──
'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useScrollContext } from '@/context/ScrollContext'

export default function ScrollHint() {
  const { currentIndex } = useScrollContext()
  const [visible, setVisible] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {currentIndex === 0 && visible && (
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="font-body text-xs text-text-secondary/60 tracking-widest uppercase">
            Scroll
          </span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-text-secondary/40 to-transparent origin-top"
            animate={shouldReduceMotion ? {} : { scaleY: [1, 0.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
