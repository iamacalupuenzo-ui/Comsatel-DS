¿Qué organismos de Capturas, carga masiva y Recuperos sirven más allá de esas pantallas?

## En 30 segundos

Se promueven barra de filtros, búsqueda con resultados, tabla de historial y patrón de detalle; la conciliación de archivos y las transiciones de órdenes siguen en FleetOperations. Cada organismo recibe datos y emite eventos sin inyectar services del producto.

## Capturas

| Origen → destino de biblioteca | Estado y decisión | Estados y aceptación |
| --- | --- | --- |
| `FO:features/capture-orders/capture-order-toolbar.component.ts` + `FO:shared/filter-select.component.ts` + `FO:shared/unit-type-multi-select.component.ts` → `DS:projects/comsatel-ds/src/lib/filter-bar/filter-bar.ts`, `filter-bar.stories.ts` | **No existe: crear.** Buscador, filtros visibles, «Más filtros» y contador; composición configurable de `InputGroup`, `InputDropdown`/`Select`, `Badge`, `Popover`. No imponer campos de Capturas. | Cerrado/abierto, cero/varios filtros aplicados, limpiar, error de control, `sm/md`, móvil; los filtros visibles no se fusionan sin decisión de producto. |
| `FO:features/capture-orders/capture-order-table.component.ts` + `FO:features/capture-orders/capture-order-detail-drawer.component.ts` → `DS:projects/comsatel-ds/src/lib/data-list-panel/data-list-panel.ts`, `data-list-panel.stories.ts` | **Crear solo si** la matriz comprueba que cabecera, tabla, paginación y drawer comparten estructura en Capturas y Recuperos. Si no, **conservar como composición del sitio** con `Table` y `SideDrawer`; no llevar columnas de negocio al DS. | Datos/vacío/carga/error, fila activa, acciones, columnas estrechas, paginación. Criterio: misma API útil en ambos módulos sin condicionales de dominio. |
| `FO:features/capture-orders/capture-order-detail-drawer.component.ts` → `DS:projects/comsatel-ds/src/lib/detail-section/detail-section.ts`, `detail-section.stories.ts` | **No existe: crear** sección de detalle con título, etiqueta/valor, acción y estado faltante. Datos de orden, ubicación y trazabilidad quedan en Fleet. | Con/sin valor, copiar, texto largo, acción inactiva, `sm/md`, móvil. |
| `FO:features/capture-orders/dialogs/capture-order-form-dialog.component.ts` → `DS:projects/comsatel-ds/src/lib/autocomplete/autocomplete.ts` + `date-picker/date-picker.ts` + `side-drawer/side-drawer.ts` | **Componer**; no crear «formulario de captura» público. La selección explícita de unidad y la fecha sola sí son contratos reusables. | Vacío, coincidencias, selección inválida, errores, carga y guardado. |

## Carga masiva

| Origen → destino de biblioteca | Estado y decisión | Estados y aceptación |
| --- | --- | --- |
| `FO:features/capture-orders/dialogs/capture-order-bulk-upload-dialog.component.ts` → `DS:projects/comsatel-ds/src/lib/upload-zone/upload-zone.ts`, `upload-zone.stories.ts` | **No existe: crear** zona de archivo con selección/arrastre, nombre, tipo/tamaño, progreso y error. Detección de proveedor, parseo, validación SAP y conciliación (`FO:core/orders/capture-order-workbook.ts`) **se conservan en producto**. | Sin archivo, arrastrando, seleccionado, procesando, rechazado, error, reintento, disabled, móvil. |
| `FO:features/capture-orders/dialogs/capture-order-bulk-upload-dialog.component.ts` → `DS:projects/comsatel-ds/src/lib/review-summary/review-summary.ts`, `review-summary.stories.ts` | **Crear si es genérico:** grupo con recuento, estado y acciones, sin nombres fijos de financiera o etapa. Tabs y Table ya cubren la navegación. | Cero/varios, pendiente/resuelto/error, loading, texto largo, móvil. Comparar primero que el resumen de errores no se solape. |
| `FO:features/capture-orders/dialogs/capture-order-bulk-history-dialog.component.ts` → `DS:projects/comsatel-ds/src/lib/table/table.ts` + `side-drawer/side-drawer.ts` | **Existe por composición: conservar.** El historial de cargas usa filas paginadas, pero sus columnas son del producto. | Sin cargas, una/muchas, página final, error y fecha larga. |

## Recuperos

| Origen → destino de biblioteca | Estado y decisión | Estados y aceptación |
| --- | --- | --- |
| `FO:features/recoveries/recoveries-toolbar.component.ts` + `FO:shared/date-range-filter.component.ts` → `DS:projects/comsatel-ds/src/lib/filter-bar/filter-bar.ts` | **Mismo organismo con configuración distinta.** Estado, Seguro, Modalidad y Fecha de registro muestran por qué la barra no puede fijar los campos de Capturas. | Rango aplicado, filtros independientes, limpiar, panel «Más filtros», móvil. |
| `FO:features/recoveries/dialogs/recovery-unit-search-dialog.component.ts` + `FO:shared/unit-autocomplete.component.ts` → `DS:projects/comsatel-ds/src/lib/search-result-list/search-result-list.ts`, `search-result-list.stories.ts` | **No existe: crear** lista desplegable de búsqueda con metadatos, selección, foco y resultado vacío; el `Autocomplete` controla consulta y delega render a esta lista. | Menos de 3 caracteres, 1/6/0 resultados, teclado, selección, loading/error, texto largo. |
| `FO:features/recoveries/recoveries-table.component.ts` + `FO:features/recoveries/recoveries-detail-drawer.component.ts` → `DS:projects/comsatel-ds/src/lib/table/table.ts` + `side-drawer/side-drawer.ts` + `detail-section/detail-section.ts` | **Componer**, con las mismas extensiones de tabla y detalle. La regla «Por registrar»/«Registrado» no entra al DS. | Estados, fila activa, vacío, carga, paginación y acciones. |
| `FO:features/recoveries/dialogs/recovery-create-dialog.component.ts`, `recovery-edit-dialog.component.ts`, `recovery-transition-dialog.component.ts`, `recovery-confirm-dialog.component.ts`, `recovery-annul-dialog.component.ts` → `DS:projects/comsatel-ds/src/lib/side-drawer/side-drawer.ts` + `modal/modal.ts` | **Componer.** El DS cubre superficie, botones y campos; el producto conserva validación y transición. | Formulario incompleto, guardando, éxito/error, confirmación, peligro, cierre con cambios. |

## Dependencias y aceptación

Depende de partes 1–3. `FilterBar` se crea una vez y se demuestra con las dos configuraciones. Un organismo aprobado tiene entradas de datos tipadas, salidas de intención, slots donde cambian los campos y ninguna importación desde `features/`/`core/` de Fleet. El sitio del DS muestra Capturas y Recuperos como ejemplos de composición con datos ficticios; Storybook cubre todos los estados pertinentes. Si `DataListPanel` o `ReviewSummary` no supera la prueba de reutilización, se documenta la composición y se retira la fila de creación sin perder los primitivos.

**Pregunta de comprobación:** ¿Qué parte de la carga masiva pertenece al DS y qué parte depende de reglas de Capturas?
