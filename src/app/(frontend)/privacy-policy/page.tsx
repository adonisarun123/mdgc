import type { Metadata } from 'next'

import { PageHero, Section } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Mercara Downs Golf Club handles the personal information you share with us.',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy policy"
        lead="What we collect, why, and what we do with it."
      />
      <Section>
        <div className="max-w-3xl space-y-8 leading-7 text-downs-800">
          <div>
            <h2 className="font-serif text-xl font-semibold text-downs-900">What we collect</h2>
            <p className="mt-3">
              When you send the club a tee-time request, a room or dining enquiry, a tournament
              registration or a membership enquiry, we collect the details you enter: your name,
              contact information, and the particulars of your request (such as dates, party size,
              home club or handicap). We do not collect payment details through this website.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl font-semibold text-downs-900">How we use it</h2>
            <p className="mt-3">
              Your details are used to respond to your request and to administer your visit,
              stay, entry or application. They are visible to authorised club staff only, and are
              not sold or shared with third parties for marketing.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl font-semibold text-downs-900">Retention</h2>
            <p className="mt-3">
              Enquiries are retained for the club&rsquo;s operational records. You may ask the
              club to correct or delete your details by writing to the club office.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl font-semibold text-downs-900">Cookies and analytics</h2>
            <p className="mt-3">
              This website does not use advertising cookies. Essential cookies may be used to keep
              the website functioning. If analytics are introduced, this policy will be updated to
              describe them before they are enabled.
            </p>
          </div>
          <div>
            <h2 className="font-serif text-xl font-semibold text-downs-900">Contact</h2>
            <p className="mt-3">
              Questions about this policy may be addressed to the club office — see the contact
              page for current details.
            </p>
          </div>
          <p className="text-sm text-mist-600">Last updated: 10 July 2026.</p>
        </div>
      </Section>
    </>
  )
}
