import type { Metadata } from 'next'

import { PageHero, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for the Mercara Downs Golf Club website.',
}

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Terms" title="Terms of use" lead="The small print, kept short." />
      <Section>
        <div className="max-w-3xl space-y-8 leading-7 text-downs-800">
          <div>
            <h2 className="font-serif text-xl font-semibold text-downs-900">Requests are not confirmations</h2>
            <p className="mt-3">
              Tee-time requests, room and dining enquiries and tournament registrations submitted
              through this website are requests only. No booking, reservation or entry exists
              until the club confirms it to you directly. The club&rsquo;s written confirmation
              states the applicable terms, rates and cancellation conditions.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl font-semibold text-downs-900">Rates and information</h2>
            <p className="mt-3">
              Published rates carry an effective date and are subject to revision by the club.
              Course conditions, timings and availability change with weather and operations;
              the club&rsquo;s staff are the authoritative source on the day.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl font-semibold text-downs-900">Club rules apply</h2>
            <p className="mt-3">
              Access to the course, clubhouse and Downs Retreat is subject to the club&rsquo;s
              rules, dress code and etiquette, and to the direction of club staff and the
              committee.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl font-semibold text-downs-900">Content</h2>
            <p className="mt-3">
              The text, photography and course descriptions on this website belong to Mercara
              Downs Golf Club and may not be reproduced commercially without the club&rsquo;s
              permission.
            </p>
          </div>
          <p className="text-sm text-mist-600">Last updated: 10 July 2026.</p>
        </div>
      </Section>
    </>
  )
}
