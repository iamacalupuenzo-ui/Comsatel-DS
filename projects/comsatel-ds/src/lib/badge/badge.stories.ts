import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Badge } from './badge';
import { Icon } from '../icons/icon';

// Badge usa <ng-content> para la etiqueta (no un @Input) — por eso cada
// story define su propio `template` en vez de dejar que Storybook infiera
// el markup solo desde los args.
const meta: Meta<Badge> = {
  title: 'Componentes/Badge',
  component: Badge,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [Icon] })],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'neutral', 'brand', 'success', 'warning', 'danger',
        'neutral-solid', 'brand-solid', 'success-solid', 'warning-solid', 'danger-solid',
        'outline',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
  args: {
    variant: 'neutral',
    size: 'md',
    pill: false,
  },
  render: (args) => ({
    props: args,
    template: `<cs-badge [variant]="variant" [size]="size" [pill]="pill">Etiqueta</cs-badge>`,
  }),
};

export default meta;
type Story = StoryObj<Badge>;

export const Neutral: Story = {};

export const Brand: Story = {
  args: { variant: 'brand' },
};

export const Success: Story = {
  args: { variant: 'success' },
};

export const Danger: Story = {
  args: { variant: 'danger' },
};

export const Pill: Story = {
  args: { pill: true },
};

export const WithIcon: Story = {
  render: () => ({
    template: `<cs-badge variant="brand"><cs-icon name="star" [size]="12"></cs-icon>Destacado</cs-badge>`,
  }),
};

export const WithIconAllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        <cs-badge variant="brand"><cs-icon name="star" [size]="12"></cs-icon>Destacado</cs-badge>
        <cs-badge variant="success"><cs-icon name="circle-check" [size]="12"></cs-icon>Verificado</cs-badge>
        <cs-badge variant="warning"><cs-icon name="alert-triangle" [size]="12"></cs-icon>Revisión</cs-badge>
        <cs-badge variant="danger"><cs-icon name="circle-alert" [size]="12"></cs-icon>Error</cs-badge>
        <cs-badge variant="neutral">Borrador<cs-icon name="x" [size]="12"></cs-icon></cs-badge>
      </div>
    `,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        <cs-badge variant="neutral">Neutral</cs-badge>
        <cs-badge variant="brand">Brand</cs-badge>
        <cs-badge variant="success">Success</cs-badge>
        <cs-badge variant="warning">Warning</cs-badge>
        <cs-badge variant="danger">Danger</cs-badge>
        <cs-badge variant="neutral-solid">Neutral solid</cs-badge>
        <cs-badge variant="brand-solid">Brand solid</cs-badge>
        <cs-badge variant="success-solid">Success solid</cs-badge>
        <cs-badge variant="warning-solid">Warning solid</cs-badge>
        <cs-badge variant="danger-solid">Danger solid</cs-badge>
        <cs-badge variant="outline">Outline</cs-badge>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 8px;">
        <cs-badge variant="brand" size="sm">sm</cs-badge>
        <cs-badge variant="brand" size="md">md</cs-badge>
        <cs-badge variant="brand" size="lg">lg</cs-badge>
      </div>
    `,
  }),
};
