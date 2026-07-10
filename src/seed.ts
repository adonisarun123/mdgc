/**
 * Seed script — migrates audited legacy content from mdgc.golf into the CMS.
 *
 * Everything seeded here carries verification.status = 'pending':
 * it is faithful to the legacy website but NOT yet confirmed by the club.
 * The frontend hides or softens unverified facts. Sources and open
 * questions are tracked in docs/factual-verification-register.md.
 *
 * Run with:  npx payload run src/seed.ts
 */
import { getPayload } from 'payload'
import config from '@payload-config'

const pending = { status: 'pending' as const }

const HOLES = [
  {
    holeNumber: 1,
    officialName: 'Fort Knox',
    par: 4,
    overview:
      'A difficult opening hole that looks innocuous off the tee. The second shot climbs to a small, fast green defended at the back.',
    teeShotStrategy:
      'Find the fairway first — the hole tightens as it rises, and the approach is everything here.',
    greenStrategy:
      'The green is small and quick, protected by two bunkers at the back. Take enough club, but no more.',
    hazards: [
      { hazardType: 'bunker' as const, position: 'Two at the back of the green' },
    ],
  },
  {
    holeNumber: 2,
    officialName: 'Downs View',
    par: 3,
    overview:
      'All downhill from the tee, playing 130 to 160 yards depending on the wind, to a D-shaped green ringed by sand.',
    teeShotStrategy:
      'Judge the wind before you choose a club — the drop and the breeze can swing selection by two clubs or more.',
    greenStrategy: 'Four bunkers surround the green; the middle of the D is the safe play.',
    hazards: [{ hazardType: 'bunker' as const, position: 'Four surrounding the green' }],
  },
  {
    holeNumber: 3,
    officialName: 'Blinder',
    par: 4,
    overview:
      'A dogleg left where a road crossing is in play off the tee and the green slopes steeply from back to front.',
    teeShotStrategy:
      'Position matters more than distance — carry or avoid the road crossing and open up the corner.',
    approachStrategy: 'The second shot plays to a small green with two bunkers on the right.',
    greenStrategy: 'Stay below the hole; the back-to-front slope is severe.',
    hazards: [
      { hazardType: 'other' as const, position: 'Road crossing off the tee' },
      { hazardType: 'bunker' as const, position: 'Two right of the green' },
    ],
  },
  {
    holeNumber: 4,
    officialName: 'Upper Crest',
    par: 3,
    overview:
      'All uphill from the tee, with the green set back so the flag stays hidden until you crest the rise.',
    teeShotStrategy:
      'Trust your yardage rather than your eyes — the blind flag makes this hole play longer than it looks.',
    hazards: [{ hazardType: 'bunker' as const, position: 'Both sides of the green' }],
  },
  {
    holeNumber: 5,
    officialName: 'Leveller',
    par: 5,
    overview:
      'A wide fairway falls away from an elevated tee. Reachable in two for the long hitters.',
    teeShotStrategy: 'Open your shoulders — the elevated tee and generous fairway invite a big drive.',
    approachStrategy:
      'Going for the green in two brings the shallow front-left bunker into play; laying up leaves a simple pitch.',
    hazards: [{ hazardType: 'bunker' as const, position: 'Shallow, front-left of the green' }],
  },
  {
    holeNumber: 6,
    officialName: 'Misty',
    par: 3,
    overview:
      'Downhill to a large green that so often sits in the morning mist which gives the hole its name.',
    teeShotStrategy:
      'Aim for the centre of the green, where it is deepest. Long is the one place you must not go.',
    hazards: [{ hazardType: 'slope' as const, position: 'Beyond the green' }],
  },
  {
    holeNumber: 7,
    officialName: 'Lapwing Nest',
    par: 4,
    overview:
      'A long dogleg left that climbs before tumbling down to a green with a severe drop-off behind.',
    teeShotStrategy: 'A solid drive up the hill is essential to shorten a genuinely long second.',
    approachStrategy:
      'Use the downslope, but respect the bunkers front-left and back-right — and never go long.',
    hazards: [
      { hazardType: 'bunker' as const, position: 'Front-left and back-right of the green' },
      { hazardType: 'slope' as const, position: 'Severe drop-off behind the green' },
    ],
  },
  {
    holeNumber: 8,
    officialName: 'The Pride',
    par: 3,
    mensDistance: 197,
    overview:
      'At 197 yards across a valley with water in play, this is rated the fourth-toughest hole on the course.',
    teeShotStrategy:
      'An elevated tee shot must carry the valley — commit to the club and swing without steering.',
    hazards: [{ hazardType: 'water' as const, position: 'In the valley before the green' }],
  },
  {
    holeNumber: 9,
    officialName: 'Runway',
    par: 4,
    overview:
      'A long dogleg left whose fairway tips downhill after 250 yards — the drive sets up everything.',
    teeShotStrategy:
      'Chase the downslope for extra run, but do not be long with the approach — beyond this green is dead ground.',
    hazards: [{ hazardType: 'slope' as const, position: 'Fairway falls after 250 yards; trouble long of the green' }],
  },
  {
    holeNumber: 10,
    officialName: 'Power Play',
    par: 4,
    overview:
      'The green hides in a blind spot from the tee, and the elevated putting surface falls away to the right.',
    teeShotStrategy: 'Be aggressive off the tee and go for distance — this hole rewards the bold drive.',
    greenStrategy: 'Favour the left half; the elevated green sheds balls to the right.',
    hazards: [{ hazardType: 'slope' as const, position: 'Green falls away right' }],
  },
  {
    holeNumber: 11,
    officialName: 'Rush Hour',
    par: 4,
    overview:
      'From an elevated tee with trees all down the left, long hitters can chase this green — a genuine birdie opportunity.',
    teeShotStrategy: 'Keep clear of the tree line left; the further you carry, the better the chance to attack.',
    hazards: [{ hazardType: 'trees' as const, position: 'Bordering the left side' }],
  },
  {
    holeNumber: 12,
    officialName: "Captain's Hole",
    par: 4,
    overview:
      'Short but sloping left to right, finishing on an elevated, narrow green that falls away on the right.',
    teeShotStrategy: 'Favour the left side and let the slope feed the ball back to the centre.',
    greenStrategy: 'The elevated, narrow green punishes anything drifting right.',
    hazards: [{ hazardType: 'slope' as const, position: 'Fairway slopes left to right; green falls away right' }],
  },
  {
    holeNumber: 13,
    officialName: 'Un Macho',
    par: 5,
    overview:
      'Long and dead straight, with a landing area you cannot see from the tee. Play for par here and you could walk off with a birdie.',
    teeShotStrategy: 'Commit to your line over the blind landing area — the hole is straighter than it feels.',
    hazards: [{ hazardType: 'other' as const, position: 'Blind landing area from the tee' }],
  },
  {
    holeNumber: 14,
    officialName: 'Deceptive',
    par: 3,
    overview: 'A short par three with forest and out of bounds right, and sand waiting left.',
    teeShotStrategy:
      'The name is fair warning — the safe-looking shot left finds the bunker; the brave line skirts the forest.',
    hazards: [
      { hazardType: 'out-of-bounds' as const, position: 'Forest to the right' },
      { hazardType: 'bunker' as const, position: 'Left of the green' },
    ],
  },
  {
    holeNumber: 15,
    officialName: 'Boomerang',
    par: 5,
    overview:
      'A sharp dogleg left where the fairway slopes hard from right to left, climbing to an elevated green.',
    teeShotStrategy: 'Start the ball right and let the slope bring it around the corner.',
    approachStrategy: 'The elevated green is guarded front-left — carry the bunker or come in from the right.',
    hazards: [
      { hazardType: 'slope' as const, position: 'Fairway slopes sharply right to left' },
      { hazardType: 'bunker' as const, position: 'Front-left of the elevated green' },
    ],
  },
  {
    holeNumber: 16,
    officialName: 'Waterloo',
    par: 3,
    overview:
      'Very short, with the green about thirty feet below the tee and water lurking right. A gentle hole — if you take the bailout left.',
    teeShotStrategy: 'A smooth short iron down the hill; the bailout left takes the water out of play entirely.',
    hazards: [{ hazardType: 'water' as const, position: 'Right of the green' }],
  },
  {
    holeNumber: 17,
    officialName: 'Guts & Glory',
    par: 4,
    mensDistance: 250,
    overview:
      'Just 250 yards, but with two water bodies to carry. Take them on and this is very much a birdie hole.',
    teeShotStrategy:
      'Decide on the tee: lay up short of the water for position, or carry both and putt for eagle.',
    hazards: [{ hazardType: 'water' as const, position: 'Two water bodies between tee and green' }],
  },
  {
    holeNumber: 18,
    officialName: 'Pressure',
    par: 3,
    overview:
      'A 120-yard water carry with out of bounds left at 130 yards, a tall tree guarding the left line, two bunkers, and a green that is genuinely hard to putt. The name says the rest.',
    teeShotStrategy:
      'Clear the water, avoid the tree and the OB left — a straight, committed short iron closes the round.',
    greenStrategy: 'Two putts here are earned, not given; leave yourself below the hole.',
    hazards: [
      { hazardType: 'water' as const, position: '120-yard carry from the tee' },
      { hazardType: 'out-of-bounds' as const, position: 'Left, at 130 yards' },
      { hazardType: 'trees' as const, position: 'Tall tree left of the line' },
      { hazardType: 'bunker' as const, position: 'Two by the green' },
    ],
  },
]

