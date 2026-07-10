'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV = [
  { label: 'Golf', href: '/golf' },
  { label: 'Visit', href: '/visit' },
  { label: 'Membership', href: '/membership' },
  { label: 'Tournaments', href: '/tournaments' },
  { label: 'Stay', href: '/stay' },
  { label: 'Clubhouse', href: '/clubhouse' },
  { label: 'Heritage', href: '/club/heritage' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-downs-800/40 bg-downs-950/95 text-mist-50 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="font-serif text-lg font-semibold tracking-wide text-mist-50 group-hover:text-brass-300">
            Mercara Downs
          </span>
          <span className="hidden text-xs uppercase tracking-[0.2em] text-downs-200 sm:inline">
            Golf Club
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm tracking-wide transition-colors hover:text-brass-300 ${
                pathname.startsWith(item.href) ? 'text-brass-300' : 'text-mist-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/visit/plan-your-round"
            className="rounded-sm bg-brass-400 px-4 py-2 text-sm font-medium text-downs-950 transition-colors hover:bg-brass-300"
          >
            Plan Your Round
          </Link>
          <Link
            href="/admin"
            className="text-xs uppercase tracking-widest text-downs-200 hover:text-mist-50"
          >
            Member Login
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden"
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
          className="border-t border-downs-800/40 bg-downs-950 px-4 pb-6 pt-2 lg:hidden"
          aria-label="Mobile navigation"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block py-3 text-base text-mist-100 hover:text-brass-300"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/visit/plan-your-round"
            className="mt-3 block rounded-sm bg-brass-400 px-4 py-3 text-center font-medium text-downs-950"
            onClick={() => setOpen(false)}
          >
            Plan Your Round
          </Link>
          <Link
            href="/admin"
            className="mt-3 block text-center text-xs uppercase tracking-widest text-downs-200"
            onClick={() => setOpen(false)}
          >
            Member Login
          </Link>
        </nav>
      )}
    </header>
  )
}
