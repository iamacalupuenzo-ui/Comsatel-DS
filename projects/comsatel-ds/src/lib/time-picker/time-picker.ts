import { NgStyle } from '@angular/common';
import { Component, EventEmitter, Input, Output, computed, input, linkedSignal, signal } from '@angular/core';
import { Button } from '@iamacalupuenzo-ui/comsatel-ds/button';
import { Icon } from '@iamacalupuenzo-ui/comsatel-ds/icons';
import { InputGroup } from '@iamacalupuenzo-ui/comsatel-ds/input';
import { InputGroupAddon } from '@iamacalupuenzo-ui/comsatel-ds/input';
import { InputGroupInput } from '@iamacalupuenzo-ui/comsatel-ds/input';
import type { InputFieldSize } from '@iamacalupuenzo-ui/comsatel-ds/input';
import { Popover } from '@iamacalupuenzo-ui/comsatel-ds/popover';
import { fieldLabelTypography } from '@iamacalupuenzo-ui/comsatel-ds/input';
import { textStyle } from '@iamacalupuenzo-ui/comsatel-ds/tokens';

let uid = 0;

/**
 * Selector de hora con dos columnas rotuladas (hora y minuto) y «Limpiar» en el mismo panel.
 * Reemplaza el `<input type="time">` nativo, cuyo popup lo dibuja el sistema operativo y no admite
 * diseño ni acciones. Valor en formato 'HH:mm' (24 h); vacío si no hay hora.
 */
@Component({
  selector: 'cs-time-picker',
  // El id va en el control interno; en el host quedaría duplicado y el label apuntaría al host.
  host: { '[attr.id]': 'null' },
  imports: [Button, Icon, InputGroup, InputGroupAddon, InputGroupInput, Popover, NgStyle],
  templateUrl: './time-picker.html',
  styleUrl: './time-picker.css',
})
export class TimePicker {
  @Input() id?: string;
  @Input() label = '';
  @Input('aria-label') ariaLabel = '';
  @Input() placeholder = '--:--';
  @Input() size: InputFieldSize = 'md';

  /** Tipografía de label de la escala de campos (fieldLabelTypography), igual que Input dropdown. */
  protected get labelStyle(): Record<string, string> {
    return textStyle(fieldLabelTypography[this.size], 'accent');
  }
  /** Intervalo de la columna de minutos (1 a 30). */
  readonly minuteStep = input(5);
  @Input() required = false;
  @Input() invalid = false;
  /** Mensaje de error visible, enlazado con aria-errormessage. */
  @Input() errorMessage = '';
  @Input() disabled = false;
  /** Filtro aplicado (con hora elegida): borde, fondo y texto de selección. */
  @Input() active = false;
  @Input() clearLabel = 'Limpiar';
  /** Hora 'HH:mm' (24 h); vacío si no hay hora. */
  readonly value = input<string | null | undefined>('');
  @Output() readonly valueChange = new EventEmitter<string>();

  private readonly uidValue = `cs-time-picker-${++uid}`;
  protected readonly hours = Array.from({ length: 24 }, (_, i) => i);
  protected readonly minutes = computed(() => {
    const step = Math.min(30, Math.max(1, Math.round(this.minuteStep() || 5)));
    return Array.from({ length: Math.ceil(60 / step) }, (_, i) => i * step);
  });
  protected readonly open = signal(false);
  private readonly current = linkedSignal(() => this.value() ?? '');
  protected readonly hour = computed(() => (this.current() ? Number(this.current().split(':')[0]) : null));
  protected readonly minute = computed(() => (this.current() ? Number(this.current().split(':')[1]) : null));
  protected readonly displayValue = this.current.asReadonly();

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
  protected selectHour(h: number): void {
    this.emit(h, this.minute() ?? 0);
  }
  protected selectMinute(m: number): void {
    this.emit(this.hour() ?? 0, m);
  }
  protected clear(): void {
    this.current.set('');
    this.valueChange.emit('');
  }
  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }
  private emit(h: number, m: number): void {
    const next = `${this.pad(h)}:${this.pad(m)}`;
    this.current.set(next);
    this.valueChange.emit(next);
  }
}
