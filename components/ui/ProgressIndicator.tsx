// ── components/ui/ProgressIndicator.tsx ──
'use client'

import { motion } from 'framer-motion'
import { useScrollContext, SECTIONS } from '@/context/ScrollContext'

export default function ProgressIndicator() {
  const { currentIndex, scrollToSection } = useScrollContext()

  return (
    <>
      {/* Desktop: right side, vertical */}
      <div className="hidden md:flex fixed right-5 top-1/2 -translate-y-1/2 flex-col gap-4 z-40">
        {SECTIONS.map((section, i) => (
          <div key={section.id} className="flex items-center justify-end">
            <button
              onClick={() => scrollToSection(i)}
              aria-label={`Go to ${section.label}`}
              className="flex items-center justify-center w-5 h-5"
            >
              <motion.div
                animate={{
                  width: currentIndex === i ? 10 : 6,
                  height: currentIndex === i ? 10 : 6,
                  backgroundColor: currentIndex === i ? '#C4522A' : 'rgba(26,26,24,0.5)',
                  borderRadius: '50%',
                  boxShadow: currentIndex === i ? '0 0 0 2px rgba(196,82,42,0.25)' : '0 0 0 0px transparent',
                }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Mobile: bottom, horizontal */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 flex flex-row gap-4 z-40">
        {SECTIONS.map((section, i) => (
          <button
            key={section.id}
            onClick={() => scrollToSection(i)}
            aria-label={`Go to ${section.label}`}
            className="flex items-center justify-center w-5 h-5"
          >
            <motion.div
              animate={{
                width: currentIndex === i ? 10 : 6,
                height: currentIndex === i ? 10 : 6,
                backgroundColor: currentIndex === i ? '#C4522A' : 'rgba(26,26,24,0.5)',
                borderRadius: '50%',
                boxShadow: currentIndex === i ? '0 0 0 2px rgba(196,82,42,0.25)' : '0 0 0 0px transparent',
              }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            />
          </button>
        ))}
      </div>
    </>
  )
}
