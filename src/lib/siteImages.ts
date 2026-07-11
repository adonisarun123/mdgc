/**
 * Central manifest of interim site imagery.
 *
 * Source: photographs migrated from the club's legacy website (mdgc.golf).
 * The DSLR course photographs carry the club's own "© MDGC" watermark;
 * ownership is recorded as club-owned pending formal confirmation in
 * docs/media-register.md. Several hole photographs carry legacy burned-in
 * annotations (hole numbers, arrows) and are used at card size only.
 *
 * When the club supplies approved photography (or S3 media storage is
 * configured for CMS uploads), swap entries here — every page reads from
 * this manifest, so a replacement propagates site-wide.
 */

export type SiteImage = {
  src: string
  alt: string
  width: number
  height: number
}

export const IMAGES = {
  crest: {
    src: '/images/brand/crest.png',
    alt: 'The crest of Mercara Downs Golf Club — crossed golf clubs within a laurel wreath.',
    width: 316,
    height: 340,
  },
  hero: {
    src: '/images/course/valley-pond-panorama.jpg',
    alt: 'Looking down from an elevated tee at Mercara Downs — fairways falling away to a pond ringed by trees, with the Coorg hills beyond.',
    width: 2400,
    height: 1600,
  },
  clubhouse: {
    src: '/images/course/clubhouse-from-course.jpg',
    alt: 'The Mercara Downs clubhouse with its pale green roof seen across a green, a yellow flag and a golf buggy in the foreground.',
    width: 2400,
    height: 1600,
  },
  greenBunkersForest: {
    src: '/images/course/green-bunkers-forest.jpg',
    alt: 'A raised green at Mercara Downs defended by sand bunkers, with forested hills rising behind.',
    width: 1800,
    height: 1200,
  },
  greenHillside: {
    src: '/images/course/green-hillside.jpg',
    alt: 'A green cut into the hillside at Mercara Downs, with a red flag against wooded slopes.',
    width: 1800,
    height: 1200,
  },
  greenSprinklers: {
    src: '/images/course/green-sprinklers.jpg',
    alt: 'Sprinklers watering a green at Mercara Downs, the forest edge close behind the putting surface.',
    width: 1800,
    height: 1200,
  },
  fairwayIrrigation: {
    src: '/images/course/fairway-irrigation.jpg',
    alt: 'Irrigation arcs over a fairway at Mercara Downs beneath tree-covered hills.',
    width: 1800,
    height: 1200,
  },
  puttingGreenFlag: {
    src: '/images/course/putting-green-flag.jpg',
    alt: 'A close-mown green at Mercara Downs with a yellow flag, framed by mature trees.',
    width: 1800,
    height: 1200,
  },
  elevatedGreenBuggy: {
    src: '/images/course/elevated-green-buggy.jpg',
    alt: 'A golf buggy passing below an elevated green at Mercara Downs.',
    width: 1800,
    height: 1200,
  },
  firstTeeFairway: {
    src: '/images/course/first-tee-fairway.jpg',
    alt: 'The opening fairway at Mercara Downs under a bright Coorg sky.',
    width: 1800,
    height: 1200,
  },
  ballOnTurf: {
    src: '/images/course/ball-on-turf.jpg',
    alt: 'A golf ball resting on dew-dark turf at Mercara Downs, trees soft in the background.',
    width: 2000,
    height: 1125,
  },
  diningView1: {
    src: '/images/dining/dining-course-view-1.jpg',
    alt: 'A laid table in the Mercara Downs dining room, the course visible through floor-to-ceiling glass.',
    width: 1200,
    height: 800,
  },
  diningView2: {
    src: '/images/dining/dining-course-view-2.jpg',
    alt: 'A dining table set beside the window at Mercara Downs, mist and trees over the course outside.',
    width: 1200,
    height: 800,
  },
  barLounge1: {
    src: '/images/dining/bar-lounge-1.jpg',
    alt: 'The bar at Mercara Downs Golf Club — leather seating and high stools along a lit counter.',
    width: 1200,
    height: 800,
  },
  barLounge2: {
    src: '/images/dining/bar-lounge-2.jpg',
    alt: 'The bar counter at Mercara Downs with warm wood flooring and pendant lights.',
    width: 1200,
    height: 800,
  },
  roomDeluxe1: {
    src: '/images/stay/room-deluxe-1.jpg',
    alt: 'A double room at the Downs Retreat with a timber bed, seating by the window and warm lighting.',
    width: 1200,
    height: 800,
  },
  roomDeluxe2: {
    src: '/images/stay/room-deluxe-2.jpg',
    alt: 'A bright double room at the Downs Retreat with curtained windows opening towards the course.',
    width: 1200,
    height: 800,
  },
  roomBathroom1: {
    src: '/images/stay/room-bathroom-1.jpg',
    alt: 'An en-suite bathroom at the Downs Retreat with a walk-in shower.',
    width: 600,
    height: 900,
  },
  roomBathroom2: {
    src: '/images/stay/room-bathroom-2.jpg',
    alt: 'A bathroom at the Downs Retreat with modern fittings and towels laid out.',
    width: 600,
    height: 900,
  },
} satisfies Record<string, SiteImage>

