# Radio y RadioGroup

Selección única dentro de un conjunto: elegir una opción descarta la anterior. Para
opciones independientes que se marcan por separado, el componente es `Checkbox`.

`Radio` siempre vive dentro de un `RadioGroup`: el grupo administra el `name`
compartido, el valor seleccionado y el estado deshabilitado.

- **Import:** `import { Radio, RadioGroup } from 'comsatel-ds';`
- **Selectores:** `<cs-radio-group>`, `<cs-radio>`
- **Clases raíz emitidas:** `.cs-radio`, `.cs-radio-group`, `.cs-radio-ring`, `.cs-radio-dot`

```html
<cs-radio-group
  label="Frecuencia de reporte"
  [value]="frequency"
  (valueChange)="frequency = $event"
>
  <cs-radio value="realtime" label="Tiempo real"></cs-radio>
  <cs-radio value="5min" label="Cada 5 minutos"></cs-radio>
  <cs-radio value="hourly" label="Cada hora" description="Menor consumo de datos."></cs-radio>
</cs-radio-group>
```

## Props de `RadioGroup`

<!-- props:start RadioGroup -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/radio/radio-group.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `name` | `string \| undefined` | `undefined` | `name` compartido por los radios. |
| `value` | `string \| undefined` | `undefined` | Valor seleccionado (modo controlado). |
| `defaultValue` | `string \| undefined` | `undefined` | Valor inicial (modo no controlado). |
| `label` | `string \| undefined` | `undefined` | Etiqueta del grupo. |
| `required` | `boolean` | `false` | Marca el grupo como requerido. |
| `disabled` | `boolean` | `false` | Deshabilita todos los radios del grupo. |
| `invalid` | `boolean` | `false` | Estado de error. |
| `helperText` | `string \| undefined` | `undefined` | Texto de ayuda bajo el grupo. |
| `errorText` | `string \| undefined` | `undefined` | Mensaje de error. |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | Dirección del layout. |
| `aria-label` | `string` | `''` | Cableado accesible del grupo. |
| `aria-labelledby` | `string` | `''` | Cableado accesible del grupo. |
| `aria-describedby` | `string` | `''` | Cableado accesible del grupo. |
| `valueChange` | `EventEmitter<string>` | n/a | Emite el valor elegido. |
<!-- props:end -->

## Props de `Radio`

<!-- props:start Radio -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/radio/radio.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño del control y la tipografía. |
| `label` | `string \| undefined` | `undefined` | Texto principal, clickeable. |
| `description` | `string \| undefined` | `undefined` | Segunda línea de apoyo. |
| `value` | `string` | requerido | Valor que representa esta opción. |
| `disabled` | `boolean` | `false` | Deshabilita solo esta opción. |
| `id` | `string \| undefined` | `undefined` | Id del input. |
| `aria-label` | `string` | `''` | Cableado accesible de la opción. |
| `aria-describedby` | `string` | `''` | Cableado accesible de la opción. |
| `selectedChange` | `EventEmitter<string>` | n/a | Emite el `value` al seleccionarse. Lo escucha `RadioGroup`: para leer la selección usa `valueChange` del grupo. |
<!-- props:end -->

## Accesibilidad (a11y) y teclado

- El contenedor es `role="radiogroup"` y cada opción es un `<input type="radio">`
  nativo.
- **Las flechas mueven la selección** entre opciones y el foco va con ella: ese
  comportamiento lo da el navegador porque todos los radios comparten el mismo `name`,
  no hay handler de teclado propio. El grupo entero ocupa **una sola parada de Tab**.
- Por eso `name` importa: el grupo genera uno si no se lo pasas. Dos `RadioGroup`
  distintos con el mismo `name` explícito se comportarían como un único grupo.
- El grupo escribe `checked` y `groupName` en cada `Radio` hijo vía `@ContentChildren`,
  así que los radios no necesitan inyectar al padre ni configurarse solos.
- `errorText` se anuncia en una región con `aria-live`, así que el error se lee cuando
  aparece.

<!-- a11y:start RadioGroup -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/radio/radio-group.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-radio-group`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Roles | `radiogroup` |
| Atributos ARIA | `aria-live="polite"`, `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-errormessage`, `aria-required`, `aria-invalid` |
| Compone | `cs-icon` |
<!-- a11y:end -->

<!-- a11y:start Radio -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/radio/radio.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-radio`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `label`, `input[type="radio"]` |
| Atributos ARIA | `aria-label`, `aria-describedby`, `aria-invalid`, `aria-errormessage` |
<!-- a11y:end -->

## Trampas

- **Un `cs-radio` suelto, fuera de un `cs-radio-group`, no funciona**: queda sin `name`
  compartido ni estado `checked`, y deja de comportarse como selección única.
- Controlado (`value`) y no controlado (`defaultValue`) son modos distintos: usa uno.
  Si pasas `value` y no escuchas `valueChange`, la selección no cambia.
- `disabled` en el grupo gana sobre las opciones: no se puede habilitar una opción
  dentro de un grupo deshabilitado.
- No hay opción "ninguna" implícita: si el usuario debe poder no elegir nada, agrega
  una opción explícita para eso.
