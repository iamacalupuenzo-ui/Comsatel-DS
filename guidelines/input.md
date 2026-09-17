# Input e InputGroup

Campo de texto de una línea. `Input` resuelve el caso simple; `InputGroup` compone un
campo con adornos (íconos, botones, prefijos, dropdowns) que se ven como un solo
control.

- **Import:** `import { Input, InputGroup, InputGroupAddon, InputGroupInput, InputGroupText, PasswordInput } from '@iamacalupuenzo-ui/comsatel-ds';`
- **Selectores:** `<cs-input>`, `<cs-input-group>`, `<cs-input-group-addon>`, `<cs-input-group-input>`, `<cs-input-group-text>`, `<cs-password-input>`
- **Clases raíz emitidas:** `.cs-input`, `.cs-input-group`, `.cs-input-group-addon`, `.cs-input-group-input`, `.cs-input-group-text`

```html
<cs-input
  placeholder="Placa del vehículo"
  fieldSize="md"
  [value]="plate"
  (valueChange)="plate = $event"
></cs-input>
```

## Etiqueta externa y escala

`Input`, `InputGroupInput` y `PasswordInput` no encapsulan una etiqueta: el
formulario consumidor conserva su anatomía, validación y mensajes. Para que
una etiqueta externa mantenga la misma escala que un campo, el paquete expone
`fieldLabelTypography`. No uses el `placeholder` como sustituto de la etiqueta.

```ts
import { fieldLabelTypography, textStyle } from '@iamacalupuenzo-ui/comsatel-ds';

protected readonly emailLabelStyle = textStyle(fieldLabelTypography.md, 'accent');
```

```html
<label for="email" [ngStyle]="emailLabelStyle">Correo corporativo</label>
<cs-input id="email" fieldSize="md" autocomplete="email"></cs-input>
```

Usa la clave del mismo tamaño del control: `xs` usa `label/small`; `sm` y
`md`, `content/note`; y `lg`, `content/caption`. Para un campo `lg`, cambia
la receta a `textStyle(fieldLabelTypography.lg, 'accent')`.

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

## Contraseña con visibilidad

`PasswordInput` es el patrón oficial para una contraseña con control de
visibilidad. Encapsula el `InputGroup`, el botón nativo de ícono y sus etiquetas
accesibles. No reconstruyas esa composición en cada producto ni uses
`cs-button`: el control es una acción compacta integrada al campo, no una
acción general del producto.

```html
<label for="login-password">Contraseña</label>
<cs-password-input
  id="login-password"
  name="password"
  autocomplete="current-password"
  [value]="password"
  (valueChange)="password = $event"
></cs-password-input>
```

El formulario consumidor conserva el valor, la validación y los mensajes de
error; `PasswordInput` solo controla la revelación. El ícono de candado se puede
omitir con `[leadingIcon]="null"`. Para una contraseña nueva, cambia
`autocomplete="new-password"`.

## Props de `PasswordInput`

<!-- props:start PasswordInput -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/input/password-input.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `fieldSize` | `'sm' \| 'md' \| 'lg'` | `'md'` | Alto de todo el control. |
| `id` | `string \| undefined` | `undefined` | Id del input real para asociarlo con su etiqueta. |
| `name` | `string` | `''` | Nombre nativo enviado por el formulario. |
| `placeholder` | `string` | `''` | Ejemplo breve; no sustituye una etiqueta. |
| `autocomplete` | `string` | `'current-password'` | Usa `new-password` para creación o cambio. |
| `required` | `boolean` | `false` | Conserva el requisito nativo del campo. |
| `readonly` | `boolean` | `false` | Muestra el valor sin permitir edición. |
| `disabled` | `boolean` | `false` | Deshabilita tanto el campo como el toggle. |
| `invalid` | `boolean` | `false` | Expone `aria-invalid`; acompáñalo con un mensaje. |
| `leadingIcon` | `IconName \| null` | `'lock'` | Ícono inicial; `null` lo omite. |
| `aria-label` | `string` | `''` | Nombre accesible alternativo sin etiqueta visible. |
| `aria-labelledby` | `string` | `''` | Id del elemento que da nombre al campo. |
| `aria-describedby` | `string` | `''` | Id de ayuda, reglas o contexto adicional. |
| `aria-errormessage` | `string` | `''` | Id del mensaje específico de error. |
| `showPasswordLabel` | `string` | `'Mostrar contraseña'` | Etiquetas accesibles del botón de visibilidad. |
| `hidePasswordLabel` | `string` | `'Ocultar contraseña'` | Etiquetas accesibles del botón de visibilidad. |
| `value` | `string` | `''` | Valor controlado del campo. |
| `valueChange` | `EventEmitter<string>` | n/a | Valor controlado del campo. |
| `visibilityChange` | `EventEmitter<boolean>` | n/a | Emite si la contraseña se muestra. |
<!-- props:end -->

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
- `PasswordInput` conserva ese botón nativo, anuncia si la contraseña está visible
  con `aria-pressed` y recibe foco con <kbd>Tab</kbd>. El consumidor sigue siendo
  responsable de una etiqueta visible o de un nombre accesible para el campo.

<!-- a11y:start Input -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/input/input.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-input`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `input[type="text"]` |
| Atributos ARIA | `aria-required`, `aria-invalid`, `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-errormessage` |
<!-- a11y:end -->

<!-- a11y:start PasswordInput -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/input/password-input.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-password-input`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `button` |
| Atributos ARIA | `aria-hidden="true"`, `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-errormessage`, `aria-pressed` |
| Compone | `cs-input-group`, `cs-input-group-addon`, `cs-icon`, `cs-input-group-input` |
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
- En una contraseña con visibilidad, el botón nativo vive dentro del addon final;
  envolverlo en `cs-button` cambia la geometría y no representa el patrón del DS.
- `InputGroupAddon` es `display: contents`. Su `(click)` vive en el `<div>` interno: si
  lo pruebas por JavaScript, disparar `.click()` sobre el host no ejecuta el handler.
