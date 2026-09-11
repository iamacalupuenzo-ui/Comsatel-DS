/**
 * Falla si un componente o directiva que exporta `public-api.ts` no tiene tabla de props
 * y contrato a11y generados en alguna guía. La exportación es la mitad barata y la guía
 * la cara: sin este gate, siempre llega primero la exportación.
 *
 * Una excepción real va en guidelines/allowlist.json, con la razón.
 */
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { GUIDES, blockNames, components, guideFiles, readText, rel } from './lib/ds.mjs';

export function coverage(parts, guides, allow = {}) {
  const found = { props: new Map(), a11y: new Map() };
  const problems = [];
  for (const { path, text } of guides) {
    for (const tag of ['props', 'a11y']) {
      for (const name of blockNames(text, tag)) {
        if (found[tag].has(name)) problems.push(`${path}: \`${name}\` ya tiene bloque ${tag} en ${found[tag].get(name)}`);
        else found[tag].set(name, path);
      }
    }
  }
  const missing = [];
  for (const part of parts) {
    if (allow[part.name]) continue;
    for (const tag of ['props', 'a11y']) {
      if (!found[tag].has(part.name)) missing.push(`${part.name} (${part.selector}): falta el bloque ${tag}`);
    }
  }
  return { problems, missing, documented: parts.length - Object.keys(allow).length };
}

function main() {
  const allowPath = join(GUIDES, 'allowlist.json');
  const allow = existsSync(allowPath) ? JSON.parse(readFileSync(allowPath, 'utf8')).exports || {} : {};
  const guides = guideFiles().map((path) => ({ path: rel(path), text: readText(path) }));
  const parts = components();
  const { problems, missing, documented } = coverage(parts, guides, allow);

  for (const [name, reason] of Object.entries(allow)) console.log(`sin guía por excepción: ${name}: ${reason}`);
  if (problems.length || missing.length) {
    if (missing.length) {
      console.error(`${missing.length} bloque(s) faltante(s) para exportaciones públicas:`);
      missing.forEach((m) => console.error(`  ${m}`));
      console.error('\nAgrega `<!-- props:start Nombre --><!-- props:end -->` y `<!-- a11y:start Nombre --><!-- a11y:end -->` en su guía y corre `npm run docs`.');
    }
    problems.forEach((p) => console.error(p));
    process.exit(1);
  }
  console.log(`cobertura de guías: ${documented}/${documented} componentes y directivas exportados`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) main();
