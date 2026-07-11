import Link from 'next/link'

/**
 * Reference-style footer: light-grey band, Cinzel column headings,
 * grey sans body with bold phone links, slim bottom bar with social
 * icons left and small-caps copyright right.
 */
export function Footer() {
  return (
    <footer className="bg-footer text-charcoal">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <h2 className="font-serif text-xl font-semibold tracking-wide text-charcoal">Address</h2>
          <p className="mt-4 text-[15px] leading-7 text-bodygray">
            Mercara Downs Golf Club,
            <br />
            P B No. 79, Madikeri 571 201,
            <br />
            Kodagu district,
            <br />
            Karnataka, India.
          </p>
          <Link
            href="/visit/directions"
            className="mt-1 inline-block text-[15px] text-bodygray underline underline-offset-4 hover:text-charcoal"
          >
            Get Directions
          </Link>
        </div>

        <div>
          <h2 className="font-serif text-xl font-semibold tracking-wide text-charcoal">
            Reservations
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-bodygray">
            Tee times:{' '}
            <Link href="/visit/plan-your-round" className="font-semibold text-charcoal hover:underline">
              Plan Your Round
            </Link>
            <br />
            Dining:{' '}
            <Link href="/clubhouse/dining" className="font-semibold text-charcoal hover:underline">
              Request a Table
            </Link>
          </p>
          <h2 className="mt-8 font-serif text-xl font-semibold tracking-wide text-charcoal">
            Downs Retreat
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-bodygray">
            Rooms:{' '}
            <Link href="/stay" className="font-semibold text-charcoal hover:underline">
              Availability Enquiry
            </Link>
          </p>
        </div>

        <div>
          <h2 className="font-serif text-xl font-semibold tracking-wide text-charcoal">
            Membership
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-bodygray">
            Categories, privileges and the application process.
          </p>
          <Link
            href="/membership/enquiry"
            className="mt-2 inline-block text-[15px] font-semibold text-charcoal underline underline-offset-4"
          >
            Membership Enquiry
          </Link>
        </div>

        <div>
          <h2 className="font-serif text-xl font-semibold tracking-wide text-charcoal">The Club</h2>
          <ul className="mt-4 space-y-2 text-[15px] leading-7 text-bodygray">
            <li>
              <Link href="/golf/course-guide" className="hover:text-charcoal">Course Guide</Link>
            </li>
            <li>
              <Link href="/golf/scorecard" className="hover:text-charcoal">Scorecard</Link>
            </li>
            <li>
              <Link href="/club/heritage" className="hover:text-charcoal">Heritage</Link>
            </li>
            <li>
              <Link href="/club/news" className="hover:text-charcoal">Club News</Link>
            </li>
            <li>
              <Link href="/club/committee" className="hover:text-charcoal">Committee</Link>
            </li>
            <li>
              <Link href="/club/newsletters" className="hover:text-charcoal">Newsletters</Link>
            </li>
            <li>
              <Link href="/admin" className="hover:text-charcoal">Member Login</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-mist-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-6 sm:flex-row sm:justify-between sm:px-6">
          <p className="text-xs uppercase tracking-[0.18em] text-mist-600">
            Eighteen holes in the hills of Coorg
          </p>
          <p className="flex gap-5 text-xs text-mist-600">
            <Link href="/visit/faqs" className="hover:text-charcoal">FAQs</Link>
            <Link href="/privacy-policy" className="hover:text-charcoal">Privacy</Link>
            <Link href="/terms" className="hover:text-charcoal">Terms</Link>
          </p>
          <p className="font-serif text-sm tracking-[0.12em] text-charcoal">
            {new Date().getFullYear()} Mercara Downs Golf Club
          </p>
        </div>
      </div>
    </footer>
  )
}
