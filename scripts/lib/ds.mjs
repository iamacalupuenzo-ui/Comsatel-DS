import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
export const LIB_SRC = join(ROOT, 'projects', 'comsatel-ds', 'src');
export const GUIDES = join(ROOT, 'guidelines');

export const rel = (path) => relative(ROOT, path).split('\\').join('/');
/** Lee texto con saltos `\n`: en Windows git entrega CRLF y las comparaciones fallarían. */
export const readText = (path) => readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
const read = readText;

/** Recorre el texto saltando strings y comentarios; `visit(i, depth)` recibe cada carácter de código. */
function walkCode(text, from, visit) {
  let depth = 0;
  for (let i = from; i < text.length; i++) {
    const c = text[i];
    if (c === '/' && text[i + 1] === '/') { i = text.indexOf('\n', i); if (i < 0) return; continue; }
    if (c === '/' && text[i + 1] === '*') { i = text.indexOf('*/', i + 2) + 1; continue; }
    if (c === "'" || c === '"' || c === '`') {
      const start = i;
      for (i++; i < text.length && text[i] !== c; i++) if (text[i] === '\\') i++;
      if (visit(start, depth, true) === false) return;
      continue;
    }
    if ('([{'.includes(c)) depth++;
    if (')]}'.includes(c)) depth--;
    if (visit(i, depth, false) === false) return;
  }
}

/** Índice del cierre que balancea la apertura en `open`. */
export function matching(text, open) {
  let end = -1;
  walkCode(text, open, (i, depth, isString) => {
    if (!isString && depth === 0 && ')]}'.includes(text[i])) { end = i; return false; }
  });
  return end;
}

/** Posición del primer `char` a profundidad 0 desde `from`, o -1. `=` no cuenta si es parte de `=>`, `==` o `>=`. */
function topLevel(text, char, from = 0) {
  let found = -1;
  walkCode(text, from, (i, depth, isString) => {
    if (isString || depth !== 0 || text[i] !== char) return;
    if (char === '=' && (text[i + 1] === '>' || text[i + 1] === '=' || '=!<>'.includes(text[i - 1]))) return;
    found = i;
    return false;
  });
  return found;
}

function splitTop(text, char) {
  const parts = [];
  let last = 0;
  walkCode(text, 0, (i, depth, isString) => {
    if (!isString && depth === 0 && text[i] === char) { parts.push(text.slice(last, i)); last = i + 1; }
  });
  parts.push(text.slice(last));
  return parts.map((p) => p.trim()).filter(Boolean);
}

const squash = (s) => s.replace(/\s+/g, ' ').trim();

/** Archivos que exporta `public-api.ts`, en orden. */
export function exportedFiles() {
  const api = read(join(LIB_SRC, 'public-api.ts'));
  return [...api.matchAll(/export \* from '\.\/(lib\/[^']+)'/g)].map((m) => join(LIB_SRC, `${m[1]}.ts`));
}

function libTsFiles(dir = join(LIB_SRC, 'lib'), out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) libTsFiles(path, out);
    else if (entry.name.endsWith('.ts') && !entry.name.endsWith('.stories.ts') && !entry.name.endsWith('.spec.ts')) out.push(path);
  }
  return out;
}

let aliasCache;
/** `export type X = 'a' | 'b'` de toda la librería, expandido a sus literales cuando es posible. */
export function typeAliases() {
  if (aliasCache) return aliasCache;
  const raw = new Map();
  for (const file of libTsFiles()) {
    const text = read(file);
    for (const m of text.matchAll(/export type (\w+)\s*=/g)) {
      const start = m.index + m[0].length;
      const end = topLevel(text, ';', start);
      if (end > 0) raw.set(m[1], squash(text.slice(start, end)).replace(/^\|\s*/, ''));
    }
  }
  const resolved = new Map();
  const expand = (name, seen = new Set()) => {
    if (resolved.has(name)) return resolved.get(name);
    if (!raw.has(name) || seen.has(name)) return null;
    seen.add(name);
    const literals = [];
    for (const part of splitTop(raw.get(name), '|')) {
      if (/^'[^']*'$|^-?\d+$/.test(part)) literals.push(part);
      else if (/^\w+$/.test(part) && expand(part, seen)) literals.push(...expand(part, seen));
      else if (/^`[^`]*\$\{(\w+)\}[^`]*`$/.test(part)) {
        const [, inner] = part.match(/\$\{(\w+)\}/);
        const base = expand(inner, seen);
        if (!base) return null;
        literals.push(...base.map((lit) => `'${part.slice(1, -1).replace(`\${${inner}}`, lit.slice(1, -1))}'`));
      } else return null;
    }
    resolved.set(name, literals);
    return literals;
  };
  for (const name of raw.keys()) expand(name);
  aliasCache = resolved;
  return resolved;
}

