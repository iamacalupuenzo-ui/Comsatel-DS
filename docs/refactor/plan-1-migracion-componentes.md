¿Qué piezas de FleetOperations deben convertirse en componentes públicos del Comsatel DS y cuáles deben permanecer como composición del producto?

## En 30 segundos

El DS ya ofrece los controles principales, pero le faltan contratos para filtros aplicados, fecha sola, autocompletado, paneles de mapa y gráficos comparativos. La ejecución sigue ahora el [marco atómico](plan-1/marco-atomico.md): Primitivos → Semánticos → Átomos → Moléculas → Organismos → Plantillas → Páginas de referencia, con validación entre niveles. La lógica de órdenes, telemetría y datos queda como contexto de los ejemplos, no como API del DS.

## Recursos

- [Marco atómico — orden, puertas e inventario completo](plan-1/marco-atomico.md)
- [Parte 0 — Método y matriz](plan-1/parte-0-metodo.md)
- [Parte 1 — Tokens y fundamentos](plan-1/parte-1-tokens.md)
- [Parte 2 — Controles básicos](plan-1/parte-2-basicos.md)
- [Parte 3 — Compuestos](plan-1/parte-3-compuestos.md)
- [Parte 4A — Capturas, carga masiva y Recuperos](plan-1/parte-4a-operaciones.md)
- [Parte 4B — Mapa, Bitácora, Seguimiento, vista de recupero y Notificaciones](plan-1/parte-4b-mapa.md)
- [Parte 4C — Tablero](plan-1/parte-4c-tablero.md)
- [Parte 5 — Gráficos](plan-1/parte-5-graficos.md)
- [Parte 6 — Storybook y sitio](plan-1/parte-6-documentacion.md)
- [Parte 7 — Brechas registradas](plan-1/parte-7-brechas.md)

## Alcance y criterio

Este plan se basa en el código de FleetOperations al 28 de septiembre de 2026 y en el worktree `design-system` de `@iamacalupuenzo-ui/comsatel-ds` 0.3.0 local. El inventario histórico de Capturas describe la API instalada 0.2.2: cada brecha se vuelve a cotejar con el código actual del DS antes de ejecutarla. Se leyeron `CLAUDE.md`, `docs/lineamientos-estructura-componentes.md`, `docs/investigacion-componentes-capturas.md`, el API público, tokens, historias, sitio y `docs/refactor/`, incluidas las capturas sin seguimiento de Git. Los prefijos `FO:`, `Producto:` y `DS:` de las partes significan, respectivamente, `src/app/` del producto, la raíz del producto y la raíz del worktree del DS; cada fila contiene rutas exactas relativas a esas raíces.

La regla de promoción es una API reutilizable sin inyectar servicios de FleetOperations. Los organismos reciben datos y emiten intenciones; el producto conserva filtros de negocio, transiciones, permisos, mapeo, proveedores GPS y navegación. `map-tiles.ts` y `shared/charts/echarts-registration.ts` son infraestructura, no controles visuales; se revisan como dependencias, sin copiarlos a la biblioteca por inercia. Las tablas de estas partes tienen tres columnas como máximo.

## Orden de ejecución

El [marco atómico](plan-1/marco-atomico.md) es el eje: Nivel 0 Primitivos → 1 Semánticos → 2 Átomos → 3 Moléculas → 4 Organismos → 5 Plantillas → 6 Páginas de referencia. Ningún nivel empieza antes de validar el anterior. Las partes 0–7 conservan detalle por módulo y sirven como evidencia dentro del nivel correspondiente; Storybook y el sitio se actualizan junto a cada pieza, con cierre editorial en Nivel 6. Los pasos ya ejecutados de color, espaciados e Input vuelven a pasar por el mapeo a primitivas y la comparación de valores computados, sin repetir su implementación.

## Riesgos y decisiones para Enzo

1. **Superficie de modal.** Recomiendo exponer `surface="default|secondary"` con predeterminado blanco y mantener la crema solo como opción, porque el lienzo aprobado es humo `#f5f5f5` con tarjetas blancas.
2. **Gráficos.** Recomiendo dos envoltorios Angular de ECharts con `echarts` y `ngx-echarts` como peer opcional explícito, sin imponer el motor a consumidores sin gráficos. Confirmar esta decisión de distribución antes de implementarla.
3. **Organismos de dominio.** Recomiendo nombres genéricos y entradas tipadas; «orden de captura», «financiera» o «GPS principal» se muestran en ejemplos, mientras reglas y servicios siguen en el producto.
4. **Notificaciones sin datos observables.** Recomiendo obtener una instancia real de `fleet-notification-card` y el caso de unidad fijada antes de declarar paridad visual; el reporte `paridad-p0.md` no pudo medirlos.
5. **Tabla con columna fija y filtros.** Recomiendo extender `Table` de forma compatible, con pruebas de apilamiento y teclado, antes de promover las tablas de Capturas y Recuperos.

Los riesgos de mayor impacto son copiar un estado local que encubre un bug del DS, convertir un organismo en dependencia de un service de producto, y alterar la interacción al «simplificar» filtros visibles. El informe `docs/refactor/paridad-p0.md` ya documentó esa última regresión y su posterior corrección; la aceptación exige medir la versión actual, no asumir que el primer rechazo sigue vigente.

## Siguiente plan

El siguiente plan (Plan 2) será la migración in situ de los componentes ya creados en el sistema de diseño hacia el producto FleetOperations.

**Pregunta de comprobación:** ¿Por qué el buscador de unidades debe exponer selección y resultados como contrato del DS, pero no importar el servicio de flota del producto?
