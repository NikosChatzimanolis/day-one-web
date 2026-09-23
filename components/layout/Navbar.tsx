// ── components/layout/Navbar.tsx ──
// Fixed header: logotype left, seven text links, outlined "Book a call" pill.
// No chips, no shadows (reference). Mobile collapses to a drawer.
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useReducedMotion, AnimatePresence, type Variants } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { nav } from '@/lib/site'
import { copy } from '@/lib/copy'
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

  // The hamburger is mobile-only (desktop shows inline links). Close the
  // drawer if the viewport grows past the breakpoint while it is open.
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setIsOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-bg">
        <div className="container-hero">
          <div className="flex items-center justify-between gap-6 py-5 lg:py-6">
            <Link href="/" aria-label={copy.nav.home} className="transition-opacity duration-250 hover:opacity-80">
              <Logo variant="primary" size="md" />
            </Link>

            <div className="hidden items-center gap-9 lg:flex">
              <nav className="flex items-center gap-8" aria-label="Main">
                {nav.map((item) => {
                  const active = isActive(pathname, item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'font-body text-[15px] tracking-wide transition-colors duration-250',
                        item.highlight
                          ? 'text-rust font-medium hover:text-accent-dark'
                          : active
                            ? 'text-accent'
                            : 'text-text-primary hover:text-accent'
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
              <BookCall variant="outline" size="lg" magnetic={false} />
            </div>

            <button
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-text-primary transition-colors duration-250 hover:text-accent lg:hidden"
              onClick={() => setIsOpen(true)}
              aria-label={copy.nav.menuOpen}
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
              className="fixed inset-0 z-[60] bg-[rgba(36,35,32,0.45)] backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed bottom-0 right-0 top-0 z-[70] flex w-[82vw] max-w-[360px] flex-col bg-bg"
              variants={reduce ? undefined : drawerVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex h-[72px] items-center justify-between border-b border-border px-6">
                <Logo variant="primary" size="sm" showTagline={false} />
                <button
                  className="-mr-2 flex h-10 w-10 items-center justify-center text-text-secondary transition-colors hover:text-text-primary"
                  onClick={() => setIsOpen(false)}
                  aria-label={copy.nav.menuClose}
                >
                  <X size={22} strokeWidth={1.5} />
                </button>
              </div>

              <nav className="flex flex-col gap-1 px-6 py-8" aria-label="Mobile">
                {nav.map((item, i) => (
                  <motion.div key={item.href} custom={i} variants={reduce ? undefined : drawerItem} initial="closed" animate="open">
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center border-b border-border py-3.5 font-display text-2xl font-light transition-colors',
                        item.highlight
                          ? 'text-rust'
                          : isActive(pathname, item.href)
                            ? 'text-accent'
                            : 'text-text-primary hover:text-accent'
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
