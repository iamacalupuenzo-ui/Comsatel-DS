# Popover

Motor de posicionamiento y portal para cualquier capa flotante: menús, flyouts,
calendarios, paneles. Es la pieza sobre la que se construyen otros componentes, no un
componente de producto por sí solo.

- **Import:** `import { Popover } from 'comsatel-ds';`
- **Selector:** `<cs-popover>`
- **Clase raíz emitida:** `.cs-popover`

```html
<button #trigger type="button" (click)="open = !open">Opciones</button>

<cs-popover
  [isOpen]="open"
  [triggerRef]="trigger"
  placement="bottom-start"
  [offset]="8"
  (closed)="open = false"
>
  <div>Contenido flotante</div>
</cs-popover>
```

## Props

<!-- props:start Popover -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/popover/popover.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `isOpen` | `boolean` | `false` | Abre o cierra la capa. |
| `id` | `string` | autogenerado | Id del panel, para `aria-controls` del trigger. |
| `triggerRef` | `ElementRef<HTMLElement> \| HTMLElement \| null` | `null` | Elemento respecto del cual se posiciona. |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right' \| 'top-start' \| 'bottom-start' \| 'left-start' \| 'right-start' \| 'top-end' \| 'bottom-end' \| 'left-end' \| 'right-end'` | `'bottom-start'` | Lado y alineación, ej. `'right-start'`, `'top-end'`. |
| `offset` | `number` | `8` | Distancia en píxeles respecto del trigger. |
| `matchTriggerWidth` | `boolean` | `false` | Fuerza el ancho del panel al del trigger. |
| `role` | `string \| null` | `'dialog'` | Rol ARIA del panel. `null` lo quita. |
| `ariaLabel` | `string \| null` | `null` | Nombre accesible del panel. |
| `ariaLabelledBy` | `string \| null` | `null` | Id del elemento que lo nombra. |
| `closeOnOverlayClick` | `boolean` | `true` | Cierra al hacer clic afuera. |
| `bare` | `boolean` | `false` | Sin marco ni fondo propios. |
| `closed` | `EventEmitter<void>` | n/a | Emite cuando pide cerrarse. |
<!-- props:end -->

El contenido flotante va proyectado.

## Accesibilidad (a11y) y teclado

- El panel se monta en un portal, así que ningún `overflow: hidden` de un ancestro lo
  recorta ni lo tapa.
- Por defecto es `role="dialog"`: dale nombre con `ariaLabel` o `ariaLabelledBy`. Si lo
  usas como capa puramente visual (un tooltip propio, un flyout ya nombrado por otro
  elemento), pon `role` en `null` para no anunciar un diálogo que no lo es.
- **El cableado del trigger es tuyo:** `aria-haspopup`, `aria-expanded` y
  `aria-controls` (apuntando al `id` del popover) van en el botón que lo abre. El
  popover no los escribe por ti.
- `closed` se emite al hacer clic afuera; manejar Escape en el trigger es
  responsabilidad de quien lo usa.

<!-- a11y:start Popover -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/popover/popover.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-popover`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Roles | `[attr.role] (dinámico)` |
| Atributos ARIA | `aria-label`, `aria-labelledby`, `aria-expanded`, `aria-controls`, `aria-haspopup` |
| Teclas que maneja el código | `Escape` |
| Foco | Mueve el foco por código (`.focus()`) |
| Portal | Se monta en `document.body` |
<!-- a11y:end -->

## Trampas

- **`closed` no cierra nada.** Hay que poner `isOpen` en `false`: si no, el clic
  afuera no tiene efecto visible.
- `bare` existe para contenido que ya trae su propio fondo (por ejemplo un tooltip
  oscuro): sin eso, se ve el marco claro del popover debajo.
- El posicionamiento se calcula contra `triggerRef`: si el trigger se mueve o cambia de
  tamaño mientras está abierto, hay que cerrar y reabrir.
- Antes de construir una capa flotante nueva a mano con `getBoundingClientRect`, usa
  este componente: ya resuelve portal, posicionamiento, animación y cierre.
