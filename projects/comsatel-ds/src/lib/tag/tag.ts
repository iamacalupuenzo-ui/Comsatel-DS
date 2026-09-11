import { Component, Input } from '@angular/core';
import { Badge, type BadgeSize, type BadgeVariant } from '../badge/badge';
import { Icon } from '../icons/icon';
import type { IconName } from '../icons/icon-registry';

/** Severidades semánticas del tag. El componente no es interactivo. */
export type TagSeverity = 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'danger' | 'contrast';

/** Tamaño compartido con Badge para conservar una sola escala visual. */
export type TagSize = BadgeSize;

@Component({
  selector: 'cs-tag',
  imports: [Badge, Icon],
  templateUrl: './tag.html',
  styleUrl: './tag.css',
})
export class Tag {
  /** Texto visible que categoriza el contenido. */
  @Input({ required: true }) value = '';
  /** Color semántico; no debe ser la única señal del estado. */
  @Input() severity: TagSeverity = 'primary';
  /** Escala visual del tag. */
  @Input() size: TagSize = 'md';
  /** Aplica radio completo para estados compactos. */
  @Input() rounded = false;
  /** Ícono decorativo del registro curado; el texto sigue siendo obligatorio. */
  @Input() icon: IconName | null = null;
  /** Nombre accesible opcional para reemplazar el texto visible anunciado. */
  @Input('aria-label') ariaLabel: string | null = null;
  /** Anuncia cambios cuando el tag representa un estado dinámico. */
  @Input('aria-live') ariaLive: 'off' | 'polite' | 'assertive' | null = null;

  protected get badgeVariant(): BadgeVariant {
    switch (this.severity) {
      case 'secondary': return 'neutral';
      case 'success': return 'success';
      case 'info': return 'brand';
      case 'warn': return 'warning';
      case 'danger': return 'danger';
      case 'contrast': return 'neutral-solid';
      default: return 'brand';
    }
  }

  protected get iconSize(): number {
    return this.size === 'sm' ? 10 : this.size === 'lg' ? 14 : 12;
  }
}
