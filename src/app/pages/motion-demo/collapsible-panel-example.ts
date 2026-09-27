import { afterNextRender, ChangeDetectionStrategy, Component, computed, ElementRef, inject, Injector, signal, viewChild } from '@angular/core';
import { Collapse, FleetUnitList, Icon, Input, InputDropdown, type FleetUnit } from '@iamacalupuenzo-ui/comsatel-ds';

// Composición de catálogo: los datos y la búsqueda pertenecen al consumidor.
@Component({
  selector: 'app-collapsible-panel-example',
  imports: [Collapse, FleetUnitList, Icon, Input, InputDropdown],
  templateUrl: './collapsible-panel-example.html',
  styleUrl: './collapsible-panel-example.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(keydown)': 'onKeydown($event)' },
})
export class CollapsiblePanelExample {
  protected readonly open = signal(true);
  protected readonly query = signal('');
  protected readonly status = signal('all');
  protected readonly financier = signal('all');
  protected readonly activeFilterCount = computed(() => Number(this.status() !== 'all') + Number(this.financier() !== 'all'));
  protected readonly statusOptions = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'active', label: 'En marcha' },
    { value: 'stopped', label: 'Detenida' },
    { value: 'offline', label: 'Sin señal' },
  ];
  protected readonly financierOptions = [
    { value: 'all', label: 'Todas las financieras' },
    { value: 'norte', label: 'Financiera Norte' },
    { value: 'sur', label: 'Financiera Sur' },
  ];
  protected readonly selected = signal<string | null>(null);
  protected readonly pinned = signal<string[]>([]);
  protected readonly canvasClicks = signal(0);
  private readonly injector = inject(Injector);
  private readonly body = viewChild.required<ElementRef<HTMLElement>>('body');
  private readonly toggleButton = viewChild.required<ElementRef<HTMLButtonElement>>('toggleButton');
  private readonly search = viewChild.required('search', { read: ElementRef<HTMLElement> });
  private scrollTop = 0;
  private readonly units: (FleetUnit & { financier: string })[] = Array.from({ length: 16 }, (_, i) => ({
    financier: i % 4 < 2 ? 'norte' : 'sur',
    id: `demo-${i + 1}`, name: `Unidad ${i + 1}`, status: i % 2 ? 'stopped' : 'active',
    statusLabel: i % 2 ? 'Detenida' : 'En marcha', lastSeen: 'Hace un minuto',
    speed: i % 2 ? '0 km/h' : '35 km/h', battery: '90%', location: 'Ruta de demostración',
  }));
  protected readonly filtered = computed(() => this.units.filter(unit =>
    unit.name.toLocaleLowerCase().includes(this.query().trim().toLocaleLowerCase()) &&
    (this.status() === 'all' || unit.status === this.status()) &&
    (this.financier() === 'all' || unit.financier === this.financier())));

  protected setOpen(value: boolean): void {
    if (value === this.open()) return;
    if (!value) {
      this.scrollTop = this.body().nativeElement.scrollTop;
      // Cierra los overlays compuestos a través de sus disparadores públicos.
      // No desmonta el cuerpo ni modifica el estado interno de los componentes.
      this.body().nativeElement.querySelectorAll<HTMLButtonElement>('button[aria-expanded="true"][aria-haspopup]')
        .forEach(trigger => trigger.click());
      this.toggleButton().nativeElement.focus();
    }
    this.open.set(value);
    if (value) afterNextRender(() => { this.body().nativeElement.scrollTop = this.scrollTop; }, { injector: this.injector });
  }

  protected updateQuery(value: string): void { this.query.set(value); this.setOpen(true); }
  protected clearQuery(): void {
    this.query.set('');
    this.search().nativeElement.querySelector('input')?.focus();
  }
  protected onKeydown(event: KeyboardEvent): void {
    // El primer Escape pertenece al overlay abierto, incluso desde su disparador.
    if (event.key !== 'Escape' || event.defaultPrevented) return;
    if (this.body().nativeElement.querySelector('button[aria-expanded="true"][aria-haspopup]')) return;
    if (this.open()) { event.preventDefault(); this.setOpen(false); }
  }
  protected touchCanvas(): void { this.canvasClicks.update(value => value + 1); }
}
