import { Resend } from 'resend'

export const CONTACT_TO = 'contact@dayone-web.com'

const FROM_BY_FORM = {
  contact: 'Day One Website <contact@dayone-web.com>',
  feedback: 'Day One Website <feedback@dayone-web.com>',
} as const

export type EmailForm = keyof typeof FROM_BY_FORM

function getResend() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured')
  }
  return new Resend(apiKey)
}

export async function sendDayOneEmail(opts: {
  form: EmailForm
  to?: string | string[]
  subject: string
  text: string
  html: string
  replyTo?: string
}) {
  const from = FROM_BY_FORM[opts.form]

  return getResend().emails.send({
    from,
    to: opts.to ?? CONTACT_TO,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
    replyTo: opts.replyTo,
  })
}
