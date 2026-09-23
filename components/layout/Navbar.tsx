// ── components/layout/Navbar.tsx ──
// Fixed header: logotype left, seven text links, EN · EL · RU switch, and the
// outlined "Book a call" pill. Client component, so every string and href
// arrives as a prop from the [locale] layout. Mobile collapses to a drawer.
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useReducedMotion, AnimatePresence, type Variants } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { localizePath, stripLocale, localeLabels, locales, type Locale } from '@/lib/copy'
import Logo from '@/components/ui/Logo'
import { Button } from '@/components/ui/Button'

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
  if (href === '/' || /^\/(el|ru)$/.test(href)) return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`)
}

export interface NavbarProps {
  locale: Locale
  items: { label: string; href: string }[]
  bookCall: { label: string; href: string; external: boolean }
  labels: { menuOpen: string; menuClose: string; home: string }
}

export default function Navbar({ locale, items, bookCall, labels }: NavbarProps) {
  const reduce = useReducedMotion()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const homeHref = localizePath('/', locale)
  const { path } = stripLocale(pathname)
  const languages = (Object.keys(locales) as Locale[]).map((code) => ({
    code,
    label: localeLabels[code],
    href: localizePath(path, code),
    active: code === locale,
  }))

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

  const pill = (className?: string) =>
    bookCall.external ? (
      <Button href={bookCall.href} external variant="outline" size="lg" className={className}>
        {bookCall.label}
      </Button>
    ) : (
      <Button href={bookCall.href} variant="outline" size="lg" className={className}>
        {bookCall.label}
      </Button>
    )

  const languageSwitch = (className?: string) => (
    <nav aria-label="Language" className={cn('flex items-center gap-3', className)}>
      {languages.map((l) => (
        <Link
          key={l.code}
          href={l.href}
          hrefLang={l.code}
          aria-current={l.active ? 'true' : undefined}
          className={cn(
            'font-body text-[12px] tracking-[0.16em] transition-colors duration-250',
            l.active ? 'text-accent' : 'text-text-tertiary hover:text-text-primary'
          )}
        >
          {l.label}
        </Link>
      ))}
    </nav>
  )

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-bg">
        <div className="container-hero">
          <div className="flex items-center justify-between gap-6 py-5 lg:py-6">
            <Link href={homeHref} aria-label={labels.home} className="transition-opacity duration-250 hover:opacity-80">
              <Logo variant="primary" size="md" />
            </Link>

            <div className="hidden items-center gap-8 lg:flex">
              <nav className="flex items-center gap-8" aria-label="Main">
                {items.map((item) => {
                  const active = isActive(pathname, item.href)
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'font-body text-[15px] tracking-wide transition-colors duration-250',
                        active ? 'text-accent' : 'text-text-primary hover:text-accent'
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </nav>
              {languageSwitch()}
              {pill()}
            </div>

            <button
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-text-primary transition-colors duration-250 hover:text-accent lg:hidden"
              onClick={() => setIsOpen(true)}
              aria-label={labels.menuOpen}
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
                  aria-label={labels.menuClose}
                >
                  <X size={22} strokeWidth={1.5} />
                </button>
              </div>

              <nav className="flex flex-col gap-1 px-6 py-8" aria-label="Mobile">
                {items.map((item, i) => (
                  <motion.div key={item.href} custom={i} variants={reduce ? undefined : drawerItem} initial="closed" animate="open">
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center border-b border-border py-3.5 font-display text-2xl font-light transition-colors',
                        isActive(pathname, item.href) ? 'text-accent' : 'text-text-primary hover:text-accent'
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-6 px-6 pb-10">
                {languageSwitch()}
                {pill('w-full')}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
