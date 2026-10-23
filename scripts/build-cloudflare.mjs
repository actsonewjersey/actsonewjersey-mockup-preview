import { cp, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('../', import.meta.url).pathname;
const output = join(root, 'dist');
await mkdir(output, { recursive: true });
for (const entry of await readdir(root, { withFileTypes: true })) {
  if (entry.name.startsWith('.') || ['dist', 'scripts', 'node_modules', 'README.md', 'robots.txt'].includes(entry.name)) continue;
  await cp(join(root, entry.name), join(output, entry.name), { recursive: true });
}
async function preparePages(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await preparePages(path);
    else if (entry.name.endsWith('.html')) {
      const source = await readFile(path, 'utf8');
      await writeFile(path, source
        .replace('<base href="/actsonewjersey-mockup-preview/">', '<base href="/">')
        .replace(/\s*<meta name="robots" content="noindex, nofollow">/g, '')
        .replace('NJ NAACP ACT-SO | Design Mockup', 'NJ NAACP ACT-SO'));
    }
  }
}
await preparePages(output);
await writeFile(join(output, 'robots.txt'), 'User-agent: *\nAllow: /\n');
console.log('Cloudflare site prepared in dist');
