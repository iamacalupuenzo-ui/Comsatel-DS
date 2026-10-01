import { NgTemplateOutlet } from '@angular/common';
import { afterEveryRender, signal, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, inject, input, output } from '@angular/core';
import { type AccordionType } from '@iamacalupuenzo-ui/comsatel-ds/accordion';
import { DropdownItemComponent } from '@iamacalupuenzo-ui/comsatel-ds/dropdown';
import type { DropdownItem } from '@iamacalupuenzo-ui/comsatel-ds/dropdown';
import { formatDateTime, type DateInput } from '@iamacalupuenzo-ui/comsatel-ds/format';
import { Popover } from '@iamacalupuenzo-ui/comsatel-ds/popover';
import { Icon } from '@iamacalupuenzo-ui/comsatel-ds/icons';
import type { IconName } from '@iamacalupuenzo-ui/comsatel-ds/icons';
import { Tag, type TagSeverity } from '@iamacalupuenzo-ui/comsatel-ds/tag';

export type FleetUnitStatus = 'active' | 'stopped' | 'offline';
export type FleetUnitListAppearance = 'outlined' | 'filled';
/** Tipo de vehículo: decide el ícono del avatar de la fila. */
export type FleetUnitVehicleType = 'car' | 'truck' | 'bus' | 'motorcycle';
/** Estado de un indicador de la fila (señal GPS o encendido). */
export type FleetUnitIndicator = 'on' | 'off';
/** Acción del menú de una unidad: la misma forma que un ítem de Dropdown. */
export type FleetUnitAction = DropdownItem;
/** Acciones fijas para todas las unidades o una función que las resuelve por unidad. */
export type FleetUnitActions = readonly FleetUnitAction[] | FleetUnitActionsResolver;
export type FleetUnitActionsResolver = (unit: FleetUnit) => readonly FleetUnitAction[];

export interface FleetUnit {
  id: string;
  name: string;
  status: FleetUnitStatus;
  statusLabel: string;
  lastSeen: string;
  speed: string;
  battery: string;
  location: string;
  diagnostics?: string;
  alert?: string;
  /** Conserva la unidad visible cuando su integración aún no está disponible. */
  disabled?: boolean;
  /** Placa: título de la fila. Sin placa, el título es `name`. */
  plate?: string;
  /** Motor u otro identificador secundario, en la misma línea que la placa. */
  engine?: string;
  /** Ícono del avatar. Por defecto, `truck`. */
  vehicleType?: FleetUnitVehicleType;
  /** Señal GPS. Sin valor se deduce de `status`: `offline` es sin señal. */
  gps?: FleetUnitIndicator;
  /** Encendido. Sin valor se deduce de `status`: solo `active` es encendido. */
  ignition?: FleetUnitIndicator;
  /** Último reporte; se muestra con el formato de fecha y hora del sistema. Sin valor, la fila muestra `lastSeen`. */
  lastReportAt?: DateInput;
}

/** Acción elegida en el menú de una unidad. */
export interface FleetUnitActionEvent {
  unit: FleetUnit;
  action: FleetUnitAction;
}

interface TelemetryField {
  key: 'speed' | 'battery' | 'location' | 'diagnostics';
  label: string;
  icon: IconName;
}

interface MenuEntry {
  kind: 'pin' | 'detail' | 'action';
  item: FleetUnitAction;
}

const STATUS_SEVERITY: Record<FleetUnitStatus, TagSeverity> = {
  active: 'success',
  stopped: 'warn',
  offline: 'secondary',
};

const STATUS_ICON: Record<FleetUnitStatus, IconName> = {
  active: 'activity',
  stopped: 'circle-pause',
  offline: 'wifi-off',
};

const VEHICLE_ICON: Record<FleetUnitVehicleType, IconName> = {
  car: 'car',
  truck: 'truck',
  bus: 'bus',
  motorcycle: 'bike',
};

const TELEMETRY_FIELDS: TelemetryField[] = [
  { key: 'speed', label: 'Velocidad', icon: 'gauge' },
  { key: 'battery', label: 'Batería', icon: 'battery' },
  { key: 'location', label: 'Ubicación', icon: 'map-pin' },
  { key: 'diagnostics', label: 'Diagnóstico', icon: 'wrench' },
];

