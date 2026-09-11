# Select

Campo de selección que admite **múltiple**. Para selección simple en un formulario,
`InputDropdown` suele ser la opción correcta; `Select` gana cuando el usuario puede
elegir varias opciones y quitarlas una por una.

- **Import:** `import { Select } from 'comsatel-ds';`
- **Selector:** `<cs-select>`
- **Clase raíz emitida:** `.cs-select`

```html
<cs-select
  label="Conductores asignados"
  [multiple]="true"
  [options]="drivers"
  [value]="selectedDrivers"
  (valueChange)="selectedDrivers = $event"
></cs-select>
```

## Props

<!-- props:start Select -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/select/select.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `label` | `string \| undefined` | `undefined` | Etiqueta visible. |
| `placeholder` | `string` | `'Selecciona una opción'` | Texto sin selección. |
| `options` | `SelectOption[]` | `[]` | `{ label, value, disabled? }`. |
| `multiple` | `boolean` | `false` | Permite elegir varias opciones. |
| `value` | `string \| string[] \| undefined` | `undefined` | Valor seleccionado. Array cuando `multiple`. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Alto del campo. |
| `disabled` | `boolean` | `false` | Deshabilita el campo. |
| `required` | `boolean` | `false` | Marca el campo como requerido. |
| `clearControlLabel` | `string` | `'Limpiar'` | Nombre accesible del botón que limpia todo. |
| `removeOptionLabel` | `(label: string) => string` | `` (label) => `Quitar ${label}` `` | Nombre accesible del botón que quita un chip. |
| `valueChange` | `EventEmitter<string \| string[]>` | n/a | Emite el nuevo valor. |
<!-- props:end -->

## Accesibilidad (a11y) y teclado

- Cada opción seleccionada en modo múltiple se muestra como un chip con su propio
  botón de quitar, y ese botón toma su nombre accesible de `removeOptionLabel`: por eso
  la prop recibe una función y no un texto fijo: el nombre tiene que incluir *cuál*
  opción se quita ("Quitar Juan Pérez"), no un genérico "Quitar".
- `clearControlLabel` nombra el control que limpia toda la selección.
- Los textos por defecto ya vienen en español, a diferencia de `InputDropdown`.

<!-- a11y:start Select -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/select/select.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-select`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `button` |
| Roles | `combobox`, `listbox`, `option` |
| Atributos ARIA | `aria-haspopup="listbox"`, `aria-hidden="true"`, `aria-label`, `aria-labelledby`, `aria-expanded`, `aria-controls`, `aria-disabled`, `aria-required`, `aria-multiselectable`, `aria-selected` |
| Teclas que maneja el código | `ArrowDown`, `ArrowUp`, `Home`, `End`, `Enter`, `Escape`, `Space` |
| Foco | Mueve el foco por código (`.focus()`) |
| Compone | `cs-badge`, `cs-icon`, `cs-popover` |
<!-- a11y:end -->

## Trampas

- **`value` cambia de forma según `multiple`**: `string` en simple, `string[]` en
  múltiple. Si alternas `multiple` en caliente, tienes que convertir el valor tú.
- Es controlado: sin reasignar `value` en `valueChange`, la selección no persiste.
- `removeOptionLabel` recibe el `label` de la opción, no su `value`.
