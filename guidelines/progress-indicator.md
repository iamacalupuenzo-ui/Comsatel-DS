# ProgressIndicator

Muestra el avance de un proceso de varios pasos: cuáles se completaron, cuál está en curso
y cuáles faltan. Es el único componente de pasos del sistema: `Stepper` quedó obsoleto
(ver al final).

- **Import:** `import { ProgressIndicator } from 'comsatel-ds';`
- **Selector:** `<cs-progress-indicator>`
- **Clase raíz emitida:** `.cs-progress-indicator`

```html
<cs-progress-indicator
  ariaLabel="Alta de vehículo"
  orientation="horizontal"
  [steps]="[
    { id: 'data', label: 'Datos del vehículo', state: 'done' },
    { id: 'device', label: 'Dispositivo GPS', state: 'active' },
    { id: 'review', label: 'Revisión', state: 'pending' }
  ]"
></cs-progress-indicator>
```

## Props

<!-- props:start ProgressIndicator -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/progress-indicator/progress-indicator.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `steps` | `ProgressIndicatorStep[]` | requerido | `{ id, label, description?, state }`. |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Dirección del recorrido. |
| `interactive` | `boolean` | `false` | Convierte cada nodo en un botón para volver a ese paso. |
| `ariaLabel` | `string` | `'Progreso'` | Nombre accesible del recorrido. Pasa uno que diga qué proceso es. |
| `stepClick` | `EventEmitter<string>` | n/a | Emite el `id` del paso pulsado. |
<!-- props:end -->

`state` es `'done' | 'active' | 'pending'`.

## Accesibilidad (a11y) y teclado

- El contenedor es `role="list"` con `aria-label`, y cada paso es `role="listitem"`: se
  anuncia como una lista con su cantidad de elementos.
- El paso en curso lleva `aria-current="step"`.
- **Cada paso anuncia su estado en texto**, no solo con el color o el ícono:
  - Sin `interactive`, un texto oculto visualmente sigue a la etiqueta: se lee
    "Datos del vehículo, completado".
  - Con `interactive`, cada nodo es un `<button>` cuyo nombre incluye posición, etiqueta y
    estado: "Paso 2: Dispositivo GPS, activo". Foco, Enter y Espacio los da el navegador.
- Los conectores y los íconos de estado son `aria-hidden`.

<!-- a11y:start ProgressIndicator -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/progress-indicator/progress-indicator.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-progress-indicator`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `button` |
| Roles | `list`, `listitem` |
| Atributos ARIA | `aria-hidden="true"`, `aria-label`, `aria-current`, `aria-hidden` |
| Compone | `cs-icon` |
<!-- a11y:end -->

## Trampas

- **`state` lo calculas tú.** El componente no deduce el avance: marcar `done`, `active`
  y `pending` en cada paso es responsabilidad de la aplicación.
- `stepClick` solo emite: navegar al paso es cosa de quien lo usa. No permitas saltar a
  un paso `pending` que todavía no es alcanzable.
- `id` tiene que ser único y estable: es la clave del `track` de la lista.
- No hay estado de error por paso: si un paso falla, explica qué pasó con un `cs-banner`
  sobre el recorrido. Está registrado en `GAPS.md`.
- No lo uses como navegación entre secciones independientes: para eso está `cs-tabs`.

## Stepper (obsoleto)

`Stepper` (`<cs-stepper>`, clase `.cs-stepper`) tenía la misma API que `ProgressIndicator`
con otra implementación. Desde el 2026-09-11 está marcado `@deprecated`: sigue exportado
solo para no romper a quien ya lo usa, y la ruta de su página redirige a Progress
indicator. **No lo uses en código nuevo.**

Para migrar, el cambio es de nombres, no de comportamiento:

| Antes | Ahora |
| :-- | :-- |
| `<cs-stepper>` | `<cs-progress-indicator>` |
| `Stepper` | `ProgressIndicator` |
| `StepperStep` | `ProgressIndicatorStep` |
| `StepperStepState` | `ProgressStepState` |
| `StepperOrientation` | `ProgressIndicatorOrientation` |

<!-- props:start Stepper -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/stepper/stepper.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `steps` | `StepperStep[]` | requerido | Obsoleto: usa `ProgressIndicator`. |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Obsoleto: usa `ProgressIndicator`. |
| `interactive` | `boolean` | `false` | Obsoleto: usa `ProgressIndicator`. |
| `ariaLabel` | `string` | `'Progreso'` | Obsoleto: usa `ProgressIndicator`. |
| `stepClick` | `EventEmitter<string>` | n/a | Obsoleto: usa `ProgressIndicator`. |
<!-- props:end -->

<!-- a11y:start Stepper -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/stepper/stepper.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-stepper`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `button` |
| Roles | `list`, `listitem` |
| Atributos ARIA | `aria-hidden="true"`, `aria-label`, `aria-current` |
| Compone | `cs-icon` |
<!-- a11y:end -->
