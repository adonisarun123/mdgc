'use client'

import { useEffect, useState } from 'react'

/** Hidden honeypot + render-timestamp fields. Include inside every public form. */
export function SpamGuard() {
  const [ts, setTs] = useState('')
  useEffect(() => setTs(String(Date.now())), [])
  return (
    <>
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label>
          Leave this field empty
          <input type="text" name="website_url" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name="form_ts" value={ts} />
    </>
  )
}
