import { Component, Input } from '@angular/core';

export type CLocaterFlotasLogoVariant = 'full' | 'icon';
export type CLocaterFlotasLogoSize = 'sm' | 'md' | 'lg';

// Las rutas deben permanecer estáticas: Angular/Vite las analiza y reescribe
// al pre-empaquetar dependencias ESM de una aplicación consumidora.
const FULL_LOGO_SOURCE = new URL(
  '../assets/logos/c-locater-flotas-logo.png',
  import.meta.url,
).toString();
const ICON_LOGO_SOURCE = new URL(
  '../assets/logos/c-locater-flotas-isotype.png',
  import.meta.url,
).toString();

@Component({
  selector: 'cs-c-locater-flotas-logo',
  templateUrl: './c-locater-flotas-logo.html',
  styleUrl: './c-locater-flotas-logo.css',
})
export class CLocaterFlotasLogo {
  @Input() variant: CLocaterFlotasLogoVariant = 'full';
  @Input() size: CLocaterFlotasLogoSize = 'md';
  @Input() alt = 'C-Locater Flotas by Comsatel';
  @Input() decorative = false;

  protected get source(): string {
    return this.variant === 'icon' ? ICON_LOGO_SOURCE : FULL_LOGO_SOURCE;
  }
}
