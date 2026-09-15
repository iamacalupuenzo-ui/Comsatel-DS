import {
  Component,
  ComponentRef,
  ElementRef,
  EnvironmentInjector,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  createComponent,
  inject,
} from '@angular/core';
import { Map as MapLibreMap, Marker, setWorkerUrl } from 'maplibre-gl';
import { VehiclePill } from '../markers-demo/vehicle-pill';

// MapLibre resuelve su propio worker con un patrón (`new URL('./maplibre-gl-worker.mjs',
// import.meta.url)` partido en dos funciones internas) que ni Vite (dev) ni
// esbuild (build de producción, motor real de @angular/build) detectan como
// referencia de asset — sin esto, el worker nunca carga y el mapa queda en
// blanco sin ningún error de consola. Fix real: copiar el archivo del
// worker (+ su sibling maplibre-gl-shared.mjs, que importa internamente) a
// la raíz servida vía `assets` en angular.json, y apuntar con una URL
// absoluta de string plano — sin bundling, funciona igual en dev y prod.
setWorkerUrl('/maplibre-gl-worker.mjs');

const CENTER: [number, number] = [-77.0428, -12.0464]; // Lima — mismo centro que usa C-Locater (MapLibre usa [lng, lat])
const ZOOM = 13;

// OpenFreeMap: tiles vectoriales sobre datos de OpenStreetMap, sin API key,
// sin cuenta y sin límite de requests (openfreemap.org) — estilos Positron
// (claro) y Dark (oscuro), la misma pareja que documentan CARTO/Stadia más
// abajo en la página, pero sin la fricción de una key que hoy ninguno de
// los dos tiene configurada.
const STYLE_URL: Record<'light' | 'dark', string> = {
  light: 'https://tiles.openfreemap.org/styles/positron',
  dark: 'https://tiles.openfreemap.org/styles/dark',
};

// Bug real de accesibilidad en el estilo "dark" público de OpenFreeMap
// (tiles.openfreemap.org/styles/dark), confirmado leyendo su style.json.
// No es solo el texto: la MAYORÍA de las calles (`highway_minor`, la capa
// que dibuja las vías locales/residenciales, la más común en cualquier
// zoom útil) usa `#181818` sobre un fondo `rgb(12,12,12)` — contraste real
// ~1.1:1, prácticamente invisible, así que el mapa se leía como una mancha
// negra sin red vial. Building fill (`rgb(10,10,10)`) y el fondo mismo
// agravan el efecto. El estilo "positron" (claro) no tiene este problema.
// Fix: subir estos paints apenas carga el estilo — no son valores de
// nuestro sistema de tokens (es la hoja de estilo del proveedor externo,
// igual que documenta la página: "no hay token de color que los
// reescriba"), así que quedan explícitos acá, cada uno elegido por
// contraste real calculado (fórmula WCAG 2.1), no copiado de ningún lado:
// - Etiquetas de calle/lugar: ~9-11:1 contra el fondo (mínimo texto 4.5:1).
// - `highway_minor` (vías locales): ~4.5:1 contra el fondo, visible sin
//   competir con las vías principales.
// - `highway_major_subtle`/`highway_motorway_subtle`: ~7.5-10:1, jerarquía
//   más clara que las vías locales.
// - `highway_path` (peatonal/sendero): ~2:1, deliberadamente más sutil —
//   es la vía de menor jerarquía, no debe leerse igual que una calle real.
// - Fondo y edificios: ajuste leve (no aportan información de red vial, el
//   objetivo es solo que no se vea "todo negro").
const DARK_LABEL_LAYERS = [
  'highway_name_other',
  'highway_name_motorway',
  'place_other',
  'place_suburb',
  'place_village',
  'place_town',
  'place_city',
  'place_city_large',
  'place_state',
  'place_country_other',
  'place_country_minor',
  'place_country_major',
];
const DARK_LABEL_COLOR = 'rgb(200, 200, 200)';
const DARK_WATER_LABEL_COLOR = 'rgb(150, 165, 190)';

