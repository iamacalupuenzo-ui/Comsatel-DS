// Antes de publicar: el tarball debe traer la raíz, cada subpath y los estilos, con los archivos
// a los que apunta "exports". Si un subpath se pierde, el consumidor falla al importar y el
// build de la librería no lo nota. Usa npm pack --dry-run: no crea el .tgz ni publica nada.
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';
import { ROOT, readText } from './lib/ds.mjs';

const DIST = join(ROOT, 'dist', 'comsatel-ds');
const REQUIRED = ['.', './icons', './input', './motion', './styles.css'];

const pack = spawnSync('npm pack --dry-run --json', { cwd: DIST, encoding: 'utf8', shell: true });
if (pack.status !== 0) {
  console.error(pack.stderr || 'npm pack --dry-run falló');
  process.exit(1);
}
const files = new Set(JSON.parse(pack.stdout)[0].files.map((f) => f.path.replace(/^\.\//, '')));
const manifest = JSON.parse(readText(join(DIST, 'package.json')));
const exportsMap = manifest.exports ?? {};
const failures = [];

for (const key of REQUIRED) {
  if (!exportsMap[key]) failures.push(`exports no declara "${key}"`);
}
for (const [key, value] of Object.entries(exportsMap)) {
  const targets = typeof value === 'string' ? [value] : Object.values(value);
  for (const target of targets) {
    const path = String(target).replace(/^\.\//, '');
    if (!files.has(path)) failures.push(`exports["${key}"] apunta a ${target}, que no está en el tarball`);
  }
  // Cada entrada de JavaScript debe traer código y tipos.
  if (key !== './package.json' && key !== './styles.css' && typeof value === 'object' && (!value.types || !value.default)) {
    failures.push(`exports["${key}"] no declara "types" y "default"`);
  }
}
for (const css of ['styles.css', 'tokens.css', 'typography-tokens.css']) {
  if (!files.has(css)) failures.push(`falta ${css} en el tarball`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`tarball: ${REQUIRED.length} exports obligatorios y ${files.size} archivos verificados`);
