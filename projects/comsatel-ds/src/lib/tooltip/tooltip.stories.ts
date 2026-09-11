import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Tooltip } from './tooltip';
import { Button } from '../button/button';
import { Icon } from '../icons/icon';

// Tooltip usa <ng-content> para el elemento disparador (no un @Input) —
// por eso cada story define su propio `template`. La visibilidad del
// popup es CSS puro vía :host(:hover)/:host(:focus-within), así que en
// las capturas estáticas el popup aparece oculto salvo que el mouse esté
// encima al tomar el screenshot.
const meta: Meta<Tooltip> = {
  title: 'Componentes/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [Button, Icon] })],
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
    },
  },
  args: {
    content: 'Helpful text',
    side: 'top',
    arrow: true,
  },
  render: (args) => ({
    props: args,
    template: `<cs-tooltip [content]="content" [side]="side" [arrow]="arrow"><cs-button variant="secondary">Hover here</cs-button></cs-tooltip>`,
  }),
};

export default meta;
type Story = StoryObj<Tooltip>;

export const Top: Story = {};

export const Bottom: Story = {
  args: { side: 'bottom' },
};

export const Left: Story = {
  args: { side: 'left' },
};

export const Right: Story = {
  args: { side: 'right' },
};

export const WithoutArrow: Story = {
  args: { arrow: false },
};

export const OnIconButton: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: var(--layout-gap-xl);">
        <cs-tooltip content="Copy"><cs-button variant="tertiary" aria-label="Copy"><cs-icon name="copy" [size]="16"></cs-icon></cs-button></cs-tooltip>
        <cs-tooltip content="Delete" side="bottom"><cs-button variant="tertiary" aria-label="Delete"><cs-icon name="x" [size]="16"></cs-icon></cs-button></cs-tooltip>
        <cs-tooltip content="Settings" side="right"><cs-button variant="tertiary" aria-label="Settings"><cs-icon name="sliders" [size]="16"></cs-icon></cs-button></cs-tooltip>
      </div>
    `,
  }),
};

export const AllSides: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: var(--layout-gap-6xl); padding: var(--layout-padding-6xl);">
        <cs-tooltip content="Side: top" side="top"><cs-button variant="secondary">top</cs-button></cs-tooltip>
        <cs-tooltip content="Side: bottom" side="bottom"><cs-button variant="secondary">bottom</cs-button></cs-tooltip>
        <cs-tooltip content="Side: left" side="left"><cs-button variant="secondary">left</cs-button></cs-tooltip>
        <cs-tooltip content="Side: right" side="right"><cs-button variant="secondary">right</cs-button></cs-tooltip>
      </div>
    `,
  }),
};
