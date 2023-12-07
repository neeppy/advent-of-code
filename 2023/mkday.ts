import fs from 'fs';
import { cp } from 'fs/promises';
import https from 'https';
import { execSync } from 'child_process';

(async function(args: string[]) {
    const day = Number(args[0]) || new Date().getDate();

    await cp('__template', `dec${day}`, { recursive: true });

    https.get(`https://adventofcode.com/2023/day/${day}/input`, {
        headers: {
            cookie: `session=${process.env.SESSION}`,
        }
    }, res => {
        res.setEncoding('utf-8');
        res.pipe(fs.createWriteStream(`dec${day}/input.txt`));
    });

    execSync(`git add dec${day}`);
})(process.argv.slice(2));
