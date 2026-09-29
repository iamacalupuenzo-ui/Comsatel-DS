# DescriptionList

Lista de pares **etiqueta y valor** para el detalle de un registro: placa, contrato, estado,
responsable. Se aplica sobre un `<dl>` nativo para conservar la semántica de término y
definición.

- **Import:** `import { DescriptionItem, DescriptionList } from '@iamacalupuenzo-ui/comsatel-ds';`
- **Import liviano:** `import { DescriptionList, DescriptionItem } from '@iamacalupuenzo-ui/comsatel-ds/description-list';` (ver «Importar desde un subpath» en `docs/consumer-angular.md`)
- **Selectores:** `dl[csDescriptionList]`, `div[csDescriptionItem]`

```html
<dl csDescriptionList>
  <div csDescriptionItem label="Placa">BAB711</div>
  <div csDescriptionItem label="Contrato">
    <cs-tag value="Vigente" severity="success" [rounded]="true"></cs-tag>
  </div>
  <div csDescriptionItem label="Observación" [fullWidth]="true" editLabel="Editar observación" (edit)="openEdit()">
    La unidad no estaba en la dirección registrada.
  </div>
</dl>
```

## Cuándo usarlo

| Caso | Usa | Motivo |
| :-- | :-- | :-- |
| Detalle de un registro en un cajón o una tarjeta | `DescriptionList` | Etiqueta arriba y valor abajo, en dos columnas. |
| Texto largo (observación, notas) | `DescriptionItem` con `[fullWidth]="true"` | Ocupa todo el ancho y no se corta en media columna. |
| Comparar muchos registros | `Table` | Una lista de descripción muestra un solo registro. |

## Por qué selectores de atributo

Un `<dl>` solo puede contener `<div>`, `<dt>` y `<dd>`. Si el ítem fuera un elemento propio
(`<cs-description-item>`), quedaría entre el `<dl>` y sus términos y los lectores de pantalla
dejarían de leerlos como pares. Por eso el componente se aplica sobre el `<dl>` y el `<div>`
nativos.

## Props de `DescriptionList`

<!-- props:start DescriptionList -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/description-list/src/description-list.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `columns` | `1 \| 2` | `2` | Columnas en pantallas anchas; hasta 767 px siempre es una. |
<!-- props:end -->

## Props de `DescriptionItem`

<!-- props:start DescriptionItem -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/description-list/src/description-list.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `label` | `string` | requerido | Término: qué es el dato («Placa», «Contrato»). |
| `fullWidth` | `boolean` | `false` | Ocupa todo el ancho de la lista, para textos largos. |
| `editLabel` | `string` | `''` | Si tiene texto, muestra un lápiz para editar el dato; es su nombre accesible. |
| `edit` | `EventEmitter<void>` | n/a | Clic en el lápiz de edición. |
<!-- props:end -->

## Accesibilidad

- La semántica es la nativa de `<dl>`, `<dt>` y `<dd>`: cada etiqueta se anuncia como término de su valor.
- El lápiz de edición es un `<button>` con el nombre de `editLabel`, que debe decir qué se edita.
- Hasta 767 px la lista pasa a una columna y mantiene el orden de lectura.

<!-- a11y:start DescriptionList -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/description-list/src/description-list.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `dl[csDescriptionList]`

No renderiza controles nativos, roles ni atributos ARIA propios, y no maneja teclado: es presentacional.
<!-- a11y:end -->

<!-- a11y:start DescriptionItem -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/description-list/src/description-list.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `div[csDescriptionItem]`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `button` |
| Atributos ARIA | `aria-hidden="true"`, `aria-label` |
| Compone | `cs-icon` |
<!-- a11y:end -->
