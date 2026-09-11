import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, signal } from '@angular/core';
import { Icon } from '../icons/icon';
import { Badge, type BadgeSize } from '../badge/badge';
import { INPUT_TOKENS } from '../dropdown/dropdown-tokens';
import type { DropdownSize } from '../dropdown/dropdown-types';
import { Popover } from '../popover/popover';

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
  imports: [Icon, Badge, Popover],
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
  @Input() clearControlLabel = 'Limpiar';
  @Input() removeOptionLabel: (label: string) => string = (label) => `Quitar ${label}`;
  @ViewChild('trigger', { read: ElementRef }) private triggerRef?: ElementRef<HTMLElement>;

  protected readonly open = signal(false);
  protected readonly focused = signal(false);
  protected readonly menuId = `cs-select-${++uid}`;
  protected readonly labelId = `${this.menuId}-label`;

  protected get tok() {
    return INPUT_TOKENS[this.size];
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

  protected get borderColor(): string {
    if (this.disabled) return 'var(--color-border-neutral-subtle)';
    if (this.focused() || this.open()) return 'var(--color-border-brand-default)';
    return 'var(--color-border-neutral-default)';
  }
  protected get extraShadow(): string {
    return !this.disabled && (this.focused() || this.open())
      ? '0 0 0 var(--layout-border-thick) var(--color-border-brand-subtle)'
      : 'none';
  }
  protected get textColor(): string {
    if (this.disabled) return 'var(--color-text-disabled)';
    return this.hasValue ? 'var(--color-text-base-default)' : 'var(--color-text-base-subtlest)';
  }

  protected toggle(): void {
    if (this.disabled) return;
    const next = !this.open();
    this.open.set(next);
    this.focused.set(true);
    if (next) this.focusInitialOption();
  }

  protected onFocus(): void {
    this.focused.set(true);
  }
  protected onBlur(): void {
    if (!this.open()) this.focused.set(false);
  }

  protected onKeydown(e: KeyboardEvent): void {
    if (this.disabled) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Home' || e.key === 'End') {
      e.preventDefault();
      if (!this.open()) this.open.set(true);
      this.focusInitialOption(e.key === 'ArrowUp' || e.key === 'End');
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const next = !this.open();
      this.open.set(next);
      this.focused.set(true);
      if (next) this.focusInitialOption();
    } else if (e.key === 'Escape') {
      this.closeMenu();
    }
  }

  protected selectOption(opt: SelectOption): void {
    if (opt.disabled) return;
    if (this.multiple) {
      const next = this.selectedValues.includes(opt.value)
        ? this.selectedValues.filter((v) => v !== opt.value)
        : [...this.selectedValues, opt.value];
      this.valueChange.emit(next);
    } else {
      this.valueChange.emit(opt.value);
      this.open.set(false);
      this.focused.set(false);
    }
  }

  protected clearAll(): void {
    this.valueChange.emit(this.multiple ? [] : '');
  }

  protected removeOption(opt: SelectOption, event: Event): void {
    event.stopPropagation();
    this.selectOption(opt);
  }

  protected isSelected(opt: SelectOption): boolean {
    return this.multiple ? this.selectedValues.includes(opt.value) : opt.value === this.value;
  }

  protected onPopoverClosed(): void {
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
      this.closeMenu();
    }
  }

  protected closeMenu(): void {
    this.open.set(false);
    this.focused.set(false);
    this.triggerRef?.nativeElement.focus();
  }

  private focusInitialOption(last = false): void {
    setTimeout(() => {
      const options = this.enabledOptionElements();
      if (!options.length) return;
      const selected = options.find((element) => element.getAttribute('aria-selected') === 'true');
      (selected ?? options[last ? options.length - 1 : 0]).focus();
    });
  }

  private enabledOptionElements(): HTMLButtonElement[] {
    return Array.from(document.querySelectorAll<HTMLButtonElement>(`#${this.menuId} [role="option"]:not(:disabled)`));
  }
}
