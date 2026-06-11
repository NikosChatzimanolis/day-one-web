// ── components/layout/Footer.tsx ──
'use client'

import { cn } from '@/lib/utils'
import { useScrollContext } from '@/context/ScrollContext'
import { useLanguage } from '@/context/LanguageContext'
import { t, languages } from '@/lib/translations'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'

const navKeys = [
  { key: 'nav.process' as const, href: '#process' },
  { key: 'nav.pricing' as const, href: '#offer' },
  { key: 'nav.contact' as const, href: '#contact' },
]

const NAV_INDEX: Record<string, number> = {
  '#process': 1,
  '#offer':   2,
  '#contact': 3,
}

export default function Footer() {
  const { scrollToSection } = useScrollContext()
  const { lang, setLang } = useLanguage()

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
              {t('footer.tagline', lang)}
            </p>
          </div>

          {/* Nav column */}
          <div className="md:col-span-1">
            <p className="section-label mb-5">{t('footer.navigation', lang)}</p>
            <nav className="flex flex-col gap-3" aria-label="Footer navigation">
              {navKeys.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="font-body text-sm text-[#9C9790] hover:text-[#F7F4EF] transition-colors duration-200 w-fit"
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {t(item.key, lang)}
                </a>
              ))}
              <Link
                href="/review"
                className="font-body text-sm text-[#9C9790] hover:text-[#F7F4EF] transition-colors duration-200 w-fit"
              >
                {t('footer.leaveReview', lang)}
              </Link>
            </nav>
          </div>

          {/* Contact column */}
          <div className="md:col-span-1">
            <p className="section-label mb-5">{t('footer.getInTouch', lang)}</p>
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
            {t('footer.copyright', lang)}
          </p>

          {/* Language switcher */}
          <div className="flex items-center gap-1" aria-label="Language switcher">
            {languages.map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cn(
                  'px-2.5 py-1 font-body text-xs rounded-sm transition-all duration-200',
                  lang === l
                    ? 'bg-accent text-white'
                    : 'text-[#6B6660] hover:text-[#9C9790]'
                )}
                aria-label={`Switch to ${l}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
