import { Component, Input } from '@angular/core';

export type SkeletonVariant = 'text' | 'rectangle' | 'circle';

const RADIUS_BY_VARIANT: Record<SkeletonVariant, string> = {
  text: 'var(--radius-sm)',
  rectangle: 'var(--radius-md)',
  circle: 'var(--radius-full)',
};

// 12px es la altura de la línea de placeholder usada por la referencia React.
// No existe un token de tamaño equivalente: reemplazarla por el token de 16px
// alteraría la forma y la densidad de cada consumidor (especialmente Table).
const DEFAULT_HEIGHT_BY_VARIANT: Record<SkeletonVariant, number> = {
  text: 12,
  rectangle: 80,
  circle: 32,
};

/**
 * Único primitivo de carga del sistema: cualquier lugar que espera datos
 * (tabla, árbol, tarjeta, lista) dibuja Skeleton en vez de un spinner o un
 * mensaje de "cargando..." — un spinner solo comunica "algo está pasando",
 * un skeleton además anticipa la forma real del contenido, así la pantalla
 * no "salta" cuando los datos llegan. Sin página de documentación propia
 * (tampoco la tiene en React) — es un primitivo interno que otros
 * componentes (Table) consumen, no algo que un producto use suelto.
 */
@Component({
  selector: 'cs-skeleton',
  template: '',
  host: {
    'aria-hidden': 'true',
    class: 'cs-skeleton',
    '[style.width]': 'resolvedWidth',
    '[style.height]': 'resolvedHeight',
    '[style.border-radius]': 'radius',
  },
  styleUrl: './skeleton.css',
})
export class Skeleton {
  @Input() width?: string | number;
  @Input() height?: string | number;
  @Input() variant: SkeletonVariant = 'text';

  protected get radius(): string {
    return RADIUS_BY_VARIANT[this.variant];
  }

  protected get defaultHeight(): number {
    return DEFAULT_HEIGHT_BY_VARIANT[this.variant];
  }

  protected get resolvedWidth(): string {
    if (this.width !== undefined) return typeof this.width === 'number' ? `${this.width}px` : this.width;
    return this.variant === 'circle' ? `${this.defaultHeight}px` : '100%';
  }

  protected get resolvedHeight(): string {
    if (this.height !== undefined) return typeof this.height === 'number' ? `${this.height}px` : this.height;
    return `${this.defaultHeight}px`;
  }
}
