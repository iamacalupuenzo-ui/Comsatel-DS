/**
 * `npm run gap:report -- "Qué falta" "Qué usar en su lugar" "Por qué o estado"`
 *
 * Agrega una fila a GAPS.md, que es el archivo que lee el próximo agente. Un hueco que
 * queda solo en un ticket o en un chat lo vuelve a encontrar el siguiente.
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, readText } from './lib/ds.mjs';

const [what, instead, why] = process.argv.slice(2);
if (!what || !instead) {
  console.error('Uso: npm run gap:report -- "Selector de color" "InputDropdown con los colores de marca" "Pendiente, sin responsable"');
  process.exit(1);
}

const path = join(ROOT, 'GAPS.md');
const lines = readText(path).split('\n');
const clean = (s) => s.replace(/\|/g, '/').trim();
const last = lines.reduce((at, line, n) => (line.startsWith('| ') && !line.startsWith('| :--') ? n : at), -1);
lines.splice(last + 1, 0, `| ${clean(what)} | ${clean(instead)} | ${clean(why || 'Reportado por un agente, sin decisión todavía')} |`);
writeFileSync(path, lines.join('\n'));
console.log(`GAPS.md: agregado "${clean(what)}"`);
