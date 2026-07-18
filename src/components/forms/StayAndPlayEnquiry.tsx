'use client'

import { useState } from 'react'
import { RoomEnquiryForm } from './RoomEnquiryForm'
import { inputCls, labelCls } from './shared'

/** Package picker + room enquiry form for the stay-and-play page. */
export function StayAndPlayEnquiry({ packageNames }: { packageNames: string[] }) {
  const [pkg, setPkg] = useState<string>(packageNames[0] ?? 'Custom golf trip')

  return (
    <div>
      {packageNames.length > 0 ? (
        <label className={`${labelCls} mb-6 block max-w-sm`}>
          Package
          <select className={inputCls} value={pkg} onChange={(e) => setPkg(e.target.value)}>
            {packageNames.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
            <option value="Custom golf trip">Custom golf trip — build my own</option>
          </select>
        </label>
      ) : null}
      <RoomEnquiryForm key={pkg} packageName={pkg} submitLabel="Send stay & play enquiry" />
    </div>
  )
}
