import fs from 'fs';
import { readFile } from 'fs/promises';
import readline from 'readline';
import { Worker } from 'worker_threads';

type Range = [number, number];

export const inputByLine = (day: number) => {
    const stream = fs.createReadStream(`dec${day}/input.txt`);

    return readline.createInterface({
        input: stream,
        crlfDelay: Infinity,
    });
};

export const sum = (nums: number[], startFrom = 0) => nums.reduce((acc, num) => acc + num, startFrom);
export const input = async (day: number) => {
    const buffer = await readFile(`dec${day}/input.txt`);

    return buffer.toString('utf-8').split(/\n/);
};

export const arrayOfNumbers = (str: string): number[] => str.split(' ').filter(e => e).map(Number);
export const isBetween = (x: number, range: Range) => x >= range[0] && x <= range[1];
export const worker = (file: string, data: any): Promise<any> => {
    return new Promise((resolve) => {
        const worker = new Worker(file, {
            workerData: data,
        });

        worker.on('message', resolve);
    });
};

export const min = (arr: number[]) => {
    let result = Infinity;

    arr.forEach(value => {
        if (value <= result)
            result = value;
    });

    return result;
};
