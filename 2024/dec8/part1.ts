import { generateAntiNodes, Location } from './utils.ts';

export function part1(
  antennas: Record<string, Location[]>,
  width: number,
  height: number,
) {
  const frequencies = Object.keys(antennas);

  const antiNodes = new Set<string>();

  for (const frequency of frequencies) {
    const locations = antennas[frequency];

    for (let i = 0; i < locations.length; i++) {
      for (let j = i + 1; j < locations.length; j++) {
        const antiNodesGenerator = generateAntiNodes(
          locations[i],
          locations[j],
          [width, height],
          [1, 1],
        );

        for (const antiNode of antiNodesGenerator) {
          antiNodes.add(antiNode.join(','));
        }
      }
    }
  }

  return antiNodes.size;
}
