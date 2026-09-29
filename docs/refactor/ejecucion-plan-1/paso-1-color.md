¿Qué colores puede consumir el DS sin cambiar el lienzo aprobado?

## En 30 segundos

El lienzo claro sigue en `#f5f5f5`, las superficies interactivas en blanco y la crema como variante. Se añadieron roles de series, grilla, ejes y tooltip para claro, oscuro y contexto glass. El inventario de componentes terminó con cero referencias `var()` sin definición.

## Qué cambió

El commit local `addbe52ca071fd485ab0c9abbfc262461150f3c7` actualizó `projects/comsatel-ds/src/styles/tokens.css`, `src/lib/tokens/all-tokens.data.ts`, `guidelines/design-tokens.md` y las páginas `src/app/pages/color-overview/`, `color-themes/` y `color-semantic/`. También añadió `scripts/inventory-component-vars.mjs` y corrigió nombres inexistentes en `dropdown-item.stories.ts` y `tooltip.stories.ts`. El inventario detectó `--color-icon-brand-default`, `--color-icon-base-subtle` y `--layout-border-medium` entre las referencias sin valor; quedaron definidos con roles existentes. Los nombres locales de Select, DropdownItem y Tooltip se validan en su propio alcance.

El contexto glass se limita a los roles del gráfico; no se presenta como tema completo. En el commit de Input `145e498c8a46ba5dbeab3fa8bc728bcf89b1bb83` se completó `--color-chart-surface` para fijar el fondo de contraste y se añadió `scripts/check-chart-tokens.mjs`; esta ampliación conserva el contrato de color de este paso.

## Verificación y pendientes

`node scripts/inventory-component-vars.mjs`: 1687 referencias revisadas al cerrar este commit, cero sin definición. `npm run check:secondary-tokens`: pasó en claro y oscuro; el menor contraste de texto secundario fue 5.09:1 y el de borde/ícono secundario 3.33:1. Con la superficie adicional, `node scripts/check-chart-tokens.mjs` verificó 12 pares de series, ejes y texto de tooltip en claro, oscuro y glass; el mínimo fue 4.97:1. `git diff --check`: sin errores.

Queda pendiente la revisión visual de las muestras por Claude y la adopción de estos roles en futuros gráficos del DS; ECharts sigue fuera de alcance.

**Pregunta de comprobación:** ¿Qué token usarías para el lienzo claro y cuál para una tarjeta blanca?
