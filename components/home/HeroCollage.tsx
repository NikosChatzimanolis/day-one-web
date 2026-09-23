// ── components/home/HeroCollage.tsx ──
// The hero's focal element: the CY-Construction dashboard as a panel that
// runs off the right edge of the viewport, the attendance phone overlapping
// its lower-left corner, and the ghosted Day ONE lockup behind. Built from
// the same CSS mockups the products band uses, so it is the studio's own
// material, not a stock image. Drifts a few px toward the cursor (ambient
// magnetic) and fades up on mount; static under reduced motion.
import Logo from '@/components/ui/Logo'
import Magnetic from '@/components/ui/Magnetic'
import Reveal from '@/components/ui/Reveal'
import ProductFrame from '@/components/products/ProductFrame'
import CyConstructionMock from '@/components/products/CyConstructionMock'
import AttendanceMock from '@/components/products/AttendanceMock'

export default function HeroCollage() {
  return (
    <div className="relative hidden min-h-[480px] lg:block" aria-hidden="true">
      {/* ghosted lockup, top-right, behind the panels */}
      <div className="absolute -top-3 right-0 origin-top-right scale-[1.15] select-none opacity-[0.09]">
        <Logo variant="mono" size="xl" />
      </div>

      <Magnetic mode="ambient" strength={0.02} maxShift={8} className="absolute inset-0">
        {/* dashboard panel, bleeding off the right edge of the viewport */}
        <Reveal delay={0.15} y={28} className="absolute left-[4%] top-[22%] w-[178%]">
          <ProductFrame variant="bleed" className="aspect-[16/10]">
            <CyConstructionMock />
          </ProductFrame>
        </Reveal>

        {/* phone, overlapping the panel's lower-left corner */}
        <Reveal delay={0.4} y={28} className="absolute bottom-0 left-[-6%] w-[34%]">
          <div className="rounded-[1.7rem] outline outline-[6px] outline-bg" style={{ aspectRatio: '9 / 19' }}>
            <AttendanceMock />
          </div>
        </Reveal>
      </Magnetic>
    </div>
  )
}
