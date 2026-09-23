// ── components/contact/IntentContactForm.tsx ──
// Reads ?intent= (partnership | demo | project | security) and pre-selects it
// in the form. useSearchParams needs a Suspense boundary above it, which the
// contact page provides, so the page itself stays statically prerendered.
'use client'

import { useSearchParams } from 'next/navigation'
import ContactForm, { type ContactLabels } from '@/components/contact/ContactForm'
import { isContactIntent } from '@/lib/site'

export default function IntentContactForm({ labels }: { labels: ContactLabels }) {
  const params = useSearchParams()
  const raw = params.get('intent')
  return <ContactForm labels={labels} defaultIntent={isContactIntent(raw) ? raw : undefined} />
}
