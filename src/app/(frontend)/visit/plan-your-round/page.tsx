import type { Metadata } from 'next'

import { PageHero, Section } from '@/components/ui'
import { TeeTimeForm } from '@/components/forms/TeeTimeForm'

export const metadata: Metadata = {
  title: 'Plan Your Round — Request a Tee Time',
  description:
    'Request a tee time at Mercara Downs Golf Club — for members, affiliated-club visitors, member guests and independent visitors.',
}

export default function PlanYourRoundPage() {
  return (
    <>
      <PageHero
        eyebrow="Visit · Plan Your Round"
        title="Request a tee time"
        lead="Four short steps. Your request goes straight to the golf office, who will confirm availability — a request is not a confirmed booking until the club replies."
      />
      <Section>
        <div className="max-w-3xl">
          <TeeTimeForm />
        </div>
      </Section>
    </>
  )
}
