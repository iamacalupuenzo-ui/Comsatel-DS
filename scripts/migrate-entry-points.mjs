// Mueve carpetas de src/lib a puntos de entrada secundarios (@iamacalupuenzo-ui/comsatel-ds/<carpeta>).
// Uso: node scripts/migrate-entry-points.mjs tokens button brand …
//
// Por carpeta: git mv a projects/comsatel-ds/<carpeta>/src (ng-packagr exige las fuentes dentro de
// la entrada), ng-package.json y public-api.ts con lo mismo que exportaba la raíz, y la raíz pasa a
// reexportar el subpath. Después reescribe imports en toda la librería:
//   '../<entrada>/x'           → '@iamacalupuenzo-ui/comsatel-ds/<entrada>'
//   '@…/<misma entrada>'       → './archivo' (un subpath no se importa a sí mismo)
//   '../<carpeta de src/lib>'  → '../../src/lib/<carpeta>' desde un archivo movido (solo historias)
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, relative } from 'node:path';
import { ROOT, exportedSymbols } from './lib/ds.mjs';

const PKG = '@iamacalupuenzo-ui/comsatel-ds';
const LIB_ROOT = join(ROOT, 'projects', 'comsatel-ds');
const LIB = join(LIB_ROOT, 'src', 'lib');
const API = join(LIB_ROOT, 'src', 'public-api.ts');
const wave = process.argv.slice(2);
if (!wave.length) throw new Error('Indica las carpetas de la ola.');

const read = (f) => readFileSync(f, 'utf8');
const write = (f, s, crlf) => writeFileSync(f, crlf ? s.replace(/\n/g, '\r\n') : s);
const norm = (s) => ({ crlf: s.includes('\r\n'), text: s.replace(/\r\n/g, '\n') });
const git = (...args) => execFileSync('git', args, { cwd: ROOT, stdio: 'pipe' });
const isEntry = (name) => existsSync(join(LIB_ROOT, name, 'ng-package.json'));
const walk = (dir, out = []) => {
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(ts|css)$/.test(e.name)) out.push(p);
  }
  return out;
};

// 0. Guardas. Una carpeta con reexports indirectos (`export { X } from`, `export * from`) no se
// migra a ciegas: el mapa de símbolos de abajo solo entiende declaraciones exportadas.
for (const name of wave) {
  for (const f of walk(join(LIB, name)).filter((f) => f.endsWith('.ts') && !/\.(stories|spec)\.ts$/.test(f))) {
    if (/^export\s+(\*|\{[^}]*\})\s+from\s/m.test(read(f))) throw new Error(`${relative(ROOT, f)} tiene reexports: migra esa carpeta a mano.`);
  }
}
// La API pública antes de mover: al final debe ser idéntica.
const apiBefore = [...exportedSymbols()].sort();

// 1. Exports que la raíz tenía de cada carpeta de la ola (el contrato a conservar).
let api = norm(read(API));
const rootExports = {};
for (const m of api.text.matchAll(/^export \* from '\.\/lib\/([^/']+)\/([^']+)';$/gm)) {
  (rootExports[m[1]] ??= []).push(m[2]);
}

// 2. Mover fuentes y crear la entrada.
for (const name of wave) {
  const from = join(LIB, name);
  const to = join(LIB_ROOT, name, 'src');
  if (!existsSync(from)) throw new Error(`No existe src/lib/${name}`);
  mkdirSync(to, { recursive: true });
  for (const file of readdirSync(from)) git('mv', join(from, file), join(to, file));
  const pkgJson = join(LIB_ROOT, name, 'ng-package.json');
  if (!existsSync(pkgJson)) {
    writeFileSync(pkgJson, '{\n  "$schema": "../../../node_modules/ng-packagr/ng-package.schema.json",\n  "lib": { "entryFile": "public-api.ts" }\n}\n');
  }
  const entryApi = join(LIB_ROOT, name, 'public-api.ts');
  const previous = existsSync(entryApi) ? read(entryApi).replace(/\r\n/g, '\n') : `// Punto de entrada secundario: ${PKG}/${name}\n`;
  const lines = previous.split('\n').filter(Boolean);
  // Una carpeta sin exports en la raíz (como `shared`) es de apoyo interno: su subpath expone sus
  // archivos .ts para las otras entradas, pero la raíz no los reexporta (no amplía la API pública).
  const files = rootExports[name] ?? readdirSync(to).filter((f) => f.endsWith('.ts') && !/\.(stories|spec)\.ts$/.test(f)).map((f) => f.replace(/\.ts$/, ''));
  for (const file of files) {
    const line = `export * from './src/${file}';`;
    if (!lines.includes(line)) lines.push(line);
  }
  writeFileSync(entryApi, lines.join('\n') + '\n');
  // La raíz reexporta el subpath, en el lugar del primer export de la carpeta.
  let first = true;
  api.text = api.text.replace(new RegExp(`^export \\* from '\\./lib/${name}/[^']+';\\n`, 'gm'), () => {
    if (!first) return '';
    first = false;
    return `export * from '${PKG}/${name}';\n`;
  });
}
write(API, api.text, api.crlf);

