import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Accordion, AccordionType } from '../accordion/accordion';
import { AccordionItem } from '../accordion/accordion-item';
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
  imports: [Accordion, AccordionItem, Button, Icon, Tag],
  templateUrl: './fleet-unit-list.html',
  styleUrl: './fleet-unit-list.css',
})
export class FleetUnitList {
  @Input({ required: true }) units: FleetUnit[] = [];
  @Input() type: AccordionType = 'single';
  @Input() defaultExpandedIds: string[] = [];
  @Input() expandedIds?: string[];
  @Input() detailLabel = 'Ver detalle';
  /** Cambia solo la superficie de lectura; la jerarquía y la interacción son iguales. */
  @Input() appearance: FleetUnitListAppearance = 'outlined';
  @Output() readonly expandedIdsChange = new EventEmitter<string[]>();
  @Output() readonly detailClick = new EventEmitter<FleetUnit>();

  protected readonly statusSeverity = STATUS_SEVERITY;
  protected readonly statusIcon = STATUS_ICON;
  protected readonly telemetryFields = TELEMETRY_FIELDS;
}
