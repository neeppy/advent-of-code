import {
  computeDistancesMap,
  Distance,
  mergeCircuits,
  Vector3,
} from './utils.ts';

export function part2(boxCoordinates: Vector3[]) {
  const distances = computeDistancesMap(boxCoordinates);

  let circuits: Set<Vector3>[] = [];
  let currentConnection: Distance;

  do {
    currentConnection = distances.shift()!;

    const { from, to } = currentConnection;

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
  } while (
    circuits.length !== 1 || circuits[0]?.size !== boxCoordinates.length
  );

  return currentConnection.from[0] * currentConnection.to[0];
}
