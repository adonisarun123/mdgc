import type { GroupField } from 'payload'

/**
 * Reusable verification group.
 *
 * Every fact-bearing record carries this so unverified content can be
 * filtered out of public queries. The internal label used in project
 * documentation is [REQUIRES MDGC VERIFICATION]; it must never be
 * rendered on the public website — the frontend simply excludes or
 * softens content where `verification.status !== 'verified'`.
 */
export const verificationField: GroupField = {
  name: 'verification',
  type: 'group',
  admin: {
    description:
      'Content marked "Pending" is treated as unverified and is hidden or softened on the public site.',
    position: 'sidebar',
  },
  fields: [
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      required: true,
      options: [
        { label: 'Pending – requires MDGC verification', value: 'pending' },
        { label: 'Verified by club', value: 'verified' },
      ],
    },
    {
      name: 'verifiedBy',
      type: 'text',
      admin: { condition: (_, siblingData) => siblingData?.status === 'verified' },
    },
    {
      name: 'verifiedOn',
      type: 'date',
      admin: { condition: (_, siblingData) => siblingData?.status === 'verified' },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: { description: 'Internal notes only. Never shown publicly.' },
    },
  ],
}
