import type { Meta, StoryObj } from '@storybook/angular';
import { DateTimePicker } from './datetime-picker';

const meta: Meta<DateTimePicker> = {
  title: 'Componentes/DateTimePicker',
  component: DateTimePicker,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    size: 'md',
    disabled: false,
    invalid: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj<DateTimePicker>;

export const Default: Story = {};

export const WithDefaultValue: Story = {
  args: { defaultValue: '2026-09-15T14:30' },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: '2026-09-15T14:30' },
};

export const Invalid: Story = {
  args: { invalid: true, errorText: 'Selecciona una fecha y hora válidas.' },
};

export const WithHelperText: Story = {
  args: { helperText: 'Usa el formato dd/mm/aaaa.' },
};

export const AllSizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 16px;">
        <cs-datetime-picker size="sm" defaultValue="2026-09-15T09:00"></cs-datetime-picker>
        <cs-datetime-picker size="md" defaultValue="2026-09-15T09:00"></cs-datetime-picker>
        <cs-datetime-picker size="lg" defaultValue="2026-09-15T09:00"></cs-datetime-picker>
      </div>
    `,
  }),
};
