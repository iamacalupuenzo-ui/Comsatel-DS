import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Button } from './button';
import { Icon } from '../icons/icon';

// Button usa <ng-content> para la etiqueta (no un @Input) — por eso cada
// story define su propio `template` en vez de dejar que Storybook infiera
// el markup solo desde los args.
const meta: Meta<Button> = {
  title: 'Componentes/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [Icon] })],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'default', 'tertiary', 'subtle', 'link', 'destructive', 'success', 'warning'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
    },
  },
  args: {
    variant: 'primary',
    size: 'sm',
    loading: false,
    selected: false,
    disabled: false,
    fullWidth: false,
  },
  render: (args) => ({
    props: args,
    template: `<cs-button [variant]="variant" [size]="size" [loading]="loading" [selected]="selected" [disabled]="disabled" [fullWidth]="fullWidth">Etiqueta del botón</cs-button>`,
  }),
};

export default meta;
type Story = StoryObj<Button>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Destructive: Story = {
  args: { variant: 'destructive' },
};

export const Loading: Story = {
  args: { loading: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Selected: Story = {
  args: { variant: 'default', selected: true },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  render: (args) => ({
    props: args,
    template: `<div style="width: 320px;"><cs-button [variant]="variant" [size]="size" [fullWidth]="fullWidth">Botón de ancho completo</cs-button></div>`,
  }),
};

export const WithLeadingIcon: Story = {
  render: () => ({
    template: `<cs-button variant="primary"><cs-icon name="star" [size]="14"></cs-icon> Ícono antes</cs-button>`,
  }),
};

export const WithTrailingIcon: Story = {
  render: () => ({
    template: `<cs-button variant="primary">Ícono después <cs-icon name="chevron-right" [size]="14"></cs-icon></cs-button>`,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        <cs-button variant="primary">Primary</cs-button>
        <cs-button variant="secondary">Secondary</cs-button>
        <cs-button variant="default">Default</cs-button>
        <cs-button variant="tertiary">Tertiary</cs-button>
        <cs-button variant="subtle">Subtle</cs-button>
        <cs-button variant="link">Link</cs-button>
        <cs-button variant="destructive">Destructive</cs-button>
        <cs-button variant="success">Success</cs-button>
        <cs-button variant="warning">Warning</cs-button>
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 8px;">
        <cs-button variant="primary" size="xs">xs</cs-button>
        <cs-button variant="primary" size="sm">sm</cs-button>
        <cs-button variant="primary" size="md">md</cs-button>
        <cs-button variant="primary" size="lg">lg</cs-button>
      </div>
    `,
  }),
};

export const IconsMixed: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        <cs-button variant="primary"><cs-icon name="plus" [size]="14"></cs-icon> Agregar ítem</cs-button>
        <cs-button variant="primary">Descargar <cs-icon name="download" [size]="14"></cs-icon></cs-button>
        <cs-button variant="default">Siguiente <cs-icon name="chevron-right" [size]="14"></cs-icon></cs-button>
        <cs-button variant="destructive"><cs-icon name="trash-2" [size]="14"></cs-icon> Eliminar</cs-button>
      </div>
    `,
  }),
};
