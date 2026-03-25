// ── components/layout/Navbar.tsx ──
'use client'

import { useState, useEffect } from 'react'
import { motion, useReducedMotion, AnimatePresence, type Variants } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { NavLink } from '@/types'
import { useScrollContext } from '@/context/ScrollContext'
import Logo from '@/components/ui/Logo'

const navLinks: NavLink[] = [
  { label: 'Process',  href: '#process' },
  { label: 'Work',     href: '#demo' },
  { label: 'Pricing',  href: '#offer' },
  { label: 'Contact',  href: '#contact' },
]

// Map nav hrefs to section indices
const NAV_INDEX: Record<string, number> = {
  '#process': 2,
  '#demo':    3,
  '#offer':   4,
  '#contact': 5,
}

const drawerVariants: Variants = {
  closed: { x: '100%', opacity: 0 },
  open: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
}

const drawerItemVariants: Variants = {
  closed: { opacity: 0, x: 24 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.07 + 0.1,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

function NavLinkItem({
  link,
  onClose,
  scrollToSection,
}: {
  link: NavLink
  onClose?: () => void
  scrollToSection: (i: number) => void
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    onClose?.()
    const idx = NAV_INDEX[link.href]
    if (idx !== undefined) scrollToSection(idx)
  }

  return (
    <a
      href={link.href}
      onClick={handleClick}
      className="relative group text-sm font-body font-[400] text-text-primary hover:text-accent transition-colors duration-250"
    >
      {link.label}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-px bg-accent origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%' }}
      />
    </a>
  )
}

export default function Navbar() {
  const shouldReduceMotion = useReducedMotion()
  const [isOpen, setIsOpen] = useState(false)
  const { currentIndex, scrollToSection } = useScrollContext()

  // scrolled = any section beyond Hero
  const scrolled = currentIndex > 0

  // Close drawer on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when drawer open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all',
          scrolled
            ? 'bg-[rgba(247,244,239,0.95)] backdrop-blur-md border-b border-border shadow-subtle'
            : 'bg-transparent'
        )}
        initial={shouldReduceMotion ? false : { y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <a
              href="#"
              className="hover:opacity-80 transition-opacity duration-250"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(0)
              }}
            >
              <Logo variant="primary" size="sm" showTagline={false} />
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map((link) => (
                <NavLinkItem key={link.href} link={link} scrollToSection={scrollToSection} />
              ))}
            </nav>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-4">
              <a
                href="#contact"
                className="hidden md:inline-flex items-center px-5 py-2.5 text-sm font-body font-[500] bg-accent text-white rounded-sm hover:bg-accent-dark transition-colors duration-250"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(5)
                }}
              >
                Get your free preview
              </a>

              <button
                className="md:hidden flex items-center justify-center w-10 h-10 text-text-primary"
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-[60] bg-[rgba(26,26,24,0.4)] backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-[70] w-[80vw] max-w-[360px] bg-bg flex flex-col"
              variants={shouldReduceMotion ? undefined : drawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-[72px] border-b border-border">
                <Logo variant="primary" size="sm" showTagline={false} />
                <button
                  className="flex items-center justify-center w-10 h-10 text-text-secondary hover:text-text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Drawer nav */}
              <nav className="flex flex-col px-6 py-8 gap-1" aria-label="Mobile navigation">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    custom={i}
                    variants={shouldReduceMotion ? undefined : drawerItemVariants}
                    initial="closed"
                    animate="open"
                  >
                    <a
                      href={link.href}
                      className="flex items-center py-3 font-body text-lg font-[400] text-text-primary hover:text-accent transition-colors duration-200 border-b border-border/50"
                      onClick={(e) => {
                        e.preventDefault()
                        setIsOpen(false)
                        const idx = NAV_INDEX[link.href]
                        if (idx !== undefined) scrollToSection(idx)
                      }}
                    >
                      {link.label}
                    </a>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer CTA */}
              <div className="mt-auto px-6 pb-10">
                <motion.div
                  custom={navLinks.length}
                  variants={shouldReduceMotion ? undefined : drawerItemVariants}
                  initial="closed"
                  animate="open"
                >
                  <a
                    href="#contact"
                    className="flex items-center justify-center w-full py-3.5 font-body font-[500] bg-accent text-white rounded-sm hover:bg-accent-dark transition-colors duration-250 text-center"
                    onClick={(e) => {
                      e.preventDefault()
                      setIsOpen(false)
                      scrollToSection(5)
                    }}
                  >
                    Get your free preview
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
