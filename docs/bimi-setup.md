# BIMI setup for dayone-web.com

Logo file (in repo): `public/bimi-logo.svg` → **https://dayone-web.com/bimi-logo.svg**

---

## The honest cost breakdown

| Path | Cost | Gmail (Resend auto-emails) | Apple Mail | Yahoo |
|------|------|----------------------------|------------|-------|
| **Free — self-asserted BIMI** | $0 | No | Sometimes | Yes |
| **Free — Apple Business Connect** | $0 | No | Yes | No |
| **Free — Gmail profile photo** | $0 | Yes, but **only mail you send from Gmail** | No | No |
| **Paid — CMC certificate** | ~$400–1,200/yr | Yes | No | Yes |

**There is no free way to show a custom logo in Gmail for automatic Resend emails.** Gmail requires a paid CMC or VMC for that. Skip the certificate unless you want to spend later.

---

## Recommended: free path ($0)

### A — Self-asserted BIMI (Yahoo / Fastmail, some others)

1. **Deploy** so `https://dayone-web.com/bimi-logo.svg` loads.

2. **Update DMARC** — change `_dmarc.dayone-web.com` TXT to:
   ```
   v=DMARC1; p=quarantine; pct=100; rua=mailto:contact@dayone-web.com;
   ```

3. **Add BIMI DNS** (no certificate — note there is **no** `a=` tag):
   | Host | TXT |
   |------|-----|
   | `default._bimi.dayone-web.com` | `v=BIMI1; l=https://dayone-web.com/bimi-logo.svg;` |

Worth doing — takes 15 minutes, helps non-Gmail users, costs nothing.

### B — Apple Business Connect (Apple Mail, free)

1. [businessconnect.apple.com](https://businessconnect.apple.com) → **Branded Mail**
2. Verify `dayone-web.com`, upload your logo (1024×1024 PNG)
3. Requires DMARC `p=quarantine` or `reject` (same as above)

Shows your logo in Apple Mail / iOS Mail for free.

### C — Gmail profile photo (manual sends only)

When **you** send from Gmail as `contact@dayone-web.com`:
- Upload your **D** logo at [myaccount.google.com](https://myaccount.google.com) (or Google Workspace admin for that user)
- Other Gmail users see that photo

Does **not** apply to website auto-replies (those go through Resend, not Google).

---

## Paid path (optional — Gmail logo on Resend mail)

Only if you budget ~$400+/year later:

1. Buy a [Common Mark Certificate (CMC)](https://bimigroup.org/mark-certificates/) from DigiCert etc.
2. Host PEM at `https://dayone-web.com/bimi/certificate.pem`
3. Use full BIMI record:
   ```
   v=BIMI1; l=https://dayone-web.com/bimi-logo.svg; a=https://dayone-web.com/bimi/certificate.pem;
   ```

---

## Current DNS status

| Record | Status |
|--------|--------|
| SPF (ImprovMX + Amazon SES) | Done |
| DKIM (Resend) | Done |
| DMARC `p=quarantine` | **You need to update** |
| BIMI TXT | **Add free record above** |

---

## What you already have in the email body

The auto-reply HTML includes your Day One wordmark inside the message — that works for everyone today, no certificate needed. The inbox **avatar** (small circle) is what BIMI controls.

---

## Refine the logo (optional)

`bimi-logo.svg` was generated from `app/apple-icon.png`. For a cleaner version: outline in Figma/Illustrator → export SVG Tiny PS → replace `public/bimi-logo.svg`.
