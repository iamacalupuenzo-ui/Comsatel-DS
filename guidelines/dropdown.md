# Dropdown e InputDropdown

Tokens usados por el secundario de InputDropdown: `elevation-surface-secondary`,
`color-background-secondary-subtlest-hover/pressed`, `color-text-secondary-default`,
`color-border-secondary-default`, roles `*-selected`, `color-border-focused`,
`layout-border-thick`, `layout-padding-2xs`. Conserva tamaños de INPUT_TOKENS y
tipografía existente; no agrega tokens. La superficie portaleada consume los
mismos roles que el disparador.

Dos componentes distintos que comparten estilos. `Dropdown` es un **menú de acciones**
que cuelga de un botón. `InputDropdown` es un **campo de formulario** que elige un
valor: se ve y se comporta como un input, no como un menú.

- **Import:** `import { Dropdown, InputDropdown } from '@iamacalupuenzo-ui/comsatel-ds';`
- **Import liviano:** `import { Dropdown, InputDropdown, DropdownItemComponent } from '@iamacalupuenzo-ui/comsatel-ds/dropdown';` (ver «Importar desde un subpath» en `docs/consumer-angular.md`)
- **Selectores:** `<cs-dropdown>`, `<cs-input-dropdown>`
- **Clases raíz emitidas:** `.cs-dropdown`, `.cs-dropdown-item`, `.cs-input-dropdown`, `.cs-country-flag`

```html
<cs-dropdown
  label="Acciones"
  [groups]="[{ items: [
    { label: 'Exportar CSV', icon: 'download' },
    { label: 'Eliminar', variant: 'destructive', icon: 'trash-2' }
  ]}]"
  (select)="onAction($event)"
></cs-dropdown>
```

## Props de `Dropdown`

<!-- props:start Dropdown -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/dropdown/src/dropdown.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `trigger` | `'button' \| 'icon'` | `'button'` | Botón con texto, o solo ícono. |
| `label` | `string` | `'Dropdown'` | Texto del trigger. |
| `groups` | `DropdownGroup[]` | `[]` | Grupos de ítems. Ver estructura abajo. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'sm'` | Tamaño del trigger y del menú. |
| `position` | `'left' \| 'right'` | `'left'` | Alineación del panel respecto del trigger. |
| `header` | `string \| undefined` | `undefined` | Encabezado del panel. |
| `ariaLabel` | `string` | `''` | Nombre accesible del trigger cuando es solo ícono. |
| `select` | `EventEmitter<DropdownItem>` | n/a | Emite el ítem elegido. |
<!-- props:end -->

`DropdownGroup` es `{ header?, selectionMode?, items }`. `selectionMode` decide el
comportamiento: `'none'` (por defecto) son acciones y el menú **se cierra** al hacer
clic; `'checkbox'` y `'radio'` son selección y el menú **permanece abierto**.

`DropdownItem` es `{ label, value?, icon?, shortcut?, badge?, variant?, disabled?,
dividerAfter?, selected? }`.

## Props de `InputDropdown`

<!-- props:start InputDropdown -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/dropdown/src/input-dropdown.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `id` | `string \| undefined` | `undefined` | Id del trigger; se genera uno si no se pasa. La etiqueta se ata a este id. |
| `name` | `string` | `''` | Si se pasa, agrega un `<input type="hidden">` con ese `name` y el valor, para formularios nativos. |
| `label` | `string \| undefined` | `undefined` | Etiqueta visible del campo. |
| `placeholder` | `string` | `'Select an option'` | Texto sin selección. |
| `options` | `InputDropdownOption[]` | `[]` | `{ label, value, triggerLabel?, countryFlag?, leadingText?, disabled? }`. |
| `value` | `string \| undefined` | `undefined` | Valor seleccionado. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Alto del campo. |
| `disabled` | `boolean` | `false` | Estados del campo. |
| `required` | `boolean` | `false` | Estados del campo. |
| `readonly` | `boolean` | `false` | Estados del campo. |
| `invalid` | `boolean` | `false` | Estados del campo. |
| `aria-label` | `string` | `''` | Cableado accesible. |
| `aria-labelledby` | `string` | `''` | Cableado accesible. |
| `aria-describedby` | `string` | `''` | Cableado accesible. |
| `aria-errormessage` | `string` | `''` | Cableado accesible. |
| `embedded` | `boolean` | `false` | Para usarlo **dentro** de un `cs-input-group-addon`. |
| `fullWidth` | `boolean` | `false` | Estira el trigger al 100%, conservando su marco. |
| `matchTriggerWidth` | `boolean` | `false` | Iguala el menú al trigger. Recomendado junto a fullWidth en buscadores; false conserva el ancho por contenido. |
| `surface` | `'default' \| 'secondary'` | `'default'` | **Obsoleto desde 0.3.5:** la superficie crema se descartó y se eliminará en 0.4.0. No la uses. |
| `active` | `boolean` | `false` | Filtro aplicado: borde, fondo y texto de selección. Cede ante foco, apertura y error. |
| `menuFit` | `boolean` | `false` | La lista mide al menos el ancho del campo y crece con la opción más larga hasta el borde visible; recién ahí parte el texto. |
| `leadingIcon` | `IconName \| undefined` | `undefined` | Ícono decorativo al inicio, para filtros compactos que se reconocen por su ícono. En el filtro aplicado toma el color de selección. |
| `valueChange` | `EventEmitter<string>` | n/a | Emite el nuevo valor. |
<!-- props:end -->

## Props de `DropdownItemComponent`

<!-- props:start DropdownItemComponent -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/dropdown/src/dropdown-item.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `item` | `DropdownItem` | requerido | Ítem que dibuja. Lo instancia `Dropdown` por dentro: no hace falta usarlo suelto. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'sm'` | Tamaño heredado del menú. |
| `selectionMode` | `'none' \| 'checkbox' \| 'radio'` | `'none'` | Modo de selección del grupo al que pertenece el ítem. |
| `itemSelect` | `EventEmitter<DropdownItem>` | n/a | Emite el ítem al activarlo. |
<!-- props:end -->

