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
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close drawer on route change
  useEffect(() => { setIsOpen(false) }, [pathname])

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Pages with a dark hero need a light navbar treatment while at the top
  // (before the parchment background kicks in on scroll).
  const onDark = pathname.startsWith('/forge') && !scrolled

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-400 ease-out-expo',
          scrolled
            ? 'bg-[rgba(250,234,219,0.88)] backdrop-blur-md border-b border-border'
            : 'bg-transparent border-b border-transparent'
        )}
      >
        <div className="container-wide">
          <div className="flex items-center justify-between h-[72px]">
            <Link href="/" aria-label="Day One — home" className="hover:opacity-80 transition-opacity duration-250">
              <Logo variant={onDark ? 'dark' : 'primary'} size="sm" showTagline={false} />
            </Link>

            <nav className="hidden md:flex items-center gap-9" aria-label="Main">
              {nav.slice(1).map((item) => {
                const active = isActive(pathname, item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative text-sm font-body transition-colors duration-250',
                      active
                        ? onDark ? 'text-rust' : 'text-accent'
                        : onDark ? 'text-dark-text hover:text-rust' : 'text-text-primary hover:text-accent'
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        'absolute -bottom-1.5 left-0 h-px transition-all duration-300 ease-out-expo',
                        onDark ? 'bg-rust' : 'bg-accent',
                        active ? 'w-full' : 'w-0'
                      )}
                    />
                  </Link>
                )
              })}
            </nav>

            <div className="flex items-center gap-3">
              <div className="hidden md:block">
                <BookCall size="md" arrow={false} />
              </div>
              <button
                className={cn(
                  'md:hidden flex items-center justify-center w-10 h-10 -mr-2',
                  onDark ? 'text-dark-text' : 'text-text-primary'
                )}
                onClick={() => setIsOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={22} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-[rgba(26,24,22,0.45)] backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-[70] w-[82vw] max-w-[360px] bg-bg flex flex-col md:hidden"
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
