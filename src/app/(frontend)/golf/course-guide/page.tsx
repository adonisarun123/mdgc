import type { Metadata } from 'next'
import Link from 'next/link'

import { getPayloadClient } from '@/lib/payload'
import { Eyebrow, Heading, Lead, PageHero, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Hole-by-Hole Course Guide',
  description:
    'Explore all eighteen holes of Mercara Downs Golf Club — from Fort Knox to Pressure — with strategy notes and hazards.',
}

export const revalidate = 300

export default async function CourseGuidePage() {
  const payload = await getPayloadClient()
  const holes = await payload.find({
    collection: 'course-holes',
    sort: 'holeNumber',
    limit: 18,
    depth: 0,
  })

  return (
    <>
      <PageHero
        eyebrow="Golf · Course Guide"
        title="Eighteen holes, eighteen stories"
        lead="Every hole on the Downs has a name and a reputation. Choose a hole to read how it plays — or view the scorecard for the numbers alone."
      />
      <Section>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <div>
            <Eyebrow>Explore Mode</Eyebrow>
            <Heading>The course, hole by hole</Heading>
          </div>
          <Link
            href="/golf/scorecard"
            className="text-sm font-medium text-downs-800 underline underline-offset-4 hover:text-brass-600"
          >
            Scorecard mode →
          </Link>
        </div>

        {holes.docs.length === 0 ? (
          <Lead>The hole-by-hole guide is being prepared. Check back soon.</Lead>
        ) : (
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {holes.docs.map((hole) => (
              <li key={hole.id}>
                <Link
                  href={`/golf/course-guide/${hole.holeNumber}`}
                  className="group block h-full rounded-sm border border-downs-100 bg-white p-6 transition-shadow hover:shadow-md"
                >
                  <div className="flex items-baseline justify-between">
                    <p className="text-xs uppercase tracking-widest text-mist-600">
                      Hole {hole.holeNumber}
                    </p>
                    <p className="text-xs uppercase tracking-widest text-mist-600">Par {hole.par}</p>
                  </div>
                  <p className="mt-2 font-serif text-2xl font-semibold text-downs-900 group-hover:text-brass-600">
                    {hole.officialName}
                  </p>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-mist-600">
                    {hole.overview}
                  </p>
                </Link>
              </li>
            ))}
          </ol>
        )}
      </Section>
    </>
  )
}
