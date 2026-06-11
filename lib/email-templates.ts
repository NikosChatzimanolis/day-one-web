// ── lib/email-templates.ts ──

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const EMAIL_STYLES = `
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #F7F4EF; margin: 0; padding: 0; }
  .container { max-width: 560px; margin: 40px auto; background: #fff; border: 1px solid #E0D9D0; border-radius: 6px; overflow: hidden; }
  .header { background: #1A1A18; padding: 28px 32px; }
  .header h1 { color: #F7F4EF; font-size: 20px; margin: 0; font-weight: 400; letter-spacing: 0.02em; }
  .header p { color: #9C9790; font-size: 13px; margin: 4px 0 0; }
  .body { padding: 28px 32px; }
  .body p { font-size: 15px; color: #1A1A18; line-height: 1.6; margin: 0 0 16px; }
  .body a { color: #C4522A; }
  .footer { padding: 16px 32px; border-top: 1px solid #E0D9D0; font-size: 11px; color: #9C9790; }
  .cta { display: inline-block; margin-top: 8px; padding: 10px 20px; background: #C4522A; color: #fff !important; border-radius: 4px; text-decoration: none; font-size: 14px; }
`

function wrapEmailHtml(headerSubtitle: string, bodyContent: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><style>${EMAIL_STYLES}</style></head>
<body>
  <div class="container">
    <div class="header">
      <h1>Day One</h1>
      <p>${headerSubtitle}</p>
    </div>
    <div class="body">
      ${bodyContent}
    </div>
    <div class="footer">
      Day One Web Studio · Cyprus &amp; Greece · dayone-web.com
    </div>
  </div>
</body>
</html>`
}

export function buildContactAutoReply(name: string) {
  const firstName = escapeHtml(name.split(' ')[0])

  const text = `Hi ${name.split(' ')[0]},

Thanks for getting in touch with Day One — we've received your message.

We'll read it and get back to you within one business day.

If it's urgent, you can reach us on WhatsApp: +357 96 254 148

— Day One Web Studio
contact@dayone-web.com
dayone-web.com`

  const html = wrapEmailHtml(
    'Thanks for reaching out',
    `<p>Hi ${firstName},</p>
<p>Thanks for getting in touch — we've received your message and will get back to you within <strong>one business day</strong>.</p>
<p>In the meantime, feel free to browse our <a href="https://dayone-web.com/work/tapinakia">past work</a> or message us on WhatsApp if it's urgent.</p>
<a href="https://wa.me/35796254148" class="cta">Message us on WhatsApp</a>`
  )

  return { text, html }
}
