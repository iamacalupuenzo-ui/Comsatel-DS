¿Cuáles de los cuatro componentes P0 puede cerrar el constructor y cuáles hay que reabrir?

## En 30 segundos

De cinco piezas evaluadas, 1 aprobó (tokens de superficie), 2 se rechazan con evidencia medida (FleetUnitList, y el patrón "panel plegable" por fusión de filtros), y 2 quedan sin veredicto por falta de instancia comparable (ActionCard, Select en modo múltiple).
El hallazgo más grave: FleetUnitList sigue siendo un acordeón que expande cada unidad, no la fila plana con menú de FleetOperations, y su radio de 8 px y tipografía de 12 px/500 repiten el defecto que Enzo ya había corregido una vez.
InputDropdown en sí mide bien (28/12 y 32/13 coinciden con el filtro del mapa y el de tabla), pero el patrón de panel lo descartó: en vez de los dos filtros del mapa, muestra un solo botón "Filtros" con popover.

## Cómo medí

Con Playwright en Chromium aislado (el navegador de otro proyecto del equipo, `n8n-mcp/node_modules/playwright`, apuntando a los binarios ya descargados en `%LOCALAPPDATA%\ms-playwright`; no instalé nada en este worktree). Inicié sesión en FleetOperations (`operador@demo.com`) en 1440×900, navegué a `/mapa`, `/capturas` y `/recuperos`, y usé `getComputedStyle`/`getBoundingClientRect` sobre los elementos reales. Del lado del DS abrí la app de documentación en `localhost:4300` y levanté Storybook en el puerto 6100 solo para confirmarlo disponible (no lo necesité: el patrón "panel plegable con contexto" ya vive como demo en vivo en `/animations/motion`, junto a `FleetUnitList`). Las capturas comparativas están en `docs/refactor/paridad-capturas/`.

## Panel plegable (buscador del mapa) — RECHAZADO por fusión de patrones

El encabezado sí calza: `app-fleet-map-search .monitor__search` mide 48 px de alto, padding `0px 12px`, gap `8px` — exactamente lo que describe la instrucción. El token de superficie también calza: el panel de FleetOperations tiene fondo `rgb(245,245,245)` (`#f5f5f5`, lienzo humo) y las tarjetas interiores son blancas con borde `#eaecf0`; el DS reproduce lo mismo en su demo.

El problema es lo que el DS reemplazó. FleetOperations muestra siempre dos filtros visibles bajo el buscador: "Todos los estados" y "Todas las financieras" (`.filter-control`, 144×28 px, texto 12 px). El demo del DS en `/animations/motion` los sustituyó por un único botón `cs-button--secondary cs-button--sm` con la etiqueta "Filtros" que abre un `cs-popover` (`aria-haspopup="dialog"`). Es exactamente la fusión que la instrucción pide detectar y reportar: dos filtros permanentes se convirtieron en un filtro oculto detrás de un botón.

| Propiedad | FleetOperations | DS (patrón panel plegable) | Corrección |
| --- | --- | --- | --- |
| Filtros visibles bajo el buscador | 2 (`Todos los estados`, `Todas las financieras`), siempre expandidos | 1 botón "Filtros" que abre popover | Reproducir los dos `InputDropdown` visibles, no colapsarlos en un botón |
| Tamaño de esos filtros | 144×28 px, texto 12 px (variante `sm` de InputDropdown) | No aplica — no son InputDropdown, son un cs-button | Usar `InputDropdown` con `size="sm"`, que ya mide igual (ver sección siguiente) |

La mecánica de Collapse en sí (altura completa, `inert`, Escape en dos pasos, foco) no la puedo objetar con lo medido — el propio constructor ya la probó exhaustivamente en `p0-verificacion.md` y mi muestreo de tiempos no fue lo bastante fino como para desmentir el token `--motion-duration-medium` (200 ms). Eso queda **NO EVALUABLE con la precisión que usé**, no aprobado ni rechazado.

## FleetUnitList — RECHAZADO

FleetOperations (`.vehicle-card`, dentro del buscador del mapa): fila plana de 292×64 px, sin expandirse nunca. Título en `<strong>` a 700/13px, color `rgb(52,64,84)`; código en `<span>` a 400/12px, color `rgb(102,112,133)`; borde `1px solid rgb(234,236,240)`; radio `6px`; fondo blanco; sin sombra en reposo. Al pasar el mouse, el borde cambia a `rgb(208,213,221)` (gris neutro) y aparece una sombra leve. Al seleccionar, `.vehicle-card.is-selected` agrega una barra `::before` de 3 px en `rgb(21,53,101)`, borde `1px solid rgb(21,53,101)` y fondo `rgb(240,246,255)` — exactamente el contrato que describe la instrucción (barra + borde + fondo). Fijar y las demás acciones viven en un menú de tres puntos (`cs-popover`), no en botones inline.

