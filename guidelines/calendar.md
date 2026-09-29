# Calendar, DateTimePicker y DateTimeRangePicker

`Calendar` es la grilla de fechas. `DateTimePicker` y `DateTimeRangePicker` son **organismos**:
no dibujan sus propios campos, componen los del sistema.

| Componente | Compone | Valor |
| :-- | :-- | :-- |
| `DateTimePicker` | `DatePicker` + `TimePicker` | `{ date, time }` |
| `DateTimeRangePicker` | `DateRangePicker` + dos `TimePicker` | `{ startDate, endDate, startTime, endTime }` |

- **Import:** `import { Calendar, DateTimePicker, DateTimeRangePicker, formatDate, formatDateTime } from '@iamacalupuenzo-ui/comsatel-ds';`
- **Selectores:** `<cs-calendar>`, `<cs-datetime-picker>`, `<cs-datetime-range-picker>`
- **Clases raíz emitidas:** `.cs-calendar`, `.cs-datetime-picker`, `.cs-datetime-range-picker`

```html
<cs-datetime-range-picker
  aria-label="Periodo de la bitácora"
  [value]="period"
  (valueChange)="period = $event"
></cs-datetime-range-picker>
```

## Formato de fecha y hora

Todo el sistema usa un solo formato, con las funciones `formatDate`, `formatTime`,
`formatDateTime` y `formatDayMonth`:

| Dato | Formato | Motivo |
| :-- | :-- | :-- |
| Fecha | «27 sep. 2026» | El mes en letras evita confundir día y mes. |
| Hora | «16:56» (24 h) | Más corta y sin «a. m.»; es el estándar en operación. |
| Fecha y hora | «27 sep. 2026, 16:56» | Las dos reglas juntas. |

No usan `Intl.DateTimeFormat` a propósito: cada locale y cada navegador devuelve algo distinto
(«sept», «set.», «sep», «4:56 p. m.»). Una fecha sola `'YYYY-MM-DD'` se lee en horario local,
para que en Perú no se muestre el día anterior.

## Cuándo usar cada uno

| Caso | Usa | Motivo |
| :-- | :-- | :-- |
| Un día | `DatePicker` | Solo fecha. |
| Un día y una hora | `DateTimePicker` | Fecha y hora en una fila. |
| Un periodo con horas (bitácora, recupero) | `DateTimeRangePicker` | Rango y dos horas, con los mismos campos que el resto del sistema. |
| Un periodo sin horas | `DateRangePicker` | Solo el rango. |

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
| `id` | `string \| undefined` | `undefined` | Id base; los campos internos usan id-date, id-time, etc. |
| `aria-label` | `string` | `''` | Nombre del grupo o del campo para lectores de pantalla. |
| `dateLabel` | `string` | `'Fecha'` | Label del campo de fecha. |
| `timeLabel` | `string` | `'Hora'` | Label del campo de hora. |
| `datePlaceholder` | `string` | `'Selecciona una fecha'` | Texto del campo de fecha sin valor. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño de los campos; define también su label. |
| `required` | `boolean` | `false` | Marca los campos como obligatorios. |
| `disabled` | `boolean` | `false` | Deshabilita los campos. |
| `invalid` | `boolean` | `false` | Marca los campos con error. |
| `errorMessage` | `string` | `''` | Mensaje de error visible. |
| `minDate` | `string \| undefined` | `undefined` | Primera fecha seleccionable (YYYY-MM-DD). |
| `maxDate` | `string \| undefined` | `undefined` | Última fecha seleccionable (YYYY-MM-DD). |
| `weekStartDay` | `0 \| 1` | `1` | Domingo (0) o lunes (1) como primer día. |
| `minuteStep` | `number` | `5` | Intervalo de la columna de minutos. |
| `value` | `DateTimeValue \| null \| undefined` | `{ date: '', time: '' }` | Valor controlado. |
| `valueChange` | `EventEmitter<DateTimeValue>` | n/a | Emite el valor al cambiar cualquier campo. |
<!-- props:end -->

## Props de `DateTimeRangePicker`

<!-- props:start DateTimeRangePicker -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/datetime-range-picker/datetime-range-picker.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `id` | `string \| undefined` | `undefined` | Id base; los campos internos usan id-date, id-time, etc. |
| `aria-label` | `string` | `''` | Nombre del grupo o del campo para lectores de pantalla. |
| `dateLabel` | `string` | `'Fechas'` | Label del campo de fecha. |
| `startTimeLabel` | `string` | `'Hora desde'` | Label de la hora de inicio. |
| `endTimeLabel` | `string` | `'Hora hasta'` | Label de la hora de fin. |
| `datePlaceholder` | `string` | `'Selecciona un rango'` | Texto del campo de fecha sin valor. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño de los campos; define también su label. |
| `required` | `boolean` | `false` | Marca los campos como obligatorios. |
| `disabled` | `boolean` | `false` | Deshabilita los campos. |
| `invalid` | `boolean` | `false` | Marca los campos con error. |
| `errorMessage` | `string` | `''` | Mensaje de error visible. |
| `minDate` | `string \| undefined` | `undefined` | Primera fecha seleccionable (YYYY-MM-DD). |
| `maxDate` | `string \| undefined` | `undefined` | Última fecha seleccionable (YYYY-MM-DD). |
| `weekStartDay` | `0 \| 1` | `1` | Domingo (0) o lunes (1) como primer día. |
| `active` | `boolean` | `false` | Filtro aplicado: estilo de selección en los campos con valor. |
| `minuteStep` | `number` | `5` | Intervalo de la columna de minutos. |
| `value` | `DateTimeRangeValue \| null \| undefined` | `{}` | Valor controlado. |
| `valueChange` | `EventEmitter<DateTimeRangeValue>` | n/a | Emite el valor al cambiar cualquier campo. |
<!-- props:end -->

## Accesibilidad (a11y) y teclado

- La grilla siempre tiene nombre accesible: `ariaLabel` por defecto es `'Calendario'`, o pasa
  `ariaLabelledby` si ya hay un título visible que la nombra.
- Los organismos son un `role="group"`; nómbralos con `aria-label` («Periodo de la bitácora»).
- Cada campo conserva su teclado: el calendario se abre con Enter o con el botón, y el selector
  de hora se maneja con flechas en sus columnas.
- `invalid` va siempre acompañado de `errorMessage`: el borde rojo solo no comunica el error.

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
| Roles | `group`, `alert` |
| Atributos ARIA | `aria-label` |
| Compone | `cs-date-picker`, `cs-time-picker` |
<!-- a11y:end -->

<!-- a11y:start DateTimeRangePicker -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/datetime-range-picker/datetime-range-picker.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-datetime-range-picker`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Roles | `group`, `alert` |
| Atributos ARIA | `aria-label` |
| Compone | `cs-date-range-picker`, `cs-time-picker` |
<!-- a11y:end -->

## Trampas

- **Las fechas son strings ISO `YYYY-MM-DD` y las horas `HH:mm`, no objetos `Date`.**
- Controlado (`value`/`month`) y no controlado (`defaultValue`/`defaultMonth`) de Calendar son
  modos excluyentes.
- Varias props usan `input()` de señales en vez de `@Input()` clásico, a propósito: hay
  `computed()` y `linkedSignal()` que las leen.
- En la versión 0.3.27 los dos organismos cambiaron de API: ya no usan `datePickerProps`,
  `timePickerProps` ni una lista fija de horas (`timeStep`); ahora componen `TimePicker`
  (`minuteStep`).
