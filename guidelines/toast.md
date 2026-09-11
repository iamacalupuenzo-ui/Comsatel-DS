# Toast

Confirmación efímera de algo que acaba de pasar. No interrumpe y no exige respuesta. Si
la condición sigue siendo cierta hasta que alguien la resuelva, el componente es
`Banner`; si hay que decidir antes de seguir, es `Modal`.

- **Import:** `import { Toast } from 'comsatel-ds';`
- **Selector:** `<cs-toast>`
- **Clase raíz emitida:** `.cs-toast`

```html
<cs-toast
  variant="success"
  title="Reporte exportado"
  description="El archivo se descargó correctamente."
  (dismissed)="visible = false"
></cs-toast>
```

## Props

<!-- props:start Toast -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/toast/toast.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `title` | `string` | requerido | Mensaje principal. |
| `description` | `string \| undefined` | `undefined` | Detalle secundario. |
| `variant` | `'default' \| 'info' \| 'success' \| 'warning' \| 'error'` | `'default'` | Color e ícono por defecto. |
| `icon` | `IconName \| undefined` | `undefined` | Reemplaza el ícono de la variante. |
| `actions` | `ToastAction[] \| undefined` | `undefined` | Acciones inline. `{ label, href? }`. |
| `dismissLabel` | `string` | `'Descartar'` | Nombre accesible del botón de cerrar. |
| `actionClick` | `EventEmitter<ToastAction>` | n/a | Emite la acción elegida. |
| `dismissed` | `EventEmitter<void>` | n/a | Emite al descartar. |
<!-- props:end -->

## Accesibilidad (a11y)

- El host es `role="status"` con `aria-live="polite"` y `aria-atomic="true"`: el
  mensaje se anuncia completo cuando aparece, sin robar el foco.
- `polite` es deliberado: no interrumpe lo que el usuario está haciendo. Un error que
  **sí** debe interrumpir no es un toast.
- El botón de cerrar toma su nombre de `dismissLabel`.
- El ícono es decorativo: el significado va en `title`, nunca solo en el color.

<!-- a11y:start Toast -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/toast/toast.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-toast`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `a[href]`, `button` |
| Roles | `status` |
| Atributos ARIA | `aria-label`, `aria-live="polite"`, `aria-atomic="true"` |
| Compone | `cs-icon` |
<!-- a11y:end -->

## Trampas

- **El componente no se muestra ni se esconde solo, y no tiene temporizador.** No hay
  cola, ni auto-dismiss, ni posicionamiento en pantalla: montarlo, apilarlo y sacarlo
  del DOM es responsabilidad de un servicio propio de la aplicación. `dismissed` solo
  avisa.
- Por lo mismo, la duración en pantalla la define quien lo usa. Un toast con acción
  necesita tiempo suficiente para alcanzarla, o no debería desaparecer solo.
- `actions` con `href` navega; sin `href`, el manejo va por `(actionClick)`.
