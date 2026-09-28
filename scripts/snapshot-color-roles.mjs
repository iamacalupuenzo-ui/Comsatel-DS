import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const css = readFileSync(resolve(repo, 'projects/comsatel-ds/src/styles/tokens.css'), 'utf8');
const output = process.argv[2]
  ? resolve(process.argv[2])
  : resolve(repo, 'docs/refactor/ejecucion-plan-1/n0-snapshot-antes.json');

// Los bloques de tokens.css son planos; el orden conserva la cascada CSS.
const blocks = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map(([, selector, body]) => ({
  selector: selector.replace(/\/\*[\s\S]*?\*\//g, '').trim(),
  declarations: [...body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)],
}));

function declarationsFor(theme) {
  const values = new Map();
  for (const block of blocks) {
    const selectors = block.selector.split(',').map((part) => part.trim());
    if (selectors.includes(':root') || selectors.includes(`[data-theme="${theme}"]`)) {
      for (const [, name, value] of block.declarations) values.set(name, value.trim());
    }
  }
  return values;
}

function resolveColor(name, values, chain = []) {
  if (chain.includes(name)) throw new Error(`Alias circular: ${[...chain, name].join(' → ')}`);
  const raw = values.get(name);
  if (raw === undefined) throw new Error(`Token sin valor: ${name}`);
  const reference = /^var\(\s*(--[\w-]+)\s*\)$/.exec(raw);
  if (reference) return resolveColor(reference[1], values, [...chain, name]);
  const value = raw.toLowerCase().replace(/\s+/g, '');
  if (/^#[\da-f]{3}$/.test(value)) return `#${[...value.slice(1)].map((c) => c + c).join('')}`;
  if (/^#[\da-f]{6}$/.test(value)) return value;
  if (/^rgba?\(/.test(value)) {
    const channels = value.slice(value.indexOf('(') + 1, -1).split(',');
    if (channels.length === 3) return `#${channels.map((n) => Number(n).toString(16).padStart(2, '0')).join('')}`;
    if (channels.length === 4) return `rgba(${channels.join(',')})`;
  }
  throw new Error(`Color no reconocido en ${name}: ${raw}`);
}

const snapshot = {};
for (const theme of ['light', 'dark', 'glass']) {
  const values = declarationsFor(theme);
  const roles = [...values.keys()].filter((name) =>
    (name.startsWith('--color-') && !name.startsWith('--color-primitive-')) ||
    name.startsWith('--elevation-surface-'));
  snapshot[theme] = Object.fromEntries(roles.sort().map((name) => [name, resolveColor(name, values)]));
}
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, `${JSON.stringify(snapshot, null, 2)}\n`);
console.log(`${output}: ${Object.keys(snapshot.light).length} roles por contexto`);