`cs-fleet-unit-list` en el DS (`/animations/motion`) es un `cs-accordion` con un `cs-accordion-item` por unidad: cada fila tiene un chevron y, al expandir, abre un cuerpo con velocidad/batería/ubicación y botones "Seleccionar"/"Fijar" en línea. Es una interacción distinta a la de FleetOperations (clic = seleccionar vs. clic = expandir/contraer detalle).

| Propiedad | FleetOperations (`.vehicle-card`) | DS (`cs-fleet-unit-list` / `cs-accordion-item`) | Token correcto |
| --- | --- | --- | --- |
| Interacción al hacer clic en la fila | Selecciona la unidad (fila no cambia de alto) | Expande/contrae un acordeón con detalle y botones | Rediseñar como fila plana con selección directa; mover detalle/acciones a un menú, como en Fleet |
| Alto de la fila cerrada | 64 px | 58–60 px | Ajustar a 64 px o documentar la diferencia como decisión explícita |
| Radio de esquina | 6 px (`rgb(234,236,240)` de borde) | 8 px | `--radius-md` (6px), no `--radius-lg` (8px) — es la misma regresión que ya señaló Enzo el 2026-09-26 |
| Título: peso/tamaño | 700 / 13px, color `rgb(52,64,84)` | 500 / 12px, color `rgb(29,41,57)` | Usar el par tipográfico `--font-weight-bold` (700) y el tamaño de 13px que usa Fleet, no 500/12px |
| Subtítulo (código/fecha) | 400 / 12px, color `rgb(102,112,133)` | 11px, color `rgb(102,112,133)` | Igualar el tamaño a 12px |
| Borde en hover | `rgb(208,213,221)` (gris neutro, mismo tono que el borde de InputDropdown en hover) | `rgb(29,66,122)` (azul oscuro, más cercano a un foco que a un hover) | Usar el token de borde neutro-hover, no el de foco/selección |
| Icono de "fijar" | Estrella visible en el avatar cuando está fijada, sin abrir nada | Botón de texto "Fijar" dentro del cuerpo expandido | Mostrar el indicador de fijado en la fila cerrada, no solo tras expandir |

Esto repite, en tipografía y radio, exactamente el defecto que la corrección de Enzo del 2026-09-26 ya había nombrado ("títulos de tarjeta a 12 px/500 en lugar de 14 px/700 [sic, medí 13px/700 en Fleet, no 14px] ... radio de 8 px en lugar de 6 px"). No se corrigió; solo se resolvió el color de fondo.

## InputDropdown (aislado, en `/components/dropdown`) — APROBADO en tokens de tamaño

Medido en la sección "Tamaños": `xs` = 24px/11px, `sm` = 28px/12px, `md` = 32px/13px, `lg` = 40px/14px. Contra Fleet:

- Filtro del mapa (`.filter-control`, buscador plegable): 144×28 px, padding `1px 6px`, texto 12px. Coincide con `InputDropdown size="sm"` (28px/12px).
- Filtro de tabla en Capturas (`.more-filters-trigger`, "Estado"): 32 px de alto, padding `1px 10px`, texto `13px/19.5px`. Coincide exactamente con `InputDropdown` por defecto (`size="md"` → 32px/13px).

Los dos tamaños del componente sí reproducen los dos patrones reales de Fleet. El problema no está en el token, está en que el patrón "panel plegable" del DS no usa `InputDropdown` en absoluto para sus filtros (ver sección anterior): los sustituyó por un botón con popover. Truncado con elipsis, `matchTriggerWidth` y el resto del contrato quedan tal como los verificó el constructor; no encontré evidencia que lo contradiga.

La superficie "cálida" (`surface="secondary"`, fondo `rgb(252,250,244)`) aparece marcada explícitamente como optativa en la página, tal como exige la decisión de Enzo del 2026-09-26; ningún filtro de Fleet la usa por defecto, y el demo tampoco la fuerza como predeterminada.

## ActionCard — NO EVALUABLE

