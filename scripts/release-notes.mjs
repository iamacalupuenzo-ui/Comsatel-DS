import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/(.:\/)/, '$1');
const packagePath = join(ROOT, 'projects', 'comsatel-ds', 'package.json');
const packageVersion = JSON.parse(readFileSync(packagePath, 'utf8')).version;
const version = process.env.RELEASE_NOTES_VERSION || packageVersion;
const notePath = join(ROOT, 'docs', 'releases', `${version}.md`);
const requiredHeadings = ['## Resumen', '## Cambios', '## Impacto para consumidores', '## Verificación'];

if (!existsSync(notePath)) {
  console.error(`Falta la nota de versión docs/releases/${version}.md`);
  process.exit(1);
}

const note = readFileSync(notePath, 'utf8').replace(/\r\n/g, '\n');
const failures = [];
if (!note.startsWith(`# Comsatel DS v${version}\n`)) failures.push(`el título debe ser "# Comsatel DS v${version}"`);
for (const heading of requiredHeadings) if (!note.includes(`${heading}\n`)) failures.push(`falta la sección "${heading}"`);
if (/\bTODO\b|\[pendiente\]/i.test(note)) failures.push('contiene marcadores pendientes');

if (failures.length) {
  console.error(`Nota de versión inválida (${version}):\n- ${failures.join('\n- ')}`);
  process.exit(1);
}

console.log(`nota de versión: docs/releases/${version}.md`);
