# Toggle

Interruptor de efecto inmediato: activa o desactiva algo al instante, sin botón de
confirmación. Si el cambio recién se aplica al guardar un formulario, el componente
correcto es `Checkbox`.

- **Import:** `import { Toggle } from 'comsatel-ds';`
- **Selector:** `<cs-toggle>`
- **Clase raíz emitida:** `.cs-toggle`

```html
<cs-toggle
  label="Modo nocturno del mapa"
  [checked]="darkMap"
  (checkedChange)="darkMap = $event"
></cs-toggle>
```

## Props

<!-- props:start Toggle -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/toggle/toggle.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Tamaño del track y del thumb. |
| `label` | `string \| undefined` | `undefined` | Texto principal, clickeable. |
| `description` | `string \| undefined` | `undefined` | Segunda línea de apoyo. |
| `aria-label` | `string` | `''` | Nombre accesible cuando no hay `label` visible. |
| `disabled` | `boolean` | `false` | Deshabilita la interacción. |
| `checked` | `boolean` | `false` | Estado encendido. |
| `checkedChange` | `EventEmitter<boolean>` | n/a | Emite el nuevo estado al cambiar. |
<!-- props:end -->

## Accesibilidad (a11y) y teclado

- Renderiza un `<input type="checkbox" role="switch">` nativo dentro de un `<label for>`.
  El lector de pantalla lo anuncia como interruptor ("activado"/"desactivado"), no como
  casilla. El foco y **Espacio** para alternar los da el navegador.
- El `<label>` envuelve el control, así que el clic en el texto también alterna.
- Sin `label` visible, `aria-label` es obligatorio.
- No cambies el texto del label según el estado ("Activado"/"Desactivado"): el rol
  `switch` ya anuncia el estado, y un label que cambia se lee dos veces y confunde. El
  label nombra *qué* controla, no cómo está.

<!-- a11y:start Toggle -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/toggle/toggle.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-toggle`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `label`, `input[type="checkbox"]` |
| Roles | `switch` |
| Atributos ARIA | `aria-label` |
<!-- a11y:end -->

## Trampas

- **Es controlado**, igual que `Checkbox`: sin escuchar `checkedChange` y reasignar
  `checked`, el interruptor vuelve a su estado anterior.
- No tiene estado de carga. Si la acción es asíncrona y puede fallar, deshabilitalo
  mientras dura y revierte `checked` en el error: el componente no lo hace solo.
- No tiene estado indeterminado (a diferencia de `Checkbox`).
