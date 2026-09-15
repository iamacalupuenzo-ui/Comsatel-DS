import { Component, computed, signal } from '@angular/core';
import { FleetUnitList, Icon, type FleetUnit, type FleetUnitListAppearance } from '@iamacalupuenzo-ui/comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';
import { CodeBlock } from '../../shared/docs/code-block';

const UNITS: FleetUnit[] = [
  { id: 'norte-04', name: 'Camión Norte 04', status: 'active', statusLabel: 'Activo', lastSeen: 'Reportando · hace 2 min', speed: '62 km/h', battery: '88%', location: 'Av. Argentina, Callao', diagnostics: 'Sin alertas' },
  { id: 'norte-07', name: 'Camión Norte 07', status: 'stopped', statusLabel: 'Detenido', lastSeen: 'Detenido · hace 14 min', speed: '0 km/h', battery: '54%', location: 'Terminal Norte, Lima', diagnostics: 'Motor detenido' },
  { id: 'sur-12', name: 'Furgón Sur 12', status: 'offline', statusLabel: 'Sin señal', lastSeen: 'Sin señal · hace 3 h', speed: '—', battery: '12%', location: 'Última ubicación: Av. Faucett', diagnostics: 'Sin diagnóstico', alert: 'La unidad no ha reportado señal recientemente.' },
];

const TYPE_OPTIONS = ['single', 'multiple'] as const;
const APPEARANCE_OPTIONS = [
  { value: 'outlined', label: 'Tarjetas con borde' },
  { value: 'filled', label: 'Superficies rellenas' },
] as const;

const DISABLED_UNITS: FleetUnit[] = UNITS.map((unit) =>
  unit.id === 'norte-07'
    ? { ...unit, disabled: true, lastSeen: 'Todavía no tiene dispositivo GPS asignado' }
    : unit,
);

@Component({
  selector: 'app-accordion-page',
  imports: [FleetUnitList, Icon, DemoShell, CodeBlock],
  templateUrl: './accordion-page.html',
  styleUrl: './accordion-page.css',
})
export class AccordionPage {
  protected readonly units = UNITS;
  protected readonly disabledUnits = DISABLED_UNITS;
  protected readonly highlightedUnit = [UNITS[0]];
  protected readonly selectedUnit = signal('');

  protected onDetail(unit: FleetUnit): void {
    this.selectedUnit.set(`Acción ejecutada: ver detalle de ${unit.name}.`);
  }

  /* Playground */
  protected readonly playgroundControls: ControlDef[] = [
    { kind: 'select', label: 'Tipo', key: 'type', options: TYPE_OPTIONS, default: 'single' },
    { kind: 'select', label: 'Diseño', key: 'appearance', options: APPEARANCE_OPTIONS, default: 'outlined' },
  ];
  protected readonly type = signal<(typeof TYPE_OPTIONS)[number]>('single');
  protected readonly appearance = signal<FleetUnitListAppearance>('outlined');

  protected onPlaygroundState(s: DemoState): void {
    if (s['type']) this.type.set(s['type'] as (typeof TYPE_OPTIONS)[number]);
    if (s['appearance']) this.appearance.set(s['appearance'] as FleetUnitListAppearance);
  }

  protected readonly pgCode = computed(() => {
    const typeProp = this.type() !== 'single' ? ` type="${this.type()}"` : '';
    const appearanceProp = this.appearance() !== 'outlined' ? ` appearance="${this.appearance()}"` : '';
    return `<cs-fleet-unit-list [units]="units"${typeProp}${appearanceProp}\n  [defaultExpandedIds]="['norte-04']"\n  (detailClick)="onDetail($event)"\n/>`;
  });

  protected readonly typeCode = `<cs-fleet-unit-list [units]="units" type="multiple"\n  [defaultExpandedIds]="['norte-04', 'norte-07']"\n/>`;
  protected readonly disabledCode = `<cs-fleet-unit-list [units]="unitsWithUnavailableGps"\n  [defaultExpandedIds]="['norte-04']"\n/>\n<!-- La unidad con disabled: true se mantiene visible. -->`;
}
