import { getPayloadClient } from '@/lib/payload'

/** Booking statuses that occupy rooms. */
const OCCUPYING_STATUSES = ['tentative', 'confirmed', 'checked-in', 'maintenance-block'] as const

export type RoomAvailability = {
  roomId: number
  roomName: string
  capacity: number
  bedType?: string | null
  view?: string | null
  description?: string | null
  totalUnits: number
  availableUnits: number
  /** Tariff shown only for club-verified rooms with a current (unexpired) rate. */
  tariff?: { amount: number; taxNote?: string | null } | null
}

export type AvailabilityResult = {
  checkIn: string
  checkOut: string
  nights: number
  rooms: RoomAvailability[]
}

/**
 * Availability = totalUnits per verified room category, minus the units of
 * every register entry that overlaps [checkIn, checkOut) and occupies rooms.
 * Checkout day frees the room (hotel convention): an existing booking
 * overlaps iff booking.checkIn < requested.checkOut AND
 * booking.checkOut > requested.checkIn.
 *
 * Honest framing matters: this reflects the club's booking register at the
 * time of asking; a request is still confirmed by staff, never automatically.
 */
export async function getAvailability(checkIn: string, checkOut: string): Promise<AvailabilityResult> {
  const payload = await getPayloadClient()

  const nights = Math.round(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86_400_000,
  )

  const [roomsRes, bookingsRes] = await Promise.all([
    payload.find({
      collection: 'rooms',
      where: { 'verification.status': { equals: 'verified' } },
      sort: 'displayOrder',
      limit: 50,
      depth: 0,
      overrideAccess: true,
    }),
    payload.find({
      collection: 'room-bookings',
      where: {
        and: [
          { bookingStatus: { in: OCCUPYING_STATUSES as unknown as string[] } },
          { checkInDate: { less_than: checkOut } },
          { checkOutDate: { greater_than: checkIn } },
        ],
      },
      limit: 1000,
      depth: 0,
      overrideAccess: true, // register is staff-only; availability math needs it server-side
    }),
  ])

  const occupied = new Map<number, number>()
  for (const b of bookingsRes.docs) {
    const roomId = typeof b.room === 'object' && b.room !== null ? (b.room as { id: number }).id : (b.room as number)
    occupied.set(roomId, (occupied.get(roomId) ?? 0) + (b.unitsBooked ?? 1))
  }

  const today = new Date().toISOString().slice(0, 10)

  const rooms: RoomAvailability[] = roomsRes.docs.map((r) => {
    const total = r.totalUnits ?? 1
    const taken = occupied.get(r.id as number) ?? 0
    const rateCurrent =
      r.tariff?.currentTariff != null &&
      (!r.tariff?.reviewDate || String(r.tariff.reviewDate).slice(0, 10) >= today)
    return {
      roomId: r.id as number,
      roomName: r.roomName,
      capacity: r.capacity,
      bedType: r.bedType ?? null,
      view: r.view ?? null,
      description: r.description ?? null,
      totalUnits: total,
      availableUnits: Math.max(0, total - taken),
      tariff: rateCurrent ? { amount: r.tariff!.currentTariff!, taxNote: r.tariff?.taxNote ?? null } : null,
    }
  })

  return { checkIn, checkOut, nights, rooms }
}
