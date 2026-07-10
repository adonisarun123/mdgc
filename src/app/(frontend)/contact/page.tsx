import type { Metadata } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { Eyebrow, Heading, Lead, PageHero, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Mercara Downs Golf Club — reception, golf operations, the Downs Retreat and dining reservations.',
}

export const revalidate = 300

const DEPARTMENT_LABEL: Record<string, string> = {
  'club-reception': 'Club Reception',
  'golf-operations': 'Golf Operations',
  'tee-time-enquiries': 'Tee-Time Enquiries',
  'general-manager': 'General Manager',
  membership: 'Membership',
  'tournament-office': 'Tournament Office',
  'downs-retreat': 'Downs Retreat',
  'room-reservations': 'Room Reservations',
  'dining-reservations': 'Dining Reservations',
  accounts: 'Accounts',
  coaching: 'Coaching',
  emergency: 'Emergency Contact',
}

export default async function ContactPage() {
  const payload = await getPayloadClient()
  const contacts = await payload.find({
    collection: 'contacts',
    where: { publicStatus: { equals: 'public' } },
    sort: 'displayOrder',
    limit: 30,
    depth: 0,
  })

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Reach the club"
        lead="One directory, kept current — so you always reach the right desk first time."
      />
      <Section>
        <Eyebrow>Directory</Eyebrow>
        <Heading>Departments</Heading>
        {contacts.docs.length > 0 ? (
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {contacts.docs.map((c) => (
              <li key={c.id} className="rounded-sm border border-downs-100 bg-white p-6">
                <p className="font-medium text-downs-900">{DEPARTMENT_LABEL[c.department]}</p>
                {c.contactPerson ? (
                  <p className="mt-1 text-sm text-mist-600">
                    {c.contactPerson}
                    {c.designation ? `, ${c.designation}` : ''}
                  </p>
                ) : null}
                {c.phone ? (
                  <p className="mt-3 text-sm">
                    <a href={`tel:${c.phone.replace(/\s/g, '')}`} className="font-medium text-downs-800 hover:text-brass-600">
                      {c.phone}
                    </a>
                    {c.whatsappAvailable ? (
                      <span className="ml-2 rounded-sm bg-downs-50 px-2 py-0.5 text-xs text-downs-800">
                        WhatsApp
                      </span>
                    ) : null}
                  </p>
                ) : null}
                {c.email ? (
                  <p className="mt-1 text-sm">
                    <a href={`mailto:${c.email}`} className="text-downs-800 underline underline-offset-4 hover:text-brass-600">
                      {c.email}
                    </a>
                  </p>
                ) : null}
                {c.workingHours ? <p className="mt-2 text-xs text-mist-600">{c.workingHours}</p> : null}
              </li>
            ))}
          </ul>
        ) : (
          <Lead>
            The club&rsquo;s contact directory is being verified so that every published number and
            email is current. Verified departments will appear here — in the meantime, write to the
            club and your message will be routed to the right desk.
          </Lead>
        )}

        <div className="mt-14">
          <Eyebrow>Post</Eyebrow>
          <Heading as="h3">Postal address</Heading>
          <p className="mt-3 leading-relaxed text-downs-800">
            Mercara Downs Golf Club
            <br />
            P B No. 79, Madikeri 571 201
            <br />
            Kodagu district, Karnataka, India
          </p>
        </div>
      </Section>
    </>
  )
}
