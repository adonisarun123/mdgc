import type { Metadata } from 'next'

import { PageHero, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Visitor FAQs',
  description:
    'Answers for visiting golfers — who may play at Mercara Downs, what it costs, what to wear and how to get here.',
}

const FAQS: { q: string; a: string }[] = [
  {
    q: 'Can I play at Mercara Downs as a visitor?',
    a: 'Yes, by arrangement. Members of affiliated clubs enjoy reciprocal privileges; guests of members play under member-guest arrangements; independent visitors are received by prior arrangement with the golf office. Send a tee-time request in advance rather than arriving unannounced.',
  },
  {
    q: 'How do I book a tee time?',
    a: 'Through the Plan Your Round request form or by telephoning the club. Requests are confirmed by the golf office — a submitted request is not a confirmed booking until the club replies.',
  },
  {
    q: 'What will it cost?',
    a: 'Green fees depend on your category — affiliated-club member, member guest or independent visitor. Current rates are quoted by the golf office when your round is confirmed, and published on the Green Fees page once verified with their effective date.',
  },
  {
    q: 'What documents should I carry?',
    a: 'Affiliated-club visitors should carry their home-club membership card and a handicap certificate. Photo identification is advisable for all visitors.',
  },
  {
    q: 'Are caddies and buggies available?',
    a: 'Caddies are a fixture of golf on the Downs and strongly recommended on a first visit. Caddy, buggy and rental-club availability is requested with your tee time; the day’s availability appears on the course-conditions board.',
  },
  {
    q: 'What should I wear?',
    a: 'Standard golf attire: collared shirt, tailored trousers or shorts, and golf or flat-soled sports shoes. The full dress code is on the Dress Code page; separate expectations apply in the clubhouse.',
  },
  {
    q: 'When is the best time of year to play?',
    a: 'The course plays through three characters: crisp winter mornings with mist on the lower holes, firm dry-season conditions into early summer, and the green monsoon months when weather interruptions are possible. Most visitors favour October to March.',
  },
  {
    q: 'Can I stay at the club?',
    a: 'The Downs Retreat offers rooms at the club with course and garden views, subject to availability and guest category. Send an availability enquiry from the Stay page.',
  },
  {
    q: 'How do I get to the club?',
    a: 'The club is at the edge of Madikeri town in Kodagu (Coorg), Karnataka. Kannur is the nearest airport, with Mysuru, Mangaluru and Bengaluru as alternatives — hill roads are slower than maps suggest, so allow extra time. See Directions for details.',
  },
  {
    q: 'Is the information on this site current?',
    a: 'Operational status is updated by club staff through the day, and every published rate carries its effective date. Anything the club has not yet verified is described in general terms rather than published as fact.',
  },
]

export default function FaqsPage() {
  return (
    <>
      <PageHero
        eyebrow="Visit · FAQs"
        title="Visitor questions, answered"
        lead="The things visiting golfers ask most, before they make the drive up to Madikeri."
      />
      <Section>
        <dl className="max-w-3xl divide-y divide-downs-100">
          {FAQS.map((faq) => (
            <div key={faq.q} className="py-6">
              <dt className="font-serif text-lg font-semibold text-downs-900">{faq.q}</dt>
              <dd className="mt-3 leading-7 text-downs-800">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  )
}
