import { Component, computed, signal } from '@angular/core';
import { Icon } from 'comsatel-ds';
import { CodeBlock } from '../../shared/docs/code-block';
import { DemoShell, type ControlDef, type DemoState } from '../../shared/docs/demo-shell';
import { VehiclePill, type VehicleStatus, type VehicleType, type MarkerVisualState } from './vehicle-pill';
import { GpsCompact } from './gps-compact';
import { GpsFull } from './gps-full';
import { ClusterBadge } from './cluster-badge';

const VEHICLE_TYPES: VehicleType[] = ['car', 'motorcycle', 'truck', 'bus', 'machinery'];
const STATUSES: VehicleStatus[] = ['active', 'stopped', 'offline'];
const VISUAL_STATES: MarkerVisualState[] = ['default', 'hover', 'active'];

const HOVER_CODE = `.marker-pill {
  background: var(--elevation-surface-default);
  box-shadow: var(--shadow-md);
}
.marker-pill:hover {
  background: var(--color-background-neutral-subtle);
  box-shadow: var(--shadow-lg);
}`;

@Component({
  selector: 'app-markers-page',
  imports: [Icon, CodeBlock, DemoShell, VehiclePill, GpsCompact, GpsFull, ClusterBadge],
  templateUrl: './markers-page.html',
  styleUrl: './markers-page.css',
})
export class MarkersPage {
  protected readonly hoverCode = HOVER_CODE;

  /* Playground */
  protected readonly playgroundControls: ControlDef[] = [
    { kind: 'select', label: 'Estado', key: 'status', options: STATUSES, default: 'active' },
    { kind: 'select', label: 'Tipo de unidad', key: 'vehicleType', options: VEHICLE_TYPES, default: 'car' },
    { kind: 'toggle', label: 'Alarma', key: 'alarm', default: false },
    { kind: 'toggle', label: 'Seleccionado', key: 'selected', default: false },
    { kind: 'select', label: 'Estado visual', key: 'visualState', options: VISUAL_STATES, default: 'default' },
  ];
  protected readonly pgStatus = signal<VehicleStatus>('active');
  protected readonly pgVehicleType = signal<VehicleType>('car');
  protected readonly pgAlarm = signal(false);
  protected readonly pgSelected = signal(false);
  protected readonly pgVisualState = signal<MarkerVisualState>('default');

  protected onPlaygroundState(s: DemoState): void {
    if (s['status']) this.pgStatus.set(s['status'] as VehicleStatus);
    if (s['vehicleType']) this.pgVehicleType.set(s['vehicleType'] as VehicleType);
    if (s['alarm'] !== undefined) this.pgAlarm.set(s['alarm'] as boolean);
    if (s['selected'] !== undefined) this.pgSelected.set(s['selected'] as boolean);
    if (s['visualState']) this.pgVisualState.set(s['visualState'] as MarkerVisualState);
  }

  protected readonly pgVisualStateInput = computed<MarkerVisualState | undefined>(() =>
    this.pgVisualState() === 'default' ? undefined : this.pgVisualState(),
  );

  protected readonly pgCode = computed(() => {
    const typeProp = this.pgVehicleType() !== 'car' ? `\n  vehicleType: '${this.pgVehicleType()}',` : '';
    const alarmProp = this.pgAlarm() ? `\n  hasAlarm: true,` : '';
    const selectedProp = this.pgSelected() ? `\n  selected: true,` : '';
    const stateComment = this.pgVisualState() !== 'default' ? ` // estado visual: ${this.pgVisualState()} (CSS :${this.pgVisualState()}, no una prop)` : '';
    return (
      `createVehicleMarker({\n` +
      `  status: '${this.pgStatus()}',\n` +
      `  name: 'V-204',\n` +
      `  plate: 'ABC-204',${typeProp}${alarmProp}${selectedProp}\n` +
      `});${stateComment}`
    );
  });
}
