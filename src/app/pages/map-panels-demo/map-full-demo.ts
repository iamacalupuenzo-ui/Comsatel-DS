import { Component, computed, signal } from '@angular/core';
import { MapNotification, MapPanel, MapSearch, MapTabs, formatDateTime, type MapTab } from '@iamacalupuenzo-ui/comsatel-ds';
import { ProductMapPreview } from '../map-theme-demo/product-map-preview';
import { DEMO_UNITS, demoNotifications, type DemoNotification } from './map-demo-data';

/** Los tres organismos del mapa juntos sobre el mapa real del producto. */
@Component({
  selector: 'app-map-full-demo',
  imports: [MapNotification, MapPanel, MapSearch, MapTabs, ProductMapPreview],
  template: `
    <cs-map-tabs [tabs]="tabs()" [(active)]="active" (closeRequest)="close($event)" />
    <app-product-map-preview [height]="480">
      <cs-map-search class="overlay overlay--left" [(query)]="query" [(open)]="searchOpen" listLabel="Unidades encontradas">
        @for (unit of results(); track unit.id) {
          <div role="listitem" class="unit">
            <strong>{{ unit.plate }}</strong>
            <span>{{ formatDateTime(unit.lastReport) }}</span>
          </div>
        } @empty {
          <p class="empty" role="status">Sin resultados</p>
        }
      </cs-map-search>
      <cs-map-panel
        class="overlay overlay--right"
        label="Notificaciones de unidades"
        title="Notificaciones"
        icon="bell"
        listLabel="Lista de notificaciones"
        [badge]="entries().length"
        [badgeDescription]="entries().length + ' notificaciones pendientes'"
        [(open)]="alertsOpen"
      >
        @for (entry of entries(); track entry.id) {
          <cs-map-notification [eventLabel]="entry.eventLabel" [unitName]="entry.unitName" [unitCode]="entry.unitCode" [time]="entry.time" [count]="entry.count" [unread]="entry.unread" (dismissed)="dismiss(entry.id)" />
        } @empty {
          <p class="empty">Sin notificaciones</p>
        }
      </cs-map-panel>
    </app-product-map-preview>
  `,
  styles: [
    `
      :host { display: grid; }
      /* Por encima de los mosaicos y marcadores de Leaflet (z-index 400 a 600). */
      .overlay {
        position: absolute;
        z-index: 700;
        inset-block: var(--layout-padding-md) calc(var(--layout-padding-md) + 20px);
        max-inline-size: calc(50% - 1.5 * var(--layout-padding-md));
      }
      .overlay--left { inset-inline-start: var(--layout-padding-md); }
      .overlay--right { inset-inline-end: var(--layout-padding-md); }
      .unit {
        display: grid;
        gap: var(--layout-gap-2xs);
        padding: var(--layout-padding-md) var(--layout-padding-lg);
        border: var(--layout-border-thin) solid var(--color-border-divider);
        border-radius: var(--radius-md);
        background: var(--elevation-surface-default);
        color: var(--color-text-base-subtle);
        font-size: var(--font-size-content-note);
        line-height: var(--font-line-height-content-note);
      }
      .unit strong { color: var(--color-text-base-default); font-size: var(--font-size-content-ui); }
      .empty { margin: 0; padding: var(--layout-padding-xs); color: var(--color-text-base-subtle); font-size: var(--font-size-content-note); }
    `,
  ],
})
export class MapFullDemo {
  protected readonly formatDateTime = formatDateTime;
  protected readonly query = signal('');
  protected readonly searchOpen = signal(true);
  protected readonly alertsOpen = signal(true);
  protected readonly active = signal('map');
  protected readonly entries = signal<DemoNotification[]>(demoNotifications().slice(0, 3));
  protected readonly tabs = signal<MapTab[]>([
    { id: 'map', label: 'Mapa', icon: 'map' },
    { id: 'follow:1', label: 'Seguimiento 1', icon: 'eye', count: 3, closable: true, renamable: true },
    { id: 'bitacora:GHI-789', label: 'GHI-789', icon: 'file-text', closable: true, description: 'Bitácora de GHI-789' },
  ]);
  protected readonly results = computed(() => {
    const q = this.query().trim().toLowerCase();
    return DEMO_UNITS.filter((unit) => !q || unit.plate.toLowerCase().includes(q));
  });

  protected close(id: string): void {
    this.tabs.update((all) => all.filter((tab) => tab.id !== id));
    if (this.active() === id) this.active.set('map');
  }
  protected dismiss(id: string): void {
    this.entries.update((all) => all.filter((entry) => entry.id !== id));
  }
}
