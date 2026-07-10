import Link from 'next/link'
import React from 'react'

export function Section({
  children,
  className = '',
  tinted = false,
}: {
  children: React.ReactNode
  className?: string
  tinted?: boolean
}) {
  return (
    <section className={`${tinted ? 'bg-downs-50' : ''} ${className}`}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-20">{children}</div>
    </section>
  )
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brass-600">{children}</p>
  )
}

export function Heading({
  children,
  as: Tag = 'h2',
}: {
  children: React.ReactNode
  as?: 'h1' | 'h2' | 'h3'
}) {
  const sizes = { h1: 'text-4xl sm:text-5xl', h2: 'text-3xl sm:text-4xl', h3: 'text-2xl' }
  return (
    <Tag className={`mt-2 font-serif font-semibold leading-tight text-downs-900 ${sizes[Tag]}`}>
      {children}
    </Tag>
  )
}

export function Lead({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mist-600">{children}</p>
}

export function ButtonLink({
  href,
  children,
  variant = 'primary',
}: {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
}) {
  const styles = {
    primary: 'bg-brass-400 text-downs-950 hover:bg-brass-300',
    secondary: 'border border-downs-800 text-downs-900 hover:bg-downs-800 hover:text-mist-50',
    ghost: 'text-downs-800 underline underline-offset-4 hover:text-brass-600',
  }
  return (
    <Link
      href={href}
      className={`inline-block rounded-sm px-5 py-3 text-sm font-medium transition-colors ${styles[variant]}`}
    >
      {children}
    </Link>
  )
}

export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string
  title: string
  lead?: string
}) {
  return (
    <div className="bg-downs-950 text-mist-50">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-36 sm:px-6 lg:pb-20 lg:pt-40">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brass-300">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl font-semibold leading-tight sm:text-5xl">
          {title}
        </h1>
        {lead ? <p className="mt-5 max-w-2xl text-lg leading-relaxed text-downs-200">{lead}</p> : null}
      </div>
    </div>
  )
}

/**
 * Wraps content that has not yet been confirmed by the club.
 * Renders nothing publicly unless `showPlaceholder` is set, in which case a
 * neutral "contact the club" line appears instead of the unverified fact.
 * The internal [REQUIRES MDGC VERIFICATION] label is never rendered.
 */
export function Unverified({
  verified,
  children,
  fallback,
}: {
  verified: boolean
  children: React.ReactNode
  fallback?: React.ReactNode
}) {
  if (verified) return <>{children}</>
  return fallback ? <>{fallback}</> : null
}
