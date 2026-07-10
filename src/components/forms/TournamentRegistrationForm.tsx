'use client'

import { useActionState } from 'react'
import { submitTournamentRegistration, type ActionResult } from '@/app/actions/enquiries'
import { Field, ResultNotice, SelectField, SubmitButton, TextArea } from './shared'
import { SpamGuard } from './SpamGuard'

export function TournamentRegistrationForm({
  tournaments,
}: {
  tournaments: { id: number; name: string }[]
}) {
  const [result, formAction, pending] = useActionState<ActionResult | null, FormData>(
    submitTournamentRegistration,
    null,
  )

  if (result?.ok) return <ResultNotice result={result} />

  return (
    <form action={formAction} className="grid gap-4 sm:grid-cols-2">
      <SpamGuard />
      <div className="col-span-full">
        <SelectField
          label="Tournament"
          name="tournament"
          required
          options={tournaments.map((t) => ({ label: t.name, value: String(t.id) }))}
        />
      </div>
      <Field label="Full name" name="fullName" required autoComplete="name" />
      <Field label="Mobile" name="mobile" type="tel" required autoComplete="tel" />
      <Field label="Email" name="email" type="email" required autoComplete="email" />
      <Field label="Home club" name="homeClub" />
      <Field label="Handicap" name="handicap" required placeholder="e.g. 14.2" />
      <div className="col-span-full">
        <TextArea label="Affiliation details (home club and membership number)" name="affiliationDetails" />
      </div>
      <div className="col-span-full">
        <TextArea label="Notes" name="notes" />
      </div>
      <div className="col-span-full space-y-4">
        <p className="rounded-sm border border-brass-300 bg-brass-300/10 p-4 text-sm leading-relaxed text-downs-800">
          This is an <strong>entry request</strong>. Your place is confirmed only when the
          tournament office replies — entry fees and eligibility are settled at confirmation.
        </p>
        <ResultNotice result={result} />
        <SubmitButton label="Request entry" pending={pending} />
      </div>
    </form>
  )
}
