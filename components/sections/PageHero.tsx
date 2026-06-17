// ── components/sections/PageHero.tsx ──
// Consistent inner-page hero: eyebrow, large display headline, lead paragraph.
import Reveal from '@/components/ui/Reveal'

interface PageHeroProps {
  eyebrow: string
  title: React.ReactNode
  lead?: React.ReactNode
  children?: React.ReactNode
}

export default function PageHero({ eyebrow, title, lead, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 gradient-mesh" aria-hidden="true" />
      <div className="container-wide relative z-10 section-hero">
        <Reveal>
          <p className="eyebrow mb-7">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.07}>
          <h1 className="t-display max-w-4xl display-balance">{title}</h1>
        </Reveal>
        {lead && (
          <Reveal delay={0.14}>
            <p className="t-lead mt-9 text-text-secondary measure-lg display-pretty">{lead}</p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={0.2}>
            <div className="mt-11">{children}</div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
