import type { CollectionConfig } from 'payload'
import { verificationField } from '../fields/verification'

export const Rooms: CollectionConfig = {
  slug: 'rooms',
  labels: { singular: 'Room Category', plural: 'Room Categories' },
  admin: {
    useAsTitle: 'roomName',
    defaultColumns: ['roomName', 'capacity', 'currentTariff', 'verification.status'],
    group: 'Stay',
  },
  access: { read: () => true },
  fields: [
    { name: 'roomName', type: 'text', required: true },
    {
      name: 'totalUnits',
      type: 'number',
      required: true,
      defaultValue: 1,
      min: 0,
      admin: {
        description:
          'Number of physical rooms in this category. The availability checker subtracts bookings in the register from this figure — keep it accurate.',
      },
    },
    {
      type: 'row',
      fields: [
        { name: 'capacity', type: 'number', required: true },
        {
          name: 'bedType',
          type: 'select',
          options: [
            { label: 'Double', value: 'double' },
            { label: 'Twin', value: 'twin' },
            { label: 'Family', value: 'family' },
            { label: 'Suite', value: 'suite' },
          ],
        },
        {
          name: 'view',
          type: 'select',
          options: [
            { label: 'Course view', value: 'course' },
            { label: 'Garden view', value: 'garden' },
            { label: 'Other', value: 'other' },
          ],
        },
      ],
    },
    { name: 'description', type: 'textarea' },
    { name: 'amenities', type: 'array', fields: [{ name: 'amenity', type: 'text', required: true }] },
    { name: 'accessibilityInformation', type: 'textarea' },
    {
      type: 'row',
      fields: [
        { name: 'checkIn', type: 'text', admin: { description: 'e.g. 12:00 noon' } },
        { name: 'checkOut', type: 'text', admin: { description: 'e.g. 11:00 a.m.' } },
      ],
    },
    {
      name: 'tariff',
      type: 'group',
      fields: [
        { name: 'currentTariff', type: 'number', admin: { description: 'INR per night, excluding taxes.' } },
        { name: 'taxNote', type: 'text', admin: { description: 'e.g. plus 12% GST' } },
        {
          name: 'guestCategory',
          type: 'select',
          hasMany: true,
          options: [
            { label: 'MDGC Member', value: 'member' },
            { label: 'Affiliated-Club Member', value: 'affiliated' },
            { label: 'Member Guest', value: 'member-guest' },
            { label: 'Independent Visitor', value: 'visitor' },
          ],
        },
        { name: 'effectiveDate', type: 'date' },
        {
          name: 'reviewDate',
          type: 'date',
          admin: { description: 'Tariff is flagged on the site once this date passes.' },
        },
      ],
    },
    { name: 'gallery', type: 'upload', relationTo: 'media', hasMany: true },
    { name: 'policies', type: 'richText' },
    { name: 'displayOrder', type: 'number', defaultValue: 0 },
    verificationField,
  ],
}
