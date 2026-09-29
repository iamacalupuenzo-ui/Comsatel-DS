¿Cómo se decide si un patrón de FleetOperations ya está cubierto por el DS?

## En 30 segundos

La comparación se hace por instancia y estado, no por nombre. Una fila «existe» exige misma interacción, API adecuada y geometría comprobada. Toda diferencia queda trazada con archivo, evidencia y decisión antes de construir.

## Objetivo y alcance

Revisar por separado Capturas, carga masiva, Recuperos, Mapa/Explorar, Bitácora, Seguimiento, vista de recupero, Notificaciones y Tablero. Para cada uno, registrar controles, listas, tablas, tarjetas, paneles, pestañas, ventanas, avisos y gráficos. Empezar por el HTML inline de cada `.component.ts`/`.page.ts`, el CSS inline, importaciones, estado de service y los `.stories.ts`/páginas `*-demo` del DS. Revisar `docs/refactor/paridad-p0.md` y `paridad-capturas/` como evidencia histórica, no como veredicto automático.

## Plantilla de comparación

| Campo | Evidencia requerida | Decisión posible |
| --- | --- | --- |
| Identidad | Módulo, nombre, `FO:archivo:línea`, captura/estado | Misma pieza o patrón distinto |
| Contrato | Entradas, salidas, selección, teclado, foco, vacío, error, carga | Existe igual / con diferencias / no existe |
| DS actual | `DS:projects/comsatel-ds/src/lib/...`, exportación en `src/public-api.ts`, story y página real | Conservar / modificar / crear |
| Diseño | Tokens calculados, tamaños, radio, sombra, superficie, contraste, responsive | Paridad / excepción documentada |
| Entrega | API pública, story, demo, pruebas y evidencia visual | Aceptado / pendiente |

«Conservar» significa que el componente de biblioteca cumple el contrato y solo se documenta una composición. «Modificar» exige un cambio compatible y una historia de regresión. «Crear» exige ausencia confirmada en `src/public-api.ts`, no solo ausencia en la pantalla de catálogo. Si un patrón es específico de un flujo (por ejemplo conciliación SAP), conservarlo en el producto y documentar únicamente las primitivas reusables.

## Método verificable

1. Extraer etiquetas `cs-*`, componentes locales `app-*`, controles nativos y clases de cada módulo. Se encontraron usos reales de `cs-table`, `cs-pagination`, `cs-column-manager`, `cs-popover`, `cs-modal`, `cs-tabs`, `cs-tag`, `cs-input`, `cs-select`, `cs-tooltip` y controles propios; por eso una lista de «faltantes» sin lectura del producto sería errónea.
2. Comparar el componente compilable actual del DS (`projects/comsatel-ds/src/lib/`) con la instancia de Fleet, la historia existente y la página `src/app/pages/*-demo/`. Verificar el `public-api.ts`; una demo por sí sola no prueba distribución.
3. Separar apariencia de conducta: tamaño, contenido y token; apertura, selección, cierre, foco y teclado; semántica ARIA; respuesta al ancho estrecho. Registrar diferencias pequeñas como contratos, no como «se parece».
4. Tomar medidas a 1440×900 y ancho móvil en estados normal, hover, foco y seleccionado. Comparar los estados de `paridad-p0.md` que ya se midieron; para ActionCard y selección múltiple, declarar «sin referencia observable» hasta tener datos.
5. Aprobar el componente únicamente si existen fuente, exportación, story, página del sitio, estados pertinentes y evidencia de interacción. La ejecución de este plan se prueba en el DS; esta fase de planificación no ejecuta pruebas ni compilaciones en FleetOperations.

## Dependencias y aceptación

Esta matriz precede a cualquier modificación. Aceptación: cada módulo tiene inventario completo, archivo origen y destino, estatus justificado, evidencia de estados y responsable de los datos de prueba; ninguna fila se marca «igual» porque comparte solo etiqueta o color. Las siguientes partes constituyen el primer inventario y la lista de trabajo. La ejecución deberá poner fecha y hash a cada veredicto.

**Pregunta de comprobación:** ¿Qué evidencia faltaría para llamar «igual» a un selector del mapa que mide lo mismo que `InputDropdown` pero usa otra navegación de teclado?
