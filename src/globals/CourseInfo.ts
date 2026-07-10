import type { GlobalConfig } from 'payload'
import { verificationField } from '../fields/verification'

/**
 * Canonical course statistics. Every figure here appears on the public
 * site only when its verification status is "verified" — the legacy
 * website's coordinates, altitude and grass data are known to be
 * questionable and must not be republished unchecked.
 */
export const CourseInfo: GlobalConfig = {
  slug: 'course-info',
  label: 'Course Information',
  admin: { group: 'Golf' },
  access: { read: () => true },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'numberOfHoles', type: 'number', defaultValue: 18 },
        { name: 'coursePar', type: 'number' },
        { name: 'mensYardage', type: 'number' },
        { name: 'womensYardage', type: 'number' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'courseRating', type: 'number' },
        { name: 'slopeRating', type: 'number' },
        { name: 'totalAcreage', type: 'number' },
        { name: 'elevationMetres', type: 'number', admin: { description: 'Metres above sea level — publish only if verified.' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'latitude', type: 'number', admin: { description: 'Legacy site coordinates pointed to Bengaluru — do not reuse.' } },
        { name: 'longitude', type: 'number' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'greenGrass', type: 'text' },
        { name: 'fairwayGrass', type: 'text' },
        { name: 'roughGrass', type: 'text' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'numberOfBunkers', type: 'number' },
        { name: 'numberOfWaterHazards', type: 'number' },
        { name: 'courseRecord', type: 'text' },
      ],
    },
    {
      name: 'services',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'caddiesAvailable', type: 'checkbox', defaultValue: false },
            { name: 'buggiesAvailable', type: 'checkbox', defaultValue: false },
            { name: 'rentalClubsAvailable', type: 'checkbox', defaultValue: false },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'practiceFacilities', type: 'checkbox', defaultValue: false },
            { name: 'coachingAvailable', type: 'checkbox', defaultValue: false },
          ],
        },
      ],
    },
    { name: 'landscapeCharacter', type: 'textarea' },
    verificationField,
  ],
}
