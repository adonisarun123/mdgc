'use client'

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
 * Reference-style header: hanging white logo card top-left, uppercase
 * letterspaced nav links, two outlined CTAs on the right. Absolutely
 * positioned over the hero on the homepage; pages below it carry their
 * own dark hero band so the treatment holds site-wide.
 */
export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1500px] items-start justify-between gap-4 px-4 sm:px-6">
        {/* Hanging logo card */}
        <Link
          href="/"
          className="mt-0 flex flex-col items-center bg-white px-4 pb-3 pt-4 text-center shadow-md"
          onClick={() => setOpen(false)}
        >
          <span className="font-serif text-[11px] font-semibold leading-tight tracking-[0.18em] text-inkgreen">
            MERCARA
            <br />
            DOWNS
            <br />
            GOLF CLUB
          </span>
          <span className="mt-2 border-t border-mist-200 pt-1 text-[7px] uppercase tracking-[0.22em] text-mist-600">
            Golf in the Mist · Coorg
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="mt-6 hidden items-center gap-7 xl:flex"
          aria-label="Main navigation"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13px] font-semibold uppercase tracking-[0.14em] text-white drop-shadow-sm transition-colors hover:text-brass-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-5 hidden items-center gap-4 xl:flex">
          <Link href="/membership" className="btn-outline text-white">
            Membership
          </Link>
          <Link href="/visit/plan-your-round" className="btn-outline text-white">
            Plan Your Round
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="mt-6 text-white xl:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
          className="mx-4 mt-2 bg-downs-950/95 px-6 pb-8 pt-4 backdrop-blur xl:hidden"
          aria-label="Mobile navigation"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white hover:text-brass-300"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-4">
            <Link
              href="/membership"
              className="btn-outline text-center text-white"
              onClick={() => setOpen(false)}
            >
              Membership
            </Link>
            <Link
              href="/visit/plan-your-round"
              className="btn-outline text-center text-white"
              onClick={() => setOpen(false)}
            >
              Plan Your Round
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
