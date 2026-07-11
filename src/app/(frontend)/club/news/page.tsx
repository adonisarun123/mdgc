import type { Metadata } from 'next'
import Link from 'next/link'

import { getPayloadClient } from '@/lib/payload'
import { Eyebrow, Heading, Lead, PageHero, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Club News & Announcements',
  description:
    'News, announcements and stories from Mercara Downs Golf Club — tournament reports, club updates and life on the Downs.',
}

export const revalidate = 300

const CATEGORY_LABEL: Record<string, string> = {
  'tournament-report': 'Tournament Report',
  'member-story': 'Member Story',
  'course-story': 'Course Story',
  'junior-golf': 'Junior Golf',
  'caddy-story': 'Caddy Story',
  heritage: 'Heritage',
  announcement: 'Announcement',
  newsletter: 'Newsletter',
}

export default async function ClubNewsPage() {
  const payload = await getPayloadClient()
  const stories = await payload.find({
    collection: 'stories',
    where: { _status: { equals: 'published' } },
    sort: '-publishedDate',
    limit: 30,
    depth: 0,
  })

  return (
    <>
      <PageHero
        eyebrow="Club · News"
        title="Stories from the Downs"
        lead="Announcements, tournament reports and life at the club."
      />
      <Section>
        <Eyebrow>Latest</Eyebrow>
        <Heading>News and announcements</Heading>
        {stories.docs.length > 0 ? (
          <ul className="mt-10 space-y-6">
            {stories.docs.map((s) => (
              <li key={s.id} className="rounded-sm border border-downs-100 bg-white p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <span className="rounded-sm bg-downs-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-downs-800">
                    {CATEGORY_LABEL[s.category] ?? s.category}
                  </span>
                  <p className="text-sm text-mist-600">
                    {new Date(s.publishedDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                </div>
                <h3 className="mt-3 font-serif text-2xl font-semibold text-downs-900">{s.title}</h3>
                <p className="mt-3 max-w-2xl leading-7 text-bodygray">{s.excerpt}</p>
              </li>
            ))}
          </ul>
        ) : (
          <Lead>
            Club news will appear here — tournament reports, announcements and stories from the
            Downs.
          </Lead>
        )}
        <p className="mt-10 text-sm text-mist-600">
          Looking for the annual newsletters?{' '}
          <Link href="/club/newsletters" className="underline underline-offset-4 hover:text-downs-900">
            Newsletter archive
          </Link>
        </p>
      </Section>
    </>
  )
}
