// ── app/page.tsx — Home ──
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import BookCall from '@/components/ui/BookCall'
import Section from '@/components/circuit/Section'
import NumberBox from '@/components/circuit/NumberBox'
import { Button } from '@/components/ui/Button'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import TextReveal from '@/components/ui/TextReveal'
import HorizonRows from '@/components/sections/HorizonRows'
import CtaSection from '@/components/sections/CtaSection'
import ScrollCue from '@/components/ui/ScrollCue'

const tracks = [
  {
    no: '01',
    name: 'Build',
    line: 'The concrete system your business runs on, built for your exact need — from first idea to something real in the world.',
  },
  {
    no: '02',
    name: 'Scale',
    line: 'It grows as you do. New surface, more load, the next thing you need — shaped by the team that already knows it.',
  },
  {
    no: '03',
    name: 'Maintain',
    line: 'It stays cared for. Watched, refined, kept sharp. The relationship doesn’t end at launch — that’s where it settles in.',
  },
]

const beats = [
  {
    title: 'Built for one company’s exact need',
    body: 'No templates, no off-the-shelf compromise. We build the system your business actually requires, the way it actually works.',
  },
  {
    title: 'The same team builds and maintains',
    body: 'The people who designed it are the people who keep it running. Understanding compounds instead of resetting.',
  },
  {
    title: 'No handoff',
    body: 'Nothing gets thrown over a wall. There is no second team, no knowledge lost in translation, no starting over.',
  },
  {
    title: 'We stay',
    body: 'Launch is the beginning, not the finish line. We’re still here months later, still shaping what we built.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* ── Hero — centered lockup, full height ────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh" aria-hidden="true" />
        <div className="container-wide relative z-10">
          <div className="flex min-h-screen flex-col items-center justify-center text-center py-28">
            <Reveal className="mb-8 sm:mb-10">
              <Logo variant="primary" size="2xl" />
            </Reveal>
            <Reveal delay={0.08}>
              <p className="eyebrow mb-6">A technical partner — Paphos, Cyprus</p>
            </Reveal>
            <TextReveal
              as="h1"
              className="t-h2 display-balance max-w-3xl mx-auto"
              trigger="load"
              baseDelay={0.18}
              stagger={0.07}
              lines={[
                { text: 'Build, scale, maintain.' },
                { text: 'One continuous relationship.', className: 'text-accent mt-2' },
              ]}
            />
            <Reveal delay={0.18}>
              <p className="t-lead mt-8 text-text-secondary measure-lg mx-auto display-pretty">
                From idea to realization, we build the concrete system your business needs — and make sure you&rsquo;re visible to the right people.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
                <BookCall size="lg" />
                <Button href="/work" variant="outline" size="lg" arrow>
                  See our work
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
        <ScrollCue />
      </section>

      {/* ── The promise — left-anchored statement (uses the left space) ── */}
      <Section className="bg-bg">
        <div className="container-wide section">
          <Reveal>
            <p className="eyebrow mb-8">Why us</p>
          </Reveal>
          <Reveal>
            <p className="t-h2 text-text-primary display-balance max-w-4xl">
              One team, from day one. We build the system, we understand it completely, and we stay long after it ships.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-9 font-body text-base md:text-lg text-text-secondary leading-relaxed measure-lg">
              Most studios hand you a finished thing and move on. We don&rsquo;t. The value isn&rsquo;t in the launch — it&rsquo;s in everything after, when understanding compounds and the system becomes something only we could keep improving. You get a partner who treats your business like their own, because the work is never really done.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ── What we do — editorial numbered horizons ───────── */}
      <Section className="section-dark">
        <div className="container-wide section">
          <div className="grid md:grid-cols-12 gap-8 mb-16 md:mb-24">
            <Reveal className="md:col-span-3">
              <p className="eyebrow">What we do</p>
            </Reveal>
            <div className="md:col-span-8 md:col-start-5">
              <TextReveal
                as="h2"
                className="t-h1 display-balance"
                stagger={0.04}
                lines={[{ text: 'Not three services. Three horizons of the same engagement.' }]}
              />
              <Reveal delay={0.1}>
                <p className="mt-7 font-body text-base md:text-lg text-[#A39E96] leading-relaxed measure-lg">
                  Build, scale and maintain aren&rsquo;t a menu you pick from. They&rsquo;re one relationship over time, held by one team.
                </p>
              </Reveal>
            </div>
          </div>

          <HorizonRows tracks={tracks} />

          <Reveal delay={0.1}>
            <div className="mt-14">
              <Button href="/services" variant="outline-dark" size="lg" arrow>
                How we work together
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ── Proof — heading + hairline list, Forge accent row ─ */}
      <Section className="bg-bg">
        <div className="container-wide section">
          <div className="grid md:grid-cols-12 gap-10 md:gap-8">
            <div className="md:col-span-3">
              <Reveal>
                <p className="eyebrow mb-5">Proof</p>
              </Reveal>
              <Reveal delay={0.06}>
                <p className="font-body text-sm text-text-tertiary leading-relaxed max-w-[220px]">
                  Named, real, and in use. Not a logo wall.
                </p>
              </Reveal>
            </div>

            <div className="md:col-span-9">
              <RevealGroup className="flex flex-col" stagger={0.1}>
                <RevealItem className="border-t border-border">
                  <Link href="/work" className="group grid md:grid-cols-[180px_1fr_auto] gap-3 md:gap-8 items-start md:items-center py-8 md:py-10 transition-colors duration-300">
                    <span className="eyebrow-muted pt-1">Ongoing engagement</span>
                    <span className="block">
                      <span className="block t-h2 text-text-primary group-hover:text-accent transition-colors duration-250">Astrala Advisory</span>
                      <span className="block mt-3 font-body text-base text-text-secondary leading-relaxed measure">
                        Content, newsletter and brand work for an advisory firm — an ongoing engagement, live and building.
                      </span>
                    </span>
                    <span aria-hidden="true" className="hidden md:block text-text-tertiary text-xl transition-all duration-300 group-hover:text-accent group-hover:translate-x-1">→</span>
                  </Link>
                </RevealItem>

                <RevealItem className="border-t border-border">
                  <Link href="/work" className="group grid md:grid-cols-[180px_1fr_auto] gap-3 md:gap-8 items-start md:items-center py-8 md:py-10 transition-colors duration-300">
                    <span className="eyebrow-muted pt-1">Delivered build</span>
                    <span className="block">
                      <span className="block t-h2 text-text-primary group-hover:text-accent transition-colors duration-250">Delbeteris</span>
                      <span className="block mt-3 font-body text-base text-text-secondary leading-relaxed measure">
                        A clean, fast site for a private-transfer company in Northern Greece — delivered, live, doing its job.
                      </span>
                    </span>
                    <span aria-hidden="true" className="hidden md:block text-text-tertiary text-xl transition-all duration-300 group-hover:text-accent group-hover:translate-x-1">→</span>
                  </Link>
                </RevealItem>
              </RevealGroup>

              {/* Forge accent row — distinct from the case studies */}
              <Reveal delay={0.08}>
                <Link
                  href="/forge"
                  className="group mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-2 border-rust bg-surface/60 pl-6 pr-6 py-7 transition-colors duration-300 hover:bg-surface"
                >
                  <p className="t-h3 text-text-primary font-light">
                    The system we run Day One on.
                    <span className="text-text-tertiary"> Built by us, for us.</span>
                  </p>
                  <span className="inline-flex items-center gap-1.5 font-body text-sm text-accent whitespace-nowrap">
                    Meet Forge
                    <span aria-hidden="true" className="transition-transform duration-250 group-hover:translate-x-0.5">→</span>
                  </span>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* ── How we work — heading + offset grid ────────────── */}
      <Section className="bg-surface">
        <div className="container-wide section">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="eyebrow mb-7">How we work</p>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="t-h1 max-w-xs display-balance">Four things that don&rsquo;t change.</h2>
              </Reveal>
            </div>

            <RevealGroup className="lg:col-span-7 lg:col-start-6 grid sm:grid-cols-2 gap-x-12 gap-y-12" stagger={0.1}>
              {beats.map((beat, i) => (
                <RevealItem key={beat.title}>
                  <NumberBox>{String(i + 1).padStart(2, '0')}</NumberBox>
                  <h3 className="t-h3 mt-4 text-text-primary">{beat.title}</h3>
                  <p className="mt-3 font-body text-base text-text-secondary leading-relaxed measure">{beat.body}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Section>

      <CtaSection />
    </>
  )
}
