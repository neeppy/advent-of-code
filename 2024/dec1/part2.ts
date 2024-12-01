import { sumOf } from './utils.ts';

export function part2(leftList: number[], rightList: number[]) {
  const frequencyMap: Record<number, number> = {};

  for (const locationId of leftList) {
    frequencyMap[locationId] = 0;
  }

  for (const locationId of rightList) {
    frequencyMap[locationId]++;
  }

  return sumOf(leftList, (locationId) => locationId * frequencyMap[locationId]);
}
