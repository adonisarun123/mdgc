import type { Metadata } from 'next'

import { PageHero, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Dress Code',
  description: 'The dress code on the course and practice areas at Mercara Downs Golf Club.',
}

export default function DressCodePage() {
  return (
    <>
      <PageHero
        eyebrow="Visit · Dress Code"
        title="Dress code"
        lead="Standard golf attire applies on the course and practice areas."
      />
      <Section>
        <div className="max-w-2xl space-y-6">
          <p className="rounded-sm border border-brass-300 bg-brass-300/10 p-4 text-sm leading-relaxed text-downs-800">
            The club&rsquo;s full dress code — as approved by the committee — is being confirmed and
            will be published here in detail. The guidance below reflects standard practice at the
            club; when in doubt, ask the golf office before your round.
          </p>
          <div className="space-y-4 leading-relaxed text-downs-800">
            <p>
              On the course, collared shirts with tailored trousers or shorts are expected, worn
              with golf shoes or flat-soled sports shoes. Soft spikes are preferred.
            </p>
            <p>
              Round-neck t-shirts, football or gym wear, and beachwear are not appropriate on the
              course or the practice areas. Separate expectations apply in the clubhouse and dining
              room — see clubhouse etiquette.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
