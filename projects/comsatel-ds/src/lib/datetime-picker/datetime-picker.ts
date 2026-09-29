import { Component, EventEmitter, Input, Output, input, linkedSignal } from '@angular/core';
import { DatePicker } from '../date-picker/date-picker';
import type { InputFieldSize } from '../input/input-tokens';
import { TimePicker } from '../time-picker/time-picker';

/** Fecha 'YYYY-MM-DD' y hora 'HH:mm' (24 h); cada parte vacía si falta. */
export interface DateTimeValue {
  date: string;
  time: string;
}

let uid = 0;

/**
 * Organismo de fecha y hora: DatePicker y TimePicker lado a lado. Cada
 * campo conserva su propio comportamiento (calendario en un Popover y
 * columnas de hora y minutos); este componente solo los agrupa y emite los
 * dos valores juntos. Si el ancho no alcanza, la hora baja debajo de la fecha.
 */
@Component({
  selector: 'cs-datetime-picker',
  host: { '[attr.id]': 'null' },
  imports: [DatePicker, TimePicker],
  template: `
    <div class="cs-datetime-picker" role="group" [attr.aria-label]="ariaLabel || null">
      <cs-date-picker
        [id]="baseId + '-date'"
        [label]="dateLabel"
        [placeholder]="datePlaceholder"
        [size]="size"
        [required]="required"
        [disabled]="disabled"
        [invalid]="invalid"
        [minDate]="minDate"
        [maxDate]="maxDate"
        [weekStartDay]="weekStartDay"
        [value]="date()"
        (valueChange)="setDate($event)"
      />
      <cs-time-picker
        [id]="baseId + '-time'"
        [label]="timeLabel"
        [size]="size"
        [required]="required"
        [disabled]="disabled"
        [invalid]="invalid"
        [minuteStep]="minuteStep()"
        [value]="time()"
        (valueChange)="setTime($event)"
      />
    </div>
    @if (invalid && errorMessage) {
      <p class="cs-datetime-picker__error" role="alert">{{ errorMessage }}</p>
    }
  `,
  styles: [
    `
      :host {
        display: grid;
        gap: var(--layout-gap-xs);
      }
      .cs-datetime-picker {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        gap: var(--layout-gap-md);
      }
      .cs-datetime-picker > cs-date-picker {
        flex: 1 1 calc(var(--layout-size-3xl) * 2.5);
      }
      .cs-datetime-picker > cs-time-picker {
        flex: 0 1 calc(var(--layout-size-3xl) * 1.75);
      }
      .cs-datetime-picker__error {
        margin: 0;
        color: var(--color-text-danger-default);
        font-family: var(--font-family-content);
        font-size: var(--font-size-content-note);
        line-height: var(--font-line-height-content-note);
      }
    `,
  ],
})
export class DateTimePicker {
  @Input() id?: string;
  /** Nombre del grupo para lectores de pantalla, por ejemplo «Fecha y hora de la captura». */
  @Input('aria-label') ariaLabel = '';
  @Input() dateLabel = 'Fecha';
  @Input() timeLabel = 'Hora';
  @Input() datePlaceholder = 'Selecciona una fecha';
  @Input() size: InputFieldSize = 'md';
  @Input() required = false;
  @Input() disabled = false;
  @Input() invalid = false;
  /** Error del conjunto (por ejemplo «La hora es obligatoria»), debajo de los dos campos. */
  @Input() errorMessage = '';
  @Input() minDate?: string;
  @Input() maxDate?: string;
  @Input() weekStartDay: 0 | 1 = 1;
  /** Intervalo de la columna de minutos del TimePicker. */
  readonly minuteStep = input(5);
  /** Componente controlado. */
  readonly value = input<DateTimeValue | null | undefined>({ date: '', time: '' });
  @Output() readonly valueChange = new EventEmitter<DateTimeValue>();

  private readonly autoId = `cs-datetime-picker-${++uid}`;
  protected get baseId(): string {
    return this.id ?? this.autoId;
  }
  protected readonly date = linkedSignal(() => this.value()?.date ?? '');
  protected readonly time = linkedSignal(() => this.value()?.time ?? '');

  protected setDate(date: string): void {
    this.date.set(date);
    this.valueChange.emit({ date, time: this.time() });
  }
  protected setTime(time: string): void {
    this.time.set(time);
    this.valueChange.emit({ date: this.date(), time });
  }
}
