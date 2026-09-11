# Table y TableTree

`Table` es una tabla de datos con orden y estado de carga. `TableTree` agrega
jerarquía: filas que se expanden para mostrar hijos, con carga perezosa.

- **Import:** `import { Table, TableTree } from 'comsatel-ds';`
- **Selectores:** `<cs-table>`, `<cs-table-tree>`
- **Clases raíz emitidas:** `.cs-table`, `.cs-table-tree`

```html
<cs-table
  [columns]="columns"
  [rows]="rows"
  caption="Vehículos de la flota"
  [sortKey]="sortKey"
  [sortOrder]="sortOrder"
  (sort)="onSort($event)"
></cs-table>
```

## Props de `Table`

<!-- props:start Table -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/table/table.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `columns` | `TableColumn[]` | requerido | `{ key, label, isSortable?, width?, align? }`. |
| `rows` | `TableRow[]` | requerido | `{ key, cells }`. |
| `caption` | `string \| undefined` | `undefined` | Título accesible de la tabla. |
| `isLoading` | `boolean` | `false` | Muestra filas skeleton en lugar de los datos. |
| `sortKey` | `string \| undefined` | `undefined` | Columna por la que está ordenada. |
| `sortOrder` | `'asc' \| 'desc' \| undefined` | `undefined` | Sentido del orden. |
| `highlightedRowKey` | `string \| undefined` | `undefined` | Resalta una fila. |
| `skeletonRowCount` | `number` | `5` | Cuántas filas skeleton dibujar. |
| `minWidth` | `string \| undefined` | `undefined` | Ancho mínimo antes de scrollear horizontal. |
| `sort` | `EventEmitter<string>` | n/a | Emite el `key` de la columna al pedir orden. |
<!-- props:end -->

Una celda es texto plano, o un template: `{ template: TemplateRef, context? }` para
meter un `Badge`, un `Button` o cualquier componente en la celda.

## Props de `TableTree`

<!-- props:start TableTree -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/table-tree/table-tree.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `columns` | `TableTreeColumn[]` | requerido | Mismas claves que `TableColumn`. |
| `items` | `TableTreeItem[]` | requerido | `{ id, cells, children?, hasChildren? }`. |
| `caption` | `string \| undefined` | `undefined` | Título accesible. |
| `isLoading` | `boolean` | `false` | Estado de carga inicial. |
| `defaultExpandedIds` | `string[]` | `[]` | Filas abiertas al inicio (no controlado). |
| `expandedIds` | `string[] \| undefined` | `undefined` | Filas abiertas (modo controlado). |
| `expandedIdsChange` | `EventEmitter<string[]>` | n/a | Emite las filas abiertas. |
<!-- props:end -->

## Accesibilidad (a11y) y teclado

- Es una `<table>` real con `<caption>` y `scope` en los encabezados: el lector de
  pantalla anuncia a qué columna pertenece cada celda. **Pasa siempre `caption`**, aun
  cuando visualmente ya haya un título cerca.
- Las columnas ordenables llevan `aria-sort` con el sentido actual, y el control de
  orden es un `<button>` dentro del encabezado: se ordena con teclado.
- Durante la carga, la tabla marca `aria-busy` y hay una región `role="status"` con
  `aria-live="polite"` que anuncia el cambio de estado.
- En `TableTree`, el control de expandir es un `<button>` con `aria-expanded`.

<!-- a11y:start Table -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/table/table.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-table`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `table`, `button` |
| Roles | `status` |
| Atributos ARIA | `aria-hidden="true"`, `aria-live="polite"`, `aria-busy`, `aria-sort`, `aria-label` |
| Compone | `cs-icon`, `cs-skeleton` |
<!-- a11y:end -->

<!-- a11y:start TableTree -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/table-tree/table-tree.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-table-tree`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `table`, `button` |
| Atributos ARIA | `aria-label="Expandir/contraer fila"`, `aria-expanded` |
| Compone | `cs-skeleton`, `cs-icon` |
<!-- a11y:end -->

## Trampas

- **El orden lo hace quien usa el componente.** `sort` solo emite la columna: ordenar
  los datos y devolver `rows` ya ordenadas, además de actualizar `sortKey`/`sortOrder`,
  es responsabilidad de la aplicación. La tabla no reordena nada por su cuenta.
- `key` en cada fila tiene que ser estable y único: es lo que usa el `track` de la
  lista, y repetirlo produce filas que se mezclan al actualizar.
- En `TableTree`, `children: undefined` y `children: []` significan cosas distintas:
  `undefined` es "todavía no cargados" (dibuja skeleton al expandir), `[]` es "no
  tiene". Para mostrar el chevron antes de cargar, usa `hasChildren: true`.
- Las celdas de template reciben su `context`: no captures variables del componente
  padre asumiendo que están disponibles dentro del template.
