import { lineOfNumbers, sum } from './utils.ts';

const doOperation = {
  '+': (a: number, b: number) => a + b,
  '*': (a: number, b: number) => a * b,
} as const;

type Operator = keyof typeof doOperation;

export function part1(lines: string[]) {
  const operators = lines.pop()!.split(/\s+/) as Operator[];
  const totals: number[] = lineOfNumbers(lines.shift()!, /\s+/);

  for (let i = 0; i < lines.length; i++) {
    const factors = lineOfNumbers(lines[i], /\s+/);

    for (let j = 0; j < factors.length; j++) {
      const operator = operators[j];

      totals[j] = doOperation[operator](totals[j], factors[j]);
    }
  }

  return sum(totals);
}
