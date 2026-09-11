import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';
import { Calendar } from '../calendar/calendar';
import { Icon } from '../icons/icon';
import { InputDropdown } from '../dropdown/input-dropdown';
import type { InputDropdownOption } from '../dropdown/dropdown-types';
import { InputGroup } from '../input/input-group';
import { InputGroupAddon } from '../input/input-group-addon';
import { InputGroupInput } from '../input/input-group-input';
import {
  combineValue,
  formatDateDisplay,
  generateTimeOptions,
  parseTypedDate,
  splitValue,
} from './datetime-picker-helpers';

export type DateTimePickerSize = 'sm' | 'md' | 'lg';

export interface DateTimePickerDateProps {
  label?: string;
  placeholder?: string;
  disabled?: string[];
  minDate?: string;
  maxDate?: string;
  weekStartDay?: 0 | 1;
}

export interface DateTimePickerTimeProps {
  label?: string;
  placeholder?: string;
}

let uid = 0;

// Puerto 1:1 de DateTimePicker (datetime-picker.tsx) — combina el campo de
// fecha (InputGroup + Calendar en popover) con un campo de hora
// (InputDropdown). Fecha y hora se guardan como signals SEPARADOS (no un
// solo string ISO combinado) para que elegir la hora antes que la fecha no
// se pierda al no poder formar un ISO completo todavía.
//
// `value`/`defaultValue`/`timeStep` usan input() porque los leen computed()
// (dateIso/time/timeOptions) — un @Input() clásico ahí nunca invalidaría el
// caché (ver C4 en audit-checklist.md). El resto de props solo se leen en
// el template o en getters simples, así que quedan como @Input() normal.
//
// Todo lo que siembra estado inicial desde `value()`/`defaultValue()`/
// `fieldId()` se hace en ngOnInit(), NO en el inicializador de campo: un
// input() señal leído en el inicializador de campo de la MISMA clase
// todavía no tiene el valor vinculado desde el template (solo su default),
// el mismo bug ya encontrado y corregido en Calendar (ver comentario ahí) —
// acá se repetía en resolvedId/internalDate/internalTime/inputText/
// viewMonth/viewYear, así que ninguna demo con `defaultValue` mostraba la
// fecha precargada.
@Component({
  selector: 'cs-datetime-picker',
  imports: [Calendar, Icon, InputDropdown, InputGroup, InputGroupAddon, InputGroupInput],
  templateUrl: './datetime-picker.html',
  styleUrl: './datetime-picker.css',
})
export class DateTimePicker implements OnInit {
  readonly value = input<string>();
  readonly defaultValue = input<string>();
  readonly timeStep = input(30);
  // input() (no @Input clásico) a propósito: resolvedId se calcula una sola
  // vez en el field initializer de abajo, y solo un input signal-based
  // garantiza tener el valor real ahí — un @Input() decorador clásico
  // todavía es `undefined` en ese momento (Angular lo asigna después de
  // construir la instancia), así que ID pasado desde afuera se perdería
  // siempre y caería al autogenerado.
  readonly fieldId = input<string>();
  @Output() valueChange = new EventEmitter<string>();

  @Input() size: DateTimePickerSize = 'md';
  @Input() disabled = false;
  @Input() invalid = false;
  @Input() required = false;
  @Input() helperText?: string;
  @Input() errorText?: string;
  @Input() clearControlLabel = 'Limpiar';
  @Input() datePickerProps: DateTimePickerDateProps = {};
  @Input() timePickerProps: DateTimePickerTimeProps = {};

  protected readonly FIELD_WIDTH = 258;
  protected resolvedId = '';
  protected gridId = '';
  protected helperId = '';
  protected errorId = '';

  private readonly internalDate = signal<string | undefined>(undefined);
  private readonly internalTime = signal<string | undefined>(undefined);

  protected readonly isControlled = computed(() => this.value() !== undefined);
  protected readonly dateIso = computed(() => {
    const v = this.value();
    return v !== undefined ? splitValue(v).dateIso : this.internalDate();
  });
  protected readonly time = computed(() => {
    const v = this.value();
    return v !== undefined ? splitValue(v).time : this.internalTime();
  });

  protected readonly dateOpen = signal(false);
  private readonly focused = signal(false);
  private restoringFocus = false;

  protected readonly inputText = signal('');
  protected readonly viewMonth = signal<number | undefined>(undefined);
  protected readonly viewYear = signal<number | undefined>(undefined);

  protected readonly timeOptions = computed<InputDropdownOption[]>(() => generateTimeOptions(this.timeStep()));

  @ViewChild('dateField') private dateFieldRef?: ElementRef<HTMLElement>;

