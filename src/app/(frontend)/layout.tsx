import type { Metadata } from 'next'
import React from 'react'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import '@fontsource-variable/fraunces'
import '@fontsource-variable/inter'
import '@fontsource/cinzel/400.css'
import '@fontsource/cinzel/600.css'
import '@fontsource/cinzel/700.css'
import './styles.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.mdgc.golf'),
  title: {
    default: 'Mercara Downs Golf Club | Golf in Madikeri, Coorg',
    template: '%s | Mercara Downs Golf Club',
  },
  description:
    'An 18-hole golf course in the hills of Madikeri, Coorg. Plan your round, explore the course hole by hole, and stay at the Downs Retreat.',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-brass-400 focus:px-4 focus:py-2 focus:text-downs-950"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
