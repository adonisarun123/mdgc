import type { Metadata } from 'next'

import { Eyebrow, Heading, Lead, PageHero, Section } from '@/components/ui'
import { DiningEnquiryForm } from '@/components/forms/DiningEnquiryForm'

export const metadata: Metadata = {
  title: 'Bar & Dining',
  description:
    'Dining and the bar at Mercara Downs Golf Club — reservation policy, timings and table requests.',
}

export default function DiningPage() {
  return (
    <>
      <PageHero
        eyebrow="Clubhouse · Dining"
        title="Bar and dining"
        lead="Coorg home cooking after your round, and a bar with a view of the downs."
      />
      <Section>
        <Eyebrow>How It Works</Eyebrow>
        <Heading>Ordering ahead</Heading>
        <div className="mt-6 max-w-2xl space-y-4 leading-relaxed text-downs-800">
          <p>
            The kitchen prepares to order: food and tables must be requested at least one hour
            before your intended dining time. For larger parties or particular dishes, please give
            the team more notice.
          </p>
          <p>
            Opening hours, menus and dining eligibility for visitors are being confirmed with the
            club and will be published here. The dining team will confirm details when they reply
            to your request.
          </p>
        </div>
      </Section>
      <Section tinted>
        <Eyebrow>Reservations</Eyebrow>
        <Heading>Request a table</Heading>
        <div className="mt-8 max-w-3xl">
          <DiningEnquiryForm />
        </div>
      </Section>
    </>
  )
}
