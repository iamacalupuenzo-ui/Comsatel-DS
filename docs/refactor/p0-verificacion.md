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

**Pregunta de comprobación:** ¿Por qué full necesita una altura definida por su
contenedor mientras auto no la necesita?
