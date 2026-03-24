// ── components/ui/Logo.tsx ──
'use client'

import { cn } from '@/lib/utils'

type LogoVariant = 'primary' | 'dark' | 'white' | 'mono'
type LogoSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

interface LogoProps {
  variant?: LogoVariant
  size?: LogoSize
  className?: string
  showTagline?: boolean
}

const sizeMap: Record<LogoSize, { day: string; one: string; tagline: string; dividerMargin: string; gap: string; pb: string }> = {
  sm:  { day: 'text-[2rem]',   one: 'text-[0.875rem]', tagline: '',            dividerMargin: 'mx-2 mb-[0.3rem]', gap: 'gap-[0.15rem]', pb: 'pb-[0.3rem]' },
  md:  { day: 'text-[3rem]',   one: 'text-[1.5rem]',   tagline: 'text-[0.5rem]',    dividerMargin: 'mx-3 mb-[0.4rem]', gap: 'gap-[0.2rem]',  pb: 'pb-[0.4rem]' },
  lg:  { day: 'text-[4.5rem]', one: 'text-[1.875rem]', tagline: 'text-[0.5625rem]', dividerMargin: 'mx-3 mb-[0.4rem]', gap: 'gap-[0.2rem]',  pb: 'pb-[0.4rem]' },
  xl:  { day: 'text-[6rem]',   one: 'text-[2.5rem]',   tagline: 'text-[0.75rem]',   dividerMargin: 'mx-4 mb-[0.5rem]', gap: 'gap-[0.25rem]', pb: 'pb-[0.5rem]' },
  '2xl': { day: 'text-[9rem]',  one: 'text-[3.5rem]',  tagline: 'text-[1rem]',      dividerMargin: 'mx-5 mb-[0.6rem]', gap: 'gap-[0.3rem]',  pb: 'pb-[0.6rem]' },
}

const variantColors: Record<LogoVariant, { day: string; one: string; tagline: string; divider: string }> = {
  primary: { day: 'text-[#C04C2A]', one: 'text-[#1A1816]', tagline: 'text-[#9A8F82]', divider: 'bg-[rgba(192,76,42,0.3)]' },
  dark:    { day: 'text-[#D06040]', one: 'text-[#F5F0EA]', tagline: 'text-[#6A5F52]', divider: 'bg-[rgba(208,96,64,0.4)]' },
  white:   { day: 'text-[#F5F0EA]', one: 'text-[#F5F0EA]', tagline: 'text-[rgba(245,240,234,0.5)]', divider: 'bg-[rgba(245,240,234,0.2)]' },
  mono:    { day: 'text-[#1A1816]', one: 'text-[#1A1816]', tagline: 'text-[#8A7F74]', divider: 'bg-[rgba(26,24,22,0.2)]' },
}

export default function Logo({ variant = 'primary', size = 'md', className, showTagline = true }: LogoProps) {
  const s = sizeMap[size]
  const c = variantColors[variant]

  return (
    <span className={cn('inline-flex items-end leading-none select-none', className)}>
      {/* "Day" in script font */}
      <span className={cn('font-[var(--font-script)] leading-none tracking-tight', s.day, c.day)}
        style={{ fontFamily: 'var(--font-script)' }}
      >
        Day
      </span>

      {/* Vertical divider */}
      <span className={cn('w-[1.5px] self-stretch shrink-0', s.dividerMargin, c.divider)} />

      {/* Right column: ONE + tagline */}
      <span className={cn('flex flex-col justify-end', s.gap, s.pb)}>
        <span className={cn('leading-none tracking-[0.12em] uppercase font-[200]', s.one, c.one)}
          style={{ fontFamily: 'var(--font-jost)' }}
        >
          ONE
        </span>
        {showTagline && size !== 'sm' && (
          <span className={cn('leading-none tracking-[0.25em] uppercase font-[300]', s.tagline, c.tagline)}
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            WEB STUDIO
          </span>
        )}
      </span>
    </span>
  )
}
