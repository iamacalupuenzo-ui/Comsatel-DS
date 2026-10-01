¿Qué queda después de cerrar el lote P0?

## En 30 segundos

P1 atiende brechas compartidas; P2 revisa consistencia general.
Estas filas siguen pendientes: no heredan el cierre del lote P0.
La evidencia nueva se registra aquí antes de priorizar el siguiente componente.

Las filas P2 siguen en [consistencia general](inventario-consistencia.md).

## Próximas revisiones P1

Este anexo continúa el [inventario vivo](inventario.md). Conserva las filas de
los componentes públicos que no pertenecen al lote P0; no autoriza rediseños
por sí solo. Usa el mismo ciclo pendiente, en curso y hecho con hash.

| Componente o área | Qué cambia y por qué | Prioridad / estado | Evidencia |
| --- | --- | --- | --- |
| CardBanner | Contraste y semántica sobre superficie cálida | P1 / pendiente | Evaluación individual pendiente |
| Button | Estados cálidos optativos y ancho durante carga | P1 / pendiente | Evaluación individual pendiente |
| Badge | Énfasis cálido del contador de filtros | P1 / pendiente | Evaluación individual pendiente |
| Tag | Filtro activo, eliminación y foco | P1 / pendiente | Evaluación individual pendiente |
| ListItem | Conservar como fila genérica: selección, metadatos y superficie | P1 / en curso | API pública vigente; refactor de layout opcional, foco y selección en `list-item/`. Librería y catálogo compilan; pruebas del usuario pendientes. |
| DropdownItemComponent | Fila seleccionada y señales no cromáticas | P1 / pendiente | Evaluación individual pendiente |
| Dropdown | Superficie y estados de opciones | P1 / pendiente | Evaluación individual pendiente |
| Input | Contraste de texto y estados en panel cálido | P1 / pendiente | Evaluación individual pendiente |
| InputGroup | Buscador, agrupación y geometría simétrica | P1 / pendiente | Evaluación individual pendiente |
| InputGroupAddon | Alineación y contraste de acciones | P1 / pendiente | Evaluación individual pendiente |
| InputGroupInput | Foco y texto dentro del grupo | P1 / pendiente | Evaluación individual pendiente |
| InputGroupText | Texto contextual y espaciado | P1 / pendiente | Evaluación individual pendiente |
| AccordionItem | Consumir estrategia de Collapse sin romper altura natural | P1 / pendiente | Evaluación individual pendiente |
| Accordion | Coordinación, encabezado y estado abierto | P1 / pendiente | Evaluación individual pendiente |
| Popover | Superficie, separación y cierre contextual | P1 / pendiente | Evaluación individual pendiente |
| Select | Limpieza opcional; reelegir no vacía; secundario y etiquetas largas | P1 / pendiente | Simple/múltiple probado; [alcance P0](p0-verificacion.md#inputdropdown) |
| Table | Filtro en encabezado y columnas fijas opacas | P1 / pendiente | Evaluación individual pendiente |
| ColumnManager | Unidad del contador y botones Subir/Bajar | P1 / pendiente | Evaluación individual pendiente |
| TableTree | Aplicar estados y columnas sin romper jerarquía | P1 / pendiente | Evaluación individual pendiente |

## Fundamentos y brechas

| Componente o área | Qué cambia y por qué | Prioridad / estado | Evidencia |
| --- | --- | --- | --- |
| Sistema de colores completo | Reconciliar marca, neutral, secundario, estados, foco y glass; evitar significados duplicados | P1 / pendiente | Evaluación individual pendiente |
| Catálogo de tokens | Reconciliar ALL_TOKENS y paleta con CSS real | P1 / pendiente | Evaluación individual pendiente |
| LiveMapPreview / tema | Evaluar selección, recentrado, rutas y eventos del producto en demo pública | P1 / pendiente | Evaluación individual pendiente |
| VehiclePill | Densidad y selección de unidades del producto | P1 / pendiente | Evaluación individual pendiente |
| GpsCompact / GpsFull | Contraste, señal y metadatos coherentes | P1 / pendiente | Evaluación individual pendiente |
| ClusterBadge | Cantidad, interacción y legibilidad | P1 / pendiente | Evaluación individual pendiente |
| Autocomplete / Combobox (ausente) | Consulta remota, carga/error/vacío y teclado | P1 / pendiente | Evaluación individual pendiente |
| DatePicker (ausente) | Campo de fecha sin hora y límites | P1 / pendiente | Evaluación individual pendiente |

**Comprobación:** ¿qué evidencia necesitas antes de pasar una fila a hecho?
