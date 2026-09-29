¿Debe el DS envolver ECharts para reproducir los gráficos comparativos del Tablero?

## En 30 segundos

Sí, si se distribuye como integración opcional con API de datos pequeña. Dos componentes públicos deben resolver líneas comparativas y barras horizontales pareadas, con tokens de serie, tema y descripción accesible. El producto conserva los cálculos y la elección de período.

## Decisión arquitectónica

`FO:features/fleet-dashboard/charts/dashboard-trend-chart.component.ts` y `dashboard-status-chart.component.ts` importan `NgxEchartsDirective`, construyen `EChartsCoreOption` y leen colores con `dashboard-colors.ts`. `FO:shared/charts/echarts-registration.ts` registra módulos del motor. En el DS no hay gráficos exportados ni dependencia de `echarts`/`ngx-echarts` en `projects/comsatel-ds/package.json` 0.3.0. Recomiendo una integración explícita: wrappers standalone en `projects/comsatel-ds/src/lib/charts/`, `echarts` y `ngx-echarts` como peers opcionales declarados, entrada pública separada o mecanismo que evite cargar el motor al importar solo `Button`. Antes de implementarla, comprobar compatibilidad de Angular 22 y resolución de peers en un consumidor limpio. Si eso no resulta viable, documentar una receta de opciones ECharts con tokens y mantener los wrappers en producto; no introducir una dependencia silenciosa en todo el DS.

| Origen → destino | Decisión y motivo | Estados de Storybook |
| --- | --- | --- |
| `FO:features/fleet-dashboard/charts/dashboard-trend-chart.component.ts` → `DS:projects/comsatel-ds/src/lib/charts/comparison-line-chart.ts`, `comparison-line-chart.stories.ts` | **Crear.** Entradas: etiquetas, serie actual, serie anterior, unidad, nombres accesibles y tema; salida para interacción si se requiere. `null` conserva brechas; no conectar puntos ausentes. | Dos series, una, vacía, `null`, cero, loading/error, período semanal/mensual, texto largo, `sm/md`, tres temas. |
| `FO:features/fleet-dashboard/charts/dashboard-status-chart.component.ts` → `DS:projects/comsatel-ds/src/lib/charts/paired-bar-chart.ts`, `paired-bar-chart.stories.ts` | **Crear.** Pares por categoría, barras horizontales, alto por filas, etiquetas largas, orden estable y leyenda. | 1/varias categorías, cero, falta dato previo, loading/error, período alterno, móvil, tres temas. |
| `FO:features/fleet-dashboard/dashboard-colors.ts` → `DS:projects/comsatel-ds/src/styles/tokens.css`, `src/lib/charts/chart-theme.ts` | **Modificar fundamentos.** Resolver colores CSS en el host del gráfico para respetar tema local; tokens semánticos para actual/anterior, ejes, grilla, tooltip y superficie. Quitar fallbacks hex locales como fuente de diseño. | Claro, oscuro, glass, cambio de tema en vivo, contraste y ausencia de valores sin resolver. |
| `FO:shared/charts/echarts-registration.ts` → `DS:projects/comsatel-ds/src/lib/charts/echarts-registration.ts` | **Crear solo para módulos necesarios**, si se aprueba wrapper. Registro de líneas, barras, grid, tooltip y canvas/SVG según peso y SSR; no incluir módulos no usados. | Render de historia aislada, sin duplicación de registro, error de motor detectable. |

## Accesibilidad y documentación

El `role="img"` y `aria-label` actuales resumen valores, pero una lectura larga de muchos puntos puede ser difícil. Cada wrapper requiere título accesible, resumen corto, tabla de datos alterna y leyenda que distinga período seleccionado/anterior con texto y estilo, no solo opacidad. El tooltip no puede ser la única vía para leer números. `ChartPanel` de 4C aloja selector de período y descripción; el gráfico recibe datos ya calculados y no decide semana/mes.

## Dependencias y aceptación

Tokens de Parte 1, panel de 4C y decisión de distribución preceden a la implementación. Aceptación: historia y demo de ambos tipos con datos, vacío, carga, error y `null`; cambio de tema sin recargar; vista móvil sin corte de categorías; tabla accesible; tamaño del paquete y peers documentados; API exportada sin importar servicios de Fleet. Comparar geometría y series contra el Tablero real, sin copiar `236px`, `barWidth:8` o `grid.left:96` como constantes arbitrarias: justificar cada dimensión con la escala del DS o registrar excepción.

**Pregunta de comprobación:** ¿Qué pierde una persona que no ve el gráfico si solo ofrecemos el tooltip de ECharts?
