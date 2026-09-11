import { Injectable, signal, computed } from '@angular/core';

// Motor de estado del AppLayout reusable — mismo mecanismo que el Shell
// interno del sitio (src/app/lib/sidenav-state.ts), pero como API pública
// de la librería. `providedIn: 'root'`: un producto real monta exactamente
// UN AppLayout en la raíz de la app (igual que este sitio monta un único
// Shell) — no es un componente que se anide varias veces, así que un
// singleton es lo correcto (y es lo que permite que contenido proyectado
// vía [sidenav]/[topnav] pueda inyectar este servicio: un provider a nivel
// de componente NO sería visible ahí, porque el contenido proyectado
// resuelve su inyección contra el árbol donde se DECLARÓ, no donde se
// renderiza — la raíz de la app sí lo ve siempre).
//
// Alcance actual: solo Expandido/Rail (desktop/tablet). El modo Drawer
// para mobile queda fuera a propósito — la app mobile va a ser un producto
// aparte con su propia estructura, todavía sin definir (decisión del
// usuario, 2026-09-10). No agregar lógica de mobile acá hasta que esa
// estructura exista.
const COLLAPSED_KEY = 'cs-app-layout-collapsed';

// Mismo valor que --breakpoint-md en tokens.css — un matchMedia no puede
// leer una custom property, queda repetido a propósito.
const TABLET_QUERY = '(min-width: 768px) and (max-width: 1023px)';

function readStoredCollapsed(): boolean | null {
  try {
    const raw = localStorage.getItem(COLLAPSED_KEY);
    return raw === null ? null : raw === '1';
  } catch {
    return null;
  }
}

export type AppLayoutMode = 'expanded' | 'rail';

@Injectable({ providedIn: 'root' })
export class AppLayoutState {
  private readonly userCollapsed = signal<boolean | null>(readStoredCollapsed());
  private readonly isTablet = signal(false);

  // null = el usuario nunca lo tocó — el tamaño de pantalla decide el
  // default (tablet arranca en rail, desktop expandido).
  readonly collapsed = computed(() => this.userCollapsed() ?? this.isTablet());
  readonly mode = computed<AppLayoutMode>(() => (this.collapsed() ? 'rail' : 'expanded'));

  constructor() {
    const mqTablet = window.matchMedia(TABLET_QUERY);
    this.isTablet.set(mqTablet.matches);
    mqTablet.addEventListener('change', (e) => this.isTablet.set(e.matches));
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
}
