¿Qué brechas ya documentadas se cierran antes de aceptar la migración al DS?

## En 30 segundos

La investigación de Capturas contiene correcciones locales hechas contra 0.2.2; el DS del worktree es 0.3.0 local. Se revalida cada brecha en el código actual, se agrega una historia de regresión y se documenta la API pública. El cierre no se deduce de que una pantalla «se vea bien».

## Registro de cierre

| Evidencia de producto → destino DS | Decisión propuesta | Criterio de cierre |
| --- | --- | --- |
| `Producto:docs/investigacion-componentes-capturas.md` § DatePicker/Autocomplete + `FO:shared/unit-autocomplete.component.ts` → `DS:projects/comsatel-ds/src/lib/date-picker/date-picker.ts`, `src/lib/autocomplete/autocomplete.ts` | **Crear** fecha sola y búsqueda con selección explícita. | Teclado, mínimo de caracteres, vacío, carga, error y fecha sin hora documentados. |
| `FO:shared/filter-select.component.ts`, `FO:shared/date-range-filter.component.ts`, `FO:features/capture-orders/capture-order-toolbar.component.ts` → `DS:projects/comsatel-ds/src/lib/dropdown/input-dropdown.ts`, `input/input-group.ts`, `select/select.ts` | **Modificar** aplicado, truncado, ancho de panel, limpieza y rango solo fecha. | `InputDropdown` no corta valor; el filtro aplicado es distinguible; 28/12 y 32/13 conservan geometría; no se rompe opción larga. |
| `FO:features/capture-orders/capture-order-table.component.ts`, `FO:features/recoveries/recoveries-table.component.ts` → `DS:projects/comsatel-ds/src/lib/table/table.ts`, `table-types.ts`, `column-manager/column-manager.ts` | **Modificar** filtros por columna, sticky opaco, contador con unidad y subir/bajar por teclado. | Encabezado y celdas fijas se alinean; no se transparentan al desplazar; orden visual y de datos coincide. |
| `FO:features/capture-orders/dialogs/capture-order-bulk-upload-dialog.component.ts` → `DS:projects/comsatel-ds/src/lib/modal/modal.ts` | **Modificar** acciones junto al título, superficie opcional y foco. | La ayuda puede vivir en cabecera; overlay accesible en todas las etapas y sin overrides de host. |
| `FO:features/fleet-map/recovery-view.component.ts` → `DS:projects/comsatel-ds/src/lib/tooltip/tooltip.ts` | **Modificar** posicionamiento fuera de contenedores con scroll, en coordinación con `popover/`. | Tooltip de primera y última tarjeta visible completo, sin saltos de foco. |
| `FO:features/fleet-map/fleet-map-search.component.ts` → `DS:projects/comsatel-ds/src/lib/directives/collapse.directive.ts`, `fleet-unit-list/fleet-unit-list.ts`, `src/app/pages/motion-demo/` | **Conservar donde P0 ya cerró; revalidar** altura completa, `inert`, dos filtros y fila plana. | Revalidación actual confirma 64 px, radio 6, barra 3 px, filtros visibles y `aria-pressed`. |
| `FO:features/fleet-map/fleet-notification-card.component.ts` → `DS:projects/comsatel-ds/src/lib/card/action-card.ts` | **Pendiente de evidencia.** Obtener notificación visible; comparar texto, borde, acción, estado. | Captura con contenido y estados, no solo panel vacío. |
| `Producto:src/styles.css`, `FO:layout/operations-layout.component.ts`, `FO:features/fleet-map/fleet-map.page.ts`, `FO:features/fleet-dashboard/fleet-dashboard.page.ts` → `DS:projects/comsatel-ds/src/styles/tokens.css`, `src/lib/tokens/all-tokens.data.ts` | **Reconciliar** alias locales y tokens usados sin definir; revisar `--color-icon-brand-default` en `list-item.css`. | Cero variables indefinidas en nuevos componentes; tema y contraste comprobados. |

También se revisan las brechas de `docs/refactor/inventario-backlog.md`: Button, Badge, Tag, ListItem, Dropdown, Input, Accordion, Popover, Select, Table, ColumnManager, colores, mapa y DatePicker/Autocomplete. No se vuelven a abrir por repetición: una fila se cierra con hash, estado, medición y enlace a historia/demo; la parte que siga pendiente se declara. `docs/refactor/paridad-p0.md` contiene el rechazo inicial y la posterior revalidación de FleetUnitList/panel: se cita el veredicto final y se conserva la evidencia de regresión.

## Dependencias y aceptación

Esta parte funciona como auditoría final tras las partes 1–6. La lista histórica de 0.2.2 se contrasta con `src/public-api.ts` y las fuentes de 0.3.0 antes de implementar. Cerrar solo con API pública, story de regresión, página del sitio, comprobación visual/teclado y nota de compatibilidad. Mantener explícitos los casos sin instancia observable y las decisiones de producto pendientes.

**Pregunta de comprobación:** ¿Por qué una corrección local de FleetOperations no demuestra que el DS 0.3.0 ya tenga el contrato resuelto?
