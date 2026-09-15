import { Component, Input } from '@angular/core';

export type CLocaterFlotasLogoVariant = 'full' | 'icon';
export type CLocaterFlotasLogoSize = 'sm' | 'md' | 'lg';

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
    const filename = this.variant === 'icon'
      ? 'c-locater-flotas-isotype.png'
      : 'c-locater-flotas-logo.png';
    return new URL(`../assets/logos/${filename}`, import.meta.url).toString();
  }
}
