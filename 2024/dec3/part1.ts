import { sumOf } from './utils.ts';

export function part1(memory: string) {
  const multiplyInstructions = memory.matchAll(/mul\((\d+),(\d+)\)/g);

  return sumOf(
    Array.from(multiplyInstructions),
    ([, x, y]) => Number(x) * Number(y),
  );
}
