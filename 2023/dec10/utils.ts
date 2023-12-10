import fs from 'fs';
import { readFile } from 'fs/promises';
import readline from 'readline';
import { Worker } from 'worker_threads';

type Range = [number, number];

export const gcd2 = (a: number, b: number): number => a ? gcd2(b % a, a) : b;
export const lcm2 = (a: number, b: number): number => a * b / gcd2(a, b);

export const lcm = (arr: number[]) => arr.reduce(lcm2);

export const count = (array: any[], callback: (element: any, idx: number) => true) => array.reduce((acc, element, idx) => {
    if (callback(element, idx)) return acc + 1;
    else return acc;
});

export const getKeysByValue = (object: Record<string, any>, value: any) => Object.keys(object).filter(key => object[key] === value);
export const objectHasValue = <T>(object: Record<string, T>, value: T) => Object.values(object).some(val => val === value);
export const sum = (nums: number[], startFrom = 0) => nums.reduce((acc, num) => acc + num, startFrom);
export const sumOf = (
    array: unknown[],
    callback: (el: unknown, idx: number) => number,
    startFrom: number = 0
): number => array.reduce<number>((acc, el, idx) => acc + callback(el, idx), startFrom);

export const inputByLine = async (useReal?: boolean) => {
    const day = __dirname.split('/').at(-1).substring(3);
    const buffer = await readFile(`dec${day}/${useReal ? 'input' : 'example'}.txt`);

    return buffer.toString('utf-8').split(/\n/).filter(e => e);
};

export const input = async (useReal?: boolean) => {
    const day = __dirname.split('/').at(-1).substring(3);
    const buffer = await readFile(`dec${day}/${useReal ? 'input' : 'example'}.txt`);

    return buffer.toString('utf-8');
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

export const max = (arr: number[]) => {
    let result = -Infinity;

    arr.forEach(value => {
        if (value >= result)
            result = value;
    });

    return result;
};

export const range = (start: number, end: number, step: number = 1) => {
    const result = [];

    for (let i = start; i <= end; i += step) {
        result.push(i);
    }

    return result;
};
