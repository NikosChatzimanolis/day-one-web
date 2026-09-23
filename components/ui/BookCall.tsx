// ── components/ui/BookCall.tsx ──
// The site's primary CTA. Resolves to an external calendar when configured,
// otherwise routes to the contact page's booking block in the current locale.
// Server component: the label comes from the request locale unless given.
// The primary button is magnetic by default (eases a few px toward the cursor
// on hover); pass magnetic={false} for full-width touch placements.
import { Button } from '@/components/ui/Button'
import Magnetic from '@/components/ui/Magnetic'
import { site, bookCallHref } from '@/lib/site'
import { t, localeHref } from '@/lib/copy/request'

interface BookCallProps {
  variant?: 'primary' | 'outline' | 'outline-dark' | 'cream'
  size?: 'md' | 'lg'
  className?: string
  label?: string
  arrow?: boolean
  /** magnetic pull on hover (default on for pointer devices) */
  magnetic?: boolean
}

export default function BookCall({
  variant = 'primary',
  size = 'lg',
  className,
  label,
  arrow = false,
  magnetic = true,
}: BookCallProps) {
  const usesCalendar = Boolean(site.bookingUrl)
  const button = (
    <Button
      href={usesCalendar ? site.bookingUrl : localeHref(bookCallHref)}
      external={usesCalendar}
      variant={variant}
      size={size}
      arrow={arrow}
      className={className}
    >
      {label ?? t().nav.bookCall}
    </Button>
  )

  if (!magnetic) return button
  return (
    <Magnetic mode="hover" strength={0.3} className="inline-flex">
      {button}
    </Magnetic>
  )
}
