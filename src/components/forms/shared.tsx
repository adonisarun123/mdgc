import React from 'react'
import type { ActionResult } from '@/app/actions/enquiries'

export const inputCls =
  'mt-1 block w-full rounded-sm border border-mist-200 bg-white px-3 py-2.5 text-sm text-downs-950 shadow-sm focus:border-brass-500 focus:outline-none focus:ring-1 focus:ring-brass-500'

export const labelCls = 'block text-sm font-medium text-downs-900'

export function Field({
  label,
  name,
  type = 'text',
  required,
  ...rest
}: {
  label: string
  name: string
  type?: string
  required?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={labelCls}>
      {label}
      {required ? <span aria-hidden="true" className="text-brass-600"> *</span> : null}
      <input name={name} type={type} required={required} className={inputCls} {...rest} />
    </label>
  )
}

export function SelectField({
  label,
  name,
  options,
  required,
  defaultValue,
}: {
  label: string
  name: string
  options: { label: string; value: string }[]
  required?: boolean
  defaultValue?: string
}) {
  return (
    <label className={labelCls}>
      {label}
      {required ? <span aria-hidden="true" className="text-brass-600"> *</span> : null}
      <select name={name} required={required} defaultValue={defaultValue} className={inputCls}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export function TextArea({
  label,
  name,
  rows = 3,
}: {
  label: string
  name: string
  rows?: number
}) {
  return (
    <label className={labelCls}>
      {label}
      <textarea name={name} rows={rows} className={inputCls} />
    </label>
  )
}

export function CheckboxField({
  label,
  name,
  defaultChecked,
}: {
  label: string
  name: string
  defaultChecked?: boolean
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-downs-900">
      <input
        type="checkbox"
        name={name}
        value="true"
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded-sm border-mist-200 text-brass-500 focus:ring-brass-500"
      />
      {label}
    </label>
  )
}

export function ResultNotice({ result }: { result: ActionResult | null }) {
  if (!result) return null
  return (
    <p
      role="status"
      className={`rounded-sm border p-4 text-sm leading-relaxed ${
        result.ok
          ? 'border-downs-200 bg-downs-50 text-downs-800'
          : 'border-red-200 bg-red-50 text-red-800'
      }`}
    >
      {result.ok ? result.message : result.error}
    </p>
  )
}

export const PLAYER_CATEGORY_OPTIONS = [
  { label: 'MDGC Member', value: 'member' },
  { label: 'Affiliated-Club Member', value: 'affiliated' },
  { label: 'Member Guest', value: 'member-guest' },
  { label: 'Independent Visitor', value: 'visitor' },
  { label: 'Tournament Participant', value: 'tournament' },
]

export function SubmitButton({ label, pending }: { label: string; pending: boolean }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-sm bg-brass-400 px-6 py-3 text-sm font-medium text-downs-950 transition-colors hover:bg-brass-300 disabled:opacity-60"
    >
      {pending ? 'Submitting…' : label}
    </button>
  )
}
