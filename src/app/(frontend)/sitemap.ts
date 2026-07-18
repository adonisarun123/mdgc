import type { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mdgc.golf'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    '',
    '/golf',
    '/golf/course-guide',
    '/golf/scorecard',
    '/golf/course-conditions',
    '/golf/local-rules',
    '/golf/rules-and-etiquette',
    '/golf/coaching',
    '/golf/practice-facilities',
    '/golf/junior-golf',
    '/visit',
    '/visit/green-fees',
    '/visit/caddies-and-buggies',
    '/visit/dress-code',
    '/visit/plan-your-round',
    '/visit/directions',
    '/visit/faqs',
    '/membership',
    '/membership/affiliated-clubs',
    '/membership/enquiry',
    '/tournaments',
    '/tournaments/register',
    '/stay',
    '/stay/book',
    '/stay/stay-and-play',
    '/stay/policies',
    '/privacy-policy',
    '/terms',
    '/clubhouse',
    '/clubhouse/dining',
    '/clubhouse/private-events',
    '/clubhouse/etiquette',
    '/clubhouse/gallery',
    '/club/heritage',
    '/club/committee',
    '/club/news',
    '/club/newsletters',
    '/contact',
  ]

  const holes = Array.from({ length: 18 }, (_, i) => `/golf/course-guide/${i + 1}`)

  return [...staticPaths, ...holes].map((p) => ({
    url: `${BASE}${p}`,
    changeFrequency: p === '' ? 'daily' : 'weekly',
    priority: p === '' ? 1 : 0.7,
  }))
}
