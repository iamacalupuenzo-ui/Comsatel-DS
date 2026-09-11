import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, signal } from '@angular/core';
import { Icon } from '../icons/icon';
import { DropdownItemComponent } from './dropdown-item';
import { ITEM_TOKENS } from './dropdown-tokens';
import type { DropdownGroup, DropdownItem, DropdownPosition, DropdownSelectionMode, DropdownSize, DropdownTrigger } from './dropdown-types';

let uid = 0;

// Puerto 1:1 de Dropdown en dropdown.tsx — menú de acciones activado por un
// botón con etiqueta o un ícono de puntos suspensivos. Soporta grupos con
// encabezado, ítems con ícono/badge/atajo/divisor, y selectionMode
// checkbox/radio (componente controlado, sin estado propio de selección:
// el consumidor decide qué está marcado vía item.selected).
@Component({
  selector: 'cs-dropdown',
  imports: [Icon, DropdownItemComponent],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css',
})
export class Dropdown {
  @Input() trigger: DropdownTrigger = 'button';
  @Input() label = 'Dropdown';
  @Input() groups: DropdownGroup[] = [];
  @Input() size: DropdownSize = 'sm';
  @Input() position: DropdownPosition = 'left';
  @Input() header?: string;
  /** Nombre accesible del trigger de ícono; el trigger con texto ya tiene su label visible. */
  @Input() ariaLabel = '';
  @Output() select = new EventEmitter<DropdownItem>();

  protected readonly open = signal(false);
  protected readonly triggerId = `cs-dropdown-trigger-${++uid}`;
  protected readonly menuId = `cs-dropdown-menu-${++uid}`;

  @ViewChild('triggerButton') private triggerRef?: ElementRef<HTMLButtonElement>;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  get tok() {
    return ITEM_TOKENS[this.size];
  }
  get iconTriggerSize(): number {
    return this.size === 'sm' ? 20 : this.size === 'lg' ? 24 : 20;
  }
  get menuWidth(): number {
    return this.trigger === 'icon' ? 192 : 220;
  }
  get menuTop(): number {
    return this.tok.height + 4;
  }

  toggle(): void {
    this.open.update((v) => !v);
  }

  private close(restoreFocus = false): void {
    this.open.set(false);
    if (restoreFocus) queueMicrotask(() => this.triggerRef?.nativeElement.focus());
  }

  private focusMenuItem(last = false): void {
    setTimeout(() => {
      const items = Array.from(
        this.elementRef.nativeElement.querySelectorAll<HTMLButtonElement>('[role^="menuitem"]:not(:disabled)'),
      );
      (last ? items.at(-1) : items[0])?.focus();
    });
  }

  onTriggerKeydown(event: KeyboardEvent): void {
    if (!['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) return;
    event.preventDefault();
    if (!this.open()) this.open.set(true);
    this.focusMenuItem(event.key === 'ArrowUp');
  }

  onMenuKeydown(event: KeyboardEvent): void {
    const items = Array.from(
      this.elementRef.nativeElement.querySelectorAll<HTMLButtonElement>('[role^="menuitem"]:not(:disabled)'),
    );
    if (!items.length) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      this.close(true);
      return;
    }
    if (event.key === 'Tab') {
      this.close();
      return;
    }
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();

    const current = items.indexOf(document.activeElement as HTMLButtonElement);
    const next = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? items.length - 1
        : (current + (event.key === 'ArrowUp' ? -1 : 1) + items.length) % items.length;
    items[next]?.focus();
  }

  onItemSelect(item: DropdownItem, selectionMode: DropdownSelectionMode): void {
    this.select.emit(item);
    // Los grupos de acción cierran el menú al elegir; los grupos
    // checkbox/radio lo mantienen abierto para poder marcar más de uno (o
    // cambiar de radio varias veces) antes de cerrar.
    if (selectionMode === 'none') this.close(true);
  }

  modeOf(group: DropdownGroup): DropdownSelectionMode {
    return group.selectionMode ?? 'none';
  }

  isGroupSelectable(group: DropdownGroup): boolean {
    return !!group.selectionMode && group.selectionMode !== 'none';
  }

  @HostListener('document:mousedown', ['$event'])
  onDocumentMouseDown(event: MouseEvent): void {
    if (this.open() && !this.elementRef.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent): void {
    if (this.open() && event.key === 'Escape') this.close(true);
  }
}
