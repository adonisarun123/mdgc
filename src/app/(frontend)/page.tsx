import type { Metadata } from 'next'
import Link from 'next/link'

import { getPayloadClient } from '@/lib/payload'
import { TodayAtDowns } from '@/components/TodayAtDowns'

export const metadata: Metadata = {
  title: 'Mercara Downs Golf Club | Golf in Madikeri, Coorg',
}

export const revalidate = 300

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'GolfCourse',
  name: 'Mercara Downs Golf Club',
  alternateName: 'MDGC',
  description:
    'An 18-hole golf course in the hills of Madikeri, Coorg. Golf has been played on the Mercara Downs since the late nineteenth century.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mdgc.golf',
  address: {
    '@type': 'PostalAddress',
    postOfficeBoxNumber: 'P B No. 79',
    addressLocality: 'Madikeri',
    addressRegion: 'Karnataka',
    postalCode: '571201',
    addressCountry: 'IN',
  },
}

/** Placeholder art — replaced by club photography at content migration. */
function MistArt({ variant, className = '' }: { variant: 'course' | 'dining' | 'stay'; className?: string }) {
  const layers: Record<string, string> = {
    course:
      'bg-[linear-gradient(160deg,rgba(9,20,14,0.35),rgba(14,31,22,0.15)),radial-gradient(ellipse_at_25%_75%,#47795c_0%,#274d37_55%,#14291d_100%)]',
    dining:
      'bg-[linear-gradient(160deg,rgba(20,15,8,0.4),rgba(30,22,10,0.2)),radial-gradient(ellipse_at_75%_30%,#8f7134_0%,#4a3a1c_55%,#1c150a_100%)]',
    stay: 'bg-[linear-gradient(160deg,rgba(10,16,20,0.4),rgba(14,24,28,0.2)),radial-gradient(ellipse_at_50%_75%,#3d5a63_0%,#22383e_55%,#0e181c_100%)]',
  }
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div aria-hidden="true" className={`absolute inset-0 ${layers[variant]}`} />
      <p className="absolute bottom-3 left-4 text-[10px] uppercase tracking-[0.2em] text-white/50">
        Club photography to come
      </p>
    </div>
  )
}

