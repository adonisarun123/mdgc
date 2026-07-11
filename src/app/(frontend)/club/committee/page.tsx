import type { Metadata } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { Eyebrow, Heading, Lead, PageHero, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Committee',
  description: 'The managing committee of Mercara Downs Golf Club.',
}

export const revalidate = 3600

export default async function CommitteePage() {
  const payload = await getPayloadClient()
  const committee = await payload.find({
    collection: 'committee-members',
    where: { memberStatus: { equals: 'active' } },
    sort: 'displayOrder',
    limit: 30,
    depth: 0,
  })

  return (
    <>
      <PageHero
        eyebrow="Club · Committee"
        title="The committee"
        lead="The elected members who run the club."
      />
      <Section>
        <Eyebrow>Current Committee</Eyebrow>
        <Heading>Office bearers and members</Heading>
        {committee.docs.length > 0 ? (
          <>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {committee.docs.map((m) => (
              <li key={m.id} className="rounded-sm border border-downs-100 bg-white p-6">
                <p className="font-serif text-lg font-semibold text-downs-900">{m.name}</p>
                <p className="mt-1 text-sm text-brass-600">{m.designation}</p>
                {m.biography ? (
                  <p className="mt-3 text-sm leading-relaxed text-mist-600">{m.biography}</p>
                ) : null}
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-mist-600">
            The committee as published by the club; the serving term is being re-confirmed as
            part of the website launch.
          </p>
          </>
        ) : (
          <Lead>
            The current committee list is being confirmed with the club and will be published here
            after the club verifies the serving term.
          </Lead>
        )}
      </Section>
    </>
  )
}
