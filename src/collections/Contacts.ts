import type { CollectionConfig } from 'payload'

/**
 * Single structured contact directory.
 *
 * Public contact information on the website must come from these records
 * only, so a number can be changed once and update globally. Personal
 * staff numbers stay internal unless `publicStatus` is set to public.
 */
export const Contacts: CollectionConfig = {
  slug: 'contacts',
  admin: {
    useAsTitle: 'department',
    defaultColumns: ['department', 'contactPerson', 'phone', 'publicStatus', 'lastVerified'],
    group: 'Club',
  },
  access: {
    // Only publicly-approved contacts are readable without authentication.
    read: ({ req }) => {
      if (req.user) return true
      return { publicStatus: { equals: 'public' } }
    },
  },
  fields: [
    {
      name: 'department',
      type: 'select',
      required: true,
      options: [
        { label: 'Club Reception', value: 'club-reception' },
        { label: 'Golf Operations', value: 'golf-operations' },
        { label: 'Tee-Time Enquiries', value: 'tee-time-enquiries' },
        { label: 'General Manager', value: 'general-manager' },
        { label: 'Membership', value: 'membership' },
        { label: 'Tournament Office', value: 'tournament-office' },
        { label: 'Downs Retreat', value: 'downs-retreat' },
        { label: 'Room Reservations', value: 'room-reservations' },
        { label: 'Dining Reservations', value: 'dining-reservations' },
        { label: 'Accounts', value: 'accounts' },
        { label: 'Coaching', value: 'coaching' },
        { label: 'Emergency Contact', value: 'emergency' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'contactPerson', type: 'text' },
        { name: 'designation', type: 'text' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text' },
        { name: 'whatsappAvailable', type: 'checkbox', defaultValue: false },
        { name: 'email', type: 'email' },
      ],
    },
    { name: 'workingHours', type: 'text' },
    {
      name: 'publicStatus',
      type: 'select',
      required: true,
      defaultValue: 'internal',
      admin: {
        description:
          'Personal staff numbers must not be published without explicit approval.',
      },
      options: [
        { label: 'Public — shown on website', value: 'public' },
        { label: 'Internal only', value: 'internal' },
      ],
    },
    { name: 'lastVerified', type: 'date' },
    { name: 'displayOrder', type: 'number', defaultValue: 0 },
  ],
}
