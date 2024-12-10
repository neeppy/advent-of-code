import { Location, topographicMapParser } from './utils.ts';

export function part1(map: number[][], trailHeads: Location[]) {
  let sum = 0;

  const topographicMap = topographicMapParser(map);

  for (const trailHead of trailHeads) {
    const [, peakCount] = topographicMap.traverse(trailHead);

    sum += peakCount;
  }

  return sum;
}
