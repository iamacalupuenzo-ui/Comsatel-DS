¿Había que cambiar la escala de espaciados para igualar FleetOperations?

## En 30 segundos

No se encontró una brecha que justifique cambiarla. El producto ya usa los pasos de padding, gap, radio, sombra y capas del DS. Los 10 y 14 px sin token exacto se mantienen explícitos.

## Qué cambió

El commit local `5717883d2e4532c062d79e2610781fdc50c1a6a2` documentó la medición en `guidelines/design-tokens.md`, `src/app/pages/spacing/spacing-page.html` y `src/app/pages/effects/effects-page.html`. No cambió ningún valor de token.

El DS define padding `0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48 px` y gap `0, 2, 4, 6, 8, 12, 16, 20, 24, 32 px`. Los radios van de 2 a 16 px más `full`; los alias `--radius-*` cubren hasta 12 px. Las sombras son `--shadow-xs` a `--shadow-xl`; las capas son base 0, raised 1, dropdown 100, sticky 200, modal 300, overlay 400, toast 500 y tooltip 600.

## Verificación y pendientes

La lectura de `capture-order-toolbar.component.ts`, `fleet-map-search.component.ts` y `side-drawer.component.ts` del producto confirmó 10 px en filtros, `--shadow-xl` en menús y cajón lateral, `--radius-sm`/`--radius-lg` y `--elevation-z-index-modal` para el cajón. `INPUT_FIELD_TOKENS` conserva 10 px en `sm/md` y 14 px en `lg`; no se redondearon. `git diff --check`: sin errores.

Queda pendiente una medición visual en navegador a 1440×900 y ancho móvil por parte de Claude; no se ejecutó el producto ni se cambió su código.

**Pregunta de comprobación:** ¿Por qué se conserva un padding de 10 px aunque la escala salte de 8 a 12 px?
