// Contrato de contraste del secundario, calculado desde la fuente distribuida.
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const css = readFileSync(new URL('../projects/comsatel-ds/src/styles/tokens.css', import.meta.url), 'utf8');
const primitives = readFileSync(new URL('../projects/comsatel-ds/src/lib/tokens/primitive-colors.ts', import.meta.url), 'utf8').match(/secondary: \{([^}]+)\}/)[1];
const blocks = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)];
const variables = body => Object.fromEntries([...body.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map(m => [m[1], m[2].trim()]));
const light = variables(blocks.find(m => m[1].includes('[data-theme="light"]'))[2]);
const dark = { ...light, ...variables(blocks.find(m => m[1].includes('[data-theme="dark"]'))[2]) };
const resolve = (vars, name) => {
  const value = vars[name];
  assert.ok(value, `Token ausente: ${name}`);
  return value.startsWith('var(') ? resolve(vars, value.slice(4, -1)) : value;
};
const luminance = hex => hex.slice(1).match(/../g).map(v => parseInt(v, 16) / 255)
  .map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
  .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
const ratio = (a, b) => (Math.max(luminance(a), luminance(b)) + 0.05) / (Math.min(luminance(a), luminance(b)) + 0.05);
let previous = 1;
for (const [, step, value] of primitives.matchAll(/"(\d+)": "(#[\da-f]+)"/g)) {
  assert.equal(light[`--color-primitive-secondary-${step}`], value, `Escala CSS/TS distinta en ${step}`);
  assert.ok(luminance(value) < previous, `La luminancia debe disminuir en ${step}`);
  previous = luminance(value);
}
for (const [theme, vars] of Object.entries({ light, dark })) {
  const backgrounds = Object.keys(vars).filter(k => k.startsWith('--color-background-secondary-') || k === '--elevation-surface-secondary');
  for (const [foreground, minimum] of [['--color-text-secondary-default', 4.5], ['--color-border-secondary-default', 3], ['--color-icon-secondary-default', 3]]) {
    const contrasts = backgrounds.map(bg => ratio(resolve(vars, foreground), resolve(vars, bg)));
    assert.ok(contrasts.every(v => v >= minimum), `${theme}: ${foreground} incumple ${minimum}:1`);
    console.log(`${theme}: ${foreground}, mínimo ${Math.min(...contrasts).toFixed(2)}:1 en ${backgrounds.length} superficies/estados`);
  }
  for (const role of ['subtlest', 'subtle']) {
    const prefix = `--color-background-secondary-${role}`;
    assert.equal(new Set(['', '-hover', '-pressed'].map(s => resolve(vars, prefix + s))).size, 3, `${theme}: estados indistinguibles de ${role}`);
  }
}
