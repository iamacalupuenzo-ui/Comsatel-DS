import { Component, computed, signal } from '@angular/core';
import { FilterBar, InputDropdown, type InputDropdownOption } from '@iamacalupuenzo-ui/comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

const STATUS_OPTIONS: InputDropdownOption[] = [
  { label: 'Todos los estados', value: '' },
  { label: 'Pendiente', value: 'pending' },
  { label: 'En gestión', value: 'managing' },
  { label: 'Capturado', value: 'captured' },
];
const GPS_OPTIONS: InputDropdownOption[] = [
  { label: 'Todos', value: '' },
  { label: 'Con GPS', value: 'with' },
  { label: 'Sin señal', value: 'no-signal' },
  { label: 'Sin GPS', value: 'no-gps' },
];
const CONTRACT_OPTIONS: InputDropdownOption[] = [
  { label: 'Todos los contratos', value: '' },
  { label: 'Vigente', value: 'active' },
  { label: 'No vigente', value: 'expired' },
];

@Component({
  selector: 'app-filter-bar-page',
  imports: [DemoShell, FilterBar, InputDropdown],
  templateUrl: './filter-bar-page.html',
  styleUrl: './filter-bar-page.css',
})
export class FilterBarPage {
  protected readonly statusOptions = STATUS_OPTIONS;
  protected readonly gpsOptions = GPS_OPTIONS;
  protected readonly contractOptions = CONTRACT_OPTIONS;
  protected readonly controls: ControlDef[] = [
    { kind: 'toggle', label: 'Búsqueda', key: 'search', default: true },
    { kind: 'toggle', label: 'Más filtros', key: 'more', default: true },
  ];
  protected readonly showSearch = signal(true);
  protected readonly showMore = signal(true);
  protected readonly query = signal('');
  protected readonly status = signal('');
  protected readonly gps = signal('');
  protected readonly contract = signal('');
  protected readonly moreCount = computed(() => (this.gps() ? 1 : 0) + (this.contract() ? 1 : 0));
  protected readonly hasActive = computed(() => !!this.query().trim() || !!this.status() || this.moreCount() > 0);

  protected onState(s: DemoState): void {
    if (s['search'] !== undefined) this.showSearch.set(!!s['search']);
    if (s['more'] !== undefined) this.showMore.set(!!s['more']);
  }

  protected clear(): void {
    this.query.set('');
    this.status.set('');
    this.gps.set('');
    this.contract.set('');
  }

  protected readonly code = computed(() => {
    const props = ['ariaLabel="Filtros de capturas"'];
    if (this.showSearch()) props.push('searchLabel="Buscar orden o unidad"', 'searchPlaceholder="Buscar por orden o unidad"', '[searchValue]="busqueda()"', '(searchChange)="busqueda.set($event)"');
    if (this.showMore()) props.push('[hasMoreFilters]="true"', '[moreFiltersCount]="filtrosExtra()"');
    props.push('[hasActiveFilters]="hayFiltros()"', '(clear)="limpiar()"');
    const more = this.showMore()
      ? '\n  <div moreFilters>\n    <cs-input-dropdown label="GPS" [options]="gps" [fullWidth]="true" … />\n    <cs-input-dropdown label="Contrato" [options]="contratos" [fullWidth]="true" … />\n  </div>'
      : '';
    return `<cs-filter-bar\n  ${props.join('\n  ')}\n>\n  <cs-input-dropdown label="Estado" [options]="estados" [menuFit]="true" [active]="!!estado()" … />${more}\n</cs-filter-bar>`;
  });
}
