// Cada validador se rompe a propósito: un check que nunca falla no demuestra nada.
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { test } from 'node:test';
import { contract } from './a11y.mjs';
import { checkMarkdown, context } from './examples.mjs';
import { coverage } from './guidelines.mjs';
import { components, parseMembers, readText } from './lib/ds.mjs';
import { MISSING, regenerate, renderProps } from './props.mjs';
import { looseValues } from './check-component-tokens.mjs';
import { findCycle, importViolations } from './check-secondary-entry-imports.mjs';

test('tokens de componentes: rechaza colores, dimensiones, tiempos y capas literales', () => {
  assert.deepEqual(looseValues('a { color:#fff; padding: 8px; transition: opacity .2s; z-index: 8; }'), ['#fff', '8px', '2s', 'z-index: 8']);
  assert.deepEqual(looseValues('a { color:var(--color-text-selected); padding:var(--layout-padding-md); width:100%; opacity:0; }'), []);
});

test('props: reconoce outputs modernos y sus alias sin perder el contrato', () => {
  const parsed = parseMembers("readonly selectedId = input<string | null>(null); readonly changed = output<string | null>({ alias: 'selectedIdChange' });");
  assert.equal(parsed.inputs[0].name, 'selectedId');
  assert.deepEqual(parsed.outputs, [{ name: 'selectedIdChange', type: 'OutputEmitterRef<string | null>' }]);
});

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
  assert.match(failuresOf("```ts\nimport { Button, Boton } from '@iamacalupuenzo-ui/comsatel-ds';\n```"), /`Boton` no lo exporta/);
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

test('notas de versión: una versión sin archivo falla antes de publicar', () => {
  const result = spawnSync(process.execPath, ['scripts/release-notes.mjs'], {
    cwd: process.cwd(),
    encoding: 'utf8',
    env: { ...process.env, RELEASE_NOTES_VERSION: '99.99.99' },
  });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Falta la nota de versión docs\/releases\/99\.99\.99\.md/);
});

test('entradas secundarias: importar la raíz o salir de la carpeta falla, un subpath pasa', () => {
  const entry = join(tmpdir(), 'entrada', 'input');
  const file = join(entry, 'src', 'clear.ts');
  assert.equal(importViolations("import { Icon } from '@iamacalupuenzo-ui/comsatel-ds/icons';\nimport { x } from './util';", file, entry).length, 0);
  assert.match(importViolations("import { Button } from '@iamacalupuenzo-ui/comsatel-ds';", file, entry).join(), /importa desde la raíz/);
  assert.match(importViolations("import { Popover } from '../../src/lib/popover/popover';", file, entry).join(), /sale de su carpeta/);
  // Variantes que un chequeo por línea con comillas simples no veía.
  assert.match(importViolations('import {\n  Button,\n} from "@iamacalupuenzo-ui/comsatel-ds";', file, entry).join(), /clear\.ts:3 importa desde la raíz/);
  assert.match(importViolations("const m = await import('@iamacalupuenzo-ui/comsatel-ds');", file, entry).join(), /importa desde la raíz/);
  assert.match(importViolations("export * from '../../src/lib/tag/tag';", file, entry).join(), /sale de su carpeta/);
});

test('entradas secundarias: un subpath inexistente, el propio o un ciclo fallan', () => {
  const entry = join(tmpdir(), 'entrada', 'menu');
  const file = join(entry, 'src', 'menu.ts');
  const names = ['menu', 'popover', 'icons'];
  assert.match(importViolations("import { X } from '@iamacalupuenzo-ui/comsatel-ds/nada';", file, entry, names).join(), /no es un punto de entrada/);
  assert.match(importViolations("import { Menu } from '@iamacalupuenzo-ui/comsatel-ds/menu';", file, entry, names).join(), /su propio subpath/);
  assert.equal(importViolations("import { Popover } from '@iamacalupuenzo-ui/comsatel-ds/popover';", file, entry, names).length, 0);
  assert.equal(findCycle({ menu: ['popover'], popover: ['icons'], icons: [] }), null);
  assert.equal(findCycle({ menu: ['popover'], popover: ['menu'] }), 'menu → popover → menu');
});
