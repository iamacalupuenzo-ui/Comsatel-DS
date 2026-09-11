/**
 * Genera el contrato de accesibilidad de cada componente leyendo su template, su host y
 * su código: elementos nativos, roles, atributos ARIA, teclas que maneja, gestión de foco,
 * clic afuera, portal y componentes que compone. No describe intención, describe lo que el
 * código hace, así que no puede desalinearse sin que `--check` falle.
 */
import { writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { components, guideFiles, readText, rel, replaceBlocks } from './lib/ds.mjs';

const KEY_NAMES = { escape: 'Escape', enter: 'Enter', space: 'Space', tab: 'Tab', arrowup: 'ArrowUp', arrowdown: 'ArrowDown', arrowleft: 'ArrowLeft', arrowright: 'ArrowRight', home: 'Home', end: 'End' };
const list = (items) => [...new Set(items)].map((i) => `\`${i}\``).join(', ');

export function contract(component) {
  const { template, host, ts, css } = component;
  const rows = [];

  const natives = [...template.matchAll(/<(button|a|input|select|textarea|table|nav|label|ul|ol|dialog)\b([^>]*)>/g)].map(([, tag, attrs]) => {
    if (tag === 'input') return `input[type="${(attrs.match(/type="(\w+)"/) || [, 'text'])[1]}"]`;
    if (tag === 'a') return /routerLink/.test(attrs) ? 'a[routerLink]' : 'a[href]';
    return tag;
  });
  if (natives.length) rows.push(['Elementos nativos', list(natives)]);

  const roles = [
    ...[...template.matchAll(/\brole="([\w-]+)"/g)].map((m) => m[1]),
    ...[...host.matchAll(/'?role'?\s*:\s*'([\w-]+)'/g)].map((m) => m[1]),
    ...(/\[attr\.role\]/.test(template + host) ? ['[attr.role] (dinámico)'] : []),
  ];
  if (roles.length) rows.push(['Roles', list(roles)]);

  const aria = [
    ...[...template.matchAll(/\s(aria-[a-z]+)="([^"]*)"/g)].map((m) => (/[{}]/.test(m[2]) ? m[1] : `${m[1]}="${m[2]}"`)),
    ...[...template.matchAll(/\[(?:attr\.)?(aria-[a-z]+)\]/g)].map((m) => m[1]),
    ...[...host.matchAll(/'(aria-[a-z]+)'\s*:\s*'([^']*)'/g)].map((m) => `${m[1]}="${m[2]}"`),
    ...[...host.matchAll(/'\[attr\.(aria-[a-z]+)\]'/g)].map((m) => m[1]),
    ...[...ts.matchAll(/setAttribute\([^,]+,\s*'(aria-[a-z]+)'/g)].map((m) => m[1]),
  ];
  if (aria.length) rows.push(['Atributos ARIA', list(aria)]);

  const keys = [
    ...[...(ts + template).matchAll(/'(Escape|Enter|Tab|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|Home|End)'/g)].map((m) => m[1]),
    ...(/key\s*===?\s*' '/.test(ts) ? ['Space'] : []),
    ...[...(ts + template).matchAll(/keydown\.(\w+)/g)].map((m) => KEY_NAMES[m[1].toLowerCase()] || m[1]),
  ];
  if (keys.length) rows.push(['Teclas que maneja el código', list(keys)]);

  if (/\.focus\(/.test(ts)) rows.push(['Foco', 'Mueve el foco por código (`.focus()`)']);
  const outside = (ts + template).match(/document:(mousedown|pointerdown|click)/);
  if (outside) rows.push(['Clic afuera', `Escucha \`document:${outside[1]}\` para cerrarse`]);
  if (/body\.appendChild|appendChild\([^)]*body/.test(ts)) rows.push(['Portal', 'Se monta en `document.body`']);

  const composed = [...template.matchAll(/<(cs-[a-z0-9-]+)/g)].map((m) => m[1]).filter((s) => s !== component.selector);
  if (composed.length) rows.push(['Compone', list(composed)]);
  const directives = [...template.matchAll(/\b(csPressScale|csCollapse)\b/g)].map((m) => m[1]);
  if (directives.length) rows.push(['Directivas', list(directives)]);

  if (/\[attr\.inert\]|'\[attr\.inert\]'/.test(template + host)) rows.push(['Contenido oculto', 'Aplica `inert` mientras está oculto: sale del orden de foco y del árbol accesible']);
  if (/from 'gsap'/.test(ts)) rows.push(['prefers-reduced-motion', /prefers-reduced-motion|prefersReducedMotion\(/.test(ts + css) ? 'Lo respeta' : 'No lo consulta: la animación corre igual']);

  const body = rows.length
    ? ['| Aspecto | Qué hace el código |', '| :-- | :-- |', ...rows.map(([k, v]) => `| ${k} | ${v} |`)].join('\n')
    : 'No renderiza controles nativos, roles ni atributos ARIA propios, y no maneja teclado: es presentacional.';

  return [
    `<!-- a11y:start ${component.name} -->`,
    `<!-- generado por scripts/a11y.mjs desde ${component.file}: no editar a mano, corre npm run docs:a11y -->`,
    '',
    `#### Contrato a11y generado desde el código: \`${component.selector}\``,
    '',
    body,
    '<!-- a11y:end -->',
  ].join('\n');
}

function main() {
  const check = process.argv.includes('--check');
  const byName = new Map(components().map((c) => [c.name, c]));
  const problems = [];
  let rewritten = 0;
  for (const path of guideFiles()) {
    const text = readText(path);
    const next = replaceBlocks(text, 'a11y', (name, block) => {
      const component = byName.get(name);
      if (component) return contract(component);
      problems.push(`${rel(path)}: el bloque a11y nombra a \`${name}\`, que la librería no exporta`);
      return block;
    });
    if (next === text) continue;
    if (check) problems.push(`${rel(path)}: contrato a11y desactualizado, corre \`npm run docs:a11y\``);
    else {
      writeFileSync(path, next);
      rewritten++;
    }
  }
  if (problems.length) {
    console.error(problems.join('\n'));
    process.exit(1);
  }
  console.log(check ? 'contratos a11y: al día' : `contratos a11y: ${rewritten} guías regeneradas`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) main();
