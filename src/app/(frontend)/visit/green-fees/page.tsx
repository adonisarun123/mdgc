import type { Metadata } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { ButtonLink, Eyebrow, Heading, Lead, PageHero, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Visitor Green Fees and Tee-Time Information',
  description:
    'Green fees, caddy and buggy charges, and visitor eligibility at Mercara Downs Golf Club.',
}

export const revalidate = 300

const CATEGORY_LABEL: Record<string, string> = {
  member: 'MDGC Member',
  affiliated: 'Affiliated-Club Member',
  'member-guest': 'Member Guest',
  visitor: 'Independent Visitor',
  tournament: 'Tournament Participant',
}

export default async function GreenFeesPage() {
  const payload = await getPayloadClient()
  const now = new Date().toISOString()

  // Only verified rates whose review date has not passed are published.
  const tariffs = await payload.find({
    collection: 'tariffs',
    where: {
      and: [
        { 'verification.status': { equals: 'verified' } },
        { reviewDate: { greater_than: now } },
        { category: { in: ['green-fee', 'caddy', 'buggy', 'rental', 'coaching'] } },
      ],
    },
    sort: 'category',
    limit: 100,
    depth: 0,
  })

  const lastUpdated = tariffs.docs
    .map((t) => t.effectiveDate)
    .filter(Boolean)
    .sort()
    .at(-1)

  return (
    <>
      <PageHero
        eyebrow="Visit · Green Fees"
        title="Green fees and playing charges"
        lead="Who may play at Mercara Downs, and the charges that apply."
      />
      <Section>
        <Eyebrow>Eligibility</Eyebrow>
        <Heading>Who may play</Heading>
        <div className="mt-6 max-w-2xl space-y-4 leading-relaxed text-downs-800">
          <p>
            Members of affiliated clubs enjoy reciprocal playing privileges — carry your home-club
            membership card and handicap certificate. Guests of MDGC members play under
            member-guest arrangements alongside their host.
          </p>
          <p>
            Independent visitors are received by prior arrangement with the golf office. Please
            request your round in advance so the club can confirm playing days and availability.
          </p>
        </div>

        <div className="mt-12">
          <Eyebrow>Charges</Eyebrow>
          <Heading>Current rates</Heading>
          {tariffs.docs.length > 0 ? (
            <>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-downs-800 text-left text-xs uppercase tracking-wider text-mist-600">
                      <th scope="col" className="py-2 pr-4">Item</th>
                      <th scope="col" className="py-2 pr-4">Applies to</th>
                      <th scope="col" className="py-2 pr-4">Rate</th>
                      <th scope="col" className="py-2">Taxes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tariffs.docs.map((t) => (
                      <tr key={t.id} className="border-b border-downs-100">
                        <td className="py-3 pr-4 font-medium text-downs-900">{t.label}</td>
                        <td className="py-3 pr-4 text-mist-600">
                          {(t.visitorCategory ?? []).map((c) => CATEGORY_LABEL[c] ?? c).join(', ') || '—'}
                        </td>
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
              {lastUpdated ? (
                <p className="mt-4 text-sm text-mist-600">
                  Rates last updated on{' '}
                  {new Date(lastUpdated).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                  .
                </p>
              ) : null}
            </>
          ) : (
            <Lead>
              Current green fees, caddy and buggy charges are being confirmed with the club and
              will be published here with their effective date. In the meantime, the golf office
              will quote the applicable rates when confirming your tee-time request.
            </Lead>
          )}
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <ButtonLink href="/visit/plan-your-round">Request a Tee Time</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Contact the Golf Office
          </ButtonLink>
        </div>
      </Section>
    </>
  )
}
