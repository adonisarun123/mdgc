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
  // The list is published as it stood on the legacy site; individual
  // reciprocal FEES remain hidden until each is club-verified.
  const clubs = await payload.find({
    collection: 'affiliated-clubs',
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
          <>
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
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-mist-600">
              Listed as published by the club; affiliations and reciprocal rates are being
              re-confirmed. The legacy site also refers to sixty-five affiliated clubs across
              India — the full register is held at the club office. Rates are quoted by the golf
              office when your round is confirmed.
            </p>
          </>
        ) : (
          <p className="mt-10 max-w-2xl rounded-sm border border-brass-300 bg-brass-300/10 p-4 text-sm leading-relaxed text-downs-800">
            The full list of affiliated clubs is being confirmed with the club and will be
            published here. If your club holds a reciprocal arrangement with MDGC, the golf
            office will verify it when you enquire.
          </p>
        )}

        <div className="mt-14">
          <Eyebrow>Partner Resorts</Eyebrow>
          <Heading as="h3">Member privileges beyond the course</Heading>
          <ul className="mt-6 grid max-w-3xl gap-3 sm:grid-cols-3">
            <li className="rounded-sm border border-downs-100 bg-white p-4">
              <p className="font-medium text-downs-900">Taj</p>
              <p className="mt-1 text-sm text-mist-600">20% for MDGC members on food and beverages</p>
            </li>
            <li className="rounded-sm border border-downs-100 bg-white p-4">
              <p className="font-medium text-downs-900">Coorg Wilderness Resort</p>
              <p className="mt-1 text-sm text-mist-600">20% on food and beverage</p>
            </li>
            <li className="rounded-sm border border-downs-100 bg-white p-4">
              <p className="font-medium text-downs-900">Danta Resort</p>
              <p className="mt-1 text-sm text-mist-600">20% discount for members</p>
            </li>
          </ul>
          <p className="mt-4 max-w-2xl text-sm text-mist-600">
            Partner benefits as published by the club; terms are being re-confirmed — carry your
            membership card.
          </p>
        </div>
      </Section>
    </>
  )
}
