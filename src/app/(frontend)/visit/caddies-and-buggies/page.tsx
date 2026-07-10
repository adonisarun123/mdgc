import type { Metadata } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { ButtonLink, Eyebrow, Heading, Lead, PageHero, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Caddies, Buggies & Equipment Rental',
  description:
    'Caddies, buggies and rental clubs at Mercara Downs Golf Club — availability and charges.',
}

export const revalidate = 300

export default async function CaddiesAndBuggiesPage() {
  const payload = await getPayloadClient()
  const now = new Date().toISOString()
  const tariffs = await payload.find({
    collection: 'tariffs',
    where: {
      and: [
        { 'verification.status': { equals: 'verified' } },
        { reviewDate: { greater_than: now } },
        { category: { in: ['caddy', 'buggy', 'rental'] } },
      ],
    },
    limit: 50,
    depth: 0,
  })

  return (
    <>
      <PageHero
        eyebrow="Visit · Caddies & Buggies"
        title="Caddies, buggies and rental clubs"
        lead="A good caddy is worth strokes on a hill course you have never seen — most first-time visitors take one."
      />
      <Section>
        <Eyebrow>On the Course</Eyebrow>
        <Heading>What to arrange</Heading>
        <div className="mt-6 max-w-2xl space-y-4 leading-7 text-downs-800">
          <p>
            Caddies know where the blind landing areas are, which greens fall away, and how the
            mist changes club selection — on holes like Blinder and Un Macho that knowledge is
            the difference between attacking and guessing. Buggy and rental-club availability
            varies with the season and the day&rsquo;s bookings.
          </p>
          <p>
            Request caddies, buggies or rental sets when you send your tee-time request and the
            golf office will confirm availability alongside your round. Same-day requests are met
            when possible but cannot be promised.
          </p>
        </div>

        <div className="mt-12">
          <Eyebrow>Charges</Eyebrow>
          <Heading as="h3">Current rates</Heading>
          {tariffs.docs.length > 0 ? (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-downs-800 text-left text-xs uppercase tracking-wider text-mist-600">
                    <th scope="col" className="py-2 pr-4">Item</th>
                    <th scope="col" className="py-2 pr-4">Rate</th>
                    <th scope="col" className="py-2">Taxes</th>
                  </tr>
                </thead>
                <tbody>
                  {tariffs.docs.map((t) => (
                    <tr key={t.id} className="border-b border-downs-100">
                      <td className="py-3 pr-4 font-medium text-downs-900">{t.label}</td>
                      <td className="py-3 pr-4">
                        ₹{t.amount.toLocaleString('en-IN')}
                        {t.unit ? ` ${t.unit}` : ''}
                      </td>
                      <td className="py-3 text-mist-600">{t.taxNote}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Lead>
              Caddy, buggy and rental charges are being confirmed with the club and will be
              published here with their effective date. The golf office will quote current rates
              when confirming your round.
            </Lead>
          )}
        </div>

        <p className="mt-10">
          <ButtonLink href="/visit/plan-your-round">Request a Tee Time</ButtonLink>
        </p>
      </Section>
    </>
  )
}
