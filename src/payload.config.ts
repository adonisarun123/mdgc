import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { CourseHoles } from './collections/CourseHoles'
import { Tournaments } from './collections/Tournaments'
import { Rooms } from './collections/Rooms'
import { Contacts } from './collections/Contacts'
import { Tariffs } from './collections/Tariffs'
import { Newsletters } from './collections/Newsletters'
import { CommitteeMembers } from './collections/CommitteeMembers'
import { AffiliatedClubs } from './collections/AffiliatedClubs'
import { Stories } from './collections/Stories'
import { RoomBookings } from './collections/RoomBookings'
import { Packages } from './collections/Packages'
import {
  TeeTimeRequests,
  RoomEnquiries,
  DiningEnquiries,
  MembershipEnquiries,
  TournamentRegistrations,
  EventEnquiries,
} from './collections/Enquiries'
import { CourseStatus } from './globals/CourseStatus'
import { CourseInfo } from './globals/CourseInfo'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — MDGC Admin',
    },
  },
  collections: [
    CourseHoles,
    Tournaments,
    Rooms,
    RoomBookings,
    Packages,
    Tariffs,
    Contacts,
    AffiliatedClubs,
    CommitteeMembers,
    Newsletters,
    Stories,
    TeeTimeRequests,
    RoomEnquiries,
    DiningEnquiries,
    MembershipEnquiries,
    TournamentRegistrations,
    EventEnquiries,
    Media,
    Users,
  ],
  globals: [CourseStatus, CourseInfo, SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      ssl: (process.env.DATABASE_URL || process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL || '').includes('supabase.co') ? { rejectUnauthorized: false } : undefined,
      connectionString: process.env.DATABASE_URL || process.env.POSTGRES_URL_NON_POOLING || process.env.POSTGRES_URL || '',
    },
  }),
  sharp,
  /**
   * Transactional email — activates when SMTP_* env vars are set.
   * Without it Payload logs emails to the console; enquiry notifications
   * are silently skipped. Configure before launch.
   */
  ...(process.env.SMTP_HOST
    ? {
        email: nodemailerAdapter({
          defaultFromAddress: process.env.SMTP_FROM_ADDRESS || 'noreply@mdgc.golf',
          defaultFromName: process.env.SMTP_FROM_NAME || 'Mercara Downs Golf Club',
          transportOptions: {
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          },
        }),
      }
    : {}),
  plugins: [
    /**
     * Object storage for uploads — REQUIRED for serverless deploys
     * (Vercel's filesystem is ephemeral). Activates when S3_BUCKET is set;
     * works with Supabase Storage, R2 or S3 via the endpoint option.
     * Local development without S3_BUCKET falls back to disk.
     */
    ...(process.env.S3_BUCKET
      ? [
          s3Storage({
            collections: { media: true },
            bucket: process.env.S3_BUCKET,
            config: {
              region: process.env.S3_REGION || 'auto',
              ...(process.env.S3_ENDPOINT ? { endpoint: process.env.S3_ENDPOINT } : {}),
              forcePathStyle: Boolean(process.env.S3_ENDPOINT),
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
              },
            },
          }),
        ]
      : []),
  ],
})
