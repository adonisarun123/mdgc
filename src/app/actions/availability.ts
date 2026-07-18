'use server'

import { z } from 'zod'
import { getAvailability, type AvailabilityResult } from '@/lib/availability'

export type AvailabilityActionResult =
  | { ok: true; result: AvailabilityResult }
  | { ok: false; error: string }

const schema = z.object({
  checkInDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please choose a check-in date'),
  checkOutDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Please choose a check-out date'),
})

const MAX_NIGHTS = 30

export async function checkAvailability(
  _prev: AvailabilityActionResult | null,
  formData: FormData,
): Promise<AvailabilityActionResult> {
  const parsed = schema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Please choose your dates.' }
  }
  const { checkInDate, checkOutDate } = parsed.data

  const today = new Date().toISOString().slice(0, 10)
  if (checkInDate < today) return { ok: false, error: 'Check-in cannot be in the past.' }
  if (checkOutDate <= checkInDate) return { ok: false, error: 'Check-out must be after check-in.' }

  const nights = Math.round(
    (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / 86_400_000,
  )
  if (nights > MAX_NIGHTS) {
    return { ok: false, error: `For stays longer than ${MAX_NIGHTS} nights, please contact the club directly.` }
  }

  try {
    const result = await getAvailability(checkInDate, checkOutDate)
    return { ok: true, result }
  } catch {
    return { ok: false, error: 'Could not check availability just now. Please try again or send an enquiry below.' }
  }
}
