import type { Metadata } from 'next'
import Link from 'next/link'

import { ButtonLink, Eyebrow, Heading, Lead, PageHero, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Membership',
  description:
    'Membership at Mercara Downs Golf Club — categories, privileges, affiliated clubs and how to apply.',
}

export default function MembershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Membership"
        title="Belong to the Downs"
        lead="Membership brings the course, the clubhouse, the Downs Retreat and reciprocal privileges at affiliated clubs in India and abroad."
      />
      <Section>
        <Eyebrow>Overview</Eyebrow>
        <Heading>Categories and privileges</Heading>
        <Lead>
          Membership categories, fees and the application process are being confirmed with the
          club committee and will be published here in full. In the meantime, the membership
          office will be glad to answer enquiries directly.
        </Lead>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <Link
            href="/membership/affiliated-clubs"
            className="group rounded-sm border border-downs-100 bg-white p-6 transition-shadow hover:shadow-md"
          >
            <p className="font-serif text-xl font-semibold text-downs-900 group-hover:text-brass-600">
              Affiliated Clubs
            </p>
            <p className="mt-2 text-sm leading-relaxed text-mist-600">
              Reciprocal arrangements with clubs across India, plus partners in Sri Lanka and
              Australia.
            </p>
          </Link>
          <Link
            href="/membership/enquiry"
            className="group rounded-sm border border-downs-100 bg-white p-6 transition-shadow hover:shadow-md"
          >
            <p className="font-serif text-xl font-semibold text-downs-900 group-hover:text-brass-600">
              Membership Enquiry
            </p>
            <p className="mt-2 text-sm leading-relaxed text-mist-600">
              Tell us a little about yourself and the membership office will be in touch.
            </p>
          </Link>
        </div>
        <p className="mt-10">
          <ButtonLink href="/membership/enquiry">Enquire About Membership</ButtonLink>
        </p>
      </Section>
    </>
  )
}
