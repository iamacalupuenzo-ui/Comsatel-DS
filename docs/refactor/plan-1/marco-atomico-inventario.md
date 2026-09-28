¿Qué componentes y patrones pertenecen a cada nivel del Plan 1?

## En 30 segundos

Este inventario clasifica las 58 clases visuales o directivas del DS y los 63 componentes Angular de FleetOperations, junto con sus plantillas y páginas. Cada fila indica el estado que falta cotejar y la decisión propuesta; el orden y las puertas de validación están en el [marco atómico](marco-atomico.md).

## Recursos

- [Marco atómico: orden y puertas](marco-atomico.md)

## Niveles 2 a 6 · Inventario y decisión

«Conservar» incluye verificar los estados indicados; «modificar» requiere historia de regresión y contrato compatible; «crear» exige ausencia confirmada en API pública. Los estados listados son la siguiente comprobación o brecha conocida. No se mueve lógica de órdenes, telemetría, permisos ni datos al DS.

### Nivel 2 · Átomos del DS

| Pieza (`DS:`) | Existe; falta / estados por verificar | Decisión |
| --- | --- | --- |
| `avatar/avatar.ts` | Avatar; imagen ausente, iniciales, tamaño. | Conservar |
| `avatar/avatar-add-button.ts` | Acción de avatar; foco, disabled. | Conservar |
| `avatar/avatar-label.ts` | Etiqueta; texto largo y asociación. | Conservar |
| `badge/badge.ts` | Insignia; variantes, contador largo. | Conservar |
| `brand/c-locater-flotas-logo.ts` | Logo; claro/oscuro, tamaño y nombre. | Conservar |
| `button/button.ts` | Botón; carga sin cambio de ancho, foco, icono y `sm/md`. | Modificar |
| `checkbox/checkbox.ts` | Casilla; indeterminado, disabled y teclado. | Conservar |
| `dropdown/country-flag.ts` | Bandera; código desconocido y nombre accesible. | Conservar |
| `dropdown/dropdown-item.ts` | Opción; selección, hover, foco y texto largo. | Modificar |
| `icons/icon.ts` | Ícono; nombre ausente, tamaño, color y `aria-hidden`. | Conservar |
| `input/input.ts` | Campo; paso 3 cubrió aplicado y autofill; revalidar foco/error y `sm/md/lg` después de primitivos. | Modificar |
| `input/input-group-input.ts` | Campo nativo del grupo; error/required, autofill, readonly. | Modificar |
| `input/input-group-text.ts` | Texto accesorio; truncado y lectura accesible. | Conservar |
| `input/input-group-clear.ts` | Botón X; paso 3 cubrió limpieza; revalidar foco/disabled/readonly. | Modificar |
| `progress-indicator/progress-indicator.ts` | Indicador; valor 0/100 y anuncio. | Conservar |
| `radio/radio.ts` | Opción; seleccionado, disabled, teclado. | Conservar |
| `skeleton/skeleton.ts` | Forma de carga; tamaños, movimiento reducido. | Conservar |
| `tab/tab.ts` | Pestaña individual; seleccionado, foco, disabled. | Conservar |
| `tag/tag.ts` | Etiqueta; aplicada, removible, foco. | Modificar |
| `toggle/toggle.ts` | Interruptor; checked, disabled, foco y nombre. | Conservar |

### Nivel 3 · Moléculas del DS

