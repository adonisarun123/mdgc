import type { Metadata } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { Eyebrow, Heading, PageHero, Section } from '@/components/ui'
import { TodayAtDowns } from '@/components/TodayAtDowns'

export const metadata: Metadata = {
  title: 'Course Conditions',
  description:
    'Current course, caddy, buggy and practice-area status at Mercara Downs Golf Club, updated by the club.',
}

export const revalidate = 120

export default async function CourseConditionsPage() {
  const payload = await getPayloadClient()
  const status = await payload.findGlobal({ slug: 'course-status' })

  return (
    <>
      <PageHero
        eyebrow="Golf · Course Conditions"
        title="Conditions on the Downs"
        lead="Updated by the club through the day. Hill weather changes quickly — when in doubt before an early tee time, telephone reception."
      />
      <Section>
        <Eyebrow>Right Now</Eyebrow>
        <Heading>Today at Mercara Downs</Heading>
        <div className="mt-8">
          <TodayAtDowns status={status} />
        </div>
        <p className="mt-8 max-w-2xl text-sm leading-7 text-mist-600">
          During the monsoon the course may open with restrictions after heavy overnight rain;
          winter mornings can hold mist over the lower holes until mid-morning. Maintenance
          notices, temporary greens and cart-path rules are posted here and on the first-tee
          notice board.
        </p>
      </Section>
    </>
  )
}
