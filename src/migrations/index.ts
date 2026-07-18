import * as migration_20260710_135747_initial from './20260710_135747_initial';
import * as migration_20260710_161618_leftovers from './20260710_161618_leftovers';
import * as migration_20260718_013207_booking_packages_events from './20260718_013207_booking_packages_events';

export const migrations = [
  {
    up: migration_20260710_135747_initial.up,
    down: migration_20260710_135747_initial.down,
    name: '20260710_135747_initial',
  },
  {
    up: migration_20260710_161618_leftovers.up,
    down: migration_20260710_161618_leftovers.down,
    name: '20260710_161618_leftovers',
  },
  {
    up: migration_20260718_013207_booking_packages_events.up,
    down: migration_20260718_013207_booking_packages_events.down,
    name: '20260718_013207_booking_packages_events'
  },
];