## Accesibilidad (a11y) y teclado

- Ambos cierran al hacer clic afuera, vía `document:mousedown`. Si lo pruebas por
  JavaScript, disparar `.click()` **no** alcanza: hay que emitir un `mousedown` real.
- `trigger="icon"` deja el botón sin texto visible: `ariaLabel` pasa a ser obligatorio.
- Los glyphs de selección (check y punto de radio) comparten CSS con `Checkbox` y
  `Radio` desde `shared/selection-glyphs.css`, así que el estado se ve igual en todo
  el sistema.
- En `InputDropdown`, `invalid` va acompañado de `aria-errormessage` apuntando al id
  del mensaje: el borde rojo solo no comunica el error.
- La bandera de país (`cs-country-flag`) y el `leadingText` son decorativos: la bandera
  está marcada `aria-hidden`, así que el nombre accesible sale siempre de `label`, que
  conserva el nombre del país en texto.

<!-- a11y:start Dropdown -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/dropdown/src/dropdown.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-dropdown`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `button` |
| Roles | `menu`, `[attr.role] (dinámico)` |
| Atributos ARIA | `aria-haspopup="menu"`, `aria-orientation="vertical"`, `aria-expanded`, `aria-controls`, `aria-label`, `aria-labelledby` |
| Teclas que maneja el código | `ArrowDown`, `ArrowUp`, `Enter`, `Escape`, `Tab`, `Home`, `End` |
| Foco | Mueve el foco por código (`.focus()`) |
| Clic afuera | Escucha `document:mousedown` para cerrarse |
| Compone | `cs-icon`, `cs-dropdown-item` |
<!-- a11y:end -->

<!-- a11y:start DropdownItemComponent -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/dropdown/src/dropdown-item.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-dropdown-item`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `button` |
| Roles | `[attr.role] (dinámico)` |
| Atributos ARIA | `aria-checked`, `aria-disabled` |
| Compone | `cs-icon` |
<!-- a11y:end -->

<!-- a11y:start InputDropdown -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/dropdown/src/input-dropdown.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-input-dropdown`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `label`, `input[type="hidden"]`, `button` |
| Roles | `combobox`, `listbox`, `option` |
| Atributos ARIA | `aria-hidden="true"`, `aria-haspopup="listbox"`, `aria-orientation="vertical"`, `aria-label`, `aria-labelledby`, `aria-describedby`, `aria-errormessage`, `aria-required`, `aria-invalid`, `aria-readonly`, `aria-expanded`, `aria-controls`, `aria-selected` |
| Teclas que maneja el código | `ArrowDown`, `ArrowUp`, `Enter`, `Escape`, `Tab`, `Home`, `End` |
| Foco | Mueve el foco por código (`.focus()`) |
| Compone | `cs-icon`, `cs-country-flag`, `cs-popover` |
<!-- a11y:end -->

## Trampas

- **Elige el componente por el rol, no por el aspecto.** Un selector dentro de un
  formulario es `InputDropdown` (o `Select` si necesitas selección múltiple), nunca
  `Dropdown` con `selectionMode`.
- **Nunca uses un `<select>` nativo** en este sistema: `cs-input-dropdown` existe
  justamente para eso.
- `Dropdown` es controlado en la selección: `selected` en el ítem lo manejas tú; el
  componente no guarda estado propio.
- `embedded` sirve solo dentro de un addon y no lleva marco propio. Su alto se resuelve
  con el binding de píxeles normal: `height: 100%` no funciona ahí, porque el addon es
  `display: contents`.
- `placeholder` viene en inglés por defecto (`'Select an option'`): pasa el texto en
  español si el campo es visible para el usuario final.

## Ancho del menú

El menú de acciones mide lo que mide su opción más larga, más el margen interno de cada ítem, entre 128 y 280 px. Un ítem que no cabe en 280 px se recorta con puntos suspensivos. No fijes el ancho desde el producto: un ancho fijo deja menús de pocas opciones cortas demasiado anchos.
