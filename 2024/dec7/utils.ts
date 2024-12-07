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

export type Operation = (x: number, y: number) => number;

export function validateOperands(
  target: number,
  operands: number[],
  operations: Operation[],
) {
  const totals = [operands[0]];

  for (let i = 1; i < operands.length; i++) {
    const currentTotalsCount = totals.length;

    for (let j = 0; j < currentTotalsCount; j++) {
      const total = totals.shift()!;

      for (const operator of operations) {
        const newTotal = operator(total, operands[i]);

        totals.push(newTotal);
      }
    }
  }

  if (totals.includes(target)) {
    return target;
  }

  return 0;
}
