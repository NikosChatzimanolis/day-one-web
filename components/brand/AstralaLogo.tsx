// ── components/brand/AstralaLogo.tsx ──
// Astrala Advisory's logo with the TALENT BUILDS TOMORROW line beneath. Uses
// the real asset at public/partners/astrala-logo.png (their "A" mark +
// wordmark, background keyed out) when it exists; until then it renders the
// name in their serif so the band never shows a broken image. Server
// component, so the file check runs at build time. The tagline is a brand
// line and stays untranslated.
import Image from 'next/image'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { cn } from '@/lib/utils'

const LOGO = '/partners/astrala-logo.png'
const hasLogo = existsSync(join(process.cwd(), 'public', LOGO))

interface AstralaLogoProps {
  tagline: string
  tone?: 'light' | 'dark'
  className?: string
}

export default function AstralaLogo({ tagline, tone = 'dark', className }: AstralaLogoProps) {
  const dark = tone === 'dark'
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
          <span className="font-cormorant text-[clamp(2.4rem,5.2vw,4.25rem)] font-normal uppercase leading-none tracking-[0.26em]">
            Astrala
          </span>
          <span className="mt-2 font-cormorant text-[clamp(0.8rem,1.4vw,1.05rem)] font-medium uppercase leading-none tracking-[0.5em]">
            Advisory
          </span>
        </span>
      )}
      <span aria-hidden="true" className={cn('mt-6 block h-px w-full', dark ? 'bg-dark-border' : 'bg-border')} />
      <span
        className={cn(
          'mt-4 font-body text-[0.625rem] uppercase leading-none tracking-[0.36em]',
          dark ? 'text-dark-text-secondary' : 'text-text-tertiary'
        )}
      >
        {tagline}
      </span>
    </span>
  )
}
