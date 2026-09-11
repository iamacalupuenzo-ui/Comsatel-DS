# Directivas: csPressScale y csCollapse

Dos comportamientos de movimiento reutilizables que se aplican sobre un elemento que ya
existe, en vez de envolverlo en un componente.

- **Import:** `import { PressScale, Collapse } from 'comsatel-ds';`
- **Selectores:** `[csPressScale]`, `[csCollapse]`

## csPressScale

Feedback de "presionado": encoge el elemento a 0.98 mientras el puntero está abajo, y
vuelve a su tamaño al soltar, al salir o al cancelar. Las duraciones salen de los tokens
`--motion-duration-fast` y `--motion-duration-leaving`.

```html
<button type="button" class="row-action" csPressScale>Ver detalle</button>
```

<!-- props:start PressScale -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/directives/press-scale.directive.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| n/a | n/a | n/a | Sin props propias: se usa por composición. |
<!-- props:end -->

## csCollapse

Anima la altura de un elemento entre 0 y su alto real según un booleano. Existe para
listas que se expanden dentro de un `@for`, donde no hay un componente por ítem (por
ejemplo, los subniveles de `cs-menu`). El primer render aplica el estado sin animar.

```html
<ul [csCollapse]="isOpen">
  <li><a routerLink="/fleet/vehicles">Vehículos</a></li>
</ul>
```

<!-- props:start Collapse -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/directives/collapse.directive.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `csCollapse` | `boolean` | `false` | `true` expande, `false` colapsa. |
<!-- props:end -->

## Accesibilidad (a11y) y teclado

- `csPressScale` también reacciona a **Espacio** y **Enter** (sin repetición), así que el
  usuario de teclado recibe el mismo feedback que el del mouse. No cancela ni reemplaza la
  activación nativa del control.
- `csPressScale` respeta `prefers-reduced-motion: reduce`: no anima.
- Mientras está colapsado, `csCollapse` aplica `inert` y `aria-hidden="true"` al elemento:
  su contenido sale del orden de tabulación y del árbol accesible, igual que el panel
  cerrado de `cs-accordion-item`. Al expandir, los dos atributos se quitan.
- `csCollapse` respeta `prefers-reduced-motion: reduce`: cambia la altura sin animación.

<!-- a11y:start PressScale -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/directives/press-scale.directive.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `[csPressScale]`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Teclas que maneja el código | `Enter`, `Space` |
| prefers-reduced-motion | Lo respeta |
<!-- a11y:end -->

<!-- a11y:start Collapse -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/directives/collapse.directive.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `[csCollapse]`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Atributos ARIA | `aria-hidden` |
| Contenido oculto | Aplica `inert` mientras está oculto: sale del orden de foco y del árbol accesible |
| prefers-reduced-motion | Lo respeta |
<!-- a11y:end -->

## Trampas

- `csPressScale` va sobre un control interactivo real (`button`, `a`). Sobre un `div` da
  feedback de algo que no se puede activar.
- El elemento con `csCollapse` queda con `display: block` y `overflow: hidden` desde el
  host: no lo uses sobre un elemento que necesita otro `display`.
- Para mostrar y ocultar un bloque completo con fade o slide, el componente es
  `cs-motion`; `csCollapse` es solo altura.
