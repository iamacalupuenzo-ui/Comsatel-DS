import { Component, TemplateRef, ViewChild, computed, signal } from '@angular/core';
import {
  Avatar, Badge, Button, Icon, Input, InputDropdown, InputGroup, InputGroupAddon, InputGroupInput, Pagination, Skeleton, Table,
  type BadgeVariant, type InputDropdownOption, type SortOrder, type TableColumn, type TableRow,
} from 'comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

type UnitStatus = 'active' | 'stopped' | 'offline';
type LoadState = 'loaded' | 'loading-empty' | 'loading-refetch' | 'empty';

interface FleetUnit {
  id: string;
  name: string;
  plate: string;
  status: UnitStatus;
  driver: string;
  updated: string;
  updatedMinutes: number;
}

const STATUS_LABEL: Record<UnitStatus, string> = { active: 'Activo', stopped: 'Detenido', offline: 'Sin señal' };
const STATUS_VARIANT: Record<UnitStatus, BadgeVariant> = { active: 'success', stopped: 'warning', offline: 'neutral' };
const STATUS_OPTIONS: InputDropdownOption[] = [
  { value: 'all', label: 'Todos los estados' }, { value: 'active', label: 'Activo' },
  { value: 'stopped', label: 'Detenido' }, { value: 'offline', label: 'Sin señal' },
];
const PAGE_SIZE_OPTIONS: InputDropdownOption[] = [{ value: '5', label: '5 por página' }, { value: '10', label: '10 por página' }];
const UNITS: FleetUnit[] = [
  { id: 'u1', name: 'Camión Norte 04', plate: 'ABC-123', status: 'active', driver: 'J. Ramírez', updated: 'hace 2 min', updatedMinutes: 2 },
  { id: 'u2', name: 'Camión Norte 07', plate: 'DEF-456', status: 'stopped', driver: 'M. Torres', updated: 'hace 14 min', updatedMinutes: 14 },
  { id: 'u3', name: 'Furgón Sur 12', plate: 'GHI-789', status: 'offline', driver: 'L. Vega', updated: 'hace 3 h', updatedMinutes: 180 },
  { id: 'u4', name: 'Camión Sur 18', plate: 'JKL-012', status: 'active', driver: 'R. Paredes', updated: 'hace 5 min', updatedMinutes: 5 },
  { id: 'u5', name: 'Furgón Norte 21', plate: 'MNO-345', status: 'active', driver: 'C. Salazar', updated: 'hace 1 min', updatedMinutes: 1 },
  { id: 'u6', name: 'Furgón Centro 09', plate: 'PQR-678', status: 'stopped', driver: 'A. Flores', updated: 'hace 26 min', updatedMinutes: 26 },
  { id: 'u7', name: 'Camión Este 11', plate: 'STU-901', status: 'active', driver: 'D. Huamán', updated: 'hace 7 min', updatedMinutes: 7 },
  { id: 'u8', name: 'Furgón Oeste 15', plate: 'VWX-234', status: 'offline', driver: 'P. Medina', updated: 'hace 8 h', updatedMinutes: 480 },
  { id: 'u9', name: 'Camión Norte 22', plate: 'YZA-567', status: 'active', driver: 'L. Núñez', updated: 'hace 11 min', updatedMinutes: 11 },
  { id: 'u10', name: 'Furgón Sur 03', plate: 'BCD-890', status: 'stopped', driver: 'S. Campos', updated: 'hace 42 min', updatedMinutes: 42 },
  { id: 'u11', name: 'Camión Centro 16', plate: 'EFG-246', status: 'active', driver: 'G. Rojas', updated: 'hace 4 min', updatedMinutes: 4 },
  { id: 'u12', name: 'Furgón Este 06', plate: 'HIJ-135', status: 'offline', driver: 'V. Quispe', updated: 'hace 1 h', updatedMinutes: 60 },
];
const COLUMNS: TableColumn[] = [
  { key: 'unit', label: 'Unidad', isSortable: true, width: '35%' },
  { key: 'status', label: 'Estado', isSortable: true, width: '18%' },
  { key: 'driver', label: 'Conductor', isSortable: true, width: '25%' },
  { key: 'updated', label: 'Actualizado', isSortable: true, width: '22%', align: 'right' },
];

@Component({
  selector: 'app-table-page',
  imports: [Avatar, Badge, Button, DemoShell, Icon, Input, InputDropdown, InputGroup, InputGroupAddon, InputGroupInput, Pagination, Skeleton, Table],
  templateUrl: './table-page.html',
  styleUrl: './table-page.css',
})
export class TablePage {
  protected readonly columns = COLUMNS;
  protected readonly statusLabel = STATUS_LABEL;
  protected readonly statusVariant = STATUS_VARIANT;
  protected readonly statusOptions = STATUS_OPTIONS;
  protected readonly pageSizeOptions = PAGE_SIZE_OPTIONS;
  @ViewChild('unitCell', { static: true }) private unitCellRef!: TemplateRef<unknown>;
  @ViewChild('statusCell', { static: true }) private statusCellRef!: TemplateRef<unknown>;

