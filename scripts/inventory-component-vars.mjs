import { readFileSync, readdirSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const lib = resolve(root, 'projects/comsatel-ds/src/lib');
const styles = resolve(root, 'projects/comsatel-ds/src/styles');
const definitions = new Set();
for (const file of ['tokens.css', 'typography-tokens.css']) {
  const css = readFileSync(join(styles, file), 'utf8');
  for (const match of css.matchAll(/(--[\w-]+)\s*:/g)) definitions.add(match[1]);
}

function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? files(path) : [path];
  });
}

const missing = [];
let references = 0;
const sources = files(lib).filter(path => /\.(css|html|ts)$/.test(path))
  .map(path => ({ path, source: readFileSync(path, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '') }));
for (const { source } of sources) {
  for (const match of source.matchAll(/(--[\w-]+)\s*:/g)) definitions.add(match[1]);
  for (const match of source.matchAll(/\[style\.(--[\w-]+)\]/g)) definitions.add(match[1]);
}
for (const { path, source } of sources) {
  for (const match of source.matchAll(/var\(\s*(--[\w-]+)/g)) {
    // avatar compone el sufijo online/busy/offline en tiempo de ejecución.
    if (match[1] === '--color-status-' && /' \+ status \+ '\)'/.test(source.slice(match.index, match.index + 60))) continue;
    // typography.ts compone nombres válidos desde su escala tipada.
    if (path.endsWith('typography.ts') && /^--font-(family|size|line-height|weight|letter-spacing)-$/.test(match[1])) continue;
    references++;
    if (!definitions.has(match[1])) missing.push(`${relative(root, path)}: ${match[1]}`);
  }
}
if (missing.length) {
  console.error(`Referencias sin definición (${missing.length}):\n${[...new Set(missing)].join('\n')}`);
  process.exitCode = 1;
} else {
  console.log(`${references} referencias var() de componentes verificadas; cero tokens sin definición.`);
}
