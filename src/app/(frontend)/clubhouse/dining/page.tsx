import type { Metadata } from 'next'
import Image from 'next/image'

import { IMAGES } from '@/lib/siteImages'
import { Eyebrow, Heading, PageHero, Section } from '@/components/ui'
import { DiningEnquiryForm } from '@/components/forms/DiningEnquiryForm'

export const metadata: Metadata = {
  title: 'Bar & Dining',
  description:
    'Dining and the bar at Mercara Downs Golf Club — reservation policy, timings and table requests.',
}

export default function DiningPage() {
  return (
    <>
      <PageHero
        eyebrow="Clubhouse · Dining"
        title="Bar and dining"
        lead="Coorg home cooking after your round, and a bar with a view of the downs."
      />
      <Section>
        <div className="grid gap-4 sm:grid-cols-2">
          {[IMAGES.diningView1, IMAGES.barLounge1].map((img) => (
            <div key={img.src} className="relative aspect-[3/2] overflow-hidden rounded-sm">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 640px) 48vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs uppercase tracking-[0.18em] text-mist-600">
          The dining room and bar — club photography
        </p>
      </Section>

      <Section>
        <Eyebrow>How It Works</Eyebrow>
        <Heading>Ordering ahead</Heading>
        <div className="mt-6 max-w-2xl space-y-4 leading-relaxed text-downs-800">
          <p>
            The kitchen prepares to order: food and tables must be requested at least one hour
            before your intended dining time. For larger parties or particular dishes, please give
            the team more notice.
          </p>
          <p>
            Opening hours, menus and dining eligibility for visitors are being confirmed with the
            club and will be published here. The dining team will confirm details when they reply
            to your request.
          </p>
        </div>
      </Section>
      <Section tinted>
        <Eyebrow>Reservations</Eyebrow>
        <Heading>Request a table</Heading>
        <div className="mt-8 max-w-3xl">
          <DiningEnquiryForm />
        </div>
      </Section>
    </>
  )
}
