// Cada validador se rompe a propósito: un check que nunca falla no demuestra nada.
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { contract } from './a11y.mjs';
import { checkMarkdown, context } from './examples.mjs';
import { coverage } from './guidelines.mjs';
import { components, readText } from './lib/ds.mjs';
import { MISSING, regenerate, renderProps } from './props.mjs';

const ctx = context();
const byName = new Map(components().map((c) => [c.name, c]));
const html = (body) => `\`\`\`html\n${body}\n\`\`\``;
const failuresOf = (markdown) => checkMarkdown(markdown, 'prueba.md', ctx).failures.join('\n');

test('ejemplos: un bloque correcto pasa', () => {
  const md = html('<cs-button variant="primary" size="md" [disabled]="saving" aria-label="Guardar" (click)="save()">Guardar</cs-button>');
  assert.equal(failuresOf(md), '');
});

test('ejemplos: una prop inexistente falla', () => {
  assert.match(failuresOf(html('<cs-button colour="primary">Guardar</cs-button>')), /no tiene la prop `colour`/);
});

test('ejemplos: un valor fuera de la unión de literales falla', () => {
  assert.match(failuresOf(html('<cs-button variant="huge">Guardar</cs-button>')), /variant="huge"/);
});

test('ejemplos: un atributo estático sobre una prop boolean falla', () => {
  assert.match(failuresOf(html('<cs-button disabled>Guardar</cs-button>')), /atributo estático/);
});

test('ejemplos: un selector que no existe falla', () => {
  assert.match(failuresOf(html('<cs-buton>Guardar</cs-buton>')), /no es un selector/);
});

test('ejemplos: un output inexistente falla', () => {
  assert.match(failuresOf(html('<cs-modal title="X" (dismissed)="close()"></cs-modal>')), /no emite `dismissed`/);
});

test('ejemplos: un select nativo falla', () => {
  assert.match(failuresOf(html('<select><option>Uno</option></select>')), /select/);
});

test('ejemplos: importar algo que la librería no exporta falla', () => {
  assert.match(failuresOf("```ts\nimport { Button, Boton } from 'comsatel-ds';\n```"), /`Boton` no lo exporta/);
});

test('ejemplos: un bloque marcado con examples:skip no se valida', () => {
  const md = `<!-- examples:skip pseudo código -->\n${html('<cs-buton></cs-buton>')}`;
  assert.equal(failuresOf(md), '');
});

test('props: la tabla sale del código y conserva las descripciones escritas a mano', () => {
  const previous = '<!-- props:start Button -->\n| Prop | Type | Default | Description |\n| :-- | :-- | :-- | :-- |\n| `variant` | `string` | `x` | Rol semántico. |\n<!-- props:end -->';
  const table = renderProps(byName.get('Button'), previous);
  assert.match(table, /\| `variant` \| `'primary' \\\| 'secondary'[^|]*/);
  assert.match(table, /`'primary'` \| Rol semántico\. \|/);
  assert.match(table, new RegExp(`\\| \`loading\` \\| \`boolean\` \\| \`false\` \\| ${MISSING} \\|`));
});

test('props: una tabla desalineada del código se reescribe', () => {
  const stale = '<!-- props:start Badge -->\n| Prop | Type | Default | Description |\n| :-- | :-- | :-- | :-- |\n| `tone` | `string` | `x` | Viejo. |\n<!-- props:end -->';
  const { next } = regenerate(stale, byName);
  assert.notEqual(next, stale);
  assert.doesNotMatch(next, /`tone`/);
});

test('props: un bloque que nombra un componente inexistente se reporta', () => {
  const { unknown } = regenerate('<!-- props:start Carrusel -->\n<!-- props:end -->', byName);
  assert.deepEqual(unknown, ['Carrusel']);
});

test('cobertura: un componente exportado sin bloques falla, y la allowlist lo exime', () => {
  const parts = [byName.get('Button')];
  assert.equal(coverage(parts, []).missing.length, 2);
  assert.equal(coverage(parts, [], { Button: 'razón' }).missing.length, 0);
});

test('cobertura: el mismo componente documentado en dos guías falla', () => {
  const guides = ['a.md', 'b.md'].map((path) => ({ path, text: '<!-- props:start Button -->\n<!-- props:end -->' }));
  assert.match(coverage([byName.get('Button')], guides).problems.join(), /ya tiene bloque props/);
});

test('a11y: el contrato refleja lo que hace el código', () => {
  const modal = contract(byName.get('Modal'));
  assert.match(modal, /`dialog`/);
  assert.match(modal, /`Escape`/);
  assert.match(modal, /document\.body/);
  assert.match(contract(byName.get('Tooltip')), /`tooltip`/);
});

test('lectura: los saltos CRLF de Windows se normalizan antes de comparar', () => {
  const file = join(mkdtempSync(join(tmpdir(), 'ds-')), 'guia.md');
  writeFileSync(file, '# Guía\r\n\r\n```html\r\n<cs-button>Guardar</cs-button>\r\n```\r\n');
  const text = readText(file);
  assert.doesNotMatch(text, /\r/);
  assert.equal(checkMarkdown(text, 'guia.md', ctx).blocks, 1);
});
