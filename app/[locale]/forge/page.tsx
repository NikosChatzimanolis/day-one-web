// ── app/forge/page.tsx — Forge (product) ──
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ForgeMock from '@/components/forge/ForgeMock'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import TextReveal from '@/components/ui/TextReveal'
import Magnetic from '@/components/ui/Magnetic'
import { site, bookCallHref } from '@/lib/site'
import type { Locale } from '@/lib/copy'
import { setRequestLocale, localeHref } from '@/lib/copy/request'

export const metadata: Metadata = {
  title: 'Forge — the system we run on',
  description:
    'Forge is the task tracker the Day One team works with every day. We built it because off-the-shelf tools didn’t fit how the studio works. Live, in early access, free for now.',
}

const whatItDoes = [
  {
    no: '01',
    title: 'One page per task',
    body: 'Its intent, its braindump, and its steps live together — not scattered across tabs. What “done” means stays next to the work.',
  },
  {
    no: '02',
    title: 'The queue is home',
    body: 'No daily to-do list. Two lanes — urgent and normal — that you drag to reorder. The order is the priority.',
  },
  {
    no: '03',
    title: 'Quiet by design',
    body: 'No save buttons, no clutter, no nudges. It autosaves, syncs across devices, and otherwise gets out of the way.',
  },
]

const RUST = '#C04C2A'

type PageProps = { params: Promise<{ locale: Locale }> }

export default async function ForgePage({ params }: PageProps) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <div className="forge-dark">
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-dark-border">
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 25% 15%, rgba(192,76,42,0.14) 0%, transparent 62%), radial-gradient(ellipse 50% 45% at 85% 80%, rgba(192,76,42,0.08) 0%, transparent 60%)',
          }}
        />
        <div className="container-wide relative z-10 section-hero">
          <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-14 items-center">
            <div>
              <Reveal>
                <div className="flex items-center gap-3 mb-8">
                  <Image src="/forge-mark.png" alt="Forge" width={40} height={40} className="rounded-[9px]" />
                  <span className="font-display text-2xl tracking-wide text-[#F5F0EA]">Forge</span>
                  <span
                    className="ml-1 rounded-full px-3 py-1 font-body text-[0.625rem] font-medium uppercase tracking-[0.18em]"
                    style={{ background: 'rgba(192,76,42,0.16)', color: '#C04C2A', border: '1px solid rgba(192,76,42,0.3)' }}
                  >
                    Early access
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.07}>
                <h1 className="t-display display-balance">
                  The system the Day One team works with every day.
                </h1>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="t-lead mt-9 measure-lg display-pretty">
                  We built it because we needed it. Then it became the operational backbone the whole studio runs on.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-11">
                  <Magnetic mode="hover" strength={0.3} className="inline-flex">
                    <a
                      href={site.forgeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-sm px-8 py-4 font-body text-sm font-medium transition-all duration-250"
                      style={{ background: RUST, color: '#F5F0EA' }}
                    >
                      Try Forge — free while it&rsquo;s in early access
                      <span aria-hidden="true" className="transition-transform duration-250 group-hover:translate-x-0.5">→</span>
                    </a>
                  </Magnetic>
                </div>
              </Reveal>
              <Reveal delay={0.26}>
                <p className="mt-5 font-body text-sm" style={{ color: '#6B655E' }}>
                  Forge is live and in active development. Early, but real.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <ForgeMock />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Why it exists — left-anchored statement, tightened band ── */}
      <section className="border-b border-dark-border">
        <div className="container-wide section-sm">
          <Reveal>
            <p className="eyebrow mb-8">Why it exists</p>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="t-h2 display-balance max-w-4xl">
              Off-the-shelf trackers didn&rsquo;t fit how the studio actually works. So we built the one that does — and kept it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── What it does — hairline columns, no boxes ──────── */}
      <section className="border-b border-dark-border">
        <div className="container-wide section">
          <Reveal>
            <p className="eyebrow mb-14">What it does</p>
          </Reveal>
          <RevealGroup className="grid md:grid-cols-3 border-t border-dark-border divide-y md:divide-y-0 md:divide-x divide-dark-border" stagger={0.1}>
            {whatItDoes.map((f) => (
              <RevealItem key={f.title} className="py-9 md:py-10 md:px-9 first:md:pl-0 last:md:pr-0">
                <span className="t-index" style={{ color: '#C04C2A' }}>{f.no}</span>
                <h3 className="t-h3 mt-5 mb-3">{f.title}</h3>
                <p className="font-body text-base leading-relaxed">{f.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ── Closing ─────────────────────────────────────────── */}
      <section>
        <div className="container-wide section">
          <div className="max-w-2xl">
            <TextReveal
              as="h2"
              className="t-h1 display-balance"
              stagger={0.035}
              lines={[{ text: 'The same care we put into Forge is the care we’d put into yours.' }]}
            />
            <Reveal delay={0.1} className="mt-11 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <a
                href={site.forgeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-sm px-8 py-4 font-body text-sm font-medium"
                style={{ background: RUST, color: '#F5F0EA' }}
              >
                Try Forge
                <span aria-hidden="true" className="transition-transform duration-250 group-hover:translate-x-0.5">→</span>
              </a>
              <Link
                href={bookCallHref}
                className="group font-body text-sm transition-colors duration-250"
                style={{ color: '#A39E96' }}
              >
                Or talk to us about your own system
                <span aria-hidden="true" className="ml-1 inline-block transition-transform duration-250 group-hover:translate-x-0.5">→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
