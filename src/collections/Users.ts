import type { CollectionConfig } from 'payload'

/**
 * Staff accounts. Two roles:
 * - admin: manages users and all content
 * - editor: manages content (course status, tournaments, enquiries, stories)
 *   but cannot create or delete accounts
 */
export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    group: 'Club',
  },
  auth: true,
  access: {
    create: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
    read: ({ req }) => Boolean(req.user),
    update: ({ req, id }) => req.user?.role === 'admin' || req.user?.id === id,
  },
  fields: [
    { name: 'name', type: 'text' },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      options: [
        { label: 'Administrator', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        update: ({ req }) => req.user?.role === 'admin',
      },
      saveToJWT: true,
    },
  ],
}
