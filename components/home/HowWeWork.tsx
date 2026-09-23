// ── components/home/HowWeWork.tsx ──
// Four columns, rust numerals 01 to 04, one line each.
import Reveal, { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { copy } from '@/lib/copy'

export default function HowWeWork() {
  const t = copy.home.howWeWork
  return (
    <section data-no-grid className="border-b border-border bg-surface">
      <div className="container-wide section-sm">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-2">
            <p className="eyebrow">{t.eyebrow}</p>
          </Reveal>
          <RevealGroup
            className="grid gap-y-8 sm:grid-cols-2 lg:col-span-10 lg:grid-cols-4 lg:divide-x lg:divide-border"
            stagger={0.08}
          >
            {t.items.map((item, i) => (
              <RevealItem key={item} className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                <span className="t-index text-rust">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="t-h3 mt-4 max-w-[12rem] text-text-primary">{item}</h2>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  )
}
