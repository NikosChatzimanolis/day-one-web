// ── components/home/ProductsShowcase.tsx ──
// PRODUCTS as one dense band. The phone assistant leads: the heading and its
// text beside its phone on a live call. Then the construction ERP as the
// mirror (dashboard bleeding on the left, text on the right), the attendance
// phone on row 1's grid (text left, phone centred in a wide panel), and Steer
// mirrored again (its overview on the left). All four products get the same
// text treatment (ProductText); only the visuals take the shape their UI
// needs. Steer's dark screenshot sits in its own blue stage (tone="steer").
// Mirrored rows show the text first when stacked.
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
        {/* row 1 · heading + the phone assistant beside its phone on a call */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col lg:col-span-4">
            <Reveal>
              <p className="eyebrow mb-5">{h.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="t-h1 display-balance max-w-sm">{h.title}</h2>
            </Reveal>
            <Reveal delay={0.1} className="mt-10 lg:mt-auto lg:pt-10">
              <ProductText product={p.phoneAssistant} href={localeHref('/products/phone-assistant')} learnMore={h.learnMore} />
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-8">
            <ProductFrame variant="center" lazy className="aspect-[4/3] md:aspect-[16/10]">
              <PhoneAssistantMock />
            </ProductFrame>
          </Reveal>
        </div>

        {/* row 2 · CY-Construction, mirror of row 1: dashboard left, text right */}
        <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal delay={0.05} className="lg:order-2 lg:col-span-4 lg:self-end">
            <ProductText product={p.cyConstruction} href={localeHref('/products/construction-erp')} learnMore={h.learnMore} />
          </Reveal>
          <Reveal delay={0.1} className="lg:order-1 lg:col-span-8">
            <ProductFrame variant="bleed" lazy className="aspect-[4/3] md:aspect-[16/10]">
              <DashboardShot src={shots.cyDashboard} />
            </ProductFrame>
          </Reveal>
        </div>

        {/* row 3 · attendance on row 1's grid: text left, phone right */}
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

        {/* row 4 · Steer, mirrored: overview left, text right */}
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
      </div>
    </section>
  )
}
