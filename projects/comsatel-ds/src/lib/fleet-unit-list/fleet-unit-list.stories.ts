import type { Meta, StoryObj } from '@storybook/angular';
import { FleetUnitList, type FleetUnit } from './fleet-unit-list';

const UNITS: FleetUnit[] = [
  { id: 'norte-04', name: 'Camión Norte 04', status: 'active', statusLabel: 'Activo', lastSeen: 'Reportando · hace 2 min', speed: '62 km/h', battery: '88%', location: 'Av. Argentina, Callao', diagnostics: 'Sin alertas' },
  { id: 'norte-07', name: 'Camión Norte 07', status: 'stopped', statusLabel: 'Detenido', lastSeen: 'Detenido · hace 14 min', speed: '0 km/h', battery: '54%', location: 'Terminal Norte, Lima', diagnostics: 'Motor detenido' },
  { id: 'sur-12', name: 'Furgón Sur 12', status: 'offline', statusLabel: 'Sin señal', lastSeen: 'Sin señal · hace 3 h', speed: '—', battery: '12%', location: 'Última ubicación: Av. Faucett', diagnostics: 'Sin diagnóstico', alert: 'La unidad no ha reportado señal recientemente.' },
];

const meta: Meta<FleetUnitList> = {
  title: 'Organismos/FleetUnitList',
  component: FleetUnitList,
  tags: ['autodocs'],
  args: { units: UNITS, defaultExpandedIds: ['norte-04'], type: 'single' },
};

export default meta;
type Story = StoryObj<FleetUnitList>;

export const Default: Story = {};
export const Multiple: Story = { args: { type: 'multiple', defaultExpandedIds: ['norte-04', 'norte-07'] } };
