¿Cómo distingues seleccionar, fijar y enfocar sin depender solo del color?

## En 30 segundos

Los roles de selección existentes cubren las tarjetas; no hace falta otro alias.
Selección conserva check y borde; fijado conserva estrella y orden.
Foco usa un contorno exterior independiente, también cuando hay selección.

## Decisión y evidencia

FleetOperations pedía una superficie seleccionada distinta de marca. El DS ya
expone `--color-background-selected`: compartir un primitivo con marca no
elimina su propósito semántico. Conservar ese nombre permite evolucionar la
selección sin tocar consumidores; otro alias duplicaría el rol.

| Estado | Tokens y señal | Contrato |
| --- | --- | --- |
| Normal cálido | elevation-surface-secondary; text/border-secondary-default | Superficie legible |
| Hover | border-brand-default; shadow-sm | No cambia selección |
| Seleccionado | background/text/border-selected; check | Controlado, aria-pressed |
| Fijado | Estrella, texto y grupo superior | Coexiste con seleccionado |
| Foco | border-focused; layout-border-thick; layout-padding-2xs | Contorno exterior |

Las tarjetas mantienen `layout-border-thin` y suman un inset del mismo grosor
al seleccionarse: total visual de 2 px sin mover contenido. El foco usa
`layout-border-thick` (2 px) y offset `layout-padding-2xs` (2 px).
`shared/focus.css` centraliza ese contrato para FleetUnitList y ActionCard.
Presionado pertenece al botón nativo de cada acción; la tarjeta no simula otro
botón ni cambia selección al presionar sus acciones secundarias.

## Contraste comprobado

`check-secondary-tokens.mjs` calcula pares desde tokens.css. Bordes y foco se
prueban contra fondo seleccionado, superficie cálida y fondo del panel.

| Rol | Claro | Oscuro |
| --- | --- | --- |
| Texto seleccionado / fondo seleccionado | 11.18:1 | 5.89:1 |
| Borde seleccionado, mínimo | 11.15:1 | 3.40:1 |
| Foco, mínimo | 9.37:1 | 4.81:1 |

Cumplen 4.5:1 para texto y 3:1 para indicadores. Las capturas y pruebas de
interacción están en [verificación P0](p0-verificacion.md).

## Evitar regresiones

`npm run check:component-tokens` detecta hex, rgb/hsl, px, tiempos y z-index
literales en CSS reconstruidos; `check:docs` y CI lo ejecutan. Única excepción:
umbral histórico 767px de FleetUnitList, equivalente a md−1; CSS no admite
custom properties en media queries. Su ruta y cantidad están acotadas.

El escaneo es incremental, no certifica todo el repo. La revisión manual cubre
CSS computado, estilos inline, SVG y tablas numéricas de tamaños existentes;
esas tablas pertenecen a la revisión P1 del catálogo de tokens. No se agregaron
colores, tamaños ni tiempos sueltos en este lote.

**Comprobación:** si una tarjeta fijada recibe foco y selección, ¿qué tres
señales deben coexistir?