| Pieza (`DS:`) | Existe; falta / estados por verificar | Decisión |
| --- | --- | --- |
| `accordion/accordion-item.ts` | Ítem expandible; abierto, error, teclado. | Conservar |
| `avatar/avatar-group.ts` | Grupo; overflow, foco y nombres. | Conservar |
| `banner/banner.ts` | Mensaje con acción; éxito/error, cierre, foco. | Conservar |
| `card/action-card.ts` | Tarjeta accionable; notificación real/no leída pendiente de evidencia. | Modificar |
| `card/card-banner.ts` | Banner de tarjeta; contenido largo, móvil. | Conservar |
| `card/feature-spotlight-card.ts` | Tarjeta destacada; vacío, CTA y móvil. | Conservar |
| `card/preview-card.ts` | Vista previa; carga y contenido ausente. | Conservar |
| `card/spotlight-card.ts` | Tarjeta de destaque; foco, acción y móvil. | Conservar |
| `datetime-picker/datetime-picker.ts` | Fecha y hora; falta fecha sola como contrato; vacío, error y teclado. | Modificar |
| `dropdown/dropdown.ts` | Lista emergente; ancho, opción larga, Escape. | Modificar |
| `dropdown/input-dropdown.ts` | Selector; filtro aplicado, truncado, ancho del menú y teclado. | Modificar |
| `input/input-group-addon.ts` | Accesorio de grupo; icono inicial/final, botón y foco. | Conservar |
| `input/input-group.ts` | Grupo; paso 3 cubrió aplicado; revalidar error, foco, hover y ancho. | Modificar |
| `input/password-input.ts` | Contraseña con ojo; autofill, visible/oculta, error y foco. | Modificar |
| `list-item/list-item.ts` | Fila de contenido; seleccionado, texto largo y foco. | Modificar |
| `menu/menu.ts` | Menú; abierto, teclado, Escape y borde de viewport. | Conservar |
| `motion/motion.ts` | Envoltorio de movimiento; reducido, entrada y salida. | Conservar |
| `pagination/pagination.ts` | Navegación; vacío, primera/última y móvil. | Conservar |
| `popover/popover.ts` | Flotante; ancho, scroll, Escape y retorno de foco. | Modificar |
| `radio/radio-group.ts` | Grupo; selección solo por teclado y error. | Conservar |
| `select/select.ts` | Selector; aplicado, opción larga, ancho y búsqueda. | Modificar |
| `tab/tabs.ts` | Conjunto de pestañas; teclado, panel activo, móvil. | Conservar |
| `toast/toast.ts` | Aviso temporal; cola, autocierre, acción y anuncio. | Modificar |
| `tooltip/tooltip.ts` | Ayuda flotante; viewport, scroll, foco y Escape. | Modificar |
| `directives/collapse.directive.ts` | Conducta de colapso; `inert`, altura y movimiento reducido. | Conservar |
| `directives/press-scale.directive.ts` | Conducta de presión; teclado y movimiento reducido. | Conservar |

### Nivel 4 · Organismos del DS

| Pieza (`DS:`) | Existe; falta / estados por verificar | Decisión |
| --- | --- | --- |
| `accordion/accordion.ts` | Lista de ítems; apertura múltiple y teclado. | Conservar |
| `calendar/calendar.ts` | Calendario completo; fecha sola, límites y teclado. | Modificar |
| `column-manager/column-manager.ts` | Gestión de columnas; subir/bajar por teclado, mínimo visible. | Modificar |
| `datetime-range-picker/datetime-range-picker.ts` | Rango; solo fecha, error y limpieza. | Modificar |
| `fleet-unit-list/fleet-unit-list.ts` | Lista de unidades; revalidar fila, fijado, selección y móvil. | Conservar |
| `header/header.ts` | Cabecera; acciones, responsive y foco. | Conservar |
| `modal/modal.ts` | Diálogo; acciones de cabecera y superficie pendientes de decisión de Enzo. | Modificar |
| `spotlight/spotlight.ts` | Recorrido guiado; paso, cierre y foco. | Conservar |
| `stepper/stepper.ts` | Flujo por pasos; error, completado y teclado. | Conservar |
| `table/table.ts` | Tabla; filtro de columna, sticky opaco, carga y error pendientes. | Modificar |
| `table-tree/table-tree.ts` | Árbol tabular; expansión, selección y teclado. | Conservar |

### Nivel 5 · Plantillas del DS

| Pieza (`DS:`) | Existe; falta / estados por verificar | Decisión |
| --- | --- | --- |
| `app-layout/app-layout.ts` | Shell con topnav/sidenav/panel; colapsado, móvil y foco. | Conservar |

