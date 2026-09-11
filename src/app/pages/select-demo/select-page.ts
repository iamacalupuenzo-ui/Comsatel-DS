import { Component, computed, signal } from '@angular/core';
import { Select, type SelectOption } from 'comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

const TEAM_OPTIONS: SelectOption[] = [
  { label: 'Diseño', value: 'design' },
  { label: 'Ingeniería', value: 'eng' },
  { label: 'Producto', value: 'product' },
  { label: 'Ventas', value: 'sales' },
];

@Component({
  selector: 'app-select-page',
  imports: [Select, DemoShell],
  templateUrl: './select-page.html',
  styleUrl: './select-page.css',
})
export class SelectPage {
  protected readonly teamOptions = TEAM_OPTIONS;

  /* Playground */
  protected readonly playgroundControls: ControlDef[] = [
    { kind: 'toggle', label: 'Múltiple', key: 'multiple', default: false },
    { kind: 'select', label: 'Tamaño', key: 'size', options: ['xs', 'sm', 'md', 'lg'], default: 'md' },
    { kind: 'toggle', label: 'Label', key: 'showLabel', default: true },
    { kind: 'toggle', label: 'Requerido', key: 'required', default: false },
    { kind: 'toggle', label: 'Deshabilitado', key: 'disabled', default: false },
  ];
  protected readonly pgMultiple = signal(false);
  protected readonly pgSize = signal<'xs' | 'sm' | 'md' | 'lg'>('md');
  protected readonly pgShowLabel = signal(true);
  protected readonly pgRequired = signal(false);
  protected readonly pgDisabled = signal(false);
  protected readonly pgSingleValue = signal('');
  protected readonly pgMultipleValue = signal<string[]>([]);
  protected readonly stateMultipleValue = signal<string[]>(['design', 'eng']);
  protected readonly guideLabelValue = signal('');
  protected readonly guideNoLabelValue = signal('');
  protected readonly guideMultipleValue = signal<string[]>(['design']);
  protected readonly guideNoMultipleValue = signal<string[]>([]);
  protected readonly guideFewOptionsValue = signal('');

  protected onPlaygroundState(s: DemoState): void {
    if (s['multiple'] !== undefined) {
      this.pgMultiple.set(!!s['multiple']);
    }
    if (s['size']) this.pgSize.set(s['size'] as 'xs' | 'sm' | 'md' | 'lg');
    if (s['showLabel'] !== undefined) this.pgShowLabel.set(!!s['showLabel']);
    if (s['required'] !== undefined) this.pgRequired.set(!!s['required']);
    if (s['disabled'] !== undefined) this.pgDisabled.set(!!s['disabled']);
  }

  protected readonly pgCode = computed(() => {
    const props: string[] = [];
    if (this.pgMultiple()) props.push('[multiple]="true"');
    if (this.pgSize() !== 'md') props.push(`size="${this.pgSize()}"`);
    if (this.pgShowLabel()) props.push('label="Equipo"');
    if (this.pgRequired()) props.push('[required]="true"');
    if (this.pgDisabled()) props.push('[disabled]="true"');
    return `<cs-select\n  placeholder="Selecciona un equipo…"\n  [options]="teamOptions"\n  [value]="value"\n  (valueChange)="value = $event"${props.length ? '\n  ' + props.join('\n  ') : ''}\n/>`;
  });
}
