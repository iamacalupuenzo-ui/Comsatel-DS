# Lo que este sistema no tiene

Un agente no distingue entre "esto no existe" y "todavía no lo encontré", así que inventa
un componente y sigue. Este archivo es la diferencia entre las dos cosas.

Mantenlo corto y al día. Cada fila es una decisión, no un pendiente del backlog.

| Qué falta | Qué usar en su lugar | Por qué o estado |
| :-- | :-- | :-- |
| Logos (página de fundamentos) | Nada | Deliberado: es un enlace muerto incluso en el sistema React de referencia. No se construye salvo pedido explícito. |
| Grids (página de fundamentos) | Nada | Deliberado, igual que Logos. |
| List item | Las filas de `cs-menu`, o componer con las piezas existentes | Pendiente, sin responsable. La entrada del nav está marcada `pending: true`. |
| Temas de color (`/foundations/color/themes`) | Los tokens light y dark, que ya funcionan. No hay tema "Glass" | Pendiente, sin responsable. La referencia React también tiene menciones desactualizadas a Glass: hace falta una decisión antes de construir. |
| Tokens explicados, uso en código y uso en diseño (`/foundations/tokens/*`) | `guidelines/design-tokens.md` y `tokens.css` | Pendiente, sin responsable. Son subpáginas de documentación, no funcionalidad faltante. |
| `cs-stepper` | `cs-progress-indicator` | Obsoleto desde 2026-09-11: tenía la misma API. Sigue exportado solo por compatibilidad y no se usa en código nuevo. |
| Estado de error por paso en `ProgressIndicator` | Un `cs-banner` sobre el recorrido que explique qué falló | Pendiente, sin responsable. |
| Navegación por flechas en `cs-menu` | El orden natural de tabulación | Deliberado por ahora: se construye solo si se pide explícitamente. |
| Cola, posición y temporizador de toasts | Un servicio propio de la aplicación que monte y saque cada `cs-toast` | Deliberado: el componente solo dibuja el mensaje. |

## Reportar un hueco nuevo

Si encuentras algo que no está en esta lista ni en el sistema, agrega una fila en el
mismo cambio:

```bash
npm run gap:report -- "Qué falta" "Qué usar en su lugar" "Por qué o estado"
```

No lo dejes solo en un ticket o en un chat: el próximo agente lee este archivo, no tu
bandeja de entrada.
