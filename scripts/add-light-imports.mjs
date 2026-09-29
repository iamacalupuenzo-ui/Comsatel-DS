// Agrega a cada guía la línea «Import liviano» con el subpath de sus componentes.
// Uso: node scripts/add-light-imports.mjs <entrada> <entrada> …
// Los componentes salen de los bloques <!-- props:start X --> de la guía y de la carpeta donde vive
// cada clase (projects/comsatel-ds/<entrada>/src); no se escriben a mano. Una guía que ya tiene
// «Import liviano» no se toca.
import { writeFileSync } from 'node:fs';
import { GUIDES, blockNames, components, guideFiles, readText } from './lib/ds.mjs';

const PKG = '@iamacalupuenzo-ui/comsatel-ds';
const wave = new Set(process.argv.slice(2));
const entryOf = new Map(components().map((c) => [c.name, c.file.match(/^projects\/comsatel-ds\/([a-z-]+)\/src\//)?.[1]]));
const REF = 'ver «Importar desde un subpath» en `docs/consumer-angular.md`';
const report = [];

for (const file of guideFiles(GUIDES)) {
  let text = readText(file);
  if (text.includes('**Import liviano:**')) continue;
  const byEntry = {};
  for (const name of blockNames(text, 'props')) {
    const entry = entryOf.get(name);
    if (entry && wave.has(entry)) (byEntry[entry] ??= []).push(name);
  }
  const lines = Object.entries(byEntry).map(([entry, names]) => `- **Import liviano:** \`import { ${[...new Set(names)].join(', ')} } from '${PKG}/${entry}';\` (${REF})`);
  if (!lines.length) continue;
  const anchor = text.match(/^- \*\*Import:\*\*.*$/m);
  if (!anchor) {
    report.push(`SIN línea Import: ${file}`);
    continue;
  }
  text = text.replace(anchor[0], `${anchor[0]}\n${lines.join('\n')}`);
  writeFileSync(file, text);
  report.push(`${file.split(/[\\/]/).pop()}: ${Object.keys(byEntry).join(', ')}`);
}
console.log(report.join('\n'));
