import type { CourseStatus } from '@/payload-types'

const AVAILABILITY_LABEL: Record<string, string> = {
  available: 'Available',
  limited: 'Limited',
  unavailable: 'Unavailable',
  open: 'Open',
  closed: 'Closed',
  restricted: 'Open — restrictions apply',
}

function Dot({ tone }: { tone: 'good' | 'warn' | 'bad' }) {
  const colors = { good: 'bg-downs-500', warn: 'bg-brass-400', bad: 'bg-red-700' }
  return <span aria-hidden="true" className={`inline-block h-2 w-2 rounded-full ${colors[tone]}`} />
}

function toneFor(value: string | null | undefined): 'good' | 'warn' | 'bad' {
  if (value === 'open' || value === 'available') return 'good'
  if (value === 'limited' || value === 'restricted') return 'warn'
  return 'bad'
}

export function TodayAtDowns({ status }: { status: CourseStatus }) {
  const rows: { label: string; value: string | null | undefined }[] = [
    { label: 'Course', value: status.courseStatus },
    { label: 'Caddies', value: status.caddyAvailability },
    { label: 'Buggies', value: status.buggyAvailability },
    { label: 'Practice area', value: status.practiceAreaStatus },
    { label: 'Dining', value: status.diningStatus },
  ]

  const updated = status.updatedAt
    ? new Date(status.updatedAt).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Asia/Kolkata',
      })
    : null

  return (
    <div className="rounded-sm border border-downs-100 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-serif text-xl font-semibold text-downs-900">Today at Mercara Downs</h2>
        {updated ? <p className="text-xs text-mist-600">Last updated: {updated} IST</p> : null}
      </div>

      <dl className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center gap-2">
            <Dot tone={toneFor(row.value)} />
            <dt className="text-sm text-mist-600">{row.label}:</dt>
            <dd className="text-sm font-medium text-downs-900">
              {AVAILABILITY_LABEL[row.value ?? ''] ?? '—'}
            </dd>
          </div>
        ))}
      </dl>

      {status.firstTeeStatus ? (
        <p className="mt-4 text-sm text-downs-800">{status.firstTeeStatus}</p>
      ) : null}
      {status.weatherNote ? <p className="mt-1 text-sm text-mist-600">{status.weatherNote}</p> : null}
      {status.noticeToGolfers ? (
        <p className="mt-3 border-l-2 border-brass-400 pl-3 text-sm text-downs-800">
          {status.noticeToGolfers}
        </p>
      ) : null}
    </div>
  )
}
