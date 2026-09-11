import { Component } from '@angular/core';
import { CodeBlock } from '../../shared/docs/code-block';
import { LiveMapPreview } from './live-map-preview';

interface ColorSwatchEntry {
  name: string;
  token: string;
  cssVar: string;
}

// Los 4 valores son alias de --color-accent-* (ver tokens.css): no son
// colores nuevos, es la paleta de accents ya existente aplicada a tipo de
// dispositivo GPS. teal/lime/pink/yellow del set de 7 accents quedan
// libres para futuros tipos.
const GPS_TYPE_TOKENS: ColorSwatchEntry[] = [
  { name: 'Flotas', token: '--color-map-gps-flotas → --color-accent-blue', cssVar: '--color-map-gps-flotas' },
  { name: 'Básico', token: '--color-map-gps-basico → --color-accent-teal', cssVar: '--color-map-gps-basico' },
  { name: 'Contingencia', token: '--color-map-gps-contingencia → --color-accent-purple', cssVar: '--color-map-gps-contingencia' },
  { name: 'SVR-X', token: '--color-map-gps-svr-x → --color-accent-orange', cssVar: '--color-map-gps-svr-x' },
];

// Alias de --color-status-*, el mismo set que usa el indicador de estado de
// Avatar. --color-status-warning es la única incorporación nueva a ese set,
// para el caso de "señal baja" que antes no tenía un tier propio.
const GPS_STATUS_TOKENS: ColorSwatchEntry[] = [
  { name: 'Reportando', token: '--color-map-status-reporting → --color-status-online', cssVar: '--color-map-status-reporting' },
  { name: 'Sin señal', token: '--color-map-status-no-signal → --color-status-busy', cssVar: '--color-map-status-no-signal' },
  { name: 'Señal baja', token: '--color-map-status-low-signal → --color-status-warning', cssVar: '--color-map-status-low-signal' },
  { name: 'Desconectado', token: '--color-map-status-disconnected → --color-status-offline', cssVar: '--color-map-status-disconnected' },
];

const USAGE_CODE = `mapDark = signal(false);

<img
  [src]="mapDark()
    ? 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
    : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'"
/>
<!-- en la práctica: L.tileLayer(url, { attribution }).addTo(map) -->`;

@Component({
  selector: 'app-map-theme-page',
  imports: [CodeBlock, LiveMapPreview],
  templateUrl: './map-theme-page.html',
  styleUrl: './map-theme-page.css',
})
export class MapThemePage {
  protected readonly gpsTypeTokens = GPS_TYPE_TOKENS;
  protected readonly gpsStatusTokens = GPS_STATUS_TOKENS;
  protected readonly usageCode = USAGE_CODE;
}
