'use client'

export function PrintButton({ label = 'Print' }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print-hidden rounded-sm border border-downs-800 px-5 py-2.5 text-sm font-medium text-downs-900 hover:bg-downs-800 hover:text-mist-50"
    >
      {label}
    </button>
  )
}
