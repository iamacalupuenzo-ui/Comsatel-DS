// Alcance incremental: componentes reconstruidos, no deuda histórica ajena.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
export const componentStyles = [
  'projects/comsatel-ds/dropdown/src/input-dropdown.css',
  'projects/comsatel-ds/fleet-unit-list/src/fleet-unit-list.css',
  'projects/comsatel-ds/card/src/action-card.css',
  'projects/comsatel-ds/shared/src/focus.css',
  'projects/comsatel-ds/select/src/select.css',
  'src/app/pages/motion-demo/collapsible-panel-example.css',
];
// CSS no permite var() en media queries. Conserva el umbral histórico md - 1.
const exceptions = [{ path: componentStyles[1], literal: '767px', count: 1,
  reason: 'Breakpoint md (768) menos uno; @media no admite custom properties.' }];

export function looseValues(source) {
  const css = source.replace(/\/\*[\s\S]*?\*\//g, '');
  return [...css.matchAll(/#[\da-f]{3,8}\b|\b\d*\.?\d+(?:px|ms|s)\b|(?:rgb|hsl)a?\([^)]*\)|z-index\s*:\s*\d+/gi)].map(match => match[0]);
}

export function checkStyles(paths) {
  const errors = [];
  for (const path of paths) {
    const values = looseValues(readFileSync(resolve(root, path), 'utf8'));
    for (const exception of exceptions.filter(item => item.path === path)) {
      const count = values.filter(value => value === exception.literal).length;
      if (count !== exception.count) errors.push(`${path}: revisar excepción ${exception.literal}, esperaba ${exception.count}, recibió ${count}`);
      for (let i = values.length - 1; i >= 0; i--) if (values[i] === exception.literal) values.splice(i, 1);
    }
    for (const literal of values) errors.push(`${path}: valor sin token ${literal}`);
  }
  return errors;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const paths = process.argv.slice(2);
  const errors = checkStyles(paths.length ? paths : componentStyles);
  if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
  else console.log('Tokens de componentes: alcance revisado sin valores sueltos; excepción de breakpoint documentada.');
}
