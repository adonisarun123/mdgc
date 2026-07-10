import type { Metadata } from 'next'
import Link from 'next/link'

import { getPayloadClient } from '@/lib/payload'
import { TodayAtDowns } from '@/components/TodayAtDowns'

export const metadata: Metadata = {
  title: 'Mercara Downs Golf Club | Golf in Madikeri, Coorg',
}

export const revalidate = 300

/**
 * Placeholder art for sections that will carry club photography.
 * Layered gradients evoke the misty downs; replaced by verified,
 * rights-cleared images from the media library at content migration.
 */
function MistBackdrop({ variant }: { variant: 'hero' | 'course' | 'dining' | 'stay' }) {
  const layers: Record<string, string> = {
    hero: 'bg-[linear-gradient(180deg,rgba(9,20,14,0.92),rgba(20,41,29,0.55)_45%,rgba(9,20,14,0.95)),radial-gradient(ellipse_at_50%_35%,#47795c_0%,#1c3a29_55%,#0e1f16_100%)]',
    course:
      'bg-[linear-gradient(180deg,rgba(9,20,14,0.75),rgba(14,31,22,0.65)),radial-gradient(ellipse_at_20%_80%,#356349_0%,#14291d_60%,#0e1f16_100%)]',
    dining:
      'bg-[linear-gradient(180deg,rgba(20,15,8,0.78),rgba(30,22,10,0.68)),radial-gradient(ellipse_at_80%_30%,#8f7134_0%,#3a2c14_55%,#171208_100%)]',
    stay: 'bg-[linear-gradient(180deg,rgba(10,16,20,0.78),rgba(14,24,28,0.68)),radial-gradient(ellipse_at_50%_80%,#3d5a63_0%,#1a2c31_55%,#0b1417_100%)]',
  }
  return <div aria-hidden="true" className={`absolute inset-0 ${layers[variant]}`} />
}

function OutlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="btn-outline text-white">
      {children}
    </Link>
  )
}

/** Full-viewport image panel with centered Cinzel headline — the reference's core pattern. */
function Panel({
  variant,
  eyebrow,
  title,
  cta,
  href,
}: {
  variant: 'course' | 'dining' | 'stay'
  eyebrow: string
  title: string
  cta: string
  href: string
}) {
  return (
    <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden">
      <MistBackdrop variant={variant} />
      <div className="relative px-4 text-center">
        <p className="font-serif text-lg tracking-[0.18em] text-white/85">{eyebrow}</p>
        <h2 className="mx-auto mt-5 max-w-4xl font-serif text-4xl font-semibold leading-snug tracking-[0.04em] text-white sm:text-5xl lg:text-[45px]">
          {title}
        </h2>
        <div className="mt-10">
          <OutlineLink href={href}>{cta}</OutlineLink>
        </div>
      </div>
    </section>
  )
}

const ARROW = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="inline-block">
    <path d="M2 12L12 2M12 2H4M12 2v8" stroke="currentColor" strokeWidth="1.4" />
  </svg>
)

/**
 * Structured data — conservative by design: no coordinates, ratings or
 * statistics that the club has not yet verified.
 */
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

