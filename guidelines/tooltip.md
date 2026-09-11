# Tooltip

Etiqueta breve que aparece al pasar el mouse o al enfocar el elemento que envuelve.
Es texto complementario: nunca la única fuente de una instrucción necesaria.

- **Import:** `import { Tooltip } from 'comsatel-ds';`
- **Selector:** `<cs-tooltip>`
- **Clase raíz emitida:** `.cs-tooltip`

```html
<cs-tooltip content="Exportar el reporte en CSV" side="top">
  <cs-button variant="subtle" aria-label="Exportar">
    <cs-icon name="download" [size]="14"></cs-icon>
  </cs-button>
</cs-tooltip>
```

## Props

<!-- props:start Tooltip -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/tooltip/tooltip.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `content` | `string` | requerido | Texto del tooltip. |
| `side` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Lado donde aparece respecto del trigger. |
| `arrow` | `boolean` | `true` | Dibuja la flecha que apunta al trigger. |
<!-- props:end -->

El elemento que dispara el tooltip va proyectado como contenido.

## Accesibilidad (a11y) y teclado

- El popup tiene `role="tooltip"` y un `id` propio. Al inicializarse, el componente
  busca el **primer elemento enfocable** dentro del contenido proyectado (`button`,
  `a[href]`, `input`, `select`, `textarea`, o algo con `tabindex` no negativo) y le
  agrega `aria-describedby` apuntando al popup, sin pisar los valores que ya tuviera.
- Se muestra con `:hover` y con `:focus-within`, así que el usuario de teclado lo ve
  al tabular hasta el trigger.
- **Escape lo cierra** y el componente detiene la propagación del evento; vuelve a
  aparecer al reingresar con mouse o foco.
- La flecha es `aria-hidden`: no se anuncia.

<!-- a11y:start Tooltip -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/tooltip/tooltip.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-tooltip`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Roles | `tooltip` |
| Atributos ARIA | `aria-hidden="true"`, `aria-describedby` |
| Teclas que maneja el código | `Escape` |
<!-- a11y:end -->

## Trampas

- **Si el contenido proyectado no tiene un elemento enfocable, el tooltip es
  inaccesible por teclado y no se ata por `aria-describedby`.** Envolver un `<span>` o
  un ícono suelto lo deja como decoración visual: envuelve siempre un control real.
- No reemplaza al nombre accesible. Un botón de solo ícono necesita igual su
  `aria-label`; el tooltip lo *describe*, no lo *nombra*.
- El posicionamiento es CSS puro, sin detección de colisión: cerca del borde de la
  ventana el popup puede recortarse. Elige `side` según dónde vive el trigger.
- No acepta markup en `content`: es texto plano.
