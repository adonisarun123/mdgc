import type { Metadata } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { Eyebrow, Heading, Lead, PageHero, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Newsletters',
  description: 'The Mercara Downs Golf Club newsletter archive.',
}

export const revalidate = 3600

export default async function NewslettersPage() {
  const payload = await getPayloadClient()
  const newsletters = await payload.find({
    collection: 'newsletters',
    sort: '-publicationDate',
    limit: 50,
    depth: 1,
  })

  return (
    <>
      <PageHero
        eyebrow="Club · Newsletters"
        title="Newsletter archive"
        lead="The club's annual newsletters — summaries you can read here, with the full edition available to download."
      />
      <Section>
        <Eyebrow>Archive</Eyebrow>
        <Heading>Editions by year</Heading>
        {newsletters.docs.length > 0 ? (
          <ul className="mt-10 space-y-6">
            {newsletters.docs.map((n) => (
              <li key={n.id} className="rounded-sm border border-downs-100 bg-white p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-serif text-xl font-semibold text-downs-900">{n.title}</p>
                  <p className="text-sm text-mist-600">{n.year}</p>
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-downs-800">{n.summary}</p>
                {typeof n.pdf === 'object' && n.pdf?.url ? (
                  <p className="mt-4">
                    <a
                      href={n.pdf.url}
                      className="text-sm font-medium text-downs-800 underline underline-offset-4 hover:text-brass-600"
                    >
                      Download the full edition (PDF
                      {typeof n.pdf.filesize === 'number'
                        ? `, ${(n.pdf.filesize / 1024 / 1024).toFixed(1)} MB`
                        : ''}
                      )
                    </a>
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <Lead>
            The newsletter archive is being assembled — the club is retrieving the original PDF
            editions from 2022 onwards. Each edition will appear here with a readable summary and
            an optimised download.
          </Lead>
        )}
      </Section>
    </>
  )
}
