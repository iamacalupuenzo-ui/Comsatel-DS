¿Qué partes del Tablero se convierten en organismos y cuáles son configuración del negocio?

## En 30 segundos

La tarjeta de cifra, el panel de gráfico y la barra de filtros son reutilizables; las métricas «En trabajo» o «Listas para captura» son datos de Fleet. Los gráficos de línea y barras tienen su propia parte porque requieren decidir cómo distribuir ECharts.

## Matriz de Tablero

| Origen → destino de biblioteca | Estado y decisión | Estados y aceptación |
| --- | --- | --- |
| `FO:features/fleet-dashboard/dashboard-stat.component.ts` + `FO:features/fleet-dashboard/dashboard-kpi-grid.component.ts` → `DS:projects/comsatel-ds/src/lib/stat-card/stat-card.ts`, `stat-card.stories.ts` | **No existe como tarjeta de cifra: crear.** Número, etiqueta, variación, ícono, estado y acción opcional. La cuadrícula responsive es receta salvo necesidad en otro módulo. | Cero, valor alto, sin dato, tendencia positiva/negativa/neutra, loading, error, `sm/md`, móvil; texto y signo comunican tendencia. |
| `FO:features/fleet-dashboard/dashboard-panel.component.ts` + `FO:features/fleet-dashboard/charts/dashboard-trend-chart.component.ts` → `DS:projects/comsatel-ds/src/lib/chart-panel/chart-panel.ts`, `chart-panel.stories.ts` | **No existe: crear.** Título, subtítulo, selector de período proyectado, contenido de gráfico, explicación/tabla accesible. Datos y granularidad del servicio quedan en Fleet. | Con/sin selector, semanal/mensual, loading, vacío, error, `sm/md`, pantalla estrecha. |
| `FO:features/fleet-dashboard/fleet-dashboard-toolbar.component.ts` → `DS:projects/comsatel-ds/src/lib/filter-bar/filter-bar.ts` | **Mismo organismo: configurar.** Fecha de corte y Financiera bajo pestaña; filtros específicos se proyectan. | Fecha/financiera aplicadas o vacías, limpiar, móvil. |
| `FO:features/fleet-dashboard/fleet-dashboard.page.ts` → `DS:projects/comsatel-ds/src/lib/tab/tabs.ts` | **Existe: conservar.** Pestañas Capturas y Recuperos usan tab genérico; Flota no vuelve como ejemplo porque salió de la versión final. | Activo, foco, teclado, contenido vacío/cargando. |
| `FO:features/fleet-dashboard/charts/dashboard-trend-chart.component.ts`, `dashboard-status-chart.component.ts` → `DS:projects/comsatel-ds/src/lib/charts/comparison-line-chart.ts`, `paired-bar-chart.ts` | **No existen: crear** bajo el contrato de la Parte 5. No copiar las etiquetas de métricas ni leer `FleetDashboardService` dentro de la biblioteca. | Series actual/anterior, faltantes, cero, texto largo, cambio de período, error, móvil y temas. |

## Dependencias y aceptación

Partes 1–3, FilterBar de 4A y decisión de motor de Parte 5. La tarjeta y el panel se aceptan con API pública sin nociones de órdenes, stories y páginas del sitio. El dashboard de ejemplo del DS muestra una composición Capturas/Recuperos con datos inventados; no se instala la lógica de corte ni la fuente de historial en el paquete.

**Pregunta de comprobación:** ¿Por qué «En trabajo» es dato de ejemplo y no una variante fija de `StatCard`?
