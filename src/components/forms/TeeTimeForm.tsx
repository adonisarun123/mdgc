'use client'

import { useActionState, useState } from 'react'
import { submitTeeTimeRequest, type ActionResult } from '@/app/actions/enquiries'
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

const STEPS = ['Player category', 'Round information', 'Golfer details', 'Review & submit']

export function TeeTimeForm() {
  const [result, formAction, pending] = useActionState<ActionResult | null, FormData>(
    submitTeeTimeRequest,
    null,
  )
  const [step, setStep] = useState(0)
  const [category, setCategory] = useState('visitor')

  if (result?.ok) {
    return <ResultNotice result={result} />
  }

  return (
    <form action={formAction} className="space-y-8">
      <SpamGuard />
      <ol className="flex flex-wrap gap-2" aria-label="Form steps">
        {STEPS.map((s, i) => (
          <li
            key={s}
            className={`rounded-sm px-3 py-1.5 text-xs font-medium ${
              i === step
                ? 'bg-downs-800 text-mist-50'
                : i < step
                  ? 'bg-downs-100 text-downs-800'
                  : 'bg-mist-100 text-mist-600'
            }`}
            aria-current={i === step ? 'step' : undefined}
          >
            {i + 1}. {s}
          </li>
        ))}
      </ol>

      {/* Step 1 — player category */}
      <fieldset className={step === 0 ? 'space-y-3' : 'hidden'}>
        <legend className="font-serif text-xl font-semibold text-downs-900">Who is playing?</legend>
        {PLAYER_CATEGORY_OPTIONS.map((o) => (
          <label
            key={o.value}
            className={`flex cursor-pointer items-center gap-3 rounded-sm border p-4 text-sm ${
              category === o.value ? 'border-brass-500 bg-downs-50' : 'border-mist-200 bg-white'
            }`}
          >
            <input
              type="radio"
              name="playerCategory"
              value={o.value}
              checked={category === o.value}
              onChange={() => setCategory(o.value)}
              className="h-4 w-4 text-brass-500 focus:ring-brass-500"
            />
            {o.label}
          </label>
        ))}
      </fieldset>

      {/* Step 2 — round information */}
      <fieldset className={step === 1 ? 'grid gap-4 sm:grid-cols-2' : 'hidden'}>
        <legend className="col-span-full font-serif text-xl font-semibold text-downs-900">
          Round information
        </legend>
        <Field label="Preferred date" name="preferredDate" type="date" required />
        <Field label="Alternative date" name="alternativeDate" type="date" />
        <Field label="Number of golfers" name="numberOfGolfers" type="number" min={1} max={8} defaultValue={2} required />
        <SelectField
          label="Holes"
          name="holes"
          required
          defaultValue="18"
          options={[
            { label: '18 holes', value: '18' },
            { label: '9 holes', value: '9' },
          ]}
        />
        <Field label="Preferred time range" name="preferredTimeRange" placeholder="e.g. 7–9 a.m." />
        <div className="flex flex-col justify-end gap-2">
          <CheckboxField label="Caddy required" name="caddyRequired" />
          <CheckboxField label="Buggy required" name="buggyRequired" />
          <CheckboxField label="Rental clubs required" name="rentalClubsRequired" />
        </div>
      </fieldset>

      {/* Step 3 — golfer details */}
      <fieldset className={step === 2 ? 'grid gap-4 sm:grid-cols-2' : 'hidden'}>
        <legend className="col-span-full font-serif text-xl font-semibold text-downs-900">
          Golfer details
        </legend>
        <Field label="Full name" name="fullName" required autoComplete="name" />
        <Field label="Mobile" name="mobile" type="tel" required autoComplete="tel" />
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field label="Home club" name="homeClub" />
        <Field label="Handicap" name="handicap" placeholder="e.g. 14.2" />
        {category === 'affiliated' ? (
          <div className="col-span-full">
            <TextArea label="Affiliation details (home club and membership number)" name="affiliationDetails" />
          </div>
        ) : null}
        {category === 'member-guest' ? (
          <Field label="Member host" name="memberHost" required />
        ) : null}
        <div className="col-span-full">
          <TextArea label="Notes" name="notes" />
        </div>
      </fieldset>

      {/* Step 4 — confirmation framing */}
      <div className={step === 3 ? 'space-y-4' : 'hidden'}>
        <h3 className="font-serif text-xl font-semibold text-downs-900">Before you submit</h3>
        <p className="rounded-sm border border-brass-300 bg-brass-300/10 p-4 text-sm leading-relaxed text-downs-800">
          This is a <strong>request awaiting confirmation</strong>, not an instant booking. The club
          will contact you on the details you provided to confirm your tee time.
        </p>
        <ResultNotice result={result} />
      </div>

      <div className="flex items-center gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="rounded-sm border border-downs-800 px-5 py-3 text-sm font-medium text-downs-900 hover:bg-downs-50"
          >
            Back
          </button>
        ) : null}
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="rounded-sm bg-downs-800 px-6 py-3 text-sm font-medium text-mist-50 hover:bg-downs-700"
          >
            Continue
          </button>
        ) : (
          <SubmitButton label="Submit tee-time request" pending={pending} />
        )}
      </div>
    </form>
  )
}
