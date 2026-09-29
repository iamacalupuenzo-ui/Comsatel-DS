# Table y TableTree

`Table` es una tabla de datos con orden y estado de carga. `TableTree` agrega
jerarquía: filas que se expanden para mostrar hijos, con carga perezosa.
`ColumnManager` administra el orden y la visibilidad de las columnas desde un
panel compacto; no sustituye un selector de valores.

- **Import:** `import { ColumnManager, Table, TableRowActions, TableTree } from '@iamacalupuenzo-ui/comsatel-ds';`
- **Import liviano:** `import { Table, TableRowActions } from '@iamacalupuenzo-ui/comsatel-ds/table';` (ver «Importar desde un subpath» en `docs/consumer-angular.md`)
- **Import liviano:** `import { ColumnManager } from '@iamacalupuenzo-ui/comsatel-ds/column-manager';` (ver «Importar desde un subpath» en `docs/consumer-angular.md`)
- **Import liviano:** `import { TableTree } from '@iamacalupuenzo-ui/comsatel-ds/table-tree';` (ver «Importar desde un subpath» en `docs/consumer-angular.md`)
- **Selectores:** `<cs-table>`, `<cs-table-row-actions>`, `<cs-table-tree>`, `<cs-column-manager>`
- **Clases raíz emitidas:** `.cs-table`, `.cs-table-tree`, `.cs-column-manager`.
  Son detalles para inspección; la integración usa los selectores públicos.

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
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/table/src/table.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `columns` | `TableColumn[]` | requerido | `{ key, label, isSortable?, width?, minWidth?, maxWidth?, truncate?, align? }`. |
| `rows` | `TableRow[]` | requerido | `{ key, cells }`. |
| `caption` | `string \| undefined` | `undefined` | Título accesible de la tabla. |
| `isLoading` | `boolean` | `false` | Muestra filas skeleton en lugar de los datos. |
| `sortKey` | `string \| undefined` | `undefined` | Columna por la que está ordenada. |
| `sortOrder` | `'asc' \| 'desc' \| undefined` | `undefined` | Sentido del orden. |
| `highlightedRowKey` | `string \| undefined` | `undefined` | Resalta una fila. |
| `skeletonRowCount` | `number` | `5` | Cuántas filas skeleton dibujar. |
| `minWidth` | `string \| undefined` | `undefined` | Ancho mínimo antes de scrollear horizontal. |
| `error` | `string` | `''` | Mensaje de error de la carga; reemplaza las filas por el estado de error. |
| `errorDescription` | `string` | `'Verifica tu conexión e inténtalo nuevamente.'` | Segunda línea del error: qué puede hacer la persona. |
| `sort` | `EventEmitter<string>` | n/a | Emite el `key` de la columna al pedir orden. |
| `retry` | `EventEmitter<void>` | n/a | Si lo escuchas, el error muestra «Reintentar». |
<!-- props:end -->

Una celda es texto plano, o un template: `{ template: TemplateRef, context? }` para
meter un `Badge`, un `Button` o cualquier componente en la celda.

### Columnas fijas al final

Pueden fijarse una o varias columnas con `sticky: 'end'`, siempre que sean las últimas y
contiguas. Cada una se corre lo que miden las fijas a su derecha, y solo la primera del grupo
lleva la sombra: con solo Acciones fija, la sombra está en Acciones; con Actualizado y Acciones,
pasa a Actualizado. Dale un `width` en px a cada columna fija para que el corrimiento sea estable.

```ts
const columns: TableColumn[] = [
  { key: 'unit', label: 'Unidad' },
  { key: 'updated', label: 'Actualizado', width: '120px', sticky: 'end' },
  { key: 'actions', label: 'Acciones', width: '72px', align: 'center', sticky: 'end' },
];
```

### Columna de acciones fija

La columna de acciones va al final con `sticky: 'end'`. Queda fija al desplazar la
tabla en horizontal, es opaca y muestra una sombra mientras hay columnas ocultas a
su izquierda. En su celda va `cs-table-row-actions`, que abre el menú en la capa de
Popover (el desplazamiento de la tabla no lo recorta) con el ancho por contenido de
Dropdown.

