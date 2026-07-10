import type { Metadata } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { Eyebrow, Heading, Lead, PageHero, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Affiliated-Club Visitor Information',
  description:
    'Clubs affiliated with Mercara Downs Golf Club, and what reciprocal privileges mean for visiting members.',
}

export const revalidate = 3600

export default async function AffiliatedClubsPage() {
  const payload = await getPayloadClient()
  const clubs = await payload.find({
    collection: 'affiliated-clubs',
    where: { 'verification.status': { equals: 'verified' } },
    sort: 'clubName',
    limit: 200,
    depth: 0,
  })

  return (
    <>
      <PageHero
        eyebrow="Membership · Affiliated Clubs"
        title="Affiliated clubs"
        lead="MDGC maintains reciprocal arrangements with clubs across India and partners abroad. Members of affiliated clubs are welcome on the Downs — carry your home-club card."
      />
      <Section>
        <Eyebrow>Reciprocal Privileges</Eyebrow>
        <Heading>Visiting from an affiliated club</Heading>
        <Lead>
          Present your home-club membership card and handicap certificate when you arrive.
          Reciprocal green-fee arrangements vary by club — the golf office will confirm the
          applicable rate when you request your tee time.
        </Lead>

        {clubs.docs.length > 0 ? (
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {clubs.docs.map((club) => (
              <li key={club.id} className="rounded-sm border border-downs-100 bg-white p-4">
                <p className="font-medium text-downs-900">{club.clubName}</p>
                <p className="text-sm text-mist-600">
                  {[club.city, club.state, club.country].filter(Boolean).join(', ')}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-10 max-w-2xl rounded-sm border border-brass-300 bg-brass-300/10 p-4 text-sm leading-relaxed text-downs-800">
            The full list of affiliated clubs is being confirmed with the club and will be
            published here. If your club holds a reciprocal arrangement with MDGC, the golf
            office will verify it when you enquire.
          </p>
        )}
      </Section>
    </>
  )
}
