import Link from 'next/link'

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: 'Golf',
    links: [
      { label: 'Course Guide', href: '/golf/course-guide' },
      { label: 'Scorecard', href: '/golf/scorecard' },
      { label: 'Local Rules', href: '/golf/local-rules' },
      { label: 'Rules & Etiquette', href: '/golf/rules-and-etiquette' },
    ],
  },
  {
    heading: 'Visit',
    links: [
      { label: 'Plan Your Round', href: '/visit/plan-your-round' },
      { label: 'Green Fees', href: '/visit/green-fees' },
      { label: 'Dress Code', href: '/visit/dress-code' },
      { label: 'Directions', href: '/visit/directions' },
    ],
  },
  {
    heading: 'Club',
    links: [
      { label: 'Membership', href: '/membership' },
      { label: 'Affiliated Clubs', href: '/membership/affiliated-clubs' },
      { label: 'Committee', href: '/club/committee' },
      { label: 'Newsletters', href: '/club/newsletters' },
    ],
  },
  {
    heading: 'Stay & Dine',
    links: [
      { label: 'Downs Retreat', href: '/stay' },
      { label: 'Dining', href: '/clubhouse/dining' },
      { label: 'Gallery', href: '/clubhouse/gallery' },
      { label: 'Contact', href: '/contact' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-downs-950 text-mist-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-6">
        <div className="lg:col-span-2">
          <p className="font-serif text-xl font-semibold text-mist-50">Mercara Downs Golf Club</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-downs-200">
            Eighteen holes shaped by the hills, weather and sporting traditions of Coorg. Golf has
            been played on the Mercara Downs since the late nineteenth century.
          </p>
          <p className="mt-4 text-sm text-downs-200">P B No. 79, Madikeri 571 201, Kodagu, Karnataka</p>
        </div>
        {COLUMNS.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brass-300">
              {col.heading}
            </p>
            <ul className="mt-4 space-y-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-mist-100 hover:text-brass-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-downs-800/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-downs-200 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} Mercara Downs Golf Club. All rights reserved.</p>
          <p>
            <Link href="/admin" className="hover:text-brass-300">
              Member Login
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
