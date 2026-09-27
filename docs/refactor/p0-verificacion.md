¿Qué se comprobó en el navegador antes de cerrar cada P0?

## En 30 segundos

Cada fila cerrada combina interacción real, revisión del DOM y gates técnicos.
Las API nuevas son optativas y preservan los contratos anteriores.
La versión 0.3.0 sigue local: no se publica en este lote.

## Collapse

Referencia funcional: [Disclosure de WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/).
El botón de la composición conserva Enter/Espacio, `aria-expanded` y
`aria-controls`; la directiva controla altura, `inert` y `aria-hidden`.

En `/animations/motion`, Chromium independiente, viewport 1280×900 y 390×844:
modo full de 240 px frente a auto de contenido; 20 filas con scroll interno;
cierre a cero e inert; nueve inversiones rápidas; padre redimensionado a 320 px;
modo reducido; temas claro y oscuro. Sin errores de página. Capturas revisadas
en `tmp/qa/collapse-light.png` y `collapse-dark.png`.

Gates: build de librería/aplicación, `check:docs`, `test:ci` y Storybook.
C1/C4/C9/C10: tokens de duración, cancelación, porcentaje adaptable y scroll;
C2/C3/C5–C8/C11/C13 no alteran contenido ni API tipográfica: la directiva carece
de visuales propios. C12: demo usa texto/secundario con contraste certificado.
La copia explicativa global del catálogo conserva contraste oscuro débil,
registrado para la revisión completa de colores, fuera del cuerpo de Collapse.

## InputDropdown

Referencia funcional: [Select oficial](https://primeng.dev/select), ejemplos de
tamaños, disabled/invalid y teclado/listbox. Filtrado remoto y multiselección
no corresponden al contrato de este selector simple: se mantienen fuera.
El coordinador confirmó conservar false en matchTriggerWidth.

En `/components/dropdown`: ancho de menú/trigger igual con tolerancia menor a
1 px, elipsis real (`scrollWidth > clientWidth`), ArrowDown/Home/End, selección
con Enter, omisión de opción disabled, Escape y retorno de foco; readonly no
abre por teclado. Temas claro/oscuro, 1280×900 y 390×844 sin salir del viewport.
Capturas `tmp/qa/dropdown-light.png` y `dropdown-dark.png`; consola sin errores.
Gates completos aprobados; C1–C4: tokens, tamaños existentes e inline limitando
el ancho; C5–C11: composición Popover, nombre del listbox y foco real; C12:
roles secundarios/selección; C13: texto y line-height conservan sus parejas.

## FleetUnitList

Comparación: [Accordion oficial](https://primeng.dev/accordion) y tarjetas del
buscador en FleetOperations. Expansión single/multiple, región etiquetada,
flechas/Home/End y disabled provienen del Accordion existente; selección y
fijado son estados controlados propios, independientes. No es un listbox ni
un formulario remoto: carga asíncrona y filtrado pertenecen al consumidor.

Navegador en `/components/accordion`: seleccionar sin fijar; fijar otra unidad
reordena conservando foco y selección; seleccionar una fijada conserva estrella
y check; unidad disabled no abre. Escritorio y móvil sin desborde, ambos temas.
Se revisaron etiquetas de telemetría, contorno exterior de foco y grosor visual
de selección de 2 px sin salto de layout. Colores de texto del estado semántico
usan tonos bolder en la superficie secundaria; disabled conserva legibilidad y
texto “No disponible”. Capturas: `tmp/qa/fleet-{light,dark,mobile}.png`.

Tests públicos comprueban que un evento no muta el valor controlado, que
selección no cambia expansión y que ordenar fijados no muta las unidades.
Storybook añade la combinación secundaria/seleccionada/fijada ya revisada.
C1–C3/C13: tokens y tipografía; C4: eventos controlados y foco tras reordenar;
C5–C11: composición, regiones, orden y contenido sin copia de controles;
C12: contraste de textos secundarios y estados, con señales no cromáticas.

**Pregunta de comprobación:** ¿Por qué full necesita una altura definida por su
contenedor mientras auto no la necesita?
