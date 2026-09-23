// ── components/brand/AstralaWordmark.tsx ──
// Astrala Advisory's name set in Cormorant Garamond (their brand serif, which
// this site already loads), with the TALENT BUILDS TOMORROW tagline beneath.
// Text, not an image, so it stays crisp and recolours per band. The tagline is
// a brand line and stays untranslated.
import { cn } from '@/lib/utils'

interface AstralaWordmarkProps {
  tagline: string
  tone?: 'light' | 'dark'
  className?: string
}

export default function AstralaWordmark({ tagline, tone = 'dark', className }: AstralaWordmarkProps) {
  const dark = tone === 'dark'
  return (
    <span
      role="img"
      aria-label="Astrala Advisory"
      className={cn('inline-flex flex-col items-center', dark ? 'text-dark-text' : 'text-text-primary', className)}
    >
      <span className="font-cormorant text-[clamp(2.4rem,5.2vw,4.25rem)] font-normal uppercase leading-none tracking-[0.26em]">
        Astrala
      </span>
      <span className="mt-2 font-cormorant text-[clamp(0.8rem,1.4vw,1.05rem)] font-medium uppercase leading-none tracking-[0.5em]">
        Advisory
      </span>
      <span
        aria-hidden="true"
        className={cn('mt-6 block h-px w-full', dark ? 'bg-dark-border' : 'bg-border')}
      />
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
