import { afterEveryRender, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, input, signal } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Icon } from '../icons/icon';
import { Badge, type BadgeSize } from '../badge/badge';
import { INPUT_TOKENS } from '../dropdown/dropdown-tokens';
import type { DropdownSize } from '../dropdown/dropdown-types';
import { Popover } from '../popover/popover';
import { fieldLabelTypography } from '../input/input-tokens';
import { textStyle } from '../tokens/typography';

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

let uid = 0;

/**
 * Select de formulario: selección simple o múltiple. A diferencia de
 * Dropdown (que dispara acciones), este es un control de valor — mismo
 * patrón de trigger/listbox que InputDropdown. El panel usa el primitivo
 * Popover para posicionarse fuera de contenedores que recortan overlays y
 * para resolver Escape, clic afuera y reposicionamiento. En modo multiple
 * las opciones elegidas se muestran como chips (`cs-badge`) dentro del
 * campo y cada uno expone su propio control de eliminación.
 */
@Component({
  selector: 'cs-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgStyle, Icon, Badge, Popover],
  templateUrl: './select.html',
  styleUrl: './select.css',
})
export class Select {
  @Input() label?: string;
  @Input() placeholder = 'Selecciona una opción';
  @Input() options: SelectOption[] = [];
  /** Habilita la selección de más de una opción; el valor pasa a ser un array. */
  @Input() multiple = false;
  @Input() value?: string | string[];
  @Output() readonly valueChange = new EventEmitter<string | string[]>();
  @Input() size: DropdownSize = 'md';
  @Input() disabled = false;
  @Input() required = false;
  readonly showClear = input(true);
  readonly surface = input<'default' | 'secondary'>('default');
  readonly invalid = input(false);
  readonly readonly = input(false);
  readonly ariaDescribedby = input('', { alias: 'aria-describedby' });
  /**
   * Cómo se muestran las opciones elegidas en modo múltiple: 'chips' (una insignia por opción) o
   * 'summary' (una línea de texto: la opción si es una sola, o el conteo). En 'summary', ninguna o
   * todas las opciones elegidas equivalen a «todos» y se muestra el placeholder.
   */
  @Input() multipleDisplay: 'chips' | 'summary' = 'chips';
  /** Texto del resumen cuando hay varias opciones elegidas. */
  @Input() summaryLabel: (count: number) => string = (count) => `${count} seleccionados`;
  /** Filtro aplicado: borde, fondo y texto de selección. Foco, apertura y error tienen prioridad. */
  @Input() active = false;
  /** Menú ajustado al campo: como mínimo el ancho del trigger y crece con la opción más larga hasta el borde visible. */
  @Input() menuFit = false;
  @Input() clearControlLabel = 'Limpiar';
  @Input() removeOptionLabel: (label: string) => string = (label) => `Quitar ${label}`;
  @ViewChild('trigger', { read: ElementRef }) private triggerRef?: ElementRef<HTMLElement>;

  protected readonly open = signal(false);
  protected readonly focused = signal(false);
  protected readonly menuMinWidth = signal<number | null>(null);
  protected readonly menuMaxWidth = signal<number | null>(null);
  protected readonly menuId = `cs-select-${++uid}`;
  protected readonly labelId = `${this.menuId}-label`;
  private pendingFocus: 'first' | 'last' | null = null;

  constructor() {
    afterEveryRender(() => {
      if (!this.open() || !this.pendingFocus) return;
      const options = this.enabledOptionElements();
      const selected = options.find(element => element.getAttribute('aria-selected') === 'true');
      const option = selected ?? (this.pendingFocus === 'last' ? options.at(-1) : options[0]);
      if (option && getComputedStyle(option).visibility !== 'hidden') {
        this.pendingFocus = null;
        option.focus();
      }
    });
  }

  protected get tok() {
    return INPUT_TOKENS[this.size];
  }

  protected get labelStyle(): Record<string, string> {
    return textStyle(fieldLabelTypography[this.size], 'accent');
  }

  protected get chipSize(): BadgeSize {
    return this.size === 'lg' ? 'lg' : this.size === 'md' ? 'md' : 'sm';
  }
  protected get chipRemoveSize(): number {
    return this.chipSize === 'lg' ? 14 : this.chipSize === 'md' ? 13 : 12;
  }
  protected get chipRemoveIconSize(): number {
    return this.chipSize === 'lg' ? 11 : this.chipSize === 'md' ? 10 : 9;
  }

  protected get selectedValues(): string[] {
    return this.multiple && Array.isArray(this.value) ? this.value : [];
  }
  protected get singleSelected(): SelectOption | undefined {
    return !this.multiple ? this.options.find((o) => o.value === this.value) : undefined;
  }
  protected get selectedOptions(): SelectOption[] {
    return this.multiple ? this.options.filter((o) => this.selectedValues.includes(o.value)) : [];
  }
  protected get hasValue(): boolean {
    return this.multiple ? this.selectedValues.length > 0 : !!this.value;
  }

