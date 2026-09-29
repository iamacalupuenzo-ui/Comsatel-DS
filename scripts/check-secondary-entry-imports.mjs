// Un punto de entrada secundario (/icons, /motion, /input…) solo importa de sí mismo o de
// otro subpath. Si importara la raíz '@iamacalupuenzo-ui/comsatel-ds', se armaría el ciclo
// raíz → subpath → raíz y el consumidor volvería a cargar la librería entera. Si saliera por
// ruta relativa hacia src/lib, ng-packagr lo rechaza (rootDir) o duplica la clase.
import { existsSync, readdirSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROOT, readText, rel } from './lib/ds.mjs';

const LIB_ROOT = join(ROOT, 'projects', 'comsatel-ds');
const PACKAGE = '@iamacalupuenzo-ui/comsatel-ds';

/** Imports prohibidos de un archivo que vive dentro de la entrada `entryDir`. */
export function importViolations(text, file, entryDir) {
  const out = [];
  const lines = text.split('\n');
  lines.forEach((line, index) => {
    for (const m of line.matchAll(/(?:from|import)\s+'([^']+)'/g)) {
      const spec = m[1];
      const where = `${rel(file)}:${index + 1}`;
      if (spec === PACKAGE) {
        out.push(`Entrada secundaria: ${where} importa desde la raíz '${PACKAGE}'; importa por subpath ('${PACKAGE}/<entrada>').`);
      } else if (spec.startsWith('.')) {
        const target = resolve(dirname(file), spec);
        const inside = relative(entryDir, target);
        if (inside.startsWith('..') || inside.split(sep)[0] === '..') {
          out.push(`Entrada secundaria: ${where} sale de su carpeta con '${spec}'; usa el subpath de la otra entrada.`);
        }
      }
    }
  });
  return out;
}

/** Carpetas de entradas secundarias: las que tienen su propio ng-package.json. */
export function secondaryEntries(root = LIB_ROOT) {
  return readdirSync(root, { withFileTypes: true })
    .filter((e) => e.isDirectory() && existsSync(join(root, e.name, 'ng-package.json')))
    .map((e) => join(root, e.name));
}

function tsFiles(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) tsFiles(path, out);
    else if (entry.name.endsWith('.ts')) out.push(path);
  }
  return out;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const entries = secondaryEntries();
  const failures = entries.flatMap((entry) => tsFiles(entry).flatMap((file) => importViolations(readText(file), file, entry)));
  if (failures.length) {
    console.error(failures.join('\n'));
    process.exit(1);
  }
  console.log(`entradas secundarias: ${entries.length} sin imports hacia la raíz ni fuera de su carpeta`);
}
