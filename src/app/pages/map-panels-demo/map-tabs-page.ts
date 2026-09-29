import { Component, computed, signal } from '@angular/core';
import { MapTabs, Modal, mapTabId, type MapTab, type MapTabRename } from '@iamacalupuenzo-ui/comsatel-ds';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';

type TabsState = 'single' | 'follow' | 'mixed' | 'overflow';
interface TabsDemo { key: TabsState; title: string; intro: string; tabs: MapTab[] }

const MAP_TAB: MapTab = { id: 'map', label: 'Mapa', icon: 'map' };
const follow = (id: string, label: string, count: number): MapTab => ({ id, label, icon: 'eye', count, closable: true, renamable: true });
const bitacora = (plate: string): MapTab => ({ id: `bitacora:${plate}`, label: plate, icon: 'file-text', closable: true, description: `Bitácora de ${plate}` });
const recovery = (plate: string): MapTab => ({ id: `recovery:${plate}`, label: `Recupero · ${plate}`, icon: 'locate-fixed', closable: true, description: `Recupero de ${plate}` });

const STATES: TabsDemo[] = [
  { key: 'single', title: 'Mapa y una vista', intro: 'Con solo la pestaña del mapa, la barra no se muestra. Aparece cuando se abre la primera vista.', tabs: [MAP_TAB, bitacora('ABC-123')] },
  { key: 'follow', title: 'Grupo de seguimiento', intro: 'Muestra cuántas unidades sigue. Se renombra con doble clic, F2 o el lápiz que aparece en la pestaña activa.', tabs: [MAP_TAB, follow('follow:1', 'Seguimiento 1', 3)] },
  { key: 'mixed', title: 'Vistas de varios tipos', intro: 'El ícono distingue el tipo: ojo para seguimiento, documento para bitácora, objetivo para recupero.', tabs: [MAP_TAB, follow('follow:1', 'Ruta norte', 3), bitacora('GHI-789'), recovery('PQR-678')] },
  { key: 'overflow', title: 'Muchas pestañas', intro: 'Si no entran, la barra se desplaza en horizontal; los nombres largos se cortan con puntos suspensivos.', tabs: [MAP_TAB, follow('follow:1', 'Seguimiento de unidades de la zona norte', 5), follow('follow:2', 'Seguimiento 2', 2), bitacora('ABC-123'), bitacora('GHI-789'), bitacora('BAB-711'), recovery('PQR-678')] },
];

@Component({
  selector: 'app-map-tabs-page',
  imports: [DemoShell, MapTabs, Modal],
  templateUrl: './map-tabs-page.html',
  styleUrls: ['./map-demo.css', './map-tabs-page.css'],
})
export class MapTabsPage {
  protected readonly states = STATES;
  protected readonly controls: ControlDef[] = [
    { kind: 'select', label: 'Estado', key: 'state', options: STATES.map(({ key, title }) => ({ value: key, label: title })), default: 'mixed' },
  ];
  protected readonly pgState = signal<TabsState>('mixed');
  protected readonly pgInfo = computed(() => STATES.find((s) => s.key === this.pgState()) ?? STATES[0]);
  /** Pestañas y activa por caja: cerrar y renombrar funcionan en cada demo. */
  protected readonly tabsByKey = signal<Record<string, MapTab[]>>({ playground: STATES[2].tabs, ...Object.fromEntries(STATES.map((s) => [s.key, s.tabs])) });
  protected readonly activeByKey = signal<Record<string, string>>({});
  protected readonly confirming = signal<{ key: string; tab: MapTab } | null>(null);

  protected onState(s: DemoState): void {
    if (!s['state']) return;
    this.pgState.set(s['state'] as TabsState);
    this.tabsByKey.update((all) => ({ ...all, playground: this.pgInfo().tabs }));
    this.activeByKey.update((all) => ({ ...all, playground: 'map' }));
  }

  // Cada pestaña apunta a la vista de su caja (role="tabpanel"), como pide la guía.
  protected tabs(key: string): MapTab[] {
    return this.tabsByKey()[key].map((tab) => ({ ...tab, panelId: this.panelId(key) }));
  }
  protected panelId(key: string): string {
    return `map-tabs-view-${key}`;
  }
  protected labelledBy(key: string): string {
    return mapTabId(this.active(key));
  }
  protected active(key: string): string {
    return this.activeByKey()[key] ?? this.tabs(key)[1]?.id ?? 'map';
  }
  protected setActive(key: string, id: string): void {
    this.activeByKey.update((all) => ({ ...all, [key]: id }));
  }

  // Cerrar un seguimiento pierde la lista de unidades: se confirma. Una bitácora se cierra directo.
  protected requestClose(key: string, id: string): void {
    const tab = this.tabs(key).find((t) => t.id === id);
    if (!tab) return;
    if (tab.renamable) this.confirming.set({ key, tab });
    else this.close(key, id);
  }
  protected confirmClose(): void {
    const pending = this.confirming();
    if (pending) this.close(pending.key, pending.tab.id);
    this.confirming.set(null);
  }
  private close(key: string, id: string): void {
    const tabs = this.tabs(key);
    const index = tabs.findIndex((t) => t.id === id);
    this.tabsByKey.update((all) => ({ ...all, [key]: tabs.filter((t) => t.id !== id) }));
    // Como un navegador: si se cierra la activa, queda la de la izquierda.
    if (this.active(key) === id) this.setActive(key, tabs[index - 1]?.id ?? 'map');
  }

  protected rename(key: string, change: MapTabRename): void {
    this.tabsByKey.update((all) => ({
      ...all,
      [key]: all[key].map((t, i) => (t.id === change.id ? { ...t, label: change.label || `Seguimiento ${i}` } : t)),
    }));
  }

  protected codeFor(state: TabsDemo): string {
    const rows = state.tabs.map((t) => {
      const parts = [`id: '${t.id}'`, `label: '${t.label}'`, `icon: '${t.icon}'`];
      if (t.count !== undefined) parts.push(`count: ${t.count}`);
      if (t.closable) parts.push('closable: true');
      if (t.renamable) parts.push('renamable: true');
      if (t.description) parts.push(`description: '${t.description}'`);
      return `  { ${parts.join(', ')} },`;
    });
    return `tabs: MapTab[] = [\n${rows.join('\n')}\n];\n\n@if (tabs().length > 1) {\n  <cs-map-tabs\n    [tabs]="tabs()"\n    [(active)]="activeTab"\n    (closeRequest)="requestClose($event)"\n    (renamed)="rename($event)"\n  />\n}`;
  }
}
