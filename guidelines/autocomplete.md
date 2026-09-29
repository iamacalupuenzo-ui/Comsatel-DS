# Autocomplete

Campo de búsqueda que filtra una lista larga mientras se escribe y permite elegir **una** opción.
Úsalo cuando las opciones son demasiadas para desplegarlas completas (unidades, conductores,
comandos). Si caben en una lista corta, usa `InputDropdown`; para varios valores, `Select` múltiple.

- **Import:** `import { Autocomplete, type AutocompleteOption } from '@iamacalupuenzo-ui/comsatel-ds';`
- **Import liviano:** `import { Autocomplete } from '@iamacalupuenzo-ui/comsatel-ds/autocomplete';` (ver «Importar desde un subpath» en `docs/consumer-angular.md`)
- **Selector:** `<cs-autocomplete>`
- **Clase raíz emitida:** `.cs-autocomplete`

```html
<cs-autocomplete
  label="Código de unidad"
  placeholder="Escribe 3 caracteres para buscar"
  [minChars]="3"
  [options]="units"
  [value]="unitCode"
  (valueChange)="unitCode = $event"
></cs-autocomplete>
```

## Cuándo usar Autocomplete

| Decisión | Usa | Motivo |
| :-- | :-- | :-- |
| Lista larga o que crece con los datos | `Autocomplete` | Filtra mientras se escribe; no obliga a recorrer cientos de opciones. |
| Lista corta y fija (hasta unas 10 opciones) | `InputDropdown` | Se ven todas de una vez; no hace falta escribir. |
| Varios valores | `Select` con `[multiple]="true"` | Autocomplete elige una sola opción. |
| Buscar por datos que no se muestran (DNI, motor) | `searchText` en cada opción | Se busca por ese texto aunque la fila muestre otro. |

## Estados

| Estado | Props | Cuándo |
| :-- | :-- | :-- |
| Vacío | `[value]="''"` | Aún no se buscó nada. La lista se abre al escribir `minChars` caracteres, no al enfocar. |
| Con resultados | escribir el mínimo de caracteres | La lista muestra las coincidencias; flechas para recorrer, Enter para elegir y Escape para cerrar. |
| Sin resultados | `emptyText` | Ninguna opción coincide: se muestra el texto vacío, anunciado como estado. |
| Con valor | `[value]="'CTQ527'"` | Hay una opción elegida; el campo muestra su label. Escribir de nuevo borra la selección (emite `''`). |
| Filtro aplicado | `[active]="true"` | En barras de filtro, con texto escrito. |
| Error | `[invalid]="true"` y `errorMessage` | La selección falta o no es válida; el mensaje se enlaza con `aria-errormessage`. |
| Solo lectura | `[readonly]="true"` | El valor se muestra sin permitir buscar ni limpiar. |
| Deshabilitado | `[disabled]="true"` | El campo no está disponible en el paso actual. |

## Props

<!-- props:start Autocomplete -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/autocomplete/src/autocomplete.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `id` | `string \| undefined` | `undefined` | Id del campo; se genera si no se indica. |
| `label` | `string \| undefined` | `undefined` | Label visible encima del campo. |
| `aria-label` | `string` | `''` | Nombre accesible cuando no hay label visible. |
| `placeholder` | `string` | `''` | Texto de ayuda dentro del campo vacío. |
| `options` | `AutocompleteOption[]` | `[]` | Opciones { value, label, description?, icon?, searchText?, disabled? }. |
| `value` | `string` | `''` | Valor elegido (el value de una opción); vacío si no hay selección. |
| `minChars` | `number` | `1` | Caracteres mínimos para abrir la lista. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Altura y tipografía del campo. |
| `leadingIcon` | `IconName` | `'search'` | Ícono decorativo al inicio; por defecto, la lupa. |
| `required` | `boolean` | `false` | Agrega el asterisco al label y aria-required. |
| `invalid` | `boolean` | `false` | Borde y anillo de error. |
| `errorMessage` | `string` | `''` | Mensaje de error visible, enlazado con aria-errormessage. |
| `readonly` | `boolean` | `false` | Muestra el valor sin permitir buscar ni limpiar. |
| `disabled` | `boolean` | `false` | Deshabilita el campo. |
| `active` | `boolean` | `false` | Filtro aplicado (con texto escrito): borde, fondo y texto de selección. |
| `clearable` | `boolean` | `true` | Muestra la X para limpiar cuando hay texto. |
| `clearLabel` | `string` | `'Limpiar búsqueda'` | Nombre accesible de la X. |
| `emptyText` | `string` | `'Sin resultados'` | Texto cuando ninguna opción coincide. |
| `valueChange` | `EventEmitter<string>` | n/a | Emite el value elegido, o vacío al borrar la selección escribiendo o limpiando. |
<!-- props:end -->

## Accesibilidad

<!-- a11y:start Autocomplete -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/autocomplete/src/autocomplete.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-autocomplete`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `label` |
| Roles | `combobox`, `listbox`, `option`, `status` |
| Atributos ARIA | `aria-hidden="true"`, `aria-label`, `aria-errormessage`, `aria-labelledby`, `aria-selected`, `aria-disabled` |
| Teclas que maneja el código | `ArrowDown`, `ArrowUp`, `Enter`, `Escape` |
| Compone | `cs-input-group`, `cs-input-group-addon`, `cs-icon`, `cs-input-group-input`, `cs-input-group-clear`, `cs-popover` |
<!-- a11y:end -->

## Trampas

La lista se posiciona con Popover, así que se ve por encima de modales y cajones. La opción se
elige en `mousedown` para que el foco no salga del campo antes de elegir. `searchText` reemplaza al
texto de búsqueda por defecto (label + description): inclúyelos si también quieres buscar por ellos.
