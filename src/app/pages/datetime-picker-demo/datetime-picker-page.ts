import { Component, computed, signal } from '@angular/core';
import { DateTimePicker, formatDateTime, type DateTimeValue } from '@iamacalupuenzo-ui/comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

type Size = 'sm' | 'md' | 'lg';
type PickerState = 'empty' | 'filled' | 'invalid' | 'disabled';
interface StateDemo { key: PickerState; title: string; intro: string; props: string }
const STATES: StateDemo[] = [
  { key: 'empty', title: 'Vacío', intro: 'Sin fecha ni hora. Cada campo abre su propio selector: calendario o columnas de hora.', props: '[value]="{ date: \'\', time: \'\' }"' },
  { key: 'filled', title: 'Con valor', intro: 'Fecha en el formato del sistema («27 sep. 2026») y hora de 24 horas.', props: '[value]="{ date: \'2026-09-27\', time: \'16:56\' }"' },
  { key: 'invalid', title: 'Error', intro: 'Falta la hora. El mensaje va debajo de los dos campos y dice qué completar.', props: '[invalid]="true" errorMessage="…"' },
  { key: 'disabled', title: 'Deshabilitado', intro: 'La fecha y la hora no se pueden cambiar en este paso.', props: '[disabled]="true"' },
];
const FILLED: DateTimeValue = { date: '2026-09-27', time: '16:56' };

@Component({
  selector: 'app-datetime-picker-page',
  imports: [DateTimePicker, DemoShell],
  templateUrl: './datetime-picker-page.html',
  styleUrl: './datetime-picker-page.css',
})
export class DateTimePickerPage {
  protected readonly states = STATES;
  protected readonly filled = FILLED;
  protected readonly controls: ControlDef[] = [
    { kind: 'select', label: 'Estado', key: 'state', options: STATES.map(({ key, title }) => ({ value: key, label: title })), default: 'empty' },
    { kind: 'select', label: 'Tamaño', key: 'size', options: ['sm', 'md', 'lg'], default: 'md' },
  ];
  protected readonly stateSizeControls: ControlDef[] = [{ kind: 'select', label: 'Tamaño', key: 'size', options: ['sm', 'md', 'lg'], default: 'md' }];
  protected readonly pgState = signal<PickerState>('empty');
  protected readonly pgSize = signal<Size>('md');
  protected readonly pgValue = signal<DateTimeValue>({ date: '', time: '' });
  protected readonly pgInfo = computed(() => STATES.find((s) => s.key === this.pgState()) ?? STATES[0]);
  protected readonly pgResult = computed(() => {
    const { date, time } = this.pgValue();
    return date && time ? formatDateTime(`${date}T${time}`) : 'Todavía falta la fecha o la hora.';
  });
  private readonly stateSizes = signal<Record<string, Size>>({});

  protected onState(s: DemoState): void {
    if (s['state']) {
      this.pgState.set(s['state'] as PickerState);
      this.pgValue.set(this.pgState() === 'filled' || this.pgState() === 'disabled' ? FILLED : this.pgState() === 'invalid' ? { date: FILLED.date, time: '' } : { date: '', time: '' });
    }
    if (s['size']) this.pgSize.set(s['size'] as Size);
  }
  protected sizeOf(key: string): Size {
    return this.stateSizes()[key] ?? 'md';
  }
  protected onStateSize(key: string, s: DemoState): void {
    if (s['size']) this.stateSizes.update((sizes) => ({ ...sizes, [key]: s['size'] as Size }));
  }
  protected valueFor(key: PickerState): DateTimeValue {
    if (key === 'empty') return { date: '', time: '' };
    if (key === 'invalid') return { date: FILLED.date, time: '' };
    return FILLED;
  }
  protected codeFor(key: PickerState, size: Size): string {
    const attrs = ['aria-label="Fecha y hora de la captura"'];
    const v = this.valueFor(key);
    attrs.push(`[value]="{ date: '${v.date}', time: '${v.time}' }"`);
    if (key === 'invalid') attrs.push('[invalid]="true"', 'errorMessage="Selecciona la hora de la captura."');
    if (key === 'disabled') attrs.push('[disabled]="true"');
    if (size !== 'md') attrs.push(`size="${size}"`);
    attrs.push('(valueChange)="momento = $event"');
    return `<cs-datetime-picker\n  ${attrs.join('\n  ')}\n/>`;
  }
}
