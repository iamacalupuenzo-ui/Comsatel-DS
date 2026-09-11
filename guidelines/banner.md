# Banner

Mensaje persistente a nivel de página o sección: una condición que sigue siendo cierta
hasta que alguien la resuelve. Para una confirmación efímera de algo que acaba de
pasar, el componente es `Toast`.

- **Import:** `import { Banner } from 'comsatel-ds';`
- **Selector:** `<cs-banner>`
- **Clase raíz emitida:** `.cs-banner`

```html
<cs-banner
  variant="warning"
  title="Dos vehículos sin señal"
  [action]="{ label: 'Ver detalle' }"
  [dismissible]="true"
  (actionClick)="openDetail()"
  (dismiss)="hidden = true"
>
  El último reporte de posición tiene más de 30 minutos.
</cs-banner>
```

## Props

<!-- props:start Banner -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/banner/banner.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `variant` | `'brand' \| 'neutral' \| 'danger' \| 'success' \| 'warning'` | `'brand'` | Color e ícono por defecto. |
| `title` | `string \| undefined` | `undefined` | Título en negrita sobre el cuerpo. |
| `icon` | `boolean` | `true` | Muestra el ícono correspondiente a la variante. |
| `action` | `BannerAction \| undefined` | `undefined` | Botón de acción inline. `{ label: string }`. |
| `dismissible` | `boolean` | `false` | Agrega el botón de cerrar. |
| `actionClick` | `EventEmitter<void>` | n/a | Emite al hacer clic en la acción. |
| `dismiss` | `EventEmitter<void>` | n/a | Emite al hacer clic en cerrar. |
<!-- props:end -->

El cuerpo del mensaje va proyectado como contenido.

## Accesibilidad (a11y) y teclado

- Tanto la acción como el botón de cerrar son `<button>` nativos: foco, **Enter** y
  **Espacio** los da el navegador. El botón de cerrar ya trae `aria-label="Cerrar"`.
- El contenedor **no** tiene `role="alert"` ni `aria-live`. Si el banner aparece como
  respuesta a algo que el usuario acaba de hacer, envuélvelo tú en un contenedor con
  `role="alert"` (error) o `aria-live="polite"` (aviso); si está en la página desde el
  render inicial, no hace falta y sería ruido.
- El ícono es decorativo y no aporta nombre accesible: el significado tiene que estar
  en el `title` o en el cuerpo, nunca solo en el color o en el ícono.

<!-- a11y:start Banner -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/banner/banner.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-banner`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `button` |
| Atributos ARIA | `aria-label="Cerrar"` |
| Compone | `cs-icon` |
<!-- a11y:end -->

## Trampas

- **`dismiss` no oculta el banner.** Solo emite el evento; sacarlo del DOM es
  responsabilidad de quien lo usa (`@if`). Si no lo manejas, el botón de cerrar no
  hace nada visible.
- `action` es un objeto, no un string: `[action]="{ label: 'Ver detalle' }"` con
  binding. Pasarlo como atributo plano no funciona, y solo acepta `label`: el
  comportamiento va en `(actionClick)`.
- El cuerpo se renderiza dentro de un `<p>`: no proyectes bloques (`<div>`, listas)
  adentro, el HTML queda inválido.