Las fuentes `tokens/*`, `shared/radio-glyph.ts`, `motion/eases.ts`, tipos y helpers son infraestructura de niveles 0–1 o soporte interno; no son componentes visuales adicionales. El inventario anterior cubre las 58 clases con `@Component` o `@Directive` encontradas en `src/lib` al 28-09-2026.

### Nivel 2 · Átomos observados en FleetOperations

| Patrón (`FO:`) | Existe; falta / estados por verificar | Decisión |
| --- | --- | --- |
| `features/fleet-map/copy-location-button.component.ts` | Acción local; Button cubre base, falta éxito/error al copiar y foco. | Conservar composición en producto |

### Nivel 3 · Moléculas observadas en FleetOperations

| Patrón (`FO:`) | Existe; falta / estados por verificar | Decisión |
| --- | --- | --- |
| `shared/filter-select.component.ts` | Selector local; InputDropdown carece de aplicado y ancho de menú; vacío, largo, Escape. | Modificar DS |
| `shared/date-range-filter.component.ts` | Fecha con input y calendario; falta fecha sola, limpieza y error. | Crear contrato portable |
| `shared/time-picker.component.ts` | Hora aislada; falta contrato público, teclado y error. | Crear contrato portable |
| `shared/unit-autocomplete.component.ts` | Búsqueda con selección; falta API de resultados, vacío/carga/error y foco. | Crear contrato portable |
| `shared/unit-type-multi-select.component.ts` | Multiselección; falta selección aplicada, contador, teclado y lista larga. | Modificar DS |
| `features/fleet-map/panel-header.component.ts` | Cabecera local; Header cubre estructura, falta acciones contextuales/móvil. | Conservar composición |
| `features/fleet-map/following-unit-card.component.ts` | Tarjeta de unidad; falta fijado, sin señal, selección. | Modificar Card/ListItem |
| `features/fleet-map/capture-order-info-card.component.ts` | Resumen de orden; faltan datos vacíos, texto largo y error. | Conservar composición |
| `features/fleet-map/fleet-notification-card.component.ts` | Notificación; falta instancia observable, leído/no leído y acción. | Modificar ActionCard tras evidencia |
| `features/fleet-dashboard/dashboard-stat.component.ts` | Métrica; falta dato ausente, tendencia y contraste. | Crear molécula genérica |

### Nivel 4 · Organismos observados en FleetOperations