No encontré una instancia renderizada de `app-fleet-notification-card` para medir: el panel de notificaciones del mapa muestra "Sin notificaciones" en la sesión de demo (sin datos semilla que la pueblen), y el patrón "panel plegable" del DS no compone `ActionCard` en ningún punto de su árbol. Lo único que pude confirmar es el token de superficie: el demo de `/components/card` usa fondo blanco en todas sus variantes, sin rastro del crema retirado por `235de7b`, consistente con la corrección de color. Falta: una captura de FleetOperations con al menos una notificación real (o datos de prueba que la generen) para medir tipografía, borde y estados de la tarjeta y recién entonces emitir veredicto.

## Select — parcialmente NO EVALUABLE

Recorrí los filtros de Capturas (`Estado`, y en "Más filtros": `Contrato`, `GPS`, `Ubicación`, `Documentos`) y de Recuperos (`Estado`, `Seguro`, `Modalidad`, `Fecha de registro`): los seis son de selección única, con la misma geometría que ya valida `InputDropdown` (32px/13px). Ninguno usa chips ni selección múltiple — no hay un Select multi-valor real en las pantallas indicadas para contrastar contra el modo "Operaciones" (con chips) que muestra el DS en `/components/select`. Ese modo queda **NO EVALUABLE** por falta de referencia en el producto, no por defecto del componente. El truncado de texto largo en el modo simple del DS (elipsis dentro del trigger, ancho del contenedor respetado) se ve correcto en la captura y es consistente con lo medido en InputDropdown.

## Tokens de superficie y color — APROBADO

Verificado en el navegador contra la decisión de Enzo del 2026-09-26: el panel del mapa en FleetOperations tiene fondo `rgb(245,245,245)` (`#f5f5f5`) y las tarjetas/controles sobre él son blancos con borde `#eaecf0`; el mismo patrón aparece en el demo del DS. Ningún componente medido (FleetUnitList, InputDropdown, ActionCard, panel) se tiñó de crema por defecto; la única superficie cálida encontrada (`surface="secondary"` en InputDropdown) está marcada como opción explícita en la documentación, tal como exige la corrección de color.

## Lista priorizada de correcciones para el constructor

1. **FleetUnitList: cambiar el modelo de interacción.** Dejar de usar `cs-accordion` por unidad. La fila debe seleccionar al hacer clic (como `.vehicle-card__main` en Fleet) y mostrar detalle/acciones en un menú o popover aparte, no expandiendo la fila.
2. **FleetUnitList: corregir radio y tipografía otra vez.** Radio a 6px (no 8px); título a 700/13px color `rgb(52,64,84)` (no 500/12px); subtítulo a 12px (no 11px). Es la segunda vez que se reporta.
3. **FleetUnitList: borde en hover.** Cambiar de `rgb(29,66,122)` (color de foco) a un gris neutro tipo `rgb(208,213,221)`, igual que usa `.vehicle-card:hover` en Fleet y el propio InputDropdown.
4. **Patrón "panel plegable": restituir los dos filtros del mapa.** Reemplazar el botón único "Filtros" + popover por dos `InputDropdown size="sm"` visibles (estado y financiera/entidad), como en `.filter-control` de Fleet. Documentar si de verdad se decidió fusionar los filtros en un popover; si es así, es un cambio de producto que necesita autorización explícita, no una libertad del constructor.
5. **ActionCard: conseguir una instancia real de notificación** (dato semilla en FleetOperations o capturas ya existentes) antes de reclamar paridad. Sin eso, el componente no puede pasar de "en curso" a "hecho".
6. **Select en modo múltiple: mismo problema.** No hay un caso de uso real en Capturas/Recuperos con chips; si el DS lo mantiene como capacidad "adelantada" al producto, decirlo explícitamente en el inventario en vez de marcarlo evaluado contra una referencia que no existe.

**Pregunta de comprobación:** ¿por qué la corrección de tipografía y radio de FleetUnitList que ya se había reportado en `promocion-desde-producto.md` no se aplicó en este lote, aunque el color sí se corrigió?

## Re-validación

Re-medí únicamente los dos rechazos de este reporte (FleetUnitList y el patrón "panel plegable") después de los commits `75a8c12`, `7b3ca1c` y `af642b9`. Método idéntico al del reporte original: Chromium aislado vía Playwright (`n8n-mcp/node_modules/playwright`, binarios en `%LOCALAPPDATA%\ms-playwright`), sesión iniciada en FleetOperations (`operador@demo.com`) en 1440×900, navegación a `/mapa`, y `getComputedStyle`/`getBoundingClientRect` sobre los elementos reales. Una precisión operativa: la app del DS en `localhost:4300` no tenía ningún proceso escuchando (el servidor del constructor se había cerrado al terminar su tarea); se lo consulté al coordinador y, con su autorización explícita, la levanté con `ng serve comsatel-ds-angular --port 4300` sin tocar dependencias ni reinstalar nada, y la dejé corriendo al terminar.

