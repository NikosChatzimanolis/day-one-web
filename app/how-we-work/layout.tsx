import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How We Work — Web Development & Maintenance Process | Day One',
  description:
    'Our web development process: from strategy to ongoing maintenance and social media management. See how we build, launch, and continuously improve your online presence in Cyprus & Greece.',
}

export default function HowWeWorkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
