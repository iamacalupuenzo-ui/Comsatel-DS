¿Qué colores requieren aprobación antes de cerrar los roles semánticos?

## En 30 segundos
Propongo conservar el lienzo humo y ajustar los roles de texto y bordes que comunican contenido o controles.
Los cambios visibles quedan pendientes de aprobación; esta entrega solo documenta decisiones y no modifica `tokens.css`.
## Cambios visibles que Enzo debe aprobar
| Rol y tema | Antes → después | ΔE; contraste nuevo base / canvas |
|---|---|---|
| `--color-border-default` (claro) → `--color-primitive-gray-500` | #d0d5dd → #667085 | 32.79; 4.97:1 / 4.56:1 |
| `--color-border-neutral-bolder` (claro) → `--color-primitive-gray-500` | #98a2b3 → #667085 | 16.56; 4.97:1 / 4.56:1 |
| `--color-border-neutral-default` (claro) → `--color-primitive-gray-500` | #d0d5dd → #667085 | 32.79; 4.97:1 / 4.56:1 |
| `--color-text-brand-subtle` (claro) → `--color-primitive-brand-700` | #3474d8 → #1b4079 | 20.26; 10.21:1 / 9.37:1 |
| `--color-text-danger-default` (claro) → `--color-primitive-danger-700` | #e31b54 → #c01048 | 7.53; 6.16:1 / 5.65:1 |
| `--color-text-danger-subtle` (claro) → `--color-primitive-danger-700` | #fd6f8e → #c01048 | 20.39; 6.16:1 / 5.65:1 |
| `--color-text-success-default` (claro) → `--color-primitive-success-700` | #039855 → #027a48 | 9.11; 5.41:1 / 4.96:1 |
| `--color-text-success-subtle` (claro) → `--color-primitive-success-700` | #32d583 → #027a48 | 26.84; 5.41:1 / 4.96:1 |
| `--color-text-warning-default` (claro) → `--color-primitive-warning-700` | #dc6803 → #b54708 | 10.97; 5.43:1 / 4.98:1 |
| `--color-text-warning-subtle` (claro) → `--color-primitive-warning-700` | #fdb022 → #b54708 | 28.61; 5.43:1 / 4.98:1 |
| `--color-border-default` (oscuro) → `--color-primitive-gray-500` | #344054 → #667085 | 17.50; 3.87:1 / 3.87:1 |
| `--color-border-neutral-default` (oscuro) → `--color-primitive-gray-500` | #475467 → #667085 | 10.23; 3.87:1 / 3.87:1 |
| `--color-text-base-subtle` (oscuro) → `--color-primitive-gray-400` | #667085 → #98a2b3 | 16.56; 7.48:1 / 7.48:1 |
| `--color-text-danger-subtle` (oscuro) → `--color-primitive-danger-500` | #e31b54 → #f63d68 | 5.83; 5.31:1 / 5.31:1 |
## Cambios sin efecto visual
| Ancla y roles actuales | Propuesta | Motivo |
|---|---|---|
| #0f213d: background-brand-bolder-pressed, background-brand-strongest, text-link-pressed | `--color-primitive-brand-deep` | Valor aprobado o identidad tonal específica; ΔE 0, contraste idéntico. |
| #f0f6ff: background-brand-subtlest, background-selected | `--color-primitive-brand-selection-mist` | Valor aprobado o identidad tonal específica; ΔE 0, contraste idéntico. |
| #3474d8: text-brand-subtle | Mover a brand-700 `#1b4079` | Cambio visible y contraste en tabla anterior; retirar ancla después. |
| #79a1e0: background-brand-bolder, background-brand-default-hover | `--color-primitive-brand-raised-light` | Valor aprobado o identidad tonal específica; ΔE 0, contraste idéntico. |
| #0a121f: background-brand-subtlest | `--color-primitive-brand-dark-subtlest` | Valor aprobado o identidad tonal específica; ΔE 0, contraste idéntico. |
| #4d83d5: text-link-visited | `--color-primitive-brand-visited-dark` | Valor aprobado o identidad tonal específica; ΔE 0, contraste idéntico. |
| #0c0e16: background-base, background-canvas, --elevation-surface-sunken | `--color-primitive-neutral-night` | Valor aprobado o identidad tonal específica; ΔE 0, contraste idéntico. |
| #f5f5f5: background-canvas | `--color-primitive-neutral-canvas` | Valor aprobado o identidad tonal específica; ΔE 0, contraste idéntico. |
Las siete anclas conservadas mantienen ΔE 0; `#f5f5f5` queda como `--color-primitive-neutral-canvas` por decisión de Enzo.
## Deuda de contraste: clasificación
El inventario anterior enumera 53 casos (el encargo dice 52); se conserva la lista completa para evitar una omisión.
| Grupo | Casos | Criterio |
|---|---|---|
| DEBE cumplir | 14 | Texto de contenido 4.5:1; borde de control 3:1; propuestas y medidas arriba. |
| EXENTO | 39 | Ver justificación individual debajo. |
- Divisor o acento decorativo: si delimita control, reclasificar a 3:1. border-brand-subtle¹, border-danger-subtle¹, border-divider¹, border-neutral-subtle¹, border-success-default¹, border-success-subtle¹, border-warning-default¹, border-warning-subtle¹, border-divider², border-neutral-subtle².
- Decorativo subtlest: no comunica contenido; si lo hace, reclasificar. border-brand-subtlest¹, border-danger-subtlest¹, border-neutral-subtlest¹, border-success-subtlest¹, border-warning-subtlest¹, icon-neutral-subtlest¹, text-base-subtlest¹, text-brand-subtlest¹, text-danger-subtlest¹, text-success-subtlest¹, text-warning-subtlest¹, border-brand-subtlest², border-neutral-subtlest², icon-neutral-subtlest², text-base-subtlest², text-brand-subtlest², text-danger-subtlest², text-success-subtlest², text-warning-subtlest².
- Inactivo: WCAG exime componentes deshabilitados. border-disabled¹, icon-disabled¹, text-disabled¹, border-disabled², icon-disabled², text-disabled².
- Inverso: se evaluó contra la base equivocada; medir sobre su superficie real. icon-inverse¹, text-inverse¹, icon-inverse², text-inverse².
¹ claro; ² oscuro.
## Roles locales de FleetOperations
| Nombre usado | Rol real propuesto | Evidencia / decisión |
|---|---|---|
| `--app-surface-canvas` | `--color-background-canvas` | Lienzo `#f5f5f5` en `src/styles.css`; mismo rol del DS. |
| `--z-index-tooltip` | `--elevation-z-index-tooltip` | `operations-layout.component.ts`; capa 600 del DS. |
| `--elevation-shadow-raised` | `--shadow-lg` | Sombra de panel elevado; cotejar apariencia en Plan 2. |
| `--font-size-display-sm` | `--font-size-heading-large` | Título h1 de placeholder; falta equivalencia exacta de tamaño. |
| `--font-weight-semibold` | `--font-weight-emphasis` | Peso 600 para énfasis. |
| `--font-size-heading-xs` | `--font-size-heading-small` | h2 de tarjeta; falta equivalencia exacta de tamaño. |
| `--color-text-base-disabled` | `--color-text-disabled` | Estado inactivo del selector. |
Las líneas de altura locales `--font-line-height-display-sm` y `--font-line-height-heading-xs` requieren migrar junto con sus tamaños. Las sustituciones de sombra y tipografía deben cotejarse visualmente en Plan 2.
## Pregunta de comprobación
¿Qué cambio de color necesita aprobación antes de tocar los roles semánticos?
## Listo 1a
