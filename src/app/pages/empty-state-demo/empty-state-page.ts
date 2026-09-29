import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { Button, EmptyState, Icon, Table, type TableColumn } from '@iamacalupuenzo-ui/comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

type EmptyKind = 'filters' | 'first' | 'no-icon';
const STATES: { key: EmptyKind; title: string; intro: string; props: string }[] = [
  { key: 'filters', title: 'Sin resultados por filtros', intro: 'Los filtros no dejan filas. La salida, «Limpiar filtros», está en el mismo lugar del vacío.', props: 'icon="search" title="No encontramos capturas"' },
  { key: 'first', title: 'Todavía no hay registros', intro: 'La pantalla está vacía porque nunca se cargó nada. La acción es el primer paso.', props: 'icon="file-text" title="Aún no hay cargas"' },
  { key: 'no-icon', title: 'Sin ícono', intro: 'En espacios chicos, como un panel lateral, el título y la descripción bastan.', props: 'sin icon' },
];

@Component({
  selector: 'app-empty-state-page',
  imports: [Button, DemoShell, EmptyState, Icon, NgTemplateOutlet, Table],
  templateUrl: './empty-state-page.html',
  styleUrl: './empty-state-page.css',
})
export class EmptyStatePage {
  protected readonly states = STATES;
  protected readonly controls: ControlDef[] = [
    { kind: 'select', label: 'Estado', key: 'state', options: STATES.map(({ key, title }) => ({ value: key, label: title })), default: 'filters' },
  ];
  protected readonly pgState = signal<EmptyKind>('filters');
  protected readonly pgInfo = computed(() => STATES.find((s) => s.key === this.pgState()) ?? STATES[0]);
  protected readonly columns: TableColumn[] = [
    { key: 'order', label: 'Orden' },
    { key: 'unit', label: 'Placa' },
    { key: 'status', label: 'Estado' },
  ];

  protected onState(s: DemoState): void {
    if (s['state']) this.pgState.set(s['state'] as EmptyKind);
  }

  protected codeFor(key: EmptyKind): string {
    if (key === 'filters') return '<cs-empty-state icon="search" title="No encontramos capturas" description="Prueba con otra orden, unidad o estado.">\n  <cs-button variant="default" size="sm" (click)="limpiarFiltros()">Limpiar filtros</cs-button>\n</cs-empty-state>';
    if (key === 'first') return '<cs-empty-state icon="file-text" title="Aún no hay cargas" description="Sube el primer archivo de órdenes para empezar.">\n  <cs-button variant="primary" size="sm">Carga masiva de capturas</cs-button>\n</cs-empty-state>';
    return '<cs-empty-state title="Sin evidencias" description="Adjunta fotos o documentos que respalden el recupero." />';
  }
}
