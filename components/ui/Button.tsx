'use client'
// ── components/ui/Button.tsx ──
// Pill buttons, hairline borders, no shadows. `primary` is the ink pill from
// the reference (rust is reserved for accents and mock UI); `cream` sits on
// the dark bands; `outline` is the header pill.
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'outline' | 'ghost' | 'outline-dark' | 'cream'
type Size = 'md' | 'lg'

const base =
  'group relative inline-flex items-center justify-center gap-2 font-body font-normal rounded-full transition-all duration-250 ease-out-expo focus-visible:outline-2 focus-visible:outline-offset-2'

const sizes: Record<Size, string> = {
  md: 'px-5 py-2 text-[13px]',
  lg: 'px-7 py-3.5 text-sm',
}

const variants: Record<Variant, string> = {
  primary: 'bg-text-primary text-bg hover:bg-accent',
  cream: 'bg-bg text-text-primary hover:bg-surface',
  outline:
    'border border-border-strong text-text-primary hover:border-text-primary bg-transparent',
  'outline-dark':
    'border border-white/25 text-dark-text hover:border-rust hover:text-rust bg-transparent',
  ghost: 'text-accent hover:text-accent-dark px-0 py-0',
}

interface BaseProps {
  variant?: Variant
  size?: Size
  className?: string
  children: React.ReactNode
  arrow?: boolean
}

type ButtonAsLink = BaseProps & {
  href: string
  external?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  arrow = false,
  href,
  external,
}: ButtonAsLink) {
  const classes = cn(base, variant !== 'ghost' && sizes[size], variants[variant], className)
  const noGrid = variant !== 'ghost' ? ({ 'data-no-grid': true } as const) : {}
  const inner = (
    <>
      {children}
      {arrow && (
        <span
          aria-hidden="true"
          className="transition-transform duration-250 ease-out-expo group-hover:translate-x-0.5"
        >
          →
        </span>
      )}
    </>
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...noGrid}>
        {inner}
      </a>
    )
  }

  return (
    <Link href={href} className={classes} {...noGrid}>
      {inner}
    </Link>
  )
}
