¿Qué valores de rol cambiaron al consolidar los primitivos de color?

## En 30 segundos
Se aplicó la propuesta v2: 6 roles oscuros cambiaron y 0 roles claros o glass cambiaron.
El JSON aprobado contiene 6 cambios de valor, aunque el encargo menciona 10; no se inventaron otros 4.
Los roles usan primitivos y las verificaciones dieron cero literales, alias circulares y referencias indefinidas.

## Primitivos finales
Pasos de las cinco escalas, en orden: 050, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950.
- Gray: #f9fafb, #f2f4f7, #eaecf0, #d0d5dd, #98a2b3, #667085, #475467, #344054, #1d2939, #111827, #101828.
- Brand: #dbe9ff, #cbdcf6, #c0d7fc, #a4c0ec, #9bbef3, #6596e2, #3f7ad5, #1b4079, #153565, #122a4f, #0c192c.
- Danger: #fff1f3, #ffe4e8, #fecdd6, #fea3b4, #fd6f8e, #f63d68, #e31b54, #c01048, #a11043, #3b0f20, #1f0a12.
- Success: #ecfdf3, #d1fadf, #a6f4c5, #6ce9a6, #32d583, #12b76a, #039855, #027a48, #05603a, #054f31, #032116.
- Warning: #fffaeb, #fef0c7, #fedf89, #fec84b, #fdb022, #f79009, #dc6803, #b54708, #93370d, #3b2700, #1f1500.
- Blanco y negro: #ffffff, #000000. Secundario crema: escala 050–950 conservada intacta.
- Blue 300/400: #60a5fa/#3b82f6; purple 300/400: #a78bfa/#8b5cf6; teal 200/300: #2ed3b7/#15b79e.
- Lime 200/400: #86cb3c/#669f2a; pink 300/400: #f472b6/#ec4899; yellow 100/200: #facc15/#eab308.
- Orange 200/400: referencias a warning-400/600 (#fdb022/#dc6803), sin duplicar literales.
- Alfa: white 06/10/32, black 04/08/50/70 y danger 20/30, con los rgba exactos de la propuesta.

## Anclas que quedaron
Brand: #0f213d, #f0f6ff, #3474d8, #79a1e0, #0a121f, #4d83d5.
Neutral: #0c0e16 y #f5f5f5. #30291c usa secondary-900; las anclas que duplicaban escalas se eliminaron.

## Roles que cambiaron
Los seis cambios, todos en oscuro: `--color-border-brand-subtle` y `--color-text-brand-subtle` #4d83d5 → #3f7ad5; `--color-background-disabled` #1a1d2e → #111827; `--color-background-brand-default` #4981d7 → #3f7ad5; `--color-background-brand-boldest-pressed` y `--color-background-brand-strongest-hover` #e0eafa → #dbe9ff.
El pedido menciona 10 roles, pero `n0b-propuesta.json` solo autoriza estos 6 cambios. Los otros 4 no están definidos en la propuesta v2.

## Verificación
Snapshot antes/después: 212 roles por contexto; claro 0, oscuro 6 aprobados, glass 0; ningún cambio adicional.
Roles con literal: 0. Referencias `var()` sin definir: 0. Alias circulares: 0.
Inventario de componentes: 1724 referencias `var()` verificadas, 0 indefinidas.
`all-tokens.data.ts`: se actualizaron los 5 roles modificados que figuran allí; el sexto no aparece en ese archivo.

## Pregunta de comprobación
¿Por qué el reporte registra seis cambios de valor y no diez?

## Listo 0b-2
