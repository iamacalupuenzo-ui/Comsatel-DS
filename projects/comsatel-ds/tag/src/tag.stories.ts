import type { Meta, StoryObj } from '@storybook/angular';
import { Tag } from './tag';

const meta: Meta<Tag> = {
  title: 'Componentes/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'info', 'warn', 'danger', 'contrast'],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    rounded: { control: 'boolean' },
    icon: { control: 'select', options: [null, 'tag', 'circle-check', 'alert-triangle', 'circle-alert'] },
  },
  args: {
    value: 'Nueva etiqueta',
    severity: 'primary',
    size: 'md',
    rounded: true,
    icon: 'tag',
  },
};

export default meta;
type Story = StoryObj<Tag>;

export const Primary: Story = {};

export const Success: Story = {
  args: { severity: 'success', value: 'Verificado', icon: 'circle-check' },
};

export const Warning: Story = {
  args: { severity: 'warn', value: 'Revisión', icon: 'alert-triangle' },
};

export const Danger: Story = {
  args: { severity: 'danger', value: 'Error', icon: 'circle-alert' },
};

export const AllSeverities: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px;">
        <cs-tag value="Principal" />
        <cs-tag severity="secondary" value="Secundario" />
        <cs-tag severity="success" value="Completado" />
        <cs-tag severity="info" value="Información" />
        <cs-tag severity="warn" value="Advertencia" />
        <cs-tag severity="danger" value="Error" />
        <cs-tag severity="contrast" value="Contraste" />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px;">
        <cs-tag size="sm" value="Small" />
        <cs-tag size="md" value="Medium" />
        <cs-tag size="lg" value="Large" />
      </div>
    `,
  }),
};
