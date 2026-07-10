import type { GlobalConfig } from 'payload'

/**
 * "Today at Mercara Downs" — the operational board on the homepage.
 * Designed so reception staff can update it in seconds without a developer.
 */
export const CourseStatus: GlobalConfig = {
  slug: 'course-status',
  label: 'Today at Mercara Downs',
  admin: { group: 'Daily Operations' },
  access: { read: () => true },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'courseStatus',
          type: 'select',
          required: true,
          defaultValue: 'open',
          options: [
            { label: 'Open', value: 'open' },
            { label: 'Open — restrictions apply', value: 'restricted' },
            { label: 'Closed', value: 'closed' },
          ],
        },
        {
          name: 'firstTeeStatus',
          type: 'text',
          admin: { description: 'e.g. "First tee available from 6:30 a.m."' },
        },
      ],
    },
    { name: 'weatherNote', type: 'text', admin: { description: 'e.g. "Morning mist, clearing by 9 a.m."' } },
    {
      type: 'row',
      fields: [
        {
          name: 'caddyAvailability',
          type: 'select',
          defaultValue: 'available',
          options: [
            { label: 'Available', value: 'available' },
            { label: 'Limited', value: 'limited' },
            { label: 'Unavailable', value: 'unavailable' },
          ],
        },
        {
          name: 'buggyAvailability',
          type: 'select',
          defaultValue: 'available',
          options: [
            { label: 'Available', value: 'available' },
            { label: 'Limited', value: 'limited' },
            { label: 'Unavailable', value: 'unavailable' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'practiceAreaStatus',
          type: 'select',
          defaultValue: 'open',
          options: [
            { label: 'Open', value: 'open' },
            { label: 'Closed', value: 'closed' },
          ],
        },
        {
          name: 'diningStatus',
          type: 'select',
          defaultValue: 'open',
          options: [
            { label: 'Open', value: 'open' },
            { label: 'Closed', value: 'closed' },
          ],
        },
      ],
    },
    { name: 'noticeToGolfers', type: 'textarea', admin: { description: 'Optional short notice, e.g. maintenance on holes 6–8.' } },
    // `updatedAt` is maintained automatically by Payload and displayed
    // on the site as the "Last updated" time for this board.
  ],
}
