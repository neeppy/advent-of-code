export type Range = [number, number];

export async function inputByLine(useExample?: boolean) {
  const file = useExample ? 'example.txt' : 'input.txt';
  const day = import.meta.dirname!.split('/').at(-1)!.substring(3);

  const content = await Deno.readTextFile(`dec${day}/${file}`);

  return content.split(/\n/);
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
