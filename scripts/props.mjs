/**
 * Regenera las tablas de props de las guías desde el código de cada componente.
 * Nombre, tipo y default salen del código; la descripción se escribe a mano en la tabla
 * y se conserva al regenerar. Con `--check` no escribe nada y falla si una tabla quedó
 * desactualizada o tiene una prop sin describir.
 */
import { writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { code, components, guideFiles, readText, rel, renderType, replaceBlocks } from './lib/ds.mjs';

export const MISSING = 'Sin descripción';

function descriptions(block) {
  const map = new Map();
  for (const line of block.split('\n')) {
    if (!line.startsWith('|') || /^\|\s*:?-/.test(line) || /^\|\s*Prop\s*\|/.test(line)) continue;
    const cells = line.split(/(?<!\\)\|/).slice(1, -1).map((c) => c.trim());
    if (cells.length < 2) continue;
    const text = cells[cells.length - 1].replace(/^\*\*Requerido\.\*\*\s*/, '');
    if (!text || text === MISSING) continue;
    for (const m of cells[0].matchAll(/`([^`]+)`/g)) map.set(m[1], text);
  }
  return map;
}

function defaultCell(input) {
  if (input.required) return 'requerido';
  if (input.defaultValue === undefined) return code('undefined');
  if (input.defaultValue.includes('++')) return 'autogenerado';
  return code(input.defaultValue);
}

export function renderProps(component, previousBlock = '') {
  const known = descriptions(previousBlock);
  const describe = (name) => known.get(name) || MISSING;
  const rows = [
    ...component.inputs.map((i) => `| ${code(i.name)} | ${code(renderType(i.type))} | ${defaultCell(i)} | ${describe(i.name)} |`),
    ...component.outputs.map((o) => `| ${code(o.name)} | ${code(o.type)} | n/a | ${describe(o.name)} |`),
  ];
  return [
    `<!-- props:start ${component.name} -->`,
    `<!-- generado por scripts/props.mjs desde ${component.file}: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->`,
    '',
    '| Prop | Type | Default | Description |',
    '| :-- | :-- | :-- | :-- |',
    ...(rows.length ? rows : ['| n/a | n/a | n/a | Sin props propias: se usa por composición. |']),
    '<!-- props:end -->',
  ].join('\n');
}

export function regenerate(text, byName) {
  const unknown = [];
  const next = replaceBlocks(text, 'props', (name, block) => {
    const component = byName.get(name);
    if (!component) {
      unknown.push(name);
      return block;
    }
    return renderProps(component, block);
  });
  return { next, unknown };
}

function main() {
  const check = process.argv.includes('--check');
  const byName = new Map(components().map((c) => [c.name, c]));
  const problems = [];
  let rewritten = 0;
  for (const path of guideFiles()) {
    const text = readText(path);
    const { next, unknown } = regenerate(text, byName);
    for (const name of unknown) problems.push(`${rel(path)}: el bloque de props nombra a \`${name}\`, que la librería no exporta`);
    if (check) {
      if (next !== text) problems.push(`${rel(path)}: tabla de props desactualizada, corre \`npm run docs:props\``);
      next.split('\n').forEach((line, n) => {
        if (line.includes(`| ${MISSING} |`)) problems.push(`${rel(path)}:${n + 1}: prop sin describir`);
      });
    } else if (next !== text) {
      writeFileSync(path, next);
      rewritten++;
    }
  }
  if (problems.length) {
    console.error(problems.join('\n'));
    process.exit(1);
  }
  console.log(check ? 'tablas de props: al día' : `tablas de props: ${rewritten} guías regeneradas`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) main();
