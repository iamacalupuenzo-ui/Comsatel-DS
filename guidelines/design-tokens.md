# Design tokens

Tablas, no prosa. Todos los valores salen de `projects/comsatel-ds/src/styles/tokens.css`
y `typography-tokens.css`. En código de producto se usa **siempre** la variable CSS,
nunca el hex ni el píxel suelto.

Los tokens se redefinen por tema en `[data-theme="dark"]`: usar el nombre semántico es
lo que hace que el modo oscuro funcione solo.

## Color: texto

| Token | Value (light) | Use for |
| :-- | :-- | :-- |
| `--color-text-base-boldest` | `#101828` | Títulos de mayor jerarquía |
| `--color-text-base-bolder` | `#1d2939` | Títulos y texto enfatizado |
| `--color-text-base-default` | `#344054` | Texto de cuerpo por defecto |
| `--color-text-base-subtle` | `#667085` | Texto de apoyo, descripciones |
| `--color-text-base-subtlest` | `#98a2b3` | Placeholders, texto deshabilitado visual |
| `--color-text-inverse` | `#ffffff` | Texto sobre fondos sólidos (`-solid`, primary) |
| `--color-text-disabled` | `#98a2b3` | Controles deshabilitados |
| `--color-text-selected` | `#153565` | Texto de un ítem seleccionado |
| `--color-text-brand-default` | `#153565` | Texto de marca |
| `--color-text-danger-default` | `#e31b54` | Mensajes de error |
| `--color-text-warning-default` | `#dc6803` | Mensajes de advertencia |

Cada familia (`brand`, `danger`, `warning`, `success`) sigue la misma escala posicional:
`-subtlest`, `-subtle`, `-default`, `-bolder`.

## Color: fondo y borde

| Token | Value (light) | Use for |
| :-- | :-- | :-- |
| `--color-background-brand-default` | `#1b4079` | Fondo de la acción primaria |
| `--color-background-brand-default-hover` | `#153565` | Su estado hover |
| `--color-background-brand-default-pressed` | `#122a4f` | Su estado pressed |
| `--color-background-danger-default` | `#f63d68` | Fondo de acción destructiva |
| `--color-background-success-default` | `#12b76a` | Fondo de confirmación |
| `--color-background-selected` | `#f0f6ff` | Fila o ítem seleccionado |
| `--color-background-disabled` | `#f2f4f7` | Control deshabilitado |
| `--color-border-default` | `#d0d5dd` | Borde de campos y contenedores |
| `--color-border-divider` | `#eaecf0` | Separadores |
| `--color-border-focused` | `#1b4079` | Anillo de foco |
| `--color-border-selected` | `#153565` | Borde de un ítem seleccionado |

Las superficies por elevación son tokens aparte: `--elevation-surface-default`,
`-raised`, `-overlay`, `-sunken`.

## Espaciado (spacing)

Tres escalas separadas, con los mismos pasos pero usos distintos.

| Token | Value | Use for |
| :-- | :-- | :-- |
| `--layout-padding-2xs` … `--layout-padding-6xl` | 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48px | Padding interno de un componente |
| `--layout-gap-2xs` … `--layout-gap-4xl` | 2, 4, 6, 8, 12, 16, 20, 24, 32px | Separación entre hijos de un flex/grid |
| `--layout-size-2xs` … `--layout-size-3xl` | 16, 20, 24, 32, 40, 48, 56, 64, 80px | Alto/ancho de controles e íconos |

## Radio y borde

| Token | Value | Use for |
| :-- | :-- | :-- |
| `--layout-radius-xs` … `--layout-radius-3xl` | 2, 4, 6, 8, 10, 12, 16px | Esquinas, de control chico a contenedor grande |
| `--layout-radius-full` | `9999px` | Píldoras y avatares |
| `--radius-none`, `--radius-xs` … `--radius-2xl`, `--radius-full` | Alias de `--layout-radius-*` | Lo que usan los componentes en su CSS. No existe `--radius-3xl`: para 16px usa `--layout-radius-3xl`. |
| `--layout-border-thin` / `-thick` / `-thicker` | 1, 2, 4px | Grosor de borde |

