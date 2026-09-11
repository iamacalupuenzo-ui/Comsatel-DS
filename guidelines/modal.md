# Modal

Diálogo que interrumpe la tarea y exige una decisión antes de seguir. Si el contenido
puede convivir con la página, no es un modal.

- **Import:** `import { Modal } from 'comsatel-ds';`
- **Selector:** `<cs-modal>`
- **Clase raíz emitida:** `.cs-modal`

```html
<cs-modal
  [isOpen]="confirmOpen"
  title="Eliminar geocerca"
  appearance="danger"
  [primaryAction]="{ label: 'Eliminar' }"
  [secondaryAction]="{ label: 'Cancelar' }"
  (primaryActionClick)="remove()"
  (secondaryActionClick)="confirmOpen = false"
  (closed)="confirmOpen = false"
>
  Esta acción no se puede deshacer.
</cs-modal>
```

## Props

<!-- props:start Modal -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/modal/modal.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `isOpen` | `boolean` | `false` | Abre o cierra el diálogo. |
| `title` | `string` | requerido | Titula el diálogo y es su nombre accesible. |
| `appearance` | `'default' \| 'warning' \| 'danger'` | `'default'` | Tono del encabezado y de la acción primaria. |
| `width` | `'sm' \| 'md' \| 'lg' \| 'xl' \| number` | `'md'` | Ancho por token, o en píxeles si es número. |
| `hasCloseButton` | `boolean` | `true` | Muestra la X del encabezado. |
| `closeLabel` | `string` | `'Cerrar'` | Nombre accesible de la X. |
| `scrollBehavior` | `'body' \| 'viewport'` | `'body'` | Scrollea el cuerpo del diálogo, o toda la ventana. |
| `closeOnOverlayClick` | `boolean` | `true` | Cierra al hacer clic en el fondo. |
| `primaryAction` | `ModalAction \| undefined` | `undefined` | `{ label, disabled?, loading? }`. |
| `secondaryAction` | `ModalAction \| undefined` | `undefined` | Igual que la primaria. |
| `initialFocusRef` | `ElementRef<HTMLElement> \| undefined` | `undefined` | Elemento que recibe el foco al abrir. |
| `closed` | `EventEmitter<void>` | n/a | Emite al pedir cierre (X, Escape u overlay). |
| `primaryActionClick` | `EventEmitter<void>` | n/a | Clic en la acción primaria. |
| `secondaryActionClick` | `EventEmitter<void>` | n/a | Clic en la acción secundaria. |
<!-- props:end -->

El contenido del cuerpo va proyectado.

## Accesibilidad (a11y) y teclado

- El panel es `role="dialog"` con `aria-modal="true"` y `aria-labelledby` apuntando al
  id del `title`: por eso `title` es requerido.
- **El foco queda atrapado adentro.** Tab desde el último elemento enfocable vuelve al
  primero, y Shift+Tab desde el primero salta al último.
- **Escape cierra** y emite `closed`.
- Al abrir, el foco entra al diálogo (al `initialFocusRef` si lo pasas; si no, al
  primer enfocable). Al cerrar, **el foco vuelve al elemento que lo abrió**.
- El diálogo se monta en un portal sobre `document.body`, así que ningún
  `overflow: hidden` de un ancestro lo recorta ni lo deja debajo de otra capa.

<!-- a11y:start Modal -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/modal/modal.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-modal`

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

## Trampas

- **`closed` no cierra el modal.** Solo avisa: hay que poner tú `isOpen` en `false`.
  Si no lo manejas, Escape y la X no hacen nada visible.
- Lo mismo con las acciones: `primaryActionClick` no cierra nada por sí solo.
- Para una confirmación destructiva, pon `closeOnOverlayClick` en `false`: un clic
  accidental afuera no debería descartar una decisión importante.
- `width` numérico se interpreta en píxeles; no le pases un string con unidad.
- Un modal que dispara otro modal no está soportado como patrón: resuelve el flujo en
  un solo diálogo o en pasos con `ProgressIndicator`.
