import type { Metadata } from 'next'
import Image from 'next/image'

import { getPayloadClient } from '@/lib/payload'
import { IMAGES } from '@/lib/siteImages'
import { ButtonLink, Eyebrow, Heading, Lead, PageHero, Section } from '@/components/ui'
import { RoomEnquiryForm } from '@/components/forms/RoomEnquiryForm'
import { LodgingJsonLd } from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Stay at Downs Retreat',
  description:
    'Rooms at Mercara Downs Golf Club — the Downs Retreat offers course and garden views beside the first tee. Send an availability enquiry.',
}

export const revalidate = 300

export default async function StayPage() {
  const payload = await getPayloadClient()
  const rooms = await payload.find({
    collection: 'rooms',
    sort: 'displayOrder',
    limit: 20,
    depth: 0,
  })

  const verifiedRooms = rooms.docs.filter((r) => r.verification?.status === 'verified')

  return (
    <>
      <LodgingJsonLd />
      <PageHero
        eyebrow="Stay · Downs Retreat"
        title="Wake up beside the first tee"
        lead="The Downs Retreat offers rooms at the club with course and garden views — a short walk from the clubhouse, the bar and the morning mist."
      />

      <Section>
        <div className="flex flex-wrap gap-4">
          <ButtonLink href="/stay/book">Check availability &amp; book</ButtonLink>
          <ButtonLink href="/stay/stay-and-play" variant="secondary">
            Stay &amp; Play packages
          </ButtonLink>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {[IMAGES.roomDeluxe1, IMAGES.roomDeluxe2].map((img) => (
            <div key={img.src} className="relative aspect-[3/2] overflow-hidden rounded-sm">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 640px) 48vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs uppercase tracking-[0.18em] text-mist-600">
          Rooms at the Downs Retreat — club photography
        </p>
      </Section>

      <Section>
        <Eyebrow>Rooms</Eyebrow>
        <Heading>Room categories</Heading>
        {verifiedRooms.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {verifiedRooms.map((room) => (
              <div key={room.id} className="rounded-sm border border-downs-100 bg-white p-6">
                <p className="font-serif text-xl font-semibold text-downs-900">{room.roomName}</p>
                <p className="mt-1 text-sm text-mist-600">
                  Sleeps {room.capacity}
                  {room.view === 'course' ? ' · Course view' : room.view === 'garden' ? ' · Garden view' : ''}
                </p>
                {room.description ? (
                  <p className="mt-3 text-sm leading-relaxed text-downs-800">{room.description}</p>
                ) : null}
                {room.tariff?.currentTariff ? (
                  <p className="mt-4 text-sm font-medium text-downs-900">
                    ₹{room.tariff.currentTariff.toLocaleString('en-IN')} per night
                    {room.tariff.taxNote ? ` ${room.tariff.taxNote}` : ' plus applicable taxes'}
                  </p>
                ) : (
                  <p className="mt-4 text-sm text-mist-600">Rates on request</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <Lead>
            Room categories, amenities and current tariffs are being confirmed with the club and
            will be published here. The retreat has traditionally offered fully furnished double
            rooms overlooking the course and gardens — send an enquiry below and the team will
            reply with availability and rates.
          </Lead>
        )}
      </Section>

      <Section tinted>
        <Eyebrow>Availability</Eyebrow>
        <Heading>Send an availability enquiry</Heading>
        <Lead>
          Tell us your dates and party, and the Downs Retreat team will reply with availability,
          rates and anything to arrange for golf or dining. You can also telephone the club —
          numbers are on the contact page.
        </Lead>
        <div className="mt-10 max-w-3xl">
          <RoomEnquiryForm />
        </div>
        <p className="mt-8 text-sm text-mist-600">
          Check-in, cancellation and house rules:{' '}
          <a href="/stay/policies" className="underline underline-offset-4 hover:text-downs-900">
            Downs Retreat policies
          </a>
        </p>
      </Section>
    </>
  )
}
