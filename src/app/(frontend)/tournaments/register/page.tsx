import type { Metadata } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { ButtonLink, Eyebrow, Heading, Lead, PageHero, Section } from '@/components/ui'
import { TournamentRegistrationForm } from '@/components/forms/TournamentRegistrationForm'

export const metadata: Metadata = {
  title: 'Tournament Registration',
  description: 'Register for upcoming tournaments at Mercara Downs Golf Club.',
}

export const revalidate = 300

export default async function TournamentRegisterPage() {
  const payload = await getPayloadClient()
  const open = await payload.find({
    collection: 'tournaments',
    where: { status: { equals: 'registration-open' } },
    sort: 'startDate',
    limit: 20,
    depth: 0,
  })

  return (
    <>
      <PageHero
        eyebrow="Tournaments · Registration"
        title="Enter a tournament"
        lead="Entry requests go to the tournament office, who confirm places, eligibility and entry fees."
      />
      <Section>
        {open.docs.length > 0 ? (
          <>
            <Eyebrow>Registration Open</Eyebrow>
            <Heading>Request your entry</Heading>
            <div className="mt-8 max-w-3xl">
              <TournamentRegistrationForm
                tournaments={open.docs.map((t) => ({ id: t.id, name: `${t.name} (${t.year})` }))}
              />
            </div>
          </>
        ) : (
          <>
            <Eyebrow>Registration</Eyebrow>
            <Heading>No tournaments are open for registration</Heading>
            <Lead>
              Registration opens as each event is announced — upcoming tournaments and the
              archive are on the tournaments page. Check back, or ask the tournament office to
              be notified when entries open.
            </Lead>
            <p className="mt-8">
              <ButtonLink href="/tournaments" variant="secondary">
                Tournament Calendar
              </ButtonLink>
            </p>
          </>
        )}
      </Section>
    </>
  )
}
