// Enlaza dist/comsatel-ds como el paquete @iamacalupuenzo-ui/comsatel-ds en node_modules.
//
// Por qué: el sitio, Storybook y los tests consumen la librería construida. Con el paquete
// enlazado, TypeScript y esbuild resuelven la raíz y los subpaths (/icons, /motion, /input)
// por el "exports" publicado, igual que un consumidor real, sin paths a archivos internos de
// ng-packagr (fesm2022/, types/). Corre al final de build:lib, así también funciona en CI
// después de npm ci. Un npm install posterior puede borrar el enlace: build:lib lo recrea.
import { existsSync, lstatSync, mkdirSync, rmSync, symlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { ROOT } from './lib/ds.mjs';

const target = join(ROOT, 'dist', 'comsatel-ds');
const link = join(ROOT, 'node_modules', '@iamacalupuenzo-ui', 'comsatel-ds');

if (!existsSync(join(target, 'package.json'))) {
  console.error('No existe dist/comsatel-ds/package.json: corre primero ng build comsatel-ds.');
  process.exit(1);
}

mkdirSync(dirname(link), { recursive: true });
// lstat, no exists: un enlace roto también hay que reemplazarlo.
let current = null;
try { current = lstatSync(link); } catch { /* no existe */ }
if (current) {
  if (!current.isSymbolicLink()) {
    console.error(`${link} es una carpeta real, no un enlace: bórrala a mano si es una copia vieja del paquete.`);
    process.exit(1);
  }
  rmSync(link, { force: true });
}
// junction en Windows (no pide permisos de administrador); symlink de carpeta en Linux/macOS.
symlinkSync(target, link, process.platform === 'win32' ? 'junction' : 'dir');
console.log('paquete enlazado: node_modules/@iamacalupuenzo-ui/comsatel-ds -> dist/comsatel-ds');
