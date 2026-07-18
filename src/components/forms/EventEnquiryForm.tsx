'use client'

import { useActionState } from 'react'
import { submitEventEnquiry, type ActionResult } from '@/app/actions/enquiries'
import {
  CheckboxField,
  Field,
  ResultNotice,
  SelectField,
  SubmitButton,
  TextArea,
} from './shared'
import { SpamGuard } from './SpamGuard'

const EVENT_TYPE_OPTIONS = [
  { label: 'Corporate golf day', value: 'corporate-golf-day' },
  { label: 'Conference / meeting', value: 'conference' },
  { label: 'Conference + golf', value: 'conference-and-golf' },
  { label: 'Team offsite (stay + activities)', value: 'corporate-offsite' },
  { label: 'Private dinner or reception', value: 'private-dinner' },
  { label: 'Social evening / entertainment', value: 'social-evening' },
  { label: 'Other', value: 'other' },
]

export function EventEnquiryForm({ defaultEventType }: { defaultEventType?: string }) {
  const [result, formAction, pending] = useActionState<ActionResult | null, FormData>(
    submitEventEnquiry,
    null,
  )

  if (result?.ok) return <ResultNotice result={result} />

  return (
    <form action={formAction} className="grid gap-4 sm:grid-cols-2">
      <SpamGuard />
      <SelectField
        label="Type of event"
        name="eventType"
        required
        options={EVENT_TYPE_OPTIONS}
        defaultValue={defaultEventType}
      />
      <Field label="Organisation" name="organisation" autoComplete="organization" />
      <Field label="Preferred date" name="preferredDate" type="date" required />
      <Field label="Alternative date" name="alternativeDate" type="date" />
      <Field label="Total headcount" name="headcount" type="number" min={1} required />
      <Field label="How many will play golf?" name="golfersCount" type="number" min={0} defaultValue={0} />
      <Field label="Rooms required" name="roomsRequired" type="number" min={0} defaultValue={0} />
      <div className="flex items-end gap-6 pb-1">
        <CheckboxField label="Catering" name="cateringRequired" />
        <CheckboxField label="Bar" name="barRequired" />
      </div>
      <div className="col-span-full">
        <TextArea label="Requirements (format, AV, entertainment…)" name="requirements" />
      </div>
      <Field label="Full name" name="fullName" required autoComplete="name" />
      <Field label="Mobile" name="mobile" type="tel" required autoComplete="tel" />
      <Field label="Email" name="email" type="email" required autoComplete="email" />
      <div className="col-span-full">
        <TextArea label="Anything else?" name="notes" />
      </div>
      <div className="col-span-full space-y-4">
        <ResultNotice result={result} />
        <SubmitButton label="Send event enquiry" pending={pending} />
      </div>
    </form>
  )
}
