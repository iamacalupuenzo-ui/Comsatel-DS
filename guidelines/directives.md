# Directivas: csPressScale y csCollapse

Tokens de Collapse: `--motion-duration-medium` y `--motion-easing-default`.
Full usa porcentaje del padre; no agrega tamaños, colores ni tokens nuevos.

Dos comportamientos de movimiento reutilizables que se aplican sobre un elemento que ya
existe, en vez de envolverlo en un componente.

- **Import:** `import { PressScale, Collapse } from '@iamacalupuenzo-ui/comsatel-ds';`
- **Import liviano:** `import { PressScale } from '@iamacalupuenzo-ui/comsatel-ds/motion';` y `import { Collapse } from '@iamacalupuenzo-ui/comsatel-ds/directives';` (ver «Importar desde un subpath» en `docs/consumer-angular.md`)
- **Selectores:** `[csPressScale]`, `[csCollapse]`

## csPressScale

Feedback de "presionado": encoge el elemento a 0.98 mientras el puntero está abajo, y
vuelve a su tamaño al soltar, al salir o al cancelar. Las duraciones salen de los tokens
`--motion-duration-fast` y `--motion-duration-leaving`.

```html
<button type="button" class="row-action" csPressScale>Ver detalle</button>
```

<!-- props:start PressScale -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/motion/src/press-scale.directive.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

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
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/directives/src/collapse.directive.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `csCollapse` | `boolean` | `false` | `true` expande, `false` colapsa. |
| `csCollapseMode` | `'auto' \| 'full'` | `'auto'` | auto conserva la altura natural; full llena la altura definida por el padre y habilita scroll interno. |
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
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/motion/src/press-scale.directive.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `[csPressScale]`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Teclas que maneja el código | `Enter`, `Space` |
| prefers-reduced-motion | Lo respeta |
<!-- a11y:end -->

<!-- a11y:start Collapse -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/directives/src/collapse.directive.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `[csCollapse]`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Atributos ARIA | `aria-hidden` |
| Contenido oculto | Aplica `inert` mientras está oculto: sale del orden de foco y del árbol accesible |
| prefers-reduced-motion | Lo respeta |
<!-- a11y:end -->

## Trampas

- `csCollapseMode="full"` requiere un padre con altura definida y un anfitrión sin
  padding; aplica espaciado al contenido interior. Al expandir resuelve `100%`,
  incluso con pocos resultados; al cerrar llega a cero. El consumidor conserva
  el header fuera del cuerpo y devuelve el foco al disparador antes de ocultar.
- Cambiar de estado interrumpe la animación anterior. Al destruir se cancelan
  tweens; el modo `auto` existente conserva su contrato.

- `csPressScale` va sobre un control interactivo real (`button`, `a`). Sobre un `div` da
  feedback de algo que no se puede activar.
- El elemento con `csCollapse` queda con `display: block` y `overflow: hidden` desde el
  host: no lo uses sobre un elemento que necesita otro `display`.
- Para mostrar y ocultar un bloque completo con fade o slide, el componente es
  `cs-motion`; `csCollapse` es solo altura.
