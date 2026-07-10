'use server'

import { z } from 'zod'
import { getPayloadClient } from '@/lib/payload'

export type ActionResult = { ok: true; message: string } | { ok: false; error: string }

const playerCategory = z.enum(['member', 'affiliated', 'member-guest', 'visitor', 'tournament'])

const contact = {
  fullName: z.string().min(2, 'Please enter your full name'),
  mobile: z.string().min(8, 'Please enter a valid mobile number'),
  email: z.string().email('Please enter a valid email address'),
}

/* ---------------- Tee-time request ---------------- */

const teeTimeSchema = z.object({
  playerCategory,
  preferredDate: z.string().min(1, 'Preferred date is required'),
  alternativeDate: z.string().optional(),
  numberOfGolfers: z.coerce.number().int().min(1).max(8),
  holes: z.enum(['9', '18']),
  preferredTimeRange: z.string().optional(),
  caddyRequired: z.coerce.boolean().optional(),
  buggyRequired: z.coerce.boolean().optional(),
  rentalClubsRequired: z.coerce.boolean().optional(),
  ...contact,
  homeClub: z.string().optional(),
  handicap: z.string().optional(),
  affiliationDetails: z.string().optional(),
  memberHost: z.string().optional(),
  notes: z.string().optional(),
})

export async function submitTeeTimeRequest(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const parsed = teeTimeSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Please check the form and try again.' }
  }
  const d = parsed.data
  if (d.playerCategory === 'member-guest' && !d.memberHost) {
    return { ok: false, error: 'Member guests must name their member host.' }
  }
  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'tee-time-requests',
      data: {
        ...d,
        caddyRequired: Boolean(d.caddyRequired),
        buggyRequired: Boolean(d.buggyRequired),
        rentalClubsRequired: Boolean(d.rentalClubsRequired),
        enquiryStatus: 'new',
      },
    })
    return {
      ok: true,
      // Never described as a confirmed booking — this is a request.
      message:
        'Your tee-time request has been received. This is a request awaiting confirmation — the club will contact you to confirm availability.',
    }
  } catch {
    return { ok: false, error: 'Something went wrong submitting your request. Please try again or call the club.' }
  }
}

/* ---------------- Room enquiry ---------------- */

const roomSchema = z.object({
  checkInDate: z.string().min(1, 'Check-in date is required'),
  checkOutDate: z.string().min(1, 'Check-out date is required'),
  numberOfRooms: z.coerce.number().int().min(1),
  adults: z.coerce.number().int().min(1),
  children: z.coerce.number().int().min(0).optional(),
  guestCategory: playerCategory,
  golfRequired: z.coerce.boolean().optional(),
  diningRequired: z.coerce.boolean().optional(),
  ...contact,
  notes: z.string().optional(),
})

export async function submitRoomEnquiry(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const parsed = roomSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Please check the form and try again.' }
  }
  try {
    const payload = await getPayloadClient()
    const d = parsed.data
    await payload.create({
      collection: 'room-enquiries',
      data: {
        ...d,
        children: d.children ?? 0,
        golfRequired: Boolean(d.golfRequired),
        diningRequired: Boolean(d.diningRequired),
        enquiryStatus: 'new',
      },
    })
    return {
      ok: true,
      message:
        'Your availability enquiry has been received. The Downs Retreat team will reply with availability and rates.',
    }
  } catch {
    return { ok: false, error: 'Something went wrong submitting your enquiry. Please try again or call the club.' }
  }
}

/* ---------------- Dining enquiry ---------------- */

const diningSchema = z.object({
  diningDate: z.string().min(1, 'Date is required'),
  preferredTime: z.string().min(1, 'Preferred time is required'),
  partySize: z.coerce.number().int().min(1),
  guestCategory: playerCategory,
  ...contact,
  dietaryNotes: z.string().optional(),
  notes: z.string().optional(),
})

export async function submitDiningEnquiry(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const parsed = diningSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Please check the form and try again.' }
  }
  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'dining-enquiries',
      data: { ...parsed.data, enquiryStatus: 'new' },
    })
    return {
      ok: true,
      message:
        'Your table request has been received. Note that food and tables must be ordered at least one hour ahead — the dining team will confirm.',
    }
  } catch {
    return { ok: false, error: 'Something went wrong submitting your request. Please try again or call the club.' }
  }
}

/* ---------------- Membership enquiry ---------------- */

const membershipSchema = z.object({
  ...contact,
  city: z.string().optional(),
  homeClub: z.string().optional(),
  handicap: z.string().optional(),
  message: z.string().optional(),
})

export async function submitMembershipEnquiry(_prev: ActionResult | null, formData: FormData): Promise<ActionResult> {
  const parsed = membershipSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? 'Please check the form and try again.' }
  }
  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'membership-enquiries',
      data: { ...parsed.data, enquiryStatus: 'new' },
    })
    return { ok: true, message: 'Your membership enquiry has been received. The membership office will be in touch.' }
  } catch {
    return { ok: false, error: 'Something went wrong submitting your enquiry. Please try again or call the club.' }
  }
}
