import type { Meta, StoryObj } from '@storybook/angular';
import { Button } from './button';

// Button usa <ng-content> para la etiqueta (no un @Input) — por eso cada
// story define su propio `template` en vez de dejar que Storybook infiera
// el markup solo desde los args.
const meta: Meta<Button> = {
  title: 'Componentes/Button',
  component: Button,
  tags: ['autodocs'],
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
