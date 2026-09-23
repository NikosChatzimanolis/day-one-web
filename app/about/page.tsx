// ── app/about/page.tsx · About / Studio ──
// Copy house rule for this page: no em-dashes, and no statement of team size
// or headcount anywhere.
import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/sections/PageHero'
import CtaSection from '@/components/sections/CtaSection'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import TextReveal from '@/components/ui/TextReveal'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Day One is a studio in Paphos, Cyprus. A senior core covering design, engineering, infrastructure, and growth, with a wider network of specialists when a project needs one.',
}

const principles = [
  {
    title: 'One team, start to finish',
    body: 'The people who design the system are the people who build it and the people who maintain it. Nothing is handed off. Nothing is lost between teams that never met.',
  },
  {
    title: 'Understanding compounds',
    body: 'The longer we work on something, the sharper the decisions get. Context is the asset, and it only builds when the same people stay close to the work.',
  },
  {
    title: 'We stay',
    body: 'Launch is not the end. It is where the relationship settles in. We are still here months later, still improving what we built.',
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="The studio"
        title="A senior core, with the reach to go wider."
        lead="Day One is a studio in Paphos, Cyprus, built around a core of senior people who do the work themselves. There is no junior layer and no account manager between the person who understands the problem and the person solving it."
      >
        <p className="font-body text-base md:text-lg text-text-secondary leading-relaxed measure-lg display-pretty">
          When a project needs something outside that core, we bring in specialists we already know
          and have worked with. The core stays on it either way. You are never handed off, and you
          never end up talking to someone who was not in the room when the decisions were made.
        </p>
      </PageHero>

      {/* What we do · left-anchored statement (uses the left space) */}
      <section className="bg-bg border-b border-border">
        <div className="container-wide section">
          <Reveal>
            <p className="eyebrow mb-8">What we do</p>
          </Reveal>
          <TextReveal
            as="p"
            className="t-h2 text-text-primary display-balance max-w-4xl"
            stagger={0.022}
            wordY={12}
            blur={5}
            lines={[{ text: 'Between us we cover what a business actually needs to ship and keep running: product design and interface work, full-stack engineering across web and mobile, infrastructure and deployment, security, and the paid acquisition side once the thing is live.' }]}
          />
          <Reveal delay={0.1}>
            <p className="mt-9 font-body text-base md:text-lg text-text-secondary leading-relaxed measure-lg">
              Each person owns a domain properly rather than covering everything badly.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Our own products · the studio's own build, and why it pays off */}
      <section data-no-grid className="bg-surface border-b border-border">
        <div className="container-wide section">
          <Reveal>
            <p className="eyebrow mb-8">Our own products</p>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="t-h2 text-text-primary display-balance max-w-4xl">
              <Link
                href="/forge"
                className="text-accent underline-offset-4 transition-colors duration-250 hover:text-accent-dark hover:underline"
              >
                Forge
              </Link>{' '}
              started as the internal system we needed to run our own work. It became a product, and
              it is in daily use. We are currently building a social product of our own, still
              unreleased.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-9 font-body text-base md:text-lg text-text-secondary leading-relaxed measure-lg">
              Client work funds it, and building our own products makes the client work better. We
              hit the same problems our clients hit, and we solve them for ourselves first.
            </p>
          </Reveal>
        </div>
      </section>

      {/* How we work · heading + hairline principle rows */}
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

              <RevealItem className="pt-9">
                <p className="font-body text-base md:text-lg text-dark-text-secondary leading-relaxed measure-lg">
                  Based in Paphos, Cyprus. Working with founders and agencies across Europe.
                </p>
              </RevealItem>
            </RevealGroup>
          </div>
        </div>
      </section>

      <CtaSection line1="If that sounds like the partner you want," line2="let’s talk." />
    </>
  )
}
