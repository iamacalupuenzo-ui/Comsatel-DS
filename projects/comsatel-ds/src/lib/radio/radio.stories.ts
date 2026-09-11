import { moduleMetadata } from '@storybook/angular';
import type { Meta, StoryObj } from '@storybook/angular';
import { Radio } from './radio';
import { RadioGroup } from './radio-group';

const meta: Meta<Radio> = {
  title: 'Componentes/Radio',
  component: Radio,
  decorators: [moduleMetadata({ imports: [Radio, RadioGroup] })],
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
  args: {
    value: 'monthly',
    label: 'Mensual',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<Radio>;

export const Default: Story = {
  render: (args) => ({
    props: args,
    template: `
      <cs-radio-group defaultValue="monthly">
        <cs-radio [value]="value" [label]="label" [size]="size" [disabled]="disabled"></cs-radio>
        <cs-radio value="annual" label="Anual" [size]="size"></cs-radio>
      </cs-radio-group>
    `,
  }),
};

export const WithDescription: Story = {
  args: {
    label: 'Plan Pro',
    description: 'Proyectos ilimitados y soporte prioritario.',
  },
  render: (args) => ({
    props: args,
    template: `
      <cs-radio-group defaultValue="pro">
        <cs-radio [value]="value" [label]="label" [description]="description" [size]="size"></cs-radio>
      </cs-radio-group>
    `,
  }),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => ({
    props: args,
    template: `
      <cs-radio-group defaultValue="monthly" [disabled]="disabled">
        <cs-radio value="monthly" label="Mensual" [size]="size"></cs-radio>
        <cs-radio value="annual" label="Anual" [size]="size"></cs-radio>
      </cs-radio-group>
    `,
  }),
};
