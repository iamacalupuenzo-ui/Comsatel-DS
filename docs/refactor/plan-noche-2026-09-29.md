# Plan de trabajo autónomo — noche del 28 al 29 de septiembre de 2026

**Pregunta antes de leer:** ¿en qué orden se completa el DS y qué queda listo para probar en FleetOperations?

## En 30 segundos

Se trabaja en cuatro bloques, de lo más rápido a lo más complejo: documentar los cuatro componentes sin página, cerrar Formularios y entradas (Text area y Campo de formulario), completar Table y crear los organismos Cajón lateral y Barra de filtros. Cada bloque se construye en el DS, se publica y se aplica en el producto. El trabajo se detiene cuando la cuota de Claude llega al 99 %, y el estado queda anotado al final de este documento.

## Reglas de cada bloque

- **Capas:** código de la librería y página del sitio con el estándar actual. Storybook queda para Codex, por decisión de Enzo.
  - Playground con selector «Estado».
  - Notas «cuándo usarlo» y «propiedades» fuera de la caja, con el estilo de la descripción.
  - Una caja por estado, con selector de tamaño.
  - Casos de uso y tabla de propiedades.
  - Marca «Nuevo» o «Actualizado» con su versión.
- **Guía** en `guidelines/<componente>.md`, pensada también para agentes de IA (cuándo usarlo y estados), y nota de versión con «Impacto para consumidores».
- **Publicación:** `npm run check:docs` y `ng build comsatel-ds` antes de etiquetar `ds-vX.Y.Z`. Después, reiniciar el servidor del sitio.
- **Producto:** instalar la versión, reemplazar el componente propio, reiniciar `ng serve` y verificar con Playwright aislado. Nunca en el navegador de Enzo, y sin `ng build`, `ng test` ni `tsc`.

## Bloque 1 — Páginas faltantes (0.3.12)

Stepper, Skeleton, Column manager y Fleet unit list existen en la librería pero no tienen página. Se crean sus páginas y se ubican en el menú:
- Stepper, en Navegación;
- Skeleton, en Mensajes y estado;
- Column manager, junto a Table;
- Fleet unit list, en Estructura y datos.

## Bloque 2 — Formularios y entradas (0.3.13)

1. **Text area:** campo de varias líneas, con contador opcional, estados (vacío, con texto, error, requerido, solo lectura, deshabilitado) y alto ajustable. En el producto reemplaza los textarea nativos de observaciones, comentarios y datos operativos.
2. **Form field:** agrupa label, campo, ayuda y error con los ids enlazados. Reemplaza el marcado repetido de `.form-field` en el producto donde aplique.

## Bloque 3 — Table (0.3.14)

- Columna de acciones fija a la derecha, opaca al desplazar.
- Estados de carga, vacío y error dentro de la tabla.
- Menú de acciones por fila con el ancho por contenido de Dropdown.
- En el producto, retirar las reglas de `styles.css` que compensan la tabla.

## Bloque 4 — Organismos (0.3.15)

1. **Side drawer:** cajón lateral modal con encabezado, cuerpo con scroll y pie de acciones. Reemplaza `shared/side-drawer.component.ts`.
2. **Filter bar:** búsqueda, filtro principal, «Más filtros» y «Limpiar filtros». Se evalúa con las barras de Capturas, Recuperos y el tablero.

## Estado al cierre

Primera parada el 2026-09-29 a las 0:15, con la sesión de Claude al 97 %. Se retomó al restablecerse y el plan quedó **completo** a las 7:00 (sesión al 16 %, semana al 19 %).

- **Bloque 1, hecho:** páginas de Skeleton, Column manager y Fleet unit list.
- **Bloque 2, hecho (0.3.12):** Textarea y FormField. FO usa `cs-textarea` en «Observar captura» y «Editar observación» (commit `9c7b068`).
- **Bloque 3, hecho (0.3.13):** Table con `sticky: 'end'`, sombra medida, estado de error con `(retry)`, `cs-table-row-actions` y encabezados de 12 px. FO adoptó todo en Capturas y Recuperos y retiró 112 líneas de compensación de `src/styles.css` (commit `e136740`).
- **Bloque 4, hecho (0.3.14):** `cs-side-drawer` reemplaza `shared/side-drawer.component.ts` en seis archivos de FO. `cs-filter-bar` reemplaza las barras de Capturas y Recuperos (commit `d64c97c`).

La numeración se corrió una versión respecto del plan: Textarea y FormField salieron juntos en 0.3.12.

### Decisiones tomadas en el camino

- **Tablero sin Filter bar.** Su nota de «datos de demostración» va después de «Limpiar filtros» y no tiene panel de filtros. La Filter bar pondría el botón al final, así que se deja su flex simple.
- **Solo `sticky: 'end'`.** No hay un caso de uso para `'start'`; se agrega cuando aparezca uno.
- **FormField sin adoptar.** Los formularios de FO ya usan controles con label propio.

### Pendientes

- **Modal sin `surface`.** FO aún usa `.capture-surface-modal` en `styles.css` para darle el lienzo al Modal. SideDrawer ya tiene la propiedad; conviene llevarla a Modal.
- **Label de Column manager.** En la página de Table, el label «Columnas» se ve más grande que los de Estado y Filas. Hay que revisarlo.
- **Storybook.** Las historias de Textarea, FormField, TableRowActions, SideDrawer y FilterBar siguen pendientes (para Codex).

**Pregunta de comprobación:** ¿por qué el tablero no usa la Filter bar aunque tiene «Limpiar filtros»?
