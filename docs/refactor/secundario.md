¿Cómo incorporamos superficies cálidas sin confundirlas con selección ni cambiar todos los componentes a la vez?

## En 30 segundos

El secundario cálido ya tiene escala y roles propios; el azul conserva marca, selección y foco.
Esta fase agrega tokens claros y oscuros, sin cambiar componentes ni publicar el paquete.
Las siguientes prioridades son Collapse, InputDropdown y Card; el inventario guía cada entrega.

## Decisión y arquitectura

FleetOperations repetía tres colores sin token: panel `#f8f5ed`, tarjeta/control
`#fcfaf4` y énfasis `#efe9dc`. Se conservan exactamente como pasos 100, 050 y
200 de `secondary`. Los pasos siguientes prolongan su matiz crema hacia tierras
oscuras, con luminancia decreciente; 600 se ajusta para sostener texto en el
estado presionado oscuro. Es una extensión tonal diseñada, no una escala
perceptualmente equidistante ni una extracción de Figma.

Primitivos invariantes: `primitiveColors.secondary` y
`--color-primitive-secondary-*` en `tokens.css`, sincronizados por comprobación
automática. El producto consume roles semánticos con alias `var()`.

| Paso | Valor | Función en la escala |
| --- | --- | --- |
| 050 | `#fcfaf4` | Superficie clara / texto oscuro |
| 100 | `#f8f5ed` | Panel claro |
| 200 | `#efe9dc` | Énfasis claro / indicador oscuro |
| 300 | `#ddd3bd` | Interacción clara |
| 400 | `#c4b596` | Presionado de énfasis claro |
| 500 | `#a79570` | Paso intermedio reservado |
| 600 | `#7b6948` | Presionado de énfasis oscuro |
| 700 | `#685a3d` | Borde claro / interacción oscura |
| 800 | `#493f2b` | Texto claro / énfasis oscuro |
| 900 | `#30291c` | Superficie oscura |
| 950 | `#211c13` | Panel oscuro |

`secondary` designa temperatura; no modifica Button secundario ni selección.
Fijar conserva estrella y agrupación; seleccionar, check y azul. Evaluar una
superficie seleccionada dedicada sigue pendiente: `--color-background-selected`
ya existe.

| Token público | Claro → oscuro | Uso |
| --- | --- | --- |
| `--elevation-surface-secondary` | 050 → 900 | Tarjeta/control cálido |
| `--color-background-secondary-subtlest` | 100 → 950 | Panel/fondo sutil |
| `--color-background-secondary-subtle` | 200 → 800 | Insignia/énfasis |
| `--color-background-secondary-subtlest-hover` | 200 → 800 | Hover del panel/control |
| `--color-background-secondary-subtlest-pressed` | 300 → 700 | Presionado del panel/control |
| `--color-background-secondary-subtle-hover` | 300 → 700 | Hover del énfasis |
| `--color-background-secondary-subtle-pressed` | 400 → 600 | Presionado del énfasis |
| `--color-border-secondary-default` | 700 → 200 | Límite necesario del control |
| `--color-text-secondary-default` | 800 → 050 | Texto sobre cualquiera de estos fondos |
| `--color-icon-secondary-default` | 700 → 200 | Indicador necesario |

Los cremas entre sí no alcanzan 3:1: usa borde secundario para identificar
controles y señales no cromáticas para estados. `glass` hereda tokens; requiere
revisión propia al migrar componentes.

## Contraste comprobado

`npm run check:secondary-tokens` calcula luminancia relativa sRGB y contraste
`(Lmayor + 0.05) / (Lmenor + 0.05)` desde el CSS real, sin redondear para aprobar.
Comprueba cada texto, borde e ícono contra las siete superficies/estados y
comprueba que reposo, hover y presionado sean distintos en cada familia.

| Combinación | Mínimo claro | Mínimo oscuro |
| --- | --- | --- |
| Texto / todas las superficies (≥4.5:1) | 5.12:1 | 5.09:1 |
| Borde e ícono / todas las superficies (≥3:1) | 3.33:1 | 4.39:1 |

Estas cifras cubren los pares nuevos opacos. No certifican texto genérico,
opacidad, selección azul o foco de componentes futuros: se medirán al migrarlos.

## Inventario vivo

El [inventario completo](inventario.md) cubre los 56 componentes/directivas
públicos, demos de mapa, sistema completo de colores y brechas del producto.
Cada brecha actualiza una fila: pendiente, en curso o hecho con hash del commit
verificado. Prioridades: Collapse, InputDropdown y FleetUnitList/Card.

## Evidencia y límites de esta fase

Fuentes: `docs/investigacion-componentes-capturas.md`,
`docs/estados-seleccion-buscador.md` y `docs/ajustes-ui-buscador.md` del producto
FleetOperations, leídas sin editarlo; skill `comsatel-design-system` y criterios
`angular-product-builder/references/ui-principles.md`.

La ruta autorizada prevalece sobre rutas históricas del skill, sin conflicto
con AGENTS.md. Los gates funcionales/DOM/visuales quedan para cada componente:
esta fase solo agrega tokens sin consumidores. El coordinador autorizó 0.3.0
local, no publicada.

Implementación confirmada en `3dfb750`; las dos referencias externas del skill
se actualizaron en UTF-8 y no forman parte del commit de este repositorio.

Verificación realizada: `npm ci --legacy-peer-deps`, `npm run build:lib`,
`npm run check:docs` (17 pruebas de validadores), `npm run test:ci` (2 pruebas)
y `npm run build-storybook`: todos finalizaron correctamente. Contraste incluido
en `check:docs`; inventario comprobado contra los 56 exports decorados.
Storybook conserva advertencias de tamaño y archivos no utilizados.
Se corrigió el
tratamiento de espacios en rutas de dos validadores usando `fileURLToPath`:
los archivos compilados existían, pero `%20` provocaba falsos archivos ausentes.

**Pregunta de comprobación:** ¿Qué debe seguir identificando una tarjeta fijada
cuando también está seleccionada, aunque ambas usen la nueva familia cálida?
