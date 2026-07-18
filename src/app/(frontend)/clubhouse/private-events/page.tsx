import type { Metadata } from 'next'
import Image from 'next/image'

import { IMAGES } from '@/lib/siteImages'
import { Eyebrow, Heading, Lead, PageHero, Section } from '@/components/ui'
import { EventEnquiryForm } from '@/components/forms/EventEnquiryForm'

export const metadata: Metadata = {
  title: 'Corporate Golf Days & Private Events',
  description:
    'Host a corporate golf day, offsite or private event at Mercara Downs Golf Club — 18 holes in the Coorg hills, clubhouse dining and rooms at the Downs Retreat.',
}

const FORMATS = [
  {
    title: 'Corporate golf day',
    body: 'A shotgun or drawn-start team event over 9 or 18 holes — scramble or stableford — with a welcome tea, caddies arranged by the club, and a prize ceremony and lunch in the clubhouse afterwards.',
  },
  {
    title: 'Meetings with golf',
    body: 'A morning of meetings, an afternoon on the course. The club can arrange dining and an introductory clinic on the practice area for colleagues who have never held a club — the format that turns non-golfers into converts.',
  },
  {
    title: 'Team offsite',
    body: 'Rooms at the Downs Retreat, meals in the clubhouse, golf and the hills of Coorg around you. For larger parties the club can suggest partner resorts nearby for overflow accommodation.',
  },
  {
    title: 'Private dinners & evenings',
    body: 'The dining room and bar can host private dinners, receptions and social evenings for members and their organisations — tell us what you have in mind and the club will advise what is possible.',
  },
]

export default function PrivateEventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Clubhouse · Private Events"
        title="Bring your team to the Downs"
        lead="Corporate golf days, meetings and private evenings at one of Coorg's most distinctive sporting addresses."
      />

      <Section>
        <div className="relative aspect-[21/9] overflow-hidden rounded-sm">
          <Image
            src={IMAGES.clubhouse.src}
            alt={IMAGES.clubhouse.alt}
            fill
            priority
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="object-cover"
          />
        </div>
      </Section>

      <Section>
        <Eyebrow>Formats</Eyebrow>
        <Heading>What the club can host</Heading>
        <Lead>
          Every event at Mercara Downs is arranged around the playing calendar, so member golf and
          your event both get the course at its best. Dates, field sizes and facilities are
          confirmed by the club for each enquiry.
        </Lead>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {FORMATS.map((f) => (
            <div key={f.title} className="rounded-sm border border-downs-100 bg-white p-6">
              <p className="font-serif text-xl font-semibold text-downs-900">{f.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-mist-600">{f.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-mist-600">
          Conference and event spaces at the clubhouse are being finalised — describe your
          requirement in the form and the club will tell you exactly what is available for your
          dates.
        </p>
      </Section>

      <Section tinted>
        <Eyebrow>Enquire</Eyebrow>
        <Heading as="h3">Plan your event</Heading>
        <Lead>
          Tell us the shape of your day — the club will reply with formats, availability and
          pricing for your party.
        </Lead>
        <div className="mt-10 max-w-3xl">
          <EventEnquiryForm />
        </div>
      </Section>
    </>
  )
}
