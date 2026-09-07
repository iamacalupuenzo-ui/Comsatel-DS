import { Component, computed, signal } from '@angular/core';
import { DomSanitizer, type SafeHtml } from '@angular/platform-browser';
import { Button, ICON_REGISTRY, InputDropdown, type InputDropdownOption } from 'comsatel-ds';
import { CodeBlock } from '../../shared/docs/code-block';

interface CatalogEntry {
  id: string;
  name: string;
  svg: string;
}

interface Catalog {
  version: string;
  entries: CatalogEntry[];
}

interface SizeOption {
  key: string;
  token: string;
}

// Misma escala que consume el catálogo en React (sizes = { '2xs': ..., xs:
// ..., sm: ..., base: ... }) — tokens de --layout-size-*, no valores sueltos.
const SIZES: SizeOption[] = [
  { key: '2xs', token: '--layout-size-2xs' },
  { key: 'xs', token: '--layout-size-xs' },
  { key: 'sm', token: '--layout-size-sm' },
  { key: 'base', token: '--layout-size-base' },
];

const PAGE_SIZE = 72;

// Sinónimos en español para buscar por palabra clave sin conocer el nombre
// técnico en inglés de cada ícono.
const SYNONYMS: Record<string, string> = {
  flecha: 'arrow',
  atras: 'arrow-left',
  volver: 'arrow-left',
  arroba: 'at-sign',
  correo: 'mail',
  campana: 'bell',
  notificacion: 'bell',
  edificio: 'building',
  empresa: 'building',
  calendario: 'calendar',
  fecha: 'calendar',
  visto: 'check',
  confirmar: 'check',
  abajo: 'chevron-down',
  arriba: 'chevron-up',
  izquierda: 'chevron-left',
  derecha: 'chevron-right',
  copiar: 'copy',
  tarjeta: 'credit-card',
  pago: 'credit-card',
  ojo: 'eye',
  ver: 'eye',
  ocultar: 'eye-off',
  mundo: 'globe',
  idioma: 'globe',
  arrastrar: 'grip',
  casa: 'home',
  inicio: 'home',
  informacion: 'info',
  ayuda: 'life-buoy',
  soporte: 'life-buoy',
  cargando: 'loader',
  candado: 'lock',
  bloqueado: 'lock',
  salir: 'log-out',
  cerrarsesion: 'log-out',
  menu: 'menu',
  luna: 'moon',
  oscuro: 'moon',
  sol: 'sun',
  claro: 'sun',
  mas: 'plus',
  opciones: 'more-horizontal',
  archivo: 'file',
  documento: 'file-text',
  carpeta: 'folder',
  agregar: 'plus',
  nuevo: 'plus',
  eliminar: 'trash',
  borrar: 'trash',
  papelera: 'trash',
  filtros: 'sliders',
  ajustes: 'settings',
  configuracion: 'settings',
  destacado: 'star',
  estrella: 'star',
  usuario: 'user',
  perfil: 'user',
  cerrar: 'x',
  alerta: 'alert-triangle',
  advertencia: 'alert-triangle',
  ubicacion: 'map-pin',
  mapa: 'map',
  camion: 'truck',
  auto: 'car',
  coche: 'car',
  descargar: 'download',
  subir: 'upload',
  telefono: 'phone',
  editar: 'pencil',
  guardar: 'save',
  foto: 'image',
  imagen: 'image',
  circulo: 'circle',
  cuadrado: 'square',
  corazon: 'heart',
  reloj: 'clock',
  alarma: 'alarm-clock',
  ruta: 'route',
  panel: 'layout-dashboard',
};

@Component({
  selector: 'app-icons-page',
  imports: [Button, CodeBlock, InputDropdown],
  templateUrl: './icons-page.html',
  styleUrl: './icons-page.css',
})
export class IconsPage {
  protected readonly sizes = SIZES;
  protected readonly sizeOptions: InputDropdownOption[] = SIZES.map((s) => ({ value: s.key, label: s.key }));

