// ── app/work/page.tsx — Work / Proof ──
import type { Metadata } from 'next'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import PageHero from '@/components/sections/PageHero'
import CtaSection from '@/components/sections/CtaSection'
import BookCall from '@/components/ui/BookCall'
import BrowserFrame from '@/components/ui/BrowserFrame'
import AstralaVisual from '@/components/work/AstralaVisual'
import AstralaLiveEmbed from '@/components/work/AstralaLiveEmbed'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Two named engagements: an ongoing content, newsletter and brand engagement with Astrala Advisory, and Delbeteris, a delivered private-transfer site.',
}

interface Block {
  label: string
  body: string
}

function CaseBlocks({ blocks, dark }: { blocks: Block[]; dark?: boolean }) {
  return (
    <div
      className={cn(
        'mt-14 grid sm:grid-cols-3 border-t divide-y sm:divide-y-0 sm:divide-x',
        dark ? 'border-dark-border divide-dark-border' : 'border-border divide-border'
      )}
    >
      {blocks.map((b) => (
        <div key={b.label} className="py-8 sm:py-9 sm:px-8 first:sm:pl-0 last:sm:pr-0">
          <p className="eyebrow mb-4">{b.label}</p>
          <p className={cn('font-body text-base leading-relaxed', dark ? 'text-[#A39E96]' : 'text-text-secondary')}>
            {b.body}
          </p>
        </div>
      ))}
    </div>
  )
}

const astralaBlocks: Block[] = [
  {
    label: 'The need',
    body: 'Astrala Advisory needed an editorial presence that matched the depth of their work — a brand voice, a newsletter, and a steady content rhythm aimed at senior decision-makers across European markets.',
  },
  {
    label: 'What we do',
    body: 'We run the content and brand side: brand voice and identity, the newsletter as an editorial publication, and an ongoing social and content cadence. One team holding the whole editorial system, month over month.',
  },
  {
    label: 'Where it stands',
    body: 'An active engagement, in development. The brand system and newsletter are in build, with content and audience growth underway.',
  },
]

const delbeterisBlocks: Block[] = [
  {
    label: 'The need',
    body: 'A private-transfer company in Northern Greece needed a real presence — fast, clear, and trustworthy enough to book a car against.',
  },
  {
    label: 'What we built',
    body: 'A clean, fast multi-page site: services, fleet, tours and a clear path to enquire. Built to load quickly and read well on a phone at the airport.',
  },
  {
    label: 'The result',
    body: 'Delivered and live at delbeteristransfer.com — a calm, confident site doing exactly what it needs to, every day.',
  },
]

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Real systems. Named clients. Live and in use."
        lead="We don’t show logo walls. We show the things we built, what they needed to do, and what happened next."
      />

      {/* ── Index tiles — quick visual entry to each engagement ── */}
      <section className="bg-bg border-b border-border">
        <div className="container-wide section">
          <RevealGroup className="grid gap-6 md:grid-cols-2" stagger={0.1}>
            <RevealItem>
              <a href="#astrala" className="tile">
                <span className="tnum">01</span>
                <div className="glow" aria-hidden="true" />
                <h4 className="t-h3 tile-title">Astrala Advisory</h4>
              </a>
            </RevealItem>
            <RevealItem>
              <a href="#delbeteris" className="tile">
                <span className="tnum">02</span>
                <div className="glow" aria-hidden="true" />
                <h4 className="t-h3 tile-title">Delbeteris</h4>
              </a>
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* ── Astrala ─────────────────────────────────────────── */}
      <section id="astrala" className="bg-bg border-b border-border scroll-mt-24">
        <div className="container-wide section">
          {/* Header */}
          <div className="max-w-3xl">
            <Reveal>
              <p className="eyebrow mb-6">Ongoing engagement · Content &amp; brand</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="t-h1 display-balance">Astrala Advisory</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="t-lead mt-7 text-text-secondary measure display-pretty">
                Content, newsletter, and brand work for an advisory firm — an ongoing engagement, live and building.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-7 font-body text-sm text-text-tertiary tracking-wide">
                Brand &amp; identity · Social · Editorial newsletter
              </p>
            </Reveal>
          </div>

          {/* The direction · the direction, live — brand board paired with the live site */}
          <div className="mt-14 grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
            <Reveal>
              <p className="eyebrow-muted mb-4">The direction</p>
              <AstralaVisual />
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mb-4 flex items-baseline justify-between gap-4">
                <p className="eyebrow-muted">The direction, live</p>
                <a
                  href="https://astralaadvisory.eu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1 font-body text-sm text-accent transition-colors duration-250 hover:text-accent-dark"
                >
                  View live
                  <span aria-hidden="true" className="transition-transform duration-250 group-hover:translate-x-0.5">→</span>
                </a>
              </div>
              <AstralaLiveEmbed />
              <p className="mt-4 font-body text-sm text-text-tertiary">
                Brand direction by Day One, live on Astrala&rsquo;s site.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <CaseBlocks blocks={astralaBlocks} />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-12">
              <BookCall size="lg" label="Start an engagement like this" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Delbeteris ──────────────────────────────────────── */}
      <section id="delbeteris" className="bg-surface border-b border-border scroll-mt-24">
        <div className="container-wide section">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal delay={0.1} className="order-2 lg:order-1">
              <BrowserFrame url="delbeteristransfer.com">
                <div className="relative aspect-[16/9]">
                  <Image
                    src="/work/delbeteris-hero.jpg"
                    alt="Delbeteris private transfer site — fleet on the road in Northern Greece"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </BrowserFrame>
            </Reveal>
            <div className="order-1 lg:order-2">
              <Reveal>
                <p className="eyebrow mb-6">Delivered build · Greece</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="t-h1 display-balance">Delbeteris</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="t-lead mt-7 text-text-secondary measure display-pretty">
                  A clean, fast site for a private-transfer company in Kavala — built to be read on a phone, trusted at a glance, and booked against.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-7 font-body text-sm text-text-tertiary tracking-wide">
                  Next.js · Multi-language · Delivered &amp; live
                </p>
              </Reveal>
            </div>
          </div>

          <Reveal>
            <CaseBlocks blocks={delbeterisBlocks} />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-12">
              <BookCall size="lg" label="Start a build like this" />
            </div>
          </Reveal>
        </div>
      </section>

      <CtaSection
        heading="Your build could be the next one here."
        sub="Tell us what you need to exist. We’ll tell you how we’d build it."
      />
    </>
  )
}
