¿Qué cambió en los primitivos sin alterar su valor?
## En 30 segundos

El Nivel 0 queda cerrado para tokens sin color. `--radius-none` ahora apunta a
`--layout-radius-none`; los 78 valores previos por contexto permanecen idénticos.
## Ejecución

Espaciado, radios y bordes quedaron identificados como primitivos en `tokens.css`.
Los demás alias `--radius-*` ya apuntaban a `--layout-radius-*` mediante `var()`.
Los 10 px de padding y los 14 px de `INPUT_FIELD_TOKENS` siguen como excepciones
exactas, sin nuevos pasos ni redondeos. Sombras, capas y motion quedaron agrupados
como primitivos de efecto y movimiento, sin editar sus valores.

La guía documenta la cadena fuente `typography.mjs` → puerto `typography.ts` →
`typography-tokens.css` generado, y distingue los primitivos tipográficos de
los roles. El CSS generado no se modificó.

`node scripts/snapshot-tokens.mjs` comparó los valores resueltos de `--layout-*`,
`--radius-*`, `--shadow-*`, `--elevation-z-index-*` y `--motion-*` contra
`9a70e0c`: 78 tokens previos idénticos en light, dark y glass; cero diferencias.
El nuevo `--layout-radius-none` conserva exactamente los 0 px del alias previo.

## Cierre del Nivel 0

Nivel 1: revisar las anclas fuera de escala brand `#0f213d`, `#f0f6ff`,
`#3474d8`, `#79a1e0`, `#0a121f`, `#4d83d5`; neutral `#0c0e16` y `#f5f5f5`.
Después, resolver los roles semánticos pendientes contra sus primitivos.
¿Qué alias de radio cambió de literal a `var()`?

## Listo 0c
