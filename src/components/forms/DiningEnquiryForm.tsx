'use client'

import { useActionState } from 'react'
import { submitDiningEnquiry, type ActionResult } from '@/app/actions/enquiries'
import {
  Field,
  PLAYER_CATEGORY_OPTIONS,
  ResultNotice,
  SelectField,
  SubmitButton,
  TextArea,
} from './shared'
import { SpamGuard } from './SpamGuard'

export function DiningEnquiryForm() {
  const [result, formAction, pending] = useActionState<ActionResult | null, FormData>(
    submitDiningEnquiry,
    null,
  )

  if (result?.ok) return <ResultNotice result={result} />

  return (
    <form action={formAction} className="grid gap-4 sm:grid-cols-2">
      <SpamGuard />
      <Field label="Date" name="diningDate" type="date" required />
      <Field label="Preferred time" name="preferredTime" placeholder="e.g. 1:00 p.m." required />
      <Field label="Party size" name="partySize" type="number" min={1} defaultValue={2} required />
      <SelectField label="Guest category" name="guestCategory" required options={PLAYER_CATEGORY_OPTIONS} />
      <Field label="Full name" name="fullName" required autoComplete="name" />
      <Field label="Mobile" name="mobile" type="tel" required autoComplete="tel" />
      <Field label="Email" name="email" type="email" required autoComplete="email" />
      <div className="col-span-full">
        <TextArea label="Dietary notes" name="dietaryNotes" />
      </div>
      <div className="col-span-full">
        <TextArea label="Notes" name="notes" />
      </div>
      <div className="col-span-full space-y-4">
        <ResultNotice result={result} />
        <SubmitButton label="Request a table" pending={pending} />
      </div>
    </form>
  )
}
