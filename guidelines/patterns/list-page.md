# Patrón: página de listado

**Cuándo usarlo.** Una página cuyo trabajo es encontrar un registro entre muchos:
vehículos, conductores, alertas, geocercas. Aunque el usuario llegue sabiendo cuál busca,
sigue siendo este patrón: la búsqueda es parte de él.

## Esqueleto

```html
<cs-app-layout>
  <cs-header topnav brand="C-Locater Flotas" [user]="currentUser" [notificationCount]="unreadAlerts"></cs-header>
  <cs-menu sidenav [groups]="navGroups" [activeHref]="'/fleet/vehicles'"></cs-menu>

  <header class="page__header">
    <h1>Vehículos</h1>
    <cs-button variant="primary" size="md" (click)="createVehicle()">Agregar vehículo</cs-button>
  </header>

  <section class="page__filters" aria-label="Filtros">
    <cs-input-group>
      <cs-input-group-addon align="inline-start">
        <cs-icon name="search" [size]="14" aria-hidden="true"></cs-icon>
      </cs-input-group-addon>
      <cs-input-group-input
        type="search"
        aria-label="Buscar por placa o conductor"
        [value]="query"
        (valueChange)="onQuery($event)"
      ></cs-input-group-input>
    </cs-input-group>

    <cs-input-dropdown
      label="Estado"
      placeholder="Todos los estados"
      [options]="statusOptions"
      [value]="status"
      (valueChange)="onStatus($event)"
    ></cs-input-dropdown>
  </section>

  <cs-table
    caption="Vehículos de la flota"
    [columns]="columns"
    [rows]="rows"
    [isLoading]="loading"
    [sortKey]="sortKey"
    [sortOrder]="sortOrder"
    (sort)="onSort($event)"
  >
    <div emptyState>
      <p>Ningún vehículo coincide con la búsqueda y el estado elegidos.</p>
      <cs-button variant="default" size="sm" (click)="clearFilters()">Limpiar filtros</cs-button>
    </div>
  </cs-table>

  <cs-pagination [page]="page" [totalPages]="totalPages" (pageChange)="onPage($event)"></cs-pagination>
</cs-app-layout>
```

El orden es fijo: título y acción principal, filtros, tabla, paginación. Así recorre la
página una persona y así la recorre un lector de pantalla.

## Estados

`cs-table` decide qué dibujar con dos datos, `isLoading` y si `rows` está vacío:

| `isLoading` | `rows` | Qué dibuja la tabla |
| :-- | :-- | :-- |
| `true` | vacío | Filas `cs-skeleton` (`skeletonRowCount`, 5 por defecto) |
| `true` | con filas | Las filas actuales, marcadas como recargando |
| `false` | vacío | El contenido del slot `[emptyState]` |
| `false` | con filas | Las filas |

**Carga inicial.** `rows` vacío e `isLoading` en `true`: la tabla dibuja el skeleton. El
encabezado y los filtros siguen activos.

**Recarga (filtro, orden, página).** **No vacíes `rows` antes de pedir los datos nuevos**:
deja las filas anteriores con `isLoading` en `true` y la tabla las mantiene visibles
mientras llegan las nuevas. Vaciarlas produce un parpadeo de skeleton en cada cambio.

**Sin registros.** Si la flota todavía no tiene vehículos, no muestres una tabla vacía:
usa el patrón de [estados vacíos](empty-states.md) con la acción para agregar el primero.

**Sin resultados para el filtro.** Distinto del anterior: la tabla se queda, el slot
`[emptyState]` dice qué filtro deja la lista vacía y ofrece limpiarlo. Nunca le pidas
"agrega tu primer vehículo" a quien tiene cuatrocientos.

**Error de carga.** Muestra un `cs-banner variant="danger"` sobre la tabla con una acción
para reintentar, y conserva los filtros.

**Sin permiso.** Muestra la página y la razón. Llevar al usuario a otra pantalla sin
explicarle es un reporte de bug, no una respuesta.

## Trampas

- **Un error de carga no es una lista vacía.** Si la petición falla y dejas `rows` vacío
  con `isLoading` en `false`, la tabla muestra el slot `[emptyState]`: le dice al usuario
  que no hay vehículos cuando en realidad no se pudieron cargar. Maneja el error con su
  propio estado y no renderices el mensaje de vacío en ese caso.
- `cs-table` no ordena: `(sort)` solo emite la columna. Ordena los datos y actualiza
  `sortKey` y `sortOrder` tú.
- Filtros, orden y página viven en la URL (query params): dos personas que comparten el
  enlace tienen que ver la misma lista.
- `cs-pagination` es base 1 y recibe cantidad de páginas, no de registros.
- La fila de la tabla no es clickeable ni enfocable. La acción por fila va en una celda
  de template con un `cs-button` o un enlace real.
- Un filtro de un valor es `cs-input-dropdown`. `cs-dropdown` es un menú de acciones.

## Accesibilidad (a11y) y teclado

- `caption` nombra la tabla aunque haya un `<h1>` cerca: el lector de pantalla lo anuncia
  al entrar a la tabla.
- La tabla ya marca `aria-busy` y anuncia el cambio de estado en su región `aria-live`;
  la paginación anuncia la página nueva. No agregues otra región que repita lo mismo.
- Al filtrar, el foco se queda en el filtro. No lo muevas a la tabla.
- El buscador no tiene etiqueta visible, así que lleva `aria-label`; el grupo de filtros
  lleva nombre con `aria-label` en su `<section>`.
- Tab recorre: acción principal, filtros, encabezados ordenables, controles dentro de las
  celdas, paginación.
