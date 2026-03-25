// ── components/layout/Footer.tsx ──
'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useScrollContext } from '@/context/ScrollContext'
import Logo from '@/components/ui/Logo'

const languages = ['EN', 'EL', 'RU'] as const
type Language = typeof languages[number]

const footerLinks = [
  { label: 'Process',  href: '#process' },
  { label: 'Work',     href: '#demo' },
  { label: 'Pricing',  href: '#offer' },
  { label: 'Contact',  href: '#contact' },
]

const NAV_INDEX: Record<string, number> = {
  '#process': 2,
  '#demo':    3,
  '#offer':   4,
  '#contact': 5,
}

export default function Footer() {
  const [activeLang, setActiveLang] = useState<Language>('EN')
  const { scrollToSection } = useScrollContext()

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault()
    const idx = NAV_INDEX[href]
    if (idx !== undefined) scrollToSection(idx)
  }

  return (
    <footer className="bg-dark text-[#F7F4EF]" aria-label="Site footer">
      <div className="container-wide py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pb-12 border-b border-[#333330]">
          {/* Brand column */}
          <div className="md:col-span-1">
            <a
              href="#"
              className="inline-block mb-3 hover:opacity-80 transition-opacity duration-250"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(0)
              }}
            >
              <Logo variant="dark" size="sm" showTagline={false} />
            </a>
            <p className="font-body text-sm text-[#9C9790] leading-relaxed max-w-[220px]">
              Systems that bring customers to your business.
            </p>
          </div>

          {/* Nav column */}
          <div className="md:col-span-1">
            <p className="section-label mb-5">Navigation</p>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-[#9C9790] hover:text-[#F7F4EF] transition-colors duration-200 w-fit"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact column */}
          <div className="md:col-span-1">
            <p className="section-label mb-5">Get in touch</p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:contact@dayone-web.com"
                className="font-body text-sm text-[#9C9790] hover:text-[#F7F4EF] transition-colors duration-200 w-fit"
              >
                contact@dayone-web.com
              </a>
              <a
                href="tel:+35796254148"
                className="font-body text-sm text-[#9C9790] hover:text-[#F7F4EF] transition-colors duration-200 w-fit"
              >
                +357 96 254 148
              </a>
              <a
                href="https://wa.me/35796254148"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-accent hover:text-[#E07050] transition-colors duration-200 w-fit"
              >
                WhatsApp →
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-body text-xs text-[#6B6660]">
            © 2026 Day One. Cyprus.
          </p>

          {/* Language switcher */}
          <div className="flex items-center gap-1" aria-label="Language switcher">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={cn(
                  'px-2.5 py-1 font-body text-xs rounded-sm transition-all duration-200',
                  activeLang === lang
                    ? 'bg-accent text-white'
                    : 'text-[#6B6660] hover:text-[#9C9790]'
                )}
                aria-label={`Switch to ${lang}`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
