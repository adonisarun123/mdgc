import type { Metadata } from 'next'

import { PageHero, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Clubhouse Etiquette',
  description: 'Etiquette and dress expectations in the clubhouse at Mercara Downs Golf Club.',
}

export default function ClubhouseEtiquettePage() {
  return (
    <>
      <PageHero
        eyebrow="Clubhouse · Etiquette"
        title="Clubhouse etiquette"
        lead="A few conventions keep the clubhouse comfortable for everyone."
      />
      <Section>
        <div className="max-w-2xl space-y-6">
          <p className="rounded-sm border border-brass-300 bg-brass-300/10 p-4 text-sm leading-relaxed text-downs-800">
            The committee&rsquo;s full clubhouse and dining-room conventions are being confirmed and
            will be published here. The notes below reflect standard practice.
          </p>
          <div className="space-y-4 leading-relaxed text-downs-800">
            <p>
              Smart-casual dress is expected in the clubhouse and dining room; golf shoes and caps
              come off at the door. Mobile telephones are used discreetly, away from the dining
              room.
            </p>
            <p>
              Guests are welcome when accompanied by their host, who remains responsible for them
              during the visit.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
