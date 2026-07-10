import type { Metadata } from 'next'

import { PageHero, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Local Rules',
  description: 'The local rules in force at Mercara Downs Golf Club.',
}

export default function LocalRulesPage() {
  return (
    <>
      <PageHero
        eyebrow="Golf · Local Rules"
        title="Local rules"
        lead="The rules in force on the course, as approved by the golf committee."
      />
      <Section>
        <div className="max-w-2xl space-y-6">
          <p className="rounded-sm border border-brass-300 bg-brass-300/10 p-4 text-sm leading-relaxed text-downs-800">
            The club&rsquo;s local rules — marker colours, drop zones, out-of-bounds definitions and
            preferred-lies conditions — are currently being confirmed with the golf committee and
            will be published here in full once approved. The committee&rsquo;s wording is used
            verbatim: local rules are competitive documents and their meaning is never altered for
            style.
          </p>
          <p className="leading-relaxed text-downs-800">
            Until then, please check the notice board by the first tee or ask in the golf office
            before your round. Rules of Golf as published by The R&amp;A apply throughout.
          </p>
        </div>
      </Section>
    </>
  )
}