### FleetUnitList — APROBADO

El componente dejó de ser un `cs-accordion`. Ahora es una lista plana (`cs-fleet-unit-list__item`, 16 filas medidas, sin expandirse al hacer clic) con selección directa por botón y acciones separadas en un popover de tres puntos — exactamente el modelo de interacción de `.vehicle-card` en FleetOperations.

| Propiedad | FleetOperations (`.vehicle-card`) | DS (`cs-fleet-unit-list__item`) | Veredicto |
| --- | --- | --- | --- |
| Interacción al hacer clic | Selecciona la unidad, la fila no cambia de alto | Selecciona la unidad (`aria-pressed`), fila no cambia de alto | Coincide |
| Alto de la fila | 64px | 64px | Coincide |
| Radio de esquina | 6px | 6px | Coincide |
| Título: peso/tamaño/color | 700 / 13px / `rgb(52,64,84)` | 700 / 13px / `rgb(52,64,84)` | Coincide |
| Subtítulo (código/fecha) | 400 / 12px / `rgb(102,112,133)` | 400 / 12px / `rgb(102,112,133)` | Coincide |
| Borde en reposo | `1px solid rgb(234,236,240)` | `1px solid rgb(234,236,240)` | Coincide |
| Fondo en reposo | Blanco (`rgb(255,255,255)`) | Blanco (`rgb(255,255,255)`) | Coincide |
| Borde + sombra en hover | `1px solid rgb(208,213,221)` + sombra leve | `1px solid rgb(208,213,221)` + sombra leve (idéntica) | Coincide |
| Borde seleccionada | `1px solid rgb(21,53,101)` | `1px solid rgb(21,53,101)` | Coincide |
| Fondo seleccionada | `rgb(240,246,255)` | `rgb(240,246,255)` | Coincide |
| Barra de selección (`::before`) | 3px de ancho, `top:0`, `left:0`, radio `5px` (redondeado solo del lado interior), color `rgb(21,53,101)` | 3px de ancho, `top:0`, `left:0`, radio `5px 0px 0px 5px`, color `rgb(21,53,101)` | Coincide |

Las tres correcciones que este reporte había pedido (radio 8px→6px, tipografía 500/12px→700/13px, borde de hover azul→gris neutro) están aplicadas y medidas en vivo, no solo en el JSON de mediciones propias del constructor. No detecté ninguna otra regresión sobre las propiedades listadas en la instrucción de esta re-validación. (Fuera de alcance de esta pasada: no encontré una unidad marcada como "fijada" en la sesión de demo para re-verificar el indicador de estrella que señalaba el punto 7 del reporte original; sigue pendiente esa verificación puntual, no bloquea este veredicto porque no forma parte de las propiedades que pidió re-medir esta ronda.)

### Panel plegable (filtros del mapa) — APROBADO

El demo del DS en `/animations/motion` ya no colapsa los filtros en un botón único con popover: muestra los dos `cs-input-dropdown` visibles bajo el buscador, cada uno con `size="sm"`.

| Propiedad | FleetOperations (`.filter-control`) | DS (`cs-input-dropdown size="sm"`) | Veredicto |
| --- | --- | --- | --- |
| Filtros visibles bajo el buscador | 2 ("Todos los estados", "Todas las financieras"), siempre expandidos | 2 (mismas etiquetas), siempre expandidos | Coincide |
| Tamaño de cada filtro | 144×28px | 144×28px | Coincide |
| Tamaño de texto | 12px | 12px (`--font-size-content-note` resuelto) | Coincide |

No quedan botones de "Filtros" con popover reemplazando el patrón; los dos controles son instancias reales de `InputDropdown`, tal como pedía la corrección 4 de este reporte.

### Veredicto consolidado

Los dos rechazos de la primera medición (FleetUnitList y el patrón panel plegable) pasan a **APROBADO** con evidencia medida en vivo contra FleetOperations, no contra el JSON de autoevaluación del constructor. Los puntos de ActionCard y Select en modo múltiple siguen **NO EVALUABLES** por falta de instancia comparable — esta ronda no los tocó porque la instrucción pidió re-medir solo FleetUnitList y el panel plegable.

**Pregunta de comprobación:** si en una futura sesión de demo aparece una unidad de FleetOperations marcada como "fijada", ¿qué comportamiento visual debería reproducir el DS en la fila cerrada (sin expandir nada) para no repetir el patrón ya corregido de esconder ese estado detrás de una interacción extra?
