# Spotlight

Globo de onboarding que señala un elemento de la interfaz y explica para qué sirve.
Se usa en recorridos guiados, no para mensajes del día a día.

- **Import:** `import { Spotlight } from 'comsatel-ds';`
- **Selector:** `<cs-spotlight>`
- **Clase raíz emitida:** `.cs-spotlight`

```html
<cs-spotlight
  [isVisible]="tourStep === 2"
  placement="bottom"
  headline="Filtra por geocerca"
  description="Puedes acotar la lista a una zona específica."
  stepCount="2 de 4"
  primaryActionLabel="Siguiente"
  secondaryActionLabel="Saltar"
  (primaryAction)="tourStep = 3"
  (secondaryAction)="endTour()"
></cs-spotlight>
```

## Props

<!-- props:start Spotlight -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/spotlight/spotlight.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `isVisible` | `boolean` | `false` | Muestra u oculta el globo. |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | Lado donde aparece. |
| `headline` | `string` | requerido | Título del mensaje. |
| `description` | `string \| undefined` | `undefined` | Texto explicativo. |
| `stepCount` | `string \| undefined` | `undefined` | Posición en el recorrido, ej. `'2 de 4'`. |
| `primaryActionLabel` | `string` | requerido | Texto de la acción principal. |
| `secondaryActionLabel` | `string \| undefined` | `undefined` | Texto de la acción secundaria. |
| `dismissible` | `boolean` | `false` | Muestra el botón de cerrar. |
| `dismissLabel` | `string` | `'Cerrar spotlight'` | Nombre accesible de ese botón. |
| `primaryAction` | `EventEmitter<void>` | n/a | Clic en la acción principal. |
| `secondaryAction` | `EventEmitter<void>` | n/a | Clic en la acción secundaria. |
| `dismissed` | `EventEmitter<void>` | n/a | Emite cuando el usuario pide cerrar el globo. |
<!-- props:end -->

## Accesibilidad (a11y) y teclado

- Las acciones son `<button>` reales: foco, Enter y Espacio los da el navegador.
- `stepCount` como texto ("2 de 4") le da al usuario de lector de pantalla la misma
  información de avance que el resto ve visualmente. Vale la pena pasarlo siempre en un
  recorrido de varios pasos.
- Un recorrido guiado tiene que poder abandonarse: ofrece `secondaryActionLabel` o
  `dismissible`, nunca dejes al usuario sin salida.
- El foco no se mueve solo al globo cuando aparece: si el recorrido debe ser navegable
  por teclado, enfoca tú la acción principal al mostrarlo.

<!-- a11y:start Spotlight -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/spotlight/spotlight.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-spotlight`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `button` |
| Roles | `dialog` |
| Atributos ARIA | `aria-live="polite"`, `aria-labelledby`, `aria-describedby`, `aria-label` |
| Teclas que maneja el código | `Escape` |
| Compone | `cs-icon` |
<!-- a11y:end -->

## Trampas

- **No se posiciona solo respecto de un elemento.** `placement` define de qué lado se
  dibuja, pero anclarlo al elemento que está señalando es responsabilidad del layout que
  lo contiene.
- No oscurece el resto de la pantalla ni bloquea la interacción: no es un modal.
- `isVisible` es controlado: los eventos solo avisan, el estado del recorrido lo llevas
  tú.
