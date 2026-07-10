import type { CollectionConfig } from 'payload'

export const CommitteeMembers: CollectionConfig = {
  slug: 'committee-members',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'designation', 'termStart', 'termEnd', 'memberStatus'],
    group: 'Club',
  },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'designation', type: 'text', required: true, admin: { description: 'e.g. President, Captain, Honorary Secretary' } },
    { name: 'photograph', type: 'upload', relationTo: 'media' },
    {
      type: 'row',
      fields: [
        { name: 'termStart', type: 'date' },
        { name: 'termEnd', type: 'date' },
        {
          name: 'memberStatus',
          type: 'select',
          required: true,
          defaultValue: 'active',
          admin: {
            description:
              'When a term ends, set to Former — past members move to the archive rather than disappearing.',
          },
          options: [
            { label: 'Active', value: 'active' },
            { label: 'Former (archived)', value: 'former' },
          ],
        },
      ],
    },
    { name: 'biography', type: 'textarea' },
    {
      name: 'publicContact',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Personal telephone numbers are never shown unless explicitly approved.',
      },
    },
    {
      name: 'contact',
      type: 'relationship',
      relationTo: 'contacts',
      admin: { condition: (data) => Boolean(data?.publicContact) },
    },
    { name: 'displayOrder', type: 'number', defaultValue: 0 },
  ],
}
