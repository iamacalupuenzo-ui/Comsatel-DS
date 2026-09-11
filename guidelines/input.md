# Input e InputGroup

Campo de texto de una línea. `Input` resuelve el caso simple; `InputGroup` compone un
campo con adornos (íconos, botones, prefijos, dropdowns) que se ven como un solo
control.

- **Import:** `import { Input, InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from 'comsatel-ds';`
- **Selectores:** `<cs-input>`, `<cs-input-group>`, `<cs-input-group-addon>`, `<cs-input-group-input>`, `<cs-input-group-text>`
- **Clases raíz emitidas:** `.cs-input`, `.cs-input-group`, `.cs-input-group-addon`, `.cs-input-group-input`, `.cs-input-group-text`

```html
<cs-input
  placeholder="Placa del vehículo"
  fieldSize="md"
  [value]="plate"
  (valueChange)="plate = $event"
></cs-input>
```

## Props de `Input`

<!-- props:start Input -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/input/input.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `fieldSize` | `'sm' \| 'md' \| 'lg'` | `'md'` | Alto del campo: 28px, 32px, 40px. |
| `type` | `string` | `'text'` | Tipo del `<input>` nativo. |
| `id` | `string \| undefined` | `undefined` | Se genera `cs-input-N` si no se pasa. |
| `name` | `string` | `''` | Nombre del campo en el formulario. |
| `placeholder` | `string` | `''` | Texto de marcador. |
| `autocomplete` | `string` | `''` | Valor de `autocomplete` nativo. |
| `required` | `boolean` | `false` | Marca el campo como requerido. |
| `readonly` | `boolean` | `false` | Solo lectura. |
| `disabled` | `boolean` | `false` | Deshabilitado. |
| `invalid` | `boolean` | `false` | Estado de error. Emite `aria-invalid`. |
| `aria-label` | `string` | `''` | Nombre accesible sin label visible. |
| `aria-labelledby` | `string` | `''` | Id del elemento que lo nombra. |
| `aria-describedby` | `string` | `''` | Id del texto de ayuda. |
| `aria-errormessage` | `string` | `''` | Id del mensaje de error. |
| `min` | `string \| number \| undefined` | `undefined` | Para tipos numéricos y de fecha. |
| `max` | `string \| number \| undefined` | `undefined` | Para tipos numéricos y de fecha. |
| `step` | `string \| number \| undefined` | `undefined` | Para tipos numéricos y de fecha. |
| `value` | `string` | `''` | Valor del campo. |
| `valueChange` | `EventEmitter<string>` | n/a | Emite en cada tecla. |
<!-- props:end -->

`InputGroupInput` suma `ariaHasPopup`, `ariaExpanded`, `ariaControls` y los outputs de
foco y teclado para que un combobox (`DateTimePicker`) reuse el mismo campo en vez de
escribir un `<input>` propio.

## Props de `InputGroupAddon`

<!-- props:start InputGroupAddon -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/input/input-group-addon.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `align` | `'inline-start' \| 'inline-end'` | `'inline-start'` | De qué lado del campo se ubica. |
| `compact` | `boolean` | `false` | Reduce el padding del adorno. |
| `divider` | `boolean` | `false` | Dibuja una línea que lo separa del campo. |
<!-- props:end -->

## Props de `InputGroup`

<!-- props:start InputGroup -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/input/input-group.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| n/a | n/a | n/a | Sin props propias: se usa por composición. |
<!-- props:end -->

## Props de `InputGroupInput`

