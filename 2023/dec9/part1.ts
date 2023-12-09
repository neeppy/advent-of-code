import { arrayOfNumbers, input, range, sumOf } from './utils';

function predict(nums: number[]): number {
    const allSame = nums.every(num => num === nums[0]);

    if (allSame) return nums[0];

    const diffs = range(0, nums.length - 2).map(i => nums[i + 1] - nums[i]);

    return nums.at(-1) + predict(diffs);
}

async function part1(lines: string[]) {
    return sumOf(lines, line => predict(arrayOfNumbers(line)));
}

input(true)
    .then(part1)
    .then(console.log);
