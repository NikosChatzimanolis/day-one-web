// ── app/api/review/route.ts ──
import { NextRequest, NextResponse } from 'next/server'
import { sendDayOneEmail } from '@/lib/email'

const RATING_KEYS = ['overall', 'represents', 'enquiries', 'communication', 'speed', 'refer'] as const
type RatingKey = (typeof RATING_KEYS)[number]

const RATING_LABELS: Record<RatingKey, string> = {
  overall: 'Overall happiness with the final website',
  represents: 'Represents the business as wanted',
  enquiries: 'Helped bring in enquiries / calls / customers',
  communication: 'Communication throughout the project',
  speed: 'Delivery speed',
  refer: 'Likelihood to refer to another business owner',
}

const PERMISSIONS = ['named', 'anonymous', 'private'] as const
type Permission = (typeof PERMISSIONS)[number]

const PERMISSION_LABELS: Record<Permission, string> = {
  named: 'Yes — name + business',
  anonymous: 'Yes — anonymous',
  private: 'No — private only',
}

interface ReviewBody {
  ratings: unknown
  businessName: unknown
  permission: unknown
  oneLiner: unknown
}

interface ParsedReview {
  ratings: Record<RatingKey, number>
  businessName: string
  permission: Permission
  oneLiner: string
}

function validateBody(body: ReviewBody): { error: string | null; parsed?: ParsedReview } {
  if (typeof body.ratings !== 'object' || body.ratings === null) {
    return { error: 'Ratings are required.' }
  }
  const ratingsObj = body.ratings as Record<string, unknown>
  const ratings = {} as Record<RatingKey, number>
  for (const key of RATING_KEYS) {
    const v = ratingsObj[key]
    if (typeof v !== 'number' || !Number.isInteger(v) || v < 1 || v > 5) {
      return { error: 'Please answer all six rating questions (1–5).' }
    }
    ratings[key] = v
  }

  if (typeof body.permission !== 'string' || !PERMISSIONS.includes(body.permission as Permission)) {
    return { error: 'A valid permission option is required.' }
  }

  if (body.businessName != null && typeof body.businessName !== 'string') {
    return { error: 'Invalid business name.' }
  }
  if (body.oneLiner != null && typeof body.oneLiner !== 'string') {
    return { error: 'Invalid description.' }
  }
  const businessName = ((body.businessName as string) ?? '').trim()
  const oneLiner = ((body.oneLiner as string) ?? '').trim()
  if (businessName.length > 200) return { error: 'Business name is too long.' }
  if (oneLiner.length > 1000) return { error: 'Description must be under 1000 characters.' }

  return {
    error: null,
    parsed: { ratings, businessName, permission: body.permission as Permission, oneLiner },
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ReviewBody
    const { error, parsed } = validateBody(body)

    if (error || !parsed) {
      return NextResponse.json({ error: error ?? 'Invalid submission.' }, { status: 400 })
    }

    const { ratings, businessName, permission, oneLiner } = parsed
    const fromName = businessName || 'a client'

    const ratingsText = RATING_KEYS.map(
      (k) => `${RATING_LABELS[k]}: ${ratings[k]}/5`
    ).join('\n')

    const ratingsHtml = RATING_KEYS.map(
      (k) => `
      <tr>
        <td style="padding: 8px 0; font-size: 14px; color: #1A1A18;">${RATING_LABELS[k]}</td>
        <td style="padding: 8px 0; font-size: 14px; color: #C4522A; font-weight: 600; text-align: right; white-space: nowrap;">${ratings[k]} / 5</td>
      </tr>`
    ).join('')

    const { error: sendError } = await sendDayOneEmail({
      form: 'feedback',
      subject: `New review from ${fromName} — Day One`,
      text: `
New client review from Day One website
---------------------------------
Business: ${businessName || '(not provided)'}
Permission: ${PERMISSION_LABELS[permission]}

Ratings:
${ratingsText}

One line:
${oneLiner || '(not provided)'}

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
    .ratings { width: 100%; border-collapse: collapse; border-top: 1px solid #E0D9D0; }
    .ratings tr { border-bottom: 1px solid #F0EBE3; }
    .message-box { background: #F7F4EF; border: 1px solid #E0D9D0; border-radius: 4px; padding: 16px; font-size: 15px; color: #1A1A18; line-height: 1.6; white-space: pre-wrap; font-style: italic; }
    .footer { padding: 16px 32px; border-top: 1px solid #E0D9D0; font-size: 11px; color: #9C9790; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Day One</h1>
      <p>New client review</p>
    </div>
    <div class="body">
      <div class="field">
        <div class="label">Business</div>
        <div class="value">${businessName || '<span style="color:#9C9790;">Not provided</span>'}</div>
      </div>
      <div class="field">
        <div class="label">Permission to use publicly</div>
        <div class="value">${PERMISSION_LABELS[permission]}</div>
      </div>
      <div class="field">
        <div class="label">Ratings</div>
        <table class="ratings">${ratingsHtml}</table>
      </div>
      <div class="field">
        <div class="label">One line</div>
        <div class="message-box">${oneLiner ? oneLiner.replace(/\n/g, '<br/>') : 'Not provided'}</div>
      </div>
    </div>
    <div class="footer">
      Sent via dayone-web.com — Day One Studio, Cyprus
    </div>
  </div>
</body>
</html>
      `.trim(),
    })

    if (sendError) {
      console.error('[review/route] Resend error:', sendError)
      return NextResponse.json(
        { error: 'Failed to send review. Please try again or contact us directly.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[review/route] Error sending email:', err)
    return NextResponse.json(
      { error: 'Failed to send review. Please try again or contact us directly.' },
      { status: 500 }
    )
  }
}