  protected readonly playgroundControls: ControlDef[] = [
    { kind: 'select', label: 'Carga', key: 'loadState', options: [
      { value: 'loaded', label: 'Datos cargados' }, { value: 'loading-empty', label: 'Carga inicial (skeleton)' },
      { value: 'loading-refetch', label: 'Actualizando datos' }, { value: 'empty', label: 'Sin datos' },
    ], default: 'loaded' },
    { kind: 'toggle', label: 'Paginación', key: 'paginate', default: true },
  ];
  protected readonly loadState = signal<LoadState>('loaded');
  protected readonly paginate = signal(true);
  protected readonly query = signal('');
  protected readonly statusFilter = signal<UnitStatus | 'all'>('all');
  protected readonly rowsPerPage = signal<5 | 10>(5);
  protected readonly page = signal(1);
  protected readonly sortKey = signal('unit');
  protected readonly sortOrder = signal<SortOrder>('asc');
  protected readonly selectedId = signal<string | undefined>(undefined);
  protected readonly guideQuery = signal('');

  protected readonly isLoading = computed(() => this.loadState() === 'loading-empty' || this.loadState() === 'loading-refetch');
  protected readonly hasActiveFilters = computed(() => this.query().trim().length > 0 || this.statusFilter() !== 'all');
  protected readonly filteredUnits = computed(() => {
    if (this.loadState() === 'empty') return [];
    const query = this.query().trim().toLocaleLowerCase();
    const status = this.statusFilter();
    return UNITS.filter((unit) => {
      const matchesQuery = !query || [unit.name, unit.plate, unit.driver].some((value) => value.toLocaleLowerCase().includes(query));
      return matchesQuery && (status === 'all' || unit.status === status);
    });
  });
  protected readonly sortedUnits = computed(() => {
    const key = this.sortKey();
    const order = this.sortOrder();
    const sorted = [...this.filteredUnits()].sort((a, b) => {
      const first = this.sortValue(a, key);
      const second = this.sortValue(b, key);
      return typeof first === 'number' && typeof second === 'number' ? first - second : String(first).localeCompare(String(second), 'es');
    });
    return order === 'desc' ? sorted.reverse() : sorted;
  });
  protected readonly totalPages = computed(() => Math.max(1, Math.ceil(this.sortedUnits().length / this.rowsPerPage())));
  protected readonly visibleUnits = computed(() => {
    const units = this.sortedUnits();
    if (!this.paginate()) return units;
    const start = (this.page() - 1) * this.rowsPerPage();
    return units.slice(start, start + this.rowsPerPage());
  });
  protected readonly rows = computed<TableRow[]>(() => {
    if (this.loadState() === 'loading-empty') return [];
    return this.visibleUnits().map((unit) => ({ key: unit.id, cells: [
      { template: this.unitCellRef, context: { $implicit: unit } },
      { template: this.statusCellRef, context: { $implicit: unit.status } }, unit.driver, unit.updated,
    ] }));
  });
  protected readonly tableSummary = computed(() => {
    const total = this.sortedUnits().length;
    if (this.isLoading()) return 'Cargando unidades';
    if (total === 0) return '0 unidades encontradas';
    if (!this.paginate()) return `${total} unidades encontradas`;
    const first = (this.page() - 1) * this.rowsPerPage() + 1;
    return `${first}–${Math.min(this.page() * this.rowsPerPage(), total)} de ${total} unidades`;
  });
  protected readonly usageCode = `<cs-table\n  caption="Unidades de flota"\n  [columns]="columns"\n  [rows]="rows()"\n  [sortKey]="sortKey()"\n  [sortOrder]="sortOrder()"\n  (sort)="onSort($event)"\n  [isLoading]="isLoading()"\n  minWidth="40rem"\n>\n  <div emptyState>Sin resultados</div>\n</cs-table>`;

  protected onPlaygroundState(state: DemoState): void {
    if (state['loadState']) this.loadState.set(state['loadState'] as LoadState);
    if (typeof state['paginate'] === 'boolean') this.paginate.set(state['paginate']);
    this.ensureValidPage();
  }
  protected setQuery(value: string): void { this.query.set(value); this.page.set(1); }
  protected setStatusFilter(value: string): void { this.statusFilter.set(value as UnitStatus | 'all'); this.page.set(1); }
  protected setRowsPerPage(value: string): void { this.rowsPerPage.set(Number(value) as 5 | 10); this.page.set(1); }
  protected onSort(key: string): void {
    if (this.sortKey() === key) this.sortOrder.set(this.sortOrder() === 'asc' ? 'desc' : 'asc');
    else { this.sortKey.set(key); this.sortOrder.set('asc'); }
    this.page.set(1);
  }
  protected setPage(page: number): void { this.page.set(page); }
  protected selectUnit(id: string): void { this.selectedId.set(id); }
  protected clearFilters(): void { this.query.set(''); this.statusFilter.set('all'); this.page.set(1); }
  protected setGuideQuery(value: string): void { this.guideQuery.set(value); }
  protected initials(name: string): string { return name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase(); }
  protected statusText(status: unknown): string { return STATUS_LABEL[status as UnitStatus]; }
  protected statusBadge(status: unknown): BadgeVariant { return STATUS_VARIANT[status as UnitStatus]; }
  protected rowsPerPageValue(): string { return String(this.rowsPerPage()); }
  private sortValue(unit: FleetUnit, key: string): string | number {
    if (key === 'unit') return unit.name;
    if (key === 'status') return STATUS_LABEL[unit.status];
    if (key === 'driver') return unit.driver;
    return unit.updatedMinutes;
  }
  private ensureValidPage(): void { if (this.page() > this.totalPages()) this.page.set(this.totalPages()); }
}
