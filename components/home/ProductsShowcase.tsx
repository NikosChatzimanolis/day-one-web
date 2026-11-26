// ── components/home/ProductsShowcase.tsx ──
// PRODUCTS as one dense band, composed like the reference: the heading and
// the construction ERP beside a full-bleed dashboard, then the attendance
// phone on the same grid (text left, phone centred in a wide panel), then
// Steer as the mirror of row 1 (its overview bleeding on the left, the text
// on the right; text first when stacked). All three products get the same
// text treatment (ProductText); only the visuals take the shape their UI
// needs. Steer's dark screenshot sits in its own blue stage (tone="steer").
// Row 4 is the phone assistant on row 2's grid (text left, its phone mock
// centred in the stone panel).
import Reveal from '@/components/ui/Reveal'
import ProductFrame from '@/components/products/ProductFrame'
import ProductText from '@/components/products/ProductText'
import { DashboardShot, PhoneShot, shots } from '@/components/products/AppShot'
import PhoneAssistantMock from '@/components/products/PhoneAssistantMock'
import { t, localeHref } from '@/lib/copy/request'

export default function ProductsShowcase() {
  const c = t()
  const h = c.home.products
  const p = c.products
  return (
    <section className="border-b border-border bg-bg">
      <div className="container-wide section-tight">
        {/* row 1 · heading + CY-Construction beside the dashboard */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col lg:col-span-4">
            <Reveal>
              <p className="eyebrow mb-5">{h.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="t-h1 display-balance max-w-sm">{h.title}</h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-10 lg:mt-auto lg:pt-10">
              <ProductText product={p.cyConstruction} href={localeHref('/products/construction-erp')} learnMore={h.learnMore} />
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-8">
            <ProductFrame variant="bleed" lazy className="aspect-[4/3] md:aspect-[16/10]">
              <DashboardShot src={shots.cyDashboard} />
            </ProductFrame>
          </Reveal>
        </div>

        {/* row 2 · attendance on row 1's grid: text left, phone right */}
        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal delay={0.05} className="lg:col-span-4 lg:self-end">
            <ProductText product={p.attendance} href={localeHref('/products/attendance')} learnMore={h.learnMore} />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <ProductFrame variant="center" lazy className="aspect-[4/3] md:aspect-[16/10]">
              <PhoneShot src={shots.attendanceClock} />
            </ProductFrame>
          </Reveal>
        </div>

        {/* row 3 · Steer, mirror of row 1: overview left, text right */}
        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal delay={0.05} className="lg:order-2 lg:col-span-4 lg:self-end">
            <ProductText product={p.steer} href={localeHref('/products/steer')} learnMore={h.learnMore} />
          </Reveal>
          <Reveal delay={0.1} className="lg:order-1 lg:col-span-8">
            <ProductFrame variant="bleed" tone="steer" lazy className="aspect-[4/3] md:aspect-[16/10]">
              <DashboardShot src={shots.steerOverview} />
            </ProductFrame>
          </Reveal>
        </div>

        {/* row 4 · phone assistant on row 2's grid: text left, phone right */}
        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal delay={0.05} className="lg:col-span-4 lg:self-end">
            <ProductText product={p.phoneAssistant} href={localeHref('/products/phone-assistant')} learnMore={h.learnMore} />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8">
            <ProductFrame variant="center" lazy className="aspect-[4/3] md:aspect-[16/10]">
              <PhoneAssistantMock />
            </ProductFrame>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
