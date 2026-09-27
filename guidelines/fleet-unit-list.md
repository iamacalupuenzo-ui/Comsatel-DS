# FleetUnitList

Organismo de filas planas: la fila selecciona y el botón de tres puntos abre
acciones y telemetría en Popover separado. No expande unidades.

- **Import:** `import { FleetUnitList, type FleetUnit } from '@iamacalupuenzo-ui/comsatel-ds';`
- **Selector:** `<cs-fleet-unit-list>`
- **Clase raíz emitida:** `.cs-fleet-unit-list`

```html
<cs-fleet-unit-list [units]="units" [selectedId]="selectedId"
  (selectedIdChange)="selectedId = $event" (detailClick)="openUnit($event)" />
```

```ts
import { FleetUnitList, type FleetUnit } from '@iamacalupuenzo-ui/comsatel-ds';

const units: FleetUnit[] = [
  {
    id: 'norte-04',
    name: 'Camión Norte 04',
    status: 'active',
    statusLabel: 'Activo',
    lastSeen: 'Reportando, hace 2 min',
    speed: '62 km/h',
    battery: '88%',
    location: 'Av. Argentina, Callao',
  },
];
```

## Props

<!-- props:start FleetUnitList -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/fleet-unit-list/fleet-unit-list.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `units` | `FleetUnit[]` | requerido | Unidades a listar. Cada `id` tiene que ser único: es la clave del acordeón. |
| `type` | `'single' \| 'multiple'` | `'single'` | Obsoleto, conservado sin efecto. |
| `defaultExpandedIds` | `string[]` | `[]` | Obsoleto, conservado sin efecto. |
| `expandedIds` | `string[] \| undefined` | `undefined` | Obsoleto, conservado sin efecto. |
| `detailLabel` | `string` | `'Ver detalle'` | Texto visible del botón de acción. Su nombre accesible le agrega el nombre de la unidad. |
| `appearance` | `'outlined' \| 'filled'` | `'outlined'` | Delineado para separar unidades densas o relleno cuando la lista ya vive dentro de un panel. |
| `surface` | `'default' \| 'secondary'` | `'default'` | Superficie cálida optativa, independiente de expansión y selección. |
| `selectable` | `boolean` | `true` | Habilita selección directa de fila, activa por defecto. |
| `pinnable` | `boolean` | `false` | Muestra Fijar en el Popover. |
| `selectedId` | `string \| null` | `null` | Unidad seleccionada controlada; no modifica expansión ni fijados. |
| `pinnedIds` | `string[]` | `[]` | Fijados controlados; se ordenan primero conservando el orden original de cada grupo. |
| `expandedIdsChange` | `EventEmitter<string[]>` | n/a | Obsoleto, ya no emite. |
| `detailClick` | `EventEmitter<FleetUnit>` | n/a | Emite la unidad completa al pulsar el botón de detalle. |
| `selectedIdChange` | `OutputEmitterRef<string \| null>` | n/a | Solicita selección o limpieza; el consumidor actualiza selectedId. |
| `pinnedIdsChange` | `OutputEmitterRef<string[]>` | n/a | Solicita la lista de fijados; el consumidor actualiza pinnedIds. |
<!-- props:end -->

`FleetUnit` es `{ id, name, status, statusLabel, lastSeen, speed, battery, location,
diagnostics?, alert? }`. Todos los valores son texto ya formateado.

El `status` decide el color y el ícono del badge, con un mapeo fijo:

| `status` | Badge | Ícono |
| :-- | :-- | :-- |
| `'active'` | `success` | `activity` |
| `'stopped'` | `warning` | `circle-pause` |
| `'offline'` | `neutral` | `wifi-off` |

## Accesibilidad (a11y) y teclado

- Botón nativo de selección: Enter/Espacio y aria-pressed, nombre estable.
- Tab recorre selección y acciones; no hay navegación de acordeón.
- El Popover tiene nombre, portal y relaciones ARIA; su primera acción recibe foco.
- Escape cierra y devuelve foco al disparador. Fijar y detalle también cierran.
- Telemetría en dl; estado con texto y fijado con estrella.

<!-- a11y:start FleetUnitList -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/fleet-unit-list/fleet-unit-list.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-fleet-unit-list`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `ul`, `button` |
| Atributos ARIA | `aria-label="Unidades de flota"`, `aria-hidden="true"`, `aria-label="Fijada"`, `aria-pressed`, `aria-label` |
| Foco | Mueve el foco por código (`.focus()`) |
| Compone | `cs-icon`, `cs-tag`, `cs-button`, `cs-popover` |
<!-- a11y:end -->

## Trampas

`type`, `expandedIds`, `defaultExpandedIds` y `expandedIdsChange` se conservan
obsoletos sin efecto. Migra a selección controlada; usa Accordion si necesitas
expansión. selectedIdChange y pinnedIdsChange solo solicitan cambios al consumidor.

## Tokens usados

Superficies, borde, foco y tipografía del sistema; secondary es optativo.
La telemetría conserva el breakpoint histórico de 767px documentado en el validador.

Geometría en ambos temas: `layout-size-2xl` (64px), `radius-md` (6px),
`content-ui` (13px)/`font-weight-bold` (700), subtítulo `content-note` (12px).
Barra interior de `layout-border-thin + layout-border-thick` (3px), radio
`radius-md - layout-border-thin` (5px); borde seleccionado fino, sin doble inset.
Hover: `color-border-neutral-default` (claro #d0d5dd, oscuro #475467) y shadow-sm.
Título: `color-text-base-default` (claro #344054, oscuro #d0d5dd).
Selección: `color-border-selected` y `color-background-selected`, adaptados al tema.
