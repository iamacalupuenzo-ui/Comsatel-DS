import { NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output, computed, input, linkedSignal, signal } from '@angular/core';
import { Button } from '../button/button';
import { Calendar } from '../calendar/calendar';
import { Icon } from '@iamacalupuenzo-ui/comsatel-ds/icons';
import { InputGroup } from '../input/input-group';
import { InputGroupAddon } from '../input/input-group-addon';
import { InputGroupInput } from '../input/input-group-input';
import type { InputFieldSize } from '../input/input-tokens';
import { Popover } from '../popover/popover';
import { fieldLabelTypography } from '../input/input-tokens';
import { textStyle } from '../tokens/typography';
import { formatDate } from '../format/date-format';

/** Rango de fechas en formato 'YYYY-MM-DD'; `to` vacío mientras se elige el segundo día. */
export interface DateRangeValue {
  from: string;
  to: string;
}

let uid = 0;

/**
 * Filtro de rango de fechas (solo fecha): campo de solo lectura, calendario en un Popover y «Limpiar»
 * en el pie. El primer clic fija el inicio y el segundo, el fin (se ordenan solos). Para rango con
 * horas en una fila de formulario, usa `DateTimeRangePicker`; en paneles angostos, combina este
 * componente con dos `TimePicker`.
 */
@Component({
  selector: 'cs-date-range-picker',
  // El id va en el control interno; en el host quedaría duplicado y el label apuntaría al host.
  host: { '[attr.id]': 'null' },
  imports: [Button, Calendar, Icon, InputGroup, InputGroupAddon, InputGroupInput, Popover, NgStyle],
  templateUrl: './date-range-picker.html',
  styleUrl: './date-range-picker.css',
})
export class DateRangePicker {
  @Input() id?: string;
  @Input() label = '';
  @Input('aria-label') ariaLabel = '';
  @Input() placeholder = 'Selecciona un rango';
  @Input() size: InputFieldSize = 'md';

  /** Tipografía de label de la escala de campos (fieldLabelTypography), igual que Input dropdown. */
  protected get labelStyle(): Record<string, string> {
    return textStyle(fieldLabelTypography[this.size], 'accent');
  }
  @Input() required = false;
  @Input() invalid = false;
  /** Mensaje de error visible, enlazado con aria-errormessage. */
  @Input() errorMessage = '';
  @Input() disabled = false;
  /** Filtro aplicado (con rango elegido): borde, fondo y texto de selección. */
  @Input() active = false;
  @Input() weekStartDay: 0 | 1 = 1;
  @Input() minDate?: string;
  @Input() maxDate?: string;
  @Input() clearLabel = 'Limpiar';
  /** Componente controlado: el consumidor es dueño del rango. */
  readonly value = input<DateRangeValue | null | undefined>({ from: '', to: '' });
  @Output() readonly valueChange = new EventEmitter<DateRangeValue>();

  private readonly uidValue = `cs-date-range-picker-${++uid}`;
  protected readonly open = signal(false);
  protected readonly from = linkedSignal(() => this.value()?.from ?? '');
  protected readonly to = linkedSignal(() => this.value()?.to ?? '');
  protected readonly pendingStart = computed(() => (this.from() && !this.to() ? [this.from()] : []));
  protected readonly rangeSelected = computed<[string, string] | undefined>(() =>
    this.from() && this.to() ? [this.from(), this.to()] : undefined,
  );
  protected readonly displayValue = computed(() => {
    const from = this.from();
    const to = this.to();
    if (!from) return '';
    if (!to) return `Desde ${this.format(from)}`;
    if (from === to) return this.format(from);
    return `${this.format(from)} — ${this.format(to)}`;
  });

  get inputId(): string {
    return this.id ?? this.uidValue;
  }
  get labelId(): string {
    return `${this.inputId}-label`;
  }
  get panelId(): string {
    return `${this.inputId}-panel`;
  }
  get errorId(): string {
    return `${this.inputId}-error`;
  }
  protected get iconSize(): number {
    return this.size === 'sm' ? 14 : 16;
  }

  protected openPicker(): void {
    if (!this.disabled) this.open.set(true);
  }
  protected togglePicker(): void {
    if (!this.disabled) this.open.update((isOpen) => !isOpen);
  }
  protected closePicker(): void {
    this.open.set(false);
  }

  protected selectDate(day: string): void {
    const from = this.from();
    if (!from || this.to()) {
      this.from.set(day);
      this.to.set('');
      this.valueChange.emit({ from: day, to: '' });
      return;
    }
    const [start, end] = [from, day].sort();
    this.from.set(start);
    this.to.set(end);
    this.open.set(false);
    this.valueChange.emit({ from: start, to: end });
  }

  protected clear(): void {
    this.from.set('');
    this.to.set('');
    this.valueChange.emit({ from: '', to: '' });
  }

  /** Formato único del sistema: «27 sep. 2026» (ver format/date-format.ts). */
  private format(value: string): string {
    return formatDate(value);
  }
}
