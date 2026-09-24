// ── components/home/HeroCollage.tsx ──
// The hero's focal element: the CY-Construction dashboard as a panel that
// runs off the right edge of the viewport, the attendance phone overlapping
// its lower-left corner, and the Day ONE lockup in the header colours behind. Real
// screenshots of the products (demo / seed data), so it is the studio's own
// material, not a stock image. Drifts a few px toward the cursor (ambient
// magnetic) and fades up on mount; static under reduced motion.
import Logo from '@/components/ui/Logo'
import Magnetic from '@/components/ui/Magnetic'
import Reveal from '@/components/ui/Reveal'
import WindowFrame from '@/components/products/WindowFrame'
import { DashboardShot, PhoneShot, shots } from '@/components/products/AppShot'

export default function HeroCollage() {
  return (
    <div className="relative hidden min-h-[560px] lg:block" aria-hidden="true">
      {/* lockup in the header colours, above the window */}
      <div className="absolute -top-3 right-[4%] origin-top-right scale-[1.1] select-none opacity-[0.55]">
        <Logo variant="primary" size="xl" />
      </div>

      <Magnetic mode="ambient" strength={0.02} maxShift={8} className="absolute inset-0">
        {/* dashboard in a window, running off the right edge of the viewport */}
        <Reveal delay={0.05} y={18} className="absolute left-[9%] top-[16%] w-[134%]">
          <WindowFrame>
            <DashboardShot src={shots.cyDashboard} priority bare />
          </WindowFrame>
        </Reveal>

        {/* phone, fully visible, in front of the window's left edge */}
        <Reveal delay={0.18} y={18} className="absolute bottom-[-3%] left-[-2%] w-[30%]">
          <PhoneShot src={shots.attendanceClock} priority className="w-full" />
        </Reveal>
      </Magnetic>
    </div>
  )
}
