import type { Meta, StoryObj } from '@storybook/angular';
import { MapTabs } from './map-tabs';

const meta: Meta<MapTabs> = {
  title: 'Mapa/MapTabs',
  component: MapTabs,
  tags: ['autodocs'],
  args: {
    active: 'follow:1',
    tabs: [
      { id: 'map', label: 'Mapa', icon: 'map' },
      { id: 'follow:1', label: 'Seguimiento 1', icon: 'eye', count: 3, closable: true, renamable: true },
      { id: 'bitacora:GHI-789', label: 'GHI-789', icon: 'file-text', closable: true, description: 'Bitácora de GHI-789' },
      { id: 'recovery:PQR-678', label: 'Recupero · PQR-678', icon: 'locate-fixed', closable: true, description: 'Recupero de PQR-678' },
    ],
  },
};

export default meta;
type Story = StoryObj<MapTabs>;

export const Default: Story = {};
export const MapOnlyAndOne: Story = { args: { active: 'map', tabs: [{ id: 'map', label: 'Mapa', icon: 'map' }, { id: 'bitacora:ABC-123', label: 'ABC-123', icon: 'file-text', closable: true, description: 'Bitácora de ABC-123' }] } };