| Patrón (`FO:`) | Existe; falta / estados por verificar | Decisión |
| --- | --- | --- |
| `shared/side-drawer.component.ts` | Drawer local; DS no tiene API; abierto, Escape, foco, móvil. | Crear SideDrawer |
| `features/capture-orders/capture-order-toolbar.component.ts` | Filtros de matriz; aplicado, 0/varios, teclado, móvil. | Crear FilterBar genérico |
| `features/capture-orders/capture-order-table.component.ts` | Tabla con filtros; sticky, carga/error, orden y ancho. | Modificar Table |
| `features/capture-orders/capture-order-detail-drawer.component.ts` | Detalle de orden; drawer genérico falta, contenido sigue en producto. | Crear contenedor; conservar contenido |
| `features/capture-orders/dialogs/capture-order-annul-dialog.component.ts` | Flujo de anulación; peligro, validación y retorno de foco. | Conservar composición |
| `features/capture-orders/dialogs/capture-order-bulk-history-dialog.component.ts` | Historial; vacío, muchas filas y móvil. | Conservar Table + overlay |
| `features/capture-orders/dialogs/capture-order-bulk-upload-dialog.component.ts` | Carga masiva; ayuda en cabecera, error/carga/foco. | Modificar Modal; conservar lógica |
| `features/capture-orders/dialogs/capture-order-close-dialog.component.ts` | Cierre; requerido, error, confirmar/cancelar. | Conservar composición |
| `features/capture-orders/dialogs/capture-order-edit-capture-dialog.component.ts` | Edición; error, guardado, foco. | Conservar composición |
| `features/capture-orders/dialogs/capture-order-edit-observation-dialog.component.ts` | Edición de observación; vacío, error, guardado. | Conservar composición |
| `features/capture-orders/dialogs/capture-order-form-dialog.component.ts` | Formulario de orden; required, carga, error y móvil. | Conservar composición |
| `features/capture-orders/dialogs/capture-order-observation-dialog.component.ts` | Observación; vacío, error, confirmación. | Conservar composición |
| `features/capture-orders/dialogs/capture-order-revert-dialog.component.ts` | Reversión; peligro, foco, carga. | Conservar composición |
| `features/recoveries/recoveries-toolbar.component.ts` | Barra de filtros; aplicado, varios, móvil. | Crear FilterBar genérico |
| `features/recoveries/recoveries-table.component.ts` | Tabla; sticky, filtros, error/carga y teclado. | Modificar Table |
| `features/recoveries/recoveries-detail-drawer.component.ts` | Detalle; drawer y foco; contenido de recupero sigue local. | Crear contenedor; conservar contenido |
| `features/recoveries/dialogs/recovery-annul-dialog.component.ts` | Anulación; peligro, error y foco. | Conservar composición |
| `features/recoveries/dialogs/recovery-confirm-dialog.component.ts` | Confirmación; carga/error y foco. | Conservar composición |
| `features/recoveries/dialogs/recovery-create-dialog.component.ts` | Alta; requerido, validación y guardado. | Conservar composición |
| `features/recoveries/dialogs/recovery-edit-dialog.component.ts` | Edición; datos, error y guardado. | Conservar composición |
| `features/recoveries/dialogs/recovery-transition-dialog.component.ts` | Cambio de estado; peligro, permisos y foco. | Conservar composición |
| `features/recoveries/dialogs/recovery-unit-search-dialog.component.ts` | Búsqueda de unidad; vacío/carga/error, teclado. | Crear Autocomplete genérico |
| `features/fleet-map/fleet-map-search.component.ts` | Panel búsqueda/filtros; expandido, fijado, selección y móvil. | Modificar FleetUnitList y Collapse |
| `features/fleet-map/fleet-map-tabs.component.ts` | Pestañas; activo, teclado, móvil. | Conservar Tabs |
| `features/fleet-map/fleet-map-canvas.component.ts` | Mapa con marcadores; seleccionado, sin señal y dark. | Crear organismo de mapa agnóstico al proveedor |
| `features/fleet-map/fleet-notifications-panel.component.ts` | Lista de notificaciones; vacío, no leído y acción. | Crear panel genérico tras evidencia |
| `features/fleet-map/following-view.component.ts` | Seguimiento; sin unidades, múltiple, pérdida de señal. | Crear panel genérico |
| `features/fleet-map/bitacora-view.component.ts` | Bitácora; vacío, filtro, carga y fecha. | Crear panel genérico |
| `features/fleet-map/recovery-view.component.ts` | Vista de recupero; vacío, GPS y tooltip fuera de scroll. | Crear panel genérico |
| `features/fleet-map/recovery-gps-panel.component.ts` | GPS; sin datos, cambio y error. | Crear panel genérico |
| `features/fleet-map/trip-events-panel.component.ts` | Eventos; vacío, varios y scroll. | Crear panel genérico |
| `features/fleet-map/capture-order-info-modal.component.ts` | Panel de orden; carga/error y retorno de foco. | Conservar composición |
| `features/fleet-map/following-stop-confirm-dialog.component.ts` | Confirmación de parada; peligro, foco y carga. | Conservar composición |
| `features/fleet-map/dialogs/recovery-close-dialog.component.ts` | Cierre de recupero; error y confirmación. | Conservar composición |
| `features/fleet-map/dialogs/recovery-gps-command-dialog.component.ts` | Comando GPS; carga, error y foco. | Conservar composición |
| `features/fleet-map/dialogs/recovery-gps-history-dialog.component.ts` | Historial GPS; vacío, muchas filas y móvil. | Conservar Table + overlay |
| `features/fleet-map/dialogs/recovery-gps-switch-dialog.component.ts` | Cambio GPS; confirmación, carga y error. | Conservar composición |
| `features/fleet-dashboard/fleet-dashboard-toolbar.component.ts` | Filtros de tablero; aplicado y móvil. | Crear FilterBar genérico |
| `features/fleet-dashboard/dashboard-kpi-grid.component.ts` | Grilla de KPI; dato ausente y móvil. | Crear organismo genérico |
| `features/fleet-dashboard/dashboard-panel.component.ts` | Panel; vacío, carga y error. | Crear organismo genérico |
| `features/fleet-dashboard/charts/dashboard-trend-chart.component.ts` | Tendencia; actual/anterior, sin datos y leyenda. | Crear gráfico tras decisión de motor |
| `features/fleet-dashboard/charts/dashboard-status-chart.component.ts` | Estado; categorías, vacío y contraste. | Crear gráfico tras decisión de motor |