/** Legacy hole photographs, one primary image per hole (1–18). */
export const HOLE_IMAGES: Record<number, SiteImage> = {
  1: { src: '/images/holes/hole-01.jpg', alt: 'The raised green of Fort Knox, the first hole at Mercara Downs, seen from the fairway.', width: 1600, height: 1062 },
  2: { src: '/images/holes/hole-02.jpg', alt: 'The green at Downs View, the second hole, viewed from the left with bunkers cut into the slope.', width: 1000, height: 685 },
  3: { src: '/images/holes/hole-03.jpg', alt: 'An orange flag on the third green at Blinder, a cross bunker guarding the approach.', width: 1600, height: 1062 },
  4: { src: '/images/holes/hole-04.jpg', alt: 'The fourth hole, Upper Crest, climbing towards a green framed by tall eucalyptus trees.', width: 1600, height: 1062 },
  5: { src: '/images/holes/hole-05.jpg', alt: 'The open fifth fairway at Leveller, players walking towards the distant green.', width: 1600, height: 1062 },
  6: { src: '/images/holes/hole-06.jpg', alt: 'Golfers walking the sixth hole, Misty, along the forest edge at Mercara Downs.', width: 1800, height: 1195 },
  7: { src: '/images/holes/hole-07.jpg', alt: 'The seventh green at Lapwing Nest, ringed by bunkers with the Coorg hills behind.', width: 1024, height: 516 },
  8: { src: '/images/holes/hole-08.jpg', alt: 'The eighth hole, The Pride, seen from above — players scattered across the green, bunkers and water below.', width: 1200, height: 800 },
  9: { src: '/images/holes/hole-09.jpg', alt: 'The ninth fairway at Runway leading back towards the green-roofed clubhouse.', width: 1030, height: 996 },
  10: { src: '/images/holes/hole-10.jpg', alt: 'The tenth hole, Power Play, climbing a broad open slope.', width: 562, height: 305 },
  11: { src: '/images/holes/hole-11.jpg', alt: 'The eleventh green at Rush Hour with a bunker across the front.', width: 770, height: 483 },
  12: { src: '/images/holes/hole-12.jpg', alt: 'The twelfth hole, Captain’s Hole, its green set among bunkers on the ridge.', width: 1024, height: 573 },
  13: { src: '/images/holes/hole-13.jpg', alt: 'The long thirteenth, Un Macho, stretching across open downs under a big sky.', width: 1024, height: 649 },
  14: { src: '/images/holes/hole-14.jpg', alt: 'A golfer on the elevated fourteenth tee at Deceptive.', width: 960, height: 1280 },
  15: { src: '/images/holes/hole-15.jpg', alt: 'A red flag on the fifteenth green at Boomerang, the clubhouse visible in the distance.', width: 1600, height: 1062 },
  16: { src: '/images/holes/hole-16.jpg', alt: 'Waterloo, the sixteenth — the green guarded by a pond with its fountain playing.', width: 1200, height: 800 },
  17: { src: '/images/holes/hole-17.jpg', alt: 'The seventeenth hole, Guts & Glory, played between tree lines.', width: 1024, height: 512 },
  18: { src: '/images/holes/hole-18.jpg', alt: 'The closing hole, Pressure, its green tucked beside water and trees.', width: 1014, height: 1024 },
}

/** Static gallery selection shown until CMS media (with confirmed permissions) takes over. */
export const GALLERY_IMAGES: SiteImage[] = [
  IMAGES.hero,
  IMAGES.clubhouse,
  IMAGES.greenBunkersForest,
  IMAGES.greenHillside,
  IMAGES.greenSprinklers,
  IMAGES.fairwayIrrigation,
  IMAGES.puttingGreenFlag,
  IMAGES.elevatedGreenBuggy,
  IMAGES.firstTeeFairway,
  IMAGES.ballOnTurf,
  {
    src: '/images/holes/hole-08-sunset.jpg',
    alt: 'Dusk over the eighth green at Mercara Downs, the flag silhouetted against a pink sky.',
    width: 1280,
    height: 605,
  },
  HOLE_IMAGES[16],
]
