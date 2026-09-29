¿Cómo se prueba que cada componente promovido vive tanto en Storybook como en el sitio del DS?

## En 30 segundos

Cada entrega tiene fuente, exportación, historia y página Angular navegable. Storybook muestra estados reproducibles; el sitio explica propósito, API y comportamiento en una demo real. Se comprueban interacción, temas, geometría y accesibilidad antes de dar un componente por cerrado.

## Convención de implementación

La biblioteca usa `projects/comsatel-ds/src/lib/<nombre>/<nombre>.ts` con `html` y `css` propios cuando corresponda; FleetOperations usa `template`/`styles` inline en sus `.ts`, pero esa convención del consumidor no se copia al DS. Actualizar `projects/comsatel-ds/src/public-api.ts`. Story junto al componente (`<nombre>.stories.ts`), título `Componentes/...`, `Meta`/`StoryObj`, `tags:['autodocs']`, controles explícitos y fixture sin datos de cliente. El story existente `input-dropdown.stories.ts` muestra tamaños y valor largo; `table.stories.ts` muestra carga y vacío, pero no sustituye los nuevos estados solicitados.

El sitio usa `src/app/pages/<nombre>-demo/<nombre>-page.ts/html/css`, `src/app/shared/styles/doc-page.css`, `app.routes.ts` y `src/app/lib/nav.ts`; en la página se usan `DemoShell`, `CodeBlock`, tabla de propiedades y ejemplos en español. Un `<select>` nativo en Playground es error: usa `cs-input-dropdown`. La historia debe reflejar una interacción ya verificada en la página real; el skill `comsatel-design-system/references/storybook-pattern.md` y `page-pattern.md` fijan ese orden. Para gráficos, página `src/app/pages/charts-demo/` con dos ejemplos y enlaces individuales del catálogo.

## Matriz de estados obligatoria

| Familia | Estados base | Estados específicos |
| --- | --- | --- |
| Controles | Default, hover, foco, activo/seleccionado, disabled, error, `sm/md` | Filtro aplicado, texto largo, opción vacía, carga de resultados, teclado. |
| Overlays | Cerrado/abierto, foco, disabled, carga, error, vacío, `sm/md` si existe tamaño | Escape, retorno de foco, scroll, primera/última fila, móvil y z-index. |
| Tarjetas/listas | Sin/con datos, hover, foco, seleccionado, disabled, loading, error, `sm/md` | Fijado independiente, acciones, texto truncado, contador 99+, estados semánticos. |
| Gráficos | Sin/con datos, loading, error, tamaño y temas | Cero, `null`, actual/anterior, leyenda, período, tabla accesible. |

Un estado que no tiene sentido se marca «no aplica» con motivo; no se fabrican props ficticias para llenar la matriz. Los estados de hover y foco se documentan con interacción real y, cuando convenga a la captura visual, con una demo que permite forzarlos sin falsear CSS. Se prueban temas claro/oscuro/glass, 1440×900 y móvil, zoom de texto, teclado, nombre accesible, contraste y alineación mediante `getBoundingClientRect`. La página del sitio explica cuándo usar y cuándo evitar el patrón, API y composición en los módulos correspondientes.

## Puertas de aceptación y orden

Por cada componente: 1) confirmar contrato y tokens; 2) construir biblioteca; 3) exportar y crear demo; 4) probar interacciones en el sitio; 5) escribir stories sobre lo ya verificado; 6) medir paridad con el producto y registrar evidencia; 7) actualizar guías/índice, y notas de versión cuando afecte distribución. Los gates del DS (`npm run check:docs`, `npm run test:ci` y los de tokens/props pertinentes) se aplican en la **futura ejecución en DS**, no en esta fase ni en FleetOperations. No se ejecuta `ng test`, `npm test`, `ng build` ni `tsc` en el producto.

Aceptar solo con URL local de demo y story, estados cubiertos, navegación funcionando, exportación verificada y diferencia residual documentada. Una captura en reposo o un story compilable no bastan para declarar paridad funcional.

**Pregunta de comprobación:** ¿Por qué una historia nueva debe seguir a una interacción comprobada en la página Angular del DS?
