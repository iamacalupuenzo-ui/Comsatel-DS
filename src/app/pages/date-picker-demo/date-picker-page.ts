import { Component, computed, signal } from '@angular/core';
import { DatePicker } from '@iamacalupuenzo-ui/comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

type Size = 'sm' | 'md' | 'lg';
type PickerState = 'empty' | 'filled' | 'invalid' | 'disabled';
interface StateDemo { key: PickerState; title: string; intro: string; props: string }
const STATES: StateDemo[] = [
  { key: 'empty', title: 'Vacío', intro: 'Sin fecha. El campo es de solo lectura: se elige en el calendario.', props: '[value]="\'\'"' },
  { key: 'filled', title: 'Con valor', intro: 'La fecha se muestra en el formato del sistema: «27 sep. 2026».', props: '[value]="\'2026-09-27\'"' },
  { key: 'invalid', title: 'Error', intro: 'Falta la fecha o no es válida. Siempre con un mensaje.', props: '[invalid]="true" errorMessage="…"' },
  { key: 'disabled', title: 'Deshabilitado', intro: 'La fecha no se puede cambiar en este paso.', props: '[disabled]="true"' },
];

@Component({
  selector: 'app-date-picker-page',
  imports: [DatePicker, DemoShell],
  templateUrl: './date-picker-page.html',
  styleUrl: './date-picker-page.css',
})
export class DatePickerPage {
  protected readonly states = STATES;
  protected readonly controls: ControlDef[] = [
    { kind: 'select', label: 'Estado', key: 'state', options: STATES.map(({ key, title }) => ({ value: key, label: title })), default: 'empty' },
    { kind: 'select', label: 'Tamaño', key: 'size', options: ['sm', 'md', 'lg'], default: 'md' },
  ];
  protected readonly stateSizeControls: ControlDef[] = [{ kind: 'select', label: 'Tamaño', key: 'size', options: ['sm', 'md', 'lg'], default: 'md' }];
  protected readonly pgState = signal<PickerState>('empty');
  protected readonly pgSize = signal<Size>('md');
  protected readonly pgValue = signal('');
  protected readonly pgInfo = computed(() => STATES.find((s) => s.key === this.pgState()) ?? STATES[0]);
  private readonly stateSizes = signal<Record<string, Size>>({});

  protected onState(s: DemoState): void {
    if (s['state']) {
      this.pgState.set(s['state'] as PickerState);
      this.pgValue.set(this.valueFor(this.pgState()));
    }
    if (s['size']) this.pgSize.set(s['size'] as Size);
  }
  protected sizeOf(key: string): Size {
    return this.stateSizes()[key] ?? 'md';
  }
  protected onStateSize(key: string, s: DemoState): void {
    if (s['size']) this.stateSizes.update((sizes) => ({ ...sizes, [key]: s['size'] as Size }));
  }
  protected valueFor(key: PickerState): string {
    return key === 'filled' || key === 'disabled' ? '2026-09-27' : '';
  }
  protected codeFor(key: PickerState, size: Size): string {
    const attrs = ['label="Fecha de captura"', `[value]="'${this.valueFor(key)}'"`];
    if (key === 'invalid') attrs.push('[invalid]="true"', 'errorMessage="Selecciona la fecha de captura."');
    if (key === 'disabled') attrs.push('[disabled]="true"');
    if (size !== 'md') attrs.push(`size="${size}"`);
    attrs.push('(valueChange)="fecha = $event"');
    return `<cs-date-picker\n  ${attrs.join('\n  ')}\n/>`;
  }
}