/** Tipo legible: expande alias de literales dentro de uniones. */
export function renderType(type) {
  const aliases = typeAliases();
  return splitTop(type, '|')
    .flatMap((part) => (aliases.get(part) && aliases.get(part).length ? aliases.get(part) : [part]))
    .join(' | ');
}

/** Literales permitidos para un tipo, o null si no es una unión de literales. */
export function literalsOf(type) {
  const parts = splitTop(renderType(type), '|').filter((p) => p !== 'undefined' && p !== 'null');
  return parts.length && parts.every((p) => /^'[^']*'$/.test(p)) ? parts.map((p) => p.slice(1, -1)) : null;
}

function inferType(defaultValue) {
  if (defaultValue === undefined) return 'unknown';
  if (/^(true|false)$/.test(defaultValue)) return 'boolean';
  if (/^-?\d+(\.\d+)?$/.test(defaultValue)) return 'number';
  if (/^['`"]/.test(defaultValue)) return 'string';
  return 'unknown';
}

/** Metadatos del decorador `@Component`/`@Directive` que precede a la clase. */
function decoratorMeta(text, classIndex) {
  const at = Math.max(text.lastIndexOf('@Component(', classIndex), text.lastIndexOf('@Directive(', classIndex));
  if (at < 0) return null;
  const open = text.indexOf('(', at);
  const body = text.slice(open + 1, matching(text, open));
  const field = (key) => {
    const m = body.match(new RegExp(`\\b${key}\\s*:\\s*`));
    if (!m) return null;
    const start = m.index + m[0].length;
    if ("'\"`".includes(body[start])) {
      let end = start + 1;
      while (end < body.length && body[end] !== body[start]) end += body[end] === '\\' ? 2 : 1;
      return body.slice(start + 1, end).replace(/\\'/g, "'");
    }
    if (body[start] === '{' || body[start] === '[') return body.slice(start, matching(body, start) + 1);
    return null;
  };
  return {
    kind: text.startsWith('@Directive', at) ? 'directive' : 'component',
    selector: field('selector'),
    templateUrl: field('templateUrl'),
    inlineTemplate: field('template'),
    styleUrl: field('styleUrl'),
    host: field('host') || '',
  };
}

/** Quita comentarios respetando strings: un `@Input()` citado en un comentario no es una prop. */
function stripComments(text) {
  let out = '';
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '/' && text[i + 1] === '/') { const end = text.indexOf('\n', i); i = end < 0 ? text.length : end - 1; continue; }
    if (c === '/' && text[i + 1] === '*') { const end = text.indexOf('*/', i + 2); i = end < 0 ? text.length : end + 1; continue; }
    if (c === "'" || c === '"' || c === '`') {
      let j = i + 1;
      while (j < text.length && text[j] !== c) j += text[j] === '\\' ? 2 : 1;
      out += text.slice(i, j + 1);
      i = j;
      continue;
    }
    out += c;
  }
  return out;
}

function parseMembers(source) {
  const body = stripComments(source);
  const inputs = [];
  const outputs = [];
  const decorator = /@(Input|NgInput|Output)\s*\(/g;
  for (const m of body.matchAll(decorator)) {
    const open = m.index + m[0].length - 1;
    const close = matching(body, open);
    const args = body.slice(open + 1, close).trim();
    const rest = body.slice(close + 1);
    const head = rest.match(/^\s*(?:(?:public|protected|private|readonly|override)\s+)*([A-Za-z_$][\w$]*)([?!]?)\s*/);
    if (!head) continue;
    const after = rest.slice(head[0].length);
    const end = topLevel(after, ';');
    const decl = end < 0 ? after : after.slice(0, end);
    const eq = topLevel(decl, '=');
    const typePart = decl.startsWith(':') ? squash(decl.slice(1, eq < 0 ? undefined : eq)) : null;
    const defaultValue = eq < 0 ? undefined : squash(decl.slice(eq + 1));
    const alias = args.match(/^'([^']+)'/) || args.match(/alias\s*:\s*'([^']+)'/);
    const name = alias ? alias[1] : head[1];
    if (m[1] === 'Output') {
      const emitter = defaultValue && defaultValue.match(/^new EventEmitter<([\s\S]*)>\(\)$/);
      outputs.push({ name, type: `EventEmitter<${emitter ? squash(emitter[1]) : 'unknown'}>` });
      continue;
    }
    const required = /required\s*:\s*true/.test(args);
    let type = typePart || inferType(defaultValue);
    if (head[2] === '?' && !/\bundefined\b/.test(type)) type += ' | undefined';
    inputs.push({ name, property: head[1], type, defaultValue, required, optional: head[2] === '?' });
  }
  for (const m of body.matchAll(/readonly\s+(\w+)\s*=\s*input(\.required)?\s*(?:<([^>]*(?:<[^>]*>[^>]*)*)>)?\s*\(/g)) {
    const open = m.index + m[0].length - 1;
    const args = splitTop(body.slice(open + 1, matching(body, open)), ',');
    const options = args.find((a) => a.startsWith('{') && /alias/.test(a));
    const alias = options && options.match(/alias\s*:\s*'([^']+)'/);
    const defaultValue = args[0] && !args[0].startsWith('{ alias') ? squash(args[0]) : undefined;
    let type = m[3] ? squash(m[3]) : inferType(defaultValue);
    if (defaultValue === undefined && !m[2]) type += ' | undefined';
    inputs.push({ name: alias ? alias[1] : m[1], property: m[1], type, defaultValue, required: Boolean(m[2]), optional: defaultValue === undefined });
  }
  return { inputs, outputs };
}

let componentCache;
/** Componentes y directivas que exporta la librería, con su API real. */
export function components() {
  if (componentCache) return componentCache;
  const out = [];
  for (const file of exportedFiles()) {
    const text = read(file);
    for (const m of text.matchAll(/export class (\w+)/g)) {
      const meta = decoratorMeta(text, m.index);
      if (!meta || !meta.selector) continue;
      const open = text.indexOf('{', m.index);
      const body = text.slice(open + 1, matching(text, open));
      const dir = dirname(file);
      const templatePath = meta.templateUrl ? join(dir, meta.templateUrl) : null;
      const stylePath = meta.styleUrl ? join(dir, meta.styleUrl) : null;
      out.push({
        name: m[1],
        selector: meta.selector,
        kind: meta.kind,
        file: rel(file),
        ts: text,
        host: meta.host,
        template: templatePath && existsSync(templatePath) ? read(templatePath) : meta.inlineTemplate || '',
        css: stylePath && existsSync(stylePath) ? read(stylePath) : '',
        ...parseMembers(body),
      });
    }
  }
  componentCache = out;
  return out;
}

/** Todo nombre que un consumidor puede importar desde `comsatel-ds`. */
export function exportedSymbols() {
  const names = new Set();
  for (const file of exportedFiles()) {
    const text = read(file);
    for (const m of text.matchAll(/export (?:declare )?(?:abstract )?(?:class|interface|type|const|let|function|enum)\s+(\w+)/g)) names.add(m[1]);
    for (const m of text.matchAll(/export type \{([^}]+)\}/g)) m[1].split(',').forEach((n) => names.add(n.trim()));
  }
  return names;
}

/** Atributos de proyección (`<ng-content select="[x]">`) de toda la librería. */
export function projectionSlots() {
  const slots = new Set();
  for (const file of libTsFiles()) {
    const html = file.replace(/\.ts$/, '.html');
    const text = read(file) + (existsSync(html) ? read(html) : '');
    for (const m of text.matchAll(/ng-content select="\[([\w-]+)\]"/g)) slots.add(m[1]);
  }
  return slots;
}

export function guideFiles(dir = GUIDES, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) guideFiles(path, out);
    else if (entry.name.endsWith('.md')) out.push(path);
  }
  return out.sort();
}

/** Reemplaza cada bloque `<!-- tag:start Nombre -->…<!-- tag:end -->` con lo que devuelve `render(nombre, contenidoActual)`. */
export function replaceBlocks(text, tag, render) {
  const pattern = new RegExp(`<!-- ${tag}:start (\\w+) -->[\\s\\S]*?<!-- ${tag}:end -->`, 'g');
  return text.replace(pattern, (block, name) => render(name, block));
}

export function blockNames(text, tag) {
  return [...text.matchAll(new RegExp(`<!-- ${tag}:start (\\w+) -->`, 'g'))].map((m) => m[1]);
}

/** Celda de tabla con código en línea, escapando barras verticales y backticks. */
export function code(value) {
  const safe = String(value).replace(/\|/g, '\\|');
  return safe.includes('`') ? `\`\` ${safe} \`\`` : `\`${safe}\``;
}
