import { Injectable, signal, computed } from '@angular/core';

// Misma lógica que useSidenavCollapsed/useIsMobileViewport/useSidenavMobileOpen
// en Sistema-de-dise-o-Comsatel, pero sin el hack de CustomEvent+localStorage
// que React necesita ahí: TopNav y Sidebar en React son dos islas de Astro
// que NO comparten árbol — acá Shell es un único árbol de componentes
// Angular, así que un servicio singleton con signals ya se comparte solo,
// sin evento de window de por medio. La persistencia entre cargas de página
// SÍ se mantiene igual (localStorage), porque esa parte no depende del
// problema de las islas.
const COLLAPSED_KEY = 'cs-sidenav-collapsed';

// Mismos valores que --breakpoint-md/--breakpoint-lg en tokens.css — un
// matchMedia no puede leer custom properties, quedan repetidos a propósito
// (si tokens.css cambia, actualizar también acá).
const TABLET_QUERY = '(min-width: 768px) and (max-width: 1023px)';
const MOBILE_QUERY = '(max-width: 767px)';

function readStoredCollapsed(): boolean | null {
  try {
    const raw = localStorage.getItem(COLLAPSED_KEY);
    return raw === null ? null : raw === '1';
  } catch {
    return null;
  }
}

export type SidenavMode = 'expanded' | 'rail' | 'drawer';

@Injectable({ providedIn: 'root' })
export class SidenavState {
  private readonly userCollapsed = signal<boolean | null>(readStoredCollapsed());
  private readonly isTablet = signal(false);
  private readonly isMobile = signal(false);
  readonly mobileOpen = signal(false);

  // null = el usuario nunca lo tocó — en ese caso el tamaño de pantalla
  // decide el valor por defecto (tablet arranca en rail, desktop expandido).
  readonly collapsed = computed(() => this.userCollapsed() ?? this.isTablet());

  readonly mode = computed<SidenavMode>(() => {
    if (this.isMobile()) return 'drawer';
    return this.collapsed() ? 'rail' : 'expanded';
  });

  constructor() {
    const mqTablet = window.matchMedia(TABLET_QUERY);
    const mqMobile = window.matchMedia(MOBILE_QUERY);
    this.isTablet.set(mqTablet.matches);
    this.isMobile.set(mqMobile.matches);
    mqTablet.addEventListener('change', (e) => this.isTablet.set(e.matches));
    mqMobile.addEventListener('change', (e) => {
      this.isMobile.set(e.matches);
      if (e.matches) this.mobileOpen.set(false);
    });
  }

  setCollapsed(next: boolean): void {
    this.userCollapsed.set(next);
    try {
      localStorage.setItem(COLLAPSED_KEY, next ? '1' : '0');
    } catch {
      /* localStorage no disponible (modo privado, etc.) — igual funciona en memoria */
    }
  }

  toggleCollapsed(): void {
    this.setCollapsed(!this.collapsed());
  }

  openMobile(): void {
    this.mobileOpen.set(true);
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }
}
