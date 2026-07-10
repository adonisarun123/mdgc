import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: { group: 'Club' },
  access: { read: () => true },
  fields: [
    { name: 'clubName', type: 'text', defaultValue: 'Mercara Downs Golf Club' },
    { name: 'tagline', type: 'text', defaultValue: 'Golf in the Mist' },
    {
      name: 'heritageStatement',
      type: 'textarea',
      defaultValue:
        'Golf has been played on the Mercara Downs since the late nineteenth century.',
      admin: {
        description:
          'The single verified historical statement used across the site. Do not claim a precise founding year unless the club can document it.',
      },
    },
    {
      name: 'address',
      type: 'group',
      fields: [
        { name: 'line1', type: 'text' },
        { name: 'line2', type: 'text' },
        { name: 'town', type: 'text', defaultValue: 'Madikeri' },
        { name: 'district', type: 'text', defaultValue: 'Kodagu (Coorg)' },
        { name: 'state', type: 'text', defaultValue: 'Karnataka' },
        { name: 'pincode', type: 'text' },
      ],
    },
    {
      name: 'directions',
      type: 'array',
      admin: { description: 'Journey rows for the Directions section — all times must be verified.' },
      fields: [
        { name: 'origin', type: 'text', required: true },
        { name: 'approximateDistance', type: 'text' },
        { name: 'approximateTime', type: 'text' },
        {
          name: 'verified',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Unverified rows are not shown publicly.' },
        },
      ],
    },
    { name: 'mapsUrl', type: 'text', admin: { description: '"Open in Maps" link — must point at the verified club location.' } },
    {
      name: 'socialLinks',
      type: 'array',
      fields: [
        { name: 'platform', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}
