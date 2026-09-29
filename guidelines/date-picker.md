# DatePicker

Selector de **una fecha**: campo de solo lectura con la fecha en el formato del sistema
(«27 sep. 2026»), calendario en un Popover y «Limpiar» en el pie. Mismo aspecto que
`DateRangePicker`.

- **Import:** `import { DatePicker } from '@iamacalupuenzo-ui/comsatel-ds';`
- **Selector:** `<cs-date-picker>`
- **Clases raíz emitidas:** `.cs-date-picker-field`, `.cs-date-picker-panel` (las mismas que `DateRangePicker`)

```html
<cs-date-picker label="Fecha de captura" [value]="capturedOn" (valueChange)="capturedOn = $event"></cs-date-picker>
```

## Cuándo usarlo

| Caso | Usa | Motivo |
| :-- | :-- | :-- |
| Un día | `DatePicker` | Solo fecha, con el calendario del sistema. |
| Un día y una hora | `DateTimePicker` | Compone este campo y `TimePicker`. |
| Un periodo | `DateRangePicker` | El primer clic fija el inicio y el segundo, el fin. |

## Props

<!-- props:start DatePicker -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/date-picker/date-picker.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `id` | `string \| undefined` | `undefined` | Id base; los campos internos usan id-date, id-time, etc. |
| `label` | `string` | `''` | Label visible del campo. |
| `aria-label` | `string` | `''` | Nombre del grupo o del campo para lectores de pantalla. |
| `placeholder` | `string` | `'Selecciona una fecha'` | Texto del campo sin valor. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño de los campos; define también su label. |
| `required` | `boolean` | `false` | Marca los campos como obligatorios. |
| `invalid` | `boolean` | `false` | Marca los campos con error. |
| `errorMessage` | `string` | `''` | Mensaje de error visible. |
| `disabled` | `boolean` | `false` | Deshabilita los campos. |
| `active` | `boolean` | `false` | Filtro aplicado: estilo de selección cuando hay fecha. |
| `weekStartDay` | `0 \| 1` | `1` | Domingo (0) o lunes (1) como primer día. |
| `minDate` | `string \| undefined` | `undefined` | Primera fecha seleccionable (YYYY-MM-DD). |
| `maxDate` | `string \| undefined` | `undefined` | Última fecha seleccionable (YYYY-MM-DD). |
| `clearLabel` | `string` | `'Limpiar'` | Texto del botón que borra la fecha. |
| `value` | `string \| null \| undefined` | `''` | Valor controlado. |
| `valueChange` | `EventEmitter<string>` | n/a | Emite el valor al cambiar cualquier campo. |
<!-- props:end -->

## Accesibilidad

- El campo anuncia que abre un diálogo (`aria-haspopup="dialog"`) y si está abierto.
- El calendario se abre con Enter o con el botón del ícono; Escape lo cierra.
- El label es un texto que nombra el campo con `aria-labelledby`.

<!-- a11y:start DatePicker -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/date-picker/date-picker.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-date-picker`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `button` |
| Roles | `dialog` |
| Atributos ARIA | `aria-hidden="true"`, `aria-label="Abrir calendario"`, `aria-labelledby`, `aria-label`, `aria-errormessage`, `aria-expanded`, `aria-controls` |
| Compone | `cs-input-group`, `cs-input-group-input`, `cs-input-group-addon`, `cs-icon`, `cs-popover`, `cs-calendar`, `cs-button` |
<!-- a11y:end -->
