import type { Metadata } from 'next'
import Link from 'next/link'

import { getPayloadClient } from '@/lib/payload'
import { TodayAtDowns } from '@/components/TodayAtDowns'
import { ButtonLink, Eyebrow, Heading, Lead, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Mercara Downs Golf Club | Golf in Madikeri, Coorg',
}

export const revalidate = 300

const PLAN_PATHS = [
  { label: 'MDGC Member', note: 'Book directly with Golf Operations or through the member desk.' },
  { label: 'Affiliated-Club Member', note: 'Reciprocal privileges apply — carry your home-club card.' },
  { label: 'Member Guest', note: 'Play alongside your host under member-guest rules.' },
  { label: 'Independent Visitor', note: 'Enquire about playing days and visitor arrangements.' },
  { label: 'Tournament Participant', note: 'Register through the tournament office for open events.' },
]

export default async function HomePage() {
  const payload = await getPayloadClient()

  const [courseStatus, courseInfo, holes, tournaments] = await Promise.all([
    payload.findGlobal({ slug: 'course-status' }),
    payload.findGlobal({ slug: 'course-info' }),
    payload.find({
      collection: 'course-holes',
      sort: 'holeNumber',
      limit: 18,
      depth: 0,
    }),
    payload.find({
      collection: 'tournaments',
      where: {
        status: { in: ['announced', 'registration-open', 'registration-closed', 'draw-published', 'in-progress'] },
      },
      sort: 'startDate',
      limit: 4,
      depth: 0,
    }),
  ])

  const infoVerified = courseInfo?.verification?.status === 'verified'
  const signatureNames = ['Fort Knox', 'Misty', 'Waterloo', 'Pressure']
  const signatureHoles = holes.docs.filter((h) => signatureNames.includes(h.officialName))

  return (
    <>
      {/* Hero */}
      <div className="relative bg-downs-950 text-mist-50">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(71,121,92,0.35),transparent_60%)]"
        />
        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 sm:px-6 lg:pb-32 lg:pt-28">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brass-300">
            Madikeri · Kodagu · 18 holes
          </p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
            Golf in the Mist
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-downs-100 sm:text-xl">
            Eighteen holes shaped by the hills, weather and sporting traditions of Coorg.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <ButtonLink href="/visit/plan-your-round">Plan Your Round</ButtonLink>
            <Link
              href="/golf/course-guide"
              className="rounded-sm border border-mist-100/40 px-5 py-3 text-sm font-medium text-mist-50 transition-colors hover:border-brass-300 hover:text-brass-300"
            >
              Explore the Course
            </Link>
          </div>
        </div>
      </div>

      {/* Today at Mercara Downs */}
      <div className="relative z-10 mx-auto -mt-10 max-w-7xl px-4 sm:px-6">
        <TodayAtDowns status={courseStatus} />
      </div>

      {/* Course introduction */}
      <Section>
        <Eyebrow>The Course</Eyebrow>
        <Heading>A hill course unlike any other in South India</Heading>
        <Lead>
          Laid out across the open downs above Madikeri, the course plays through mist, valley winds
          and mature tree lines. Golf has been played on the Mercara Downs since the late nineteenth
          century.
        </Lead>
        <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div>
            <dt className="text-sm text-mist-600">Holes</dt>
            <dd className="mt-1 font-serif text-3xl font-semibold text-downs-900">18</dd>
          </div>
          {infoVerified && courseInfo.coursePar ? (
            <div>
              <dt className="text-sm text-mist-600">Par</dt>
              <dd className="mt-1 font-serif text-3xl font-semibold text-downs-900">
                {courseInfo.coursePar}
              </dd>
            </div>
          ) : null}
          {infoVerified && courseInfo.mensYardage ? (
            <div>
              <dt className="text-sm text-mist-600">Length</dt>
              <dd className="mt-1 font-serif text-3xl font-semibold text-downs-900">
                {courseInfo.mensYardage.toLocaleString('en-IN')} yds
              </dd>
            </div>
          ) : null}
          {infoVerified && courseInfo.elevationMetres ? (
            <div>
              <dt className="text-sm text-mist-600">Elevation</dt>
              <dd className="mt-1 font-serif text-3xl font-semibold text-downs-900">
                {courseInfo.elevationMetres} m
              </dd>
            </div>
          ) : (
            <div>
              <dt className="text-sm text-mist-600">Setting</dt>
              <dd className="mt-1 font-serif text-3xl font-semibold text-downs-900">Coorg hills</dd>
            </div>
          )}
        </dl>
        <p className="mt-8">
          <ButtonLink href="/golf" variant="secondary">
            Course Overview
          </ButtonLink>
        </p>
      </Section>

      {/* Signature holes */}
      {signatureHoles.length > 0 ? (
        <Section tinted>
          <Eyebrow>Signature Holes</Eyebrow>
          <Heading>Four holes golfers talk about afterwards</Heading>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {signatureHoles.map((hole) => (
              <Link
                key={hole.id}
                href={`/golf/course-guide/${hole.holeNumber}`}
                className="group rounded-sm border border-downs-100 bg-white p-6 transition-shadow hover:shadow-md"
              >
                <p className="text-xs uppercase tracking-widest text-mist-600">
                  Hole {hole.holeNumber} · Par {hole.par}
                </p>
                <p className="mt-2 font-serif text-2xl font-semibold text-downs-900 group-hover:text-brass-600">
                  {hole.officialName}
                </p>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-mist-600">
                  {hole.overview}
                </p>
              </Link>
            ))}
          </div>
        </Section>
      ) : null}

      {/* Plan your round */}
      <Section>
        <Eyebrow>Plan Your Round</Eyebrow>
        <Heading>Who is playing?</Heading>
        <Lead>
          Playing arrangements differ by category. Choose yours and we will take you through the
          right process — a request is confirmed only once the club replies.
        </Lead>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PLAN_PATHS.map((path) => (
            <Link
              key={path.label}
              href="/visit/plan-your-round"
              className="group rounded-sm border border-downs-100 bg-white p-5 transition-shadow hover:shadow-md"
            >
              <p className="font-medium text-downs-900 group-hover:text-brass-600">{path.label}</p>
              <p className="mt-2 text-sm leading-relaxed text-mist-600">{path.note}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Heritage */}
      <div className="bg-downs-950 text-mist-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brass-300">Heritage</p>
          <h2 className="mt-2 max-w-3xl font-serif text-3xl font-semibold leading-tight sm:text-4xl">
            Golf has been played on the Mercara Downs since the late nineteenth century.
          </h2>
          <p className="mt-5 max-w-2xl leading-relaxed text-downs-200">
            From the clearing of the downs in the 1890s, through the North Coorg Club years, to an
            independent golf club — the course carries more than a century of play in the Coorg
            hills.
          </p>
          <p className="mt-8">
            <Link
              href="/club/heritage"
              className="rounded-sm border border-mist-100/40 px-5 py-3 text-sm font-medium text-mist-50 transition-colors hover:border-brass-300 hover:text-brass-300"
            >
              The MDGC Story
            </Link>
          </p>
        </div>
      </div>

      {/* Upcoming tournaments */}
      <Section>
        <Eyebrow>Tournaments</Eyebrow>
        <Heading>Upcoming at the Downs</Heading>
        {tournaments.docs.length > 0 ? (
          <ul className="mt-8 divide-y divide-downs-100 border-y border-downs-100">
            {tournaments.docs.map((t) => (
              <li key={t.id} className="flex flex-wrap items-baseline justify-between gap-2 py-4">
                <div>
                  <p className="font-medium text-downs-900">{t.name}</p>
                  {t.sponsor ? <p className="text-sm text-mist-600">Sponsored by {t.sponsor}</p> : null}
                </div>
                <p className="text-sm text-mist-600">
                  {t.startDate
                    ? new Date(t.startDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : 'Dates to be announced'}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <Lead>
            The next season&rsquo;s calendar is being finalised. Past tournaments are in the
            archive.
          </Lead>
        )}
        <p className="mt-8">
          <ButtonLink href="/tournaments" variant="secondary">
            Tournament Calendar
          </ButtonLink>
        </p>
      </Section>

      {/* Downs Retreat + Dining */}
      <Section tinted>
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-sm border border-downs-100 bg-white p-8">
            <Eyebrow>Stay</Eyebrow>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-downs-900">Downs Retreat</h2>
            <p className="mt-4 leading-relaxed text-mist-600">
              Rooms at the club overlooking the course and gardens — wake up beside the first tee.
              Availability is by enquiry, with priority for members and affiliated-club visitors.
            </p>
            <p className="mt-6">
              <ButtonLink href="/stay" variant="secondary">
                Rooms &amp; Rates
              </ButtonLink>
            </p>
          </div>
          <div className="rounded-sm border border-downs-100 bg-white p-8">
            <Eyebrow>Clubhouse</Eyebrow>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-downs-900">Bar &amp; Dining</h2>
            <p className="mt-4 leading-relaxed text-mist-600">
              Coorg home cooking and a well-kept bar after your round. Tables and food should be
              ordered at least an hour ahead — reserve through the dining desk.
            </p>
            <p className="mt-6">
              <ButtonLink href="/clubhouse/dining" variant="secondary">
                Dining &amp; Reservations
              </ButtonLink>
            </p>
          </div>
        </div>
      </Section>

      {/* Directions */}
      <Section>
        <Eyebrow>Getting Here</Eyebrow>
        <Heading>In the hills above Madikeri</Heading>
        <Lead>
          The club sits on the downs at the edge of Madikeri town, Kodagu district, Karnataka.
          Journey times vary with hill traffic — allow extra time in the monsoon.
        </Lead>
        <div className="mt-8 flex flex-wrap gap-4">
          <ButtonLink href="/visit/directions" variant="secondary">
            Directions &amp; Travel
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Contact the Club
          </ButtonLink>
        </div>
      </Section>
    </>
  )
}
