// ── app/privacy/page.tsx — Privacy Notice ──
// GDPR / Cyprus (EU) privacy notice. Content is grounded in what the site
// actually does: contact + feedback forms (Resend), consent-gated Google
// Analytics, and standard hosting logs. Keep this in sync with real data flows.
import type { Metadata } from 'next'
import PageHero from '@/components/sections/PageHero'
import Reveal from '@/components/ui/Reveal'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy Notice',
  description:
    'How Day One Web Studio collects, uses, and protects personal data, and the rights you have under the GDPR.',
  robots: { index: true, follow: true },
}

const LAST_UPDATED = '29 June 2026'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal as="section" className="border-t border-border pt-10 first:border-t-0 first:pt-0">
      <h2 className="font-display text-xl md:text-2xl font-light text-text-primary mb-5">{title}</h2>
      <div className="flex flex-col gap-4 font-body text-base text-text-secondary leading-relaxed">
        {children}
      </div>
    </Reveal>
  )
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy notice"
        lead="How we handle personal data on this website, the lawful bases we rely on, and the rights you have under the GDPR."
      />

      <section className="bg-bg">
        <div className="container-narrow section">
          <p className="font-body text-sm text-text-tertiary mb-12">Last updated: {LAST_UPDATED}</p>

          <div className="flex flex-col gap-12">
            <Section title="Who we are">
              <p>
                This website, {site.domain}, is operated by{' '}
                <strong className="text-text-primary font-medium">{site.legalName}</strong>, based in{' '}
                {site.location}. For the purposes of the EU General Data Protection Regulation (GDPR)
                and Cyprus data-protection law, we are the data controller for the personal data
                described in this notice.
              </p>
              <p>
                If you have any questions about this notice or how we handle your data, contact us at{' '}
                <a href={`mailto:${site.email}`} className="text-accent underline-offset-2 hover:underline">
                  {site.email}
                </a>
                .
              </p>
            </Section>

            <Section title="What we collect, and why">
              <p>We only collect personal data you give us, or that is needed to run the site securely.</p>
              <ul className="flex flex-col gap-4 list-none">
                <li>
                  <span className="text-text-primary font-medium">Enquiries you send us.</span> When you
                  use the contact or feedback form, or email or message us, we receive your name, email
                  address, and the contents of your message. We use this to respond to you and, where
                  relevant, to take steps toward a possible working relationship.
                  <br />
                  <span className="text-text-tertiary text-sm">
                    Lawful basis: taking steps at your request prior to entering a contract, and our
                    legitimate interest in responding to enquiries (Art. 6(1)(b) and 6(1)(f) GDPR).
                  </span>
                </li>
                <li>
                  <span className="text-text-primary font-medium">Booking a call.</span> If you book a
                  call through a scheduling link, the calendar provider collects the details you enter
                  (such as name, email, and chosen time) to arrange the call.
                  <br />
                  <span className="text-text-tertiary text-sm">
                    Lawful basis: steps prior to a contract and our legitimate interest (Art. 6(1)(b) and
                    6(1)(f) GDPR).
                  </span>
                </li>
                <li>
                  <span className="text-text-primary font-medium">Analytics — only with your consent.</span>{' '}
                  If you accept analytics cookies on our banner, Google Analytics collects usage data such
                  as the pages you view, approximate location (your IP address is anonymised), and device
                  and browser information. Nothing is loaded until you accept, and you can decline without
                  any loss of functionality.
                  <br />
                  <span className="text-text-tertiary text-sm">
                    Lawful basis: your consent (Art. 6(1)(a) GDPR and the ePrivacy rules on cookies).
                  </span>
                </li>
                <li>
                  <span className="text-text-primary font-medium">Technical logs.</span> Our hosting
                  provider automatically records standard server-log data (such as IP address, request
                  time, and pages requested) to keep the site available and secure.
                  <br />
                  <span className="text-text-tertiary text-sm">
                    Lawful basis: our legitimate interest in operating and securing the site (Art. 6(1)(f)
                    GDPR).
                  </span>
                </li>
                <li>
                  <span className="text-text-primary font-medium">Your consent choice.</span> We store
                  your cookie choice in your browser&rsquo;s local storage so we don&rsquo;t ask again on
                  every visit. This is strictly necessary and does not require consent.
                </li>
              </ul>
            </Section>

            <Section title="Cookies and similar technologies">
              <p>
                We do not set any non-essential cookies before you give consent. The only thing stored
                without consent is your cookie preference itself (in local storage), which is strictly
                necessary to remember your choice.
              </p>
              <p>
                If you accept analytics, Google Analytics sets cookies (for example{' '}
                <code className="text-text-primary">_ga</code> and{' '}
                <code className="text-text-primary">_ga_*</code>) to distinguish visitors and measure
                usage. We have enabled IP anonymisation. You can withdraw consent at any time by clearing
                this site&rsquo;s cookies and local storage in your browser, or by adjusting your browser
                settings; the banner will then appear again on your next visit.
              </p>
            </Section>

            <Section title="Who we share data with">
              <p>
                We never sell your personal data. We share it only with service providers (processors)
                who help us run the site and respond to you, and only as far as needed:
              </p>
              <ul className="flex flex-col gap-3 list-disc pl-5">
                <li>
                  <span className="text-text-primary font-medium">Resend</span> — delivers the emails sent
                  from our forms.
                </li>
                <li>
                  <span className="text-text-primary font-medium">ImprovMX</span> — forwards email sent to
                  our addresses.
                </li>
                <li>
                  <span className="text-text-primary font-medium">Google (Analytics)</span> — measures
                  site usage, only where you have consented.
                </li>
                <li>
                  <span className="text-text-primary font-medium">Our hosting provider</span> — serves the
                  website and keeps technical logs.
                </li>
                <li>
                  <span className="text-text-primary font-medium">Our scheduling provider</span> — handles
                  call bookings, where you use that option.
                </li>
              </ul>
              <p>
                We may also disclose data where we are legally required to do so, or to establish, exercise,
                or defend legal claims.
              </p>
            </Section>

            <Section title="International transfers">
              <p>
                Some of our providers are based outside the European Economic Area, including in the United
                States. Where data is transferred outside the EEA, it is protected by appropriate safeguards
                such as the European Commission&rsquo;s Standard Contractual Clauses and, where applicable,
                the EU&ndash;US Data Privacy Framework.
              </p>
            </Section>

            <Section title="How long we keep it">
              <p>
                We keep enquiry and correspondence data for as long as needed to deal with your request and
                our relationship, and for a reasonable period afterwards (generally up to 24 months from our
                last contact), unless a contract or the law requires us to keep it longer. Analytics data is
                retained according to our Google Analytics settings (currently up to 14 months). Technical
                logs are kept only for a short period.
              </p>
            </Section>

            <Section title="Your rights">
              <p>Under the GDPR, you have the right to:</p>
              <ul className="flex flex-col gap-2 list-disc pl-5">
                <li>access the personal data we hold about you;</li>
                <li>have inaccurate data corrected;</li>
                <li>have your data erased in certain circumstances;</li>
                <li>restrict or object to our processing;</li>
                <li>receive your data in a portable format; and</li>
                <li>withdraw consent at any time, without affecting processing already carried out.</li>
              </ul>
              <p>
                To exercise any of these rights, email us at{' '}
                <a href={`mailto:${site.email}`} className="text-accent underline-offset-2 hover:underline">
                  {site.email}
                </a>
                . We will respond within one month.
              </p>
            </Section>

            <Section title="Complaints">
              <p>
                If you believe we have not handled your data properly, you can lodge a complaint with the
                supervisory authority in Cyprus, the{' '}
                <a
                  href="http://www.dataprotection.gov.cy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline-offset-2 hover:underline"
                >
                  Office of the Commissioner for Personal Data Protection
                </a>
                , or with the supervisory authority in your own EU country. We&rsquo;d appreciate the chance
                to address your concerns first, so please consider contacting us before you do.
              </p>
            </Section>

            <Section title="Children">
              <p>
                This website is not directed at children, and we do not knowingly collect personal data from
                anyone under the age of 16.
              </p>
            </Section>

            <Section title="Automated decision-making">
              <p>
                We do not use your personal data for automated decision-making or profiling that produces
                legal or similarly significant effects.
              </p>
            </Section>

            <Section title="Changes to this notice">
              <p>
                We may update this notice from time to time. When we do, we will revise the &ldquo;last
                updated&rdquo; date above. Material changes will be made clear on this page.
              </p>
            </Section>
          </div>
        </div>
      </section>
    </>
  )
}
