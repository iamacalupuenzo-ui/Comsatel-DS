import { Component, computed, signal } from '@angular/core';
import { FilterBar, InputDropdown, type InputDropdownOption } from '@iamacalupuenzo-ui/comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

type BarState = 'default' | 'applied' | 'no-search' | 'no-more' | 'open' | 'narrow';
const STATES: { key: BarState; title: string; intro: string; props: string }[] = [
  { key: 'default', title: 'Por defecto', intro: 'Búsqueda y filtros principales disponibles, sin criterios aplicados.', props: '[hasMoreFilters]="true" [hasActiveFilters]="false"' },
  { key: 'applied', title: 'Con filtros aplicados', intro: 'Un filtro principal y uno secundario activan el contador y «Limpiar filtros».', props: '[moreFiltersCount]="1" [hasActiveFilters]="true"' },
  { key: 'no-search', title: 'Sin búsqueda', intro: 'Úsala cuando la pantalla se filtra solo con criterios estructurados.', props: 'searchLabel=""' },
  { key: 'no-more', title: 'Sin «Más filtros»', intro: 'Úsala cuando todos los filtros caben y son de uso frecuente.', props: '[hasMoreFilters]="false"' },
  { key: 'open', title: 'Panel abierto', intro: 'Abre «Más filtros» para revisar los criterios secundarios. Escape y el clic fuera cierran el panel.', props: '[hasMoreFilters]="true"' },
  { key: 'narrow', title: 'Pantalla angosta', intro: 'Reduce la ventana a 767 px o menos: los campos se apilan y ocupan el ancho disponible.', props: '[hasMoreFilters]="true"' },
];
const STATUS: InputDropdownOption[] = [
  { label: 'Todos los estados', value: '' }, { label: 'Pendiente', value: 'pending' },
  { label: 'En gestión', value: 'managing' }, { label: 'Capturado', value: 'captured' },
];
const GPS: InputDropdownOption[] = [
  { label: 'Todos', value: '' }, { label: 'Con GPS', value: 'with' },
  { label: 'Sin señal', value: 'no-signal' }, { label: 'Sin GPS', value: 'no-gps' },
];
const CONTRACT: InputDropdownOption[] = [
  { label: 'Todos los contratos', value: '' }, { label: 'Vigente', value: 'active' },
  { label: 'No vigente', value: 'expired' },
];

@Component({
  selector: 'app-filter-bar-page',
  imports: [DemoShell, FilterBar, InputDropdown],
  templateUrl: './filter-bar-page.html',
  styleUrl: './filter-bar-page.css',
})
export class FilterBarPage {
  protected readonly statusOptions = STATUS;
  protected readonly gpsOptions = GPS;
  protected readonly contractOptions = CONTRACT;
  protected readonly states = STATES;
  protected readonly controls: ControlDef[] = [
    { kind: 'select', label: 'Estado', key: 'state', options: STATES.map(({ key, title }) => ({ value: key, label: title })), default: 'default' },
  ];
  protected readonly pgState = signal<BarState>('default');
  protected readonly pgInfo = computed(() => STATES.find((state) => state.key === this.pgState()) ?? STATES[0]);
  protected readonly query = signal('');
  protected readonly status = signal('');
  protected readonly gps = signal('');
  protected readonly contract = signal('');
  protected readonly moreCount = computed(() => Number(!!this.gps()) + Number(!!this.contract()));
  protected readonly hasActive = computed(() => !!this.query().trim() || !!this.status() || this.moreCount() > 0);
  protected readonly appliedStatus = signal('pending');
  protected readonly appliedGps = signal('with');
  protected readonly appliedCount = computed(() => Number(!!this.appliedGps()));
  protected readonly appliedHasActive = computed(() => !!this.appliedStatus() || !!this.appliedGps());
  protected clearApplied(): void { this.appliedStatus.set(''); this.appliedGps.set(''); }

  protected onState(s: DemoState): void {
    if (s['state']) {
      const state = s['state'] as BarState;
      this.pgState.set(state);
      this.clear();
      if (state === 'applied') { this.status.set('pending'); this.gps.set('with'); }
    }
  }
  protected clear(): void {
    this.query.set(''); this.status.set(''); this.gps.set(''); this.contract.set('');
  }
  protected pgCode(): string { return this.codeFor(this.pgState()); }
  protected codeFor(key: BarState): string {
    const search = key === 'no-search' ? '' : '\n  searchLabel="Buscar orden o unidad"\n  [searchValue]="busqueda()"\n  (searchChange)="busqueda.set($event)"';
    const more = key === 'no-more' ? '' : '\n  [hasMoreFilters]="true"\n  [moreFiltersCount]="filtrosExtra()"';
    return `<cs-filter-bar ariaLabel="Filtros de capturas"${search}${more}\n  [hasActiveFilters]="hayFiltros()" (clear)="limpiar()">\n  <cs-input-dropdown label="Estado" [options]="estados" [menuFit]="true" [active]="!!estado()" />${key === 'no-more' ? '' : '\n  <div moreFilters>…filtros secundarios…</div>'}\n</cs-filter-bar>`;
  }
}
