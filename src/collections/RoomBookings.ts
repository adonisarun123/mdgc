import type { CollectionConfig } from 'payload'

/**
 * The club's single booking register.
 *
 * Every room booking — however it arrived (website request, phone, email,
 * walk-in, an OTA extranet, a travel agent) — is entered here by staff.
 * The public availability checker on /stay/book derives availability from
 * this register, so it is only as accurate as the discipline of entering
 * every booking the moment it is taken.
 *
 * Website visitors never create bookings directly: their requests land in
 * Room Enquiries. When staff confirm an enquiry they create a Room Booking
 * from it (and set the enquiry's status to Confirmed).
 *
 * A "Maintenance / block" entry removes rooms from sale without a guest.
 */
export const RoomBookings: CollectionConfig = {
  slug: 'room-bookings',
  labels: { singular: 'Room Booking', plural: 'Room Bookings (Register)' },
  admin: {
    useAsTitle: 'referenceTitle',
    defaultColumns: ['referenceTitle', 'room', 'checkInDate', 'checkOutDate', 'bookingStatus', 'source'],
    group: 'Stay',
    description:
      'The single register of all room bookings from every channel. The public availability checker reads from this — enter every phone, email, walk-in and OTA booking here as soon as it is taken.',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.checkInDate && data?.checkOutDate && data.checkOutDate <= data.checkInDate) {
          throw new Error('Check-out date must be after the check-in date.')
        }
        // Compose a readable title for admin lists.
        if (data) {
          const who = data.guestName || (data.bookingStatus === 'maintenance-block' ? 'Maintenance block' : 'Unnamed booking')
          const from = data.checkInDate ? String(data.checkInDate).slice(0, 10) : ''
          data.referenceTitle = from ? `${who} · ${from}` : who
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'referenceTitle', type: 'text', admin: { hidden: true } },
    {
      type: 'row',
      fields: [
        { name: 'room', type: 'relationship', relationTo: 'rooms', required: true },
        {
          name: 'unitsBooked',
          type: 'number',
          required: true,
          defaultValue: 1,
          min: 1,
          admin: { description: 'How many rooms of this category this booking occupies.' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'checkInDate', type: 'date', required: true },
        { name: 'checkOutDate', type: 'date', required: true },
      ],
    },
    {
      name: 'bookingStatus',
      type: 'select',
      required: true,
      defaultValue: 'tentative',
      admin: {
        position: 'sidebar',
        description:
          'Tentative, Confirmed and Checked-in bookings (and Maintenance blocks) count against availability. Cancelled, No-show and Checked-out do not.',
      },
      options: [
        { label: 'Tentative (hold)', value: 'tentative' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Checked in', value: 'checked-in' },
        { label: 'Checked out', value: 'checked-out' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'No-show', value: 'no-show' },
        { label: 'Maintenance / block (not for sale)', value: 'maintenance-block' },
      ],
    },
    {
      name: 'source',
      type: 'select',
      required: true,
      defaultValue: 'phone',
      admin: { position: 'sidebar', description: 'Where this booking came from.' },
      options: [
        { label: 'Website request', value: 'website' },
        { label: 'Telephone', value: 'phone' },
        { label: 'Email', value: 'email' },
        { label: 'Walk-in', value: 'walk-in' },
        { label: 'Booking.com', value: 'booking-com' },
        { label: 'MakeMyTrip / Goibibo', value: 'makemytrip' },
        { label: 'Agoda', value: 'agoda' },
        { label: 'Other OTA / portal', value: 'other-ota' },
        { label: 'Travel agent', value: 'travel-agent' },
        { label: 'Club office / member', value: 'club-office' },
      ],
    },
    {
      name: 'externalReference',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'OTA booking ID, email reference or similar, if any.',
      },
    },
    { name: 'guestName', type: 'text', admin: { description: 'Leave blank only for maintenance blocks.' } },
    {
      type: 'row',
      fields: [
        { name: 'mobile', type: 'text' },
        { name: 'email', type: 'email' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'adults', type: 'number', min: 0 },
        { name: 'children', type: 'number', min: 0 },
        {
          name: 'guestCategory',
          type: 'select',
          options: [
            { label: 'MDGC Member', value: 'member' },
            { label: 'Affiliated-Club Member', value: 'affiliated' },
            { label: 'Member Guest', value: 'member-guest' },
            { label: 'Independent Visitor', value: 'visitor' },
            { label: 'Tournament Participant', value: 'tournament' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'tariffQuoted',
          type: 'number',
          admin: { description: 'INR per night quoted to the guest, excluding taxes.' },
        },
        { name: 'tariffNote', type: 'text', admin: { description: 'e.g. plus 12% GST, includes breakfast' } },
      ],
    },
    {
      name: 'relatedEnquiry',
      type: 'relationship',
      relationTo: 'room-enquiries',
      admin: { description: 'The website enquiry this booking was created from, if any.' },
    },
    { name: 'notes', type: 'textarea' },
  ],
}
