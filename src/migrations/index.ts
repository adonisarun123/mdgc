import * as migration_20260710_135747_initial from './20260710_135747_initial';
import * as migration_20260710_161618_leftovers from './20260710_161618_leftovers';

export const migrations = [
  {
    up: migration_20260710_135747_initial.up,
    down: migration_20260710_135747_initial.down,
    name: '20260710_135747_initial',
  },
  {
    up: migration_20260710_161618_leftovers.up,
    down: migration_20260710_161618_leftovers.down,
    name: '20260710_161618_leftovers'
  },
];
