import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { IMAGES } from '@/lib/siteImages'
import { Eyebrow, Heading, Lead, PageHero, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Clubhouse',
  description:
    'The clubhouse at Mercara Downs Golf Club — dining, the bar, facilities and the gallery.',
}

const LINKS = [
  { label: 'Dining & Bar', href: '/clubhouse/dining', note: 'Coorg home cooking and a well-kept bar after your round.' },
  { label: 'Private Events', href: '/clubhouse/private-events', note: 'Corporate golf days, meetings and private evenings at the Downs.' },
  { label: 'Clubhouse Etiquette', href: '/clubhouse/etiquette', note: 'Expectations in the clubhouse, bar and dining room.' },
  { label: 'Gallery', href: '/clubhouse/gallery', note: 'The course and club through the seasons.' },
]

export default function ClubhousePage() {
  return (
    <>
      <PageHero
        eyebrow="Clubhouse"
        title="The clubhouse"
        lead="The heart of the club — where rounds are settled, stories retold and guests received."
      />
      <Section>
        <div className="relative aspect-[21/9] overflow-hidden rounded-sm">
          <Image
            src={IMAGES.clubhouse.src}
            alt={IMAGES.clubhouse.alt}
            fill
            priority
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="object-cover"
          />
        </div>
      </Section>

      <Section>
        <Eyebrow>Facilities</Eyebrow>
        <Heading>What&rsquo;s here</Heading>
        <Lead>
          The clubhouse hosts the dining room, bar and member facilities. Details of newer
          facilities are being confirmed with the club and will be described here once complete
          and operational — this site lists only what is actually open.
        </Lead>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
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
      </Section>
    </>
  )
}
