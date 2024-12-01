import '@std/dotenv/load';
import { copy } from '@std/fs';

const day = Deno.args[0] || new Date().getDate();

await copy('_template', `dec${day}`);

const response = await fetch(
  `https://adventofcode.com/${new Date().getFullYear()}/day/${day}/input`,
  {
    headers: {
      cookie: `session=${Deno.env.get('SESSION')}`,
    },
  },
);

if (response.body) {
  const file = await Deno.open(`dec${day}/input.txt`, {
    write: true,
    create: true,
  });

  await response.body.pipeTo(file.writable);
}
