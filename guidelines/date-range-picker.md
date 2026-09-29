# DateRangePicker

Filtro de **rango de fechas** (solo fecha): campo de solo lectura que abre un calendario en un Popover,
con «Limpiar» en el pie. El primer clic fija el inicio y el segundo el fin; se ordenan solos.

- **Import:** `import { DateRangePicker, type DateRangeValue } from '@iamacalupuenzo-ui/comsatel-ds';`
- **Import liviano:** `import { DateRangePicker } from '@iamacalupuenzo-ui/comsatel-ds/date-range-picker';` (ver «Importar desde un subpath» en `docs/consumer-angular.md`)
- **Selector:** `<cs-date-range-picker>`

```html
<cs-date-range-picker
  label="Fecha de registro"
  placeholder="Todas las fechas"
  [value]="{ from: desde, to: hasta }"
  (valueChange)="onRango($event)"
></cs-date-range-picker>
```

## Cuándo usarlo

| Decisión | Usa | Motivo |
| :-- | :-- | :-- |
| Filtrar por días, sin horas | `DateRangePicker` | Tablero, Recuperos o Capturas: basta con el rango de días. |
| Rango con horas en un panel angosto | `DateRangePicker` + dos `TimePicker` apilados | Bitácora y vista de recupero: cada campo ocupa su propia fila. |
| Rango con horas en una fila de formulario | `DateTimeRangePicker` | Fecha y horas en una sola fila horizontal. |

## Estados

| Estado | Props | Cuándo |
| :-- | :-- | :-- |
| Vacío | `[value]="{ from: '', to: '' }"` | Sin rango: el placeholder dice qué incluye (por ejemplo, «Todas las fechas»). |
| Inicio elegido | `from` sin `to` | El campo muestra «Desde …» mientras se elige el segundo día. |
| Con rango | `from` y `to` | El campo muestra «dd mmm aaaa — dd mmm aaaa». |
| Filtro aplicado | `[active]="true"` | En barras de filtro, con rango elegido. |
| Error | `[invalid]="true"` y `errorMessage` | El rango falta o no es válido. |
| Deshabilitado | `[disabled]="true"` | El filtro no está disponible. |

## Props

<!-- props:start DateRangePicker -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/date-range-picker/src/date-range-picker.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `id` | `string \| undefined` | `undefined` | Id del campo; se genera si no se indica. |
| `label` | `string` | `''` | Título visible encima del campo; no abre el selector al hacer clic. |
| `aria-label` | `string` | `''` | Nombre accesible cuando no hay label visible. |
| `placeholder` | `string` | `'Selecciona un rango'` | Texto cuando no hay valor. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Altura y tipografía del campo. |
| `required` | `boolean` | `false` | Agrega el asterisco al label y aria-required. |
| `invalid` | `boolean` | `false` | Borde y anillo de error. |
| `errorMessage` | `string` | `''` | Mensaje de error visible, enlazado con aria-errormessage. |
| `disabled` | `boolean` | `false` | Deshabilita el campo y el botón. |
| `active` | `boolean` | `false` | Filtro aplicado (con valor): borde, fondo y texto de selección. |
| `weekStartDay` | `0 \| 1` | `1` | Primer día de la semana: 1 = lunes, 0 = domingo. |
| `minDate` | `string \| undefined` | `undefined` | Primer día elegible (YYYY-MM-DD). |
| `maxDate` | `string \| undefined` | `undefined` | Último día elegible (YYYY-MM-DD). |
| `clearLabel` | `string` | `'Limpiar'` | Texto del botón del pie que borra el valor. |
| `value` | `DateRangeValue \| null \| undefined` | `{ from: '', to: '' }` | Valor controlado. |
| `valueChange` | `EventEmitter<DateRangeValue>` | n/a | Emite el valor nuevo; vacío al limpiar. |
<!-- props:end -->

## Accesibilidad

<!-- a11y:start DateRangePicker -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/date-range-picker/src/date-range-picker.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-date-range-picker`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `label`, `button` |
| Roles | `dialog` |
| Atributos ARIA | `aria-hidden="true"`, `aria-label="Abrir calendario"`, `aria-labelledby`, `aria-label`, `aria-errormessage`, `aria-expanded`, `aria-controls` |
| Compone | `cs-input-group`, `cs-input-group-input`, `cs-input-group-addon`, `cs-icon`, `cs-popover`, `cs-calendar`, `cs-button` |
<!-- a11y:end -->