```ts
const columns: TableColumn[] = [
  { key: 'unit', label: 'Unidad' },
  { key: 'actions', label: 'Acciones', width: '72px', align: 'center', sticky: 'end' },
];
```

```html
<ng-template #actionsCell let-unit>
  <cs-table-row-actions
    [items]="actions"
    [ariaLabel]="'Acciones para ' + unit.name"
    (itemSelect)="run(unit, $event)"
  />
</ng-template>
```

### Error de carga

Con `error` la tabla reemplaza las filas por el mensaje de error, y con `(retry)`
muestra «Reintentar». El vacío y el error son estados distintos: no uses el
`emptyState` para decir que la carga falló.

```html
<cs-table [columns]="columns" [rows]="rows" [error]="loadError" (retry)="reload()"></cs-table>
```

## Props de `TableRowActions`

<!-- props:start TableRowActions -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/table/src/table-row-actions.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `items` | `DropdownItem[]` | `[]` | Acciones de la fila; sin acciones, el botón queda deshabilitado. |
| `ariaLabel` | `string` | requerido | Nombre del botón y del menú; incluye el identificador de la fila. |
| `heading` | `string` | `'Acciones'` | Título del menú; vacío para omitirlo. |
| `itemSelect` | `EventEmitter<DropdownItem>` | n/a | Acción elegida; el menú se cierra solo. |
<!-- props:end -->

## Props de `ColumnManager`

<!-- props:start ColumnManager -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/column-manager/src/column-manager.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `label` | `string` | `'Columnas'` | Etiqueta visible del control. |
| `aria-label` | `string` | `'Administrar columnas'` | Nombre accesible del panel de administración. |
| `columns` | `readonly ColumnManagerItem[]` | `[]` | Columnas ordenadas, con `key`, `label` y visibilidad actual. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño del trigger y de las filas del panel. |
| `disabled` | `boolean` | `false` | Impide abrir o modificar la configuración. |
| `minVisible` | `number` | `1` | Mínimo de columnas que deben permanecer visibles. |
| `visibilityChange` | `EventEmitter<string[]>` | n/a | Emite las keys de las columnas visibles. |
| `orderChange` | `EventEmitter<string[]>` | n/a | Emite las keys en el nuevo orden de arrastre. |
<!-- props:end -->

## Props de `TableTree`

<!-- props:start TableTree -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/table-tree/src/table-tree.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

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
- El error de carga usa `role="alert"` para anunciarse al aparecer.
- El botón de `TableRowActions` expone `aria-haspopup` y `aria-expanded`, y su nombre
  incluye la fila. El menú tiene `role="menu"`; Escape lo cierra y el foco vuelve al botón.

<!-- a11y:start TableRowActions -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/table/src/table-row-actions.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-table-row-actions`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `button` |
| Roles | `menu` |
| Atributos ARIA | `aria-haspopup="menu"`, `aria-hidden="true"`, `aria-expanded`, `aria-label` |
| Compone | `cs-icon`, `cs-popover`, `cs-dropdown-item` |
<!-- a11y:end -->

<!-- a11y:start Table -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/table/src/table.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-table`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `table`, `button` |
| Roles | `alert`, `status` |
| Atributos ARIA | `aria-hidden="true"`, `aria-live="polite"`, `aria-busy`, `aria-sort`, `aria-label` |
| Compone | `cs-icon`, `cs-skeleton`, `cs-button` |
<!-- a11y:end -->

<!-- a11y:start ColumnManager -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/column-manager/src/column-manager.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-column-manager`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `button` |
| Atributos ARIA | `aria-hidden="true"`, `aria-label`, `aria-labelledby`, `aria-pressed` |
| Compone | `cs-icon`, `cs-popover` |
<!-- a11y:end -->

<!-- a11y:start TableTree -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/table-tree/src/table-tree.ts: no editar a mano, corre npm run docs:a11y -->

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
- `ColumnManager` recibe el estado de las columnas y emite el orden o las keys
  visibles; la tabla consumidora aplica ambos cambios. El ojo aparece solo en cada
  fila, donde mostrar u ocultar es una acción concreta.
