import type { CollectionConfig } from 'payload'

export const Newsletters: CollectionConfig = {
  slug: 'newsletters',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'year', 'publicationDate'],
    group: 'Heritage',
  },
  access: { read: () => true },
  defaultSort: '-publicationDate',
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      type: 'row',
      fields: [
        { name: 'year', type: 'number', required: true },
        { name: 'edition', type: 'text' },
        { name: 'publicationDate', type: 'date' },
      ],
    },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    { name: 'summary', type: 'textarea', required: true, admin: { description: 'Short accessible summary shown on the archive page — never a blank page with only an embed.' } },
    {
      name: 'featuredStories',
      type: 'array',
      fields: [{ name: 'story', type: 'text', required: true }],
    },
    {
      name: 'pdf',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optimised PDF with a meaningful file name.' },
    },
    { name: 'htmlSummary', type: 'richText', admin: { description: 'Accessible HTML version of the highlights.' } },
  ],
}
