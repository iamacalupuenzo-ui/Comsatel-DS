import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { NAVIGATION, type NavItem } from '../../lib/nav';
import { TableOfContents } from '../table-of-contents/table-of-contents';
import { Icon } from 'comsatel-ds';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, RouterLink, TableOfContents, Icon],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
})
export class Shell {
  protected readonly navigation = NAVIGATION;
  protected currentUrl: string;
  private openHrefs = new Set<string>();

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    this.autoExpandActive();
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      this.currentUrl = this.router.url;
      this.autoExpandActive();
    });
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
}
