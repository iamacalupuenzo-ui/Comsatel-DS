import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { MapNotification } from './map-notification';
import { MapPanel } from './map-panel';
import { MapSearch } from './map-search';

const minutesAgo = (m: number) => new Date(Date.now() - m * 60_000);
// El panel flota sobre el mapa: la historia le da un lienzo con alto fijo.
const stage = (inner: string) => `<div style="position: relative; height: 420px; background: var(--color-background-neutral-subtlest)">${inner}</div>`;

const meta: Meta<MapPanel> = {
  title: 'Mapa/MapPanel',
  component: MapPanel,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [MapNotification, MapSearch] })],
  args: { label: 'Notificaciones de unidades', title: 'Notificaciones', icon: 'bell', badge: 2, badgeDescription: '2 notificaciones pendientes', listLabel: 'Lista de notificaciones', open: true },
  render: (args) => ({
    props: { ...args, first: minutesAgo(0), second: minutesAgo(8) },
    template: stage(`
      <cs-map-panel style="position: absolute; top: 16px; bottom: 16px; right: 16px" [label]="label" [title]="title" [icon]="icon" [badge]="badge" [badgeDescription]="badgeDescription" [listLabel]="listLabel" [(open)]="open">
        <cs-map-notification eventLabel="Retomó movimiento" unitName="Camión Norte 04" unitCode="ABC-123" [time]="first" [unread]="true" />
        <cs-map-notification eventLabel="Retomó movimiento" unitName="Furgón Sur 12" unitCode="GHI-789" [time]="second" [count]="3" />
      </cs-map-panel>`),
  }),
};

export default meta;
type Story = StoryObj<MapPanel>;

export const Notifications: Story = {};
export const Collapsed: Story = { args: { open: false } };
export const Empty: Story = {
  args: { badge: null },
  render: (args) => ({
    props: args,
    template: stage(`<cs-map-panel style="position: absolute; top: 16px; bottom: 16px; right: 16px" [label]="label" [title]="title" [icon]="icon" [(open)]="open"><p style="margin: 0">Sin notificaciones</p></cs-map-panel>`),
  }),
};
export const Search: Story = {
  render: () => ({
    template: stage(`
      <cs-map-search style="position: absolute; top: 16px; bottom: 16px; left: 16px" [filterCount]="1" filterDescription="1 filtro activo: Con señal">
        <div role="listitem" style="padding: 12px 16px; border-radius: 8px; background: var(--elevation-surface-default)">ABC-123</div>
        <div role="listitem" style="padding: 12px 16px; border-radius: 8px; background: var(--elevation-surface-default)">PQR-678</div>
      </cs-map-search>`),
  }),
};
