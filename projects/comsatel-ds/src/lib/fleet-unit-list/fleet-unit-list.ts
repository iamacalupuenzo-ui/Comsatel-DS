import { afterEveryRender, signal, ChangeDetectionStrategy, Component, EventEmitter, Input, Output, input, output } from '@angular/core';
import { type AccordionType } from '../accordion/accordion';
import { Popover } from '../popover/popover';
import { Button } from '../button/button';
import { Icon } from '../icons/icon';
import type { IconName } from '../icons/icon-registry';
import { Tag, type TagSeverity } from '../tag/tag';

export type FleetUnitStatus = 'active' | 'stopped' | 'offline';
export type FleetUnitListAppearance = 'outlined' | 'filled';

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
}

interface TelemetryField {
  key: 'speed' | 'battery' | 'location' | 'diagnostics';
  label: string;
  icon: IconName;
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

const TELEMETRY_FIELDS: TelemetryField[] = [
  { key: 'speed', label: 'Velocidad', icon: 'gauge' },
  { key: 'battery', label: 'Batería', icon: 'battery' },
  { key: 'location', label: 'Ubicación', icon: 'map-pin' },
  { key: 'diagnostics', label: 'Diagnóstico', icon: 'wrench' },
];

/** Organismo para la lectura y acción rápida sobre unidades de flota. */
@Component({
  selector: 'cs-fleet-unit-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Popover, Button, Icon, Tag],
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
  @Input() detailLabel = 'Ver detalle';
  /** Cambia solo la superficie de lectura; la jerarquía y la interacción son iguales. */
  @Input() appearance: FleetUnitListAppearance = 'outlined';
  readonly surface = input<'default' | 'secondary'>('default');
  readonly selectable = input(true);
  readonly pinnable = input(false);
  readonly selectedId = input<string | null>(null);
  readonly pinnedIds = input<string[]>([]);
  @Output() readonly expandedIdsChange = new EventEmitter<string[]>();
  @Output() readonly detailClick = new EventEmitter<FleetUnit>();
  readonly selectedIdChange = output<string | null>();
  readonly pinnedIdsChange = output<string[]>();

  protected readonly actionUnitId = signal<string | null>(null);
  private actionTrigger?: HTMLElement;
  private pendingFocus = false;
  constructor() {
    afterEveryRender(() => {
      if (!this.pendingFocus || !this.actionUnitId()) return;
      const id = this.actionTrigger?.getAttribute('aria-controls');
      const panel = id ? document.getElementById(id) : null;
      if (!panel || panel.style.visibility !== 'visible') return;
      const button = panel.querySelector<HTMLButtonElement>('button:not(:disabled)');
      if (button) { button.focus(); this.pendingFocus = false; }
    });
  }
  protected toggleActions(unit: FleetUnit, trigger: HTMLElement): void {
    if (unit.disabled) return;
    this.actionTrigger = trigger;
    this.actionUnitId.set(this.actionUnitId() === unit.id ? null : unit.id);
    this.pendingFocus = !!this.actionUnitId();
  }
  protected closeActions(restoreFocus = false): void {
    this.actionUnitId.set(null);
    this.pendingFocus = false;
    if (restoreFocus) this.actionTrigger?.focus();
  }
  protected showDetail(unit: FleetUnit): void {
    this.closeActions(true);
    if (!unit.disabled) this.detailClick.emit(unit);
  }
  protected get orderedUnits(): FleetUnit[] {
    return [...this.units].sort((a, b) => Number(this.pinnedIds().includes(b.id)) - Number(this.pinnedIds().includes(a.id)));
  }

  protected select(unit: FleetUnit): void {
    if (this.selectable() && !unit.disabled) this.selectedIdChange.emit(this.selectedId() === unit.id ? null : unit.id);
  }

  protected pin(unit: FleetUnit): void {
    if (unit.disabled) return;
    this.closeActions(true);
    const active = document.activeElement;
    this.pinnedIdsChange.emit(this.pinnedIds().includes(unit.id)
      ? this.pinnedIds().filter(id => id !== unit.id) : [...this.pinnedIds(), unit.id]);
    // Mover un nodo conservado por @for puede soltar el foco del navegador.
    requestAnimationFrame(() => {
      if (active instanceof HTMLElement && active.isConnected && document.activeElement === document.body) active.focus();
    });
  }

  protected readonly statusSeverity = STATUS_SEVERITY;
  protected readonly statusIcon = STATUS_ICON;
  protected readonly telemetryFields = TELEMETRY_FIELDS;
}