## Sombra y z-index

| Token | Value | Use for |
| :-- | :-- | :-- |
| `--shadow-xs` … `--shadow-xl` | 5 pasos | Elevación visual, de card a modal |
| `--elevation-z-index-dropdown` | `100` | Menús y dropdowns |
| `--elevation-z-index-sticky` | `200` | Headers y toolbars pegados |
| `--elevation-z-index-modal` | `300` | Diálogos |
| `--elevation-z-index-overlay` | `400` | Fondo oscurecido |
| `--elevation-z-index-toast` | `500` | Notificaciones |
| `--elevation-z-index-tooltip` | `600` | Tooltips |

Un `z-index` numérico escrito a mano es un bug: rompe el orden acordado del sistema.

## Motion

| Token | Value | Use for |
| :-- | :-- | :-- |
| `--motion-duration-fast` | `100ms` | Hover, foco, cambios de color |
| `--motion-duration-leaving` | `150ms` | Salidas |
| `--motion-duration-medium` | `200ms` | Toggles, reveals chicos |
| `--motion-duration-entering` | `250ms` | Entradas |
| `--motion-duration-slow` | `350ms` | Modales, drawers, cambios de layout |
| `--motion-easing-default` | `cubic-bezier(0.2, 0, 0, 1)` | Movimiento general |
| `--motion-easing-enter` | `cubic-bezier(0, 0, 0.2, 1)` | Algo que entra |
| `--motion-easing-exit` | `cubic-bezier(0.2, 0, 1, 0.9)` | Algo que sale |
| `--motion-easing-spring` | `cubic-bezier(0.15, 1.15, 0.6, 1)` | Rebote intencional |

## Tipografía

Dos familias: `--font-family-heading` (Manrope) para títulos y `--font-family-content`
(Public Sans) para el resto. La escala de tamaños va de `--font-primitive-size-2xs`
(0.625rem) a `--font-primitive-size-9xl` (4rem).

**No escribas `font-size` a mano en un componente.** La tipografía se aplica con el
helper del sistema, que resuelve familia, tamaño, peso, interlineado y tracking juntos:

```ts
import { componentTypography, textStyle } from 'comsatel-ds';

get labelStyle(): Record<string, string> {
  return textStyle(componentTypography.tooltip, 'accent');
}
```

## Accesibilidad (a11y): contraste, foco y movimiento

- **Foco visible:** el anillo de foco usa `--color-border-focused` en toda la librería.
  Nunca quites el `outline` de un control ni lo reemplaces por un color crudo: es un
  token, no un estilo.
- **Contraste:** todo par de texto y fondo cumple 4.5:1 como mínimo, y 3:1 para bordes y
  controles. Se verifica con la fórmula de luminancia relativa de WCAG, no a ojo.
- **El color nunca es la única señal:** un estado de peligro o de éxito lleva texto o
  ícono además del token de color.
- **Movimiento reducido:** `cs-app-layout`, `cs-skeleton`, `cs-accordion`, `cs-motion`,
  `csCollapse` y `csPressScale` respetan `prefers-reduced-motion: reduce`. Una animación
  propia en CSS va dentro de `@media (prefers-reduced-motion: no-preference)`; una con GSAP
  consulta `prefersReducedMotion()` antes de animar.

## Reglas

- En código de producto se usa la variable CSS semántica, nunca el hex ni un valor
  crudo de la paleta primitiva.
- Los valores primitivos (`--font-primitive-*`, `primitive-colors.ts`) son la materia
  prima de los tokens semánticos: no se consumen directamente desde un componente.
- Si un valor no está en estas tablas, es un hueco: se documenta como excepción con un
  comentario explicando por qué, o se pregunta. No se redondea al token más cercano
  cambiando el tamaño visual sin aprobación.
- Cada cambio de color se verifica contra WCAG con la fórmula de luminancia relativa.
  La luminosidad HSL no es un proxy confiable: ya hizo pasar por buenos tres pares que
  en realidad estaban por debajo de 4.5:1.
