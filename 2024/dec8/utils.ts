export type Location = [number, number];
export type Bounds = [number, number];
export type Antenna = {
  coordinates: Location[];
};

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

export const isBetween = (x: number, min: number, max: number) =>
  x >= min && x <= max;

export function* generateAntiNodes(
  firstAntenna: Location,
  secondAntenna: Location,
  bounds: Bounds,
  magnitudeBounds: [number, number] = [0, Infinity],
) {
  const [width, height] = bounds;

  const [fY, fX] = firstAntenna;
  const [sY, sX] = secondAntenna;

  const xDiff = fX - sX;
  const yDiff = fY - sY;

  let magnitude = magnitudeBounds[0];
  let faX = fX + xDiff * magnitude;
  let faY = fY + yDiff * magnitude;

  while (
    isBetween(magnitude, ...magnitudeBounds) &&
    isBetween(faX, 0, width) && isBetween(faY, 0, height)
  ) {
    yield [faY, faX] as const;

    magnitude++;

    faX = fX + xDiff * magnitude;
    faY = fY + yDiff * magnitude;
  }

  magnitude = magnitudeBounds[0];
  let saX = sX - xDiff * magnitude;
  let saY = sY - yDiff * magnitude;

  while (
    isBetween(magnitude, ...magnitudeBounds) &&
    isBetween(saX, 0, width) && isBetween(saY, 0, height)
  ) {
    yield [saY, saX] as const;

    magnitude++;

    saX = sX - xDiff * magnitude;
    saY = sY - yDiff * magnitude;
  }
}
