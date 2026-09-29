¿Qué fundamentos debe estabilizar el DS antes de promover los componentes del producto?

## En 30 segundos

El lienzo humo `#f5f5f5` ya figura en `tokens.css` como `--color-background-canvas` y las superficies de control son blancas; se conservan. Hay que reconciliar alias locales, tokens usados pero no definidos, semántica de series de gráficos y tipografía de filtros antes de construir organismos.

## Alcance y decisiones

| Origen → destino | Decisión y motivo | Verificación |
| --- | --- | --- |
| `Producto:src/styles.css` (`--app-surface-canvas`, `--elevation-surface-default`) → `DS:projects/comsatel-ds/src/styles/tokens.css` | **Modificar/documentar.** Conservar `--color-background-canvas:#f5f5f5`, `--color-background-base:#fff` y roles de superficie; retirar la duplicación de alias del contrato futuro. El secundario crema `--elevation-surface-secondary` sigue optativo. | Tabla de roles por tema claro/oscuro/glass; ejemplos lienzo y tarjeta blanca. |
| `FO:features/fleet-dashboard/dashboard-colors.ts`, `charts/dashboard-trend-chart.component.ts`, `charts/dashboard-status-chart.component.ts` → `DS:projects/comsatel-ds/src/styles/tokens.css` y `src/lib/tokens/all-tokens.data.ts` | **Crear roles de serie** para actual/anterior, grilla, ejes y tooltip, con contraste en tres temas; no copiar fallbacks `#1f4f8f`, `#5b6475`, `#dfe3ea`, `#1d2433` ni `rgba(0,0,0,.03)` como API. | No hay hex de serie en envoltorios; diferencia visual actual/anterior también se comunica en leyenda y texto. |
| `FO:features/fleet-map/fleet-map-canvas.component.ts`, `shared/map-tiles.ts` → `DS:projects/comsatel-ds/src/styles/tokens.css` y páginas de color | **Conservar/matizar.** Los colores de marcadores y estados de unidad se inspeccionan junto con los roles de selección existentes. Proveedor de tiles, coordenadas y atribución permanecen fuera del DS. | Ningún token de estado se confunde con un dato del mapa; muestras con fondos de mapa claro/oscuro. |
| `FO:layout/operations-layout.component.ts`, `FO:features/fleet-dashboard/fleet-dashboard.page.ts`, `FO:features/fleet-map/fleet-map.page.ts` → `DS:projects/comsatel-ds/src/styles/tokens.css`, `src/lib/tokens/typography.ts`, `src/styles/typography-tokens.css` | **Modificar documentación y corregir brecha.** La investigación halló nombres inexistentes como `--z-index-tooltip`, `--elevation-shadow-raised`, `--font-size-display-sm`, `--font-weight-semibold`, `--border-radius-lg`. Usar los roles reales `--elevation-z-index-tooltip`, `--shadow-*`, `--font-size-heading-*`, `--font-weight-emphasis`, `--radius-*`; los tokens tipográficos CSS son generados y no se editan a mano. | Script de inventario cruza cada `var(--*)` de componentes nuevos contra tokens definidos; cero referencias sin valor. |
| `FO:shared/side-drawer.component.ts`, `FO:features/fleet-map/fleet-map-search.component.ts` → `DS:projects/comsatel-ds/src/styles/tokens.css`, `src/app/pages/spacing/` y `src/app/pages/effects/` | **Conservar escala y documentar excepciones.** Medir `--layout-padding-*`, `--layout-gap-*`, radios `xs` a `full`, `--shadow-*`, duración y z-index; cualquier 10/14 px sin token exacto queda explícito, no se redondea. | Tabla de valores reales y capturas de foco, superposición y pantalla estrecha. |

## Hallazgos que requieren revalidación

`docs/investigacion-componentes-capturas.md` se escribió contra DS 0.2.2 y registró `--color-icon-brand-default` usado por `ListItem` sin definir, lienzos locales duplicados y superficies de overlay. El worktree es 0.3.0 local: comprobar el valor en `tokens.css` y la referencia en `src/lib/list-item/list-item.css` antes de abrir una corrección. `docs/refactor/seleccion.md` ya concluyó que `--color-background-selected` conserva su rol y que no hace falta otro alias; respetar esa decisión.

La tipografía parte de `typography.ts` y `typography-tokens.css`: Manrope para encabezados, Public Sans para contenido, pares `font-size`/`line-height`, pesos regular/accent/emphasis/bold. Para filtros `sm` del mapa y `md` de tablas, medir 28/12 y 32/13 respectivamente según `paridad-p0.md`. El estado activo requiere contraste medido, no solo color más fuerte. Los tonos semánticos peligro, aviso y éxito se reservan para estados verdaderos; el azul de marca no sustituye a error o selección.

## Dependencias y aceptación

Parte 1 precede a partes 2, 4 y 5. Cada rol tiene valor en claro, oscuro y glass o declara herencia deliberada; `all-tokens.data.ts`, páginas de color y guía `guidelines/design-tokens.md` concuerdan con CSS. El script de tokens y contraste del DS pasa; las superficies humo/blanco permanecen como predeterminadas y la crema se exhibe solo como variante. Storybook y el sitio muestran estados de superficie, foco y selección; no se inventa un token para replicar un valor local si un rol semántico ya existe.

**Pregunta de comprobación:** ¿Por qué `--color-background-selected` debe conservar un nombre distinto del color de marca aunque hoy compartan tono?
