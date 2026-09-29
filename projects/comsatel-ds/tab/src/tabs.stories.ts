import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { Tab } from './tab';
import { Tabs } from './tabs';

const meta: Meta<Tabs> = {
  title: 'Componentes/Tabs',
  component: Tabs,
  decorators: [moduleMetadata({ imports: [Tabs, Tab] })],
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['line', 'pill'] },
  },
  args: { variant: 'line', defaultValue: 'overview' },
  render: (args) => ({
    props: args,
    template: `
      <cs-tabs [variant]="variant" [defaultValue]="defaultValue">
        <cs-tab value="overview" label="Overview"><p>Contenido general.</p></cs-tab>
        <cs-tab value="details" label="Details"><p>Detalles del registro.</p></cs-tab>
        <cs-tab value="settings" label="Settings"><p>Configuración.</p></cs-tab>
      </cs-tabs>
    `,
  }),
};

export default meta;
type Story = StoryObj<Tabs>;

export const Default: Story = {};

export const Pill: Story = { args: { variant: 'pill' } };

export const Disabled: Story = {
  render: (args) => ({
    props: args,
    template: `
      <cs-tabs [variant]="variant" [defaultValue]="defaultValue">
        <cs-tab value="active" label="Active"><p>Contenido activo.</p></cs-tab>
        <cs-tab value="disabled" label="Disabled" [disabled]="true"></cs-tab>
        <cs-tab value="other" label="Also active"><p>Otro contenido.</p></cs-tab>
      </cs-tabs>
    `,
  }),
};
