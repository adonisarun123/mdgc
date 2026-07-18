import type { Metadata } from 'next'
import Image from 'next/image'

import { getPayloadClient } from '@/lib/payload'
import { IMAGES } from '@/lib/siteImages'
import { Eyebrow, Heading, Lead, PageHero, Section } from '@/components/ui'
import { StayAndPlayEnquiry } from '@/components/forms/StayAndPlayEnquiry'

export const metadata: Metadata = {
  title: 'Stay & Play Golf Packages in Coorg',
  description:
    'Stay-and-play packages at Mercara Downs Golf Club — rooms at the Downs Retreat, rounds on the 18-hole course in the Coorg hills, and Coorg home cooking, in one booking.',
}

export const revalidate = 300

const today = () => new Date().toISOString().slice(0, 10)

export default async function StayAndPlayPage() {
  const payload = await getPayloadClient()
  const packages = await payload.find({
    collection: 'packages',
    where: { published: { equals: true } },
    sort: 'displayOrder',
    limit: 12,
    depth: 0,
  })

  const t = today()

  return (
    <>
      <PageHero
        eyebrow="Stay · Stay & Play"
        title="Golf in the mist, sleep beside the first tee"
        lead="One booking for the whole trip — a room at the Downs Retreat, your rounds on the Mercara Downs, and Coorg cooking in the clubhouse."
      />

      <Section>
        <div className="relative aspect-[21/9] overflow-hidden rounded-sm">
          <Image
            src={IMAGES.roomDeluxe1.src}
            alt={IMAGES.roomDeluxe1.alt}
            fill
            priority
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="object-cover"
          />
        </div>
      </Section>

      <Section>
        <Eyebrow>Packages</Eyebrow>
        <Heading>Stay &amp; Play packages</Heading>
        {packages.docs.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packages.docs.map((pkg) => {
              const priceCurrent =
                pkg.verification?.status === 'verified' &&
                pkg.pricing?.price != null &&
                (!pkg.pricing?.reviewDate || String(pkg.pricing.reviewDate).slice(0, 10) >= t)
              const basis =
                pkg.pricing?.priceBasis === 'per-couple'
                  ? 'per couple'
                  : pkg.pricing?.priceBasis === 'per-room'
                    ? 'per room'
                    : 'per person'
              return (
                <div key={pkg.id} className="flex flex-col rounded-sm border border-downs-100 bg-white p-6">
                  <p className="font-serif text-xl font-semibold text-downs-900">{pkg.packageName}</p>
                  <p className="mt-1 text-sm text-mist-600">
                    {pkg.nights} night{pkg.nights === 1 ? '' : 's'} · {pkg.rounds} round
                    {pkg.rounds === 1 ? '' : 's'} of golf
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-downs-800">{pkg.summary}</p>
                  {(pkg.inclusions ?? []).length > 0 ? (
                    <ul className="mt-4 space-y-1.5 text-sm text-downs-800">
                      {(pkg.inclusions ?? []).map((inc) => (
                        <li key={inc.id ?? inc.inclusion} className="flex gap-2">
                          <span aria-hidden="true" className="text-brass-600">·</span>
                          {inc.inclusion}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <p className="mt-auto pt-5 text-sm font-medium text-downs-900">
                    {priceCurrent
                      ? `₹${pkg.pricing!.price!.toLocaleString('en-IN')} ${basis} ${pkg.pricing?.taxNote ?? 'plus applicable taxes'}`
                      : 'Price on request'}
                  </p>
                </div>
              )
            })}
          </div>
        ) : (
          <Lead>
            The club is finalising its first stay-and-play packages — room, golf and dining in one
            booking. Until they are published, tell us your dates and party below and the team
            will put a package together for you.
          </Lead>
        )}
      </Section>

      <Section tinted>
        <Eyebrow>How it works</Eyebrow>
        <Heading as="h3">Who can book</Heading>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {[
            {
              title: 'Visiting golfers',
              body: 'Independent visitors are welcome, subject to the club’s visitor terms. Bring your handicap details; the club will confirm playing arrangements with your booking.',
            },
            {
              title: 'Affiliated-club members',
              body: 'Members of affiliated clubs enjoy reciprocal privileges — mention your home club and membership number when you enquire.',
            },
            {
              title: 'MDGC members & guests',
              body: 'Members may book packages for themselves and their guests; member rates apply where published.',
            },
          ].map((c) => (
            <div key={c.title} className="rounded-sm border border-downs-100 bg-white p-6">
              <p className="font-serif text-lg font-semibold text-downs-900">{c.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-mist-600">{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <Eyebrow>Enquire</Eyebrow>
        <Heading as="h3">Plan your golf trip</Heading>
        <Lead>
          Tell us your dates, party and which package interests you — the team will reply with
          availability, rates and a plan for your rounds.
        </Lead>
        <div className="mt-10 max-w-3xl">
          <StayAndPlayEnquiry
            packageNames={packages.docs.map((p) => p.packageName)}
          />
        </div>
      </Section>
    </>
  )
}