let nextFleetUnitListId = 0;

/** Organismo para la lectura y acción rápida sobre unidades de flota. */
@Component({
  selector: 'cs-fleet-unit-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DropdownItemComponent, Icon, NgTemplateOutlet, Popover, Tag],
  templateUrl: './fleet-unit-list.html',
  styleUrl: './fleet-unit-list.css',
})
export class FleetUnitList {
  @Input({ required: true }) units: FleetUnit[] = [];
  /** @deprecated Sin efecto: la lista ahora es plana. */
  @Input() type: AccordionType = 'single';
  /** @deprecated Sin efecto: la lista ahora es plana. */
  @Input() defaultExpandedIds: string[] = [];
  /** @deprecated Sin efecto: la lista ahora es plana. */
  @Input() expandedIds?: string[];
  /** Texto de la acción de detalle del menú. Vacío para omitirla. */
  @Input() detailLabel = 'Ver detalle';
  /** Cambia solo la superficie de lectura; la jerarquía y la interacción son iguales. */
  @Input() appearance: FleetUnitListAppearance = 'outlined';
  /** @deprecated Desde 0.3.5: la superficie crema se descartó y se eliminará en 0.4.0. No la uses. */
  readonly surface = input<'default' | 'secondary'>('default');
  readonly selectable = input(true);
  readonly pinnable = input(false);
  readonly selectedId = input<string | null>(null);
  readonly pinnedIds = input<string[]>([]);
  /** Acciones propias del producto en el menú de cada unidad. */
  readonly actions = input<FleetUnitActions>([]);
  /** Deja el grupo de fijadas pegado arriba mientras el contenedor se desplaza. */
  readonly stickyPinned = input(true);
  /** Agrega el estado, la alerta y la telemetría debajo de las acciones del menú. */
  readonly showTelemetry = input(false);
  @Output() readonly expandedIdsChange = new EventEmitter<string[]>();
  @Output() readonly detailClick = new EventEmitter<FleetUnit>();
  readonly selectedIdChange = output<string | null>();
  readonly pinnedIdsChange = output<string[]>();
  readonly actionSelect = output<FleetUnitActionEvent>();

  protected readonly actionUnitId = signal<string | null>(null);
  /** Última unidad con el menú abierto: solo ella monta su contenido, y lo conserva mientras se cierra. */
  protected readonly menuUnitId = signal<string | null>(null);
  protected readonly uid = `cs-fleet-unit-list-${++nextFleetUnitListId}`;
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private actionTrigger?: HTMLElement;
  private pendingFocus = false;
  private refocusUnitId: string | null = null;

  constructor() {
    afterEveryRender(() => {
      this.restoreTriggerFocus();
      if (!this.pendingFocus || !this.actionUnitId()) return;
      const panel = this.menuPanel();
      if (!panel || panel.style.visibility !== 'visible') return;
      const item = this.menuItems(panel)[0];
      if (item) { item.focus(); this.pendingFocus = false; }
    });
  }

  protected get pinnedUnits(): FleetUnit[] {
    return this.units.filter(unit => this.isPinned(unit));
  }

  protected get unpinnedUnits(): FleetUnit[] {
    return this.units.filter(unit => !this.isPinned(unit));
  }

  /** Sin acciones ni telemetría, la fila no muestra el botón del menú. */
  protected get hasMenu(): boolean {
    const actions = this.actions();
    return this.pinnable() || !!this.detailLabel || this.showTelemetry() || typeof actions === 'function' || actions.length > 0;
  }

  protected isPinned(unit: FleetUnit): boolean {
    return this.pinnedIds().includes(unit.id);
  }

  protected titleOf(unit: FleetUnit): string {
    return unit.plate || unit.name;
  }

  protected reportOf(unit: FleetUnit): string {
    return formatDateTime(unit.lastReportAt) || unit.lastSeen;
  }

  protected vehicleIcon(unit: FleetUnit): IconName {
    return VEHICLE_ICON[unit.vehicleType ?? 'truck'];
  }

  protected gpsOn(unit: FleetUnit): boolean {
    return unit.gps ? unit.gps === 'on' : unit.status !== 'offline';
  }

  protected ignitionOn(unit: FleetUnit): boolean {
    return unit.ignition ? unit.ignition === 'on' : unit.status === 'active';
  }

