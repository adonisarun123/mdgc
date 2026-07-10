import type { Metadata } from 'next'
import Link from 'next/link'

import { getPayloadClient } from '@/lib/payload'
import { ButtonLink, Eyebrow, Heading, Lead, PageHero, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Mercara Downs Golf Course Guide',
  description:
    'An 18-hole hill course above Madikeri, Coorg — course overview, hole-by-hole guide, scorecard and local rules.',
}

export const revalidate = 300

const LINKS = [
  { label: 'Hole-by-Hole Guide', href: '/golf/course-guide', note: 'All eighteen holes, with strategy and hazards.' },
  { label: 'Scorecard', href: '/golf/scorecard', note: 'Pars, stroke indexes and tee distances at a glance.' },
  { label: 'Course Conditions', href: '/golf/course-conditions', note: 'Today’s course, caddy and buggy status.' },
  { label: 'Local Rules', href: '/golf/local-rules', note: 'The rules in force at Mercara Downs.' },
  { label: 'Rules & Etiquette', href: '/golf/rules-and-etiquette', note: 'Dress code, pace of play and clubhouse etiquette.' },
  { label: 'Coaching', href: '/golf/coaching', note: 'Lessons for beginners and improvers.' },
  { label: 'Practice Facilities', href: '/golf/practice-facilities', note: 'Warm up before the first tee.' },
  { label: 'Junior Golf', href: '/golf/junior-golf', note: 'The next generation on the Downs.' },
]

export default async function GolfPage() {
  const payload = await getPayloadClient()
  const courseInfo = await payload.findGlobal({ slug: 'course-info' })
  const verified = courseInfo?.verification?.status === 'verified'

  return (
    <>
      <PageHero
        eyebrow="Golf"
        title="The course on the Downs"
        lead="Eighteen holes across open downs and mature tree lines in the hills above Madikeri, played through mist, valley winds and Coorg weather."
      />
      <Section>
        <Eyebrow>Course Overview</Eyebrow>
        <Heading>Character over length</Heading>
        <Lead>
          Mercara Downs is a hill course: elevation changes, blind landing areas and small,
          quick greens decide scores here far more often than raw distance. Several holes play
          across valleys and water; club selection changes with the wind and the mist.
        </Lead>
        {verified ? (
          <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {courseInfo.coursePar ? (
              <div>
                <dt className="text-sm text-mist-600">Par</dt>
                <dd className="mt-1 font-serif text-3xl font-semibold text-downs-900">{courseInfo.coursePar}</dd>
              </div>
            ) : null}
            {courseInfo.mensYardage ? (
              <div>
                <dt className="text-sm text-mist-600">Men&rsquo;s yardage</dt>
                <dd className="mt-1 font-serif text-3xl font-semibold text-downs-900">
                  {courseInfo.mensYardage.toLocaleString('en-IN')}
                </dd>
              </div>
            ) : null}
            {courseInfo.womensYardage ? (
              <div>
                <dt className="text-sm text-mist-600">Women&rsquo;s yardage</dt>
                <dd className="mt-1 font-serif text-3xl font-semibold text-downs-900">
                  {courseInfo.womensYardage.toLocaleString('en-IN')}
                </dd>
              </div>
            ) : null}
            {courseInfo.elevationMetres ? (
              <div>
                <dt className="text-sm text-mist-600">Elevation</dt>
                <dd className="mt-1 font-serif text-3xl font-semibold text-downs-900">
                  {courseInfo.elevationMetres} m
                </dd>
              </div>
            ) : null}
          </dl>
        ) : (
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-mist-600">
            Full course statistics — yardages, ratings and the official scorecard — are being
            confirmed with the club and will appear here once approved.
          </p>
        )}
      </Section>
      <Section tinted>
        <div className="grid gap-4 sm:grid-cols-2">
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
