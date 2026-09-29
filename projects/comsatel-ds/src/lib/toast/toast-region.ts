import { Component, Input } from '@angular/core';

export type ToastRegionPlacement = 'top-end' | 'bottom-end';

/**
 * Contenedor fijo para los `cs-toast` de una pantalla: los ubica en una
 * esquina, sobre el resto del contenido, y los apila con separación. No
 * encola ni programa el cierre: eso sigue siendo del consumidor.
 */
@Component({
  selector: 'cs-toast-region',
  template: `<ng-content />`,
  host: {
    class: 'cs-toast-region',
    '[attr.data-placement]': 'placement',
  },
  styles: [
    `
      :host {
        position: fixed;
        right: var(--layout-padding-2xl);
        z-index: var(--elevation-z-index-toast);
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: var(--layout-gap-md);
        max-width: calc(100vw - var(--layout-padding-2xl) - var(--layout-padding-2xl));
      }
      :host([data-placement='top-end']) {
        top: var(--layout-padding-2xl);
      }
      :host([data-placement='bottom-end']) {
        bottom: var(--layout-padding-2xl);
        flex-direction: column-reverse;
      }
      @media (max-width: 767px) {
        :host {
          right: var(--layout-padding-lg);
          left: var(--layout-padding-lg);
          max-width: none;
          align-items: stretch;
        }
      }
    `,
  ],
})
export class ToastRegion {
  @Input() placement: ToastRegionPlacement = 'top-end';
}
