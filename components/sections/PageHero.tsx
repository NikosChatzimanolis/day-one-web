// ── components/sections/PageHero.tsx ──
// Consistent inner-page hero: eyebrow, large display headline, lead paragraph.
// A plain-text title with two parts ("Real systems. Live and in use.", "A
// senior core, with the reach to go wider.") is set like the homepage
// headline: the first part in Jost, the second in the rust Cormorant italic.
import Reveal from '@/components/ui/Reveal'

/** "One. Two three." -> ["One.", "Two three."]; a single sentence splits at its first comma, or not at all. */
function twoParts(title: string): [string, string | null] {
  const m = title.match(/^(.+?[.!?;])\s+(.+)$/) ?? title.match(/^(.+?,)\s+(.+)$/)
  return m ? [m[1], m[2]] : [title, null]
}

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
          {typeof title === 'string' && twoParts(title)[1] ? (
            <h1 className="max-w-4xl">
              <span className="t-display display-balance block">{twoParts(title)[0]}</span>
              <span className="display-balance mt-1 block font-cormorant text-[clamp(2.8rem,6.4vw,5.4rem)] font-normal italic leading-[1.04] tracking-[-0.01em] text-rust">
                {twoParts(title)[1]}
              </span>
            </h1>
          ) : (
            <h1 className="t-display max-w-4xl display-balance">{title}</h1>
          )}
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