export default async function HomePage() {
  const payload = await getPayloadClient()

  const [courseStatus, courseInfo, holes, upcoming] = await Promise.all([
    payload.findGlobal({ slug: 'course-status' }),
    payload.findGlobal({ slug: 'course-info' }),
    payload.find({ collection: 'course-holes', sort: 'holeNumber', limit: 18, depth: 0 }),
    payload.find({
      collection: 'tournaments',
      where: {
        status: {
          in: ['announced', 'registration-open', 'registration-closed', 'draw-published', 'in-progress'],
        },
      },
      sort: 'startDate',
      limit: 5,
      depth: 0,
    }),
  ])

  const infoVerified = courseInfo?.verification?.status === 'verified'
  const signatureNames = ['Fort Knox', 'Misty', 'Waterloo', 'Pressure']
  const signatureHoles = holes.docs.filter((h) => signatureNames.includes(h.officialName))
  const nextTournament = upcoming.docs[0] ?? null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      {/* ================= HERO ================= */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <MistBackdrop variant="hero" />
        <div className="relative px-4 pb-16 pt-40 text-center">
          <p className="font-serif text-base tracking-[0.22em] text-white/85 sm:text-lg">
            Mercara Downs Golf Club · Madikeri, Coorg
          </p>
          <h1 className="mx-auto mt-6 max-w-4xl font-serif text-4xl font-semibold leading-snug tracking-[0.05em] text-white sm:text-5xl lg:text-[52px]">
            Golf in the Mist, on the Downs of Coorg
          </h1>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
            <OutlineLink href="/visit/plan-your-round">Plan Your Round</OutlineLink>
            <OutlineLink href="/membership">Membership</OutlineLink>
          </div>
          <p className="mt-14">
            <Link
              href="/golf/course-guide"
              className="font-serif text-sm tracking-[0.2em] text-white/80 underline underline-offset-8 hover:text-brass-300"
            >
              Explore the Course
            </Link>
          </p>
        </div>
        {/* scroll cue */}
        <div aria-hidden="true" className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex h-12 w-7 items-start justify-center rounded-full border border-white/60 p-1.5">
            <div className="h-2.5 w-[3px] animate-bounce rounded-full bg-white/80" />
          </div>
        </div>
      </section>

      {/* ============ TODAY AT MERCARA DOWNS ============ */}
      <div className="relative z-10 mx-auto -mt-12 max-w-6xl px-4 sm:px-6">
        <TodayAtDowns status={courseStatus} />
      </div>

      {/* ============ FULL-BLEED PANELS ============ */}
      <div className="mt-16">
        <Panel
          variant="course"
          eyebrow="Golf at Mercara Downs"
          title="Eighteen Holes Shaped by the Hills of Coorg"
          cta="More Info"
          href="/golf"
        />
        <Panel
          variant="dining"
          eyebrow="The Clubhouse"
          title="Coorg Cooking and a Well-Kept Bar"
          cta="Book a Table"
          href="/clubhouse/dining"
        />
        <Panel
          variant="stay"
          eyebrow="Downs Retreat"
          title="Wake Up Beside the First Tee"
          cta="More Info"
          href="/stay"
        />
      </div>

      {/* ============ COURSE CONTENT SECTION ============ */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-24 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="heading-engraved font-serif text-3xl font-semibold uppercase leading-snug tracking-[0.06em] text-charcoal sm:text-[34px]">
              A Course Shaped
              <br />
              by the Downs
            </h2>
            <p className="mt-7 font-serif text-xl tracking-[0.08em] text-charcoal">
              Mercara Downs Golf Club
            </p>
            <hr className="mt-6 border-mist-200" />
            <p className="mt-6 text-justify text-[15px] leading-7 text-bodygray">
              Mercara Downs is an 18-hole hill course laid across the open downs above Madikeri.
              Elevation changes, blind landing areas and small, quick greens decide scores here far
              more often than raw distance — several holes play across valleys and water, and club
              selection changes with the wind and the morning mist. Golf has been played on these
              downs since the late nineteenth century.
            </p>

            <dl className="mt-10 grid grid-cols-3 gap-6">
              <div>
                <dt className="sr-only">Holes</dt>
                <dd>
                  <span className="font-serif text-4xl font-semibold text-charcoal">18</span>
                  <span className="mt-1 block text-[11px] uppercase tracking-[0.16em] text-bodygray">
                    Hole hill course
                  </span>
                </dd>
              </div>
              {infoVerified && courseInfo.coursePar ? (
                <div>
                  <dt className="sr-only">Par</dt>
                  <dd>
                    <span className="font-serif text-4xl font-semibold text-charcoal">
                      {courseInfo.coursePar}
                    </span>
                    <span className="mt-1 block text-[11px] uppercase tracking-[0.16em] text-bodygray">
                      Course par
                    </span>
                  </dd>
                </div>
              ) : (
                <div>
                  <dt className="sr-only">Heritage</dt>
                  <dd>
                    <span className="font-serif text-4xl font-semibold text-charcoal">1890s</span>
                    <span className="mt-1 block text-[11px] uppercase tracking-[0.16em] text-bodygray">
                      Era of first play
                    </span>
                  </dd>
                </div>
              )}
              <div>
                <dt className="sr-only">Signature holes</dt>
                <dd>
                  <span className="font-serif text-4xl font-semibold text-charcoal">4</span>
                  <span className="mt-1 block text-[11px] uppercase tracking-[0.16em] text-bodygray">
                    Signature holes
                  </span>
                </dd>
              </div>
            </dl>

            <p className="mt-10">
              <Link
                href="/golf"
                className="text-[12px] font-semibold uppercase tracking-[0.22em] text-charcoal underline underline-offset-8 hover:text-brass-600"
              >
                Read More <span className="ml-1">{ARROW}</span>
              </Link>
            </p>
          </div>

          {/* Photography slot */}
          <div className="relative aspect-square overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,#47795c_0%,#274d37_45%,#14291d_100%)]"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 text-center">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                Course photography — awaiting club-approved imagery
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SIGNATURE HOLES ============ */}
      {signatureHoles.length > 0 ? (
        <section className="bg-page">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
            <p className="text-center font-serif text-2xl tracking-[0.12em] text-charcoal">
              Signature Holes
            </p>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {signatureHoles.map((hole) => (
                <Link
                  key={hole.id}
                  href={`/golf/course-guide/${hole.holeNumber}`}
                  className="group border border-mist-200 bg-white p-7 text-center transition-shadow hover:shadow-md"
                >
                  <p className="text-[11px] uppercase tracking-[0.2em] text-bodygray">
                    Hole {hole.holeNumber} · Par {hole.par}
                  </p>
                  <p className="mt-3 font-serif text-2xl font-semibold text-charcoal group-hover:text-brass-600">
                    {hole.officialName}
                  </p>
                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-bodygray">{hole.overview}</p>
                  <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-charcoal underline underline-offset-4">
                    Know More
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ============ WELCOME MESSAGE ============ */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
          <h2 className="font-serif text-3xl font-semibold tracking-[0.08em] text-charcoal">
            Welcome to the Downs
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-brass-400" />
          <p className="mt-8 text-[15px] leading-8 text-bodygray">
            From the clearing of the downs in the closing years of the nineteenth century, through
            the North Coorg Club years, to an independent golf club — the course carries more than
            a century of play in the Coorg hills. Members of affiliated clubs, member guests and
            visiting golfers are welcomed by arrangement, and every round here begins the same way:
            a first tee in the mist, and eighteen names to play through.
          </p>
          <p className="mt-10">
            <Link
              href="/club/heritage"
              className="text-[12px] font-semibold uppercase tracking-[0.22em] text-charcoal underline underline-offset-8 hover:text-brass-600"
            >
              The MDGC Story <span className="ml-1">{ARROW}</span>
            </Link>
          </p>
        </div>
      </section>

      {/* ============ UPCOMING (corner-framed carousel card) ============ */}
      <section className="bg-page">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <div className="corner-frame px-6 py-14 sm:px-14">
            <div className="corner-frame-bottom" />
            <p className="text-center font-serif text-2xl tracking-[0.14em] text-charcoal">
              Upcoming
            </p>
            <div className="mx-auto mt-10 max-w-3xl border border-mist-200 bg-white">
              <div className="flex">
                <div className="hidden items-center border-r border-mist-200 px-3 sm:flex">
                  <span className="rotate-180 text-[10px] uppercase tracking-[0.3em] text-bodygray [writing-mode:vertical-lr]">
                    Tournament
                  </span>
                </div>
                <div className="flex-1 p-8 sm:p-10">
                  {nextTournament ? (
                    <>
                      <p className="text-[12px] uppercase tracking-[0.22em] text-bodygray">
                        {nextTournament.startDate
                          ? new Date(nextTournament.startDate)
                              .toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              })
                              .toUpperCase()
                          : 'DATES TO BE ANNOUNCED'}
                      </p>
                      <h3 className="mt-3 font-serif text-2xl font-semibold leading-snug text-charcoal">
                        {nextTournament.name}
                      </h3>
                      <p className="mt-3 text-[15px] leading-7 text-bodygray">
                        {nextTournament.eligibility ??
                          'Entry details will be published when registration opens.'}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-[12px] uppercase tracking-[0.22em] text-bodygray">
                        Season 2026–27
                      </p>
                      <h3 className="mt-3 font-serif text-2xl font-semibold leading-snug text-charcoal">
                        The Tournament Calendar Is Being Finalised
                      </h3>
                      <p className="mt-3 text-[15px] leading-7 text-bodygray">
                        The Mercara Downs Open, the Murugappa Cup and the club&rsquo;s member
                        tournaments return with the new season. Past editions are in the archive.
                      </p>
                    </>
                  )}
                  <p className="mt-6">
                    <Link
                      href="/tournaments"
                      className="text-[12px] font-semibold uppercase tracking-[0.22em] text-charcoal underline underline-offset-8 hover:text-brass-600"
                    >
                      Know More <span className="ml-1">{ARROW}</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            {/* pagination dashes */}
            <div aria-hidden="true" className="mt-8 flex items-center justify-center gap-2">
              <span className="h-[3px] w-8 bg-charcoal" />
              <span className="h-[3px] w-5 bg-mist-200" />
              <span className="h-[3px] w-5 bg-mist-200" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ MEMBERSHIP ============ */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 py-24 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="heading-engraved font-serif text-3xl font-semibold uppercase leading-snug tracking-[0.06em] text-charcoal sm:text-[34px]">
              Become a Member
              <br />
              at Mercara Downs
            </h2>
            <p className="mt-7 font-serif text-xl tracking-[0.08em] text-charcoal">
              The Club on the Downs
            </p>
            <hr className="mt-6 border-mist-200" />
            <p className="mt-6 text-justify text-[15px] leading-7 text-bodygray">
              Membership brings the course, the clubhouse and the Downs Retreat, with reciprocal
              privileges at affiliated clubs across India and partners abroad. Whatever your game,
              the Downs will change it: no two mornings here play alike, and the mist keeps every
              hole honest. Categories, privileges and the application process are available from
              the membership office.
            </p>
            <p className="mt-10">
              <Link href="/membership/enquiry" className="btn-outline text-charcoal">
                Become a Member →
              </Link>
            </p>
          </div>
          <div className="relative aspect-square overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,#356349_0%,#1c3a29_50%,#0e1f16_100%)]"
            />
            <div className="absolute inset-x-0 bottom-0 p-4 text-center">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/60">
                Clubhouse photography — awaiting club-approved imagery
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ HERITAGE QUOTE (testimonial-style) ============ */}
      <section className="bg-page">
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
          <div className="corner-frame px-6 py-16 text-center sm:px-14">
            <div className="corner-frame-bottom" />
            <div
              aria-hidden="true"
              className="mx-auto h-24 w-24 rounded-full border-2 border-charcoal/20 bg-[radial-gradient(ellipse_at_40%_30%,#47795c_0%,#14291d_100%)]"
            />
            <p className="mt-6 font-serif text-2xl tracking-[0.1em] text-charcoal">
              Since the Late Nineteenth Century
            </p>
            <div aria-hidden="true" className="mx-auto mt-4 h-8 w-px bg-charcoal/30" />
            <p className="mt-4 font-serif text-sm uppercase tracking-[0.24em] text-bodygray">
              From the history of the club
            </p>
            <blockquote className="mx-auto mt-6 max-w-2xl text-[15px] leading-8 text-bodygray">
              &ldquo;Golf has been played on the Mercara Downs since the late nineteenth century —
              through the North Coorg Club years to the independent club that plays the downs
              today.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>
    </>
  )
}
