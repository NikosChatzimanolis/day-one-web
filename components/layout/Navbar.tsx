// ── components/layout/Navbar.tsx ──
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useReducedMotion, AnimatePresence, type Variants } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { nav } from '@/lib/site'
import Logo from '@/components/ui/Logo'
import BookCall from '@/components/ui/BookCall'

const drawerVariants: Variants = {
  closed: { x: '100%' },
  open: { x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

const drawerItem: Variants = {
  closed: { opacity: 0, x: 24 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06 + 0.12, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  }),
}

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function Navbar() {
  const reduce = useReducedMotion()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Close drawer on route change
  useEffect(() => { setIsOpen(false) }, [pathname])

  // The hamburger is mobile-only (desktop shows inline links) — close the drawer
  // if the viewport grows past the breakpoint while it's open.
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-transparent">
        <div className="container-wide">
          <div className="flex items-center justify-between gap-3 py-3">
            {/* parchment chip only behind the logo */}
            <Link
              href="/"
              aria-label="Day One — home"
              className="inline-flex items-center rounded-full bg-bg border border-border shadow-sm px-4 py-2 hover:opacity-90 transition-opacity duration-250"
            >
              <Logo variant="primary" size="sm" showTagline={false} />
            </Link>

            {/* parchment chip only behind the nav links */}
            <nav className="hidden md:flex items-center gap-7 rounded-full bg-bg border border-border shadow-sm px-6 py-2.5" aria-label="Main">
              {nav.slice(1).map((item) => {
                const active = isActive(pathname, item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'text-[13px] font-body tracking-wide transition-colors duration-250',
                      active ? 'text-accent' : 'text-text-primary hover:text-accent'
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            {/* parchment chip behind the mobile menu button */}
            <button
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-bg border border-border shadow-sm text-text-primary hover:text-accent transition-colors duration-250"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-[rgba(26,24,22,0.45)] backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-[70] w-[82vw] max-w-[360px] bg-bg flex flex-col"
              variants={reduce ? undefined : drawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex items-center justify-between px-6 h-[72px] border-b border-border">
                <Logo variant="primary" size="sm" showTagline={false} />
                <button
                  className="flex items-center justify-center w-10 h-10 -mr-2 text-text-secondary hover:text-text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={22} strokeWidth={1.5} />
                </button>
              </div>

              <nav className="flex flex-col px-6 py-8 gap-1" aria-label="Mobile">
                {nav.map((item, i) => (
                  <motion.div key={item.href} custom={i} variants={reduce ? undefined : drawerItem} initial="closed" animate="open">
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center py-3.5 font-display text-2xl font-light border-b border-border/60 transition-colors',
                        isActive(pathname, item.href) ? 'text-accent' : 'text-text-primary hover:text-accent'
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto px-6 pb-10">
                <BookCall size="lg" className="w-full" magnetic={false} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
