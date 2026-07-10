import type { CollectionConfig, Field } from 'payload'
import { notifyOnEnquiry } from '../hooks/notifyOnEnquiry'

const contactFields: Field[] = [
  {
    type: 'row',
    fields: [
      { name: 'fullName', type: 'text', required: true },
      { name: 'mobile', type: 'text', required: true },
      { name: 'email', type: 'email', required: true },
    ],
  },
]

const enquiryStatusField: Field = {
  name: 'enquiryStatus',
  type: 'select',
  required: true,
  defaultValue: 'new',
  admin: { position: 'sidebar' },
  options: [
    { label: 'New', value: 'new' },
    { label: 'In progress', value: 'in-progress' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Declined', value: 'declined' },
    { label: 'Closed', value: 'closed' },
  ],
}

const playerCategoryOptions = [
  { label: 'MDGC Member', value: 'member' },
  { label: 'Affiliated-Club Member', value: 'affiliated' },
  { label: 'Member Guest', value: 'member-guest' },
  { label: 'Independent Visitor', value: 'visitor' },
  { label: 'Tournament Participant', value: 'tournament' },
]

/**
 * Enquiry collections are write-only for the public (created via server
 * actions) and readable only by authenticated staff.
 *
 * A tee-time request is never described to the visitor as a confirmed
 * booking — confirmation happens only when staff set enquiryStatus to
 * "confirmed" and reply.
 */
export const TeeTimeRequests: CollectionConfig = {
  slug: 'tee-time-requests',
  labels: { singular: 'Tee-Time Request', plural: 'Tee-Time Requests' },
  hooks: { afterChange: [notifyOnEnquiry('tee-time request')] },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'playerCategory', 'preferredDate', 'enquiryStatus'],
    group: 'Enquiries',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'playerCategory', type: 'select', required: true, options: playerCategoryOptions },
    {
      type: 'row',
      fields: [
        { name: 'preferredDate', type: 'date', required: true },
        { name: 'alternativeDate', type: 'date' },
        { name: 'numberOfGolfers', type: 'number', required: true, min: 1, max: 8 },
        {
          name: 'holes',
          type: 'select',
          required: true,
          options: [
            { label: '9 holes', value: '9' },
            { label: '18 holes', value: '18' },
          ],
        },
      ],
    },
    { name: 'preferredTimeRange', type: 'text' },
    {
      type: 'row',
      fields: [
        { name: 'caddyRequired', type: 'checkbox', defaultValue: false },
        { name: 'buggyRequired', type: 'checkbox', defaultValue: false },
        { name: 'rentalClubsRequired', type: 'checkbox', defaultValue: false },
      ],
    },
    ...contactFields,
    { name: 'homeClub', type: 'text' },
    { name: 'handicap', type: 'text' },
    { name: 'affiliationDetails', type: 'textarea' },
    { name: 'memberHost', type: 'text', admin: { description: 'Required for member guests.' } },
    { name: 'notes', type: 'textarea' },
    enquiryStatusField,
  ],
}

export const RoomEnquiries: CollectionConfig = {
  slug: 'room-enquiries',
  labels: { singular: 'Room Enquiry', plural: 'Room Enquiries' },
  hooks: { afterChange: [notifyOnEnquiry('room enquiry')] },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'checkInDate', 'checkOutDate', 'enquiryStatus'],
    group: 'Enquiries',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'checkInDate', type: 'date', required: true },
        { name: 'checkOutDate', type: 'date', required: true },
        { name: 'numberOfRooms', type: 'number', required: true, min: 1 },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'adults', type: 'number', required: true, min: 1 },
        { name: 'children', type: 'number', defaultValue: 0 },
      ],
    },
    { name: 'guestCategory', type: 'select', required: true, options: playerCategoryOptions },
    {
      type: 'row',
      fields: [
        { name: 'golfRequired', type: 'checkbox', defaultValue: false },
        { name: 'diningRequired', type: 'checkbox', defaultValue: false },
      ],
    },
    ...contactFields,
    { name: 'notes', type: 'textarea' },
    enquiryStatusField,
  ],
}

export const DiningEnquiries: CollectionConfig = {
  slug: 'dining-enquiries',
  labels: { singular: 'Dining Enquiry', plural: 'Dining Enquiries' },
  hooks: { afterChange: [notifyOnEnquiry('dining enquiry')] },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'diningDate', 'partySize', 'enquiryStatus'],
    group: 'Enquiries',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'diningDate', type: 'date', required: true },
        { name: 'preferredTime', type: 'text', required: true },
        { name: 'partySize', type: 'number', required: true, min: 1 },
      ],
    },
    { name: 'guestCategory', type: 'select', required: true, options: playerCategoryOptions },
    ...contactFields,
    { name: 'dietaryNotes', type: 'textarea' },
    { name: 'notes', type: 'textarea' },
    enquiryStatusField,
  ],
}

export const TournamentRegistrations: CollectionConfig = {
  slug: 'tournament-registrations',
  labels: { singular: 'Tournament Registration', plural: 'Tournament Registrations' },
  hooks: { afterChange: [notifyOnEnquiry('tournament registration')] },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'tournament', 'handicap', 'enquiryStatus'],
    group: 'Enquiries',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'tournament',
      type: 'relationship',
      relationTo: 'tournaments',
      required: true,
      admin: { description: 'Registrations are accepted only while a tournament is in "Registration Open".' },
    },
    ...contactFields,
    { name: 'homeClub', type: 'text' },
    { name: 'handicap', type: 'text', required: true },
    { name: 'affiliationDetails', type: 'textarea' },
    { name: 'notes', type: 'textarea' },
    enquiryStatusField,
  ],
}

export const MembershipEnquiries: CollectionConfig = {
  slug: 'membership-enquiries',
  labels: { singular: 'Membership Enquiry', plural: 'Membership Enquiries' },
  hooks: { afterChange: [notifyOnEnquiry('membership enquiry')] },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'createdAt', 'enquiryStatus'],
    group: 'Enquiries',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    ...contactFields,
    { name: 'city', type: 'text' },
    { name: 'homeClub', type: 'text' },
    { name: 'handicap', type: 'text' },
    { name: 'message', type: 'textarea' },
    enquiryStatusField,
  ],
}
