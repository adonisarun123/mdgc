import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: { group: 'Club' },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description:
          'Descriptive alt text, e.g. "A mist-covered fairway at Mercara Downs Golf Club framed by mature trees." Never a file name.',
      },
    },
    { name: 'caption', type: 'text' },
    {
      type: 'row',
      fields: [
        { name: 'copyrightOwner', type: 'text' },
        {
          name: 'usagePermission',
          type: 'select',
          defaultValue: 'unconfirmed',
          options: [
            { label: 'Confirmed', value: 'confirmed' },
            { label: 'Unconfirmed', value: 'unconfirmed' },
          ],
        },
      ],
    },
    {
      name: 'isArchival',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Archival images are labelled with an approximate date on the site.' },
    },
    {
      name: 'approximateDate',
      type: 'text',
      admin: {
        description: 'e.g. "circa 1975" — shown when the image is archival.',
        condition: (data) => Boolean(data?.isArchival),
      },
    },
  ],
  upload: {
    imageSizes: [
      { name: 'thumbnail', width: 480 },
      { name: 'card', width: 960 },
      { name: 'hero', width: 1920 },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'application/pdf'],
  },
}
