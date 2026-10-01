import { afterRenderEffect, Component, computed, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import {
  FleetUnitList,
  type FleetUnit,
  type FleetUnitAction,
  type FleetUnitActionEvent,
  type FleetUnitListAppearance,
  type FleetUnitStatus,
  type FleetUnitVehicleType,
} from '@iamacalupuenzo-ui/comsatel-ds/fleet-unit-list';
import { Icon } from '@iamacalupuenzo-ui/comsatel-ds/icons';
import { CodeBlock } from '../../shared/docs/code-block';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

const STATUS_LABEL: Record<FleetUnitStatus, string> = { active: 'En marcha', stopped: 'Detenida', offline: 'Sin señal' };

function unit(
  plate: string, engine: string, vehicleType: FleetUnitVehicleType, status: FleetUnitStatus,
  lastReportAt: string, speed: string, battery: string, location: string, alert?: string,
): FleetUnit {
  return {
    id: plate.toLowerCase(), name: plate, plate, engine, vehicleType, status, statusLabel: STATUS_LABEL[status],
    gps: status === 'offline' ? 'off' : 'on', ignition: status === 'active' ? 'on' : 'off',
    lastReportAt, lastSeen: 'Sin reporte', speed, battery, location, alert,
  };
}

const UNITS: FleetUnit[] = [
  unit('BKL-482', '4D56UAF8823', 'truck', 'active', '2026-10-01T10:53:00', '62 km/h', '88%', 'Av. Argentina, Callao'),
  unit('F3R-917', 'G4FLPV559935', 'car', 'active', '2026-10-01T10:52:00', '38 km/h', '91%', 'Av. Javier Prado, San Isidro'),
  unit('ACX-205', 'ISB6.7-30411', 'bus', 'stopped', '2026-10-01T10:41:00', '0 km/h', '54%', 'Terminal Norte, Lima'),
  unit('D7M-641', 'JF16E2089714', 'motorcycle', 'active', '2026-10-01T10:53:00', '45 km/h', '76%', 'Av. Brasil, Breña'),
  unit('V2P-330', 'HFC4DB21D1S41', 'truck', 'offline', '2026-09-30T18:20:00', '—', '12%', 'Última ubicación: Av. Faucett', 'La unidad no reporta desde hace 16 horas.'),
  unit('T9H-058', 'SFG15TA220530', 'car', 'stopped', '2026-10-01T09:15:00', '0 km/h', '67%', 'Av. La Marina, San Miguel'),
  unit('AWQ-774', '4A91KDC4645', 'car', 'active', '2026-10-01T10:50:00', '51 km/h', '83%', 'Panamericana Sur, km 18'),
  unit('C5N-186', 'ISF3.8-77120', 'bus', 'active', '2026-10-01T10:53:00', '57 km/h', '95%', 'Vía Expresa, La Victoria'),
];

/** Ejemplos de la sección Estados: cada uno guarda su selección y sus fijadas. */
type StateKey = 'default' | 'selected' | 'pinned' | 'disabled' | 'filled' | 'telemetry';

@Component({
  selector: 'app-fleet-unit-list-page',
  imports: [CodeBlock, FleetUnitList, Icon, DemoShell],
  templateUrl: './fleet-unit-list-page.html',
  styleUrl: './fleet-unit-list-page.css',
})
export class FleetUnitListPage {
  protected readonly units = UNITS;
  protected readonly shortUnits = UNITS.slice(0, 4);
  protected readonly disabledUnits = this.shortUnits.map((item) => item.id === 'acx-205' ? { ...item, disabled: true } : item);
  protected readonly controls: ControlDef[] = [
    { kind: 'select', label: 'Estado', key: 'state', options: [{ value: 'default', label: 'Por defecto' }, { value: 'selected', label: 'Seleccionada' }, { value: 'pinned', label: 'Fijadas' }, { value: 'disabled', label: 'Fila deshabilitada' }], default: 'default' },
    { kind: 'select', label: 'Apariencia', key: 'appearance', options: [{ value: 'outlined', label: 'Con borde' }, { value: 'filled', label: 'Relleno' }], default: 'outlined' },
    { kind: 'select', label: 'Barra de scroll', key: 'scrollbar', options: [{ value: 'hidden', label: 'Sin barra' }, { value: 'visible', label: 'Con barra' }], default: 'hidden' },
    { kind: 'toggle', label: 'Seleccionable', key: 'selectable', default: true },
    { kind: 'toggle', label: 'Fijable', key: 'pinnable', default: true },
    { kind: 'toggle', label: 'Fijadas pegadas', key: 'stickyPinned', default: true },
    { kind: 'toggle', label: 'Telemetría', key: 'showTelemetry', default: false },
  ];
  protected readonly appearance = signal<FleetUnitListAppearance>('outlined');
  protected readonly scrollbar = signal<'hidden' | 'visible'>('hidden');
  protected readonly showScrollHint = signal(false);
  private readonly panel = viewChild<ElementRef<HTMLElement>>('panel');
  private readonly panelContent = viewChild<ElementRef<HTMLElement>>('panelContent');
  protected readonly selectable = signal(true);
  protected readonly pinnable = signal(true);
  protected readonly stickyPinned = signal(true);
  protected readonly showTelemetry = signal(false);
  protected readonly selectedId = signal<string | null>(null);
  protected readonly pinnedIds = signal<string[]>([]);
  protected readonly pgState = signal('default');
  protected readonly following = signal<string[]>([]);
  protected readonly lastAction = signal('');

  constructor() {
    const observer = new ResizeObserver(() => this.updateScrollHint());
    inject(DestroyRef).onDestroy(() => observer.disconnect());
    afterRenderEffect(() => {
      this.playgroundUnits();
      this.pinnedIds();
      this.scrollbar();
      const panel = this.panel()?.nativeElement;
      const content = this.panelContent()?.nativeElement;
      observer.disconnect();
      if (!panel || !content) return;
      observer.observe(panel);
      observer.observe(content);
      this.updateScrollHint();
    });
  }

  protected updateScrollHint(): void {
    const panel = this.panel()?.nativeElement;
    if (!panel || this.scrollbar() === 'visible') {
      this.showScrollHint.set(false);
      return;
    }
    this.showScrollHint.set(panel.scrollHeight > panel.clientHeight &&
      Math.ceil(panel.scrollTop + panel.clientHeight) < Math.floor(panel.scrollHeight));
  }

  /** Acciones del producto: el menú las muestra después de Fijar y de la acción de detalle. */
  protected readonly actions = (item: FleetUnit): FleetUnitAction[] => [
    this.following().includes(item.id)
      ? { label: 'Dejar de seguir', value: 'unfollow', icon: 'eye-off' }
      : { label: 'Seguir unidad', value: 'follow', icon: 'eye' },
    { label: 'Centrar en mapa', value: 'center', icon: 'locate-fixed', disabled: item.gps === 'off' },
    { label: 'Copiar ubicación', value: 'copy', icon: 'copy' },
  ];

  protected readonly states: { key: StateKey; title: string; intro: string }[] = [
    { key: 'default', title: 'Por defecto', intro: 'Cada fila muestra el tipo de vehículo, la señal GPS, el encendido, la placa con su motor y el último reporte.' },
    { key: 'selected', title: 'Seleccionada', intro: 'La fila activa cambia de fondo y de borde, y suma una barra al inicio.' },
    { key: 'pinned', title: 'Fijadas', intro: 'Las unidades fijadas llevan una estrella y forman un grupo aparte, arriba y separado por una línea.' },
    { key: 'disabled', title: 'Fila deshabilitada', intro: 'La unidad sigue visible, atenuada, sin selección ni acciones.' },
    { key: 'filled', title: 'Relleno', intro: 'Sin borde y con fondo neutro: úsalo cuando la lista vive dentro de una superficie blanca ya delimitada.' },
    { key: 'telemetry', title: 'Con telemetría', intro: 'El menú agrega el estado, la alerta y la telemetría debajo de las acciones. La fila no cambia.' },
  ];
  private readonly stateSelection = signal<Record<StateKey, string | null>>({ default: null, selected: 'bkl-482', pinned: null, disabled: null, filled: 'f3r-917', telemetry: null });
  private readonly statePins = signal<Record<StateKey, string[]>>({ default: [], selected: [], pinned: ['acx-205'], disabled: [], filled: [], telemetry: [] });

  protected stateSelected(key: StateKey): string | null { return this.stateSelection()[key]; }
  protected statePinned(key: StateKey): string[] { return this.statePins()[key]; }
  protected selectIn(key: StateKey, id: string | null): void { this.stateSelection.update((all) => ({ ...all, [key]: id })); }
  protected pinIn(key: StateKey, ids: string[]): void { this.statePins.update((all) => ({ ...all, [key]: ids })); }
  protected stateCode(key: StateKey): string {
    const props = ['[units]="unidades"', '[selectedId]="seleccionada"', '(selectedIdChange)="seleccionada = $event"'];
    if (key === 'pinned') props.push('[pinnable]="true"', '[pinnedIds]="fijadas"', '(pinnedIdsChange)="fijadas = $event"');
    if (key === 'filled') props.push('appearance="filled"');
    if (key === 'telemetry') props.push('[showTelemetry]="true"');
    return `<cs-fleet-unit-list\n  ${props.join('\n  ')}\n/>`;
  }

  protected onState(s: DemoState): void {
    if (s['state'] && s['state'] !== this.pgState()) {
      this.pgState.set(String(s['state']));
      this.selectedId.set(s['state'] === 'selected' ? 'bkl-482' : null);
      this.pinnedIds.set(s['state'] === 'pinned' ? ['acx-205', 'awq-774'] : []);
    }
    if (s['appearance']) this.appearance.set(s['appearance'] as FleetUnitListAppearance);
    if (s['scrollbar']) this.scrollbar.set(s['scrollbar'] as 'hidden' | 'visible');
    if (s['selectable'] !== undefined) this.selectable.set(!!s['selectable']);
    if (s['pinnable'] !== undefined) this.pinnable.set(!!s['pinnable']);
    if (s['stickyPinned'] !== undefined) this.stickyPinned.set(!!s['stickyPinned']);
    if (s['showTelemetry'] !== undefined) this.showTelemetry.set(!!s['showTelemetry']);
  }

  protected onAction(event: FleetUnitActionEvent): void {
    const { unit: item, action } = event;
    if (action.value === 'follow') this.following.update((ids) => [...ids, item.id]);
    if (action.value === 'unfollow') this.following.update((ids) => ids.filter((id) => id !== item.id));
    if (action.value === 'center') this.selectedId.set(item.id);
    this.lastAction.set(`«${action.label}» en ${item.plate}`);
  }

  protected onDetail(item: FleetUnit): void {
    this.lastAction.set(`«Ver bitácora» en ${item.plate}`);
  }

  protected readonly playgroundUnits = computed(() =>
    this.pgState() === 'disabled' ? this.units.map((item) => item.id === 'acx-205' ? { ...item, disabled: true } : item) : this.units);

  protected readonly code = computed(() => {
    const props = ['[units]="unidades"', '[selectedId]="seleccionada"', '(selectedIdChange)="seleccionada = $event"'];
    if (this.pinnable()) props.push('[pinnable]="true"', '[pinnedIds]="fijadas"', '(pinnedIdsChange)="fijadas = $event"');
    if (!this.selectable()) props.push('[selectable]="false"');
    if (!this.stickyPinned()) props.push('[stickyPinned]="false"');
    if (this.showTelemetry()) props.push('[showTelemetry]="true"');
    if (this.appearance() !== 'outlined') props.push(`appearance="${this.appearance()}"`);
    props.push('detailLabel="Ver bitácora"', '(detailClick)="abrirBitacora($event)"', '[actions]="acciones"', '(actionSelect)="ejecutar($event)"');
    return `<cs-fleet-unit-list\n  ${props.join('\n  ')}\n/>`;
  });

  protected readonly unitCode = `const unidades: FleetUnit[] = [{
  id: 'bkl-482', name: 'BKL-482', plate: 'BKL-482', engine: '4D56UAF8823',
  vehicleType: 'truck', gps: 'on', ignition: 'on', lastReportAt: '2026-10-01T10:53:00',
  status: 'active', statusLabel: 'En marcha', lastSeen: 'Sin reporte',
  speed: '62 km/h', battery: '88%', location: 'Av. Argentina, Callao',
}];

// Fijas para todas las unidades, o una función que las resuelve por unidad.
acciones = (unidad: FleetUnit): FleetUnitAction[] => [
  { label: 'Centrar en mapa', value: 'center', icon: 'locate-fixed', disabled: unidad.gps === 'off' },
  { label: 'Copiar ubicación', value: 'copy', icon: 'copy' },
];

ejecutar({ unit, action }: FleetUnitActionEvent) {
  if (action.value === 'center') this.centrar(unit);
}`;
}
