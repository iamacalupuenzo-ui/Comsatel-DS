# Badge

Etiqueta corta de estado o conteo, no interactiva. Acompaña a otro elemento; nunca es
el sujeto de la acción.

- **Import:** `import { Badge } from 'comsatel-ds';`
- **Selector:** `<cs-badge>`
- **Clase raíz emitida:** `.cs-badge`

```html
<cs-badge variant="success" size="md">Activo</cs-badge>
```

## Props

<!-- props:start Badge -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/badge/badge.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `variant` | `'neutral' \| 'brand' \| 'success' \| 'warning' \| 'danger' \| 'neutral-solid' \| 'brand-solid' \| 'success-solid' \| 'warning-solid' \| 'danger-solid' \| 'outline'` | `'neutral'` | Color y tratamiento. Las `-solid` son de fondo pleno; el resto son sutiles. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Altura, padding y tipografía. |
| `pill` | `boolean` | `false` | Radio completamente redondeado en vez del radio del sistema. |
<!-- props:end -->

El contenido va proyectado:

```html
<cs-badge variant="danger-solid" [pill]="true">3</cs-badge>
```

## Accesibilidad (a11y)

- Es un contenedor de texto sin rol ni foco: no es interactivo y no entra en el orden
  de tabulación. Si necesitas que el usuario haga clic, usa `Button`, no un Badge.
- El color solo no comunica el estado: el texto del badge tiene que decirlo
  ("Activo", "Vencido"), no confiar en que `variant="danger"` se interprete.
- Si el badge es un conteo que cambia solo (notificaciones), anuncia el cambio desde
  el contenedor que lo envuelve con `aria-live`; Badge no lo hace por su cuenta.

<!-- a11y:start Badge -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/badge/badge.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-badge`

No renderiza controles nativos, roles ni atributos ARIA propios, y no maneja teclado: es presentacional.
<!-- a11y:end -->

## Badge o Tag

`Badge` es estado de un objeto ("Activo", "Vencido"). `Tag` es una etiqueta de
clasificación con valor propio, acepta ícono y tiene su propia escala de severidad.
Si el texto describe *en qué estado está* algo, es Badge.

## Trampas

- No proyecta íconos con espaciado propio: si necesitas ícono dentro de la etiqueta,
  el componente correcto es `Tag` (`icon`), no Badge.
- `pill` cambia solo el radio, no el tamaño: un badge de un dígito no se vuelve
  circular por sí solo.
