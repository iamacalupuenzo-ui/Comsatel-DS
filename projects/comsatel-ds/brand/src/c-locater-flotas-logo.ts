import { Component, Input } from '@angular/core';
import { C_FLOTAS_ISOTYPE_SOURCE, C_FLOTAS_WORDMARK_SOURCE } from './c-flotas-logo-source';

export type CFlotasLogoSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type CFlotasLogoFit = 'content' | 'container';
/** `full` e `icon` se preservan temporalmente para consumidores anteriores. */
export type CFlotasLogoVariant = 'wordmark' | 'isotype' | 'full' | 'icon';

@Component({
  selector: 'cs-c-flotas-logo, cs-c-locater-flotas-logo',
  templateUrl: './c-locater-flotas-logo.html',
  styleUrl: './c-locater-flotas-logo.css',
  host: {
    '[class.cs-c-flotas-logo-host--fit-container]': "fit === 'container' && resolvedVariant === 'wordmark'",
  },
})
export class CFlotasLogo {
  @Input() variant: CFlotasLogoVariant = 'wordmark';
  @Input() size: CFlotasLogoSize = 'md';
  @Input() fit: CFlotasLogoFit = 'content';
  @Input() alt = 'C-Flotas by Comsatel';
  @Input() decorative = false;

  protected get resolvedVariant(): 'wordmark' | 'isotype' {
    return this.variant === 'isotype' || this.variant === 'icon' ? 'isotype' : 'wordmark';
  }

  protected get source(): string {
    return this.resolvedVariant === 'isotype' ? C_FLOTAS_ISOTYPE_SOURCE : C_FLOTAS_WORDMARK_SOURCE;
  }
}

/** @deprecated Usa `CFlotasLogo`; se conserva para evitar una migración forzada. */
export { CFlotasLogo as CLocaterFlotasLogo };
/** @deprecated Usa `CFlotasLogoSize`. */
export type { CFlotasLogoSize as CLocaterFlotasLogoSize };
/** @deprecated Usa `CFlotasLogoFit`. */
export type { CFlotasLogoFit as CLocaterFlotasLogoFit };
/** @deprecated Usa `CFlotasLogoVariant`. */
export type { CFlotasLogoVariant as CLocaterFlotasLogoVariant };
