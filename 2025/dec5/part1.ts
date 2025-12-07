import { Range } from './utils.ts';

export function part1(ranges: Range[], ingredients: number[]) {
  let freshIngredients = 0;

  for (const ingredient of ingredients) {
    const isFresh = ranges.some((range) =>
      ingredient >= range[0] && ingredient <= range[1]
    );

    if (isFresh) {
      freshIngredients++;
    }
  }

  return freshIngredients;
}
