import type { Metadata } from 'next'

import { ButtonLink, Eyebrow, Heading, Lead, PageHero, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Practice Facilities',
  description: 'Practice facilities at Mercara Downs Golf Club.',
}

export default function PracticeFacilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Golf · Practice"
        title="Before the first tee"
        lead="Warm up properly — the opening holes on the Downs punish a cold start."
      />
      <Section>
        <Eyebrow>Practice</Eyebrow>
        <Heading>Practice facilities</Heading>
        <Lead>
          The club&rsquo;s current practice facilities — nets, putting and chipping areas and any
          range arrangements — are being confirmed and will be described here, along with opening
          hours and ball charges. The practice-area status for today is always shown on the
          course-conditions board.
        </Lead>
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href="/golf/course-conditions" variant="secondary">
            Course Conditions
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Ask the Golf Office
          </ButtonLink>
        </div>
      </Section>
    </>
  )
}
