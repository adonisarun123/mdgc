import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-start px-4 py-24 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brass-600">
        Out of bounds
      </p>
      <h1 className="mt-3 font-serif text-4xl font-semibold text-downs-900 sm:text-5xl">
        This page isn&rsquo;t on the course
      </h1>
      <p className="mt-4 max-w-xl leading-relaxed text-mist-600">
        The page you were looking for has moved or never existed. Take a drop and play on from one
        of these:
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="/"
          className="rounded-sm bg-brass-400 px-5 py-3 text-sm font-medium text-downs-950 hover:bg-brass-300"
        >
          Home
        </Link>
        <Link
          href="/golf/course-guide"
          className="rounded-sm border border-downs-800 px-5 py-3 text-sm font-medium text-downs-900 hover:bg-downs-800 hover:text-mist-50"
        >
          Course Guide
        </Link>
        <Link
          href="/contact"
          className="rounded-sm border border-downs-800 px-5 py-3 text-sm font-medium text-downs-900 hover:bg-downs-800 hover:text-mist-50"
        >
          Contact
        </Link>
      </div>
    </div>
  )
}
