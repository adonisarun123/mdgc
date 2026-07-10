'use client'

import { useActionState } from 'react'
import { submitRoomEnquiry, type ActionResult } from '@/app/actions/enquiries'
import {
  CheckboxField,
  Field,
  PLAYER_CATEGORY_OPTIONS,
  ResultNotice,
  SelectField,
  SubmitButton,
  TextArea,
} from './shared'
import { SpamGuard } from './SpamGuard'

export function RoomEnquiryForm() {
  const [result, formAction, pending] = useActionState<ActionResult | null, FormData>(
    submitRoomEnquiry,
    null,
  )

  if (result?.ok) return <ResultNotice result={result} />

  return (
    <form action={formAction} className="grid gap-4 sm:grid-cols-2">
      <SpamGuard />
      <Field label="Check-in date" name="checkInDate" type="date" required />
      <Field label="Check-out date" name="checkOutDate" type="date" required />
      <Field label="Number of rooms" name="numberOfRooms" type="number" min={1} defaultValue={1} required />
      <SelectField label="Guest category" name="guestCategory" required options={PLAYER_CATEGORY_OPTIONS} />
      <Field label="Adults" name="adults" type="number" min={1} defaultValue={2} required />
      <Field label="Children" name="children" type="number" min={0} defaultValue={0} />
      <div className="col-span-full flex gap-6">
        <CheckboxField label="Golf during stay" name="golfRequired" />
        <CheckboxField label="Dining required" name="diningRequired" />
      </div>
      <Field label="Full name" name="fullName" required autoComplete="name" />
      <Field label="Mobile" name="mobile" type="tel" required autoComplete="tel" />
      <Field label="Email" name="email" type="email" required autoComplete="email" />
      <div className="col-span-full">
        <TextArea label="Notes" name="notes" />
      </div>
      <div className="col-span-full space-y-4">
        <ResultNotice result={result} />
        <SubmitButton label="Send availability enquiry" pending={pending} />
      </div>
    </form>
  )
}
