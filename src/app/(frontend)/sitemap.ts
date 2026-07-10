import type { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mdgc.golf'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    '',
    '/golf',
    '/golf/course-guide',
    '/golf/scorecard',
    '/golf/local-rules',
    '/golf/rules-and-etiquette',
    '/visit',
    '/visit/green-fees',
    '/visit/dress-code',
    '/visit/plan-your-round',
    '/visit/directions',
    '/membership',
    '/membership/affiliated-clubs',
    '/membership/enquiry',
    '/tournaments',
    '/stay',
    '/clubhouse',
    '/clubhouse/dining',
    '/clubhouse/etiquette',
    '/clubhouse/gallery',
    '/club/heritage',
    '/club/committee',
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
