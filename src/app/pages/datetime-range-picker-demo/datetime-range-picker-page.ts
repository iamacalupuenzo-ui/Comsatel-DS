import { Component, computed, signal } from '@angular/core';
import { DateTimeRangePicker, formatDateTime, type DateTimeRangeValue } from '@iamacalupuenzo-ui/comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

type Size = 'sm' | 'md' | 'lg';
type RangeState = 'empty' | 'filled' | 'invalid' | 'disabled';
interface StateDemo { key: RangeState; title: string; intro: string; props: string }
const STATES: StateDemo[] = [
  { key: 'empty', title: 'Vacío', intro: 'Sin periodo. El rango se elige con dos clics en el calendario; cada hora con sus columnas.', props: '[value]="{}"' },
  { key: 'filled', title: 'Con valor', intro: 'Periodo y horas elegidos, en el formato del sistema.', props: '[value]="{ startDate, endDate, startTime, endTime }"' },
  { key: 'invalid', title: 'Error', intro: 'La hora hasta es anterior a la hora desde en el mismo día. El mensaje explica cómo corregirlo.', props: '[invalid]="true" errorMessage="…"' },
  { key: 'disabled', title: 'Deshabilitado', intro: 'El periodo no se puede cambiar en este paso.', props: '[disabled]="true"' },
];
const FILLED: DateTimeRangeValue = { startDate: '2026-09-27', endDate: '2026-09-28', startTime: '08:00', endTime: '18:30' };
const INVALID: DateTimeRangeValue = { startDate: '2026-09-27', endDate: '2026-09-27', startTime: '18:00', endTime: '08:00' };

@Component({
  selector: 'app-datetime-range-picker-page',
  imports: [DateTimeRangePicker, DemoShell],
  templateUrl: './datetime-range-picker-page.html',
  styleUrl: './datetime-range-picker-page.css',
})
export class DateTimeRangePickerPage {
  protected readonly states = STATES;
  protected readonly controls: ControlDef[] = [
    { kind: 'select', label: 'Estado', key: 'state', options: STATES.map(({ key, title }) => ({ value: key, label: title })), default: 'empty' },
    { kind: 'select', label: 'Tamaño', key: 'size', options: ['sm', 'md', 'lg'], default: 'md' },
  ];
  protected readonly stateSizeControls: ControlDef[] = [{ kind: 'select', label: 'Tamaño', key: 'size', options: ['sm', 'md', 'lg'], default: 'md' }];
  protected readonly pgState = signal<RangeState>('empty');
  protected readonly pgSize = signal<Size>('md');
  protected readonly pgValue = signal<DateTimeRangeValue>({});
  protected readonly pgInfo = computed(() => STATES.find((s) => s.key === this.pgState()) ?? STATES[0]);
  protected readonly pgResult = computed(() => {
    const v = this.pgValue();
    if (!v.startDate || !v.endDate || !v.startTime || !v.endTime) return 'Todavía falta el rango o alguna hora.';
    return `${formatDateTime(`${v.startDate}T${v.startTime}`)} — ${formatDateTime(`${v.endDate}T${v.endTime}`)}`;
  });
  private readonly stateSizes = signal<Record<string, Size>>({});

  protected onState(s: DemoState): void {
    if (s['state']) {
      this.pgState.set(s['state'] as RangeState);
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
  protected valueFor(key: RangeState): DateTimeRangeValue {
    if (key === 'empty') return {};
    if (key === 'invalid') return INVALID;
    return FILLED;
  }
  protected codeFor(key: RangeState, size: Size): string {
    const v = this.valueFor(key);
    const attrs = ['aria-label="Periodo de la bitácora"'];
    attrs.push(key === 'empty' ? '[value]="{}"' : `[value]="{ startDate: '${v.startDate}', endDate: '${v.endDate}', startTime: '${v.startTime}', endTime: '${v.endTime}' }"`);
    if (key === 'invalid') attrs.push('[invalid]="true"', 'errorMessage="La hora hasta debe ser posterior a la hora desde."');
    if (key === 'disabled') attrs.push('[disabled]="true"');
    if (size !== 'md') attrs.push(`size="${size}"`);
    attrs.push('(valueChange)="periodo = $event"');
    return `<cs-datetime-range-picker\n  ${attrs.join('\n  ')}\n/>`;
  }
}
