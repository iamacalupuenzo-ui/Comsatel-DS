¿Qué cambia al consolidar las escalas sin mover categorías de datos?

## En 30 segundos
La propuesta cambia 6 de 424 instancias de rol en claro y oscuro. ΔE máximo 2.96; promedio 0.03.
Acentos y overlays conservan valores exactos. 14 valores quedan como anclas exactas fuera de escala para respetar los límites; tokens.css sigue intacto.

## Escalas propuestas
| Paso | Hex por tono | Origen por tono |
|---|---|---|
| 050 | gray: #f9fafb<br>brand: #dbe9ff<br>danger: #fff1f3<br>success: #ecfdf3<br>warning: #fffaeb | gray: anclado<br>brand: anclado<br>danger: anclado<br>success: anclado<br>warning: anclado |
| 100 | gray: #f2f4f7<br>brand: #cbdcf6<br>danger: #ffe4e8<br>success: #d1fadf<br>warning: #fef0c7 | gray: anclado<br>brand: anclado<br>danger: anclado<br>success: anclado<br>warning: anclado |
| 200 | gray: #eaecf0<br>brand: #c0d7fc<br>danger: #fecdd6<br>success: #a6f4c5<br>warning: #fedf89 | gray: anclado<br>brand: anclado<br>danger: anclado<br>success: anclado<br>warning: anclado |
| 300 | gray: #d0d5dd<br>brand: #a4c0ec<br>danger: #fea3b4<br>success: #6ce9a6<br>warning: #fec84b | gray: anclado<br>brand: anclado<br>danger: anclado<br>success: anclado<br>warning: anclado |
| 400 | gray: #98a2b3<br>brand: #9bbef3<br>danger: #fd6f8e<br>success: #32d583<br>warning: #fdb022 | gray: anclado<br>brand: anclado<br>danger: anclado<br>success: anclado<br>warning: anclado |
| 500 | gray: #667085<br>brand: #6596e2<br>danger: #f63d68<br>success: #12b76a<br>warning: #f79009 | gray: anclado<br>brand: anclado<br>danger: anclado<br>success: anclado<br>warning: anclado |
| 600 | gray: #475467<br>brand: #3f7ad5<br>danger: #e31b54<br>success: #039855<br>warning: #dc6803 | gray: anclado<br>brand: anclado<br>danger: anclado<br>success: anclado<br>warning: anclado |
| 700 | gray: #344054<br>brand: #1b4079<br>danger: #c01048<br>success: #027a48<br>warning: #b54708 | gray: anclado<br>brand: anclado<br>danger: anclado<br>success: anclado<br>warning: anclado |
| 800 | gray: #1d2939<br>brand: #153565<br>danger: #a11043<br>success: #05603a<br>warning: #93370d | gray: anclado<br>brand: anclado<br>danger: anclado<br>success: anclado<br>warning: anclado |
| 900 | gray: #111827<br>brand: #122a4f<br>danger: #3b0f20<br>success: #054f31<br>warning: #3b2700 | gray: anclado<br>brand: anclado<br>danger: anclado<br>success: anclado<br>warning: anclado |
| 950 | gray: #101828<br>brand: #0c192c<br>danger: #1f0a12<br>success: #032116<br>warning: #1f1500 | gray: anclado<br>brand: anclado<br>danger: anclado<br>success: anclado<br>warning: anclado |