const TOURNAMENTS: { name: string; year: number; month: string }[] = [
  { name: 'Interclub Tournament — MDGC vs BGC', year: 2022, month: 'April' },
  { name: 'Mercara Downs Open Golf Championship', year: 2022, month: 'April' },
  { name: 'Murugappa Cup', year: 2022, month: 'May' },
  { name: 'Coorg Addicts Meet', year: 2022, month: 'October' },
  { name: 'T.R. Balachandran Doubles Tournament', year: 2022, month: 'October' },
  { name: 'Satya Coorg Triangular Golf Championship', year: 2022, month: 'November' },
  { name: 'Sakhamuri Cup', year: 2022, month: 'December' },
  { name: 'Muckatira Cariappa Memorial Golf Tournament', year: 2023, month: 'January' },
  { name: 'Mercara Downs Open Golf Championship', year: 2023, month: 'March' },
  { name: 'Spouse & Spice Tournament', year: 2023, month: 'March' },
  { name: 'NR Cup', year: 2023, month: 'April' },
  { name: 'Nirmala Cup', year: 2023, month: 'May' },
  { name: 'Murugappa Cup', year: 2023, month: 'June' },
]

const MONTH_INDEX: Record<string, number> = {
  January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
  July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
}

// Legacy contacts — seeded INTERNAL-ONLY until each is verified.
const CONTACTS = [
  { department: 'downs-retreat' as const, contactPerson: 'Mr. Sachin', phone: '+91 77600 32366', email: 'rm.downsretreat@gmail.com' },
  { department: 'dining-reservations' as const, contactPerson: 'Mr. Umesh', phone: '+91 97407 43943' },
  { department: 'dining-reservations' as const, contactPerson: 'Mr. Thimmanna', phone: '+91 97417 72918' },
  { department: 'club-reception' as const, email: 'mercaradownsgolfclub@hotmail.com' },
]

