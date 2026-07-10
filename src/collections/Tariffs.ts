import type { CollectionConfig } from 'payload'
import { verificationField } from '../fields/verification'

/**
 * Every published price on the site comes from a Tariff record so that
 * rates carry an effective date, tax note, review date and owner —
 * and can be automatically flagged or hidden once the review date passes.
 */
export const Tariffs: CollectionConfig = {
  slug: 'tariffs',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'category', 'amount', 'effectiveDate', 'reviewDate', 'verification.status'],
    group: 'Club',
  },
  access: { read: () => true },
  fields: [
    { name: 'label', type: 'text', required: true, admin: { description: 'e.g. "Green fee — 18 holes, affiliated-club visitor"' } },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Green fee', value: 'green-fee' },
        { label: 'Caddy charge', value: 'caddy' },
        { label: 'Buggy charge', value: 'buggy' },
        { label: 'Equipment rental', value: 'rental' },
        { label: 'Coaching fee', value: 'coaching' },
        { label: 'Room tariff', value: 'room' },
        { label: 'Membership fee', value: 'membership' },
        { label: 'Tournament entry', value: 'tournament-entry' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'visitorCategory',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'MDGC Member', value: 'member' },
        { label: 'Affiliated-Club Member', value: 'affiliated' },
        { label: 'Member Guest', value: 'member-guest' },
        { label: 'Independent Visitor', value: 'visitor' },
        { label: 'Tournament Participant', value: 'tournament' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'amount', type: 'number', required: true, admin: { description: 'INR, excluding taxes.' } },
        { name: 'unit', type: 'text', admin: { description: 'e.g. per round, per night, per hour' } },
        { name: 'taxNote', type: 'text', required: true, admin: { description: 'e.g. "plus applicable taxes" or "plus 12% GST"' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'effectiveDate', type: 'date', required: true },
        {
          name: 'reviewDate',
          type: 'date',
          required: true,
          admin: { description: 'Rate is flagged/hidden on the site after this date until re-confirmed.' },
        },
        { name: 'contentOwner', type: 'text', required: true, admin: { description: 'Internal person responsible for keeping this rate current.' } },
      ],
    },
    { name: 'notes', type: 'textarea' },
    verificationField,
  ],
}
