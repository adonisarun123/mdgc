import type { Metadata } from 'next'

import { PageHero, Section } from '@/components/ui'
import { MembershipEnquiryForm } from '@/components/forms/MembershipEnquiryForm'

export const metadata: Metadata = {
  title: 'Membership Enquiry',
  description: 'Enquire about membership of Mercara Downs Golf Club.',
}

export default function MembershipEnquiryPage() {
  return (
    <>
      <PageHero
        eyebrow="Membership · Enquiry"
        title="Membership enquiry"
        lead="Tell us a little about yourself and the membership office will be in touch with categories, fees and the application process."
      />
      <Section>
        <div className="max-w-2xl">
          <MembershipEnquiryForm />
        </div>
      </Section>
    </>
  )
}
