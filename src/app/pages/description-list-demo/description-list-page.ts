import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { DescriptionItem, DescriptionList, Icon, Tag } from '@iamacalupuenzo-ui/comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

type ListState = 'two' | 'one' | 'full' | 'edit';
const STATES: { key: ListState; title: string; intro: string; props: string }[] = [
  { key: 'two', title: 'Dos columnas', intro: 'El detalle de un registro en un cajón o una tarjeta ancha. Es la opción por defecto.', props: '<dl csDescriptionList>' },
  { key: 'one', title: 'Una columna', intro: 'Para paneles angostos o valores largos que no caben en media columna. Hasta 767 px siempre es una.', props: '[columns]="1"' },
  { key: 'full', title: 'Con texto de ancho completo', intro: 'Una observación o una nota ocupa toda la fila para no cortarse.', props: '[fullWidth]="true"' },
  { key: 'edit', title: 'Con edición', intro: 'Un lápiz junto al valor abre la edición de ese dato. El nombre del botón dice qué se edita.', props: 'editLabel="Editar observación" (edit)="…"' },
];

@Component({
  selector: 'app-description-list-page',
  imports: [DemoShell, DescriptionItem, DescriptionList, Icon, NgTemplateOutlet, Tag],
  templateUrl: './description-list-page.html',
  styleUrl: './description-list-page.css',
})
export class DescriptionListPage {
  protected readonly states = STATES;
  protected readonly controls: ControlDef[] = [
    { kind: 'select', label: 'Estado', key: 'state', options: STATES.map(({ key, title }) => ({ value: key, label: title })), default: 'two' },
  ];
  protected readonly pgState = signal<ListState>('two');
  protected readonly pgInfo = computed(() => STATES.find((s) => s.key === this.pgState()) ?? STATES[0]);
  protected readonly edits = signal(0);

  protected onState(s: DemoState): void {
    if (s['state']) this.pgState.set(s['state'] as ListState);
  }

  protected codeFor(key: ListState): string {
    const columns = key === 'one' ? ' [columns]="1"' : '';
    const last = key === 'full'
      ? '\n  <div csDescriptionItem label="Observación" [fullWidth]="true">La unidad no estaba en la dirección registrada.</div>'
      : key === 'edit'
        ? '\n  <div csDescriptionItem label="Observación" [fullWidth]="true" editLabel="Editar observación" (edit)="editar()">La unidad no estaba en la dirección registrada.</div>'
        : '';
    return `<dl csDescriptionList${columns}>\n  <div csDescriptionItem label="Placa">BAB711</div>\n  <div csDescriptionItem label="Financiera">MAF</div>\n  <div csDescriptionItem label="Contrato"><cs-tag value="No vigente" severity="warn" [rounded]="true" /></div>\n  <div csDescriptionItem label="Expediente">09740-2021</div>${last}\n</dl>`;
  }
}
