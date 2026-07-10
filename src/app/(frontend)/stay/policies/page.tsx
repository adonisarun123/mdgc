import type { Metadata } from 'next'

import { ButtonLink, Eyebrow, Heading, Lead, PageHero, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Stay Policies',
  description:
    'Downs Retreat policies — check-in and check-out, eligibility, cancellations and house rules.',
}

export default function StayPoliciesPage() {
  return (
    <>
      <PageHero
        eyebrow="Stay · Policies"
        title="Downs Retreat policies"
        lead="The house rules for staying at the club."
      />
      <Section>
        <Eyebrow>Policies</Eyebrow>
        <Heading>Before you book</Heading>
        <Lead>
          Check-in and check-out times, guest eligibility, child policies, cancellation terms and
          payment methods are being confirmed with the club and will be published here in full.
          Until then, the Downs Retreat team states the applicable terms in writing when they
          confirm your booking — please read that confirmation as the authoritative version.
        </Lead>
        <p className="mt-8">
          <ButtonLink href="/stay" variant="secondary">
            Availability Enquiry
          </ButtonLink>
        </p>
      </Section>
    </>
  )
}
