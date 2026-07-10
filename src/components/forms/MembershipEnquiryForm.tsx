'use client'

import { useActionState } from 'react'
import { submitMembershipEnquiry, type ActionResult } from '@/app/actions/enquiries'
import { Field, ResultNotice, SubmitButton, TextArea } from './shared'
import { SpamGuard } from './SpamGuard'

export function MembershipEnquiryForm() {
  const [result, formAction, pending] = useActionState<ActionResult | null, FormData>(
    submitMembershipEnquiry,
    null,
  )

  if (result?.ok) return <ResultNotice result={result} />

  return (
    <form action={formAction} className="grid gap-4 sm:grid-cols-2">
      <SpamGuard />
      <Field label="Full name" name="fullName" required autoComplete="name" />
      <Field label="Mobile" name="mobile" type="tel" required autoComplete="tel" />
      <Field label="Email" name="email" type="email" required autoComplete="email" />
      <Field label="City" name="city" />
      <Field label="Home club (if any)" name="homeClub" />
      <Field label="Handicap (if any)" name="handicap" />
      <div className="col-span-full">
        <TextArea label="Message" name="message" rows={4} />
      </div>
      <div className="col-span-full space-y-4">
        <ResultNotice result={result} />
        <SubmitButton label="Send membership enquiry" pending={pending} />
      </div>
    </form>
  )
}
