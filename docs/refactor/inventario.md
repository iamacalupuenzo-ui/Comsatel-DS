¿Qué mejora necesita cada componente antes de cerrar su próxima revisión?

## En 30 segundos

La corrección de color incorpora lienzo humo y conserva el crema como opción explícita.
El lote P0 requiere validación de paridad independiente antes de cerrarse.
La versión 0.3.0 sigue local, sin push, tag ni publicación.

## Corrección de rumbo: color (2026-09-26)

`b53a003` agrega `--color-background-canvas`: humo `#f5f5f5` en claro y
superficie sunken (`#0c0e16`) en oscuro. `95a3156` muestra los once pasos
secondary (050–950) y sus diez roles como escala optativa en Color.

La revisión de `235de7b` encontró que ActionCard, InputDropdown, Select y
FleetUnitList ya tenían `surface=default`; el crema estaba detrás de una
opción explícita. El teñido visible venía de las demos P0 y del CSS del panel.
Se retira allí, ActionCard usa superficie blanca y el panel combina lienzo
humo, superficies blancas y secundarios neutros pequeños. Button usa brand
en su variante llamada secondary; Spotlight usa brand e inverse. Ninguno
consume la familia crema, por lo que conserva su contrato.

No se modifican tipografía, radios ni estructura. La demo de InputDropdown
identificada como «superficie cálida» y las stories optativas siguen disponibles.
El siguiente ciclo debe comparar cada componente con FleetOperations y recibir
el veredicto aprobado de Claude independiente; los cierres históricos no bastan.

Tras `npm ci --legacy-peer-deps`, pasaron build, check:docs (incluido
check-component-tokens y 19 pruebas), test:ci (11 pruebas) y build de Storybook.
Persisten advertencias de presupuestos y archivos no usados. En Chromium
aislado se midieron ambas páginas de Color y los seis componentes en claro y
oscuro, sin errores JavaScript: lienzo 245/245/245 y 12/14/22; tarjetas y
campos blancos en claro y 17/24/39 en oscuro. También se probaron selección
y acción de ActionCard, apertura/cierre de Select e InputDropdown, colapso del
panel y ancho de Select a 390 px. Se inspeccionaron capturas de paleta y panel.
Siete stories renderizaron sin errores, con fondos blancos para los controles
neutros y los roles de marca conservados en Button y Spotlight.
Las mediciones están en [la evidencia de navegador](color-verificacion.json).
Esta evidencia verifica color y funcionamiento, no certifica paridad completa.

## Correcciones solicitadas por paridad (2026-09-27)

FleetUnitList: fila plana, selección directa y acciones/telemetría en Popover.
Entradas de expansión obsoletas sin efecto; selección activa por defecto.
Pendiente de revalidación de paridad. Referencia funcional: [Button APG](https://www.w3.org/WAI/ARIA/apg/patterns/button/).
Enter/Espacio, nombre estable y aria-pressed; el Popover recibe y devuelve foco.
El contenido mixto usa dialog y botones con Tab, no un menú ARIA.
Interacción implementada en `75a8c12`; paridad pendiente.
Punto 1: build, check:docs (19 pruebas), test:ci (11) y Storybook pasan.
Chromium aislado sobre build servido en 4301: selección sin acordeón, apertura,
foco en Fijar, Escape y retorno al disparador, fijado y disabled. Storybook
estático en 4302 renderiza tres filas sin acordeón. Dependencias existentes;
no se reinstalaron ni se interrumpió 4300. No equivale a checkout limpio.

Punto 2: alto 64px, radio 6px, título 13px/700, subtítulo 12px; hover neutro
con sombra y selección con borde fino, fondo y barra interior de 3px/radio 5px.
Todos los valores derivan de tokens existentes documentados en la guía, con
colores adaptados a claro/oscuro. Pendiente de revalidación independiente.
Punto 2: build, check:docs (19), test:ci (11) y Storybook pasan. Chromium midió
64px/6px/13px/700/12px, hover 208/213/221 y barra interior 3px/5px en claro;
oscuro conserva geometría con sus roles propios. Sin errores JavaScript.
[Mediciones de ambos temas](paridad-correcciones.json); capturas inspeccionadas
con contenedor de prueba de 320px. Esto no sustituye el veredicto de paridad.

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
| Collapse | Altura completa acotada, scroll y accesibilidad | P0 / pendiente de paridad — `945ca58` | [Navegador y gates](p0-verificacion.md#collapse) |
| InputDropdown | Ancho optativo, truncado y foco tras render visible | P0 / pendiente de paridad — `de5208d`, `eb1d000` | [Navegador y gates](p0-verificacion.md#inputdropdown) |
| FleetUnitList | Tarjeta operativa, fijado/selección y telemetría | P0 / pendiente de paridad — `a46fd48` | [Navegador, contraste y tests](p0-verificacion.md#fleetunitlist) |
| ActionCard | Superficie secundaria y foco/selección independientes | P0 / pendiente de paridad — `0ff6f4b` | [Navegador y tests](p0-verificacion.md#actioncard) |

## Fundamentos, demos y brechas nuevas

| Área | Qué cambia y por qué | Prioridad / estado | Evidencia |
| --- | --- | --- | --- |
| Fundación secundaria | Escala y roles claros/oscuros con contraste | P0 / pendiente de paridad — `3dfb750` | [Contraste](secundario.md#contraste-comprobado) |
| Tokens de selección | Roles existentes, borde de 2 px y foco separado | P0 / pendiente de paridad — `d545545` | [Contrato y contraste](seleccion.md) |
| Panel plegable | Header persistente, chevron, contexto y Escape por capas | P0 / pendiente de paridad — `d6d72a8` | [Patrón, navegador y tests](p0-verificacion.md#panel-plegable) |

## Mantenimiento

La columna Evidencia responde a la instrucción específica del coordinador;
el inventario usa cuatro columnas como excepción al formato general de tres.

Cada componente necesita el veredicto aprobado de Claude independiente para pasar a hecho.
Los hashes históricos prueban implementación, no aprobación visual.
Cada cambio o brecha agrega/actualiza su fila y evidencia. Al iniciar usa
**en curso**; al verificar, **hecho — hash**, anotando el commit en una entrega
documental posterior. No heredes cierres históricos. ColumnManager requiere
reconciliar la decisión previa de arrastre exclusivo de `GAPS.md` con la
solicitud posterior de botones; no se revierte en esta fundación.

**Pregunta de comprobación:** ¿Qué capacidad del mapa del producto incorporarías
primero al catálogo y cómo comprobarías que mejora la interacción?
