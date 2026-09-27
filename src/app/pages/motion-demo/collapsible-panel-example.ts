import { afterNextRender, ChangeDetectionStrategy, Component, computed, ElementRef, inject, Injector, signal, viewChild } from '@angular/core';
import { Button, Checkbox, Collapse, FleetUnitList, Icon, Input, Popover, type FleetUnit } from '@iamacalupuenzo-ui/comsatel-ds';

// Composición de catálogo: los datos y la búsqueda pertenecen al consumidor.
@Component({
  selector: 'app-collapsible-panel-example',
  imports: [Button, Checkbox, Collapse, FleetUnitList, Icon, Input, Popover],
  templateUrl: './collapsible-panel-example.html',
  styleUrl: './collapsible-panel-example.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(keydown)': 'onKeydown($event)' },
})
export class CollapsiblePanelExample {
  protected readonly open = signal(true);
  protected readonly query = signal('');
  protected readonly activeOnly = signal(false);
  protected readonly filtersOpen = signal(false);
  protected readonly selected = signal<string | null>(null);
  protected readonly pinned = signal<string[]>([]);
  protected readonly canvasClicks = signal(0);
  private readonly injector = inject(Injector);
  private readonly body = viewChild.required<ElementRef<HTMLElement>>('body');
  private readonly toggleButton = viewChild.required<ElementRef<HTMLButtonElement>>('toggleButton');
  private readonly search = viewChild.required('search', { read: ElementRef<HTMLElement> });
  private scrollTop = 0;
  private readonly units: FleetUnit[] = Array.from({ length: 16 }, (_, i) => ({
    id: `demo-${i + 1}`, name: `Unidad ${i + 1}`, status: i % 2 ? 'stopped' : 'active',
    statusLabel: i % 2 ? 'Detenida' : 'En marcha', lastSeen: 'Hace un minuto',
    speed: i % 2 ? '0 km/h' : '35 km/h', battery: '90%', location: 'Ruta de demostración',
  }));
  protected readonly filtered = computed(() => this.units.filter(unit =>
    unit.name.toLocaleLowerCase().includes(this.query().trim().toLocaleLowerCase()) &&
    (!this.activeOnly() || unit.status === 'active')));

  protected setOpen(value: boolean): void {
    if (value === this.open()) return;
    if (!value) {
      this.scrollTop = this.body().nativeElement.scrollTop;
      this.toggleButton().nativeElement.focus();
      this.filtersOpen.set(false);
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
    // El Popover portaleado consume el primer Escape y devuelve foco al filtro.
    if (event.key !== 'Escape' || event.defaultPrevented || this.filtersOpen()) return;
    if (this.open()) { event.preventDefault(); this.setOpen(false); }
  }
  protected touchCanvas(): void { this.canvasClicks.update(value => value + 1); }
}
