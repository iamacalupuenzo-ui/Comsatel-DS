import { Component, ElementRef, EventEmitter, HostListener, Input, Output, signal } from '@angular/core';
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
  @Output() select = new EventEmitter<DropdownItem>();

  protected readonly open = signal(false);
  protected readonly menuId = `cs-dropdown-menu-${++uid}`;

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

  onItemSelect(item: DropdownItem, selectionMode: DropdownSelectionMode): void {
    this.select.emit(item);
    // Los grupos de acción cierran el menú al elegir; los grupos
    // checkbox/radio lo mantienen abierto para poder marcar más de uno (o
    // cambiar de radio varias veces) antes de cerrar.
    if (selectionMode === 'none') this.open.set(false);
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
      this.open.set(false);
    }
  }
}
