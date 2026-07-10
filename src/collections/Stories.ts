import type { CollectionConfig } from 'payload'

export const Stories: CollectionConfig = {
  slug: 'stories',
  labels: { singular: 'Story', plural: 'Stories from the Downs' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedDate', '_status'],
    group: 'Heritage',
  },
  access: { read: () => true },
  versions: { drafts: true },
  defaultSort: '-publishedDate',
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL segment, e.g. monsoon-medal-2026' },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Tournament report', value: 'tournament-report' },
        { label: 'Member story', value: 'member-story' },
        { label: 'Course story', value: 'course-story' },
        { label: 'Junior golf', value: 'junior-golf' },
        { label: 'Caddy story', value: 'caddy-story' },
        { label: 'Heritage', value: 'heritage' },
        { label: 'Club announcement', value: 'announcement' },
        { label: 'Newsletter', value: 'newsletter' },
      ],
    },
    { name: 'publishedDate', type: 'date', required: true },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'body', type: 'richText', required: true },
  ],
}
