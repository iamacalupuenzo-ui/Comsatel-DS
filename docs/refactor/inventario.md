¿Qué mejora necesita cada componente antes de cerrar su próxima revisión?

## En 30 segundos

El lote P0 está cerrado: Collapse, InputDropdown, FleetUnitList, ActionCard, selección y panel.
Cada cierre enlaza su evidencia; los componentes P1/P2 conservan su revisión pendiente.
La versión 0.3.0 sigue local: integrar el producto requiere una publicación autorizada.

## Qué aprendimos del producto

La lectura de `features/fleet-map/fleet-map-canvas.component.ts` muestra un mapa
Leaflet con selección, recentrado, eventos, trazas y flechas de dirección que
se recalculan al mover el mapa. El DS ya usa MapLibre en `live-map-preview.ts`,
con tema claro/oscuro y una unidad de ejemplo: la mejora es llevar capacidades
operativas al catálogo, no asumir que cambiar de motor lo mejora. VehiclePill,
GpsCompact, GpsFull y ClusterBadge son demos locales, no API publicada.

`fleet-map-search.component.ts` separa limpiar de contraer, conserva consulta y
scroll, cierra menús y devuelve foco antes de ocultar el cuerpo. Su header
persistente y chevron acompañan altura completa con CSS; Collapse antes solo llegaba a
`auto`. El plan `docs/plan-buscador-unidades-expandible.md` exige transición
interrumpible, movimiento reducido y contexto conservado. Estos hallazgos son
lectura de código, no una validación visual ejecutada en esta tarea.

La jerarquía de `docs/estados-seleccion-buscador.md` distingue fijar (estrella),
seleccionar (check/borde), hover y foco. Las tarjetas P0 ya conservan
esa distinción. Los colores hardcodeados y dimensiones locales no se trasladan
al DS: cada capacidad debe reconstruirse con tokens y API pública propia.

## Lote P0 y siguiente ronda

Las demás filas de los 56 componentes públicos y las brechas P1/P2 continúan
en [el anexo de revisiones pendientes](inventario-backlog.md), con la misma
columna de evidencia y regla de mantenimiento.

P0: buscador; P1: parches compartidos; P2: consistencia general. “Revisar” indica
evaluación pendiente, no un defecto demostrado ni un rediseño ya aprobado.

| Componente | Qué cambia o se revisa y por qué | Prioridad / estado | Evidencia |
| --- | --- | --- | --- |
| Collapse | Altura completa acotada, scroll y accesibilidad | P0 / hecho — `945ca58` | [Navegador y gates](p0-verificacion.md#collapse) |
| InputDropdown | Ancho optativo, truncado y foco tras render visible | P0 / hecho — `de5208d`, `eb1d000` | [Navegador y gates](p0-verificacion.md#inputdropdown) |
| FleetUnitList | Tarjeta operativa, fijado/selección y telemetría | P0 / hecho — `a46fd48` | [Navegador, contraste y tests](p0-verificacion.md#fleetunitlist) |
| ActionCard | Superficie secundaria y foco/selección independientes | P0 / hecho — `0ff6f4b` | [Navegador y tests](p0-verificacion.md#actioncard) |

## Fundamentos, demos y brechas nuevas

| Área | Qué cambia y por qué | Prioridad / estado | Evidencia |
| --- | --- | --- | --- |
| Fundación secundaria | Escala y roles claros/oscuros con contraste | P0 / hecho — `3dfb750` | [Contraste](secundario.md#contraste-comprobado) |
| Tokens de selección | Roles existentes, borde de 2 px y foco separado | P0 / hecho — `d545545` | [Contrato y contraste](seleccion.md) |
| Panel plegable | Header persistente, chevron, contexto y Escape por capas | P0 / hecho — `d6d72a8` | [Patrón, navegador y tests](p0-verificacion.md#panel-plegable) |

## Mantenimiento

La columna Evidencia responde a la instrucción específica del coordinador;
el inventario usa cuatro columnas como excepción al formato general de tres.

Cada cambio o brecha agrega/actualiza su fila y evidencia. Al iniciar usa
**en curso**; al verificar, **hecho — hash**, anotando el commit en una entrega
documental posterior. No heredes cierres históricos. ColumnManager requiere
reconciliar la decisión previa de arrastre exclusivo de `GAPS.md` con la
solicitud posterior de botones; no se revierte en esta fundación.

**Pregunta de comprobación:** ¿Qué capacidad del mapa del producto incorporarías
primero al catálogo y cómo comprobarías que mejora la interacción?
