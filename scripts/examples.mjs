/**
 * Valida cada bloque de código de las guías contra la librería real.
 *
 * - ```ts: todo lo que se importa de `comsatel-ds` tiene que existir en `public-api.ts`.
 * - ```html: todo `<cs-*>` tiene que ser un selector real, y cada atributo una prop, un
 *   output, un slot de proyección o un atributo nativo válido. Un atributo estático sobre
 *   una prop `boolean` o `number` falla, porque Angular pasa texto (`<cs-button disabled>`
 *   deja el botón habilitado). Un valor estático sobre una unión de literales tiene que
 *   ser uno de sus literales. Un `<select>` nativo falla siempre.
 *
 * No es una compilación AOT de cada bloque: es la validación estática que atrapa las
 * mentiras más comunes de una guía (prop renombrada, selector borrado, valor inventado).
 * Para saltar un bloque a propósito: `<!-- examples:skip razón -->` en la línea anterior.
 */
import { pathToFileURL } from 'node:url';
import { components, exportedSymbols, guideFiles, literalsOf, projectionSlots, readText, rel, renderType } from './lib/ds.mjs';

const HOST_ATTRS = new Set(['id', 'class', 'style', 'role', 'tabindex', 'title', 'slot', 'dir', 'lang', 'hidden', 'routerLink']);
const NATIVE_EVENTS = new Set(['click', 'dblclick', 'keydown', 'keyup', 'focus', 'blur', 'focusin', 'focusout', 'mouseenter', 'mouseleave', 'mousedown', 'pointerdown', 'pointerup', 'input', 'change', 'submit']);

export function context() {
  const parts = components();
  return {
    symbols: exportedSymbols(),
    slots: projectionSlots(),
    bySelector: new Map(parts.filter((p) => !p.selector.startsWith('[')).map((p) => [p.selector, p])),
    directives: new Map(parts.filter((p) => p.selector.startsWith('[')).map((p) => [p.selector.slice(1, -1), p])),
  };
}

/** Etiquetas de apertura con sus atributos, respetando comillas. */
function tags(html) {
  const out = [];
  for (let i = html.indexOf('<'); i >= 0; i = html.indexOf('<', i + 1)) {
    const name = html.slice(i + 1).match(/^[a-z][\w-]*/);
    if (!name) continue;
    const attrs = [];
    let j = i + 1 + name[0].length;
    while (j < html.length && html[j] !== '>') {
      if (/[\s/]/.test(html[j])) { j++; continue; }
      const attr = html.slice(j).match(/^[^\s=>/]+/);
      if (!attr) { j++; continue; }
      j += attr[0].length;
      let value = null;
      if (html[j] === '=') {
        const quote = html[j + 1];
        const end = html.indexOf(quote, j + 2);
        value = html.slice(j + 2, end);
        j = end + 1;
      }
      attrs.push({ name: attr[0], value });
    }
    const line = html.slice(0, i).split('\n').length - 1;
    out.push({ tag: name[0], attrs, line });
    i = j;
  }
  return out;
}

function checkHtml(html, at, ctx) {
  const failures = [];
  for (const { tag, attrs, line } of tags(html)) {
    const where = at(line);
    if (tag === 'select') failures.push(`${where}: \`<select>\` nativo, usa \`cs-input-dropdown\` o \`cs-select\``);
    if (!tag.startsWith('cs-')) continue;
    const part = ctx.bySelector.get(tag);
    if (!part) {
      failures.push(`${where}: \`<${tag}>\` no es un selector de la librería`);
      continue;
    }
    const applied = attrs.map((a) => a.name.replace(/^\[|\]$/g, '')).filter((n) => ctx.directives.has(n)).map((n) => ctx.directives.get(n));
    const inputs = new Map([...part.inputs, ...applied.flatMap((d) => d.inputs)].map((i) => [i.name, i]));
    const outputs = new Set(part.outputs.map((o) => o.name));
    for (const { name, value } of attrs) {
      if (/^[#*]/.test(name) || /^\[(attr|class|style)\./.test(name) || ctx.directives.has(name)) continue;
      const twoWay = name.match(/^\[\((.+)\)\]$/);
      const bound = name.match(/^\[(.+)\]$/);
      const event = name.match(/^\((.+)\)$/);
      if (twoWay) {
        if (!inputs.has(twoWay[1]) || !outputs.has(`${twoWay[1]}Change`)) failures.push(`${where}: \`<${tag}>\` no admite two-way binding en \`${twoWay[1]}\``);
      } else if (bound) {
        if (!inputs.has(bound[1]) && !ctx.directives.has(bound[1])) failures.push(`${where}: \`<${tag}>\` no tiene la prop \`${bound[1]}\``);
      } else if (event) {
        const base = event[1].split('.')[0];
        if (!outputs.has(event[1]) && !NATIVE_EVENTS.has(base)) failures.push(`${where}: \`<${tag}>\` no emite \`${event[1]}\``);
      } else if (inputs.has(name)) {
        const type = renderType(inputs.get(name).type);
        if (/\b(boolean|number)\b/.test(type) && !/\bstring\b/.test(type) && !literalsOf(type)) failures.push(`${where}: \`${name}\` es \`${type}\`: un atributo estático pasa texto, usa \`[${name}]\``);
        const literals = literalsOf(type);
        if (literals && value !== null && !literals.includes(value)) failures.push(`${where}: \`${name}="${value}"\` no es un valor válido (${literals.join(', ')})`);
      } else if (!(HOST_ATTRS.has(name) || /^(aria|data)-/.test(name) || (value === null && ctx.slots.has(name)))) {
        failures.push(`${where}: \`<${tag}>\` no tiene la prop \`${name}\``);
      }
    }
  }
  return failures;
}

function checkTs(ts, at, ctx) {
  const failures = [];
  for (const m of ts.matchAll(/import\s*(?:type\s*)?\{([^}]*)\}\s*from\s*'comsatel-ds'/g)) {
    const line = ts.slice(0, m.index).split('\n').length - 1;
    for (const raw of m[1].split(',')) {
      const name = raw.replace(/^\s*type\s+/, '').split(/\s+as\s+/)[0].trim();
      if (name && !ctx.symbols.has(name)) failures.push(`${at(line)}: \`${name}\` no lo exporta \`comsatel-ds\``);
    }
  }
  return failures;
}

export function checkMarkdown(text, path, ctx) {
  const lines = text.split('\n');
  const failures = [];
  let blocks = 0;
  for (let i = 0; i < lines.length; i++) {
    const fence = lines[i].match(/^```(html|ts)\s*$/);
    if (!fence) continue;
    const end = lines.indexOf('```', i + 1);
    const start = i;
    i = end;
    if (/<!--\s*examples:skip\s+.+-->/.test(lines[start - 1] || '')) continue;
    blocks++;
    const body = lines.slice(start + 1, end).join('\n');
    const at = (n) => `${path}:${start + 2 + n}`;
    failures.push(...(fence[1] === 'html' ? checkHtml(body, at, ctx) : checkTs(body, at, ctx)));
  }
  return { failures, blocks };
}

function main() {
  const ctx = context();
  const failures = [];
  let blocks = 0;
  for (const path of guideFiles()) {
    const result = checkMarkdown(readText(path), rel(path), ctx);
    failures.push(...result.failures);
    blocks += result.blocks;
  }
  if (failures.length) {
    console.error(`${failures.length} ejemplo(s) que la librería no respalda:\n  ${failures.join('\n  ')}`);
    process.exit(1);
  }
  console.log(`ejemplos de las guías: ${blocks} bloques validados contra la librería`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) main();
