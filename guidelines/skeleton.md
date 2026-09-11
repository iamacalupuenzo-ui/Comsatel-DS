# Skeleton

Único indicador de carga del sistema. Donde se esperan datos se dibuja un Skeleton con la
forma aproximada del contenido, no un spinner ni un texto de "cargando". Así la pantalla
no salta cuando los datos llegan.

- **Import:** `import { Skeleton } from 'comsatel-ds';`
- **Selector:** `<cs-skeleton>`
- **Clase raíz emitida:** `.cs-skeleton`

```html
<cs-skeleton variant="circle" [width]="32"></cs-skeleton>
<cs-skeleton variant="text" width="60%"></cs-skeleton>
<cs-skeleton variant="rectangle" [height]="120"></cs-skeleton>
```

## Props

<!-- props:start Skeleton -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/skeleton/skeleton.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `width` | `string \| number \| undefined` | `undefined` | Ancho. Un número se interpreta en píxeles; un texto se usa tal cual (`'60%'`). |
| `height` | `string \| number \| undefined` | `undefined` | Alto, con la misma regla que `width`. |
| `variant` | `'text' \| 'rectangle' \| 'circle'` | `'text'` | Forma del placeholder y su radio. |
<!-- props:end -->

Sin `width` ni `height`, cada variante tiene su tamaño por defecto: `text` ocupa todo el
ancho con 12px de alto, `rectangle` mide 80px de alto y `circle` es un círculo de 32px.
Los 12px de `text` no tienen token equivalente: es una excepción documentada en el código.

## Accesibilidad (a11y)

- El host lleva `aria-hidden="true"`: el lector de pantalla ignora el Skeleton por
  completo. Eso es correcto para la forma dibujada, pero significa que **el Skeleton solo
  no anuncia que algo está cargando**.
- Si lo usas suelto, marca el contenedor con `aria-busy="true"` mientras carga y anuncia
  el cambio de estado en una región `aria-live`. `Table` ya lo hace por dentro con
  `isLoading`.
- La animación de brillo se detiene con `prefers-reduced-motion: reduce`.

<!-- a11y:start Skeleton -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/skeleton/skeleton.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-skeleton`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Atributos ARIA | `aria-hidden="true"` |
<!-- a11y:end -->

## Trampas

- **No reemplaces el Skeleton con un spinner** ni con un texto de carga: es el patrón
  único del sistema.
- Antes de dibujar filas de carga a mano, revisa si el componente ya tiene su estado:
  `Table` y `TableTree` usan `isLoading` y dibujan los Skeleton solos.
- Un Skeleton que no se parece al contenido real no cumple su función: acércate a la
  cantidad de líneas y a la forma de lo que va a llegar.
