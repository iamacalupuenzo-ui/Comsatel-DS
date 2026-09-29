import { Component, ElementRef, computed, input, model, output, viewChild } from '@angular/core';
import { Icon } from '@iamacalupuenzo-ui/comsatel-ds/icons';
import { InputGroupInput } from '@iamacalupuenzo-ui/comsatel-ds/input';
import { MapPanel } from './map-panel';

let nextMapSearchId = 0;

/**
 * Buscador flotante del mapa: un `cs-map-panel` cuyo encabezado es el campo
 * de búsqueda. Contraído queda la píldora con el campo, así se puede seguir
 * escribiendo sin abrir la lista; escribir o hacer clic en el campo lo abre.
 *
 * - Filtros: contenido con `csMapSearchFilters` (van fijos arriba de la lista).
 * - Resultados: contenido por defecto, con `role="listitem"` en cada tarjeta.
 * - `filterCount` muestra el contador de filtros aplicados junto al campo,
 *   visible también contraído, para que no se olvide que la lista está filtrada.
 */
@Component({
  selector: 'cs-map-search',
  imports: [Icon, InputGroupInput, MapPanel],
  host: { class: 'cs-map-search' },
  template: `
    <cs-map-panel [label]="label()" [listLabel]="listLabel()" [expandLabel]="expandLabel()" [collapseLabel]="collapseLabel()" [(open)]="open">
      <div csMapPanelHeader class="cs-map-search__field">
        <cs-icon name="search" [size]="16" aria-hidden="true" />
        <cs-input-group-input
          #field
          class="cs-map-search__input"
          fieldSize="md"
          type="text"
          autocomplete="off"
          [placeholder]="placeholder()"
          [aria-label]="inputLabel()"
          [aria-describedby]="filterCount() ? filtersId : ''"
          [value]="query()"
          (valueChange)="onQuery($event)"
          (enterKey)="open.set(true); searched.emit(query())"
          (click)="open.set(true)"
        />
        @if (query()) {
          <button type="button" class="cs-map-search__clear" [attr.aria-label]="clearLabel()" (click)="clear()">
            <cs-icon name="x" [size]="14" aria-hidden="true" />
          </button>
        }
      </div>
      @if (filterCount()) {
        <span csMapPanelActions class="cs-map-search__filters-badge" [id]="filtersId">
          <cs-icon name="sliders" [size]="12" aria-hidden="true" />
          <span aria-hidden="true">{{ filterCount() }}</span>
          <span class="cs-map-search__sr-only">{{ resolvedFilterDescription() }}</span>
        </span>
      }
      <ng-container ngProjectAs="[csMapPanelToolbar]"><ng-content select="[csMapSearchFilters]" /></ng-container>
      <ng-content />
    </cs-map-panel>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        inline-size: 306px;
        max-inline-size: 100%;
        min-block-size: 0;
        pointer-events: none;
      }
      cs-map-panel { inline-size: 100%; flex: 1 1 auto; }
      .cs-map-search__field {
        display: flex;
        flex: 1 1 auto;
        align-items: center;
        gap: var(--layout-gap-md);
        min-inline-size: 0;
      }
      .cs-map-search__input { flex: 1 1 auto; min-inline-size: 0; }
      .cs-map-search__clear {
        display: grid;
        flex-shrink: 0;
        place-items: center;
        min-inline-size: 24px;
        min-block-size: 24px;
        padding: var(--layout-padding-2xs);
        border: 0;
        border-radius: var(--radius-sm);
        background: transparent;
        color: var(--color-text-base-subtlest);
        font: inherit;
        cursor: pointer;
      }
      .cs-map-search__clear:hover {
        background: var(--color-background-neutral-subtle);
        color: var(--color-text-base-default);
      }
      .cs-map-search__filters-badge {
        display: inline-flex;
        align-items: center;
        gap: var(--layout-gap-2xs);
        block-size: 20px;
        padding-inline: var(--layout-padding-xs);
        border-radius: var(--radius-full);
        background: var(--color-background-neutral-subtle);
        color: var(--color-text-base-subtle);
        font-size: var(--font-size-content-note);
        font-weight: var(--font-weight-accent);
        line-height: 1;
      }
      .cs-map-search__sr-only {
        position: absolute;
        inline-size: 1px;
        block-size: 1px;
        margin: -1px;
        padding: 0;
        overflow: hidden;
        clip: rect(0 0 0 0);
        white-space: nowrap;
        border: 0;
      }
      @media (max-width: 767px) {
        .cs-map-search__clear { min-inline-size: 40px; min-block-size: 40px; }
      }
    `,
  ],
})
export class MapSearch {
  /** Nombre accesible del panel. */
  readonly label = input('Buscar y filtrar unidades');
  /** Nombre accesible del campo. */
  readonly inputLabel = input('Buscar por nombre o código de unidad');
  readonly placeholder = input('Buscar unidades…');
  /** Nombre accesible de la lista de resultados. */
  readonly listLabel = input('Unidades encontradas');
  readonly clearLabel = input('Limpiar búsqueda');
  readonly expandLabel = input('Expandir buscador de unidades');
  readonly collapseLabel = input('Contraer buscador de unidades');
  /** Filtros aplicados; 0 oculta el contador. */
  readonly filterCount = input(0);
  /** Lectura del contador: «2 filtros activos: Con señal; MAF». */
  readonly filterDescription = input('');
  /** Texto buscado. Admite `[(query)]`. */
  readonly query = model('');
  /** Abierto o contraído. Admite `[(open)]`. */
  readonly open = model(true);
  /** Enter en el campo. */
  readonly searched = output<string>();

  protected readonly filtersId = `cs-map-search-${++nextMapSearchId}-filters`;
  private readonly field = viewChild.required('field', { read: ElementRef });
  protected readonly resolvedFilterDescription = computed(() => {
    const count = this.filterCount();
    return this.filterDescription() || `${count} ${count === 1 ? 'filtro activo' : 'filtros activos'}`;
  });

  protected onQuery(value: string): void {
    this.query.set(value);
    if (value) this.open.set(true);
  }

  protected clear(): void {
    this.query.set('');
    this.field().nativeElement.querySelector('input')?.focus();
  }
}