  /** Texto de una línea para el modo 'summary'. */
  protected get summaryText(): string {
    const count = this.selectedOptions.length;
    if (!count || count === this.options.length) return this.placeholder;
    return count === 1 ? this.selectedOptions[0].label : this.summaryLabel(count);
  }
  protected get summaryIsPlaceholder(): boolean {
    const count = this.selectedOptions.length;
    return !count || count === this.options.length;
  }

  /** Estado aplicado visible: cede ante foco, apertura, error y disabled. */
  protected get isActiveVisual(): boolean {
    return this.active && !this.disabled && !this.invalid() && !this.open() && !this.focused();
  }

  protected get borderColor(): string {
    if (this.disabled) return 'var(--color-border-neutral-subtle)';
    if (this.invalid()) return 'var(--color-border-danger-default)';
    if (this.focused() || this.open()) return 'var(--color-border-brand-default)';
    if (this.active) return 'var(--color-border-selected)';
    return this.surface() === 'secondary' ? 'var(--color-border-secondary-default)' : 'var(--color-border-neutral-default)';
  }
  protected get extraShadow(): string {
    return !this.disabled && (this.focused() || this.open())
      ? '0 0 0 var(--layout-border-thick) var(--color-border-brand-subtle)'
      : 'none';
  }
  protected get textColor(): string {
    if (this.disabled) return 'var(--color-text-disabled)';
    if (this.isActiveVisual) return 'var(--color-text-selected)';
    if (this.surface() === 'secondary') return 'var(--color-text-secondary-default)';
    return 'var(--color-text-base-default)';
  }

  protected toggle(): void {
    if (this.disabled || this.readonly()) return;
    const next = !this.open();
    if (next) this.measureMenu();
    this.open.set(next);
    this.focused.set(true);
    if (next) this.focusInitialOption();
  }

  private measureMenu(): void {
    if (!this.menuFit) return;
    const rect = this.triggerRef?.nativeElement.getBoundingClientRect();
    if (!rect) return;
    this.menuMinWidth.set(rect.width);
    this.menuMaxWidth.set(Math.max(rect.width, window.innerWidth - rect.left - 16));
  }

  protected onFocus(): void {
    this.focused.set(true);
  }
  protected onBlur(): void {
    if (!this.open()) this.focused.set(false);
  }

  protected onKeydown(e: KeyboardEvent): void {
    if (this.disabled || this.readonly() || e.target !== e.currentTarget) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Home' || e.key === 'End') {
      e.preventDefault();
      if (!this.open()) {
        this.measureMenu();
        this.open.set(true);
      }
      this.focusInitialOption(e.key === 'ArrowUp' || e.key === 'End');
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const next = !this.open();
      if (next) this.measureMenu();
      this.open.set(next);
      this.focused.set(true);
      if (next) this.focusInitialOption();
    } else if (e.key === 'Escape') {
      this.closeMenu();
    }
  }

  protected selectOption(opt: SelectOption): void {
    if (opt.disabled || this.disabled || this.readonly()) return;
    if (this.multiple) {
      const next = this.selectedValues.includes(opt.value)
        ? this.selectedValues.filter((v) => v !== opt.value)
        : [...this.selectedValues, opt.value];
      this.valueChange.emit(next);
    } else {
      this.valueChange.emit(opt.value);
      this.closeMenu();
    }
  }

  protected clearAll(): void {
    if (this.disabled || this.readonly()) return;
    this.valueChange.emit(this.multiple ? [] : '');
    this.triggerRef?.nativeElement.focus();
  }

  protected removeOption(opt: SelectOption, event: Event): void {
    event.stopPropagation();
    this.selectOption(opt);
    this.triggerRef?.nativeElement.focus();
  }

  protected isSelected(opt: SelectOption): boolean {
    return this.multiple ? this.selectedValues.includes(opt.value) : opt.value === this.value;
  }

  protected onPopoverClosed(): void {
    this.pendingFocus = null;
    if (this.open()) {
      this.open.set(false);
      this.focused.set(false);
    }
  }

  protected onOptionKeydown(event: KeyboardEvent, option: SelectOption): void {
    const options = this.enabledOptionElements();
    const currentIndex = options.indexOf(event.currentTarget as HTMLButtonElement);
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      if (options.length) options[(currentIndex + (event.key === 'ArrowDown' ? 1 : options.length - 1)) % options.length].focus();
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      options[event.key === 'Home' ? 0 : options.length - 1]?.focus();
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.selectOption(option);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      // Solo cierra esta lista: dentro de otro panel flotante no debe cerrar también el de afuera.
      event.stopPropagation();
      this.closeMenu();
    } else if (event.key === 'Tab') {
      this.closeMenu();
    }
  }

  protected closeMenu(): void {
    this.pendingFocus = null;
    this.open.set(false);
    this.focused.set(false);
    this.triggerRef?.nativeElement.focus();
  }

  private focusInitialOption(last = false): void {
    this.pendingFocus = last ? 'last' : 'first';
  }

  private enabledOptionElements(): HTMLButtonElement[] {
    return Array.from(document.querySelectorAll<HTMLButtonElement>(`#${this.menuId} [role="option"]:not(:disabled)`));
  }
}
