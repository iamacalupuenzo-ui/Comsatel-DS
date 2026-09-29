# PageHeader

Encabezado de una pantalla: título, descripción y las acciones principales a la derecha.

- **Import:** `import { PageHeader } from '@iamacalupuenzo-ui/comsatel-ds';`
- **Selector:** `<cs-page-header>`

```html
<main aria-labelledby="capture-title">
  <cs-page-header titleId="capture-title" title="Capturas" description="Consulta y gestiona las órdenes de captura.">
    <cs-button variant="primary" size="sm">Carga masiva de capturas</cs-button>
  </cs-page-header>
</main>
```

## Reglas

| Decisión | Regla | Motivo |
| :-- | :-- | :-- |
| Título | Un solo `PageHeader` por pantalla | Es el `h1` de la página. |
| Acciones | Una principal (`primary`) y, si hace falta, una secundaria | La jerarquía se pierde con más de dos. |
| Pantalla angosta | Hasta 960 px las acciones bajan; hasta 767 px se apilan | El título conserva todo el ancho. |

## Props

<!-- props:start PageHeader -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/page-header/page-header.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `title` | `string` | requerido | Título de la pantalla; se renderiza como h1. |
| `description` | `string` | `''` | Una línea que explica para qué sirve la pantalla. |
| `titleId` | `string` | `''` | Id del h1, para usarlo en aria-labelledby. |
<!-- props:end -->

## Accesibilidad

- El título es un `h1`. Con `titleId`, la sección o el `<main>` lo usan en `aria-labelledby`.
- Las acciones mantienen el orden de lectura: después del título y la descripción.

<!-- a11y:start PageHeader -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/page-header/page-header.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-page-header`

No renderiza controles nativos, roles ni atributos ARIA propios, y no maneja teclado: es presentacional.
<!-- a11y:end -->
