import type { Meta, StoryObj } from '@storybook/angular';
import { InputDropdown } from './input-dropdown';

const OPTIONS = [
  { label: 'Peru', value: 'pe' },
  { label: 'Colombia', value: 'co' },
  { label: 'Argentina', value: 'ar' },
  { label: 'Mexico', value: 'mx' },
];

const meta: Meta<InputDropdown> = {
  title: 'Componentes/Dropdown/InputDropdown',
  component: InputDropdown,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
  },
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: OPTIONS,
    size: 'md',
    disabled: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj<InputDropdown>;

export const Empty: Story = {};

export const WithValue: Story = {
  args: { value: 'pe' },
};

export const Disabled: Story = {
  args: { value: 'pe', disabled: true },
};

export const SecondaryBounded: Story = {
  args: {
    label: 'Ubicación', surface: 'secondary', fullWidth: true, matchTriggerWidth: true,
    value: 'long', options: [
      { label: 'Todas', value: 'all' },
      { label: 'Unidades sin ubicación durante los últimos treinta días', value: 'long' },
      { label: 'Integración pendiente', value: 'disabled', disabled: true },
    ],
  },
  render: args => ({ props: args, template: `
    <div style="width: min(100%, calc(var(--layout-size-lg) * 6));">
      <cs-input-dropdown [label]="label" [options]="options" [value]="value" (valueChange)="value = $event"
        [surface]="surface" [fullWidth]="fullWidth" [matchTriggerWidth]="matchTriggerWidth" />
    </div>`,
  }),
};

export const AllSizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; width: 220px;">
        <cs-input-dropdown size="xs" label="xs" [options]="options" value="pe"></cs-input-dropdown>
        <cs-input-dropdown size="sm" label="sm" [options]="options" value="pe"></cs-input-dropdown>
        <cs-input-dropdown size="md" label="md" [options]="options" value="pe"></cs-input-dropdown>
        <cs-input-dropdown size="lg" label="lg" [options]="options" value="pe"></cs-input-dropdown>
      </div>
    `,
  }),
};
