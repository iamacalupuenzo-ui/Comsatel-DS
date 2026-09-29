# SideDrawer

Cajón lateral **modal**: encabezado con título y cierre, cuerpo con scroll propio y pie de acciones opcional.
Se abre desde la derecha sobre la pantalla actual, así la persona no pierde de vista de dónde vino.

- **Import:** `import { SideDrawer, type SideDrawerAction } from '@iamacalupuenzo-ui/comsatel-ds';`
- **Import liviano:** `import { SideDrawer } from '@iamacalupuenzo-ui/comsatel-ds/side-drawer';` (ver «Importar desde un subpath» en `docs/consumer-angular.md`)
- **Selector:** `<cs-side-drawer>`

```html
<cs-side-drawer
  [isOpen]="open"
  title="Editar recupero"
  surface="canvas"
  [primaryAction]="{ label: 'Guardar', icon: 'check', loading: saving }"
  [secondaryAction]="{ label: 'Cancelar' }"
  (primaryActionClick)="save()"
  (secondaryActionClick)="open = false"
  (closed)="open = false"
>
  …campos…
</cs-side-drawer>
```

## Cuándo usarlo

| Caso | Usa | Motivo |
| :-- | :-- | :-- |
| Detalle de una fila | `SideDrawer` sin acciones | La tabla sigue a la vista detrás. |
| Formulario de más de cuatro campos | `SideDrawer` con acciones | El cuerpo hace scroll y el pie queda visible. |
| Confirmar, anular u observar | `Modal` | Es una decisión corta que no necesita contexto. |

## Superficie

`surface="canvas"` usa `--color-background-canvas` cuando el contenido lleva tarjetas o campos blancos encima.
La superficie blanca, la predeterminada, es para texto corrido.

## Props

<!-- props:start SideDrawer -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/side-drawer/src/side-drawer.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `isOpen` | `boolean` | `false` | Controla si está abierto. |
| `title` | `string` | requerido | Título del encabezado; nombra el diálogo. |
| `closeLabel` | `string` | `'Cerrar'` | Nombre accesible del botón de cierre. |
| `width` | `number` | `560` | Ancho máximo en px; hasta 767 px ocupa toda la pantalla. |
| `surface` | `'default' \| 'canvas'` | `'default'` | Fondo blanco o lienzo de la página (canvas). |
| `closeOnOverlayClick` | `boolean` | `true` | Pide el cierre con un clic fuera del panel. |
| `primaryAction` | `SideDrawerAction \| undefined` | `undefined` | Acción principal del pie: label, icon?, disabled?, loading?. |
| `secondaryAction` | `SideDrawerAction \| undefined` | `undefined` | Acción secundaria del pie, a la izquierda de la principal. |
| `closed` | `EventEmitter<void>` | n/a | Pedido de cierre (Escape, botón o clic afuera). |
| `primaryActionClick` | `EventEmitter<void>` | n/a | Clic en la acción principal. |
| `secondaryActionClick` | `EventEmitter<void>` | n/a | Clic en la acción secundaria. |
<!-- props:end -->

## Accesibilidad

- El panel es `role="dialog"` con `aria-modal="true"` y se nombra con el título (`aria-labelledby`).
- Al abrir, el foco va al botón de cerrar; Tab queda atrapado en el panel y al cerrar vuelve a quien lo abrió.
- Escape y el clic afuera piden el cierre con `(closed)`: el cajón no se cierra solo.

<!-- a11y:start SideDrawer -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/side-drawer/src/side-drawer.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-side-drawer`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `button` |
| Roles | `dialog` |
| Atributos ARIA | `aria-modal="true"`, `aria-hidden="true"`, `aria-labelledby`, `aria-label` |
| Teclas que maneja el código | `Escape`, `Tab` |
| Foco | Mueve el foco por código (`.focus()`) |
| Portal | Se monta en `document.body` |
| Compone | `cs-icon`, `cs-button` |
<!-- a11y:end -->
