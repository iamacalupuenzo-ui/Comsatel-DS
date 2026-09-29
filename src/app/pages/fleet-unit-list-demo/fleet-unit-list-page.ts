import { Component, computed, signal } from '@angular/core';
import { FleetUnitList, type FleetUnit, type FleetUnitListAppearance } from '@iamacalupuenzo-ui/comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

const UNITS: FleetUnit[] = [
  { id: 'norte-04', name: 'Camión Norte 04', status: 'active', statusLabel: 'Activo', lastSeen: 'Reportando · hace 2 min', speed: '62 km/h', battery: '88%', location: 'Av. Argentina, Callao', diagnostics: 'Sin alertas' },
  { id: 'norte-07', name: 'Camión Norte 07', status: 'stopped', statusLabel: 'Detenido', lastSeen: 'Detenido · hace 14 min', speed: '0 km/h', battery: '54%', location: 'Terminal Norte, Lima', diagnostics: 'Motor detenido' },
  { id: 'sur-12', name: 'Furgón Sur 12', status: 'offline', statusLabel: 'Sin señal', lastSeen: 'Sin señal · hace 3 h', speed: '—', battery: '12%', location: 'Última ubicación: Av. Faucett', diagnostics: 'Sin diagnóstico', alert: 'La unidad no reporta desde hace 3 horas.' },
];

@Component({
  selector: 'app-fleet-unit-list-page',
  imports: [FleetUnitList, DemoShell],
  templateUrl: './fleet-unit-list-page.html',
  styleUrl: './fleet-unit-list-page.css',
})
export class FleetUnitListPage {
  protected readonly units = UNITS;
  protected readonly controls: ControlDef[] = [
    { kind: 'select', label: 'Apariencia', key: 'appearance', options: [{ value: 'outlined', label: 'Con borde' }, { value: 'filled', label: 'Relleno' }], default: 'outlined' },
    { kind: 'toggle', label: 'Seleccionable', key: 'selectable', default: true },
    { kind: 'toggle', label: 'Fijable', key: 'pinnable', default: true },
  ];
  protected readonly appearance = signal<FleetUnitListAppearance>('outlined');
  protected readonly selectable = signal(true);
  protected readonly pinnable = signal(true);
  protected readonly selectedId = signal<string | null>('norte-04');
  protected readonly pinnedIds = signal<string[]>([]);

  protected onState(s: DemoState): void {
    if (s['appearance']) this.appearance.set(s['appearance'] as FleetUnitListAppearance);
    if (s['selectable'] !== undefined) this.selectable.set(!!s['selectable']);
    if (s['pinnable'] !== undefined) this.pinnable.set(!!s['pinnable']);
  }

  protected readonly code = computed(() => {
    const props = ['[units]="unidades"', '[selectedId]="seleccionada"', '(selectedIdChange)="seleccionada = $event"'];
    if (this.pinnable()) props.push('[pinnable]="true"', '[pinnedIds]="fijadas"', '(pinnedIdsChange)="fijadas = $event"');
    if (!this.selectable()) props.push('[selectable]="false"');
    if (this.appearance() !== 'outlined') props.push(`appearance="${this.appearance()}"`);
    props.push('(detailClick)="verDetalle($event)"');
    return `<cs-fleet-unit-list\n  ${props.join('\n  ')}\n/>`;
  });
}
