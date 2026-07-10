/**
 * Lightweight form spam protection: a honeypot field bots tend to fill,
 * and a time-trap (forms submitted faster than a human plausibly could
 * are rejected). No CAPTCHA — deliberately, per accessibility goals.
 */
const MIN_SECONDS = 3

export function isSpam(formData: FormData): boolean {
  // Honeypot: real users never see or fill this field.
  const honey = formData.get('website_url')
  if (typeof honey === 'string' && honey.trim() !== '') return true

  // Time-trap: the form embeds its render timestamp.
  const ts = formData.get('form_ts')
  if (typeof ts === 'string' && ts !== '') {
    const rendered = Number(ts)
    if (Number.isFinite(rendered) && Date.now() - rendered < MIN_SECONDS * 1000) return true
  }
  return false
}
