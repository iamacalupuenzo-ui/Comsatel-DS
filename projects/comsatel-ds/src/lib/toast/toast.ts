import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Icon } from '@iamacalupuenzo-ui/comsatel-ds/icons';
import type { IconName } from '@iamacalupuenzo-ui/comsatel-ds/icons';

export type ToastVariant = 'default' | 'info' | 'success' | 'warning' | 'error';
/** `solid`: fondo del tono y texto claro. `subtle`: fondo claro con borde y texto del tono. */
export type ToastAppearance = 'solid' | 'subtle';

export interface ToastAction {
  label: string;
  href?: string;
}

interface VariantConfig {
  icon: IconName;
  dismissible: boolean;
}

// default: fondo de superficie, borde sutil, ícono neutro — para
// confirmaciones/acknowledgments de bajo énfasis. Los tonos (info/success/
// warning/error) usan fondo sólido y NO llevan botón de cerrar: exigen que
// la persona resuelva con una acción directa en vez de descartarlo sin
// leerlo. Mismo criterio que ya usa Badge para sus variantes -solid.
const VARIANT_CONFIG: Record<ToastVariant, VariantConfig> = {
  default: { icon: 'info', dismissible: true },
  info: { icon: 'info', dismissible: false },
  success: { icon: 'circle-check', dismissible: false },
  warning: { icon: 'alert-triangle', dismissible: false },
  error: { icon: 'alert-triangle', dismissible: false },
};

/**
 * Componente puramente visual — sin cola ni auto-cierre por temporizador.
 * Encolar, apilar (máximo N visibles) y programar el cierre automático por
 * variante es responsabilidad del CONSUMIDOR (un servicio/store propio de
 * cada producto), no de este componente — mismo criterio que React (ni
 * siquiera su propia página de documentación arma una cola real, cada
 * demo es estático). Ver accessibility-patterns.md sección 8.
 */
@Component({
  selector: 'cs-toast',
  imports: [Icon],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
  host: {
    role: 'status',
    'aria-live': 'polite',
    'aria-atomic': 'true',
    '[attr.data-variant]': 'variant',
    '[attr.data-appearance]': 'appearance',
  },
})
export class Toast {
  @Input({ required: true }) title!: string;
  @Input() description?: string;
  @Input() variant: ToastVariant = 'default';
  @Input() icon?: IconName;
  @Input() actions?: ToastAction[];
  @Input() dismissLabel = 'Descartar';
  /** Solo aplica a los tonos; `default` siempre usa la superficie. */
  @Input() appearance: ToastAppearance = 'solid';
  /** Fuerza mostrar u ocultar «Descartar». Sin valor, sigue la regla de la variante:
   * solo `default` se descarta. Úsalo en avisos que además se cierran solos. */
  @Input() dismissible?: boolean;
  @Output() readonly actionClick = new EventEmitter<ToastAction>();
  @Output() readonly dismissed = new EventEmitter<void>();

  protected get config(): VariantConfig {
    return VARIANT_CONFIG[this.variant];
  }

  protected get resolvedIcon(): IconName {
    return this.icon ?? this.config.icon;
  }

  protected get showDismiss(): boolean {
    return this.dismissible ?? this.config.dismissible;
  }

  protected onActionClick(action: ToastAction): void {
    if (!action.href) this.actionClick.emit(action);
  }
}
