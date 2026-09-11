import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Avatar } from '../avatar/avatar';
import { Icon } from '../icons/icon';
import { Popover } from '../popover/popover';

export interface HeaderNavItem { id: string; label: string; href?: string; active?: boolean; }
export interface HeaderUser { name: string; role: string; initials: string; avatarSrc?: string; }

@Component({ selector: 'cs-header', imports: [Avatar, Icon, Popover], templateUrl: './header.html', styleUrl: './header.css' })
export class Header {
  @Input() brand = 'Comsatel DS';
  @Input() navigation: HeaderNavItem[] = [];
  @Input() user: HeaderUser = { name: 'Usuario', role: 'Cuenta', initials: 'US' };
  @Input() notificationCount = 0;
  @Output() readonly navigationClick = new EventEmitter<string>();
  @Output() readonly notificationsClick = new EventEmitter<void>();
  @Output() readonly settingsClick = new EventEmitter<void>();
  @Output() readonly logoutClick = new EventEmitter<void>();
  @ViewChild('userTrigger') private userTrigger?: ElementRef<HTMLElement>;
  protected menuOpen = false;
  protected toggleMenu(): void { this.menuOpen = !this.menuOpen; }
  protected closeMenu(): void { this.menuOpen = false; }
  protected trigger(): HTMLElement | null { return this.userTrigger?.nativeElement ?? null; }
  protected navigate(item: HeaderNavItem, event: MouseEvent): void { if (!item.href) event.preventDefault(); this.navigationClick.emit(item.id); }
  protected settings(): void { this.settingsClick.emit(); this.closeMenu(); }
  protected logout(): void { this.logoutClick.emit(); this.closeMenu(); }
}
