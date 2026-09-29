import { NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output, computed, input, linkedSignal, signal } from '@angular/core';
import { Button } from '@iamacalupuenzo-ui/comsatel-ds/button';
import { Calendar } from '../calendar/calendar';
import { formatDate } from '../format/date-format';
import { Icon } from '@iamacalupuenzo-ui/comsatel-ds/icons';
import { InputGroup } from '@iamacalupuenzo-ui/comsatel-ds/input';
import { InputGroupAddon } from '@iamacalupuenzo-ui/comsatel-ds/input';
import { InputGroupInput } from '@iamacalupuenzo-ui/comsatel-ds/input';
import { fieldLabelTypography, type InputFieldSize } from '@iamacalupuenzo-ui/comsatel-ds/input';
import { Popover } from '@iamacalupuenzo-ui/comsatel-ds/popover';
import { textStyle } from '@iamacalupuenzo-ui/comsatel-ds/tokens';

let uid = 0;

/**
 * Selector de una fecha: campo de solo lectura con la fecha en el formato del
 * sistema («27 sep. 2026»), calendario en un Popover y «Limpiar» en el pie.
 * Mismo aspecto que DateRangePicker. Valor 'YYYY-MM-DD'; vacío si no hay fecha.
 */
@Component({
  selector: 'cs-date-picker',
  // El id va en el control interno; en el host quedaría duplicado y el label apuntaría al host.
  host: { '[attr.id]': 'null' },
  imports: [Button, Calendar, Icon, InputGroup, InputGroupAddon, InputGroupInput, NgStyle, Popover],
  template: `
    <div class="cs-date-picker-field">
      @if (label) {
        <span class="cs-date-picker-field__label" [ngStyle]="labelStyle" [id]="labelId">
          {{ label }}
          @if (required) {
            <span class="cs-date-picker-field__required" aria-hidden="true">*</span>
          }
        </span>
      }
      <div #trigger class="cs-date-picker-field__trigger">
        <cs-input-group [active]="active && !!date()">
          <cs-input-group-input
            [id]="inputId"
            [fieldSize]="size"
            [readonly]="true"
            [disabled]="disabled"
            [invalid]="invalid"
            [required]="required"
            [value]="displayValue()"
            [placeholder]="placeholder"
            ariaHasPopup="dialog"
            [ariaExpanded]="open()"
            [ariaControls]="panelId"
            [aria-labelledby]="label ? labelId : ''"
            [aria-label]="label ? '' : ariaLabel"
            [aria-errormessage]="invalid && errorMessage ? errorId : ''"
            (focused)="openPicker()"
            (enterKey)="togglePicker()"
            (escapeKey)="closePicker()"
          />
          <cs-input-group-addon align="inline-end" [compact]="true">
            <button
              type="button"
              class="cs-date-picker-field__icon-button"
              aria-label="Abrir calendario"
              [disabled]="disabled"
              [attr.aria-expanded]="open()"
              [attr.aria-controls]="panelId"
              (click)="togglePicker()"
            >
              <cs-icon name="calendar" [size]="size === 'sm' ? 14 : 16" aria-hidden="true" />
            </button>
          </cs-input-group-addon>
        </cs-input-group>
      </div>

      <cs-popover
        [isOpen]="open()"
        [triggerRef]="trigger"
        placement="bottom-start"
        [offset]="4"
        role="dialog"
        [ariaLabel]="'Seleccionar ' + (label || ariaLabel || 'fecha')"
        [bare]="true"
        (closed)="closePicker()"
      >
        <div [id]="panelId" class="cs-date-picker-panel">
          <cs-calendar
            [selected]="date() ? [date()] : []"
            [weekStartDay]="weekStartDay"
            [minDate]="minDate"
            [maxDate]="maxDate"
            [ariaLabelledby]="label ? labelId : undefined"
            (dateChange)="selectDate($event)"
          />
          <div class="cs-date-picker-panel__actions">
            <cs-button variant="tertiary" size="sm" [disabled]="!date()" (click)="clear()">{{ clearLabel }}</cs-button>
          </div>
        </div>
      </cs-popover>

      @if (invalid && errorMessage) {
        <p class="cs-date-picker-field__error" [id]="errorId">{{ errorMessage }}</p>
      }
    </div>
  `,
  styleUrl: '../date-range-picker/date-range-picker.css',
})
export class DatePicker {
  @Input() id?: string;
  @Input() label = '';
  @Input('aria-label') ariaLabel = '';
  @Input() placeholder = 'Selecciona una fecha';
  @Input() size: InputFieldSize = 'md';
  @Input() required = false;
  @Input() invalid = false;
  /** Mensaje de error visible, enlazado con aria-errormessage. */
  @Input() errorMessage = '';
  @Input() disabled = false;
  /** Filtro aplicado (con fecha elegida): borde, fondo y texto de selección. */
  @Input() active = false;
  @Input() weekStartDay: 0 | 1 = 1;
  @Input() minDate?: string;
  @Input() maxDate?: string;
  @Input() clearLabel = 'Limpiar';
  /** Componente controlado: fecha 'YYYY-MM-DD' o vacío. */
  readonly value = input<string | null | undefined>('');
  @Output() readonly valueChange = new EventEmitter<string>();

  private readonly uidValue = `cs-date-picker-${++uid}`;
  protected readonly open = signal(false);
  protected readonly date = linkedSignal(() => this.value() ?? '');
  protected readonly displayValue = computed(() => formatDate(this.date()));

  /** Tipografía de label de la escala de campos (fieldLabelTypography), igual que Input dropdown. */
  protected get labelStyle(): Record<string, string> {
    return textStyle(fieldLabelTypography[this.size], 'accent');
  }
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
    this.date.set(day);
    this.open.set(false);
    this.valueChange.emit(day);
  }
  protected clear(): void {
    this.date.set('');
    this.valueChange.emit('');
  }
}
