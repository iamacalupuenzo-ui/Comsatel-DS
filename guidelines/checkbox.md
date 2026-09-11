# Checkbox

Selección múltiple independiente: cada casilla se marca sin afectar a las demás. Para
elegir una sola opción de un conjunto, el componente es `Radio`/`RadioGroup`.

- **Import:** `import { Checkbox } from 'comsatel-ds';`
- **Selector:** `<cs-checkbox>`
- **Clase raíz emitida:** `.cs-checkbox`

```html
<cs-checkbox
  label="Recibir alertas por correo"
  description="Se envían cuando un vehículo sale de la geocerca."
  [checked]="alerts"
  (checkedChange)="alerts = $event"
></cs-checkbox>
```

## Props

<!-- props:start Checkbox -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/checkbox/checkbox.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño de la caja y de la tipografía. |
| `label` | `string \| undefined` | `undefined` | Texto principal, clickeable. |
| `description` | `string \| undefined` | `undefined` | Segunda línea de apoyo. |
| `aria-label` | `string` | `''` | Nombre accesible cuando no hay `label` visible. |
| `disabled` | `boolean` | `false` | Deshabilita la interacción. |
| `indeterminate` | `boolean` | `false` | Estado mixto, para una casilla "seleccionar todo" parcial. |
| `checked` | `boolean` | `false` | Estado marcado. |
| `checkedChange` | `EventEmitter<boolean>` | n/a | Emite el nuevo estado al cambiar. |
<!-- props:end -->

## Accesibilidad (a11y) y teclado

- Renderiza un `<input type="checkbox">` nativo dentro de un `<label for>`: el foco,
  **Espacio** para alternar y el anuncio del rol los da el navegador. No hay handler
  de teclado propio.
- Como el `<label>` envuelve todo, **hacer clic en el texto también alterna** la
  casilla: no agregues un `(click)` propio en el label, se dispararía dos veces.
- `indeterminate` se escribe sobre la propiedad DOM real del input, así que los
  lectores de pantalla anuncian "mixto", no solo se dibuja la rayita.
- Sin `label` visible, `aria-label` es obligatorio: una casilla dentro de una celda de
  tabla ("seleccionar fila") queda sin nombre accesible si no se lo pasas.

<!-- a11y:start Checkbox -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/checkbox/checkbox.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-checkbox`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `label`, `input[type="checkbox"]` |
| Atributos ARIA | `aria-label` |
<!-- a11y:end -->

## Trampas

- **Es controlado.** `checked` no se actualiza solo: si no escuchas `checkedChange` y
  reasignas el valor, la casilla vuelve visualmente a su estado anterior.
- **Al hacer clic, `indeterminate` se apaga.** El componente lo pone en `false` en el
  cambio; si tu "seleccionar todo" debe volver a mixto, recalcúlalo tú en el handler.
- `label` y `description` son texto plano, no admiten markup proyectado.
