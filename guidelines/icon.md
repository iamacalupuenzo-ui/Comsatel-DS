# Icon

Único punto de entrada para íconos dentro de la librería y del producto. Dibuja un SVG del
registro curado del sistema (101 íconos de Lucide). No se usa otra librería de íconos.

- **Import:** `import { Icon } from 'comsatel-ds';`
- **Selector:** `<cs-icon>`

```html
<cs-icon name="truck" [size]="16" aria-hidden="true"></cs-icon>
```

## Props

<!-- props:start Icon -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/icons/icon.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `name` | `IconName` | requerido | Nombre del ícono en el registro (`icon-registry.ts`). |
| `size` | `number` | `16` | Ancho y alto del SVG en píxeles. |
<!-- props:end -->

El trazo usa `currentColor`, así que el ícono toma el color del texto que lo rodea. Para
cambiarle el color, cambia el `color` del contenedor con un token, no el SVG.

## Registro curado y catálogo completo

- `icon-registry.ts` (`ICON_REGISTRY`) es la **única fuente** para íconos en componentes y
  en producto.
- El catálogo de 1531 íconos de la página de exploración es solo para buscar: nunca se
  mezcla con el registro.
- Para agregar un ícono, copia el contenido real del SVG de Lucide (lo que está entre
  `<svg>` y `</svg>`) al registro con su nombre en kebab-case, y reconstruye la librería
  (`npm run build:lib`). No dibujes un ícono aproximado.

## Accesibilidad (a11y)

- El SVG no lleva `aria-hidden` ni `role` propios. Un ícono decorativo (al lado de un
  texto que ya dice lo mismo) tiene que llevar `aria-hidden="true"` en el host, como hace
  `Modal` con la X de cerrar.
- Un ícono nunca es el nombre accesible de un control: el botón que solo tiene un ícono
  necesita `aria-label` en el botón.
- Un ícono que sí comunica algo por sí solo (un estado sin texto al lado) necesita el
  texto equivalente cerca, visible o con `aria-label` en su contenedor.

<!-- a11y:start Icon -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/icons/icon.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-icon`

No renderiza controles nativos, roles ni atributos ARIA propios, y no maneja teclado: es presentacional.
<!-- a11y:end -->

## Trampas

- `IconName` es la unión de los nombres del registro (`as const`): un nombre inexistente
  escrito en una plantilla o en código tipado **falla en compilación**. Un nombre que llega
  como `string` sin tipar (por ejemplo, desde datos del servidor) no se valida así y se
  dibuja vacío: conviértelo a `IconName` con un mapeo propio.
- `size` es número: usa `[size]="16"`, no `size="16"`.
- El contenido del SVG se inserta con `bypassSecurityTrustHtml` desde el registro interno.
  Nunca construyas un nombre de ícono con texto que venga del usuario.
