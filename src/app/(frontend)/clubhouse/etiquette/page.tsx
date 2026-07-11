import type { Metadata } from 'next'
import Link from 'next/link'

import { PageHero, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Clubhouse Etiquette & Dress',
  description:
    'Dress expectations in the clubhouse, patio, dining hall and bar at Mercara Downs Golf Club.',
}

/**
 * Migrated from the legacy /rules-regulations page (captured 11 Jul 2026);
 * grammar cleaned, requirements unchanged. "Bandagala" is the traditional
 * Kodava closed-neck jacket worn with trousers and formal shoes.
 * Committee re-approval pending.
 */
export default function ClubhouseEtiquettePage() {
  return (
    <>
      <PageHero
        eyebrow="Clubhouse · Etiquette"
        title="In the clubhouse"
        lead="Dress expectations for the clubhouse, patio, dining hall and bar."
      />
      <Section>
        <div className="max-w-3xl space-y-12">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-downs-900">
              Dining hall and bar
            </h2>
            <div className="mt-4 space-y-3 leading-7 text-downs-800">
              <p className="font-semibold text-downs-900">Gentlemen</p>
              <ul className="space-y-2.5">
                <li>
                  Bandagala — the traditional set of clothes with a closed-neck jacket and
                  trousers, worn with formal shoes — is welcome.
                </li>
                <li>Shirts with collars are permitted.</li>
                <li>Collarless ribbed high-neck t-shirts and polo-neck shirts are permitted.</li>
                <li>Shoes, or sandals with back straps, are permitted.</li>
              </ul>
              <p className="pt-2 font-semibold text-downs-900">Ladies</p>
              <ul className="space-y-2.5">
                <li>Attire befitting the occasion and the area of use.</li>
                <li>The emphasis is on elegance, poise and grace.</li>
              </ul>
              <p className="rounded-sm border border-brass-300 bg-brass-300/10 p-4 text-sm leading-relaxed">
                Slippers, sports gear, golf shorts and sneakers are not allowed. Hats, caps and
                golf shoes must be removed before entering the café and bar.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold text-downs-900">
              Clubhouse and patio
            </h2>
            <div className="mt-4 space-y-3 leading-7 text-downs-800">
              <p className="font-semibold text-downs-900">Gentlemen</p>
              <ul className="space-y-2.5">
                <li>Bandagala is welcome.</li>
                <li>
                  Shirts with collars, t-shirts with collars, polo-neck shirts, trousers, golf
                  shorts and jeans are permitted.
                </li>
                <li>Sports shoes, or sandals with back straps, are permitted.</li>
              </ul>
              <p className="pt-2 font-semibold text-downs-900">Ladies</p>
              <ul className="space-y-2.5">
                <li>Attire befitting the occasion and the area of use.</li>
                <li>The emphasis is on elegance, poise and grace.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <p className="rounded-sm border border-downs-100 bg-white p-4 text-sm leading-relaxed text-downs-800">
              On the course a separate dress code applies — see the{' '}
              <Link href="/visit/dress-code" className="underline underline-offset-4 hover:text-brass-600">
                course dress code
              </Link>
              . If you are unsure, please ask in the club office.
            </p>
            <p className="text-sm text-mist-600">
              As published by the club; committee re-approval is being obtained as part of the
              website launch.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
