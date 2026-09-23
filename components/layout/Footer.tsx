// ── components/layout/Footer.tsx ──
// One-row footer on the ivory: logotype, the three direct channels with
// arrows, location, privacy, then the legal line and tagline. Server
// component: strings and paths follow the request locale.
import Link from 'next/link'
import { site } from '@/lib/site'
import { t, localeHref } from '@/lib/copy/request'
import Logo from '@/components/ui/Logo'

const year = new Date().getFullYear()

const linkClass =
  'group inline-flex items-center gap-1 font-body text-sm text-text-secondary transition-colors duration-250 hover:text-accent'
const arrow = (
  <span aria-hidden="true" className="transition-transform duration-250 group-hover:translate-x-0.5">→</span>
)

export default function Footer() {
  const c = t()
  const f = c.footer
  return (
    <footer className="border-t border-border bg-bg" aria-label="Site footer">
      <div className="container-hero flex flex-col gap-8 py-10 md:py-12 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <Link href={localeHref('/')} aria-label={c.nav.home} className="inline-flex transition-opacity duration-250 hover:opacity-80">
          <Logo variant="primary" size="md" />
        </Link>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <a href={`mailto:${site.email}`} className={linkClass}>
            {f.email}
            {arrow}
          </a>
          <a href={`tel:${site.phoneHref}`} className={linkClass}>
            {f.phone}
            {arrow}
          </a>
          <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className={linkClass}>
            {f.whatsapp}
            {arrow}
          </a>
          <span className="font-body text-sm text-text-secondary">{f.location}</span>
          <Link href={localeHref('/privacy')} className={linkClass}>
            {f.privacy}
          </Link>
        </nav>

        <div className="font-body text-xs leading-relaxed text-text-tertiary lg:text-right">
          <p>{f.copyright.replace('{year}', String(year))}</p>
          <p>{f.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