  protected readonly catalog = signal<Catalog | null>(null);
  protected readonly failed = signal(false);
  protected readonly attempt = signal(0);

  protected readonly query = signal('');
  protected readonly limit = signal(PAGE_SIZE);
  protected readonly size = signal<SizeOption>(SIZES[2]);
  protected readonly selected = signal<CatalogEntry | null>(null);
  protected readonly copyStatus = signal<'copied' | 'error' | null>(null);

  constructor(private sanitizer: DomSanitizer) {
    this.loadCatalog();
  }

  private async loadCatalog(): Promise<void> {
    this.failed.set(false);
    try {
      const res = await fetch('/icons/lucide/catalog.json');
      if (!res.ok) throw new Error('catalog fetch failed');
      const data = (await res.json()) as Catalog;
      this.catalog.set(data);
      this.selected.set(data.entries.find((e) => e.id === 'map-pin') ?? data.entries[0] ?? null);
    } catch {
      this.failed.set(true);
    }
  }

  protected retry(): void {
    this.attempt.update((a) => a + 1);
    this.loadCatalog();
  }

  protected readonly sizePx = computed(() => {
    const css = getComputedStyle(document.documentElement);
    return parseInt(css.getPropertyValue(this.size().token).trim(), 10) || 24;
  });

  protected readonly matches = computed(() => {
    const cat = this.catalog();
    if (!cat) return [];
    const raw = this.query()
      .toLowerCase()
      .normalize('NFD')
      .replace(new RegExp('[\\u0300-\\u036f]', 'g'), '')
      .trim();
    if (!raw) return cat.entries;
    const term = SYNONYMS[raw] ?? raw;
    return cat.entries.filter((e) => `${e.id} ${e.name.toLowerCase()}`.includes(term));
  });

  protected readonly visible = computed(() => this.matches().slice(0, this.limit()));

  protected onQueryChange(value: string): void {
    this.query.set(value);
    this.limit.set(PAGE_SIZE);
  }

  protected onSizeChange(value: string): void {
    this.size.set(SIZES.find((s) => s.key === value) ?? SIZES[2]);
  }

  protected showMore(): void {
    this.limit.update((n) => n + PAGE_SIZE);
  }

  protected select(entry: CatalogEntry): void {
    this.selected.set(entry);
    this.copyStatus.set(null);
  }

  // El catálogo trae cada SVG con width="24" height="24" fijos en el propio
  // markup. Un innerHTML inyectado en runtime no recibe el atributo de
  // encapsulación de Angular, así que el CSS con scope del componente no
  // puede alcanzar ese <svg> — por eso el tamaño se reescribe acá, en el
  // string, en vez de intentar controlarlo por CSS (la causa real de que el
  // selector de tamaño no cambiara nada visualmente antes de este fix).
  protected iconHtml(entry: CatalogEntry, px: number): SafeHtml {
    const resized = entry.svg
      .replace(/\swidth="[^"]*"/, ` width="${px}"`)
      .replace(/\sheight="[^"]*"/, ` height="${px}"`);
    return this.sanitizer.bypassSecurityTrustHtml(resized);
  }

  protected async copySvg(): Promise<void> {
    const entry = this.selected();
    if (!entry) return;
    try {
      await navigator.clipboard.writeText(entry.svg);
      this.copyStatus.set('copied');
    } catch {
      this.copyStatus.set('error');
    }
  }

  protected readonly isInComponentSet = computed(() => {
    const entry = this.selected();
    return !!entry && entry.id in ICON_REGISTRY;
  });

  protected readonly codeText = computed(() => {
    const entry = this.selected();
    if (!entry) return '';
    const px = this.sizePx();
    const lines = [`<img src="/icons/lucide/${entry.id}.svg" width="${px}" height="${px}" alt="" />`];
    if (this.isInComponentSet()) {
      lines.push('', '// También está en el registro curado que usan los componentes:', `<cs-icon name="${entry.id}" [size]="${px}"></cs-icon>`);
    }
    return lines.join('\n');
  });
}
