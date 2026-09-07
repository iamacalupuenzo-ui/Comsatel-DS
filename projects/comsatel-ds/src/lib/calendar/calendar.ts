import { Component, EventEmitter, OnInit, Output, computed, input, signal } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Icon } from '../icons/icon';
import { componentTypography, textStyle } from '../tokens/typography';
import { buildWeeks, monthYearLabel, toISODate, weekdayLabels, type DayCellData } from './calendar-helpers';

// Puerto 1:1 de Calendar (calendar.tsx) — grilla de 6 semanas fijas,
// selección simple/rango/deshabilitado, navegación mes/año. Controlado o no
// controlado, igual que React: si `month`/`year` vienen seteados desde
// afuera, la navegación interna deja de mover el estado propio y solo emite
// `monthChange` para que el consumidor decida (lo usa DateTimePicker para
// mantener el mes visible sincronizado con la fecha escrita a mano).
//
// `month`/`year`/`defaultMonth`/`defaultYear` usan input() (signal-based) en
// vez de @Input() clásico porque currentMonth/currentYear son computed() que
// los leen — un @Input() plano nunca invalida el caché de un computed() (ver
// C4 en audit-checklist.md).
//
// internalMonth/internalYear se siembran en ngOnInit(), NO en el
// inicializador de campo — un input() señal leído en el inicializador de
// campo de la MISMA clase todavía no tiene el valor vinculado desde el
// template (solo ve su default), así que `signal(this.defaultMonth() ?? …)`
// ahí siempre caía al mes actual aunque el consumidor pasara
// `[defaultMonth]="12"`. Bug real encontrado probando la interacción: el
// Playground mostraba "Septiembre" en vez de "Diciembre" pese al binding
// correcto — variante nueva de C4, agregada al checklist.
@Component({
  selector: 'cs-calendar',
  imports: [Icon, NgStyle],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
})
export class Calendar implements OnInit {
  readonly defaultMonth = input<number>();
  readonly defaultYear = input<number>();
  readonly month = input<number>();
  readonly year = input<number>();
  readonly selected = input<string[]>([]);
  readonly previouslySelected = input<string[]>([]);
  readonly rangeSelected = input<[string, string]>();
  readonly disabledDates = input<string[]>([], { alias: 'disabled' });
  readonly minDate = input<string>();
  readonly maxDate = input<string>();
  readonly weekStartDay = input<0 | 1>(0);

  @Output() dateChange = new EventEmitter<string>();
  @Output() monthChange = new EventEmitter<{ month: number; year: number }>();

  private readonly today = new Date();
  protected readonly todayIso = toISODate(this.today);
  protected readonly hoveredIso = signal<string | null>(null);

  private readonly internalMonth = signal<number | null>(null);
  private readonly internalYear = signal<number | null>(null);

  ngOnInit(): void {
    this.internalMonth.set(this.defaultMonth() ?? this.today.getMonth() + 1);
    this.internalYear.set(this.defaultYear() ?? this.today.getFullYear());
  }

  protected readonly currentMonth = computed(
    () => this.month() ?? this.internalMonth() ?? this.today.getMonth() + 1,
  );
  protected readonly currentYear = computed(
    () => this.year() ?? this.internalYear() ?? this.today.getFullYear(),
  );

  protected readonly weeks = computed(() =>
    buildWeeks(this.currentYear(), this.currentMonth(), this.weekStartDay()),
  );
  protected readonly weekdays = computed(() => weekdayLabels(this.weekStartDay()));
  protected readonly label = computed(() => monthYearLabel(this.currentYear(), this.currentMonth()));

  private readonly rangeBounds = computed<[string?, string?]>(() => {
    const r = this.rangeSelected();
    return r ? ([...r].sort() as [string, string]) : [undefined, undefined];
  });
  protected readonly rangeStartIso = computed(() => this.rangeBounds()[0]);
  protected readonly rangeEndIso = computed(() => this.rangeBounds()[1]);

