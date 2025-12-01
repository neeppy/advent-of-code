import '@std/dotenv/load';
import { copy } from '@std/fs';

const day = Deno.args[0] || new Date().getDate();
const cwd = Deno.cwd();

await copy(`${cwd}/${new Date().getFullYear()}/_template`, `${cwd}/${new Date().getFullYear()}/dec${day}`);

const response = await fetch(
  `https://adventofcode.com/${new Date().getFullYear()}/day/${day}/input`,
  {
    headers: {
      cookie: `session=${Deno.env.get('SESSION')}`,
    },
  },
);

if (response.body) {
  const file = await Deno.open(`${cwd}/${new Date().getFullYear()}/dec${day}/input.txt`, {
    write: true,
    create: true,
  });

  await response.body.pipeTo(file.writable);
}
