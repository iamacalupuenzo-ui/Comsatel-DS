import { Component, Input } from '@angular/core';

/** Insignia de cluster: agrupa dos o más marcadores muy cercanos con un
 * conteo. Cluster de unidades (unit definido) vs. cluster de GPS (sin
 * unit) usan colores distintos: el de unidades usa el navy de marca (no
 * pertenece a ninguna familia de tipo-de-dispositivo ni de estado, porque
 * mezcla varios tipos). */
@Component({
  selector: 'app-cluster-badge',
  standalone: true,
  templateUrl: './cluster-badge.html',
  styleUrl: './cluster-badge.css',
})
export class ClusterBadge {
  @Input({ required: true }) count!: number;
  @Input() unit?: string;
  @Input() alarm = false;

  protected get bgVar(): string {
    if (this.alarm) return 'var(--color-map-alarm)';
    return this.unit ? 'var(--color-background-brand-default)' : 'var(--color-map-gps-svr-x)';
  }

  protected get sizeVar(): string {
    return this.unit ? 'var(--layout-size-md)' : 'var(--layout-size-base)';
  }
}