const DARK_BACKGROUND_COLOR = 'rgb(20, 20, 23)';
const DARK_ROAD_LINE_COLOR: Record<string, string> = {
  highway_minor: 'rgb(125, 125, 130)',
  highway_major_subtle: 'rgb(165, 165, 170)',
  highway_motorway_subtle: 'rgb(190, 190, 195)',
  highway_path: 'rgb(70, 70, 75)',
};
const DARK_BUILDING_FILL_COLOR = 'rgb(26, 26, 29)';

/** Mapa real embebido, no una maqueta: el objetivo de esta página es que se
 * pueda ver el diseño de mapa que efectivamente se usa, no describirlo.
 * Componente local de esta página de documentación (no forma parte de la
 * librería comsatel-ds): usa el paquete `maplibre-gl` directo con su API
 * vanilla, sin ningún wrapper de terceros para Angular. Dibuja además una
 * unidad de ejemplo reusando el componente `VehiclePill` real que ya
 * documenta `/map/markers` — nunca un marcador redibujado a mano (C8) — para
 * validar el contraste real del pin sobre cada tema del mapa. */
@Component({
  selector: 'app-live-map-preview',
  standalone: true,
  templateUrl: './live-map-preview.html',
  styleUrl: './live-map-preview.css',
})
export class LiveMapPreview implements OnInit, OnDestroy {
  @Input({ required: true }) mode!: 'light' | 'dark';

  @ViewChild('mapEl', { static: true }) private mapElRef!: ElementRef<HTMLDivElement>;

  private readonly environmentInjector = inject(EnvironmentInjector);

  private map?: MapLibreMap;
  private markerRef?: ComponentRef<VehiclePill>;

  ngOnInit(): void {
    this.map = new MapLibreMap({
      container: this.mapElRef.nativeElement,
      style: STYLE_URL[this.mode],
      center: CENTER,
      zoom: ZOOM,
      interactive: false,
      attributionControl: false,
    });

    if (this.mode === 'dark') {
      this.map.on('load', () => this.fixDarkStyleContrast());
    }

    // createComponent (no document.createElement) para que VehiclePill
    // pase por el compilador real de Angular: su vista recibe el atributo
    // _ngcontent-* normal y su propio CSS con scope aplica sin el gotcha de
    // encapsulación que sí afecta a un nodo creado a mano (ver C4 punto 4).
    this.markerRef = createComponent(VehiclePill, { environmentInjector: this.environmentInjector });
    const pill = this.markerRef.instance;
    pill.status = 'active';
    pill.label = 'Unidad de ejemplo';
    pill.plate = 'ABC-123';
    pill.vehicleType = 'car';
    pill.iconTier = 'sm';
    this.markerRef.changeDetectorRef.detectChanges();

    new Marker({ element: this.markerRef.location.nativeElement, anchor: 'bottom' }).setLngLat(CENTER).addTo(this.map);
  }

  ngOnDestroy(): void {
    this.map?.remove();
    this.markerRef?.destroy();
  }

  private fixDarkStyleContrast(): void {
    const map = this.map;
    if (!map) return;
    for (const id of DARK_LABEL_LAYERS) {
      if (map.getLayer(id)) map.setPaintProperty(id, 'text-color', DARK_LABEL_COLOR);
    }
    if (map.getLayer('water_name')) map.setPaintProperty('water_name', 'text-color', DARK_WATER_LABEL_COLOR);

    if (map.getLayer('background')) map.setPaintProperty('background', 'background-color', DARK_BACKGROUND_COLOR);
    for (const [id, color] of Object.entries(DARK_ROAD_LINE_COLOR)) {
      if (map.getLayer(id)) map.setPaintProperty(id, 'line-color', color);
    }
    if (map.getLayer('building')) map.setPaintProperty('building', 'fill-color', DARK_BUILDING_FILL_COLOR);
  }
}
