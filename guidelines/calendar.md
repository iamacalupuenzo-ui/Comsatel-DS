# Calendar, DateTimePicker y DateTimeRangePicker

`Calendar` es la grilla de fechas. `DateTimePicker` es el campo de formulario que
combina fecha y hora. `DateTimeRangePicker` hace lo mismo para un rango.

- **Import:** `import { Calendar, DateTimePicker, DateTimeRangePicker } from 'comsatel-ds';`
- **Selectores:** `<cs-calendar>`, `<cs-datetime-picker>`, `<cs-datetime-range-picker>`
- **Clases raíz emitidas:** `.cs-calendar`, `.cs-datetime-picker`, `.cs-dtrp`

```html
<cs-datetime-picker
  [value]="scheduledAt"
  (valueChange)="scheduledAt = $event"
  [datePickerProps]="{ label: 'Fecha de salida', minDate: '2026-01-01' }"
  [timePickerProps]="{ label: 'Hora' }"
></cs-datetime-picker>
```

## Props de `Calendar`

<!-- props:start Calendar -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/calendar/calendar.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `defaultMonth` | `number \| undefined` | `undefined` | Mes y año iniciales (no controlado). |
| `defaultYear` | `number \| undefined` | `undefined` | Mes y año iniciales (no controlado). |
| `month` | `number \| undefined` | `undefined` | Mes y año mostrados (controlado). |
| `year` | `number \| undefined` | `undefined` | Mes y año mostrados (controlado). |
| `selected` | `string[]` | `[]` | Fechas seleccionadas, en ISO `YYYY-MM-DD`. |
| `previouslySelected` | `string[]` | `[]` | Fechas marcadas como selección previa. |
| `rangeSelected` | `[string, string] \| undefined` | `undefined` | Rango seleccionado. |
| `disabled` | `string[]` | `[]` | Fechas no seleccionables (alias de `disabledDates`). |
| `minDate` | `string \| undefined` | `undefined` | Límites del rango navegable. |
| `maxDate` | `string \| undefined` | `undefined` | Límites del rango navegable. |
| `weekStartDay` | `0 \| 1` | `0` | Domingo o lunes como primer día. |
| `ariaLabel` | `string` | `'Calendario'` | Nombre accesible de la grilla. |
| `ariaLabelledby` | `string \| undefined` | `undefined` | Id del elemento que lo nombra. |
| `dateChange` | `EventEmitter<string>` | n/a | Emite la fecha elegida en ISO. |
| `monthChange` | `EventEmitter<{ month: number; year: number }>` | n/a | Emite al navegar de mes. |
<!-- props:end -->

## Props de `DateTimePicker`

<!-- props:start DateTimePicker -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/datetime-picker/datetime-picker.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Alto de los campos. |
| `disabled` | `boolean` | `false` | Estados del campo. |
| `invalid` | `boolean` | `false` | Estados del campo. |
| `required` | `boolean` | `false` | Estados del campo. |
| `helperText` | `string \| undefined` | `undefined` | Ayuda y mensaje de error. |
| `errorText` | `string \| undefined` | `undefined` | Ayuda y mensaje de error. |
| `clearControlLabel` | `string` | `'Limpiar'` | Nombre accesible del botón de limpiar. |
| `datePickerProps` | `DateTimePickerDateProps` | `{}` | `{ label?, placeholder?, disabled?, minDate?, maxDate?, weekStartDay? }`. |
| `timePickerProps` | `DateTimePickerTimeProps` | `{}` | `{ label?, placeholder? }`. |
| `value` | `string \| undefined` | `undefined` | Valor (controlado). |
| `defaultValue` | `string \| undefined` | `undefined` | Valor inicial (no controlado). |
| `timeStep` | `number` | `30` | Minutos entre opciones de hora. |
| `fieldId` | `string \| undefined` | `undefined` | Id del campo de fecha; se genera uno si no se pasa. |
| `valueChange` | `EventEmitter<string>` | n/a | Emite el nuevo valor. |
<!-- props:end -->

`DateTimeRangeValue` es `{ startDate?, endDate?, startTime?, endTime? }`.

## Props de `DateTimeRangePicker`

