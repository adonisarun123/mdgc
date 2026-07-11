import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getPayloadClient } from '@/lib/payload'
import { HOLE_IMAGES } from '@/lib/siteImages'
import { Section } from '@/components/ui'

export const revalidate = 300

type Props = { params: Promise<{ hole: string }> }

async function getHole(holeNumber: number) {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'course-holes',
    where: { holeNumber: { equals: holeNumber } },
    limit: 1,
    depth: 1,
  })
  return result.docs[0] ?? null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { hole: holeParam } = await params
  const holeNumber = Number(holeParam)
  if (!Number.isInteger(holeNumber)) return { title: 'Course Guide' }
  const hole = await getHole(holeNumber)
  if (!hole) return { title: 'Course Guide' }
  return {
    title: `Hole ${hole.holeNumber} — ${hole.officialName}`,
    description: hole.overview?.slice(0, 155),
  }
}

const HAZARD_LABEL: Record<string, string> = {
  bunker: 'Bunker',
  water: 'Water',
  'out-of-bounds': 'Out of bounds',
  trees: 'Trees',
  rough: 'Rough',
  slope: 'Slope / drop-off',
  other: 'Hazard',
}

export default async function HolePage({ params }: Props) {
  const { hole: holeParam } = await params
  const holeNumber = Number(holeParam)
  if (!Number.isInteger(holeNumber) || holeNumber < 1 || holeNumber > 18) notFound()

  const hole = await getHole(holeNumber)
  if (!hole) notFound()

  const prev = holeNumber > 1 ? holeNumber - 1 : 18
  const next = holeNumber < 18 ? holeNumber + 1 : 1

  return (
    <>
      <div className="bg-downs-950 text-mist-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brass-300">
            Hole {hole.holeNumber} · Par {hole.par}
            {hole.strokeIndex ? ` · Stroke index ${hole.strokeIndex}` : ''}
          </p>
          <h1 className="mt-3 font-serif text-5xl font-semibold leading-tight sm:text-6xl">
            {hole.officialName}
          </h1>
          <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-2 text-sm text-downs-200">
            {hole.mensDistance ? (
              <div>
                <dt className="inline">Men&rsquo;s tees: </dt>
                <dd className="inline font-medium text-mist-50">{hole.mensDistance} yards</dd>
              </div>
            ) : null}
            {hole.womensDistance ? (
              <div>
                <dt className="inline">Women&rsquo;s tees: </dt>
                <dd className="inline font-medium text-mist-50">{hole.womensDistance} yards</dd>
              </div>
            ) : null}
            {typeof hole.elevationChange === 'number' && hole.elevationChange !== 0 ? (
              <div>
                <dt className="inline">Elevation change: </dt>
                <dd className="inline font-medium text-mist-50">
                  {hole.elevationChange > 0 ? '+' : ''}
                  {hole.elevationChange} m
                </dd>
              </div>
            ) : null}
          </dl>
        </div>
      </div>

      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {HOLE_IMAGES[holeNumber] ? (
              <figure>
                <div className="relative aspect-[16/9] overflow-hidden rounded-sm">
                  <Image
                    src={HOLE_IMAGES[holeNumber].src}
                    alt={HOLE_IMAGES[holeNumber].alt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 62vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-xs uppercase tracking-[0.18em] text-mist-600">
                  {hole.officialName} — from the club&rsquo;s course photography
                </figcaption>
              </figure>
            ) : null}
            <div>
              <h2 className="font-serif text-2xl font-semibold text-downs-900">The hole</h2>
              <p className="mt-3 leading-relaxed text-downs-800">{hole.overview}</p>
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold text-downs-900">Off the tee</h2>
              <p className="mt-3 leading-relaxed text-downs-800">{hole.teeShotStrategy}</p>
            </div>
            {hole.approachStrategy ? (
              <div>
                <h2 className="font-serif text-2xl font-semibold text-downs-900">The approach</h2>
                <p className="mt-3 leading-relaxed text-downs-800">{hole.approachStrategy}</p>
              </div>
            ) : null}
            {hole.greenStrategy ? (
              <div>
                <h2 className="font-serif text-2xl font-semibold text-downs-900">On the green</h2>
                <p className="mt-3 leading-relaxed text-downs-800">{hole.greenStrategy}</p>
              </div>
            ) : null}
            {hole.captainTip ? (
              <div className="rounded-sm border-l-2 border-brass-400 bg-downs-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-600">
                  Captain&rsquo;s tip
                </p>
                <p className="mt-2 leading-relaxed text-downs-800">{hole.captainTip}</p>
              </div>
            ) : null}
            {hole.localRule ? (
              <div className="rounded-sm border border-downs-100 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mist-600">
                  Local rule on this hole
                </p>
                <p className="mt-2 leading-relaxed text-downs-800">{hole.localRule}</p>
              </div>
            ) : null}
          </div>

          <aside>
            {hole.hazards && hole.hazards.length > 0 ? (
              <div className="rounded-sm border border-downs-100 bg-white p-6">
                <h2 className="font-serif text-xl font-semibold text-downs-900">Hazards</h2>
                <ul className="mt-4 space-y-3">
                  {hole.hazards.map((hz, i) => (
                    <li key={i} className="text-sm leading-relaxed text-downs-800">
                      <span className="font-medium">{HAZARD_LABEL[hz.hazardType] ?? 'Hazard'}</span>
                      {hz.position ? ` — ${hz.position}` : ''}
                      {hz.description ? (
                        <span className="block text-mist-600">{hz.description}</span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>

        <nav className="mt-14 flex items-center justify-between border-t border-downs-100 pt-6" aria-label="Hole navigation">
          <Link href={`/golf/course-guide/${prev}`} className="text-sm font-medium text-downs-800 hover:text-brass-600">
            ← Hole {prev}
          </Link>
          <Link href="/golf/course-guide" className="text-sm text-mist-600 hover:text-brass-600">
            All holes
          </Link>
          <Link href={`/golf/course-guide/${next}`} className="text-sm font-medium text-downs-800 hover:text-brass-600">
            Hole {next} →
          </Link>
        </nav>
      </Section>
    </>
  )
}
