import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, signal } from '@angular/core';
import { Menu, type MenuGroupData, type MenuMode } from 'comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

// Menú real planeado para C-Locater Flotas (ver
// D:\Investigacion\C-Locater\src\c-loc\components\Sidebar.tsx), no una
// lista inventada para la demo.
const FLEET_GROUPS: MenuGroupData[] = [
  {
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: 'layout-dashboard', shortcut: ['D'] },
      { label: 'Explorar', href: '/explore', icon: 'map', shortcut: ['1'] },
      {
        label: 'Flota', href: '/fleet', icon: 'truck', shortcut: ['2'],
        children: [
          { label: 'Vehículos', href: '/fleet/vehicles' },
          { label: 'Conductores', href: '/fleet/drivers' },
          { label: 'Asignaciones', href: '/fleet/assignments' },
        ],
      },
      { label: 'En vivo', href: '/live', icon: 'activity', badge: '3', shortcut: ['3'] },
      {
        label: 'Informes', href: '/reports', icon: 'file-text', shortcut: ['4'],
        children: [
          { label: 'Actividad', href: '/reports/activity' },
          { label: 'Histórico', href: '/reports/history' },
        ],
      },
    ],
  },
  {
    header: 'Gestión',
    items: [
      { label: 'Caminos', href: '/routes', icon: 'route', shortcut: ['C'] },
      { label: 'Geocercas', href: '/geofences', icon: 'hexagon', shortcut: ['G'] },
      { label: 'Alertas', href: '/alerts', icon: 'bell' },
    ],
  },
];

const STATE_GROUPS: MenuGroupData[] = [
  {
    items: [
      { label: 'Con badge', href: '#badge', icon: 'bell', badge: '5' },
      { label: 'Con atajo', href: '#shortcut', icon: 'search', shortcut: ['Ctrl', 'K'] },
      { label: 'Con hijos', href: '#children', icon: 'folder', children: [
        { label: 'Ítem A', href: '#a' },
        { label: 'Ítem B', href: '#b' },
      ] },
      { label: 'Deshabilitado', href: '#disabled', icon: 'lock', disabled: true },
    ],
  },
];

const ALL_FLEET_ITEMS = FLEET_GROUPS.flatMap((g) => g.items);
const ACTIVE_ITEM_OPTIONS = ALL_FLEET_ITEMS.map((i) => i.label);

// Datos de los dos ejemplos vivos de "Lineamientos de uso" (actionsDo/depthDo
// en MenuPageContent.tsx) — ahí React renderiza un <Menu> real e interactivo
// dentro de la tarjeta "Recomendado", no solo texto (ver B15).
const GUIDE_ACTIONS_GROUPS: MenuGroupData[] = [
  { items: [{ label: 'Vehículos', href: '/fleet/vehicles', icon: 'truck' }] },
];
const GUIDE_DEPTH_GROUPS: MenuGroupData[] = [
  {
    items: [
      { label: 'Flota', href: '/fleet', icon: 'truck', children: [{ label: 'Vehículos', href: '/fleet/vehicles' }] },
    ],
  },
];

const MODE_OPTIONS: MenuMode[] = ['expanded', 'rail'];

@Component({
  selector: 'app-menu-page',
  imports: [Menu, DemoShell],
  templateUrl: './menu-page.html',
  styleUrl: './menu-page.css',
})
export class MenuPage implements AfterViewInit, OnDestroy {
  protected readonly fleetGroups = FLEET_GROUPS;
  protected readonly stateGroups = STATE_GROUPS;
  protected readonly guideActionsGroups = GUIDE_ACTIONS_GROUPS;
  protected readonly guideDepthGroups = GUIDE_DEPTH_GROUPS;

  /* Playground */
  // Key del control "expanded"/"rail" es "menuMode", NUNCA "mode" — "mode"
  // es la clave reservada que el propio DemoShell usa para su interruptor
  // de tema claro/oscuro del Canvas (ver demo-shell.ts: state signal
  // inicializado con { mode: 'light' }). Bug real encontrado en esta
  // sesión: la página usaba "mode" para el control de Menu y eso
  // sobreescribía el tema del Canvas con el valor de Menu ("expanded"),
  // rompiendo el grid de puntos/colores del Canvas (`[attr.data-theme]`
  // terminaba en "expanded" en vez de "light"/"dark").
  protected readonly playgroundControls: ControlDef[] = [
    { kind: 'select', label: 'Modo', key: 'menuMode', options: MODE_OPTIONS, default: 'expanded' },
    { kind: 'select', label: 'Ítem activo', key: 'activeItem', options: ACTIVE_ITEM_OPTIONS, default: 'En vivo' },
  ];
  protected readonly pgMode = signal<MenuMode>('expanded');
  protected readonly pgActiveHref = signal('/live');

  protected onPlaygroundState(s: DemoState): void {
    if (s['menuMode']) this.pgMode.set(s['menuMode'] as MenuMode);
    if (s['activeItem']) {
      const item = ALL_FLEET_ITEMS.find((i) => i.label === s['activeItem']);
      this.pgActiveHref.set(item?.href ?? '/live');
    }
  }

  // Los href de FLEET_GROUPS/STATE_GROUPS son rutas reales de C-Locater
  // Flotas, no de este sitio de documentación — un <a routerLink> real
  // navegaría a una ruta que acá no existe y rompería la demo. Se
  // intercepta el clic en fase de captura sobre el contenedor de la demo,
  // sin tocar el propio <cs-menu> (que en un producto real sí debe
  // navegar). Mismo criterio que preventDemoNavigation en React.
  @ViewChild('demoRoot') private demoRoot?: ElementRef<HTMLElement>;
  private preventNav = (e: MouseEvent): void => {
    if ((e.target as HTMLElement).closest('a')) e.preventDefault();
  };

  ngAfterViewInit(): void {
    this.demoRoot?.nativeElement.addEventListener('click', this.preventNav, true);
  }
  ngOnDestroy(): void {
    this.demoRoot?.nativeElement.removeEventListener('click', this.preventNav, true);
  }
}
