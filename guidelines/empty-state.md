# EmptyState

Estado **vacío**: explica por qué no hay contenido y qué puede hacer la persona. Se usa dentro
de `[emptyState]` de Table o en cualquier zona sin resultados.

- **Import:** `import { EmptyState } from '@iamacalupuenzo-ui/comsatel-ds';`
- **Selector:** `<cs-empty-state>`

```html
<cs-empty-state icon="file-text" title="No encontramos capturas" description="Prueba con otra orden, unidad o estado.">
  <cs-button variant="default" size="sm" (click)="clearFilters()">Limpiar filtros</cs-button>
</cs-empty-state>
```

## Cuándo usarlo

| Caso | Usa | Motivo |
| :-- | :-- | :-- |
| Los filtros no dejan resultados | `EmptyState` con «Limpiar filtros» | La salida está en el mismo lugar del vacío. |
| Todavía no hay registros | `EmptyState` con la acción de crear | Explica el siguiente paso. |
| Falló la carga de una tabla | `error` y `(retry)` de Table | Un error no es un vacío. |

## Props

<!-- props:start EmptyState -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/empty-state/empty-state.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `title` | `string` | requerido | Qué pasó, en una frase: «No encontramos capturas». |
| `description` | `string` | `''` | Qué puede hacer la persona. |
| `icon` | `IconName \| undefined` | `undefined` | Ícono ilustrativo opcional, 40 px en el color de marca. |
<!-- props:end -->

## Accesibilidad

- El host es `role="status"`: el cambio a «sin resultados» se anuncia al filtrar.
- El ícono es decorativo (`aria-hidden`); el significado va en `title`.

<!-- a11y:start EmptyState -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/empty-state/empty-state.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-empty-state`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Roles | `status` |
| Atributos ARIA | `aria-hidden="true"` |
| Compone | `cs-icon` |
<!-- a11y:end -->
