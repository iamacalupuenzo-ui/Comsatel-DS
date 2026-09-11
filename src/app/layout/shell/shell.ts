import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { NAVIGATION, type NavItem } from '../../lib/nav';
import { SidenavState } from '../../lib/sidenav-state';
import { TableOfContents } from '../table-of-contents/table-of-contents';
import { Icon, PressScale } from 'comsatel-ds';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, TableOfContents, Icon, PressScale],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
  host: {
    '[attr.data-sidenav-mode]': 'sidenav.mode()',
    '[attr.data-mobile-open]': 'sidenav.mobileOpen()',
  },
})
export class Shell {
  protected readonly navigation = NAVIGATION;
  protected currentUrl: string;
  private openHrefs = new Set<string>();

  protected readonly hoveredItem = signal<NavItem | null>(null);
  protected readonly flyoutPos = signal({ top: 0, left: 0 });
  private readonly host = inject(ElementRef<HTMLElement>);
  private previouslyFocused: HTMLElement | null = null;
  private hideTimeout?: ReturnType<typeof setTimeout>;

  constructor(private router: Router, protected readonly sidenav: SidenavState) {
    this.currentUrl = this.router.url;
    this.autoExpandActive();
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      this.currentUrl = this.router.url;
      this.autoExpandActive();
      this.closeMobileMenu();
    });
  }

  protected openMobileMenu(): void {
    this.previouslyFocused = document.activeElement as HTMLElement | null;
    this.sidenav.openMobile();
    setTimeout(() => {
      (this.host.nativeElement as HTMLElement).querySelector<HTMLElement>('.sidebar a, .sidebar button')?.focus();
    });
  }

  protected closeMobileMenu(): void {
    this.sidenav.closeMobile();
    this.previouslyFocused?.focus();
    this.previouslyFocused = null;
  }

  @HostListener('document:keydown', ['$event'])
  protected onDocumentKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.hoveredItem()) {
      this.hoveredItem.set(null);
      return;
    }
    if (this.sidenav.mode() !== 'drawer' || !this.sidenav.mobileOpen()) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeMobileMenu();
      return;
    }
    if (event.key !== 'Tab') return;

    const sidebar = (this.host.nativeElement as HTMLElement).querySelector<HTMLElement>('.sidebar');
    if (!sidebar) return;
    const focusable = (Array.from(sidebar.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )) as HTMLElement[]).filter((element) => element.offsetParent !== null);
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  // Los grupos con hijos empiezan abiertos si la ruta activa es el propio
  // grupo o uno de sus hijos — mismo criterio que NavLink en Sidebar.tsx
  // (isActive || isChildActive).
  private autoExpandActive(): void {
    for (const section of this.navigation) {
      for (const item of section.items) {
        const childActive = item.children?.some((c) => c.href === this.currentUrl);
        if (item.href === this.currentUrl || childActive) this.openHrefs.add(item.href);
      }
    }
  }

  protected isActive(href: string): boolean {
    return this.currentUrl === href;
  }

  protected isOpen(item: NavItem): boolean {
    return this.openHrefs.has(item.href);
  }

  protected toggle(item: NavItem): void {
    if (this.openHrefs.has(item.href)) this.openHrefs.delete(item.href);
    else this.openHrefs.add(item.href);
  }

  // Rail: hover/foco sobre un ítem raíz abre un flyout con su label (y sus
  // hijos, si tiene) — mismo patrón que RailItem en menu.tsx de React. Un
  // pequeño delay al salir evita que se cierre de golpe al cruzar el hueco
  // entre el ítem y el propio flyout.
  protected onRailEnter(item: NavItem, e: MouseEvent | FocusEvent): void {
    if (this.sidenav.mode() !== 'rail') return;
    clearTimeout(this.hideTimeout);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    this.flyoutPos.set({ top: rect.top, left: rect.right + 6 });
    this.hoveredItem.set(item);
  }

  protected scheduleHide(): void {
    clearTimeout(this.hideTimeout);
    this.hideTimeout = setTimeout(() => this.hoveredItem.set(null), 120);
  }

  protected cancelHide(): void {
    clearTimeout(this.hideTimeout);
  }

  protected onRailFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (!next || !(event.currentTarget as HTMLElement).contains(next)) this.scheduleHide();
  }
}
