/**
 * Second content wave: committee (as published on the legacy homepage),
 * affiliated clubs (from the legacy reciprocal-fee table and history page),
 * and the site-launch announcement. Run once:  npx payload run src/seed2.ts
 */
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config: await config })

const existing = await payload.find({ collection: 'committee-members', limit: 1 })
if (existing.totalDocs > 0) {
  payload.logger.info('Seed2 skipped — committee already exists.')
  process.exit(0)
}

payload.logger.info('Seeding committee (as published on legacy site — term unconfirmed)…')
const COMMITTEE = [
  { name: 'Mr. Muthana Cariappa', designation: 'Captain' },
  { name: 'Mr. M.A. Poonacha (Devi Poonacha)', designation: 'Hon. Secretary' },
  { name: 'Mr. P.K. Bopanna (Rally Bopanna)', designation: 'Hon. Treasurer' },
  { name: 'K.M. Bopanna', designation: 'Committee Member' },
  { name: 'K.A. Chengappa', designation: 'Committee Member' },
  { name: 'C.S. Dhananjaya', designation: 'Committee Member' },
  { name: 'D.G. Kishor', designation: 'Committee Member' },
  { name: 'M.P. Nagaraj', designation: 'Committee Member' },
  { name: 'Roy Chengappa', designation: 'Committee Member' },
]
let order = 0
for (const m of COMMITTEE) {
  await payload.create({
    collection: 'committee-members',
    data: { ...m, memberStatus: 'active', publicContact: false, displayOrder: order++ },
  })
}

payload.logger.info('Seeding affiliated clubs (as published — reciprocal terms unverified)…')
const CLUBS: { clubName: string; city?: string; state?: string; country?: string; notes?: string }[] = [
  { clubName: 'Coorg Golf Links', city: 'Virajpet', state: 'Karnataka', notes: 'Legacy table: green fee free for MDGC members. Verify.' },
  { clubName: 'Jayachamaraja Wadiyar Golf Club (JWGC)', city: 'Mysuru', state: 'Karnataka', notes: 'Legacy table: free. Verify.' },
  { clubName: 'Pilikula Golf Club', city: 'Mangaluru', state: 'Karnataka', notes: 'Legacy table: free. Verify.' },
  { clubName: 'Training Command Sports Complex (TCSC)', city: 'Bengaluru', state: 'Karnataka', notes: 'Legacy table: free. Verify.' },
  { clubName: 'Army Golf Club', city: 'Srinagar', state: 'Jammu & Kashmir', notes: 'Legacy table: ₹400 + GST. Verify.' },
  { clubName: 'Bombay Presidency Golf Club', city: 'Mumbai', state: 'Maharashtra', notes: 'Legacy table: ₹2000 weekday / ₹3000 weekend + GST. Verify.' },
  { clubName: 'AEPTA (Army Environmental Park & Training Area)', city: 'Bengaluru', state: 'Karnataka', notes: 'Legacy table: ₹100 + GST. Verify.' },
  { clubName: 'Belur Club', city: 'Somwarpet', state: 'Karnataka', notes: 'Legacy table: ₹100 + GST. Verify.' },
  { clubName: 'Bangalore Golf Club', city: 'Bengaluru', state: 'Karnataka', notes: 'Legacy table: ₹500 + GST. Verify.' },
  { clubName: 'Belgaum Golf Association', city: 'Belagavi', state: 'Karnataka', notes: 'Legacy table: ₹400 + GST. Verify.' },
  { clubName: 'Coimbatore Golf Club', city: 'Coimbatore', state: 'Tamil Nadu', notes: 'Legacy table: ₹1350 weekday / ₹1700 weekend + GST. Verify.' },
  { clubName: 'CIAL Golf Club', city: 'Kochi', state: 'Kerala', notes: 'Legacy table: ₹250 weekday / ₹500 weekend + GST. Verify.' },
  { clubName: 'Nuwara Eliya Golf Club', city: 'Nuwara Eliya', country: 'Sri Lanka', notes: 'Named on legacy history page as an overseas affiliation.' },
  { clubName: 'Noosa Springs Golf Resort', city: 'Noosa', country: 'Australia', notes: 'Named on legacy history page as an overseas affiliation.' },
]
for (const c of CLUBS) {
  await payload.create({
    collection: 'affiliated-clubs',
    data: {
      ...c,
      country: c.country ?? 'India',
      verification: {
        status: 'pending',
        notes: c.notes ?? 'From legacy site; club to re-confirm affiliation.',
      },
    },
  })
}

payload.logger.info('Seeding launch announcement…')
const paragraph = (text: string) => ({
  type: 'paragraph',
  version: 1,
  format: '' as const,
  indent: 0,
  direction: 'ltr' as const,
  children: [{ type: 'text', version: 1, text, format: 0, style: '', mode: 'normal', detail: 0 }],
})
await payload.create({
  collection: 'stories',
  data: {
    title: 'A new digital home for the Downs',
    slug: 'new-website-2026',
    category: 'announcement',
    publishedDate: new Date('2026-07-11').toISOString(),
    excerpt:
      'Mercara Downs Golf Club has a new website — the course hole by hole, tee-time requests, the Downs Retreat and the club’s story, all in one place.',
    body: {
      root: {
        type: 'root',
        version: 1,
        format: '' as const,
        indent: 0,
        direction: 'ltr' as const,
        children: [
          paragraph(
            'Welcome to the new home of Mercara Downs Golf Club on the web. The new site carries the course guide for all eighteen holes — from Fort Knox to Pressure — alongside the local rules, dress code, visitor information and the story of golf on the Downs since the late nineteenth century.',
          ),
          paragraph(
            'Visiting golfers can now request tee times online, enquire about rooms at the Downs Retreat, and reserve a table in the dining hall. Members of affiliated clubs will find their reciprocal arrangements listed under Membership.',
          ),
          paragraph(
            'The club is re-confirming course statistics, rates and records as part of this move — figures appear with their effective dates as they are approved. Suggestions and corrections are welcome at the club office.',
          ),
        ],
      },
    },
    _status: 'published',
  },
})

payload.logger.info('Seed2 complete.')
process.exit(0)
