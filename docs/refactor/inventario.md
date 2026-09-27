¿Qué mejora necesita cada componente antes de cerrar su próxima revisión?

## En 30 segundos

Los 56 componentes y directivas públicos tienen una fila de revisión pendiente.
Collapse, InputDropdown y las tarjetas encabezan la próxima ronda; mapa y colores también entran.
Solo la fundación de tokens se implementa ahora: cada reconstrucción tendrá su propia evidencia.

## Qué aprendimos del producto

La lectura de `features/fleet-map/fleet-map-canvas.component.ts` muestra un mapa
Leaflet con selección, recentrado, eventos, trazas y flechas de dirección que
se recalculan al mover el mapa. El DS ya usa MapLibre en `live-map-preview.ts`,
con tema claro/oscuro y una unidad de ejemplo: la mejora es llevar capacidades
operativas al catálogo, no asumir que cambiar de motor lo mejora. VehiclePill,
GpsCompact, GpsFull y ClusterBadge son demos locales, no API publicada.

`fleet-map-search.component.ts` separa limpiar de contraer, conserva consulta y
scroll, cierra menús y devuelve foco antes de ocultar el cuerpo. Su header
persistente y chevron acompañan altura completa con CSS; Collapse solo llega a
`auto`. El plan `docs/plan-buscador-unidades-expandible.md` exige transición
interrumpible, movimiento reducido y contexto conservado. Estos hallazgos son
lectura de código, no una validación visual ejecutada en esta tarea.

La jerarquía de `docs/estados-seleccion-buscador.md` distingue fijar (estrella),
seleccionar (check/borde), hover y foco. Las futuras tarjetas deben conservar
esa distinción. Los colores hardcodeados y dimensiones locales no se trasladan
al DS: cada capacidad debe reconstruirse con tokens y API pública propia.

## Revisión completa

P0: buscador; P1: parches compartidos; P2: consistencia general. “Revisar” indica
evaluación pendiente, no un defecto demostrado ni un rediseño ya aprobado.

| Componente | Qué cambia o se revisa y por qué | Prioridad / estado |
| --- | --- | --- |
| Collapse | Altura completa acotada, scroll y accesibilidad | P0 / hecho — `945ca58` |
| InputDropdown | Ancho del trigger configurable y truncado | P0 / pendiente |
| FleetUnitList | Tarjeta operativa, fijado/selección y telemetría | P0 / pendiente |
| ActionCard | Superficie secundaria y foco/selección independientes | P0 / pendiente |
| CardBanner | Contraste y semántica sobre superficie cálida | P1 / pendiente |
| FeatureSpotlightCard | Jerarquía y superficie optativa | P2 / pendiente |
| SpotlightCard | Legibilidad y acciones sobre secundario | P2 / pendiente |
| PreviewCard | Contenido, borde y estado interactivo | P2 / pendiente |
| Button | Estados cálidos optativos y ancho durante carga | P1 / pendiente |
| CFlotasLogo | Contraste de identidad en ambos fondos | P2 / pendiente |
| Icon | Contraste necesario y nombres accesibles | P2 / pendiente |
| Badge | Énfasis cálido del contador de filtros | P1 / pendiente |
| Tag | Filtro activo, eliminación y foco | P1 / pendiente |
| ListItem | Selección, metadatos y superficie | P1 / pendiente |
| ProgressIndicator | Estado actual, error y contraste | P2 / pendiente |
| Stepper | Compatibilidad obsoleta; no ampliar API | P2 / pendiente |
| Avatar | Fondo neutro independiente de telemetría | P2 / pendiente |
| AvatarLabel | Jerarquía legible sobre cálido | P2 / pendiente |
| AvatarGroup | Solapamiento y contraste de límites | P2 / pendiente |
| AvatarAddButton | Acción distinguible, foco y objetivo táctil | P2 / pendiente |
| Banner | Mantener semántica de estado frente al secundario | P2 / pendiente |
| Checkbox | Indicador marcado, foco e indeterminado | P2 / pendiente |
| Toggle | Estado visible sin depender del color | P2 / pendiente |
| Tooltip | Contraste, disparador y foco | P2 / pendiente |
| DropdownItemComponent | Fila seleccionada y señales no cromáticas | P1 / pendiente |
| Dropdown | Superficie y estados de opciones | P1 / pendiente |
| Input | Contraste de texto y estados en panel cálido | P1 / pendiente |
| InputGroup | Buscador, agrupación y geometría simétrica | P1 / pendiente |
| InputGroupAddon | Alineación y contraste de acciones | P1 / pendiente |
| InputGroupInput | Foco y texto dentro del grupo | P1 / pendiente |
| InputGroupText | Texto contextual y espaciado | P1 / pendiente |
| PasswordInput | Visibilidad, foco y nombre accesible | P2 / pendiente |
| Calendar | Superficie única al componerse en popup | P2 / pendiente |
| DateTimePicker | Campo, popup y estados coherentes | P2 / pendiente |
| DateTimeRangePicker | Rango legible y foco diferenciado | P2 / pendiente |
| Modal | Superficie, foco y estabilidad al cargar | P2 / pendiente |
| PressScale | Movimiento reducido e interacción sin color | P2 / pendiente |
| AppLayout | Lienzo cálido y drawer independiente del rail | P2 / pendiente |
| Header | Jerarquía de acciones y navegación móvil | P2 / pendiente |
| Skeleton | Contraste de carga sobre secundario | P2 / pendiente |
| AccordionItem | Consumir estrategia de Collapse sin romper altura natural | P1 / pendiente |
| Accordion | Coordinación, encabezado y estado abierto | P1 / pendiente |
| Radio | Indicador seleccionado y foco | P2 / pendiente |
| RadioGroup | Etiqueta, teclado y validación | P2 / pendiente |
| Tab | Selección distinta de foco/hover | P2 / pendiente |
| Tabs | Paneles y navegación de teclado | P2 / pendiente |
| Pagination | Página actual y controles legibles | P2 / pendiente |
| Toast | Semántica de estado, contraste y acciones | P2 / pendiente |
| Popover | Superficie, separación y cierre contextual | P1 / pendiente |
| Select | Limpieza opcional; reelegir no vacía | P1 / pendiente |
| Spotlight | Jerarquía y contraste del mensaje | P2 / pendiente |
| Menu | Drawer expandido y selección independiente de foco | P2 / pendiente |
| Table | Filtro en encabezado y columnas fijas opacas | P1 / pendiente |
| ColumnManager | Unidad del contador y botones Subir/Bajar | P1 / pendiente |
| TableTree | Aplicar estados y columnas sin romper jerarquía | P1 / pendiente |
| Motion | Tokens, interrupción y movimiento reducido | P2 / pendiente |