<!-- props:start InputGroupInput -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/input/input-group-input.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `fieldSize` | `'sm' \| 'md' \| 'lg'` | `'md'` | Alto del campo: 28px, 32px, 40px. |
| `type` | `string` | `'text'` | Tipo del `<input>` nativo. |
| `name` | `string` | `''` | Nombre del campo en el formulario. |
| `placeholder` | `string` | `''` | Texto de marcador. |
| `autocomplete` | `string` | `''` | Valor de `autocomplete` nativo. |
| `required` | `boolean` | `false` | Marca el campo como requerido. |
| `readonly` | `boolean` | `false` | Solo lectura. |
| `disabled` | `boolean` | `false` | Deshabilitado. |
| `invalid` | `boolean` | `false` | Estado de error. Emite `aria-invalid`. |
| `aria-label` | `string` | `''` | Nombre accesible sin label visible. |
| `aria-labelledby` | `string` | `''` | Id del elemento que lo nombra. |
| `aria-describedby` | `string` | `''` | Id del texto de ayuda. |
| `aria-errormessage` | `string` | `''` | Id del mensaje de error. |
| `min` | `string \| number \| undefined` | `undefined` | Para tipos numéricos y de fecha. |
| `max` | `string \| number \| undefined` | `undefined` | Para tipos numéricos y de fecha. |
| `step` | `string \| number \| undefined` | `undefined` | Para tipos numéricos y de fecha. |
| `value` | `string` | `''` | Valor del campo. |
| `id` | `string \| undefined` | `undefined` | Se genera `cs-input-N` si no se pasa. |
| `ariaHasPopup` | `string \| undefined` | `undefined` | Emite `aria-haspopup`, para un campo que abre un popup (combobox). |
| `ariaExpanded` | `boolean \| undefined` | `undefined` | Emite `aria-expanded` cuando se define. |
| `ariaControls` | `string \| undefined` | `undefined` | Emite `aria-controls` apuntando al popup. |
| `valueChange` | `EventEmitter<string>` | n/a | Emite en cada tecla. |
| `focused` | `EventEmitter<void>` | n/a | Emite al recibir el foco. |
| `blurred` | `EventEmitter<void>` | n/a | Emite al perder el foco. |
| `enterKey` | `EventEmitter<void>` | n/a | Emite al presionar Enter en el campo. |
| `escapeKey` | `EventEmitter<void>` | n/a | Emite al presionar Escape en el campo. |
<!-- props:end -->

## Props de `InputGroupText`

<!-- props:start InputGroupText -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/input/input-group-text.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| n/a | n/a | n/a | Sin props propias: se usa por composición. |
<!-- props:end -->

## Composición de un grupo

El grupo dibuja el marco; el `InputGroupInput` de adentro va sin borde propio.

```html
<cs-input-group>
  <cs-input-group-addon align="inline-start">
    <cs-icon name="search" [size]="14"></cs-icon>
  </cs-input-group-addon>
  <cs-input-group-input
    placeholder="Buscar vehículo"
    [value]="query"
    (valueChange)="query = $event"
  ></cs-input-group-input>
</cs-input-group>
```

## Accesibilidad (a11y) y teclado

- Es un `<input>` nativo: foco, escritura, selección y atajos del sistema los da el
  navegador.
- El campo **no renderiza un `<label>`**. Siempre hay que darle nombre accesible: un
  `<label for>` propio apuntando a su `id`, o `aria-labelledby`, o `aria-label`. Un
  `placeholder` **no** es nombre accesible: desaparece al escribir.
- `invalid` emite `aria-invalid`. El texto del error se ata con `aria-errormessage` (o
  `aria-describedby`), no alcanza con pintar el borde de rojo.
- `InputGroup` reacciona al foco, al estado inválido y al deshabilitado del campo
  proyectado con selectores `:has()` puros, sin JavaScript de coordinación: el anillo
  de foco aparece alrededor de todo el grupo, no solo del `<input>`.
- Un botón dentro de un `InputGroupAddon` es un control aparte en el orden de
  tabulación, y necesita su propio `aria-label`.

<!-- a11y:start Input -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/input/input.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-input`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `input[type="text"]` |
| Atributos ARIA | `aria-required`, `aria-invalid`, `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-errormessage` |
<!-- a11y:end -->

<!-- a11y:start InputGroup -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/input/input-group.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-input-group`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Roles | `group` |
<!-- a11y:end -->

<!-- a11y:start InputGroupAddon -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/input/input-group-addon.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-input-group-addon`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Foco | Mueve el foco por código (`.focus()`) |
<!-- a11y:end -->

<!-- a11y:start InputGroupInput -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/input/input-group-input.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-input-group-input`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `input[type="text"]` |
| Atributos ARIA | `aria-invalid`, `aria-required`, `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-errormessage`, `aria-haspopup`, `aria-expanded`, `aria-controls` |
| Teclas que maneja el código | `Enter`, `Escape` |
<!-- a11y:end -->

<!-- a11y:start InputGroupText -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/input/input-group-text.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-input-group-text`

No renderiza controles nativos, roles ni atributos ARIA propios, y no maneja teclado: es presentacional.
<!-- a11y:end -->

## Trampas

- **Es controlado.** `valueChange` emite, pero si no reasignas `value`, el campo puede
  desincronizarse del estado de tu componente.
- La clase se llama `Input` y choca con el decorador `@Input()` de Angular. Dentro de
  un archivo que use ambos, importa el decorador con alias
  (`import { Input as NgInput } from '@angular/core'`).
- Dentro de un `InputGroup` va `cs-input-group-input`, **no** `cs-input`: meter un
  `cs-input` completo adentro produce doble marco.
- `InputGroupAddon` es `display: contents`. Su `(click)` vive en el `<div>` interno: si
  lo pruebas por JavaScript, disparar `.click()` sobre el host no ejecuta el handler.
