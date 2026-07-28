// ── components/layout/Footer.tsx ──
import Link from 'next/link'
import { nav, site } from '@/lib/site'
import Logo from '@/components/ui/Logo'
import Reveal from '@/components/ui/Reveal'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="section-dark" aria-label="Site footer">
      <div className="container-wide pt-20 pb-12 md:pt-24 md:pb-16">
        {/* Brand — the clean Day One logotype, centred on the dark field */}
        <Reveal as="div" className="flex flex-col items-center text-center pb-14 md:pb-16 border-b border-dark-border">
          <Link href="/" aria-label="Day One — home" className="transition-opacity duration-250 hover:opacity-80">
            <Logo variant="dark" size="lg" showTagline={false} />
          </Link>
          <p className="mt-6 font-body text-sm text-dark-text-secondary leading-relaxed max-w-sm">
            A technical partner that ships like a founder. Build, scale, maintain — one continuous relationship.
          </p>
        </Reveal>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-10 py-14 md:grid-cols-3 md:gap-8 md:py-16">
          <nav aria-label="Footer">
            <p className="eyebrow-muted mb-5">Navigate</p>
            <ul className="flex flex-col gap-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`font-body text-sm transition-colors duration-250 ${
                      item.highlight
                        ? 'text-rust hover:text-dark-text'
                        : 'text-dark-text-secondary hover:text-dark-text'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow-muted mb-5">Contact</p>
            <ul className="flex flex-col gap-3">
              <li>
                <a href={`mailto:${site.email}`} className="font-body text-sm text-dark-text-secondary hover:text-dark-text transition-colors duration-250">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phoneHref}`} className="font-body text-sm text-dark-text-secondary hover:text-dark-text transition-colors duration-250">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-rust hover:text-dark-text transition-colors duration-250">
                  WhatsApp →
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow-muted mb-5">Studio</p>
            <p className="font-body text-sm text-dark-text-secondary leading-relaxed">
              {site.location}
              <br />
              Working with founders across Europe.
            </p>
          </div>
        </div>

        {/* Legal */}
        <div className="pt-8 border-t border-dark-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="font-body text-xs text-muted">
            © {year} {site.legalName}.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/privacy"
              className="font-body text-xs text-muted hover:text-dark-text transition-colors duration-250"
            >
              Privacy
            </Link>
            <p className="font-body text-xs text-muted">{site.location}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