/** Alternating split section: image block with an overlapping content card. */
function SplitSection({
  variant,
  reversed = false,
  tinted = false,
  eyebrow,
  title,
  children,
  cta,
  href,
}: {
  variant: 'course' | 'dining' | 'stay'
  reversed?: boolean
  tinted?: boolean
  eyebrow: string
  title: string
  children: React.ReactNode
  cta: string
  href: string
}) {
  return (
    <section className={tinted ? 'bg-downs-50' : 'bg-page'}>
      <div className="mx-auto grid max-w-7xl items-center gap-0 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:py-24">
        <MistArt
          variant={variant}
          className={`aspect-[4/3] lg:col-span-7 ${reversed ? 'lg:order-2 lg:col-start-6' : ''}`}
        />
        <div
          className={`relative z-10 -mt-10 bg-white p-8 shadow-lg sm:p-10 lg:col-span-5 lg:mt-0 ${
            reversed ? 'lg:order-1 lg:col-start-1 lg:-mr-16' : 'lg:-ml-16'
          }`}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brass-600">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-downs-900">
            {title}
          </h2>
          <div className="mt-4 text-[15px] leading-7 text-bodygray">{children}</div>
          <p className="mt-7">
            <Link href={href} className="link-rule text-downs-900 hover:text-brass-600">
              {cta}
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default async function HomePage() {
  const payload = await getPayloadClient()

  const [courseStatus, holes, upcoming] = await Promise.all([
    payload.findGlobal({ slug: 'course-status' }),
    payload.find({ collection: 'course-holes', sort: 'holeNumber', limit: 18, depth: 0 }),
    payload.find({
      collection: 'tournaments',
      where: {
        status: {
          in: ['announced', 'registration-open', 'registration-closed', 'draw-published', 'in-progress'],
        },
      },
      sort: 'startDate',
      limit: 3,
      depth: 0,
    }),
  ])

  const signatureNames = ['Fort Knox', 'Misty', 'Waterloo', 'Pressure']
  const signatureHoles = holes.docs.filter((h) => signatureNames.includes(h.officialName))
  const ribbonNames =
    holes.docs.length > 0
      ? holes.docs.map((h) => h.officialName)
      : ['Golf in the Mist', 'Madikeri', 'Coorg', 'Since the late nineteenth century']

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />

      {/* ============ HERO — asymmetric, status board integrated ============ */}
      <section className="relative overflow-hidden bg-downs-950 text-mist-50">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(71,121,92,0.45),transparent_55%),radial-gradient(ellipse_at_90%_90%,rgba(200,164,94,0.12),transparent_45%)]"
        />
        <div className="contour-bg absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-12 lg:pb-28 lg:pt-24">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brass-300">
              Mercara Downs Golf Club · Madikeri
            </p>
            <h1 className="mt-5 font-serif text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
              Golf in
              <br />
              the mist.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-downs-100">
              Eighteen holes shaped by the hills, weather and sporting traditions of Coorg — played
              here since the late nineteenth century.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <Link href="/visit/plan-your-round" className="btn-solid">
                Plan Your Round
              </Link>
              <Link href="/golf/course-guide" className="link-rule text-mist-50 hover:text-brass-300">
                Explore the Course
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <TodayAtDowns status={courseStatus} />
          </div>
        </div>
      </section>

      {/* ============ HOLE-NAMES RIBBON — the MDGC signature ============ */}
      <div className="hole-ribbon border-y border-brass-500/30 bg-downs-900 py-3.5 text-downs-100">
        <div aria-hidden="true">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center">
              {ribbonNames.map((name, i) => (
                <span key={`${copy}-${i}`} className="flex items-center whitespace-nowrap">
                  <span className="px-5 font-serif text-sm tracking-wide">{name}</span>
                  <span className="h-1 w-1 rounded-full bg-brass-400" />
                </span>
              ))}
            </div>
          ))}
        </div>
        <span className="sr-only">The eighteen holes of Mercara Downs: {ribbonNames.join(', ')}</span>
      </div>

      {/* ============ SPLIT SECTIONS ============ */}
      <SplitSection
        variant="course"
        eyebrow="The Course"
        title="A hill course that plays you back"
        cta="Course Overview"
        href="/golf"
      >
        <p>
          Elevation changes, blind landing areas and small, quick greens decide scores here far
          more often than raw distance. Several holes cross valleys and water, and club selection
          changes with the wind and the morning mist.
        </p>
        <dl className="mt-6 flex gap-10">
          <div>
            <dd className="font-serif text-3xl font-semibold text-downs-900">18</dd>
            <dt className="mt-1 text-[10px] uppercase tracking-[0.18em] text-bodygray">Holes</dt>
          </div>
          <div>
            <dd className="font-serif text-3xl font-semibold text-downs-900">1890s</dd>
            <dt className="mt-1 text-[10px] uppercase tracking-[0.18em] text-bodygray">Era of first play</dt>
          </div>
          <div>
            <dd className="font-serif text-3xl font-semibold text-downs-900">4</dd>
            <dt className="mt-1 text-[10px] uppercase tracking-[0.18em] text-bodygray">Signature holes</dt>
          </div>
        </dl>
      </SplitSection>

      {/* ============ SIGNATURE HOLES — numbered editorial ============ */}
      {signatureHoles.length > 0 ? (
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brass-600">
                  Signature Holes
                </p>
                <h2 className="mt-3 font-serif text-3xl font-semibold text-downs-900 sm:text-4xl">
                  Eighteen names, four legends
                </h2>
              </div>
              <Link href="/golf/course-guide" className="link-rule text-downs-900 hover:text-brass-600">
                All Eighteen
              </Link>
            </div>
            <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {signatureHoles.map((hole) => (
                <Link key={hole.id} href={`/golf/course-guide/${hole.holeNumber}`} className="group">
                  <p className="font-serif text-6xl font-semibold leading-none text-downs-100 transition-colors group-hover:text-brass-300">
                    {String(hole.holeNumber).padStart(2, '0')}
                  </p>
                  <p className="mt-4 border-t border-mist-200 pt-4 font-serif text-xl font-semibold text-downs-900 group-hover:text-brass-600">
                    {hole.officialName}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-bodygray">
                    Par {hole.par}
                  </p>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-bodygray">{hole.overview}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <SplitSection
        variant="dining"
        reversed
        tinted
        eyebrow="The Clubhouse"
        title="Coorg cooking and a well-kept bar"
        cta="Dining & Reservations"
        href="/clubhouse/dining"
      >
        <p>
          Rounds are settled and retold over Coorg home cooking. The kitchen prepares to order —
          food and tables are requested at least an hour ahead, so the dining desk knows you are
          coming before you putt out on Pressure.
        </p>
      </SplitSection>

      <SplitSection
        variant="stay"
        eyebrow="Downs Retreat"
        title="Wake up beside the first tee"
        cta="Rooms & Availability"
        href="/stay"
      >
        <p>
          Rooms at the club with course and garden views. Stay the night and take the first tee
          before the mist lifts — availability is by enquiry, with priority for members and
          affiliated-club visitors.
        </p>
      </SplitSection>

      {/* ============ TOURNAMENTS — dark band ============ */}
      <section className="bg-downs-950 text-mist-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brass-300">
                Tournaments
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
                Competition on the Downs
              </h2>
            </div>
            <Link href="/tournaments" className="link-rule text-mist-50 hover:text-brass-300">
              Calendar & Archive
            </Link>
          </div>
          {upcoming.docs.length > 0 ? (
            <ul className="mt-10 divide-y divide-downs-800 border-y border-downs-800">
              {upcoming.docs.map((t) => (
                <li key={t.id} className="flex flex-wrap items-baseline justify-between gap-3 py-5">
                  <div className="flex items-baseline gap-6">
                    <span className="font-serif text-lg text-brass-300">
                      {t.startDate
                        ? new Date(t.startDate).toLocaleDateString('en-IN', {
                            day: '2-digit',
                            month: 'short',
                          })
                        : 'TBA'}
                    </span>
                    <span className="font-serif text-xl font-semibold">{t.name}</span>
                  </div>
                  <Link
                    href="/tournaments/register"
                    className="text-[11px] uppercase tracking-[0.2em] text-downs-200 hover:text-brass-300"
                  >
                    Entry →
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-8 max-w-xl leading-relaxed text-downs-200">
              The new season&rsquo;s calendar is being finalised — the Mercara Downs Open, the
              Murugappa Cup and the member cups return with it. Past editions live in the archive.
            </p>
          )}
        </div>
      </section>

      {/* ============ HERITAGE ============ */}
      <section className="contour-bg bg-page">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:py-28">
          <p
            aria-hidden="true"
            className="font-serif text-8xl font-semibold leading-none text-brass-300 lg:col-span-2"
          >
            &ldquo;
          </p>
          <div className="lg:col-span-10">
            <p className="max-w-3xl font-serif text-3xl font-semibold leading-snug text-downs-900 sm:text-4xl">
              Golf has been played on the Mercara Downs since the late nineteenth century.
            </p>
            <p className="mt-6 max-w-2xl text-[15px] leading-7 text-bodygray">
              From the clearing of the downs, through the North Coorg Club years, to an independent
              club — more than a century of play is carried in this turf. The story, the timeline
              and the people are in the archive.
            </p>
            <div className="mt-8 flex flex-wrap gap-6">
              <Link href="/club/heritage" className="btn-solid">
                The MDGC Story
              </Link>
              <Link href="/membership" className="link-rule text-downs-900 hover:text-brass-600">
                Become a Member
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
