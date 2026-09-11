import { Component, Input } from '@angular/core';
import { Icon, type IconName } from 'comsatel-ds';

export type VehicleStatus = 'active' | 'stopped' | 'offline';
export type VehicleType = 'car' | 'motorcycle' | 'truck' | 'bus' | 'machinery';
export type MarkerVisualState = 'default' | 'hover' | 'active';

// Coincide 1:1 con los tipos que soporta el generador real de íconos de
// marcador en C-Locater: car/motorcycle/truck/bus son los que aparecen hoy
// en los datos de muestra; machinery es una categoría real para flotas de
// maquinaria pesada, soportada pero sin datos de ejemplo todavía.
const VEHICLE_ICON: Record<VehicleType, IconName> = {
  car: 'car',
  motorcycle: 'bike',
  truck: 'truck',
  bus: 'bus',
  machinery: 'tractor',
};

interface IconTier {
  circleVar: string;
  iconPx: number;
  dotPx: number;
}

const ICON_TIER: Record<'sm' | 'base', IconTier> = {
  sm: { circleVar: 'var(--layout-size-sm)', iconPx: 16, dotPx: 9 },
  base: { circleVar: 'var(--layout-size-base)', iconPx: 20, dotPx: 11 },
};

/** Pill colapsada de vehículo: ícono + nombre + placa, con vástago apuntando
 * al punto exacto sobre el mapa. No es un componente Leaflet ni un
 * componente de la librería comsatel-ds — es el rediseño de referencia que
 * documenta esta página (ver intro), igual que en React: Leaflet pinta el
 * pin real con divIcon a partir de un string de HTML, no con este
 * componente. El vástago va centrado en el pill completo (stemX 50%), no en
 * el ícono: marca dónde está el marcador como objeto entero sobre el mapa,
 * no dónde está específicamente el glifo dentro de él. */
@Component({
  selector: 'app-vehicle-pill',
  standalone: true,
  imports: [Icon],
  templateUrl: './vehicle-pill.html',
  styleUrl: './vehicle-pill.css',
})
export class VehiclePill {
  @Input({ required: true }) status!: VehicleStatus;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) plate!: string;
  @Input() alarm = false;
  @Input() iconTier: 'sm' | 'base' = 'sm';
  @Input() visualState?: MarkerVisualState;
  @Input() selected = false;
  @Input() vehicleType: VehicleType = 'car';

  protected get tier(): IconTier {
    return ICON_TIER[this.iconTier];
  }

  protected get vehicleIcon(): IconName {
    return VEHICLE_ICON[this.vehicleType];
  }

  protected get dotColorVar(): string {
    return `var(--color-map-vehicle-${this.status})`;
  }

  protected get interactive(): boolean {
    return !this.visualState && !this.selected;
  }
}
