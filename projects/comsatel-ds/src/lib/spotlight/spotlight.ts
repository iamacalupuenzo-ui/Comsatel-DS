import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Icon } from '../icons/icon';

export type SpotlightPlacement = 'top' | 'bottom' | 'left' | 'right';

let nextSpotlightId = 0;

/**
 * Resalta un elemento de la UI real (el "target", proyectado vía
 * `<ng-content>`) con un halo + un callout de texto/acciones al lado — para
 * un recorrido de onboarding paso a paso. Sin blanket, scroll-lock ni
 * focus-trap a propósito: la persona puede seguir usando el resto de la
 * pantalla mientras el spotlight está abierto, nunca queda secuestrada
 * dentro del recorrido. El halo alrededor del target es la única señal de
 * énfasis — reemplaza al blanket oscurecido que sí bloquearía la
 * interacción (ver Modal para el caso que SÍ necesita bloquear).
 */
@Component({
  selector: 'cs-spotlight',
  imports: [Icon],
  templateUrl: './spotlight.html',
  styleUrl: './spotlight.css',
  host: {
    '[attr.data-visible]': 'isVisible',
  },
})
export class Spotlight {
  private readonly spotlightId = `cs-spotlight-${nextSpotlightId++}`;
  protected readonly headlineId = `${this.spotlightId}-headline`;
  protected readonly descriptionId = `${this.spotlightId}-description`;

  @Input() isVisible = false;
  @Input() placement: SpotlightPlacement = 'bottom';
  @Input({ required: true }) headline!: string;
  @Input() description?: string;
  @Input() stepCount?: string;
  @Input({ required: true }) primaryActionLabel!: string;
  @Input() secondaryActionLabel?: string;
  @Input() dismissible = false;
  /** Nombre accesible de la acción de cierre cuando `dismissible` es true. */
  @Input() dismissLabel = 'Cerrar spotlight';

  @Output() readonly primaryAction = new EventEmitter<void>();
  @Output() readonly secondaryAction = new EventEmitter<void>();
  @Output() readonly dismissed = new EventEmitter<void>();

  @HostListener('document:keydown', ['$event'])
  protected onDocumentKeydown(event: KeyboardEvent): void {
    if (this.isVisible && this.dismissible && event.key === 'Escape') {
      event.preventDefault();
      this.dismissed.emit();
    }
  }
}
