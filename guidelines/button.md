# Button

Dispara una acción: envío de formulario, navegación, apertura de diálogo u operación
destructiva. Nueve variantes cubren los roles semánticos de la UI.

- **Import:** `import { Button } from 'comsatel-ds';`
- **Selector:** `<cs-button>`
- **Clase raíz emitida:** `.cs-button` (más `.cs-button--<variant>` y `.cs-button--<size>`)

```html
<cs-button variant="primary" size="md">Guardar cambios</cs-button>
```

## Props

<!-- props:start Button -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/button/button.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `variant` | `'primary' \| 'secondary' \| 'default' \| 'tertiary' \| 'subtle' \| 'link' \| 'destructive' \| 'success' \| 'warning'` | `'primary'` | Rol semántico del botón. |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg'` | `'sm'` | Altura y padding. |
| `loading` | `boolean` | `false` | Reemplaza el contenido por un spinner y deshabilita el botón. |
| `selected` | `boolean` | `false` | Estado tipo toggle. Emite `aria-pressed="true"`. |
| `disabled` | `boolean` | `false` | Deshabilita la interacción. |
| `fullWidth` | `boolean` | `false` | Estira el botón al 100% de su contenedor. |
| `aria-label` | `string` | `''` | Nombre accesible cuando el contenido visible no alcanza. |
<!-- props:end -->

## Variantes, en orden de énfasis

`primary` es el call-to-action más fuerte: uno por pantalla. `secondary` y `default`
quedan por debajo para acciones de apoyo. `tertiary` y `subtle` son solo texto, para
baja prioridad. `link` es la más débil. `destructive`, `success` y `warning`
comunican estado, no jerarquía: se eligen por significado, no por énfasis.

```html
<cs-button variant="destructive" size="sm">Eliminar</cs-button>
<cs-button variant="subtle" size="xs">Cancelar</cs-button>
```

## Con íconos

Los íconos van proyectados junto al texto, y escalan con el tamaño del botón. Vienen
solo del registro de íconos del sistema (`cs-icon`), nunca de otra librería.

```html
<cs-button variant="primary">
  <cs-icon name="plus" [size]="14"></cs-icon> Agregar ítem
</cs-button>
```

## Accesibilidad (a11y) y teclado

- Renderiza un `<button>` nativo: el foco, el orden de tabulación y la activación con
  **Enter** y **Espacio** los da el navegador. No hay handler de teclado propio.
- `selected` emite `aria-pressed="true"`; sin `selected`, el atributo no se emite.
- `loading` deshabilita el botón y, si no hay `aria-label` propio, le pone el nombre
  accesible `"Cargando"`. El spinner es `aria-hidden`.
- Un botón cuyo contenido es solo un ícono **necesita** `aria-label`: sin él queda sin
  nombre accesible.
- `disabled` usa el atributo nativo, así que el botón sale del orden de foco. Si
  necesitas que siga siendo enfocable para explicar por qué está inactivo, envuélvelo
  en un `cs-tooltip` sobre un contenedor, no sobre el botón deshabilitado.

<!-- a11y:start Button -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/button/button.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-button`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `button` |
| Atributos ARIA | `aria-hidden="true"`, `aria-label`, `aria-pressed` |
<!-- a11y:end -->

## Trampas

- **Siempre emite `type="button"`.** Dentro de un `<form>` no dispara el submit: hay
  que manejar el envío con `(click)` o con el submit del formulario por otra vía. No
  existe una prop `type`.
- `loading` reemplaza el contenido proyectado, no lo superpone: el texto desaparece
  mientras carga. Si el ancho no debe saltar, fíjalo desde el contenedor.
- `fullWidth` también marca el host con `.cs-button-host--full`; si el botón está
  dentro de un flex container que ya lo estira, no hace falta.
