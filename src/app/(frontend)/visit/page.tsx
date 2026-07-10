import type { Metadata } from 'next'
import Link from 'next/link'

import { ButtonLink, Eyebrow, Heading, Lead, PageHero, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Visitor Green Fees and Tee-Time Information',
  description:
    'Visitor information for Mercara Downs Golf Club — who may play, green fees, caddies and buggies, and how to request a tee time.',
}

const LINKS = [
  { label: 'Green Fees', href: '/visit/green-fees', note: 'Who may play and what it costs.' },
  { label: 'Plan Your Round', href: '/visit/plan-your-round', note: 'Request a tee time in four short steps.' },
  { label: 'Caddies & Buggies', href: '/visit/caddies-and-buggies', note: 'Caddies, buggies and rental clubs.' },
  { label: 'Dress Code', href: '/visit/dress-code', note: 'What to wear on the course.' },
  { label: 'Directions', href: '/visit/directions', note: 'Reaching the Downs by road and air.' },
  { label: 'FAQs', href: '/visit/faqs', note: 'Visitor questions, answered.' },
]

export default function VisitPage() {
  return (
    <>
      <PageHero
        eyebrow="Visit"
        title="Playing the Downs as a visitor"
        lead="Affiliated-club members, member guests and visiting golfers are welcome by arrangement. Here is everything you need before you travel."
      />
      <Section>
        <Eyebrow>Before You Come</Eyebrow>
        <Heading>Arrange your round in advance</Heading>
        <Lead>
          Tee times at Mercara Downs are arranged with the club rather than booked instantly online.
          Send a request with your dates and category, and the golf office will confirm availability,
          fees and any documents to carry — typically your home-club card and handicap certificate
          for affiliated visitors.
        </Lead>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group rounded-sm border border-downs-100 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <p className="font-serif text-xl font-semibold text-downs-900 group-hover:text-brass-600">
                {l.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-mist-600">{l.note}</p>
            </Link>
          ))}
        </div>
        <p className="mt-10">
          <ButtonLink href="/visit/plan-your-round">Plan Your Round</ButtonLink>
        </p>
      </Section>
    </>
  )
}
