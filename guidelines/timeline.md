# Timeline

Línea de tiempo vertical para el **historial** de un registro: cada paso con su acción, fecha y
detalle, unidos por una línea, con el paso actual resaltado.

- **Import:** `import { Timeline, TimelineItem } from '@iamacalupuenzo-ui/comsatel-ds';`
- **Selectores:** `ol[csTimeline]`, `li[csTimelineItem]`

```html
<ol csTimeline aria-label="Historial de la orden">
  <li csTimelineItem title="Registrada" time="27 sep. 2026, 10:42" description="Carga masiva de MAF"></li>
  <li csTimelineItem title="Observada" time="28 sep. 2026, 09:15" description="Falta el oficio firmado." [current]="true"></li>
</ol>
```

## Cuándo usarlo

| Caso | Usa | Motivo |
| :-- | :-- | :-- |
| Historial de estados de un registro | `Timeline` | Muestra el orden y el paso actual. |
| Lista de eventos que se pueden seleccionar | Una lista propia o `ListItem` | Seleccionar no es parte de un historial. |
| Pasos de un proceso por completar | `ProgressIndicator` | Muestra lo que falta, no lo que pasó. |

## Orden y paso actual

Los pasos van del más antiguo al más reciente. Marca con `[current]="true"` el estado vigente,
normalmente el último: se anuncia con `aria-current="step"`.

## Props de `Timeline`

<!-- props:start Timeline -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/timeline/timeline.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| n/a | n/a | n/a | Sin props propias: se usa por composición. |
<!-- props:end -->

## Props de `TimelineItem`

<!-- props:start TimelineItem -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/timeline/timeline.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `title` | `string` | requerido | Qué pasó: «Registrada», «Observada». |
| `time` | `string` | `''` | Fecha y hora legibles. |
| `dateTime` | `string` | `''` | Fecha en formato ISO para el atributo datetime. |
| `description` | `string` | `''` | Detalle del paso: quién lo hizo o por qué. |
| `current` | `boolean` | `false` | Paso actual: marcador de marca y aria-current="step". |
<!-- props:end -->

## Accesibilidad

- Es un `<ol>` nativo: el lector de pantalla anuncia cuántos pasos hay y en cuál está.
- Nombra la lista con `aria-label` o `aria-labelledby` en el `<ol>`.
- La fecha va en `<time>`; con `dateTime` lleva además el valor ISO.

<!-- a11y:start Timeline -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/timeline/timeline.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `ol[csTimeline]`

No renderiza controles nativos, roles ni atributos ARIA propios, y no maneja teclado: es presentacional.
<!-- a11y:end -->

<!-- a11y:start TimelineItem -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/timeline/timeline.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `li[csTimelineItem]`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Atributos ARIA | `aria-hidden="true"`, `aria-current` |
<!-- a11y:end -->
