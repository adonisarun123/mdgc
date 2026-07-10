import * as migration_20260710_135747_initial from './20260710_135747_initial';

export const migrations = [
  {
    up: migration_20260710_135747_initial.up,
    down: migration_20260710_135747_initial.down,
    name: '20260710_135747_initial'
  },
];
