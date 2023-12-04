import fs from 'fs/promises';

export const sum = (nums: number[], startFrom = 0) => nums.reduce((acc, num) => acc + num, startFrom);
export const input = async (day: number) => {
    const buffer = await fs.readFile(`dec${day}/input.txt`);

    return buffer.toString('utf-8').split(/\n/);
};
