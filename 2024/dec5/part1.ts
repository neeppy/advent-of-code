type PrecedenceMap = Record<number, number[]>;

export function isInOrder(
  precedenceMap: PrecedenceMap,
  printingOrder: number[],
) {
  for (let i = 0; i < printingOrder.length - 1; i++) {
    const currentPage = printingOrder[i];

    for (let j = i + 1; j < printingOrder.length; j++) {
      const checkedPage = printingOrder[j];

      if (!precedenceMap[currentPage]?.includes(checkedPage)) {
        return false;
      }
    }
  }

  return true;
}

export function part1(precedenceMap: PrecedenceMap, printingOrders: number[][]) {
  let sum = 0;

  for (const printingOrder of printingOrders) {
    if (isInOrder(precedenceMap, printingOrder)) {
      sum += printingOrder[Math.floor(printingOrder.length / 2)];
    }
  }

  return sum;
}
