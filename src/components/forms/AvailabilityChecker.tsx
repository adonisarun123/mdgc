'use client'

import { useActionState, useState } from 'react'
import { checkAvailability, type AvailabilityActionResult } from '@/app/actions/availability'
import type { RoomAvailability } from '@/lib/availability'
import { RoomEnquiryForm } from './RoomEnquiryForm'
import { Field, SubmitButton } from './shared'

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Public availability checker + booking request, in one flow:
 *
 *   1. choose dates → live availability from the club's booking register
 *   2. choose a room category → the request form opens, prefilled
 *   3. submit → lands in Room Enquiries; staff confirm and enter the
 *      booking in the register
 *
 * Availability is presented honestly: it reflects the register at the time
 * of asking, and a request is never described as a confirmed booking.
 */
export function AvailabilityChecker() {
  const [result, formAction, pending] = useActionState<AvailabilityActionResult | null, FormData>(
    checkAvailability,
    null,
  )
  const [selected, setSelected] = useState<RoomAvailability | null>(null)

  const ok = result?.ok ? result.result : null

  return (
    <div>
      <form action={formAction} className="grid gap-4 sm:grid-cols-3" onSubmit={() => setSelected(null)}>
        <Field label="Check-in date" name="checkInDate" type="date" required />
        <Field label="Check-out date" name="checkOutDate" type="date" required />
        <div className="flex items-end">
          <SubmitButton label="Check availability" pending={pending} />
        </div>
      </form>

      {result && !result.ok ? (
        <p role="status" className="mt-6 rounded-sm border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {result.error}
        </p>
      ) : null}

      {ok ? (
        <div className="mt-8">
          <p className="text-sm text-mist-600">
            {`${ok.nights} night${ok.nights === 1 ? '' : 's'} · ${formatDate(ok.checkIn)} to ${formatDate(ok.checkOut)} — availability from the club's booking register. Your request is confirmed by the Downs Retreat team, not automatically.`}
          </p>

          {ok.rooms.length === 0 ? (
            <p className="mt-4 max-w-2xl rounded-sm border border-downs-100 bg-downs-50 p-4 text-sm leading-relaxed text-downs-800">
              Room categories are being confirmed with the club and live availability is not yet
              published. Send an enquiry below with your dates and the team will reply with
              availability and rates.
            </p>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ok.rooms.map((room) => {
                const free = room.availableUnits > 0
                const isSelected = selected?.roomId === room.roomId
                return (
                  <div
                    key={room.roomId}
                    className={`rounded-sm border bg-white p-5 ${
                      isSelected ? 'border-brass-500 ring-1 ring-brass-500' : 'border-downs-100'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-serif text-lg font-semibold text-downs-900">{room.roomName}</p>
                      <span
                        className={`whitespace-nowrap rounded-sm px-2 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                          free ? 'bg-downs-50 text-downs-800' : 'bg-mist-100 text-mist-600'
                        }`}
                      >
                        {free
                          ? `${room.availableUnits} available`
                          : 'Fully booked'}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-mist-600">
                      Sleeps {room.capacity}
                      {room.view === 'course' ? ' · Course view' : room.view === 'garden' ? ' · Garden view' : ''}
                    </p>
                    <p className="mt-3 text-sm font-medium text-downs-900">
                      {room.tariff
                        ? `₹${room.tariff.amount.toLocaleString('en-IN')} per night ${room.tariff.taxNote ?? 'plus applicable taxes'}`
                        : 'Rates on request'}
                    </p>
                    {free ? (
                      <button
                        type="button"
                        onClick={() => setSelected(room)}
                        className="mt-4 w-full rounded-sm border border-downs-800 px-4 py-2.5 text-sm font-medium text-downs-900 transition-colors hover:bg-downs-800 hover:text-mist-50"
                      >
                        {isSelected ? 'Selected' : 'Request this room'}
                      </button>
                    ) : (
                      <p className="mt-4 text-xs text-mist-600">
                        Try different dates, or send an enquiry — the team may be able to help.
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          <div className="mt-12 max-w-3xl">
            <h3 className="font-serif text-2xl font-semibold text-downs-900">
              {selected ? `Request ${selected.roomName}` : 'Send a booking request'}
            </h3>
            <p className="mt-2 mb-6 text-sm text-mist-600">
              The Downs Retreat team will reply to confirm your booking, rates and anything to
              arrange for golf or dining.
            </p>
            <RoomEnquiryForm
              key={`${ok.checkIn}-${ok.checkOut}-${selected?.roomId ?? 'any'}`}
              preferredRoomId={selected?.roomId}
              preferredRoomName={selected?.roomName}
              defaultCheckIn={ok.checkIn}
              defaultCheckOut={ok.checkOut}
              submitLabel="Send booking request"
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}
