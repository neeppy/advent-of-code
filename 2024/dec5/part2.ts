import { isInOrder } from './part1.ts';

type PrecedenceMap = Record<number, number[]>;

export function part2(
  precedenceMap: PrecedenceMap,
  printingOrders: number[][],
) {
  const invalidPrintingOrders = printingOrders.filter((printingOrder) =>
    !isInOrder(precedenceMap, printingOrder)
  );

  let sum = 0;

  for (const printingOrder of invalidPrintingOrders) {
    for (let i = 0; i < printingOrder.length - 1; i++) {
      for (let j = i + 1; j < printingOrder.length; j++) {
        const checkedPage = printingOrder[j];

        if (!precedenceMap[printingOrder[i]]?.includes(checkedPage)) {
          const temp = printingOrder[i];

          printingOrder[i] = checkedPage;
          printingOrder[j] = temp;
        }
      }
    }

    sum += printingOrder[Math.floor(printingOrder.length / 2)];
  }

  return sum;
}
