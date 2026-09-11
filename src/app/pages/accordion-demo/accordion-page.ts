import { Component, computed, signal } from '@angular/core';
import { Accordion, AccordionItem, Badge, Icon, type BadgeVariant, type IconName } from 'comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';
import { CodeBlock } from '../../shared/docs/code-block';

interface FleetUnit {
  id: string;
  name: string;
  status: 'active' | 'stopped' | 'offline';
  statusLabel: string;
  lastSeen: string;
  speed: string;
  battery: string;
  location: string;
}

const STATUS_BADGE_VARIANT: Record<FleetUnit['status'], BadgeVariant> = {
  active: 'success',
  stopped: 'warning',
  offline: 'neutral',
};

const STATUS_ICON: Record<FleetUnit['status'], IconName> = {
  active: 'activity',
  stopped: 'circle-pause',
  offline: 'wifi-off',
};

const UNITS: FleetUnit[] = [
  { id: 'norte-04', name: 'Camión Norte 04', status: 'active', statusLabel: 'Activo', lastSeen: 'Reportando · hace 2 min', speed: '62 km/h', battery: '88%', location: 'Av. Argentina, Callao' },
  { id: 'norte-07', name: 'Camión Norte 07', status: 'stopped', statusLabel: 'Detenido', lastSeen: 'Detenido · hace 14 min', speed: '0 km/h', battery: '54%', location: 'Terminal Norte, Lima' },
  { id: 'sur-12', name: 'Furgón Sur 12', status: 'offline', statusLabel: 'Sin señal', lastSeen: 'Sin señal · hace 3 h', speed: '—', battery: '12%', location: 'Última ubicación: Av. Faucett' },
];

const TYPE_OPTIONS = ['single', 'multiple'] as const;

@Component({
  selector: 'app-accordion-page',
  imports: [Accordion, AccordionItem, Badge, Icon, DemoShell, CodeBlock],
  templateUrl: './accordion-page.html',
  styleUrl: './accordion-page.css',
})
export class AccordionPage {
  protected readonly units = UNITS;
  protected readonly statusVariant = STATUS_BADGE_VARIANT;
  protected readonly statusIcon = STATUS_ICON;

  /* Playground */
  protected readonly playgroundControls: ControlDef[] = [
    { kind: 'select', label: 'Tipo', key: 'type', options: TYPE_OPTIONS, default: 'single' },
  ];
  protected readonly type = signal<(typeof TYPE_OPTIONS)[number]>('single');

  protected onPlaygroundState(s: DemoState): void {
    if (s['type']) this.type.set(s['type'] as (typeof TYPE_OPTIONS)[number]);
  }

  protected readonly pgCode = computed(() => {
    const typeProp = this.type() !== 'single' ? ` type="${this.type()}"` : '';
    return `<cs-accordion${typeProp} [defaultExpandedIds]="['norte-04']">\n  <cs-accordion-item id="norte-04">\n    <div header>...</div>\n    ...\n  </cs-accordion-item>\n  ...\n</cs-accordion>`;
  });

  protected readonly typeCode = `<cs-accordion type="multiple" [defaultExpandedIds]="['norte-04', 'norte-07']">...</cs-accordion>`;
  protected readonly disabledCode = `<cs-accordion-item id="norte-07" [disabled]="true">...</cs-accordion-item>\n<!-- "Todavía no tiene dispositivo GPS asignado" -->`;
}
