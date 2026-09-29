// Antes de publicar: el tarball debe traer la raíz, cada subpath y los estilos, con los archivos
// a los que apunta "exports". Si un subpath se pierde, el consumidor falla al importar y el
// build de la librería no lo nota. Usa npm pack --dry-run: no crea el .tgz ni publica nada.
import { spawnSync } from 'node:child_process';
import { basename, join } from 'node:path';
import { secondaryEntries } from './check-secondary-entry-imports.mjs';
import { ROOT, readText } from './lib/ds.mjs';

const DIST = join(ROOT, 'dist', 'comsatel-ds');
/**
 * Entradas de JavaScript: la raíz y cada carpeta con ng-package.json propio. Cada una exige código
 * (fesm2022/*.mjs) y tipos (types/*.d.ts). Se derivan del repo para que una entrada nueva no
 * pueda quedar fuera del paquete sin que falle.
 */
const JS_ENTRIES = ['.', ...secondaryEntries().map((dir) => './' + basename(dir))];
const CSS_FILES = ['styles.css', 'tokens.css', 'typography-tokens.css'];

const fail = (message) => {
  console.error(message);
  process.exit(1);
};

const pack = spawnSync('npm pack --dry-run --json', { cwd: DIST, encoding: 'utf8', shell: true });
if (pack.status !== 0) fail(`npm pack --dry-run falló en dist/comsatel-ds:\n${pack.stderr}`);
let listing;
try {
  listing = JSON.parse(pack.stdout)[0];
} catch {
  fail(`npm pack --dry-run no devolvió JSON válido:\n${pack.stdout.slice(0, 500)}`);
}
if (!listing?.files?.length) fail('npm pack --dry-run no listó archivos: ¿se construyó la librería?');

const files = new Set(listing.files.map((f) => f.path.replace(/^\.\//, '')));
const manifest = JSON.parse(readText(join(DIST, 'package.json')));
const exportsMap = manifest.exports ?? {};
const failures = [];
// Al revés también: un export que el repo no conoce es un subpath fantasma.
for (const key of Object.keys(exportsMap)) {
  if (!JS_ENTRIES.includes(key) && key !== './package.json' && key !== './styles.css') failures.push(`exports declara "${key}", que no es una entrada del repo`);
}
const inPackage = (target) => files.has(String(target).replace(/^\.\//, ''));

for (const key of JS_ENTRIES) {
  const entry = exportsMap[key];
  if (!entry || typeof entry !== 'object') {
    failures.push(`exports no declara "${key}" con condiciones types y default`);
    continue;
  }
  // Ruta exacta de cada entrada, para que un export no apunte al archivo de otra:
  // '@iamacalupuenzo-ui/comsatel-ds' + '/icons' → iamacalupuenzo-ui-comsatel-ds-icons.
  const base = manifest.name.replace(/^@/, '').replace('/', '-') + (key === '.' ? '' : `-${key.slice(2)}`);
  const expected = { types: `./types/${base}.d.ts`, default: `./fesm2022/${base}.mjs` };
  for (const condition of ['types', 'default']) {
    if (entry[condition] !== expected[condition]) failures.push(`exports["${key}"].${condition} debe ser ${expected[condition]} (es ${entry[condition]})`);
  }
  for (const condition of ['types', 'default']) {
    if (entry[condition] && !inPackage(entry[condition])) failures.push(`exports["${key}"].${condition} apunta a ${entry[condition]}, que no está en el paquete`);
  }
}

const styles = exportsMap['./styles.css'];
const stylesTarget = typeof styles === 'string' ? styles : styles?.default;
if (!stylesTarget) failures.push('exports no declara "./styles.css"');
else if (!inPackage(stylesTarget)) failures.push(`exports["./styles.css"] apunta a ${stylesTarget}, que no está en el paquete`);
for (const css of CSS_FILES) {
  if (!files.has(css)) failures.push(`falta ${css} en el paquete`);
}

if (failures.length) fail(failures.join('\n'));
console.log(`paquete: ${JS_ENTRIES.length} entradas con código y tipos, estilos y ${files.size} archivos verificados`);