## Valores exactos y revisión
Acentos: orange (200 #fdb022, 400 #dc6803); purple (300 #a78bfa, 400 #8b5cf6); blue (300 #60a5fa, 400 #3b82f6); teal (200 #2ed3b7, 300 #15b79e); lime (200 #86cb3c, 400 #669f2a); pink (300 #f472b6, 300 #ec4899); yellow (100 #facc15, 200 #eab308).
Overlays: --color-primitive-white-alpha-06 rgba(255,255,255,0.06); --color-primitive-white-alpha-10 rgba(255,255,255,0.1); --color-primitive-white-alpha-32 rgba(255,255,255,0.32); --color-primitive-danger-alpha-20 rgba(230,45,85,0.2); --color-primitive-danger-alpha-30 rgba(230,45,85,0.3); --color-primitive-black-alpha-04 rgba(0,0,0,0.04); --color-primitive-black-alpha-08 rgba(0,0,0,0.08); --color-primitive-black-alpha-50 rgba(0,0,0,0.5); --color-primitive-black-alpha-70 rgba(0,0,0,0.7). Blanco y negro: --color-primitive-white y --color-primitive-black.
Anclas fuera de escala: --color-primitive-brand-exact-0f213d #0f213d; --color-primitive-brand-exact-f0f6ff #f0f6ff; --color-primitive-gray-exact-153565 #153565; --color-primitive-gray-exact-f63d68 #f63d68; --color-primitive-gray-exact-f79009 #f79009; --color-primitive-gray-exact-12b76a #12b76a; --color-primitive-brand-exact-3474d8 #3474d8; --color-primitive-gray-exact-0c0e16 #0c0e16; --color-primitive-brand-exact-79a1e0 #79a1e0; --color-primitive-brand-exact-0a121f #0a121f; --color-primitive-gray-exact-c01048 #c01048; --color-primitive-gray-exact-b54708 #b54708; --color-primitive-gray-exact-027a48 #027a48; --color-primitive-brand-exact-4d83d5 #4d83d5.
Método: ΔE euclidiano OKLab × 100; interpolación OKLCH. Contraste WCAG contra base y canvas. 0 instancias a revisar. Detalle en [JSON](n0b-propuesta.json) y [comparación](n0b-comparacion.html).
### Tema claro (0)
### Tema oscuro (0)

## Deuda de contraste previa (Nivel 1)
Estos 53 casos ya tenían bajo contraste y mantienen ΔE 0: --color-border-brand-subtle (claro, mín. 1.74:1); --color-border-brand-subtlest (claro, mín. 1.34:1); --color-border-danger-subtle (claro, mín. 1.73:1); --color-border-danger-subtlest (claro, mín. 1.29:1); --color-border-default (claro, mín. 1.35:1); --color-border-disabled (claro, mín. 1.08:1); --color-border-divider (claro, mín. 1.08:1); --color-border-neutral-bolder (claro, mín. 2.36:1); --color-border-neutral-default (claro, mín. 1.35:1); --color-border-neutral-subtle (claro, mín. 1.08:1); --color-border-neutral-subtlest (claro, mín. 1.01:1); --color-border-success-default (claro, mín. 2.41:1); --color-border-success-subtle (claro, mín. 1.39:1); --color-border-success-subtlest (claro, mín. 1.18:1); --color-border-warning-default (claro, mín. 2.15:1); --color-border-warning-subtle (claro, mín. 1.42:1); --color-border-warning-subtlest (claro, mín. 1.19:1); --color-icon-disabled (claro, mín. 2.36:1); --color-icon-inverse (claro, mín. 1.00:1); --color-icon-neutral-subtlest (claro, mín. 2.36:1); --color-text-base-subtlest (claro, mín. 2.36:1); --color-text-brand-subtle (claro, mín. 4.16:1); --color-text-brand-subtlest (claro, mín. 1.74:1); --color-text-danger-default (claro, mín. 4.23:1); --color-text-danger-subtle (claro, mín. 2.46:1); --color-text-danger-subtlest (claro, mín. 1.73:1); --color-text-disabled (claro, mín. 2.36:1); --color-text-inverse (claro, mín. 1.00:1); --color-text-success-default (claro, mín. 3.42:1); --color-text-success-subtle (claro, mín. 1.75:1); --color-text-success-subtlest (claro, mín. 1.39:1); --color-text-warning-default (claro, mín. 3.20:1); --color-text-warning-subtle (claro, mín. 1.69:1); --color-text-warning-subtlest (claro, mín. 1.42:1); --color-border-brand-subtlest (oscuro, mín. 1.09:1); --color-border-default (oscuro, mín. 1.84:1); --color-border-disabled (oscuro, mín. 1.31:1); --color-border-divider (oscuro, mín. 1.31:1); --color-border-neutral-default (oscuro, mín. 2.51:1); --color-border-neutral-subtle (oscuro, mín. 1.84:1); --color-border-neutral-subtlest (oscuro, mín. 1.31:1); --color-icon-disabled (oscuro, mín. 2.51:1); --color-icon-inverse (oscuro, mín. 1.09:1); --color-icon-neutral-subtlest (oscuro, mín. 2.51:1); --color-text-base-subtle (oscuro, mín. 3.87:1); --color-text-base-subtlest (oscuro, mín. 2.51:1); --color-text-brand-subtlest (oscuro, mín. 1.09:1); --color-text-danger-subtle (oscuro, mín. 4.18:1); --color-text-danger-subtlest (oscuro, mín. 3.13:1); --color-text-disabled (oscuro, mín. 2.51:1); --color-text-inverse (oscuro, mín. 1.09:1); --color-text-success-subtlest (oscuro, mín. 3.56:1); --color-text-warning-subtlest (oscuro, mín. 3.55:1). No se corrigen en 0b-1.

## Pregunta de comprobación
¿Por qué las anclas exactas quedan fuera de la escala?

## Listo 0b-1 v2
