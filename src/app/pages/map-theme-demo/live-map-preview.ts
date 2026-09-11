import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';

const CENTER: L.LatLngTuple = [-12.0464, -77.0428]; // Lima — mismo centro que usa C-Locater
const ZOOM = 13;

// Los proveedores documentados (CartoDB Voyager, Stadia Alidade Smooth Dark)
// exigen API key del lado del proveedor — sin una, devuelven un tile
// "API KEY REQUIRED" / "401 Invalid Authentication" en vez del mapa. No hay
// ninguna key configurada en C-Locater tampoco, así que esto probablemente
// ya afecta al mapa real en producción, no solo a esta demo. Esri World
// Gray Base es gratuito y no pide key: se usa acá SOLO para que esta vista
// previa funcione mientras se resuelve la key real de Stadia/Carto.
const PROVIDERS: Record<'light' | 'dark', { url: string; attribution: string }> = {
  light: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Esri, HERE, Garmin, FAO, NOAA, USGS',
  },
  dark: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Esri, HERE, Garmin, FAO, NOAA, USGS',
  },
};

/** Mapa real embebido, no una maqueta: el objetivo de esta página es que se
 * pueda ver el diseño de mapa que efectivamente se usa, no describirlo.
 * Componente local de esta página de documentación (no forma parte de la
 * librería comsatel-ds): usa el paquete `leaflet` directo con su API
 * vanilla, sin ningún wrapper de terceros para Angular. */
@Component({
  selector: 'app-live-map-preview',
  standalone: true,
  templateUrl: './live-map-preview.html',
  styleUrl: './live-map-preview.css',
})
export class LiveMapPreview implements OnInit, OnDestroy {
  @Input({ required: true }) mode!: 'light' | 'dark';

  @ViewChild('mapEl', { static: true }) private mapElRef!: ElementRef<HTMLDivElement>;

  private map?: L.Map;

  ngOnInit(): void {
    const provider = PROVIDERS[this.mode];
    this.map = L.map(this.mapElRef.nativeElement, {
      center: CENTER,
      zoom: ZOOM,
      zoomControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      attributionControl: false,
    });
    L.tileLayer(provider.url, { attribution: provider.attribution, maxZoom: 16, maxNativeZoom: 16 }).addTo(this.map);
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }
}
