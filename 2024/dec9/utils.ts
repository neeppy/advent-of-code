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

export function pushNTimesToArray(arr: number[], n: number, value: number) {
  for (let i = 0; i < n; i++) {
    arr.push(value);
  }
}

export function replaceNTimesAtIndex<T>(
  arr: T[],
  index: number,
  n: number,
  value: T,
) {
  for (let i = index; i < index + n; i++) {
    arr[i] = value;
  }
}

export const logWhen = (
  condition: boolean,
  ...args: unknown[]
) => (condition && console.log(...args));
