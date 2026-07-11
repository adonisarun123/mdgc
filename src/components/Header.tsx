'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const NAV = [
  { label: 'Golf', href: '/golf' },
  { label: 'Visit', href: '/visit' },
  { label: 'Tournaments', href: '/tournaments' },
  { label: 'Stay', href: '/stay' },
  { label: 'Clubhouse', href: '/clubhouse' },
  { label: 'Heritage', href: '/club/heritage' },
  { label: 'Contact', href: '/contact' },
]

/**
 * MDGC v3 header: a sticky deep-green bar with a serif wordmark and a
 * brass hairline — deliberately unlike the reference's hanging logo card.
 */
export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-brass-500/40 bg-downs-950/95 text-mist-50 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3.5 sm:px-6">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/images/brand/crest.png"
            alt=""
            aria-hidden="true"
            width={34}
            height={37}
            className="h-9 w-auto"
          />
          <span className="font-serif text-xl font-semibold tracking-tight text-mist-50 group-hover:text-brass-300">
            Mercara Downs
          </span>
          <span className="hidden border-l border-brass-500/50 pl-3 text-[10px] uppercase tracking-[0.28em] text-downs-200 sm:inline">
            Golf Club · Coorg
          </span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Main navigation">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[12px] font-semibold uppercase tracking-[0.16em] text-mist-100 transition-colors hover:text-brass-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 xl:flex">
          <Link
            href="/membership"
            className="text-[11px] uppercase tracking-[0.2em] text-downs-200 hover:text-brass-300"
          >
            Membership
          </Link>
          <Link href="/visit/plan-your-round" className="btn-solid">
            Plan Your Round
          </Link>
        </div>

        <button
          type="button"
          className="text-mist-50 xl:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          className="border-t border-brass-500/30 bg-downs-950 px-4 pb-8 pt-3 xl:hidden"
          aria-label="Mobile navigation"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-3 text-sm font-semibold uppercase tracking-[0.16em] text-mist-100 hover:text-brass-300"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/membership"
            className="block py-3 text-sm font-semibold uppercase tracking-[0.16em] text-mist-100 hover:text-brass-300"
            onClick={() => setOpen(false)}
          >
            Membership
          </Link>
          <Link
            href="/visit/plan-your-round"
            className="btn-solid mt-4 block text-center"
            onClick={() => setOpen(false)}
          >
            Plan Your Round
          </Link>
        </nav>
      )}
    </header>
  )
}