  protected readonly labelStyle = computed(() => ({
    ...textStyle(componentTypography.calendar.header, 'emphasis'),
    color: 'var(--color-text-base-boldest)',
  }));
  protected readonly weekdayStyle = {
    ...textStyle(componentTypography.calendar.weekday),
    color: 'var(--color-text-base-subtlest)',
    textAlign: 'center',
    paddingBlock: 'var(--layout-padding-2xs)',
  };
  private readonly dayTextStyle = textStyle(componentTypography.calendar.day);

  private goTo(nextMonth: number, nextYear: number): void {
    if (this.month() === undefined || this.year() === undefined) {
      this.internalMonth.set(nextMonth);
      this.internalYear.set(nextYear);
    }
    this.monthChange.emit({ month: nextMonth, year: nextYear });
  }

  protected shiftMonth(delta: number): void {
    let m = this.currentMonth() + delta;
    let y = this.currentYear();
    if (m < 1) { m = 12; y -= 1; }
    if (m > 12) { m = 1; y += 1; }
    this.goTo(m, y);
  }

  protected shiftYear(delta: number): void {
    this.goTo(this.currentMonth(), this.currentYear() + delta);
  }

  protected isDisabled(iso: string): boolean {
    if (this.disabledDates().includes(iso)) return true;
    const min = this.minDate();
    const max = this.maxDate();
    if (min && iso < min) return true;
    if (max && iso > max) return true;
    return false;
  }

  protected isSelected(iso: string): boolean {
    return this.selected().includes(iso);
  }
  protected isRangeEdge(iso: string): boolean {
    return iso === this.rangeStartIso() || iso === this.rangeEndIso();
  }
  protected isPrevSelected(iso: string): boolean {
    return this.previouslySelected().includes(iso);
  }
  protected isInRange(iso: string): boolean {
    const start = this.rangeStartIso();
    const end = this.rangeEndIso();
    return !!start && !!end && iso > start && iso < end;
  }
  protected isToday(iso: string): boolean {
    return iso === this.todayIso;
  }

  protected onDayClick(cell: DayCellData): void {
    if (!this.isDisabled(cell.iso)) this.dateChange.emit(cell.iso);
  }

  protected dayStyle(cell: DayCellData): Record<string, string> {
    const iso = cell.iso;
    const dayDisabled = this.isDisabled(iso);
    const selected = this.isSelected(iso) || this.isRangeEdge(iso);
    const today = this.isToday(iso);

    let bg = 'transparent';
    let color = cell.inCurrentMonth ? 'var(--color-text-base-default)' : 'var(--color-text-base-subtlest)';
    if (selected) {
      bg = 'var(--color-background-brand-default)';
      color = 'var(--color-text-inverse)';
    } else if (this.isPrevSelected(iso)) {
      bg = 'var(--color-background-brand-subtle)';
      color = 'var(--color-text-brand-bolder)';
    } else if (this.isInRange(iso)) {
      color = 'var(--color-text-brand-bolder)';
    } else if (this.hoveredIso() === iso && !dayDisabled) {
      bg = 'var(--color-background-neutral-subtlest-hover)';
    }

    return {
      ...this.dayTextStyle,
      backgroundColor: bg,
      color: dayDisabled ? 'var(--color-text-disabled)' : color,
      border: today && !selected ? '1px solid var(--color-border-brand-default)' : '1px solid transparent',
      opacity: dayDisabled ? 'var(--opacity-disabled)' : '1',
    };
  }

  protected cellStyle(cell: DayCellData): Record<string, string> {
    const iso = cell.iso;
    const start = this.rangeStartIso();
    const end = this.rangeEndIso();
    const inRange = this.isInRange(iso) || this.isRangeEdge(iso);
    return {
      backgroundColor: inRange ? 'var(--color-background-brand-subtle)' : 'transparent',
      borderTopLeftRadius: iso === start ? 'var(--radius-full)' : '0',
      borderBottomLeftRadius: iso === start ? 'var(--radius-full)' : '0',
      borderTopRightRadius: iso === end ? 'var(--radius-full)' : '0',
      borderBottomRightRadius: iso === end ? 'var(--radius-full)' : '0',
    };
  }
}
