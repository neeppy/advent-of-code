export function part1(leftList: number[], rightList: number[]) {
  let sum = 0;

  for (let i = 0; i < leftList.length; i++) {
    sum += Math.abs(leftList[i] - rightList[i]);
  }

  return sum;
}
