import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, signal } from '@angular/core';
import { Icon } from '../icons/icon';
import { Calendar } from '../calendar/calendar';
import { InputDropdown } from '../dropdown/input-dropdown';
import type { DropdownSize } from '../dropdown/dropdown-types';
import { generateTimeOptions, formatRangeDisplay, type TimeOption } from './datetime-range-picker-helpers';

export interface DateTimeRangeValue {
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
}

const FIELD_WIDTH = 258;

let uid = 0;

/**
 * Compone `cs-calendar` (selección de rango por dos clics, mismo criterio
 * que la demo de rango de Calendar: el primer clic guarda el extremo
 * pendiente vía `selected`, no `rangeSelected` — todavía no es un rango
 * real) + dos `cs-input-dropdown` para una VENTANA horaria que aplica a
 * todo el rango de fechas ("del 15 al 17 sep, de 8am a 10pm cada día"), no
 * un par de datetimes independientes. Construido a mano
 * (`@HostListener('document:mousedown')`, mismo patrón que InputDropdown),
 * sin librería de terceros.
 */
@Component({
  selector: 'cs-datetime-range-picker',
  imports: [Icon, Calendar, InputDropdown],
  templateUrl: './datetime-range-picker.html',
  styleUrl: './datetime-range-picker.css',
})
export class DateTimeRangePicker implements OnInit {
  @Input() id?: string;
  @Input() defaultValue: DateTimeRangeValue = {};
  @Input() value?: DateTimeRangeValue;
  @Output() readonly valueChange = new EventEmitter<DateTimeRangeValue>();
  @Input() size: DropdownSize = 'md';
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() required = false;
  @Input() helperText?: string;
  @Input() errorText?: string;
  @Input() clearControlLabel = 'Limpiar';
  @Input() timeStep = 30;

  @Input() dateLabel?: string;
  @Input() datePlaceholder = 'Selecciona un rango';
  @Input() disabledDates: string[] = [];
  @Input() minDate?: string;
  @Input() maxDate?: string;
  @Input() weekStartDay: 0 | 1 = 0;

  @Input() timeLabel?: string;
  @Input() startTimePlaceholder = 'Desde';
  @Input() endTimePlaceholder = 'Hasta';

  protected readonly dateOpen = signal(false);
  protected readonly pendingStart = signal<string | null>(null);
  protected readonly viewMonth = signal<number | undefined>(undefined);
  protected readonly viewYear = signal<number | undefined>(undefined);
  protected readonly gridId = `cs-dtrp-${++uid}`;
  protected readonly fieldWidth = FIELD_WIDTH;
  protected resolvedId = '';
  protected helperId = '';
  protected errorId = '';

  private internal: DateTimeRangeValue = {};

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.resolvedId = this.id ?? `cs-datetime-range-picker-${++uid}`;
    this.helperId = `${this.resolvedId}-help`;
    this.errorId = `${this.resolvedId}-error`;
    this.internal = this.defaultValue;
    const sd = this.current.startDate;
    if (sd) {
      const [y, m] = sd.split('-').map(Number);
      this.viewMonth.set(m);
      this.viewYear.set(y);
    }
  }

  protected get current(): DateTimeRangeValue {
    return this.value ?? this.internal;
  }
  protected get hasValue(): boolean {
    return !!(this.current.startDate || this.current.startTime || this.current.endTime);
  }
  protected get iconSize(): number {
    return this.size === 'sm' ? 14 : 16;
  }
  protected get rowHeight(): number {
    return this.size === 'sm' ? 28 : this.size === 'lg' ? 40 : 32;
  }
  protected get displayText(): string {
    const pending = this.pendingStart();
    if (pending) return formatRangeDisplay(pending, undefined);
    return formatRangeDisplay(this.current.startDate, this.current.endDate);
  }
  protected get timeOptions(): TimeOption[] {
    return generateTimeOptions(this.timeStep);
  }
  protected get pendingSelected(): string[] {
    const pending = this.pendingStart();
    return pending ? [pending] : [];
  }
  protected get rangeSelected(): [string, string] | undefined {
    const { startDate, endDate } = this.current;
    return startDate && endDate ? [startDate, endDate] : undefined;
  }

  protected toggleDateOpen(): void {
    if (this.disabled) return;
    this.dateOpen.update((v) => !v);
  }

  protected handleDateClick(iso: string): void {
    const start = this.pendingStart();
    if (!start) {
      this.pendingStart.set(iso);
    } else {
      const [startDate, endDate] = [start, iso].sort();
      this.commit({ ...this.current, startDate, endDate });
      this.pendingStart.set(null);
      this.dateOpen.set(false);
      this.restoreDateFocus();
    }
  }

  protected onMonthChange(e: { month: number; year: number }): void {
    this.viewMonth.set(e.month);
    this.viewYear.set(e.year);
  }

  protected setStartTime(v: string): void {
    this.commit({ ...this.current, startTime: v });
  }
  protected setEndTime(v: string): void {
    this.commit({ ...this.current, endTime: v });
  }
  protected clearAll(): void {
    this.commit({});
    this.restoreDateFocus();
  }

  protected closeDate(): void {
    this.dateOpen.set(false);
    this.pendingStart.set(null);
    this.restoreDateFocus();
  }

  protected get describedBy(): string {
    return this.invalid && this.errorText ? this.errorId : this.helperText ? this.helperId : '';
  }

  private restoreDateFocus(): void {
    setTimeout(() => this.elementRef.nativeElement.querySelector<HTMLButtonElement>('.cs-dtrp__date-trigger')?.focus());
  }

  private commit(next: DateTimeRangeValue): void {
    if (this.value === undefined) this.internal = next;
    this.valueChange.emit(next);
  }

  @HostListener('document:mousedown', ['$event'])
  protected onDocumentMouseDown(e: MouseEvent): void {
    if (this.dateOpen() && !this.elementRef.nativeElement.contains(e.target as Node)) {
      this.dateOpen.set(false);
      this.pendingStart.set(null);
    }
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.dateOpen()) this.closeDate();
  }
}
