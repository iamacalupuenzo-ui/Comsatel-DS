import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

// Coincide con el scroll-margin-top que styles.css define para h2[id]/h3[id]
// (alto del TopNav fijo + aire), así "activo" queda alineado con el punto real
// donde aterriza un heading al hacer click o scroll — mismo criterio que ya
// usa TableOfContents.tsx en el proyecto React.
const HEADER_OFFSET = 72;

@Component({
  selector: 'app-table-of-contents',
  templateUrl: './table-of-contents.html',
  styleUrl: './table-of-contents.css',
})
export class TableOfContents implements OnInit, OnDestroy {
  protected readonly items = signal<TocItem[]>([]);
  protected readonly activeId = signal('');

  private clickOverride = false;
  private clickOverrideTimeout?: ReturnType<typeof setTimeout>;
  private observer?: MutationObserver;
  private routerSub?: { unsubscribe(): void };
  private rafIds: number[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.scheduleRefresh();

    this.routerSub = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.scheduleRefresh());

    const main = document.querySelector('main');
    if (main) {
      this.observer = new MutationObserver(() => this.refreshHeadings());
      this.observer.observe(main, { childList: true, subtree: true, characterData: true });
    }

    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
    this.observer?.disconnect();
    window.removeEventListener('scroll', this.onScroll);
    clearTimeout(this.clickOverrideTimeout);
    this.rafIds.forEach((id) => cancelAnimationFrame(id));
  }

  private scheduleRefresh(): void {
    // Después de navegar, el nuevo componente lazy todavía no pintó — esperar
    // dos frames antes de escanear los headings, igual que el ráf doble del
    // componente en React.
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => this.refreshHeadings());
      this.rafIds.push(raf2);
    });
    this.rafIds.push(raf1);
  }

  private refreshHeadings(): void {
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>('main h2[id], main h3[id]'),
    );
    this.items.set(
      headings.map((el) => ({
        id: el.id,
        text: el.textContent ?? '',
        level: Number(el.tagName[1]),
      })),
    );
    this.updateActiveFromScroll(headings);
  }

  private onScroll = (): void => {
    requestAnimationFrame(() => {
      const headings = Array.from(
        document.querySelectorAll<HTMLElement>('main h2[id], main h3[id]'),
      );
      this.updateActiveFromScroll(headings);
    });
  };

  private updateActiveFromScroll(headings: HTMLElement[]): void {
    if (this.clickOverride) return;
    let current = '';
    for (const h of headings) {
      if (h.getBoundingClientRect().top <= HEADER_OFFSET) current = h.id;
    }
    if (current) this.activeId.set(current);
  }

  // No usamos el href nativo del <a> para navegar: con el <base href="/">
  // que trae Angular por defecto, un href="#id" resuelve contra la base
  // ("/#id") en vez de contra la URL actual, y el Router lo interpreta como
  // ir a la ruta "/" — te saca de la página. Por eso interceptamos el click y
  // hacemos scroll a mano, solo actualizando el fragmento de la URL como dato
  // cosmético (sin disparar navegación del Router).
  protected onItemClick(id: string, event: Event): void {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', `${location.pathname}#${id}`);

    this.activeId.set(id);
    this.clickOverride = true;
    clearTimeout(this.clickOverrideTimeout);
    this.clickOverrideTimeout = setTimeout(() => {
      this.clickOverride = false;
    }, 600);
  }
}
