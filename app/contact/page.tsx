// ── app/contact/page.tsx — Contact ──
import type { Metadata } from 'next'
import PageHero from '@/components/sections/PageHero'
import ContactForm from '@/components/contact/ContactForm'
import BookCall from '@/components/ui/BookCall'
import Reveal from '@/components/ui/Reveal'
import Magnetic from '@/components/ui/Magnetic'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Book a call with Day One, or send a project enquiry. contact@dayone-web.com · +357 96 254 148 · Paphos, Cyprus.',
}

const channels = [
  { label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { label: 'Phone', value: site.phone, href: `tel:${site.phoneHref}` },
  { label: 'WhatsApp', value: 'Message us', href: site.whatsapp, external: true },
  { label: 'Studio', value: site.location },
]

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start with a call."
        lead="The best first step is a conversation. Book one, or send an enquiry and we’ll come back to you within a business day."
      />

      <section id="book" className="bg-bg scroll-mt-24">
        <div className="container-wide section">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
            {/* Booking + channels */}
            <div>
              <Reveal>
                <p className="eyebrow mb-6">Book a call</p>
                <h2 className="t-h2 text-text-primary measure display-balance">
                  A short call. No pitch. We figure out if we&rsquo;re right for each other.
                </h2>
                <p className="t-lead mt-7 text-text-secondary measure display-pretty">
                  Tell us what you&rsquo;re building toward and we&rsquo;ll tell you, plainly, how we&rsquo;d approach it.
                </p>
                <div className="mt-9">
                  <BookCall size="lg" />
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-14 pt-12 border-t border-border">
                  <p className="eyebrow-muted mb-7">Direct</p>
                  <dl className="grid grid-cols-2 gap-x-8 gap-y-8">
                    {channels.map((c) => (
                      <div key={c.label}>
                        <dt className="font-body text-xs uppercase tracking-wide text-text-tertiary mb-2">{c.label}</dt>
                        <dd className="font-body text-base md:text-lg text-text-primary">
                          {c.href ? (
                            c.label === 'Email' ? (
                              <Magnetic mode="hover" strength={0.25} className="inline-block">
                                <a href={c.href} className="mail-sweep inline-block">
                                  {c.value}
                                </a>
                              </Magnetic>
                            ) : (
                              <a
                                href={c.href}
                                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                className="hover:text-accent transition-colors duration-200"
                              >
                                {c.value}
                              </a>
                            )
                          ) : (
                            c.value
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            </div>

            {/* Enquiry form */}
            <div>
              <Reveal delay={0.06}>
                <div data-no-grid className="rounded-lg border border-border bg-surface p-7 md:p-10">
                  <p className="eyebrow mb-6">Project enquiry</p>
                  <h2 className="t-h3 text-text-primary mb-8">Or send a few lines.</h2>
                  <ContactForm />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
