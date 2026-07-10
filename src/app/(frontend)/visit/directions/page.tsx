import type { Metadata } from 'next'

import { getPayloadClient } from '@/lib/payload'
import { Eyebrow, Heading, Lead, PageHero, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Directions & Travel',
  description:
    'How to reach Mercara Downs Golf Club in Madikeri, Coorg — by road from Mysuru and Bengaluru, and from Kannur and Mangaluru airports.',
}

export const revalidate = 3600

export default async function DirectionsPage() {
  const payload = await getPayloadClient()
  const settings = await payload.findGlobal({ slug: 'site-settings' })
  const verifiedRoutes = (settings.directions ?? []).filter((d) => d.verified)

  return (
    <>
      <PageHero
        eyebrow="Visit · Directions"
        title="Reaching the Downs"
        lead="The club sits on the downs at the edge of Madikeri town in Kodagu (Coorg), Karnataka."
      />
      <Section>
        <Eyebrow>Address</Eyebrow>
        <Heading>Mercara Downs Golf Club</Heading>
        <p className="mt-4 leading-relaxed text-downs-800">
          P B No. 79, Madikeri 571 201, Kodagu district, Karnataka
        </p>
        {settings.mapsUrl ? (
          <p className="mt-4">
            <a
              href={settings.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-downs-800 underline underline-offset-4 hover:text-brass-600"
            >
              Open in Maps →
            </a>
          </p>
        ) : null}

        <div className="mt-12">
          <Eyebrow>By Road &amp; Air</Eyebrow>
          <Heading>Journey times</Heading>
          {verifiedRoutes.length > 0 ? (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-downs-800 text-left text-xs uppercase tracking-wider text-mist-600">
                    <th scope="col" className="py-2 pr-4">From</th>
                    <th scope="col" className="py-2 pr-4">Distance</th>
                    <th scope="col" className="py-2">Approximate time</th>
                  </tr>
                </thead>
                <tbody>
                  {verifiedRoutes.map((d, i) => (
                    <tr key={i} className="border-b border-downs-100">
                      <td className="py-3 pr-4 font-medium text-downs-900">{d.origin}</td>
                      <td className="py-3 pr-4">{d.approximateDistance ?? '—'}</td>
                      <td className="py-3">{d.approximateTime ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <Lead>
              Verified journey times from Mysuru, Bengaluru, Kannur Airport and Mangaluru Airport
              are being confirmed and will be published here. Hill roads are slower than maps
              suggest — allow extra time, particularly in the monsoon.
            </Lead>
          )}
        </div>
      </Section>
    </>
  )
}
