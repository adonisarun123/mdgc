import type { CollectionConfig } from 'payload'
import { verificationField } from '../fields/verification'

export const CourseHoles: CollectionConfig = {
  slug: 'course-holes',
  labels: { singular: 'Course Hole', plural: 'Course Holes' },
  admin: {
    useAsTitle: 'officialName',
    defaultColumns: ['holeNumber', 'officialName', 'par', 'strokeIndex', 'verification.status'],
    group: 'Golf',
  },
  access: { read: () => true },
  defaultSort: 'holeNumber',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'holeNumber',
          type: 'number',
          required: true,
          unique: true,
          min: 1,
          max: 18,
        },
        {
          name: 'officialName',
          type: 'text',
          required: true,
          admin: {
            description:
              'Confirm official spelling, capitalisation and apostrophes with the golf committee.',
          },
        },
        { name: 'par', type: 'number', required: true, min: 3, max: 6 },
        { name: 'strokeIndex', type: 'number', min: 1, max: 18 },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'mensDistance',
          type: 'number',
          admin: { description: 'Yards, from the men’s tees.' },
        },
        {
          name: 'womensDistance',
          type: 'number',
          admin: { description: 'Yards, from the women’s tees.' },
        },
        {
          name: 'elevationChange',
          type: 'number',
          admin: { description: 'Metres, tee to green. Negative = downhill.' },
        },
      ],
    },
    {
      name: 'additionalTees',
      type: 'array',
      fields: [
        { name: 'teeName', type: 'text', required: true },
        { name: 'distance', type: 'number', required: true },
      ],
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Story & Strategy',
          fields: [
            {
              name: 'overview',
              type: 'textarea',
              required: true,
              admin: {
                description:
                  'The hole’s story. Preserve the personality of the legacy description while keeping it accurate and readable.',
              },
            },
            { name: 'teeShotStrategy', type: 'textarea', required: true },
            { name: 'approachStrategy', type: 'textarea' },
            { name: 'greenStrategy', type: 'textarea' },
            { name: 'captainTip', type: 'textarea', label: 'Captain’s Tip' },
            { name: 'localRule', type: 'textarea' },
          ],
        },
        {
          label: 'Hazards',
          fields: [
            {
              name: 'hazards',
              type: 'array',
              fields: [
                {
                  name: 'hazardType',
                  type: 'select',
                  required: true,
                  options: [
                    { label: 'Bunker', value: 'bunker' },
                    { label: 'Water', value: 'water' },
                    { label: 'Out of bounds', value: 'out-of-bounds' },
                    { label: 'Trees', value: 'trees' },
                    { label: 'Rough', value: 'rough' },
                    { label: 'Slope / drop-off', value: 'slope' },
                    { label: 'Other', value: 'other' },
                  ],
                },
                { name: 'position', type: 'text' },
                { name: 'description', type: 'textarea' },
              ],
            },
          ],
        },
        {
          label: 'Media',
          fields: [
            { name: 'primaryImage', type: 'upload', relationTo: 'media' },
            { name: 'gallery', type: 'upload', relationTo: 'media', hasMany: true },
            { name: 'holeDiagram', type: 'upload', relationTo: 'media' },
            { name: 'aerialImage', type: 'upload', relationTo: 'media' },
            {
              name: 'accessibilityDescription',
              type: 'textarea',
              admin: {
                description:
                  'A plain-language description of the hole for screen-reader users.',
              },
            },
          ],
        },
      ],
    },
    verificationField,
  ],
}
