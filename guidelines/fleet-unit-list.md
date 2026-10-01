# FleetUnitList

Organismo de filas planas: la fila muestra placa, motor, tipo de vehículo, GPS,
encendido y último reporte. La fila selecciona y el botón de tres puntos abre
acciones; la telemetría es opcional. No expande unidades.

- **Import:** `import { FleetUnitList, type FleetUnit } from '@iamacalupuenzo-ui/comsatel-ds';`
- **Import liviano:** `import { FleetUnitList } from '@iamacalupuenzo-ui/comsatel-ds/fleet-unit-list';` (ver «Importar desde un subpath» en `docs/consumer-angular.md`)
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
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/fleet-unit-list/src/fleet-unit-list.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `units` | `FleetUnit[]` | requerido | Unidades a listar. Cada `id` tiene que ser único: identifica la fila. |
| `type` | `'single' \| 'multiple'` | `'single'` | Obsoleto, conservado sin efecto. |
| `defaultExpandedIds` | `string[]` | `[]` | Obsoleto, conservado sin efecto. |
| `expandedIds` | `string[] \| undefined` | `undefined` | Obsoleto, conservado sin efecto. |
| `detailLabel` | `string` | `'Ver detalle'` | Texto de la acción de detalle del menú; vacío para omitirla. |
| `appearance` | `'outlined' \| 'filled'` | `'outlined'` | Delineado para separar unidades densas o relleno cuando la lista ya vive dentro de un panel. |
| `surface` | `'default' \| 'secondary'` | `'default'` | **Obsoleto desde 0.3.5:** la superficie crema se descartó y se eliminará en 0.4.0. No la uses. |
| `selectable` | `boolean` | `true` | Habilita selección directa de fila, activa por defecto. |
| `pinnable` | `boolean` | `false` | Muestra Fijar en el Popover. |
| `selectedId` | `string \| null` | `null` | Unidad seleccionada controlada; no modifica expansión ni fijados. |
| `pinnedIds` | `string[]` | `[]` | Fijados controlados; se ordenan primero conservando el orden original de cada grupo. |
| `actions` | `FleetUnitActions` | `[]` | Acciones del consumidor: lista fija o función que devuelve acciones por unidad. |
| `stickyPinned` | `boolean` | `true` | Mantiene el grupo de fijadas arriba cuando el contenedor externo tiene scroll. |
| `showTelemetry` | `boolean` | `false` | Agrega estado, alerta y telemetría al menú sin cambiar la fila. |
| `expandedIdsChange` | `EventEmitter<string[]>` | n/a | Obsoleto, ya no emite. |
| `detailClick` | `EventEmitter<FleetUnit>` | n/a | Emite la unidad completa al pulsar el botón de detalle. |
| `selectedIdChange` | `OutputEmitterRef<string \| null>` | n/a | Solicita selección o limpieza; el consumidor actualiza selectedId. |
| `pinnedIdsChange` | `OutputEmitterRef<string[]>` | n/a | Solicita la lista de fijados; el consumidor actualiza pinnedIds. |
| `actionSelect` | `OutputEmitterRef<FleetUnitActionEvent>` | n/a | Emite la unidad y la acción del consumidor elegida en el menú. |
<!-- props:end -->

`FleetUnit` conserva sus campos anteriores y acepta `plate`, `engine`,
`vehicleType`, `gps`, `ignition` y `lastReportAt` para la fila. Sin `plate` usa
`name`; sin `lastReportAt` usa `lastSeen`. GPS y encendido se deducen de `status`
si no se proporcionan. Las acciones propias del producto se pasan por `actions`.

La lista no crea un contenedor con scroll. El panel consumidor decide si muestra
la barra; cuando la oculta, debe comunicar que queda contenido por ver. El
Playground y las historias de Storybook muestran ambas opciones.

Con `showTelemetry`, `status` decide el color y el ícono de la etiqueta del menú:

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
- GPS y encendido tienen nombres accesibles independientes; la estrella anuncia
  la unidad fijada. La telemetría opcional se presenta en `dl`.

<!-- a11y:start FleetUnitList -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/fleet-unit-list/src/fleet-unit-list.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-fleet-unit-list`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `ul`, `button` |
| Roles | `menu` |
| Atributos ARIA | `aria-label="Unidades fijadas"`, `aria-hidden="true"`, `aria-label="Unidades de flota"`, `aria-orientation="vertical"`, `aria-pressed`, `aria-label`, `aria-describedby`, `aria-haspopup`, `aria-expanded` |
| Teclas que maneja el código | `Tab`, `ArrowDown`, `ArrowUp`, `Home`, `End` |
| Foco | Mueve el foco por código (`.focus()`) |
| Compone | `cs-icon`, `cs-popover`, `cs-dropdown-item`, `cs-tag` |
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
