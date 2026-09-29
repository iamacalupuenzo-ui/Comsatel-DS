import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Icon, InputDropdown, MapSearch, formatDateTime } from '@iamacalupuenzo-ui/comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';
import { DEMO_UNITS, type DemoUnit } from './map-demo-data';

type SearchState = 'open' | 'collapsed' | 'filtered' | 'typing' | 'empty';
interface SearchDemo { key: SearchState; title: string; intro: string; props: string; open: boolean; query: string; status: string; financiera: string }
const STATES: SearchDemo[] = [
  { key: 'open', title: 'Abierto', intro: 'Campo, filtros fijos y la lista de unidades con scroll propio.', props: '[(open)]="open"', open: true, query: '', status: 'all', financiera: 'all' },
  { key: 'collapsed', title: 'Contraído', intro: 'Queda la píldora con el campo: se puede seguir escribiendo, y escribir la vuelve a abrir.', props: '[open]="false"', open: false, query: '', status: 'all', financiera: 'all' },
  { key: 'filtered', title: 'Con filtros', intro: 'El contador de filtros aplicados se ve junto al campo, también contraído, para no olvidar que la lista está filtrada.', props: '[filterCount]="2"', open: true, query: '', status: 'route', financiera: 'MAF' },
  { key: 'typing', title: 'Con búsqueda', intro: 'Con texto, aparece la X para limpiarlo; la lista se filtra mientras se escribe.', props: '[(query)]="query"', open: true, query: 'ABC', status: 'all', financiera: 'all' },
  { key: 'empty', title: 'Sin resultados', intro: 'Nada coincide: un mensaje corto dentro de la lista. Limpiar la búsqueda o los filtros lo resuelve.', props: '[(query)]="query"', open: true, query: 'ZZZ', status: 'all', financiera: 'all' },
];

const STATUS_OPTIONS = [
  { value: 'all', label: 'Todos los estados' },
  { value: 'route', label: 'Con señal' },
  { value: 'offline', label: 'Sin señal' },
];
const FINANCIERA_OPTIONS = [
  { value: 'all', label: 'Todas las financieras' },
  { value: 'Santander', label: 'Santander' },
  { value: 'MAF', label: 'MAF' },
];

interface SearchModel { open: boolean; query: string; status: string; financiera: string }

@Component({
  selector: 'app-map-search-page',
  imports: [DemoShell, Icon, InputDropdown, MapSearch, NgTemplateOutlet],
  templateUrl: './map-search-page.html',
  styleUrls: ['./map-demo.css', './map-search-page.css'],
})
export class MapSearchPage {
  protected readonly states = STATES;
  protected readonly statusOptions = STATUS_OPTIONS;
  protected readonly financieraOptions = FINANCIERA_OPTIONS;
  protected readonly formatDateTime = formatDateTime;
  protected readonly controls: ControlDef[] = [
    { kind: 'select', label: 'Estado', key: 'state', options: STATES.map(({ key, title }) => ({ value: key, label: title })), default: 'open' },
  ];
  protected readonly pgState = signal<SearchState>('open');
  protected readonly pgInfo = computed(() => STATES.find((s) => s.key === this.pgState()) ?? STATES[0]);
  protected readonly selectedId = signal<string | null>(null);
  /** Un modelo por caja, así cada demo es interactiva por separado. */
  protected readonly models = signal<Record<string, SearchModel>>({
    playground: this.fromState(STATES[0]),
    ...Object.fromEntries(STATES.map((s) => [s.key, this.fromState(s)])),
  });

  private fromState(s: SearchDemo): SearchModel {
    return { open: s.open, query: s.query, status: s.status, financiera: s.financiera };
  }

  protected model(key: string): SearchModel {
    return this.models()[key];
  }
  protected patch(key: string, change: Partial<SearchModel>): void {
    this.models.update((all) => ({ ...all, [key]: { ...all[key], ...change } }));
  }

  protected onState(s: DemoState): void {
    if (!s['state']) return;
    this.pgState.set(s['state'] as SearchState);
    this.patch('playground', this.fromState(this.pgInfo()));
  }

  protected results(key: string): DemoUnit[] {
    const { query, status, financiera } = this.model(key);
    const q = query.trim().toLowerCase();
    return DEMO_UNITS.filter(
      (unit) =>
        (!q || unit.plate.toLowerCase().includes(q) || unit.engine.toLowerCase().includes(q)) &&
        (status === 'all' || (status === 'route') === unit.signal) &&
        (financiera === 'all' || unit.financiera === financiera),
    );
  }
  protected filterCount(key: string): number {
    const { status, financiera } = this.model(key);
    return (status !== 'all' ? 1 : 0) + (financiera !== 'all' ? 1 : 0);
  }
  protected filterDescription(key: string): string {
    const { status, financiera } = this.model(key);
    const labels = [
      status !== 'all' ? STATUS_OPTIONS.find((o) => o.value === status)?.label : null,
      financiera !== 'all' ? financiera : null,
    ].filter(Boolean);
    return `${labels.length} ${labels.length === 1 ? 'filtro activo' : 'filtros activos'}: ${labels.join('; ')}`;
  }

  protected codeFor(state: SearchDemo): string {
    const attrs = ['[(query)]="query"', '[(open)]="open"', '[filterCount]="activeFilters()"', '[filterDescription]="filtersDescription()"'];
    return `<cs-map-search\n  ${attrs.join('\n  ')}\n>\n  <div csMapSearchFilters class="filters">\n    <cs-input-dropdown size="sm" leadingIcon="tag" aria-label="Filtrar por estado" [options]="statusOptions" [(value)]="status" [active]="status() !== 'all'" [fullWidth]="true" />\n    <cs-input-dropdown size="sm" leadingIcon="sliders" aria-label="Filtrar por financiera" [options]="financieraOptions" [(value)]="financiera" [active]="financiera() !== 'all'" [fullWidth]="true" />\n  </div>\n  @for (unit of results(); track unit.id) {\n    <div role="listitem" class="unit-card">…</div>\n  } @empty {\n    <p role="status">Sin resultados</p>\n  }\n</cs-map-search>\n<!-- Propiedades de este estado: ${state.props} -->`;
  }
}
