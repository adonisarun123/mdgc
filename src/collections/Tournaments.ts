import type { CollectionConfig } from 'payload'
import { verificationField } from '../fields/verification'

export const TOURNAMENT_STATUSES = [
  'draft',
  'announced',
  'registration-open',
  'registration-closed',
  'draw-published',
  'in-progress',
  'results-published',
  'postponed',
  'cancelled',
  'archived',
] as const

export const Tournaments: CollectionConfig = {
  slug: 'tournaments',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'year', 'status', 'startDate'],
    group: 'Golf',
  },
  access: { read: () => true },
  defaultSort: '-startDate',
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'year', type: 'number', required: true },
        { name: 'startDate', type: 'date' },
        { name: 'endDate', type: 'date' },
        {
          name: 'status',
          type: 'select',
          required: true,
          defaultValue: 'draft',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Announced', value: 'announced' },
            { label: 'Registration Open', value: 'registration-open' },
            { label: 'Registration Closed', value: 'registration-closed' },
            { label: 'Draw Published', value: 'draw-published' },
            { label: 'In Progress', value: 'in-progress' },
            { label: 'Results Published', value: 'results-published' },
            { label: 'Postponed', value: 'postponed' },
            { label: 'Cancelled', value: 'cancelled' },
            { label: 'Archived', value: 'archived' },
          ],
        },
      ],
    },
    { name: 'sponsor', type: 'text' },
    { name: 'format', type: 'text', admin: { description: 'e.g. 18-hole Stableford' } },
    { name: 'eligibility', type: 'textarea' },
    {
      type: 'row',
      fields: [
        { name: 'entryFee', type: 'number', admin: { description: 'INR, excluding taxes.' } },
        { name: 'handicapRule', type: 'text' },
        { name: 'maximumField', type: 'number' },
        { name: 'registrationDeadline', type: 'date' },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Draw & Tee Times',
          fields: [
            { name: 'drawDocument', type: 'upload', relationTo: 'media' },
            { name: 'teeTimesDocument', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Results',
          fields: [
            {
              name: 'winners',
              type: 'array',
              fields: [
                { name: 'category', type: 'text', required: true },
                { name: 'playerName', type: 'text', required: true },
                { name: 'score', type: 'text' },
              ],
            },
            { name: 'report', type: 'richText' },
            { name: 'resultsDocument', type: 'upload', relationTo: 'media' },
          ],
        },
        {
          label: 'Media & Documents',
          fields: [
            { name: 'gallery', type: 'upload', relationTo: 'media', hasMany: true },
            {
              name: 'documents',
              type: 'array',
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'file', type: 'upload', relationTo: 'media', required: true },
              ],
            },
          ],
        },
      ],
    },
    verificationField,
  ],
}
