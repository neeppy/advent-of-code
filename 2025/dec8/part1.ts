import { computeDistancesMap, mergeCircuits, Vector3 } from './utils.ts';

export function part1(boxCoordinates: Vector3[], connectionsToMake = 10) {
  const distances = computeDistancesMap(boxCoordinates);

  let circuits: Set<Vector3>[] = [];

  for (let i = 0; i < connectionsToMake; i++) {
    const { from, to } = distances.shift()!;

    const existingCircuits = circuits.filter((circuit) =>
      circuit.has(from) || circuit.has(to)
    );

    if (existingCircuits.length > 1) {
      circuits = mergeCircuits(circuits, existingCircuits);
    } else if (existingCircuits.length === 1) {
      existingCircuits[0].add(to);
      existingCircuits[0].add(from);
    } else {
      circuits.push(new Set([from, to]));
    }
  }

  circuits.sort((a, b) => b.size - a.size);

  return circuits[0].size * circuits[1].size * circuits[2].size;
}