// 3. Qué archivo de cada entrada exporta cada símbolo (para los imports de un subpath a sí mismo).
const symbolFile = (entry) => {
  const map = {};
  for (const f of walk(join(LIB_ROOT, entry, 'src')).filter((f) => f.endsWith('.ts'))) {
    for (const m of read(f).matchAll(/export (?:declare )?(?:abstract )?(?:class|interface|type|const|let|function|enum)\s+(\w+)/g)) map[m[1]] = f;
  }
  return map;
};
const entryOf = (file) => {
  const rel = relative(LIB_ROOT, file).split(/[\\/]/);
  return rel[0] !== 'src' && rel[1] === 'src' ? rel[0] : null;
};

// 4. Reescribir imports en toda la librería (src/lib y entradas).
const files = [...walk(LIB), ...readdirSync(LIB_ROOT).filter((d) => isEntry(d)).flatMap((d) => walk(join(LIB_ROOT, d, 'src')))];
const changed = [];
for (const file of files) {
  if (!file.endsWith('.ts')) continue;
  const { crlf, text } = norm(read(file));
  const own = entryOf(file);
  let out = text.replace(/(from\s*|import\s*\(?\s*)'(\.\.\/([a-z-]+)\/[^']+)'/g, (all, pre, spec, folder) => {
    if (isEntry(folder) && folder !== own) return `${pre}'${PKG}/${folder}'`;
    // Desde un archivo movido, las carpetas que siguen en src/lib quedan dos niveles más arriba.
    if (own && existsSync(join(LIB, folder))) return `${pre}'../../src/lib/${spec.slice(3)}'`;
    return all;
  });
  if (own) {
    // Import del propio subpath: se reparte por archivo con rutas relativas.
    const map = symbolFile(own);
    out = out.replace(new RegExp(`import (type )?\\{([^}]+)\\} from '${PKG}/${own}';`, 'g'), (all, typeKw, names) => {
      const byFile = {};
      for (const raw of names.split(',').map((n) => n.trim()).filter(Boolean)) {
        const symbol = raw.replace(/^type\s+/, '').split(/\s+as\s+/)[0];
        const target = map[symbol];
        if (!target) throw new Error(`${relative(ROOT, file)}: ${symbol} no está en la entrada ${own}`);
        const spec = './' + relative(dirname(file), target).replace(/\\/g, '/').replace(/\.ts$/, '');
        (byFile[spec.startsWith('./..') ? spec.slice(2) : spec] ??= []).push(raw);
      }
      return Object.entries(byFile).map(([spec, list]) => `import ${typeKw ?? ''}{ ${list.join(', ')} } from '${spec}';`).join('\n');
    });
  }
  if (out !== text) {
    write(file, out, crlf);
    changed.push(relative(ROOT, file).replace(/\\/g, '/'));
  }
}

// 5. @import de CSS entre carpetas: son recursos de compilación, no subpaths; se corrige la ruta
// relativa según dónde quedaron el archivo y su destino.
const locate = (folder) => (isEntry(folder) ? join(LIB_ROOT, folder, 'src') : join(LIB, folder));
for (const file of files.filter((f) => f.endsWith('.css'))) {
  const { crlf, text } = norm(read(file));
  const out = text.replace(/@import\s+'\.\.\/([a-z-]+)\/([^']+)'/g, (all, folder, rest) => {
    const target = join(locate(folder), rest);
    if (!existsSync(target)) return all;
    const spec = relative(dirname(file), target).replace(/\\/g, '/');
    return `@import '${spec.startsWith('.') ? spec : './' + spec}'`;
  });
  if (out !== text) {
    write(file, out, crlf);
    changed.push(relative(ROOT, file).replace(/\\/g, '/'));
  }
}

// 6. La API pública después de mover debe ser la misma.
const apiAfter = [...exportedSymbols()].sort();
const lost = apiBefore.filter((s) => !apiAfter.includes(s));
const gained = apiAfter.filter((s) => !apiBefore.includes(s));
if (lost.length || gained.length) {
  console.error(`La API pública cambió.\nFaltan: ${lost.join(', ') || '—'}\nSobran: ${gained.join(', ') || '—'}`);
  process.exit(1);
}
// 7. La auditoría de readiness (adsa) lee las fuentes de las carpetas de adsa.config.json: sin
// las entradas nuevas, cuenta los componentes movidos como no documentados y el gate baja de 45.
const adsa = join(ROOT, 'adsa.config.json');
const config = JSON.parse(read(adsa));
config.source = ['projects/comsatel-ds/src/lib', ...readdirSync(LIB_ROOT).filter((d) => isEntry(d)).sort().map((d) => `projects/comsatel-ds/${d}/src`)];
writeFileSync(adsa, JSON.stringify(config, null, 2) + '\n');

console.log(`entradas: ${wave.join(', ')}\n${changed.length} archivos reescritos; API pública intacta (${apiAfter.length} símbolos)`);