<!-- props:start DateTimeRangePicker -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/datetime-range-picker/datetime-range-picker.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `id` | `string \| undefined` | `undefined` | Id base de los campos; de él salen los ids de ayuda y de error. Se genera si no se pasa. |
| `defaultValue` | `DateTimeRangeValue` | `{}` | Valor inicial (no controlado). |
| `value` | `DateTimeRangeValue \| undefined` | `undefined` | Valor (controlado). |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Alto de los campos. |
| `disabled` | `boolean` | `false` | Estados del campo. |
| `invalid` | `boolean` | `false` | Estados del campo. |
| `required` | `boolean` | `false` | Estados del campo. |
| `helperText` | `string \| undefined` | `undefined` | Ayuda y mensaje de error. |
| `errorText` | `string \| undefined` | `undefined` | Ayuda y mensaje de error. |
| `clearControlLabel` | `string` | `'Limpiar'` | Nombre accesible del botón de limpiar. |
| `timeStep` | `number` | `30` | Minutos entre opciones de hora. |
| `dateLabel` | `string \| undefined` | `undefined` | Etiqueta del campo de rango de fechas. |
| `datePlaceholder` | `string` | `'Selecciona un rango'` | Texto del campo sin rango elegido. |
| `disabledDates` | `string[]` | `[]` | Fechas no seleccionables, en ISO `YYYY-MM-DD`. |
| `minDate` | `string \| undefined` | `undefined` | Fecha mínima seleccionable. |
| `maxDate` | `string \| undefined` | `undefined` | Fecha máxima seleccionable. |
| `weekStartDay` | `0 \| 1` | `0` | Domingo (`0`) o lunes (`1`) como primer día. |
| `timeLabel` | `string \| undefined` | `undefined` | Etiqueta de los campos de hora. |
| `startTimePlaceholder` | `string` | `'Desde'` | Texto del campo de hora inicial. |
| `endTimePlaceholder` | `string` | `'Hasta'` | Texto del campo de hora final. |
| `valueChange` | `EventEmitter<DateTimeRangeValue>` | n/a | Emite el nuevo valor. |
<!-- props:end -->

## Accesibilidad (a11y) y teclado

- La grilla siempre tiene nombre accesible: `ariaLabel` por defecto es `'Calendario'`,
  o pasa `ariaLabelledby` si ya hay un título visible que la nombra.
- El campo de fecha acepta **escritura directa**: se puede tipear y confirmar con
  **Enter**, sin obligar a abrir el calendario con el mouse.
- El popover del calendario cierra al hacer clic afuera (`document:mousedown`). Si lo
  pruebas por JavaScript, `.click()` **no** dispara `mousedown`: hay que emitir el evento
  real, o da un falso negativo.
- `invalid` va siempre acompañado de `errorText`: el borde rojo solo no comunica el
  error.
- Los nombres de mes y día salen de `Intl.DateTimeFormat('es', …)` fijo: el sistema no
  tiene mecanismo de locale, es español por diseño.

<!-- a11y:start Calendar -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/calendar/calendar.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-calendar`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `button` |
| Roles | `row`, `columnheader`, `grid`, `gridcell` |
| Atributos ARIA | `aria-label="Año anterior"`, `aria-label="Mes anterior"`, `aria-live="polite"`, `aria-label="Mes siguiente"`, `aria-label="Año siguiente"`, `aria-rowcount="6"`, `aria-colcount="7"`, `aria-label`, `aria-labelledby`, `aria-selected`, `aria-disabled`, `aria-current` |
| Teclas que maneja el código | `Enter`, `ArrowLeft`, `ArrowRight`, `ArrowUp`, `ArrowDown`, `Home`, `End`, `Space` |
| Foco | Mueve el foco por código (`.focus()`) |
| Compone | `cs-icon` |
<!-- a11y:end -->

<!-- a11y:start DateTimePicker -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/datetime-picker/datetime-picker.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-datetime-picker`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `label`, `button` |
| Roles | `dialog` |
| Atributos ARIA | `aria-label="Abrir calendario"`, `aria-hidden="true"`, `aria-label`, `aria-describedby` |
| Foco | Mueve el foco por código (`.focus()`) |
| Clic afuera | Escucha `document:mousedown` para cerrarse |
| Compone | `cs-input-group`, `cs-input-group-input`, `cs-input-group-addon`, `cs-icon`, `cs-calendar`, `cs-input-dropdown` |
<!-- a11y:end -->

<!-- a11y:start DateTimeRangePicker -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/datetime-range-picker/datetime-range-picker.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-datetime-range-picker`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `label`, `button` |
| Roles | `dialog` |
| Atributos ARIA | `aria-hidden="true"`, `aria-haspopup="dialog"`, `aria-expanded`, `aria-controls`, `aria-invalid`, `aria-required`, `aria-label`, `aria-describedby`, `aria-labelledby` |
| Teclas que maneja el código | `Escape` |
| Foco | Mueve el foco por código (`.focus()`) |
| Clic afuera | Escucha `document:mousedown` para cerrarse |
| Compone | `cs-icon`, `cs-calendar`, `cs-input-dropdown` |
<!-- a11y:end -->

## Trampas

- **Las fechas son strings ISO `YYYY-MM-DD`, no objetos `Date`.** Pasar un `Date`
  directo no funciona.
- Controlado (`value`/`month`) y no controlado (`defaultValue`/`defaultMonth`) son modos
  excluyentes. Con el modo controlado, sin reasignar el valor no cambia nada.
- Varias props usan `input()` de señales en vez de `@Input()` clásico, a propósito:
  hay `computed()` que las leen, y un `@Input()` plano no invalida el caché de un
  `computed()`. Si extiendes estos componentes, respeta ese patrón.
- El popover del calendario necesita espacio debajo: en una demo o un contenedor corto,
  reserva alto o el panel queda flotando sobre lo que sigue.
- `cs-country-flag` (usado por `InputDropdown`) es decorativo y está marcado
  `aria-hidden`: la etiqueta textual conserva siempre el nombre del país.
