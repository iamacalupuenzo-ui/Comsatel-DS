import { Component, computed, signal } from '@angular/core';
import { DateTimePicker } from 'comsatel-ds';
import { DemoShell, type ControlDef, type ControlOption, type DemoState } from '../../shared/docs/demo-shell';

const WEEK_START_OPTIONS: ControlOption[] = [
  { value: '0', label: 'Domingo' },
  { value: '1', label: 'Lunes' },
];

const DISABLED_DATES = ['2026-12-07', '2026-12-08', '2026-12-09', '2026-12-16', '2026-12-17', '2026-12-18'];

@Component({
  selector: 'app-datetime-picker-page',
  imports: [DateTimePicker, DemoShell],
  templateUrl: './datetime-picker-page.html',
  styleUrl: './datetime-picker-page.css',
})
export class DateTimePickerPage {
  protected readonly disabledDates = DISABLED_DATES;

  /* Playground */
  protected readonly playgroundControls: ControlDef[] = [
    { kind: 'select', label: 'Inicio de semana', key: 'weekStart', options: WEEK_START_OPTIONS, default: '0' },
  ];
  protected readonly pgWeekStart = signal<0 | 1>(0);

  protected onPlaygroundState(s: DemoState): void {
    if (s['weekStart'] !== undefined) this.pgWeekStart.set(Number(s['weekStart']) as 0 | 1);
  }

  protected readonly pgCode = computed(() => {
    const wsd = this.pgWeekStart();
    return (
      `<cs-datetime-picker\n` +
      `  [datePickerProps]="{ label: 'Fecha'${wsd ? `, weekStartDay: ${wsd}` : ''} }"\n` +
      `  [timePickerProps]="{ label: 'Hora' }"\n` +
      `></cs-datetime-picker>`
    );
  });
}
