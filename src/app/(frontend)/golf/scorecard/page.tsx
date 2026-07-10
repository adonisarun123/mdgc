import type { Metadata } from 'next'
import Link from 'next/link'

import { getPayloadClient } from '@/lib/payload'
import { Lead, PageHero, Section } from '@/components/ui'
import { PrintButton } from '@/components/PrintButton'

export const metadata: Metadata = {
  title: 'Scorecard',
  description: 'The Mercara Downs Golf Club scorecard — pars, stroke indexes and tee distances.',
}

export const revalidate = 300

export default async function ScorecardPage() {
  const payload = await getPayloadClient()
  const [holes, courseInfo] = await Promise.all([
    payload.find({ collection: 'course-holes', sort: 'holeNumber', limit: 18, depth: 0 }),
    payload.findGlobal({ slug: 'course-info' }),
  ])

  const verified = courseInfo?.verification?.status === 'verified'
  const front = holes.docs.filter((h) => h.holeNumber <= 9)
  const back = holes.docs.filter((h) => h.holeNumber > 9)

  const sum = (arr: typeof holes.docs, key: 'par' | 'mensDistance' | 'womensDistance') =>
    arr.reduce((acc, h) => acc + (typeof h[key] === 'number' ? (h[key] as number) : 0), 0)

  const Table = ({ label, rows }: { label: string; rows: typeof holes.docs }) => (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-sm">
        <caption className="pb-3 text-left font-serif text-xl font-semibold text-downs-900">
          {label}
        </caption>
        <thead>
          <tr className="border-b border-downs-800 text-left text-xs uppercase tracking-wider text-mist-600">
            <th scope="col" className="py-2 pr-4">Hole</th>
            <th scope="col" className="py-2 pr-4">Name</th>
            <th scope="col" className="py-2 pr-4">Par</th>
            <th scope="col" className="py-2 pr-4">S.I.</th>
            <th scope="col" className="py-2 pr-4">Men (yds)</th>
            <th scope="col" className="py-2">Women (yds)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((h) => (
            <tr key={h.id} className="border-b border-downs-100">
              <td className="py-2.5 pr-4 font-medium text-downs-900">{h.holeNumber}</td>
              <td className="py-2.5 pr-4">
                <Link
                  href={`/golf/course-guide/${h.holeNumber}`}
                  className="text-downs-800 underline-offset-4 hover:text-brass-600 hover:underline"
                >
                  {h.officialName}
                </Link>
              </td>
              <td className="py-2.5 pr-4">{h.par}</td>
              <td className="py-2.5 pr-4">{h.strokeIndex ?? '—'}</td>
              <td className="py-2.5 pr-4">{h.mensDistance ?? '—'}</td>
              <td className="py-2.5">{h.womensDistance ?? '—'}</td>
            </tr>
          ))}
          <tr className="font-medium text-downs-900">
            <td className="py-2.5 pr-4" colSpan={2}>Out</td>
            <td className="py-2.5 pr-4">{sum(rows, 'par') || '—'}</td>
            <td className="py-2.5 pr-4" />
            <td className="py-2.5 pr-4">{sum(rows, 'mensDistance') || '—'}</td>
            <td className="py-2.5">{sum(rows, 'womensDistance') || '—'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )

  return (
    <>
      <PageHero
        eyebrow="Golf · Scorecard"
        title="Scorecard"
        lead="Pars, stroke indexes and tee distances for all eighteen holes."
      />
      <Section>
        {!verified ? (
          <p className="mb-10 max-w-2xl rounded-sm border border-brass-300 bg-brass-300/10 p-4 text-sm leading-relaxed text-downs-800">
            The official scorecard is being confirmed with the club. Figures shown here are drawn
            from club materials and may change once the committee signs off the final card.
          </p>
        ) : null}
        {holes.docs.length === 0 ? (
          <Lead>The scorecard will appear here once course data is published.</Lead>
        ) : (
          <>
            <div className="mb-8 flex justify-end">
              <PrintButton label="Print scorecard" />
            </div>
            <div className="grid gap-12 lg:grid-cols-2">
              <Table label="Front nine" rows={front} />
              <Table label="Back nine" rows={back} />
            </div>
          </>
        )}
      </Section>
    </>
  )
}
