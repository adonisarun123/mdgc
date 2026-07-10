import type { CollectionConfig } from 'payload'
import { verificationField } from '../fields/verification'

export const AffiliatedClubs: CollectionConfig = {
  slug: 'affiliated-clubs',
  admin: {
    useAsTitle: 'clubName',
    defaultColumns: ['clubName', 'city', 'country', 'verification.status'],
    group: 'Club',
  },
  access: { read: () => true },
  defaultSort: 'clubName',
  fields: [
    { name: 'clubName', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'city', type: 'text' },
        { name: 'state', type: 'text' },
        { name: 'country', type: 'text', defaultValue: 'India' },
      ],
    },
    { name: 'website', type: 'text' },
    {
      name: 'reciprocalGreenFee',
      type: 'relationship',
      relationTo: 'tariffs',
      admin: { description: 'Link the applicable reciprocal fee record, if any.' },
    },
    { name: 'notes', type: 'textarea' },
    verificationField,
  ],
}
