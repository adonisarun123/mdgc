import type { Metadata } from 'next'
import Image from 'next/image'

import { getPayloadClient } from '@/lib/payload'
import { GALLERY_IMAGES } from '@/lib/siteImages'
import { PageHero, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Photographs of Mercara Downs Golf Club — the course and clubhouse through the seasons.',
}

export const revalidate = 3600

export default async function GalleryPage() {
  const payload = await getPayloadClient()
  const media = await payload.find({
    collection: 'media',
    where: {
      and: [{ usagePermission: { equals: 'confirmed' } }, { mimeType: { contains: 'image' } }],
    },
    limit: 48,
    depth: 0,
  })

  return (
    <>
      <PageHero
        eyebrow="Clubhouse · Gallery"
        title="The Downs through the seasons"
        lead="Mist, monsoon and winter sun — the course photographs differently every month of the year."
      />
      <Section>
        {media.docs.length > 0 ? (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {media.docs.map((img) => (
              <li key={img.id} className="overflow-hidden rounded-sm border border-downs-100 bg-white">
                {img.url ? (
                  <Image
                    src={img.url}
                    alt={img.alt}
                    width={img.width ?? 960}
                    height={img.height ?? 640}
                    className="h-64 w-full object-cover"
                  />
                ) : null}
                {img.caption || img.isArchival ? (
                  <p className="p-3 text-sm text-mist-600">
                    {img.caption}
                    {img.isArchival && img.approximateDate ? ` (${img.approximateDate})` : ''}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (
          <>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {GALLERY_IMAGES.map((img) => (
                <li key={img.src} className="overflow-hidden rounded-sm border border-downs-100 bg-white">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 100vw"
                    className="h-64 w-full object-cover"
                  />
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-mist-600">
              Photography from the club&rsquo;s own archive. New course and clubhouse photography
              will join the gallery as it is taken and approved.
            </p>
          </>
        )}
      </Section>
    </>
  )
}
