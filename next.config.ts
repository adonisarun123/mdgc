import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
      {
        pathname: '/images/**',
      },
    ],
  },
  /**
   * Permanent redirects from legacy mdgc.golf URLs.
   * Keep in sync with docs/url-redirect-map.md — every redirect is a single
   * hop to the final canonical URL (no chains).
   */
  async redirects() {
    return [
      { source: '/mdgc-history', destination: '/club/heritage', permanent: true },
      { source: '/history', destination: '/club/heritage', permanent: true },
      { source: '/course-layout', destination: '/golf/course-guide', permanent: true },
      { source: '/copy-of-green-fee', destination: '/visit/green-fees', permanent: true },
      { source: '/golf/visitor-fees', destination: '/visit/green-fees', permanent: true },
      // Legacy /green-fee held the reciprocal-club fee table; retarget to
      // /visit/green-fees if the club confirms it was visitor-facing.
      { source: '/green-fee', destination: '/membership/affiliated-clubs', permanent: true },
      {
        source: '/copy-of-affiliated-clubs-old-1',
        destination: '/membership/affiliated-clubs',
        permanent: true,
      },
      { source: '/rules-regulations', destination: '/golf/rules-and-etiquette', permanent: true },
      { source: '/gallery', destination: '/clubhouse/gallery', permanent: true },
      { source: '/rooms', destination: '/stay', permanent: true },
      { source: '/bar-dining', destination: '/clubhouse/dining', permanent: true },
      { source: '/news-letter-2022', destination: '/club/newsletters', permanent: true },
      { source: '/news-letter-2023', destination: '/club/newsletters', permanent: true },
      { source: '/news-letter-2024', destination: '/club/newsletters', permanent: true },
    ]
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
