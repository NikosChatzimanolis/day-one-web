// ── lib/email-templates.ts ──

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Matches components/ui/Logo.tsx — primary variant, lg size (hero uses 2xl; lg fits email width)
function buildEmailLogoHtml(): string {
  return `
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
  <tr>
    <td style="vertical-align: bottom; padding: 0; line-height: 1;">
      <span style="font-family: 'Alex Brush', cursive; font-size: 72px; color: #C04C2A; line-height: 1; letter-spacing: -0.02em;">Day</span>
    </td>
    <td style="vertical-align: bottom; padding: 0 12px 6px 12px;">
      <div style="width: 1.5px; height: 64px; background-color: rgba(192, 76, 42, 0.3);"></div>
    </td>
    <td style="vertical-align: bottom; padding: 0 0 6px 0; line-height: 1;">
      <div style="font-family: 'Jost', Arial, sans-serif; font-size: 30px; font-weight: 200; letter-spacing: 0.12em; text-transform: uppercase; color: #1A1816; line-height: 1;">ONE</div>
      <div style="font-family: 'Jost', Arial, sans-serif; font-size: 9px; font-weight: 300; letter-spacing: 0.25em; text-transform: uppercase; color: #9A8F82; line-height: 1; margin-top: 4px;">WEB STUDIO</div>
    </td>
  </tr>
</table>`.trim()
}

const EMAIL_STYLES = `
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #F7F4EF; margin: 0; padding: 0; }
  .container { max-width: 560px; margin: 40px auto; background: #fff; border: 1px solid #E0D9D0; border-radius: 6px; overflow: hidden; }
  .header { background: #F7F4EF; padding: 32px 32px 24px; border-bottom: 1px solid #E0D9D0; }
  .header p { color: #6B6660; font-size: 13px; margin: 16px 0 0; line-height: 1.4; }
  .body { padding: 28px 32px; }
  .body p { font-size: 15px; color: #1A1A18; line-height: 1.6; margin: 0 0 16px; }
  .footer { padding: 16px 32px; border-top: 1px solid #E0D9D0; font-size: 11px; color: #9C9790; }
  .cta { display: inline-block; margin-top: 8px; padding: 10px 20px; background: #C04C2A; color: #fff !important; border-radius: 4px; text-decoration: none; font-size: 14px; }
`

function wrapEmailHtml(headerSubtitle: string, bodyContent: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Jost:wght@200;300&display=swap" rel="stylesheet" />
  <style>${EMAIL_STYLES}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      ${buildEmailLogoHtml()}
      <p>${headerSubtitle}</p>
    </div>
    <div class="body">
      ${bodyContent}
    </div>
    <div class="footer">
      Day One Web Studio · Paphos, Cyprus · dayone-web.com
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

If it's urgent, message us on WhatsApp: +357 96 254 148

— Day One Web Studio
contact@dayone-web.com
dayone-web.com`

  const html = wrapEmailHtml(
    'Thanks for reaching out',
    `<p>Hi ${firstName},</p>
<p>Thanks for getting in touch — we've received your message and will get back to you within <strong>one business day</strong>.</p>
<p>If it's urgent, message us on WhatsApp.</p>
<a href="https://wa.me/35796254148" class="cta">Message us on WhatsApp</a>`
  )

  return { text, html }
}