  constructor() {
    // effect() necesita un contexto de inyección — el constructor lo
    // garantiza, ngOnInit() no. El cuerpo de estos dos igual se autocorrige
    // aunque corran antes que ngOnInit(): al ser reactivos, vuelven a
    // ejecutarse solos en cuanto ngOnInit() haga `.set()` sobre las signals
    // de las que dependen (internalDate/internalTime vía dateIso()).

    // Refleja dateIso en el texto escrito, salvo mientras el campo tiene
    // foco (no pisar lo que el usuario está tipeando en ese momento).
    effect(() => {
      if (!this.focused()) this.inputText.set(formatDateDisplay(this.dateIso()));
    });
    // En modo controlado, si el valor cambia desde afuera, el calendario
    // salta a mostrar ese mes/año.
    effect(() => {
      const iso = this.dateIso();
      if (this.isControlled() && iso) {
        this.viewMonth.set(Number(iso.split('-')[1]));
        this.viewYear.set(Number(iso.split('-')[0]));
      }
    });
  }

  ngOnInit(): void {
    this.resolvedId = this.fieldId() ?? `cs-datetime-picker-${++uid}`;
    this.gridId = `${this.resolvedId}-grid`;
    this.helperId = `${this.resolvedId}-help`;
    this.errorId = `${this.resolvedId}-error`;

    const initial = splitValue(this.defaultValue());
    this.internalDate.set(initial.dateIso);
    this.internalTime.set(initial.time);

    const initialIso = splitValue(this.value() ?? this.defaultValue()).dateIso;
    this.inputText.set(formatDateDisplay(initialIso));
    if (initialIso) {
      this.viewMonth.set(Number(initialIso.split('-')[1]));
      this.viewYear.set(Number(initialIso.split('-')[0]));
    }
  }

  @HostListener('document:mousedown', ['$event'])
  protected onDocumentMouseDown(event: MouseEvent): void {
    if (this.dateOpen() && this.dateFieldRef && !this.dateFieldRef.nativeElement.contains(event.target as Node)) {
      this.dateOpen.set(false);
    }
  }

  private commit(nextDateIso?: string, nextTime?: string): void {
    if (!this.isControlled()) {
      this.internalDate.set(nextDateIso);
      this.internalTime.set(nextTime);
    }
    this.valueChange.emit(combineValue(nextDateIso, nextTime));
  }

  private jumpViewTo(iso: string): void {
    this.viewMonth.set(Number(iso.split('-')[1]));
    this.viewYear.set(Number(iso.split('-')[0]));
  }

  protected onDateFocus(): void {
    this.focused.set(true);
    if (this.restoringFocus) {
      this.restoringFocus = false;
      return;
    }
    this.dateOpen.set(true);
  }
  protected onDateBlur(): void {
    this.focused.set(false);
  }

  protected onDateInputChange(text: string): void {
    this.inputText.set(text);
    const parsed = parseTypedDate(text);
    if (parsed) {
      this.commit(parsed, this.time());
      this.jumpViewTo(parsed);
    }
  }

  protected onDateEnter(): void {
    const parsed = parseTypedDate(this.inputText());
    if (parsed) {
      this.commit(parsed, this.time());
      this.jumpViewTo(parsed);
    }
    this.dateOpen.set(false);
    this.restoreDateFocus();
  }

  protected onCalendarChange(iso: string): void {
    this.commit(iso, this.time());
    this.dateOpen.set(false);
    this.restoreDateFocus();
  }

  protected onCalendarMonthChange(next: { month: number; year: number }): void {
    this.viewMonth.set(next.month);
    this.viewYear.set(next.year);
  }

  protected onTimeChange(nextTime: string): void {
    this.commit(this.dateIso(), nextTime);
  }

  protected onClear(): void {
    this.commit(undefined, undefined);
    this.restoreDateFocus();
  }

  protected onDateEscape(): void {
    this.dateOpen.set(false);
    this.restoreDateFocus();
  }

  private restoreDateFocus(): void {
    this.restoringFocus = true;
    setTimeout(() => this.dateFieldRef?.nativeElement.querySelector<HTMLInputElement>('input')?.focus());
  }

  protected get describedBy(): string {
    return this.invalid && this.errorText ? this.errorId : this.helperText ? this.helperId : '';
  }

  protected get iconSize(): number {
    return this.size === 'sm' ? 14 : 16;
  }
  protected get rowHeight(): number {
    return this.size === 'sm' ? 28 : this.size === 'lg' ? 40 : 32;
  }
  protected get datePlaceholder(): string {
    return this.datePickerProps.placeholder ?? 'Selecciona una fecha';
  }
  protected get timePlaceholder(): string {
    return this.timePickerProps.placeholder ?? 'Selecciona una hora';
  }
}
