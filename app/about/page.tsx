// ── app/about/page.tsx — About / Studio ──
import type { Metadata } from 'next'
import PageHero from '@/components/sections/PageHero'
import CtaSection from '@/components/sections/CtaSection'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import TextReveal from '@/components/ui/TextReveal'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Day One is a small studio that builds the systems businesses run on, and stays to keep them running. One team, from day one.',
}

const principles = [
  {
    title: 'One team',
    body: 'The people who design your system are the people who build it and the people who maintain it. Nothing is handed off. Nothing is lost between teams that never met.',
  },
  {
    title: 'Understanding compounds',
    body: 'The longer we work on something, the better we get at it. Context builds. Decisions get faster and sharper. That only happens when the same people stay close to the work.',
  },
  {
    title: 'We stay',
    body: 'Launch is not the end. It is where the relationship settles in. We are still here months later, still improving what we built, still on the same side as you.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="The studio"
        title="A team that builds like the company is ours."
        lead="Day One is a studio, not a vendor. We build the systems businesses run on, and we stay to keep them running."
      />

      {/* Ships like a founder — left-anchored statement (uses the left space) */}
      <section className="bg-bg border-b border-border">
        <div className="container-wide section">
          <Reveal>
            <p className="eyebrow mb-8">Ships like a founder</p>
          </Reveal>
          <TextReveal
            as="p"
            className="t-h2 text-text-primary display-balance max-w-4xl"
            stagger={0.022}
            wordY={12}
            blur={5}
            lines={[{ text: 'We move the way a founder moves. With ownership, with urgency that is real and not performed, and with the care that comes from knowing the thing has your name on it.' }]}
          />
          <Reveal delay={0.1}>
            <p className="mt-9 font-body text-base md:text-lg text-text-secondary leading-relaxed measure-lg">
              That is the whole idea. Not a bigger agency. Not more process. A partner who treats your business like their own, makes the calls a founder would make, and ships.
            </p>
          </Reveal>
        </div>
      </section>

      {/* How we work — heading + hairline principle rows */}
      <section className="section-dark">
        <div className="container-wide section">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="eyebrow mb-7">How we work</p>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="t-h1 display-balance">One team, from day one. We stay.</h2>
              </Reveal>
            </div>

            <RevealGroup className="lg:col-span-7 lg:col-start-6 flex flex-col" stagger={0.1}>
              {principles.map((p, i) => (
                <RevealItem
                  key={p.title}
                  className={`py-8 md:py-10 border-t border-dark-border ${i === principles.length - 1 ? 'border-b' : ''}`}
                >
                  <h3 className="t-h3 text-dark-text mb-3">{p.title}</h3>
                  <p className="font-body text-base md:text-lg text-dark-text-secondary leading-relaxed measure-lg">{p.body}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* Honest line — left-anchored closing statement, tightened band */}
      <section data-no-grid className="bg-surface border-b border-border">
        <div className="container-wide section-sm">
          <Reveal>
            <p className="t-h2 text-text-primary display-balance max-w-4xl">
              We are small on purpose. It is why the work is good, why we answer quickly, and why the person you talk to is the person doing the work. We would rather do a few things properly than many things at arm&rsquo;s length.
            </p>
            <p className="mt-9 font-body text-base md:text-lg text-text-secondary leading-relaxed measure-lg">
              Based in Paphos, Cyprus. Working with founders across Europe.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaSection heading="If that sounds like the partner you want, let’s talk." />
    </>
  )
}
