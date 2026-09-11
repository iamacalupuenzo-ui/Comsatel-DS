import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../icons/icon';
import { PressScale } from '../directives/press-scale.directive';
import { Collapse } from '../directives/collapse.directive';
import { Popover } from '../popover/popover';
import type { MenuGroupData, MenuItemData, MenuMode } from './menu-types';

/**
 * Lista de navegación reutilizable, en modo expandido (labels completos,
 * con grupos y sub-ítems) o rail (solo íconos, con flyout al pasar el
 * mouse o enfocar). Es la pieza base con la que se arma cualquier side
 * nav — el propio Shell de este sitio es un consumidor de este patrón, no
 * una implementación paralela (mismo comportamiento, ya verificado ahí:
 * rail con flyout, `csPressScale` en los ítems).
 *
 * **Nota real sobre navegación por teclado:** `accessibility-patterns.md`
 * sección 7 anticipaba flechas/Home/End/type-ahead para cuando se
 * construyera Menu — al portar la referencia real (`menu.tsx`) se
 * confirmó que React NUNCA implementó eso: la navegación por teclado es
 * simplemente el orden de Tab nativo de los `<a>` reales, sin
 * `@HostListener('keydown')` propio. Se porta fiel a lo que existe, no lo
 * que la sección 7 anticipaba — el outline queda como referencia para si
 * el usuario pide esa navegación explícita más adelante, no como algo ya
 * construido acá.
 */
@Component({
  selector: 'cs-menu',
  imports: [Icon, PressScale, Collapse, Popover, RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu implements OnChanges {
  @Input({ required: true }) groups: MenuGroupData[] = [];
  @Input() mode: MenuMode = 'expanded';
  @Input() activeHref?: string;
  @Output() readonly navigate = new EventEmitter<void>();

  // Estado real de apertura de cada grupo con hijos, independiente de si
  // está resaltado — el usuario SÍ puede colapsar manualmente un grupo con
  // hijo activo (paridad con el `useState`/`setOpen` de React en
  // `menu.tsx`). `ngOnChanges` solo lo FUERZA a abrir cuando `activeHref`
  // cambia hacia un ítem de ese grupo, igual que el `useEffect` de React —
  // nunca lo mantiene pegado a `isHighlighted` en cada evaluación (antes de
  // este fix, `isOpen` hacía `openHrefs.has(...) || isHighlighted(...)`, lo
  // que dejaba cualquier grupo activo permanentemente abierto e ignoraba el
  // toggle manual).
  private openHrefs = new Set<string>();
  // signal(), no propiedad plana: se mutan también dentro de un setTimeout
  // (scheduleHide) — en esta app zoneless eso no dispara una pasada de
  // detección de cambios si no es un signal (ver C4 punto 7 en
  // audit-checklist.md / accessibility-patterns.md sección 0).
  protected readonly hoveredItem = signal<MenuItemData | null>(null);
  private hideTimeout?: ReturnType<typeof setTimeout>;

  protected isItemActive(item: MenuItemData): boolean {
    return !item.children && this.activeHref === item.href;
  }

  protected hasActiveChild(item: MenuItemData): boolean {
    return item.children?.some((c) => c.href === this.activeHref) ?? false;
  }

  protected isHighlighted(item: MenuItemData): boolean {
    return this.isItemActive(item) || this.hasActiveChild(item);
  }

  protected isOpen(item: MenuItemData): boolean {
    return this.openHrefs.has(item.href);
  }

  protected toggle(item: MenuItemData): void {
    if (this.openHrefs.has(item.href)) this.openHrefs.delete(item.href);
    else this.openHrefs.add(item.href);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['activeHref'] && !changes['groups']) return;
    for (const group of this.groups) {
      for (const item of group.items) {
        if (item.children && this.isHighlighted(item)) this.openHrefs.add(item.href);
      }
    }
  }

  protected onNavigateClick(): void {
    this.navigate.emit();
  }

  // Rail: hover/foco sobre un ítem raíz abre un flyout — grupo con hijos
  // muestra su lista completa, hoja muestra un tooltip simple con label +
  // atajo. Un pequeño delay al salir evita que se cierre de golpe al
  // cruzar el hueco entre el ítem y el propio flyout. El posicionamiento ya
  // no se calcula a mano acá — lo resuelve `cs-popover` (C8: ya existía el
  // primitivo real de posicionamiento flotante, portal, animación de
  // entrada/salida y cierre por click-afuera/Escape; el flyout de Menu lo
  // reimplementaba todo a mano en vez de traerlo).
  protected onRailEnter(item: MenuItemData): void {
    if (item.disabled) return;
    clearTimeout(this.hideTimeout);
    this.hoveredItem.set(item);
  }

  protected scheduleHide(): void {
    clearTimeout(this.hideTimeout);
    this.hideTimeout = setTimeout(() => {
      this.hoveredItem.set(null);
    }, 120);
  }

  protected cancelHide(): void {
    clearTimeout(this.hideTimeout);
  }

  protected closeFlyout(): void {
    this.hoveredItem.set(null);
    this.navigate.emit();
  }
}
