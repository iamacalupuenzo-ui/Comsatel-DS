# FleetUnitList

Organismo para leer y actuar rápido sobre varias unidades de flota. Cada unidad muestra
nombre, última señal y estado; al expandirla aparecen alerta, velocidad, batería,
ubicación, diagnóstico y el botón de detalle. Compone `cs-accordion`, `cs-accordion-item`,
`cs-badge`, `cs-button` y `cs-icon`.

- **Import:** `import { FleetUnitList, type FleetUnit } from 'comsatel-ds';`
- **Selector:** `<cs-fleet-unit-list>`
- **Clase raíz emitida:** `.cs-fleet-unit-list` (sobre el `cs-accordion` interno)

```html
<cs-fleet-unit-list
  [units]="units"
  [defaultExpandedIds]="['norte-04']"
  detailLabel="Ver detalle"
  (detailClick)="openUnit($event)"
></cs-fleet-unit-list>
```

```ts
import { FleetUnitList, type FleetUnit } from 'comsatel-ds';

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
| `type` | `'single' \| 'multiple'` | `'single'` | Una unidad abierta a la vez, o varias. Se reenvía a `cs-accordion`. |
| `defaultExpandedIds` | `string[]` | `[]` | Unidades abiertas al inicio (modo no controlado). |
| `expandedIds` | `string[] \| undefined` | `undefined` | Unidades abiertas (modo controlado). |
| `detailLabel` | `string` | `'Ver detalle'` | Texto visible del botón de acción. Su nombre accesible le agrega el nombre de la unidad. |
| `expandedIdsChange` | `EventEmitter<string[]>` | n/a | Emite las unidades abiertas al cambiar. |
| `detailClick` | `EventEmitter<FleetUnit>` | n/a | Emite la unidad completa al pulsar el botón de detalle. |
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

- Cada unidad es un `cs-accordion-item`: el encabezado es un `<button>` con
  `aria-expanded` y `aria-controls`, y su nombre accesible es el texto del encabezado
  (nombre, última señal y estado). Los íconos son `aria-hidden`.
- **Flechas arriba y abajo** recorren las unidades, **Home** va a la primera y **End** a
  la última, por el comportamiento de `cs-accordion`.
- El panel cerrado queda con `aria-hidden` e `inert`: la telemetría y el botón de detalle
  no se leen ni reciben foco hasta expandir la unidad.
- El estado se comunica con texto (`statusLabel`), no solo con el color del badge.
- La telemetría es una lista de definiciones (`<dl>`), así que se lee como pares
  "Velocidad, 62 km/h".
- Cada botón de detalle se nombra con `detailLabel` más el nombre de la unidad ("Ver
  detalle, Camión Norte 04"): el texto visible queda al inicio del nombre accesible y un
  lector de pantalla distingue un botón de otro.
- La alerta de una unidad es texto estático: si aparece mientras el usuario mira la
  lista, no se anuncia.

<!-- a11y:start FleetUnitList -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/fleet-unit-list/fleet-unit-list.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-fleet-unit-list`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Atributos ARIA | `aria-hidden="true"`, `aria-label` |
| Compone | `cs-accordion`, `cs-accordion-item`, `cs-icon`, `cs-badge`, `cs-button` |
<!-- a11y:end -->

## Trampas

- **No rearmes esta composición a mano** con `cs-accordion`, `cs-badge` y `cs-icon`: para
  una lista de unidades de flota ya existe este organismo.
- `statusLabel` no se deduce de `status`: pasa un texto coherente con el estado. El mapeo
  de `status` a color e ícono es fijo y no se configura.
- Los valores llegan como texto ya formateado: las unidades (km/h, %) y las fechas
  relativas las formateas tú antes.
- Para un valor que falta, usa un texto como "Sin dato", no una raya: los lectores de
  pantalla la leen de forma inconsistente o la omiten. La propia story del componente usa
  una raya para la velocidad de una unidad sin señal.
- `expandedIds` (controlado) y `defaultExpandedIds` (no controlado) son excluyentes, igual
  que en `cs-accordion`.
- `detailClick` solo emite la unidad: navegar al detalle es responsabilidad de quien lo
  usa.
- La telemetría se ordena en 4 columnas y baja a 2 por debajo de 767px de ancho.