## Fundamentos, demos y brechas nuevas

| Área | Qué cambia y por qué | Prioridad / estado |
| --- | --- | --- |
| Fundación secundaria | Escala y roles claros/oscuros con contraste | P0 / hecho — `3dfb750` |
| Sistema de colores completo | Reconciliar marca, neutral, secundario, estados, foco y glass; evitar significados duplicados | P1 / pendiente |
| Tokens de selección | Evaluar superficie dedicada; documentar borde thick y foco separado de 2 px | P0 / pendiente |
| Catálogo de tokens | Reconciliar ALL_TOKENS y paleta con CSS real | P1 / pendiente |
| LiveMapPreview / tema | Evaluar selección, recentrado, rutas y eventos del producto en demo pública | P1 / pendiente |
| VehiclePill | Densidad y selección de unidades del producto | P1 / pendiente |
| GpsCompact / GpsFull | Contraste, señal y metadatos coherentes | P1 / pendiente |
| ClusterBadge | Cantidad, interacción y legibilidad | P1 / pendiente |
| Panel plegable | Header persistente, chevron, contexto y Escape por capas | P0 / pendiente |
| Autocomplete / Combobox (ausente) | Consulta remota, carga/error/vacío y teclado | P1 / pendiente |
| DatePicker (ausente) | Campo de fecha sin hora y límites | P1 / pendiente |
| FileUpload (ausente) | Límites, reemplazo, eliminación y estados | P2 / pendiente |

## Mantenimiento

Cada cambio o brecha agrega/actualiza su fila y evidencia. Al iniciar usa
**en curso**; al verificar, **hecho — hash**, anotando el commit en una entrega
documental posterior. No heredes cierres históricos. ColumnManager requiere
reconciliar la decisión previa de arrastre exclusivo de `GAPS.md` con la
solicitud posterior de botones; no se revierte en esta fundación.

**Pregunta de comprobación:** ¿Qué capacidad del mapa del producto incorporarías
primero al catálogo y cómo comprobarías que mejora la interacción?
