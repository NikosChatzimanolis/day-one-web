'use client'
// ── components/ui/Button.tsx ──
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'outline' | 'ghost' | 'outline-dark'
type Size = 'md' | 'lg'

const base =
  'group relative inline-flex items-center justify-center gap-2 font-body font-medium rounded-sm transition-all duration-250 ease-out-expo focus-visible:outline-2 focus-visible:outline-offset-2'

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-8 py-4 text-sm',
}

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-white hover:bg-accent-dark',
  outline:
    'border border-border-strong text-text-primary hover:border-accent hover:text-accent bg-transparent',
  'outline-dark':
    'border border-white/20 text-dark-text hover:border-rust hover:text-rust bg-transparent',
  ghost:
    'text-accent hover:text-accent-dark px-0 py-0',
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
