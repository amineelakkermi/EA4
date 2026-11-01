// Usage: node scripts/stills.mjs 10 60 120 ...   -> out/stills/f0010.png ...
import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs';

const frames = process.argv.slice(2).map(Number);
const id = process.env.COMP || 'EA4SeoReel';
const outDir = path.resolve('out/stills');
fs.mkdirSync(outDir, {recursive: true});
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts'), publicDir: path.resolve('public')});
const composition = await selectComposition({serveUrl, id, inputProps: {}});
for (const f of frames) {
  const output = path.join(outDir, `f${String(f).padStart(4, '0')}.png`);
  await renderStill({composition, serveUrl, output, frame: f, inputProps: {}, chromiumOptions: {gl: 'angle'}});
  console.log(output);
}
process.exit(0);
