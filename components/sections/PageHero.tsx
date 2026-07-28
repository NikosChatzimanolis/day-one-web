// ── components/sections/PageHero.tsx ──
// Consistent inner-page hero: eyebrow, large display headline, lead paragraph.
import Reveal from '@/components/ui/Reveal'

interface PageHeroProps {
  eyebrow: string
  title: React.ReactNode
  lead?: React.ReactNode
  children?: React.ReactNode
  /**
   * Render the hero without the entrance animation (the same resting state
   * reduced-motion users see). Used on standalone landing pages where the
   * headline is the LCP element and must not wait for hydration.
   */
  instant?: boolean
}

export default function PageHero({ eyebrow, title, lead, children, instant = false }: PageHeroProps) {
  const Wrap = instant
    ? ({ children: c }: { children: React.ReactNode; delay?: number }) => <>{c}</>
    : Reveal
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 gradient-mesh" aria-hidden="true" />
      <div className="container-wide relative z-10 section-hero">
        <Wrap>
          <p className="eyebrow mb-7">{eyebrow}</p>
        </Wrap>
        <Wrap delay={0.07}>
          <h1 className="t-display max-w-4xl display-balance">{title}</h1>
        </Wrap>
        {lead && (
          <Wrap delay={0.14}>
            <p className="t-lead mt-9 text-text-secondary measure-lg display-pretty">{lead}</p>
          </Wrap>
        )}
        {children && (
          <Wrap delay={0.2}>
            <div className="mt-11">{children}</div>
          </Wrap>
        )}
      </div>
    </section>
  )
}