  protected gpsLabel(unit: FleetUnit): string {
    return this.gpsOn(unit) ? 'GPS con señal' : 'GPS sin señal';
  }

  protected ignitionLabel(unit: FleetUnit): string {
    return this.ignitionOn(unit) ? 'Motor encendido' : 'Motor apagado';
  }

  /** Fijar y detalle son del componente; el resto lo aporta el consumidor con `actions`. */
  protected menuEntries(unit: FleetUnit): MenuEntry[] {
    const entries: MenuEntry[] = [];
    if (this.pinnable()) entries.push({ kind: 'pin', item: { label: this.isPinned(unit) ? 'Desfijar' : 'Fijar', icon: 'star' } });
    if (this.detailLabel) entries.push({ kind: 'detail', item: { label: this.detailLabel, icon: 'file-text' } });
    const actions = this.actions();
    for (const item of typeof actions === 'function' ? actions(unit) : actions) entries.push({ kind: 'action', item });
    return entries;
  }

  protected toggleActions(unit: FleetUnit, trigger: HTMLElement): void {
    if (unit.disabled) return;
    this.actionTrigger = trigger;
    this.actionUnitId.set(this.actionUnitId() === unit.id ? null : unit.id);
    if (this.actionUnitId()) this.menuUnitId.set(unit.id);
    this.pendingFocus = !!this.actionUnitId();
  }

  protected closeActions(restoreFocus = false): void {
    this.actionUnitId.set(null);
    this.pendingFocus = false;
    if (restoreFocus) this.actionTrigger?.focus();
  }

  protected choose(unit: FleetUnit, entry: MenuEntry): void {
    if (unit.disabled) return;
    if (entry.kind === 'pin') { this.pin(unit); return; }
    this.closeActions(true);
    if (entry.kind === 'detail') this.detailClick.emit(unit);
    else this.actionSelect.emit({ unit, action: entry.item });
  }

  /** Flechas, Inicio y Fin recorren las acciones; Tab cierra el menú y sigue desde el botón que lo abrió. */
  protected onMenuKeydown(event: KeyboardEvent): void {
    if (event.key === 'Tab') { this.closeActions(true); return; }
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    const items = this.menuItems(event.currentTarget as HTMLElement);
    if (!items.length) return;
    event.preventDefault();
    const current = items.indexOf(document.activeElement as HTMLButtonElement);
    const next = event.key === 'Home' ? 0
      : event.key === 'End' ? items.length - 1
      : (current + (event.key === 'ArrowUp' ? -1 : 1) + items.length) % items.length;
    items[next].focus();
  }

  protected select(unit: FleetUnit): void {
    if (this.selectable() && !unit.disabled) this.selectedIdChange.emit(this.selectedId() === unit.id ? null : unit.id);
  }

  private pin(unit: FleetUnit): void {
    this.closeActions(true);
    // Al fijar, la fila cambia de grupo y su botón se vuelve a crear: el foco lo sigue.
    this.refocusUnitId = unit.id;
    this.pinnedIdsChange.emit(this.isPinned(unit)
      ? this.pinnedIds().filter(id => id !== unit.id) : [...this.pinnedIds(), unit.id]);
  }

  private restoreTriggerFocus(): void {
    const id = this.refocusUnitId;
    if (!id) return;
    this.refocusUnitId = null;
    if (document.activeElement !== document.body) return;
    const row = Array.from(this.host.nativeElement.querySelectorAll<HTMLElement>('[data-unit-id]')).find(item => item.dataset['unitId'] === id);
    row?.querySelector<HTMLElement>('.cs-fleet-unit-list__trigger')?.focus();
  }

  private menuPanel(): HTMLElement | null {
    const id = this.actionTrigger?.getAttribute('aria-controls');
    return id ? document.getElementById(id) : null;
  }

  private menuItems(container: HTMLElement): HTMLButtonElement[] {
    return Array.from(container.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)'));
  }

  protected statusSeverity(unit: FleetUnit): TagSeverity {
    return STATUS_SEVERITY[unit.status];
  }

  protected statusIcon(unit: FleetUnit): IconName {
    return STATUS_ICON[unit.status];
  }

  protected readonly telemetryFields = TELEMETRY_FIELDS;
}
