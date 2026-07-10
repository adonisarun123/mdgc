import type { CollectionAfterChangeHook } from 'payload'

/**
 * Notifies club staff when a new enquiry arrives.
 *
 * Requires SMTP_* env vars (email adapter) and ENQUIRY_NOTIFY_EMAIL.
 * Without them the hook is a no-op — enquiries still land in the CMS,
 * but nobody is notified, so configure these before launch.
 */
export function notifyOnEnquiry(label: string): CollectionAfterChangeHook {
  return async ({ doc, operation, req }) => {
    if (operation !== 'create') return doc
    const to = process.env.ENQUIRY_NOTIFY_EMAIL
    if (!to || !process.env.SMTP_HOST) return doc

    const summary = Object.entries(doc)
      .filter(([k, v]) => !['id', 'updatedAt', 'createdAt'].includes(k) && v != null && v !== '')
      .map(([k, v]) => `${k}: ${typeof v === 'object' ? JSON.stringify(v) : String(v)}`)
      .join('\n')

    try {
      await req.payload.sendEmail({
        to,
        subject: `New ${label} — ${doc.fullName ?? 'website enquiry'}`,
        text: `A new ${label} was submitted on the website.\n\n${summary}\n\nReview it in the admin panel under Enquiries.`,
      })
    } catch (err) {
      req.payload.logger.error({ err, msg: `Failed to send ${label} notification email` })
    }
    return doc
  }
}
