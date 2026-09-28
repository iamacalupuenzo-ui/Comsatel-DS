¿Qué se cerró en el Nivel 1 sin cambiar la apariencia?

## En 30 segundos
Los roles de color conservan sus valores. Los bordes claros se mantienen por decisión de Enzo, y el contraste pendiente pasa a una revisión de accesibilidad.

## Decisión y alcance
El borde claro `#d0d5dd` se conserva como excepción consciente a WCAG 1.4.11; se mantiene el token del sistema.
No se aplican los 13 casos «DEBE cumplir» de 
1a-propuesta.md`: el contraste de textos y variantes subtle queda como deuda para una revisión posterior.
Se retiraron dos anclas brand y las seis anclas restantes recibieron nombres de intención sin modificar los colores resueltos.
Snapshot: cero diferencias frente al estado posterior a 0b-2; las seis diferencias con 18f07a5 corresponden al tema oscuro aprobado en 9a70e0c.

## Plan 2: FleetOperations
| Nombre local | Rol del sistema | Pendiente |
|---|---|---|
| `--app-surface-canvas` | `--color-background-canvas` | Migrar |
| `--z-index-tooltip` | `--elevation-z-index-tooltip` | Migrar |
| `--elevation-shadow-raised` | `--shadow-lg` | Cotejar apariencia |
| `--font-size-display-sm` | `--font-size-heading-large` | Cotejar tamaño y línea |
| `--font-weight-semibold` | `--font-weight-emphasis` | Migrar |
| `--font-size-heading-xs` | `--font-size-heading-small` | Cotejar tamaño y línea |
| `--color-text-base-disabled` | `--color-text-disabled` | Migrar |
`--font-line-height-display-sm` y `--font-line-height-heading-xs` se migran con sus tamaños.

## Pregunta de comprobación
¿Qué deuda de contraste queda para la revisión de accesibilidad?
## Listo 1b
