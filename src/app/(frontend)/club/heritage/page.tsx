import type { Metadata } from 'next'
import Link from 'next/link'

import { Eyebrow, Heading, PageHero, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'History of Mercara Downs Golf Club',
  description:
    'The story of golf on the Mercara Downs — from the clearing of the downs in the late nineteenth century, through the North Coorg Club years, to today.',
}

const TIMELINE = [
  {
    period: 'Late nineteenth century',
    text: 'A group of Englishmen clear the open downs above Mercara (Madikeri), and golf begins on the land that becomes the Mercara Downs.',
  },
  {
    period: 'Early twentieth century',
    text: 'The course draws growing patronage; the World Wars bring military officers to the Downs, and by the 1940s Indian civilians and officers are a regular part of the playing field.',
  },
  {
    period: '1951',
    text: 'The club is incorporated as an extension of the North Coorg Club.',
  },
  {
    period: 'Early 1980s',
    text: 'Mercara Downs begins operating as an independent golf club.',
  },
  {
    period: 'Today',
    text: 'An 18-hole course on the downs, a clubhouse, and the Downs Retreat — with affiliations to clubs across India and partners abroad.',
  },
]

export default function HeritagePage() {
  return (
    <>
      <PageHero
        eyebrow="Heritage"
        title="Golf on the Downs since the late nineteenth century"
        lead="Few courses in India carry this much history in their turf. The story of Mercara Downs runs through empire, war, independence and more than a century of play."
      />

      <Section>
        <Eyebrow>The Story</Eyebrow>
        <Heading>From cleared downs to a club of its own</Heading>
        <div className="mt-6 max-w-2xl space-y-4 leading-relaxed text-downs-800">
          <p>
            In the closing years of the nineteenth century, a group of Englishmen clear-felled the
            open downs above Mercara — the land destined to become the Mercara Downs Golf Club. By
            the turn of the century the course was attracting increasing patronage, and the World
            Wars brought military officers whose enthusiasm carried the game here through difficult
            years.
          </p>
          <p>
            With Independence and the departure of British officers, the club&rsquo;s early records
            were largely lost — one reason the club is careful about precise dates from its first
            decades. In 1951 the club was incorporated as an extension of the North Coorg Club, and
            from the early 1980s Mercara Downs has operated as an independent golf club.
          </p>
          <p>
            Today the course runs across roughly a hundred acres of the downs, beside the clubhouse
            and the eight rooms of the Downs Retreat.
          </p>
        </div>
      </Section>

      <Section tinted>
        <Eyebrow>Timeline</Eyebrow>
        <Heading>More than a century on the Downs</Heading>
        <ol className="mt-10 space-y-6 border-l-2 border-downs-200 pl-6">
          {TIMELINE.map((item) => (
            <li key={item.period}>
              <p className="font-serif text-lg font-semibold text-downs-900">{item.period}</p>
              <p className="mt-1 max-w-2xl leading-relaxed text-downs-800">{item.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/club/committee"
            className="rounded-sm border border-downs-800 px-5 py-3 text-sm font-medium text-downs-900 hover:bg-downs-800 hover:text-mist-50"
          >
            The Committee
          </Link>
          <Link
            href="/club/newsletters"
            className="rounded-sm border border-downs-800 px-5 py-3 text-sm font-medium text-downs-900 hover:bg-downs-800 hover:text-mist-50"
          >
            Newsletter Archive
          </Link>
        </div>
      </Section>
    </>
  )
}
