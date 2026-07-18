import type { Metadata } from 'next'

import { Eyebrow, Heading, Lead, PageHero, Section } from '@/components/ui'
import { AvailabilityChecker } from '@/components/forms/AvailabilityChecker'

export const metadata: Metadata = {
  title: 'Check Availability & Book — Downs Retreat',
  description:
    'Check room availability at the Downs Retreat, Mercara Downs Golf Club, and send a booking request for your dates. Open to visiting golfers and travellers.',
}

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Stay · Downs Retreat"
        title="Check availability & request a booking"
        lead="Choose your dates to see which rooms are free, then send a booking request — the Downs Retreat team confirms every booking personally."
      />

      <Section>
        <Eyebrow>Availability</Eyebrow>
        <Heading>Your dates</Heading>
        <Lead>
          Availability shown here comes from the club&rsquo;s own booking register, which covers
          bookings from every channel — online, telephone and email. A request is not a confirmed
          booking until the team replies.
        </Lead>
        <div className="mt-10">
          <AvailabilityChecker />
        </div>
      </Section>

      <Section tinted>
        <Eyebrow>Prefer to talk?</Eyebrow>
        <Heading as="h3">Telephone the club</Heading>
        <Lead>
          The Downs Retreat team is happy to take bookings and answer questions by phone — numbers
          are on the{' '}
          <a href="/contact" className="underline underline-offset-4 hover:text-downs-900">
            contact page
          </a>
          . Check-in, cancellation and house rules are in the{' '}
          <a href="/stay/policies" className="underline underline-offset-4 hover:text-downs-900">
            Downs Retreat policies
          </a>
          .
        </Lead>
      </Section>
    </>
  )
}
