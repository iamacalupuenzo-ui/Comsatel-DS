# TimePicker

Selector de **hora** con dos columnas rotuladas (hora y minuto) y «Limpiar» en el mismo panel.
Reemplaza el `<input type="time">` nativo, cuyo popup no admite diseño ni acciones. Valor `'HH:mm'` (24 h).

- **Import:** `import { TimePicker } from '@iamacalupuenzo-ui/comsatel-ds';`
- **Import liviano:** `import { TimePicker } from '@iamacalupuenzo-ui/comsatel-ds/time-picker';` (ver «Importar desde un subpath» en `docs/consumer-angular.md`)
- **Selector:** `<cs-time-picker>`

```html
<cs-time-picker label="Hora desde" [value]="desde" (valueChange)="desde = $event"></cs-time-picker>
```

## Cuándo usarlo

| Decisión | Usa | Motivo |
| :-- | :-- | :-- |
| Una hora suelta o un par desde/hasta en un panel | `TimePicker` | Columnas de hora y minuto, con «Limpiar» en el panel. |
| Horas dentro de un rango en una fila de formulario | `DateTimeRangePicker` | Fecha y horas en una sola fila. |
| Minutos de a 15 o 30 | `[minuteStep]="15"` | Reduce la columna de minutos. |

## Estados

| Estado | Props | Cuándo |
| :-- | :-- | :-- |
| Vacío | `value=""` | Sin hora: se muestra `--:--`. |
| Con hora | `value="08:30"` | La hora elegida queda marcada en ambas columnas. |
| Filtro aplicado | `[active]="true"` | En filtros, con hora elegida. |
| Error | `[invalid]="true"` y `errorMessage` | La hora falta o no es válida (por ejemplo, «hasta» antes que «desde»). |
| Deshabilitado | `[disabled]="true"` | El campo no está disponible. |

## Props

<!-- props:start TimePicker -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/time-picker/src/time-picker.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `id` | `string \| undefined` | `undefined` | Id del campo; se genera si no se indica. |
| `label` | `string` | `''` | Título visible encima del campo; no abre el selector al hacer clic. |
| `aria-label` | `string` | `''` | Nombre accesible cuando no hay label visible. |
| `placeholder` | `string` | `'--:--'` | Texto cuando no hay valor. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Altura y tipografía del campo. |
| `required` | `boolean` | `false` | Agrega el asterisco al label y aria-required. |
| `invalid` | `boolean` | `false` | Borde y anillo de error. |
| `errorMessage` | `string` | `''` | Mensaje de error visible, enlazado con aria-errormessage. |
| `disabled` | `boolean` | `false` | Deshabilita el campo y el botón. |
| `active` | `boolean` | `false` | Filtro aplicado (con valor): borde, fondo y texto de selección. |
| `clearLabel` | `string` | `'Limpiar'` | Texto del botón del pie que borra el valor. |
| `minuteStep` | `number` | `5` | Intervalo de la columna de minutos (1 a 30). |
| `value` | `string \| null \| undefined` | `''` | Valor controlado. |
| `valueChange` | `EventEmitter<string>` | n/a | Emite el valor nuevo; vacío al limpiar. |
<!-- props:end -->

## Accesibilidad

<!-- a11y:start TimePicker -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/time-picker/src/time-picker.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-time-picker`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `label`, `button`, `ol` |
| Roles | `dialog` |
| Atributos ARIA | `aria-hidden="true"`, `aria-label="Abrir selector de hora"`, `aria-labelledby`, `aria-label`, `aria-errormessage`, `aria-expanded`, `aria-controls`, `aria-pressed` |
| Compone | `cs-input-group`, `cs-input-group-input`, `cs-input-group-addon`, `cs-icon`, `cs-popover`, `cs-button` |
<!-- a11y:end -->
