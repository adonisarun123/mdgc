import type { Metadata } from 'next'

import { ButtonLink, Eyebrow, Heading, Lead, PageHero, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Coaching',
  description: 'Golf coaching at Mercara Downs Golf Club — lessons for beginners and improvers.',
}

export default function CoachingPage() {
  return (
    <>
      <PageHero
        eyebrow="Golf · Coaching"
        title="Learn the game on the Downs"
        lead="A hill course is a demanding teacher — good coaching makes it a patient one."
      />
      <Section>
        <Eyebrow>Lessons</Eyebrow>
        <Heading>Coaching at the club</Heading>
        <Lead>
          Coaching availability, professionals and lesson fees are being confirmed with the club
          and will be published here. If you are visiting and would like an introduction to the
          course or a playing lesson, ask the golf office when arranging your round — they will
          connect you with what is currently offered.
        </Lead>
        <p className="mt-8">
          <ButtonLink href="/contact" variant="secondary">
            Ask the Golf Office
          </ButtonLink>
        </p>
      </Section>
    </>
  )
}
