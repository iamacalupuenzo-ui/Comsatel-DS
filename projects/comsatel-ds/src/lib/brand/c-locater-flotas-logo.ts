import { Component, Input } from '@angular/core';
import { C_LOCATER_FLOTAS_WORDMARK_SOURCE } from './c-locater-flotas-wordmark-source';

export type CLocaterFlotasLogoSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type CLocaterFlotasLogoFit = 'content' | 'container';

// El recurso se embebe para no depender de rutas relativas en la caché de
// pre-bundling de Vite ni de que la aplicación copie assets de node_modules.
const WORDMARK_SOURCE = C_LOCATER_FLOTAS_WORDMARK_SOURCE;

@Component({
  selector: 'cs-c-locater-flotas-logo',
  templateUrl: './c-locater-flotas-logo.html',
  styleUrl: './c-locater-flotas-logo.css',
  host: {
    '[class.cs-c-locater-flotas-logo-host--fit-container]': "fit === 'container'",
  },
})
export class CLocaterFlotasLogo {
  @Input() size: CLocaterFlotasLogoSize = 'md';
  @Input() fit: CLocaterFlotasLogoFit = 'content';
  @Input() alt = 'C-Locater Flotas by Comsatel';
  @Input() decorative = false;

  protected readonly source = WORDMARK_SOURCE;
}
