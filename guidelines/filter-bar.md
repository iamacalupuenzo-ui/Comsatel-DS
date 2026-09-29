# FilterBar

Barra de **filtros** de una pantalla de datos: búsqueda opcional, filtros principales proyectados, «Más filtros»
con contador y panel, y «Limpiar filtros» solo cuando hay algún criterio aplicado. Es controlada: los valores
viven en la pantalla.

- **Import:** `import { FilterBar } from '@iamacalupuenzo-ui/comsatel-ds';`
- **Selector:** `<cs-filter-bar>`

```html
<cs-filter-bar
  ariaLabel="Filtros de capturas"
  searchLabel="Buscar orden o unidad"
  searchPlaceholder="Buscar por orden o unidad"
  [searchValue]="query"
  (searchChange)="query = $event"
  [hasMoreFilters]="true"
  [moreFiltersCount]="extraCount"
  [hasActiveFilters]="hasFilters"
  (clear)="clearFilters()"
>
  <cs-input-dropdown label="Estado" [options]="statusOptions" [menuFit]="true" [active]="!!status"></cs-input-dropdown>
  <div moreFilters>
    <cs-input-dropdown label="GPS" [options]="gpsOptions" [fullWidth]="true" [menuFit]="true"></cs-input-dropdown>
  </div>
</cs-filter-bar>
```

## Reglas

| Decisión | Regla | Motivo |
| :-- | :-- | :-- |
| Filtros principales | Dos o tres, a la vista | Son los que se usan casi siempre. |
| Filtros secundarios | En `moreFilters`, con `[fullWidth]` | El contador dice cuántos hay aplicados, porque no se ven. |
| Selector de un valor | Input dropdown con `[menuFit]` y `[active]` | Ver lineamientos de selectores. |
| Limpiar | Solo con algún criterio aplicado | Un botón que no hace nada confunde. |

Los campos de adentro abren sus propios menús y calendarios. El panel no se cierra al usarlos; se cierra con
Escape, con un clic fuera de él o con el mismo botón.

## Props

<!-- props:start FilterBar -->
<!-- generado por scripts/props.mjs desde projects/comsatel-ds/src/lib/filter-bar/filter-bar.ts: nombre, tipo y default salen del código, la descripción se edita a mano en esta tabla -->

| Prop | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `ariaLabel` | `string` | `''` | Nombre del grupo de filtros para lectores de pantalla. |
| `searchLabel` | `string` | `''` | Label visible de la búsqueda; vacío para no mostrarla. |
| `searchPlaceholder` | `string` | `''` | Placeholder de la búsqueda. |
| `searchValue` | `string` | `''` | Texto actual de la búsqueda. |
| `searchId` | `string` | autogenerado | Id del campo de búsqueda. |
| `clearSearchLabel` | `string` | `'Limpiar búsqueda'` | Nombre accesible del botón que limpia la búsqueda. |
| `hasMoreFilters` | `boolean` | `false` | Muestra «Más filtros» con el contenido marcado con moreFilters. |
| `moreFiltersLabel` | `string` | `'Más filtros'` | Texto del botón y nombre del panel. |
| `moreFiltersCount` | `number` | `0` | Filtros secundarios aplicados; se muestra entre paréntesis y activa el botón. |
| `hasActiveFilters` | `boolean` | `false` | Hay algún criterio aplicado: muestra «Limpiar filtros». |
| `clearLabel` | `string` | `'Limpiar filtros'` | Texto del botón de limpiar. |
| `searchChange` | `EventEmitter<string>` | n/a | Texto escrito en la búsqueda. |
| `clear` | `EventEmitter<void>` | n/a | Pedido de limpiar todos los filtros. |
<!-- props:end -->

## Accesibilidad

- La barra es un `role="group"` con el nombre de `ariaLabel`.
- La búsqueda tiene label visible enlazado con `for`.
- «Más filtros» expone `aria-haspopup="dialog"`, `aria-expanded` y `aria-controls`; el panel es `role="dialog"`.

<!-- a11y:start FilterBar -->
<!-- generado por scripts/a11y.mjs desde projects/comsatel-ds/src/lib/filter-bar/filter-bar.ts: no editar a mano, corre npm run docs:a11y -->

#### Contrato a11y generado desde el código: `cs-filter-bar`

| Aspecto | Qué hace el código |
| :-- | :-- |
| Elementos nativos | `label`, `button` |
| Roles | `group`, `dialog` |
| Atributos ARIA | `aria-hidden="true"`, `aria-haspopup="dialog"`, `aria-label`, `aria-expanded`, `aria-controls` |
| Clic afuera | Escucha `document:click` para cerrarse |
| Compone | `cs-input-group`, `cs-input-group-addon`, `cs-icon`, `cs-input-group-input`, `cs-input-group-clear`, `cs-popover`, `cs-button` |
<!-- a11y:end -->
