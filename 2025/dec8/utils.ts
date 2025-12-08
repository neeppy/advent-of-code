export type Vector2 = [number, number];
export type Vector3 = [number, number, number];
export type Range = Vector2;

export async function inputByLine(useExample?: boolean) {
  const file = useExample ? 'example.txt' : 'input.txt';
  const day = import.meta.dirname!.split('/').at(-1)!.substring(3);

  const content = await Deno.readTextFile(`dec${day}/${file}`);

  return content.split(/\n/).filter(Boolean);
}

export const sum = (nums: number[], startFrom = 0) =>
  nums.reduce((acc, num) => acc + num, startFrom);

export const sumOf = <T>(
  array: T[],
  callback: (el: T, idx: number) => number,
  startFrom: number = 0,
): number =>
  array.reduce<number>((acc, el, idx) => acc + callback(el, idx), startFrom);

export const lineOfNumbers = (line: string, separator = /\s+/g): number[] =>
  line.split(separator).map(Number);

export const intervalValidator = (min: number, max: number) => (x: number) =>
  x >= min && x <= max;

export const splitMap = <T, U, V>(
  separator: string,
  array: T[],
  mapperBefore: (el: T) => U,
  mapperAfter: (el: T) => V,
): [U[], V[]] => {
  let reachedSeparator = false;

  const before: U[] = [];
  const after: V[] = [];

  for (const el of array) {
    if (el === separator) {
      reachedSeparator = true;
      continue;
    }

    if (reachedSeparator) {
      after.push(mapperAfter(el));
    } else {
      before.push(mapperBefore(el));
    }
  }

  return [before, after] as const;
};

export const euclidean = ([xA, yA, zA]: Vector3, [xB, yB, zB]: Vector3) =>
  Math.sqrt((xA - xB) ** 2 + (yA - yB) ** 2 + (zA - zB) ** 2);

export type Distance = {
  from: Vector3;
  to: Vector3;
  distance: number;
};

export function computeDistancesMap(boxCoordinates: Vector3[]) {
  const distances: Distance[] = [];

  for (let i = 0; i < boxCoordinates.length - 1; i++) {
    for (let j = i + 1; j < boxCoordinates.length; j++) {
      distances.push({
        from: boxCoordinates[i],
        to: boxCoordinates[j],
        distance: euclidean(boxCoordinates[i], boxCoordinates[j]),
      });
    }
  }

  distances.sort((a, b) => a.distance - b.distance);

  return distances;
}

export function mergeCircuits(
  allCircuits: Set<Vector3>[],
  toMerge: Set<Vector3>[],
) {
  const merged = new Set<Vector3>(toMerge.flatMap((circuit) => [...circuit]));

  return allCircuits
    .filter((circuit) => !toMerge.includes(circuit))
    .concat([merged]);
}
