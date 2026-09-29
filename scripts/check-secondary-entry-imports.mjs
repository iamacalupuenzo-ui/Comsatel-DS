// Un punto de entrada secundario (/icons, /button, /menu…) solo importa de sí mismo o de otro
// subpath que exista, y sin ciclos entre entradas. Si importara la raíz
// '@iamacalupuenzo-ui/comsatel-ds', se armaría el ciclo raíz → subpath → raíz y el consumidor
// volvería a cargar la librería entera. Si saliera por ruta relativa, ng-packagr lo rechaza
// (rootDir) o duplica la clase. Las historias (*.stories.ts) y pruebas (*.spec.ts) no van en el
// paquete, así que pueden importar componentes que siguen en src/lib.
import { existsSync, readdirSync } from 'node:fs';
import { basename, dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROOT, readText, rel } from './lib/ds.mjs';

const LIB_ROOT = join(ROOT, 'projects', 'comsatel-ds');
const PACKAGE = '@iamacalupuenzo-ui/comsatel-ds';
const IMPORT = /(?:\bfrom\s*|\bimport\s*\(?\s*)(['"`])([^'"`]+)\1/g;

const lineOf = (text, offset) => text.slice(0, offset).split('\n').length;

/**
 * Imports prohibidos de un archivo que vive dentro de la entrada `entryDir`.
 * `entries` (opcional) son los nombres de subpath que existen, para marcar los inexistentes.
 */
export function importViolations(text, file, entryDir, entries = null) {
  const out = [];
  const own = basename(entryDir);
  for (const m of text.matchAll(IMPORT)) {
    const spec = m[2];
    const where = `${rel(file)}:${lineOf(text, m.index)}`;
    if (spec === PACKAGE) {
      out.push(`Entrada secundaria: ${where} importa desde la raíz '${PACKAGE}'; importa por subpath ('${PACKAGE}/<entrada>').`);
    } else if (spec.startsWith(`${PACKAGE}/`)) {
      const target = spec.slice(PACKAGE.length + 1);
      if (target === own) out.push(`Entrada secundaria: ${where} importa su propio subpath '${spec}'; usa una ruta relativa.`);
      else if (entries && !entries.includes(target)) out.push(`Entrada secundaria: ${where} importa '${spec}', que no es un punto de entrada.`);
    } else if (spec.startsWith('.')) {
      const inside = relative(entryDir, resolve(dirname(file), spec));
      if (inside.split(sep)[0] === '..') {
        out.push(`Entrada secundaria: ${where} sale de su carpeta con '${spec}'; usa el subpath de la otra entrada.`);
      }
    }
  }
  return out;
}

/** Subpaths que importa el texto (sin repetir), para armar el grafo entre entradas. */
export function entryDependencies(text) {
  const deps = new Set();
  for (const m of text.matchAll(IMPORT)) {
    if (m[2].startsWith(`${PACKAGE}/`)) deps.add(m[2].slice(PACKAGE.length + 1));
  }
  return [...deps];
}

/** Primer ciclo del grafo { entrada: [dependencias] }, como recorrido 'a → b → a'; null si no hay. */
export function findCycle(graph) {
  const state = {};
  const stack = [];
  const visit = (node) => {
    state[node] = 'visiting';
    stack.push(node);
    for (const dep of graph[node] ?? []) {
      if (state[dep] === 'visiting') return [...stack.slice(stack.indexOf(dep)), dep].join(' → ');
      if (!state[dep]) {
        const found = visit(dep);
        if (found) return found;
      }
    }
    stack.pop();
    state[node] = 'done';
    return null;
  };
  for (const node of Object.keys(graph)) {
    if (!state[node]) {
      const found = visit(node);
      if (found) return found;
    }
  }
  return null;
}

/** Carpetas de entradas secundarias: las que tienen su propio ng-package.json. */
export function secondaryEntries(root = LIB_ROOT) {
  return readdirSync(root, { withFileTypes: true })
    .filter((e) => e.isDirectory() && existsSync(join(root, e.name, 'ng-package.json')))
    .map((e) => join(root, e.name));
}

/** Archivos que van en el paquete: sin historias ni pruebas. */
function packagedTsFiles(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) packagedTsFiles(path, out);
    else if (entry.name.endsWith('.ts') && !/\.(stories|spec)\.ts$/.test(entry.name)) out.push(path);
  }
  return out;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const dirs = secondaryEntries();
  const names = dirs.map((d) => basename(d));
  const failures = [];
  const graph = {};
  for (const dir of dirs) {
    const deps = new Set();
    for (const file of packagedTsFiles(dir)) {
      const text = readText(file);
      failures.push(...importViolations(text, file, dir, names));
      entryDependencies(text).forEach((d) => d !== basename(dir) && deps.add(d));
    }
    graph[basename(dir)] = [...deps];
  }
  // Cada nombre importado de otro subpath tiene que estar en su public-api: si no, el build de
  // ng-packagr falla lejos de la causa ("has no exported member").
  const DECL = /export (?:declare )?(?:abstract )?(?:class|interface|type|const|let|function|enum)\s+(\w+)/g;
  const exportsOf = Object.fromEntries(dirs.map((dir) => {
    const names = new Set();
    for (const m of readText(join(dir, 'public-api.ts')).matchAll(/export \* from '\.\/([^']+)'/g)) {
      for (const d of readText(join(dir, `${m[1]}.ts`)).matchAll(DECL)) names.add(d[1]);
    }
    return [basename(dir), names];
  }));
  const allTs = [join(LIB_ROOT, 'src', 'lib'), ...dirs.map((d) => join(d, 'src'))].filter(existsSync).flatMap((d) => packagedTsFiles(d));
  for (const file of allTs) {
    const text = readText(file);
    for (const m of text.matchAll(/import\s+(?:type\s+)?\{([^}]+)\}\s+from\s+['"]@iamacalupuenzo-ui\/comsatel-ds\/([a-z-]+)['"]/g)) {
      for (const raw of m[1].split(',').map((n) => n.trim()).filter(Boolean)) {
        const name = raw.replace(/^type\s+/, '').split(/\s+as\s+/)[0];
        if (exportsOf[m[2]] && !exportsOf[m[2]].has(name)) failures.push(`${rel(file)}:${lineOf(text, m.index)} importa ${name} de /${m[2]}, que no lo exporta: agrégalo a projects/comsatel-ds/${m[2]}/public-api.ts.`);
      }
    }
  }
  const cycle = findCycle(graph);
  if (cycle) failures.push(`Ciclo entre entradas secundarias: ${cycle}`);
  if (failures.length) {
    console.error(failures.join('\n'));
    process.exit(1);
  }
  console.log(`entradas secundarias: ${dirs.length} sin imports hacia la raíz, fuera de su carpeta ni ciclos`);
}
