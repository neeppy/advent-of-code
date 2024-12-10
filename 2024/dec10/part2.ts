import { Location, topographicMapParser } from './utils.ts';

export function part2(map: number[][], trailHeads: Location[]) {
  let sum = 0;

  const topographicMap = topographicMapParser(map);

  for (const trailHead of trailHeads) {
    const [,, trailRating] = topographicMap.traverse(trailHead);

    sum += trailRating;
  }

  return sum;
}
