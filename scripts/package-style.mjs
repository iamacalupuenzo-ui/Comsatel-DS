import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/(.:\/)/, '$1');
const dist = join(ROOT, 'dist', 'comsatel-ds');
const styleFiles = ['styles.css', 'tokens.css', 'typography-tokens.css'];

const missing = styleFiles.filter((file) => !existsSync(join(dist, file)));
if (missing.length) {
  console.error(`Faltan estilos públicos en dist/comsatel-ds: ${missing.join(', ')}`);
  process.exit(1);
}

const packagePath = join(dist, 'package.json');
const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
if (!packageJson.exports?.['.']) {
  console.error('El paquete compilado no contiene su punto de entrada principal.');
  process.exit(1);
}

packageJson.exports['./styles.css'] = { default: './styles.css' };
writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`);
console.log('estilos públicos: styles.css, tokens.css, typography-tokens.css');
