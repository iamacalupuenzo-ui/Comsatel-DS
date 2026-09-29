import { Component, ComponentRef, ElementRef, EnvironmentInjector, OnDestroy, OnInit, ViewChild, createComponent, inject, signal } from '@angular/core';
import * as L from 'leaflet';
import { VehiclePill, type VehicleStatus } from '../markers-demo/vehicle-pill';

/**
 * Mapa base del producto (FleetOperations): Leaflet con los mosaicos raster
 * CARTO Voyager, centrado en Lima con la misma configuración que el mapa
 * operativo (zoom 13, máximo 20, sin control de zoom propio de Leaflet).
 *
 * CARTO exige clave en todos sus mosaicos (sin ella devuelve una imagen con
 * «API KEY REQUIRED»). Este repositorio es público, así que la clave no se
 * versiona: se lee de `public/map-config.local.json`, ignorado por git. Sin
 * ese archivo, el mapa usa OpenStreetMap y lo avisa.
 */
const CARTO_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?key=';
const CARTO_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';
const OSM_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const OSM_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const LIMA_CENTER: L.LatLngTuple = [-12.0464, -77.0428];
const DEFAULT_ZOOM = 13;
const MAX_ZOOM = 20;

interface DemoUnit { position: L.LatLngTuple; label: string; plate: string; status: VehicleStatus }
const UNITS: DemoUnit[] = [
  { position: [-12.0464, -77.0428], label: 'Camión Norte 04', plate: 'ABC-123', status: 'active' },
  { position: [-12.0532, -77.0301], label: 'Furgón Sur 12', plate: 'GHI-789', status: 'offline' },
  { position: [-12.0391, -77.0552], label: 'Furgón Centro 09', plate: 'PQR-678', status: 'stopped' },
];

@Component({
  selector: 'app-product-map-preview',
  template: `
    <div #mapEl class="product-map" role="img" aria-label="Mapa del producto centrado en Lima con tres unidades de ejemplo"></div>
    <p class="product-map__source" aria-live="polite">
      @if (provider() === 'carto') {
        Mosaicos: CARTO Voyager, los mismos del producto.
      } @else if (provider() === 'osm') {
        Mosaicos: OpenStreetMap. Falta la clave local de CARTO en <code>public/map-config.local.json</code>, así que el mapa no se ve igual que en el producto.
      }
    </p>
  `,
  styles: [
    `
      :host { display: grid; gap: var(--layout-gap-sm); }
      .product-map {
        width: 100%;
        height: 400px;
        overflow: hidden;
        border: var(--layout-border-thin) solid var(--color-border-neutral-subtle);
        border-radius: var(--radius-lg);
        background: var(--color-background-neutral-subtlest);
      }
      .product-map__source {
        margin: 0;
        color: var(--color-text-base-subtle);
        font-size: var(--font-size-content-note);
        line-height: var(--font-line-height-content-note);
      }
    `,
  ],
})
export class ProductMapPreview implements OnInit, OnDestroy {
  @ViewChild('mapEl', { static: true }) private mapElRef!: ElementRef<HTMLDivElement>;
  private readonly environmentInjector = inject(EnvironmentInjector);
  private map?: L.Map;
  private readonly markers: ComponentRef<VehiclePill>[] = [];
  protected readonly provider = signal<'carto' | 'osm' | null>(null);

  ngOnInit(): void {
    this.map = L.map(this.mapElRef.nativeElement, {
      center: LIMA_CENTER,
      zoom: DEFAULT_ZOOM,
      zoomControl: false,
      attributionControl: true,
      scrollWheelZoom: false,
    });
    void this.addTiles();
    this.addMarkers();
  }

  ngOnDestroy(): void {
    this.map?.remove();
    for (const ref of this.markers) ref.destroy();
  }

  private async addTiles(): Promise<void> {
    const key = await this.readCartoKey();
    if (!this.map) return;
    if (key) {
      L.tileLayer(CARTO_URL + encodeURIComponent(key), { attribution: CARTO_ATTRIBUTION, maxZoom: MAX_ZOOM, maxNativeZoom: MAX_ZOOM, subdomains: 'abcd' }).addTo(this.map);
      this.provider.set('carto');
    } else {
      L.tileLayer(OSM_URL, { attribution: OSM_ATTRIBUTION, maxZoom: 19 }).addTo(this.map);
      this.provider.set('osm');
    }
  }

  private async readCartoKey(): Promise<string> {
    try {
      const response = await fetch('map-config.local.json', { cache: 'no-store' });
      if (!response.ok) return '';
      const config = (await response.json()) as { cartoApiKey?: string };
      return config.cartoApiKey?.trim() ?? '';
    } catch {
      return '';
    }
  }

  // El marcador real de /map/markers, no uno redibujado: se crea con el
  // compilador de Angular para que su CSS con scope aplique.
  private addMarkers(): void {
    for (const unit of UNITS) {
      const ref = createComponent(VehiclePill, { environmentInjector: this.environmentInjector });
      ref.instance.status = unit.status;
      ref.instance.label = unit.label;
      ref.instance.plate = unit.plate;
      ref.instance.vehicleType = 'car';
      ref.instance.iconTier = 'sm';
      ref.changeDetectorRef.detectChanges();
      this.markers.push(ref);
      const pill = ref.location.nativeElement as HTMLElement;
      // Centrado horizontal y apoyado sobre la posición, como el pin del producto.
      pill.style.display = 'inline-block';
      pill.style.width = 'max-content';
      pill.style.transform = 'translate(-50%, -100%)';
      const icon = L.divIcon({ html: pill, className: 'product-map__marker', iconSize: [0, 0], iconAnchor: [0, 0] });
      L.marker(unit.position, { icon, keyboard: false }).addTo(this.map!);
    }
  }
}