const payload = await getPayload({ config: await config })

const existing = await payload.find({ collection: 'course-holes', limit: 1 })
if (existing.totalDocs > 0) {
  payload.logger.info('Seed skipped — course holes already exist.')
  process.exit(0)
}

{
  payload.logger.info('Seeding course holes…')
  for (const hole of HOLES) {
    await payload.create({
      collection: 'course-holes',
      data: {
        ...hole,
        accessibilityDescription: `Hole ${hole.holeNumber}, ${hole.officialName}, a par ${hole.par}. ${hole.overview}`,
        verification: {
          ...pending,
          notes:
            'Migrated from legacy mdgc.golf /course-layout. Name, par, distances and description require golf-committee confirmation. Legacy pars sum to 68 against a published course par of 70 — resolve against the official scorecard.',
        },
      },
    })
  }

  payload.logger.info('Seeding tournament archive…')
  for (const t of TOURNAMENTS) {
    await payload.create({
      collection: 'tournaments',
      data: {
        name: t.name,
        year: t.year,
        startDate: new Date(Date.UTC(t.year, MONTH_INDEX[t.month], 1)).toISOString(),
        status: 'archived',
        verification: {
          ...pending,
          notes: `Legacy site listed only "${t.month} ${t.year}" — exact dates, sponsors and results to be sourced from club records.`,
        },
      },
    })
  }

  payload.logger.info('Seeding internal contact directory…')
  for (const c of CONTACTS) {
    await payload.create({
      collection: 'contacts',
      data: {
        ...c,
        publicStatus: 'internal', // do NOT publish until verified
      },
    })
  }

  payload.logger.info('Seeding room tariffs (pending verification)…')
  const roomTariffs = [
    { label: 'Downs Retreat — guest', amount: 4000, visitorCategory: ['visitor' as const] },
    { label: 'Downs Retreat — member guest', amount: 3500, visitorCategory: ['member-guest' as const] },
    { label: 'Downs Retreat — club member', amount: 2500, visitorCategory: ['member' as const] },
  ]
  for (const t of roomTariffs) {
    await payload.create({
      collection: 'tariffs',
      data: {
        ...t,
        category: 'room',
        unit: 'per night',
        taxNote: 'plus 12% GST',
        effectiveDate: new Date().toISOString(),
        reviewDate: new Date().toISOString(), // already expired → never rendered until club confirms
        contentOwner: 'Downs Retreat manager',
        verification: {
          ...pending,
          notes: 'Tariff figures from legacy site (no effective date published). Confirm amount, tax rate and validity before publishing.',
        },
      },
    })
  }

  payload.logger.info('Seeding course information global (pending verification)…')
  await payload.updateGlobal({
    slug: 'course-info',
    data: {
      numberOfHoles: 18,
      coursePar: 70,
      mensYardage: 5500,
      womensYardage: 4362,
      totalAcreage: 100,
      greenGrass: 'Tiff Dwarf',
      fairwayGrass: 'Hybrid Bermuda',
      roughGrass: 'Hybrid Bermuda',
      landscapeCharacter:
        'Open downs above Madikeri with mature tree lines, valley crossings and frequent morning mist.',
      // Deliberately NOT seeding coordinates or elevation:
      // legacy coordinates point at Bengaluru and the published altitude is questionable.
      verification: {
        ...pending,
        notes:
          'All figures from legacy site. Legacy coordinates (12.9547 N, 77.6455 E) are in Bengaluru — excluded. Altitude 915 m questionable (Madikeri ~1,100 m+) — excluded. Confirm every figure against the official scorecard before setting status to verified.',
      },
    },
  })

  payload.logger.info('Seeding site settings…')
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      clubName: 'Mercara Downs Golf Club',
      tagline: 'Golf in the Mist',
      heritageStatement:
        'Golf has been played on the Mercara Downs since the late nineteenth century.',
      address: {
        line1: 'P B No. 79',
        town: 'Madikeri',
        district: 'Kodagu (Coorg)',
        state: 'Karnataka',
        pincode: '571201',
      },
      directions: [
        { origin: 'Kannur International Airport', approximateDistance: '≈ 90 km', verified: false },
        { origin: 'Mysuru (Mandakalli Airport)', approximateDistance: '≈ 130 km', verified: false },
        { origin: 'Mangaluru International Airport', approximateDistance: '≈ 244 km', verified: false },
        { origin: 'Bengaluru (Kempegowda Airport)', approximateDistance: '≈ 290 km', verified: false },
      ],
    },
  })

  payload.logger.info('Seed complete. All records are pending club verification.')
  process.exit(0)
}