### Nivel 5 · Plantillas de FleetOperations

| Patrón (`FO:`) | Existe; falta / estados por verificar | Decisión |
| --- | --- | --- |
| `layout/operations-layout.component.ts` | Shell de operaciones; sidebar, móvil y superposiciones. | Modificar AppLayout si falla paridad |
| `features/auth/*` | Acceso/recuperación; error, autofill, foco y móvil. | Conservar plantilla de producto |
| `features/capture-orders/*` | Matriz, filtros, tabla y detalle; vacío/carga/error. | Crear plantilla de lista genérica |
| `features/recoveries/*` | Lista, detalle y transición; vacío/carga/error. | Reusar plantilla de lista |
| `features/fleet-map/*` | Mapa más panel lateral; sin señal, filtros y móvil. | Crear plantilla de exploración |
| `features/fleet-dashboard/*` | KPI y gráficos; vacío, carga y móvil. | Crear plantilla de tablero |
| `features/support/*` | Ayuda; contenido ausente y móvil. | Conservar plantilla de producto |
| `features/feature-placeholder/*` | Estado provisional; ruta y contenido de espera. | Conservar solo en producto |

### Nivel 6 · Páginas de referencia y casos del producto

| Página (`FO:`) | Existe; falta / estados por verificar | Decisión |
| --- | --- | --- |
| `app.ts` | Raíz y rutas; revisar navegación, foco al cambio. | Conservar en producto |
| `features/auth/login.page.ts` | Instancia de acceso; error/autofill/foco. | Conservar como caso de referencia |
| `features/auth/recover-password.page.ts` | Recuperación; éxito/error y foco. | Conservar como caso de referencia |
| `features/capture-orders/new-capture-order.page.ts` | Matriz de capturas; vacío, carga, error y móvil. | Conservar como caso de referencia |
| `features/recoveries/recoveries.page.ts` | Recuperos; filtros, detalle y móvil. | Conservar como caso de referencia |
| `features/fleet-map/fleet-map.page.ts` | Mapa; panel, sin señal y móvil. | Conservar como caso de referencia |
| `features/fleet-dashboard/fleet-dashboard.page.ts` | Tablero; sin datos, carga/error y móvil. | Conservar como caso de referencia |
| `features/support/support.page.ts` | Soporte; contenido ausente y móvil. | Conservar como caso de referencia |
| `features/feature-placeholder/feature-placeholder.page.ts` | Ruta provisional; vacío y navegación. | Conservar en producto |

`FO:shared/map-tiles.ts`, `shared/charts/echarts-registration.ts`, services, stores y catálogos son infraestructura, no patrones visuales. Las filas de Fleet cubren los 63 archivos con `@Component` encontrados en `src/app`; las plantillas de carpeta son patrones transversales adicionales. Las páginas de referencia del **DS** serán las `src/app/pages/*-demo/` del sitio, agrupadas por nivel y con enlaces a historias, API, casos reales y estado de verificación. Ninguna página del producto se copia al DS.

**Pregunta de comprobación:** ¿Por qué el drawer de detalle es un organismo y el contenido de una orden permanece en FleetOperations?
