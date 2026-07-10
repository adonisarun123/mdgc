import type { Metadata } from 'next'

import { ButtonLink, Eyebrow, Heading, Lead, PageHero, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Junior Golf',
  description: 'Junior golf at Mercara Downs Golf Club — bringing the next generation to the Downs.',
}

export default function JuniorGolfPage() {
  return (
    <>
      <PageHero
        eyebrow="Golf · Juniors"
        title="The next generation on the Downs"
        lead="Golf has been played here for more than a century — juniors are how the next one starts."
      />
      <Section>
        <Eyebrow>Juniors</Eyebrow>
        <Heading>Junior golf at the club</Heading>
        <Lead>
          Junior playing rights, coaching programmes and any junior tournaments are being
          confirmed with the club and will be published here. Members&rsquo; children have
          traditionally learned the game on these fairways — contact the club to ask what is
          currently offered for young golfers.
        </Lead>
        <p className="mt-8">
          <ButtonLink href="/contact" variant="secondary">
            Contact the Club
          </ButtonLink>
        </p>
      </Section>
    </>
  )
}
