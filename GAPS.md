# Lo que este sistema no tiene

Un agente no distingue entre "esto no existe" y "todavía no lo encontré", así que inventa
un componente y sigue. Este archivo es la diferencia entre las dos cosas.

Mantenlo corto y al día. Cada fila es una decisión, no un pendiente del backlog.

| Qué falta | Qué usar en su lugar | Por qué o estado |
| :-- | :-- | :-- |
| `cs-stepper` | `cs-progress-indicator` | Obsoleto desde 2026-09-11: tenía la misma API. Sigue exportado solo por compatibilidad y no se usa en código nuevo. |
| Estado de error por paso en `ProgressIndicator` | Un `cs-banner` sobre el recorrido que explique qué falló | Pendiente, sin responsable. |
| Navegación por flechas en `cs-menu` | El orden natural de tabulación | Deliberado por ahora: se construye solo si se pide explícitamente. |
| Cola, posición y temporizador de toasts | Un servicio propio de la aplicación que monte y saque cada `cs-toast` | Deliberado: el componente solo dibuja el mensaje. |
| Publicar comsatel-ds en un registro | Consumirlo dentro de este workspace via tsconfig paths (./dist/comsatel-ds) | Pendiente, sin responsable. npm install comsatel-ds no funciona hoy fuera de este repo; no hay paso de publicación (npm/GitHub Packages/registro privado) configurado todavia. |
| Alternativa de teclado para reordenar columnas | Arrastrar la fila con el puntero (mouse/touch) en el panel "Columnas" | Deliberado por ahora: decisión explícita del usuario 2026-09-14. PrimeNG (la referencia funcional) tampoco la tiene, es un gap de accesibilidad conocido en su propio repo. El reordenamiento vive en el panel de columnas de la página de docs de Table, no en cs-table — mouse-only. |

## Reportar un hueco nuevo

Si encuentras algo que no está en esta lista ni en el sistema, agrega una fila en el
mismo cambio:

```bash
npm run gap:report -- "Qué falta" "Qué usar en su lugar" "Por qué o estado"
```

No lo dejes solo en un ticket o en un chat: el próximo agente lee este archivo, no tu
bandeja de entrada.
