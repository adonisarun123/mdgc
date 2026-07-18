const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mdgc.golf'

/**
 * JSON-LD structured data.
 *
 * Deliberately conservative: only club-verifiable facts. GPS coordinates,
 * elevation and founding date are OMITTED until the club verifies them
 * (factual-verification-register) — wrong geo data in schema.org markup is
 * worse than none.
 */

const golfCourse = {
  '@context': 'https://schema.org',
  '@type': 'GolfCourse',
  '@id': `${BASE}/#golfcourse`,
  name: 'Mercara Downs Golf Club',
  alternateName: 'MDGC',
  url: BASE,
  description:
    'An 18-hole golf course in the hills of Madikeri, Coorg (Kodagu), Karnataka — with clubhouse dining and rooms at the Downs Retreat.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Madikeri',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  areaServed: 'Coorg (Kodagu), Karnataka',
  sameAs: [
    'https://kga.in/club/mercara-downs-golf-club/',
    'https://www.tripadvisor.in/Attraction_Review-g641714-d3583913-Reviews-Mercara_Downs_Golf_Club-Madikeri_Kodagu_Coorg_Karnataka.html',
    'https://www.golfpass.com/travel-advisor/courses/36095-mercara-downs-golf-club',
  ],
}

const lodging = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  '@id': `${BASE}/stay#lodging`,
  name: 'Downs Retreat — Mercara Downs Golf Club',
  url: `${BASE}/stay`,
  description:
    'Rooms at Mercara Downs Golf Club beside the first tee, with course and garden views. Open to visiting golfers and travellers.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Madikeri',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
  parentOrganization: { '@id': `${BASE}/#golfcourse` },
}

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export function GolfCourseJsonLd() {
  return <JsonLd data={golfCourse} />
}

export function LodgingJsonLd() {
  return <JsonLd data={lodging} />
}
