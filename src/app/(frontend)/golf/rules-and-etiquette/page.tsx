import type { Metadata } from 'next'
import Link from 'next/link'

import { PageHero, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Rules & Etiquette',
  description:
    'Local rules, dress code and clubhouse etiquette at Mercara Downs Golf Club — everything in one place.',
}

const PAGES = [
  {
    label: 'Local Rules',
    href: '/golf/local-rules',
    note: 'The playing rules in force on the course, as approved by the golf committee.',
  },
  {
    label: 'Dress Code',
    href: '/visit/dress-code',
    note: 'What to wear on the course and the practice areas.',
  },
  {
    label: 'Clubhouse Etiquette',
    href: '/clubhouse/etiquette',
    note: 'Expectations in the clubhouse, bar and dining room.',
  },
]

export default function RulesAndEtiquettePage() {
  return (
    <>
      <PageHero
        eyebrow="Golf"
        title="Rules and etiquette"
        lead="Course rules, dress code and clubhouse etiquette — separated so each is easy to find, read and print."
      />
      <Section>
        <div className="grid gap-4 sm:grid-cols-3">
          {PAGES.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group rounded-sm border border-downs-100 bg-white p-6 transition-shadow hover:shadow-md"
            >
              <p className="font-serif text-xl font-semibold text-downs-900 group-hover:text-brass-600">
                {p.label}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-mist-600">{p.note}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}
