import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
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
import {
  TeeTimeRequests,
  RoomEnquiries,
  DiningEnquiries,
  MembershipEnquiries,
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
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [],
})
