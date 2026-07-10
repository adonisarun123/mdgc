import type { Metadata } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { Eyebrow, Heading, Lead, PageHero, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Mercara Downs Golf Tournaments',
  description:
    'Upcoming tournaments and the tournament archive at Mercara Downs Golf Club — the Mercara Downs Open, Murugappa Cup and more.',
}

export const revalidate = 300

const UPCOMING_STATUSES = [
  'announced',
  'registration-open',
  'registration-closed',
  'draw-published',
  'in-progress',
]

const STATUS_LABEL: Record<string, string> = {
  announced: 'Announced',
  'registration-open': 'Registration open',
  'registration-closed': 'Registration closed',
  'draw-published': 'Draw published',
  'in-progress': 'In progress',
  'results-published': 'Results published',
  postponed: 'Postponed',
  cancelled: 'Cancelled',
  archived: 'Archived',
}

export default async function TournamentsPage() {
  const payload = await getPayloadClient()

  const [upcoming, past] = await Promise.all([
    payload.find({
      collection: 'tournaments',
      where: { status: { in: UPCOMING_STATUSES } },
      sort: 'startDate',
      limit: 20,
      depth: 0,
    }),
    payload.find({
      collection: 'tournaments',
      where: { status: { in: ['results-published', 'archived'] } },
      sort: '-year',
      limit: 100,
      depth: 0,
    }),
  ])

  return (
    <>
      <PageHero
        eyebrow="Tournaments"
        title="Competition on the Downs"
        lead="From the Mercara Downs Open to member cups played for over decades — the club's competitive calendar and its archive."
      />

      <Section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Upcoming</Eyebrow>
            <Heading>On the calendar</Heading>
          </div>
          <a
            href="/tournaments/register"
            className="text-sm font-medium text-downs-800 underline underline-offset-4 hover:text-brass-600"
          >
            Tournament registration →
          </a>
        </div>
        {upcoming.docs.length > 0 ? (
          <ul className="mt-8 space-y-4">
            {upcoming.docs.map((t) => (
              <li key={t.id} className="rounded-sm border border-downs-100 bg-white p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <p className="font-serif text-xl font-semibold text-downs-900">{t.name}</p>
                  <span className="rounded-sm bg-downs-50 px-2.5 py-1 text-xs font-medium text-downs-800">
                    {STATUS_LABEL[t.status]}
                  </span>
                </div>
                <p className="mt-2 text-sm text-mist-600">
                  {t.startDate
                    ? new Date(t.startDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : 'Dates to be announced'}
                  {t.sponsor ? ` · Sponsored by ${t.sponsor}` : ''}
                  {t.format ? ` · ${t.format}` : ''}
                </p>
                {t.eligibility ? (
                  <p className="mt-2 text-sm leading-relaxed text-downs-800">{t.eligibility}</p>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <Lead>
            The next season&rsquo;s tournament calendar is being finalised with the tournament
            office and will appear here as events are announced.
          </Lead>
        )}
      </Section>

      <Section tinted>
        <Eyebrow>Archive</Eyebrow>
        <Heading>Past tournaments</Heading>
        {past.docs.length > 0 ? (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-downs-800 text-left text-xs uppercase tracking-wider text-mist-600">
                  <th scope="col" className="py-2 pr-4">Year</th>
                  <th scope="col" className="py-2 pr-4">Tournament</th>
                  <th scope="col" className="py-2">Sponsor</th>
                </tr>
              </thead>
              <tbody>
                {past.docs.map((t) => (
                  <tr key={t.id} className="border-b border-downs-100">
                    <td className="py-3 pr-4 text-mist-600">{t.year}</td>
                    <td className="py-3 pr-4 font-medium text-downs-900">{t.name}</td>
                    <td className="py-3 text-mist-600">{t.sponsor ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Lead>The tournament archive is being assembled from club records.</Lead>
        )}
      </Section>
    </>
  )
}
