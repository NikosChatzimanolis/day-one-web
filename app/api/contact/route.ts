// ── app/api/contact/route.ts ──
import { NextRequest, NextResponse } from 'next/server'
import { sendDayOneEmail, CONTACT_TO } from '@/lib/email'
import { buildContactAutoReply } from '@/lib/email-templates'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface ContactBody {
  name: unknown
  email: unknown
  message: unknown
}

function validateBody(body: ContactBody): string | null {
  if (typeof body.name !== 'string' || body.name.trim().length < 2) {
    return 'Name must be at least 2 characters.'
  }
  if (typeof body.email !== 'string' || !EMAIL_REGEX.test(body.email)) {
    return 'A valid email address is required.'
  }
  if (typeof body.message !== 'string' || body.message.trim().length < 10) {
    return 'Message must be at least 10 characters.'
  }
  if (body.message.length > 2000) {
    return 'Message must be under 2000 characters.'
  }
  return null
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactBody
    const validationError = validateBody(body)

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 })
    }

    const name = (body.name as string).trim()
    const email = (body.email as string).trim()
    const message = (body.message as string).trim()

    const { error } = await sendDayOneEmail({
      form: 'contact',
      replyTo: email,
      subject: `New enquiry from ${name} — Day One`,
      text: `
New enquiry from Day One website
---------------------------------
Name:    ${name}
Email:   ${email}

Message:
${message}

---------------------------------
Sent via dayone-web.com
      `.trim(),
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #F7F4EF; margin: 0; padding: 0; }
    .container { max-width: 560px; margin: 40px auto; background: #fff; border: 1px solid #E0D9D0; border-radius: 6px; overflow: hidden; }
    .header { background: #1A1A18; padding: 28px 32px; }
    .header h1 { color: #F7F4EF; font-size: 20px; margin: 0; font-weight: 400; letter-spacing: 0.02em; }
    .header p { color: #9C9790; font-size: 13px; margin: 4px 0 0; }
    .body { padding: 28px 32px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #9C9790; margin-bottom: 4px; }
    .value { font-size: 15px; color: #1A1A18; }
    .message-box { background: #F7F4EF; border: 1px solid #E0D9D0; border-radius: 4px; padding: 16px; font-size: 15px; color: #1A1A18; line-height: 1.6; white-space: pre-wrap; }
    .footer { padding: 16px 32px; border-top: 1px solid #E0D9D0; font-size: 11px; color: #9C9790; }
    .reply-cta { display: inline-block; margin-top: 20px; padding: 10px 20px; background: #C4522A; color: #fff; border-radius: 4px; text-decoration: none; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Day One</h1>
      <p>New website enquiry</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">From</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${email}" style="color: #C4522A;">${email}</a></div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${message.replace(/\n/g, '<br/>')}</div>
      </div>
      <a href="mailto:${email}?subject=Re: Your enquiry — Day One" class="reply-cta">Reply to ${name}</a>
    </div>
    <div class="footer">
      Sent via dayone-web.com — Day One Studio, Cyprus
    </div>
  </div>
</body>
</html>
      `.trim(),
    })

    if (error) {
      console.error('[contact/route] Resend error:', error)
      return NextResponse.json(
        { error: 'Failed to send message. Please try again or contact us directly.' },
        { status: 500 }
      )
    }

    const autoReply = buildContactAutoReply(name)
    const { error: autoReplyError } = await sendDayOneEmail({
      form: 'contact',
      to: email,
      replyTo: CONTACT_TO,
      subject: 'We got your message — Day One',
      text: autoReply.text,
      html: autoReply.html,
    })

    if (autoReplyError) {
      console.error('[contact/route] Auto-reply error:', autoReplyError)
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[contact/route] Error sending email:', err)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again or contact us directly.' },
      { status: 500 }
    )
  }
}
