// ── components/products/PhoneAssistantExtras.tsx ──
// The phone assistant's own bands on its product page: the two demos (they
// open on the assistant's address), the price beside the next steps, and
// the common questions. Copy from products.phoneAssistant; same hairline
// rows and type as the shared ProductPage sections around it.
import { Button } from '@/components/ui/Button'
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { t } from '@/lib/copy/request'
import { assistantDemos } from '@/lib/site'

export default function PhoneAssistantExtras() {
  const x = t().products.phoneAssistant
  return (
    <>
      {/* ── Try it · the two demos ─────────────────────────── */}
      <section id="demo" className="border-b border-border bg-bg">
        <div className="container-wide section">
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-7">{x.demo.eyebrow}</p>
            <h2 className="t-h1 display-balance">{x.demo.title}</h2>
            <p className="t-lead measure-lg display-pretty mt-7 text-text-secondary">{x.demo.body}</p>
            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button href={assistantDemos.clinic} external size="lg" arrow>
                {x.demo.clinic}
              </Button>
              <Button href={assistantDemos.barber} external variant="outline" size="lg">
                {x.demo.barber}
              </Button>
            </div>
            <p className="mt-6 font-body text-sm text-text-tertiary">{x.demo.note}</p>
          </Reveal>
        </div>
      </section>

      {/* ── Price beside the next steps ────────────────────── */}
      <section data-no-grid className="border-b border-border bg-surface">
        <div className="container-wide section">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            <Reveal className="lg:col-span-4">
              <p className="eyebrow mb-7">{x.price.eyebrow}</p>
              <p className="font-body text-lg text-text-secondary">{x.price.from}</p>
              <p className="t-h1 mt-1 tabular-nums">
                {x.price.amount}
                <span className="ml-3 font-body text-lg font-normal tracking-normal text-text-secondary">{x.price.perMonth}</span>
              </p>
              <p className="mt-6 font-body text-lg text-text-primary">{x.price.setup}</p>
              <p className="measure mt-4 font-body text-base leading-relaxed text-text-secondary">{x.price.note}</p>
            </Reveal>
            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal>
                <p className="eyebrow mb-7">{x.steps.eyebrow}</p>
              </Reveal>
              <RevealGroup className="flex flex-col" stagger={0.08}>
                {x.steps.items.map((s, i) => (
                  <RevealItem
                    key={s.title}
                    className={`grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-border-strong py-6 ${
                      i === x.steps.items.length - 1 ? 'border-b' : ''
                    }`}
                  >
                    <span className="t-index text-rust">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="font-body text-lg leading-snug text-text-primary md:text-xl">{s.title}</h3>
                      <p className="mt-1.5 font-body text-base leading-relaxed text-text-secondary">{s.body}</p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </div>
        </div>
      </section>

      {/* ── Common questions · hairline rows ───────────────── */}
      <section className="border-b border-border bg-bg">
        <div className="container-wide section">
          <Reveal>
            <p className="eyebrow mb-10">{x.faq.eyebrow}</p>
          </Reveal>
          <RevealGroup className="flex flex-col" stagger={0.06}>
            {x.faq.items.map((f, i) => (
              <RevealItem
                key={f.q}
                className={`grid gap-3 border-t border-border py-7 md:grid-cols-12 md:gap-8 ${
                  i === x.faq.items.length - 1 ? 'border-b' : ''
                }`}
              >
                <h3 className="t-h3 text-text-primary md:col-span-5">{f.q}</h3>
                <p className="measure-lg font-body text-base leading-relaxed text-text-secondary md:col-span-6 md:col-start-7 md:text-lg">
                  {f.a}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  )
}
