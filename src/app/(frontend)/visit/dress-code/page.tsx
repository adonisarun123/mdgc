import type { Metadata } from 'next'
import Link from 'next/link'

import { PageHero, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Dress Code',
  description:
    'The dress code on the course at Mercara Downs Golf Club — for gentlemen and ladies.',
}

/**
 * Migrated from the legacy /rules-regulations page (captured 11 Jul 2026);
 * grammar and structure cleaned, requirements unchanged. Committee
 * re-approval pending. Clubhouse and dining expectations live on
 * /clubhouse/etiquette per the IA split.
 */
export default function DressCodePage() {
  return (
    <>
      <PageHero
        eyebrow="Visit · Dress Code"
        title="Dress code on the course"
        lead="Standard golf attire, with soft spikes preferred — and no jeans anywhere on the course."
      />
      <Section>
        <div className="grid max-w-4xl gap-10 sm:grid-cols-2">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-downs-900">Gentlemen</h2>
            <ul className="mt-4 space-y-3 leading-7 text-downs-800">
              <li>Collared t-shirts must be worn.</li>
              <li>Jerseys, jumpers, vests and jackets suitable for golf wear are allowed.</li>
              <li>Tailored-style shorts or trousers are allowed.</li>
              <li>
                Golf shoes with soft spikes, or sports shoes that will not cause indentations on
                the greens, are allowed.
              </li>
              <li>Jeans of any form are not allowed.</li>
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-2xl font-semibold text-downs-900">Ladies</h2>
            <ul className="mt-4 space-y-3 leading-7 text-downs-800">
              <li>Collared t-shirts are allowed.</li>
              <li>Jerseys, jumpers, vests and jackets suitable for golf wear are allowed.</li>
              <li>
                Tailored knee-length shorts, regular trousers or skirts are allowed.
              </li>
              <li>
                Golf shoes with soft spikes, or sports shoes that will not cause indentations on
                the greens, are allowed.
              </li>
              <li>Jeans of any form, and footwear other than golf shoes, are not allowed.</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 max-w-4xl space-y-4">
          <p className="rounded-sm border border-downs-100 bg-white p-4 text-sm leading-relaxed text-downs-800">
            Separate expectations apply in the clubhouse, dining hall and bar — see{' '}
            <Link href="/clubhouse/etiquette" className="underline underline-offset-4 hover:text-brass-600">
              clubhouse etiquette
            </Link>
            . If you are unsure, please ask in the club office.
          </p>
          <p className="text-sm text-mist-600">
            As published by the club; committee re-approval is being obtained as part of the
            website launch.
          </p>
        </div>
      </Section>
    </>
  )
}
