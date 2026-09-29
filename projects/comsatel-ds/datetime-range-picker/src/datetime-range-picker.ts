import { Component, EventEmitter, Input, Output, input, linkedSignal } from '@angular/core';
import { DateRangePicker, type DateRangeValue } from '@iamacalupuenzo-ui/comsatel-ds/date-range-picker';
import type { InputFieldSize } from '@iamacalupuenzo-ui/comsatel-ds/input';
import { TimePicker } from '@iamacalupuenzo-ui/comsatel-ds/time-picker';

/** Rango con horas: fechas 'YYYY-MM-DD' y horas 'HH:mm' (24 h); vacío si falta. */
export interface DateTimeRangeValue {
  startDate?: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
}

let uid = 0;

/**
 * Organismo de rango con horas: DateRangePicker y dos TimePicker («Hora
 * desde» y «Hora hasta»). Cada campo conserva su comportamiento; este
 * componente los agrupa y emite los cuatro valores juntos. Si el ancho no
 * alcanza, las horas bajan debajo del rango.
 */
@Component({
  selector: 'cs-datetime-range-picker',
  host: { '[attr.id]': 'null' },
  imports: [DateRangePicker, TimePicker],
  template: `
    <div class="cs-datetime-range-picker" role="group" [attr.aria-label]="ariaLabel || null">
      <cs-date-range-picker
        [id]="baseId + '-dates'"
        [label]="dateLabel"
        [placeholder]="datePlaceholder"
        [size]="size"
        [required]="required"
        [disabled]="disabled"
        [invalid]="invalid"
        [minDate]="minDate"
        [maxDate]="maxDate"
        [weekStartDay]="weekStartDay"
        [active]="active"
        [value]="{ from: startDate(), to: endDate() }"
        (valueChange)="setDates($event)"
      />
      <div class="cs-datetime-range-picker__times">
        <cs-time-picker
          [id]="baseId + '-from'"
          [label]="startTimeLabel"
          [size]="size"
          [disabled]="disabled"
          [invalid]="invalid"
          [minuteStep]="minuteStep()"
          [active]="active"
          [value]="startTime()"
          (valueChange)="setStartTime($event)"
        />
        <cs-time-picker
          [id]="baseId + '-to'"
          [label]="endTimeLabel"
          [size]="size"
          [disabled]="disabled"
          [invalid]="invalid"
          [minuteStep]="minuteStep()"
          [active]="active"
          [value]="endTime()"
          (valueChange)="setEndTime($event)"
        />
      </div>
    </div>
    @if (invalid && errorMessage) {
      <p class="cs-datetime-range-picker__error" role="alert">{{ errorMessage }}</p>
    }
  `,
  styles: [
    `
      :host {
        display: grid;
        gap: var(--layout-gap-xs);
      }
      .cs-datetime-range-picker {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        gap: var(--layout-gap-md);
      }
      .cs-datetime-range-picker > cs-date-range-picker {
        flex: 1 1 calc(var(--layout-size-3xl) * 3);
      }
      /* Crece para ocupar la fila: en un panel angosto las dos horas se reparten todo el ancho. */
      .cs-datetime-range-picker__times {
        display: flex;
        flex: 1 1 calc(var(--layout-size-3xl) * 3);
        gap: var(--layout-gap-md);
      }
      .cs-datetime-range-picker__times > cs-time-picker {
        flex: 1 1 calc(var(--layout-size-3xl) * 1.5);
      }
      .cs-datetime-range-picker__error {
        margin: 0;
        color: var(--color-text-danger-default);
        font-family: var(--font-family-content);
        font-size: var(--font-size-content-note);
        line-height: var(--font-line-height-content-note);
      }
    `,
  ],
})
export class DateTimeRangePicker {
  @Input() id?: string;
  /** Nombre del grupo para lectores de pantalla, por ejemplo «Periodo de la bitácora». */
  @Input('aria-label') ariaLabel = '';
  @Input() dateLabel = 'Fechas';
  @Input() startTimeLabel = 'Hora desde';
  @Input() endTimeLabel = 'Hora hasta';
  @Input() datePlaceholder = 'Selecciona un rango';
  @Input() size: InputFieldSize = 'md';
  @Input() required = false;
  @Input() disabled = false;
  @Input() invalid = false;
  /** Error del conjunto (por ejemplo «La hora hasta debe ser posterior»), debajo de los campos. */
  @Input() errorMessage = '';
  @Input() minDate?: string;
  @Input() maxDate?: string;
  @Input() weekStartDay: 0 | 1 = 1;
  /** Filtro aplicado: estilo de selección en los campos con valor (como en DateRangePicker y TimePicker). */
  @Input() active = false;
  /** Intervalo de la columna de minutos de los TimePicker. */
  readonly minuteStep = input(5);
  /** Componente controlado. */
  readonly value = input<DateTimeRangeValue | null | undefined>({});
  @Output() readonly valueChange = new EventEmitter<DateTimeRangeValue>();

  private readonly autoId = `cs-datetime-range-picker-${++uid}`;
  protected get baseId(): string {
    return this.id ?? this.autoId;
  }
  protected readonly startDate = linkedSignal(() => this.value()?.startDate ?? '');
  protected readonly endDate = linkedSignal(() => this.value()?.endDate ?? '');
  protected readonly startTime = linkedSignal(() => this.value()?.startTime ?? '');
  protected readonly endTime = linkedSignal(() => this.value()?.endTime ?? '');

  protected setDates(range: DateRangeValue): void {
    this.startDate.set(range.from);
    this.endDate.set(range.to);
    this.emit();
  }
  protected setStartTime(time: string): void {
    this.startTime.set(time);
    this.emit();
  }
  protected setEndTime(time: string): void {
    this.endTime.set(time);
    this.emit();
  }
  private emit(): void {
    this.valueChange.emit({ startDate: this.startDate(), endDate: this.endDate(), startTime: this.startTime(), endTime: this.endTime() });
  }
}
