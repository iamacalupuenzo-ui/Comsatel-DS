import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Accordion, AccordionType } from '../accordion/accordion';
import { AccordionItem } from '../accordion/accordion-item';
import { Badge, BadgeVariant } from '../badge/badge';
import { Button } from '../button/button';
import { Icon } from '../icons/icon';
import type { IconName } from '../icons/icon-registry';

export type FleetUnitStatus = 'active' | 'stopped' | 'offline';

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
}

const STATUS_VARIANT: Record<FleetUnitStatus, BadgeVariant> = {
  active: 'success',
  stopped: 'warning',
  offline: 'neutral',
};

const STATUS_ICON: Record<FleetUnitStatus, IconName> = {
  active: 'activity',
  stopped: 'circle-pause',
  offline: 'wifi-off',
};

/** Organismo para la lectura y acción rápida sobre unidades de flota. */
@Component({
  selector: 'cs-fleet-unit-list',
  imports: [Accordion, AccordionItem, Badge, Button, Icon],
  templateUrl: './fleet-unit-list.html',
  styleUrl: './fleet-unit-list.css',
})
export class FleetUnitList {
  @Input({ required: true }) units: FleetUnit[] = [];
  @Input() type: AccordionType = 'single';
  @Input() defaultExpandedIds: string[] = [];
  @Input() expandedIds?: string[];
  @Input() detailLabel = 'Ver detalle';
  @Output() readonly expandedIdsChange = new EventEmitter<string[]>();
  @Output() readonly detailClick = new EventEmitter<FleetUnit>();

  protected readonly statusVariant = STATUS_VARIANT;
  protected readonly statusIcon = STATUS_ICON;
}
