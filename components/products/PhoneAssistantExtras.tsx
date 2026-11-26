// ── components/products/PhoneAssistantExtras.tsx ──
// The phone assistant's own bands on its product page, each given its own
// shape so the page does not read as one run of text:
//   demos      two cards you can press, one per kind of business
//   price      a dark pricing card (the price, the set-up fee, what is
//              included, a button) beside the next steps as a numbered path
//   questions  cards that open
// Copy from products.phoneAssistant. The demos open on the assistant's
// address (assistantDemos in lib/site.ts).
import { ArrowUpRight, Check, Plus, Scissors, Stethoscope } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { t } from '@/lib/copy/request'
import { assistantDemos } from '@/lib/site'

export default function PhoneAssistantExtras() {
  const x = t().products.phoneAssistant
  const demos = [
    { href: assistantDemos.clinic, icon: Stethoscope, title: x.demo.clinic, body: x.demo.clinicBody },
    { href: assistantDemos.barber, icon: Scissors, title: x.demo.barber, body: x.demo.barberBody },
  ]
  return (
    <>
      {/* ── Try it · two demo cards ────────────────────────── */}
      <section id="demo" className="scroll-mt-24 border-b border-border bg-bg">
        <div className="container-wide section">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow mb-7">{x.demo.eyebrow}</p>
              <h2 className="t-h1 display-balance">{x.demo.title}</h2>
              <p className="t-lead measure display-pretty mt-7 text-text-secondary">{x.demo.body}</p>
              <p className="measure mt-6 font-body text-sm text-text-tertiary">{x.demo.note}</p>
            </Reveal>
            <RevealGroup className="grid gap-5 sm:grid-cols-2 lg:col-span-6 lg:col-start-7" stagger={0.08}>
              {demos.map(({ href, icon: Icon, title, body }) => (
                <RevealItem key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition-all duration-250 ease-out-expo hover:-translate-y-1 hover:border-rust"
                  >
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-rust">
                      <Icon size={22} strokeWidth={1.5} />
                    </span>
                    <h3 className="t-h3 mt-8 text-text-primary">{title}</h3>
                    <p className="mt-3 font-body text-base leading-relaxed text-text-secondary">{body}</p>
                    <span className="mt-8 inline-flex items-center gap-1.5 font-body text-sm text-accent lg:mt-auto lg:pt-8">
                      {x.demo.start}
                      <ArrowUpRight size={15} strokeWidth={1.6} className="transition-transform duration-250 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </a>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* ── Price card beside the next steps ───────────────── */}
      <section data-no-grid className="border-b border-border bg-surface">
        <div className="container-wide section">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-5">
              <div className="rounded-3xl bg-dark p-8 text-dark-text md:p-10">
                <p className="eyebrow">{x.price.eyebrow}</p>
                <p className="mt-8 font-body text-base text-dark-text-secondary">{x.price.from}</p>
                <p className="mt-1 flex items-baseline gap-3">
                  <span className="font-display text-[clamp(4rem,9vw,6.25rem)] font-light leading-[0.9] tracking-[-0.02em] tabular-nums text-dark-text">
                    {x.price.amount}
                  </span>
                  <span className="font-body text-lg text-dark-text-secondary">{x.price.perMonth}</span>
                </p>
                <p className="mt-7 inline-block rounded-full border border-dark-border px-4 py-2 font-body text-sm text-dark-text">
                  {x.price.setup}
                </p>

                <p className="mt-9 border-t border-dark-border pt-7 font-body text-xs uppercase tracking-[0.2em] text-dark-text-secondary">
                  {x.price.includesTitle}
                </p>
                <ul className="mt-5 flex flex-col gap-3.5">
                  {x.price.includes.map((line) => (
                    <li key={line} className="flex items-start gap-3 font-body text-base leading-snug text-dark-text">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rust">
                        <Check size={12} strokeWidth={2.6} className="text-dark-text" />
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>

                <div className="mt-9">
                  <Button href="#demo" variant="cream" size="lg" arrow>
                    {x.price.cta}
                  </Button>
                </div>
                <p className="mt-6 font-body text-sm leading-relaxed text-dark-text-secondary">{x.price.note}</p>
              </div>
            </Reveal>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal>
                <p className="eyebrow mb-9">{x.steps.eyebrow}</p>
              </Reveal>
              <RevealGroup className="flex flex-col" stagger={0.08}>
                {x.steps.items.map((s, i) => (
                  <RevealItem key={s.title} className="relative grid grid-cols-[2.75rem_1fr] gap-x-5 pb-10 last:pb-0">
                    {/* the path between the steps */}
                    {i < x.steps.items.length - 1 && (
                      <span aria-hidden="true" className="absolute bottom-0 left-[1.375rem] top-11 w-px -translate-x-1/2 bg-border-strong" />
                    )}
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-rust bg-surface font-display text-lg font-light tabular-nums text-rust">
                      {i + 1}
                    </span>
                    <div className="pt-1.5">
                      <h3 className="t-h3 text-text-primary">{s.title}</h3>
                      <p className="measure mt-2 font-body text-base leading-relaxed text-text-secondary md:text-lg">{s.body}</p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </div>
      </section>

      {/* ── Common questions · cards that open ─────────────── */}
      <section className="border-b border-border bg-bg">
        <div className="container-wide section">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-4">
              <h2 className="t-h1 display-balance max-w-xs">{x.faq.eyebrow}</h2>
            </Reveal>
            <RevealGroup className="flex flex-col gap-3 lg:col-span-7 lg:col-start-6" stagger={0.06}>
              {x.faq.items.map((f, i) => (
                <RevealItem key={f.q}>
                  <details
                    open={i === 0}
                    className="group rounded-2xl border border-border bg-card px-6 py-5 transition-colors duration-250 open:border-border-strong md:px-7 md:py-6"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-body text-lg text-text-primary md:text-xl [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-rust transition-transform duration-250 group-open:rotate-45">
                        <Plus size={16} strokeWidth={1.6} />
                      </span>
                    </summary>
                    <p className="measure-lg mt-4 font-body text-base leading-relaxed text-text-secondary md:text-lg">{f.a}</p>
                  </details>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>
    </>
  )
}
