import type { Metadata } from 'next'

import { PageHero, Section } from '@/components/ui'
import { PrintButton } from '@/components/PrintButton'

export const metadata: Metadata = {
  title: 'Local Rules',
  description:
    'The local rules in force at Mercara Downs Golf Club — marker colours, preferred lies, relief, drop zones and penalties.',
}

/**
 * Migrated from the legacy site's /rules-regulations page (captured 11 Jul 2026).
 * Spelling and formatting cleaned; the competitive meaning of every rule is
 * unchanged. Committee re-approval pending before launch sign-off.
 */

const MARKERS = [
  { colour: 'Pink', meaning: 'Out of bounds', dot: 'bg-pink-400' },
  { colour: 'Yellow', meaning: 'Penalty area', dot: 'bg-yellow-400' },
  { colour: 'Red', meaning: 'Penalty area', dot: 'bg-red-600' },
  { colour: 'White', meaning: 'Fairway markers', dot: 'bg-white border border-mist-400' },
  { colour: 'Blue', meaning: 'Start of fairway', dot: 'bg-blue-500' },
]

const DROP_ZONES = [
  {
    hole: 'Hole 8',
    text: 'If the ball enters the water, use the drop zone provided before the margin of the water. If the ball enters the forest area beyond the water, use the drop zone provided after the margin of the water.',
  },
  {
    hole: 'Hole 9',
    text: 'For a ball entering the forest area near the 15th tee box, use the drop zone provided near the 15th tee box. If the ball enters the forest area after the 8th green, use the drop zone provided after the 8th green.',
  },
  {
    hole: 'Hole 12',
    text: 'If the ball enters the forest area adjacent to the 8th green, use the drop zone close to the 15th tee box.',
  },
  {
    hole: 'Hole 15',
    text: 'If the ball lies on the road running through the middle of the course between the two entrance gates of the MDGC clubhouse, use the drop zone provided.',
  },
  {
    hole: 'Hole 17',
    text: 'Use the drop zone provided to the right of the green if the ball enters the water body marked in red.',
  },
]

export default function LocalRulesPage() {
  return (
    <>
      <PageHero
        eyebrow="Golf · Local Rules"
        title="Local rules"
        lead="The rules in force on the course. In matchplay, breach of a local rule is loss of hole; in strokeplay, two shots."
      />
      <Section>
        <div className="mb-8 flex justify-end">
          <PrintButton label="Print local rules" />
        </div>
        <div className="max-w-3xl space-y-12">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-downs-900">
              Painted marker stones and stakes
            </h2>
            <ul className="mt-5 space-y-2.5">
              {MARKERS.map((m) => (
                <li key={m.colour} className="flex items-center gap-3 text-[15px] text-downs-800">
                  <span aria-hidden="true" className={`h-3 w-3 rounded-full ${m.dot}`} />
                  <span className="w-16 font-semibold">{m.colour}</span>
                  <span>{m.meaning}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-downs-900">
              Rule A — Preferred lie
            </h2>
            <p className="mt-2 text-[13px] font-semibold uppercase tracking-wider text-brass-600">
              Par three: 1 · Par four: 1 · Par five: 2
            </p>
            <div className="mt-4 space-y-3 leading-7 text-downs-800">
              <p>
                A preferred lie may be taken if the ball lies within the fairway of the hole being
                played, within one club length. The ball once placed is in play. A ball on the
                fairway band is in the fairway.
              </p>
              <p>
                Preferred lies may be availed for penalty shots played from within the drop zones.
                A player may avail a preferred lie when taking a drop from a penalty area, provided
                the prescribed number of preferred lies for the hole has not been exhausted.
              </p>
              <p>
                A player is not entitled to a preferred lie if the ball is out of the fairway but
                is dropped in the fairway under any rule as the nearest point of relief.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-downs-900">
              Rule B — Relief through the green
            </h2>
            <div className="mt-4 space-y-3 leading-7 text-downs-800">
              <p>Relief may be taken for a ball embedded in its own pitch mark.</p>
              <p>
                Relief may be taken if the ball lies in or on — or if the stance or intended area
                of swing is affected by — cut drains, embedded stones, tee boxes, safety grills,
                electric pillars, benches, sprinkler heads, inspection chambers or concrete
                pathways; for a ball lying on the fairway band; on the tarmac road running through
                the middle of the course; or if the ball lies on roads, vehicular tracks, pathways
                or the buggy path.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-downs-900">
              Rule C — Line of play
            </h2>
            <p className="mt-4 leading-7 text-downs-800">
              When playing the 14th hole, if the ball lies in the fairway within 15 yards of the
              protective screen on the 9th tee box, the player may avail a free drop.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-downs-900">Rule D — Bunkers</h2>
            <p className="mt-4 leading-7 text-downs-800">
              Relief may be obtained for a ball lying on — or where the stance or swing path is
              affected by — fixed pipes in bunkers. A player taking relief under this rule must
              drop the ball in the bunker within one club length of the nearest point of relief,
              not nearer the hole.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-downs-900">
              Rule E — A ball must be replayed
            </h2>
            <p className="mt-4 leading-7 text-downs-800">
              A ball must be replayed if it strikes any electric pole or overhead wires.
            </p>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-downs-900">Drop zones</h2>
            <dl className="mt-4 space-y-4">
              {DROP_ZONES.map((dz) => (
                <div key={dz.hole}>
                  <dt className="font-semibold text-downs-900">{dz.hole}</dt>
                  <dd className="mt-1 leading-7 text-downs-800">{dz.text}</dd>
                </div>
              ))}
            </dl>
          </div>

          <p className="rounded-sm border border-brass-300 bg-brass-300/10 p-4 text-sm leading-relaxed text-downs-800">
            <strong>Penalty for breach of a local rule</strong> — Matchplay: loss of hole.
            Strokeplay: two shots. These rules are as published by the club; the golf
            committee&rsquo;s re-approval is being obtained as part of the website launch.
          </p>
        </div>
      </Section>
    </>
  )
}
