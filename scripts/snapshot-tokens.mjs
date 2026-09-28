import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const path = 'projects/comsatel-ds/src/styles/tokens.css';
const before = execFileSync('git', ['show', `9a70e0c:${path}`], { cwd: repo, encoding: 'utf8' });
const after = readFileSync(resolve(repo, path), 'utf8');
const families = ['--layout-', '--radius-', '--shadow-', '--elevation-z-index-', '--motion-'];

function snapshot(css, theme) {
  const values = new Map();
  for (const [, selector, body] of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const names = selector.replace(/\/\*[\s\S]*?\*\//g, '').split(',').map((name) => name.trim());
    if (!names.includes(':root') && !names.includes(`[data-theme="${theme}"]`)) continue;
    for (const [, name, value] of body.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) {
      values.set(name, value.trim());
    }
  }
  function resolved(name, chain = []) {
    if (chain.includes(name)) throw new Error(`Alias circular: ${[...chain, name].join(' → ')}`);
    const raw = values.get(name);
    if (raw === undefined) throw new Error(`Token sin valor: ${name}`);
    return raw.replace(/var\(\s*(--[\w-]+)\s*\)/g, (_, alias) => resolved(alias, [...chain, name]));
  }
  return new Map([...values.keys()].filter((name) => families.some((family) => name.startsWith(family)))
    .map((name) => [name, resolved(name)]));
}

let differences = 0;
for (const theme of ['light', 'dark', 'glass']) {
  const original = snapshot(before, theme);
  const current = snapshot(after, theme);
  const names = new Set([...original.keys(), ...current.keys()]);
  for (const name of names) {
    if (original.get(name) !== current.get(name)) {
      // Un primitivo nuevo que conserva el valor de un alias existente no cambia ningún valor previo.
      if (name === '--layout-radius-none' && !original.has(name) && current.get(name) === original.get('--radius-none')) continue;
      console.error(`${theme} ${name}: ${original.get(name) ?? '(ausente)'} → ${current.get(name) ?? '(ausente)'}`);
      differences++;
    }
  }
  console.log(`${theme}: ${original.size} tokens previos comparados`);
}
if (differences) process.exitCode = 1;
else console.log('Valores resueltos idénticos a 9a70e0c.');
