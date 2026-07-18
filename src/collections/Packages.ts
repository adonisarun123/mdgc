import type { CollectionConfig } from 'payload'
import { verificationField } from '../fields/verification'

/**
 * Stay-and-play and golf-tourism packages: room + rounds + dining bundles.
 *
 * A package appears on /stay/stay-and-play only when `published` is ticked.
 * Its price appears only when the record is club-verified AND the review
 * date has not passed — otherwise the page shows "price on request".
 */
export const Packages: CollectionConfig = {
  slug: 'packages',
  labels: { singular: 'Package', plural: 'Stay & Play Packages' },
  admin: {
    useAsTitle: 'packageName',
    defaultColumns: ['packageName', 'nights', 'rounds', 'published', 'verification.status'],
    group: 'Stay',
  },
  access: { read: () => true },
  fields: [
    { name: 'packageName', type: 'text', required: true },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar', description: 'Show this package on the public site.' },
    },
    { name: 'summary', type: 'textarea', required: true, admin: { description: 'One or two sentences shown on the package card.' } },
    {
      type: 'row',
      fields: [
        { name: 'nights', type: 'number', required: true, min: 0 },
        { name: 'rounds', type: 'number', required: true, min: 0, admin: { description: 'Rounds of golf included.' } },
        { name: 'minGuests', type: 'number', min: 1, defaultValue: 1 },
      ],
    },
    {
      name: 'inclusions',
      type: 'array',
      required: true,
      fields: [{ name: 'inclusion', type: 'text', required: true }],
      admin: { description: 'e.g. One night at the Downs Retreat · 18 holes with caddie · Coorg breakfast' },
    },
    {
      name: 'eligibility',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'MDGC Member', value: 'member' },
        { label: 'Affiliated-Club Member', value: 'affiliated' },
        { label: 'Member Guest', value: 'member-guest' },
        { label: 'Independent Visitor', value: 'visitor' },
      ],
      admin: { description: 'Who may book this package.' },
    },
    {
      name: 'pricing',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'price', type: 'number', admin: { description: 'INR, excluding taxes.' } },
            {
              name: 'priceBasis',
              type: 'select',
              defaultValue: 'per-person',
              options: [
                { label: 'Per person', value: 'per-person' },
                { label: 'Per couple', value: 'per-couple' },
                { label: 'Per room / flat', value: 'per-room' },
              ],
            },
          ],
        },
        { name: 'taxNote', type: 'text', admin: { description: 'e.g. plus applicable taxes' } },
        { name: 'effectiveDate', type: 'date' },
        {
          name: 'reviewDate',
          type: 'date',
          admin: { description: 'The price is hidden automatically once this date passes.' },
        },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    { name: 'details', type: 'richText', admin: { description: 'Longer description, terms, seasonal notes.' } },
    { name: 'displayOrder', type: 'number', defaultValue: 0 },
    verificationField,
  ],
}
