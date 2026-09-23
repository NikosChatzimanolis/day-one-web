// ── app/page.tsx — Home ──
// Section order follows the 2026-09 brief: hero, two ways to work with us,
// products, strategic partner, selected work, how we work, security review
// bar, closing CTA. Every string lives in lib/copy.
import HomeHero from '@/components/home/HomeHero'
import TwoWays from '@/components/home/TwoWays'
import ProductsShowcase from '@/components/home/ProductsShowcase'
import StrategicPartner from '@/components/home/StrategicPartner'
import SelectedWork from '@/components/home/SelectedWork'
import HowWeWork from '@/components/home/HowWeWork'
import SecurityBar from '@/components/home/SecurityBar'
import CtaSection from '@/components/sections/CtaSection'

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TwoWays />
      <ProductsShowcase />
      <StrategicPartner />
      <SelectedWork />
      <HowWeWork />
      <SecurityBar />
      <CtaSection />
    </>
  )
}
