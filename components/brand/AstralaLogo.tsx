// ── components/brand/AstralaLogo.tsx ──
// Astrala Advisory's logo with their line beneath (Developmental intelligence ·
// Operational excellence). Uses
// the real asset at public/partners/astrala-logo.png (their "A" mark +
// wordmark, background keyed out) when it exists; until then it renders the
// name in their serif so the band never shows a broken image. Server
// component, so the file check runs at render time on the server (build or dev). The tagline is a brand
// line and stays untranslated.
import Image from 'next/image'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { cn } from '@/lib/utils'

const LOGO = '/partners/astrala-logo.png'
// Sampled from the wordmark in the logo (median of its opaque pixels), and a
// deeper blue from the mark for light backgrounds.
const ASTRALA_CYAN = '#42D9F9'
const ASTRALA_BLUE = '#1A8FD9'

interface AstralaLogoProps {
  tagline: string
  tone?: 'light' | 'dark'
  className?: string
}

export default function AstralaLogo({ tagline, tone = 'dark', className }: AstralaLogoProps) {
  const dark = tone === 'dark'
  const hasLogo = existsSync(join(process.cwd(), 'public', LOGO))
  return (
    <span className={cn('inline-flex w-full max-w-[380px] flex-col items-center', dark ? 'text-dark-text' : 'text-text-primary', className)}>
      {hasLogo ? (
        <Image
          src={LOGO}
          alt="Astrala Advisory"
          width={1200}
          height={480}
          sizes="(min-width: 1024px) 380px, 70vw"
          className="h-auto w-full"
        />
      ) : (
        <span role="img" aria-label="Astrala Advisory" className="inline-flex flex-col items-center">
          <span className="font-cormorant text-[clamp(2.4rem,5.2vw,4.25rem)] font-normal italic uppercase leading-none tracking-[0.26em]">
            Astrala
          </span>
          <span className="mt-2 font-cormorant text-[clamp(0.8rem,1.4vw,1.05rem)] font-normal italic uppercase leading-none tracking-[0.5em]">
            Advisory
          </span>
        </span>
      )}
      <span aria-hidden="true" className={cn('mt-6 block h-px w-full', dark ? 'bg-dark-border' : 'bg-border')} />
      <span
        className="mt-4 text-center font-body text-[0.625rem] uppercase leading-[1.7] tracking-[0.22em]"
        style={{ color: dark ? ASTRALA_CYAN : ASTRALA_BLUE }}
      >
        {tagline}
      </span>
    </span>
  )
}
