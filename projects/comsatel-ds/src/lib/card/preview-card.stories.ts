import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { PreviewCard } from './preview-card';
import { Icon } from '../icons/icon';

const meta: Meta<PreviewCard> = {
  title: 'Componentes/Card/PreviewCard',
  component: PreviewCard,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [Icon] })],
  args: {
    name: 'Proyecto sin nombre',
    showLogo: false,
    showImage: false,
  },
  render: (args) => ({
    props: args,
    template: `<div style="width: 240px;"><cs-preview-card [name]="name" [showLogo]="showLogo" [showImage]="showImage"></cs-preview-card></div>`,
  }),
};

export default meta;
type Story = StoryObj<PreviewCard>;

export const Placeholder: Story = {};

export const WithLogo: Story = {
  args: { showLogo: true, name: 'Design system tokens.fig' },
  render: (args) => ({
    props: args,
    template: `<div style="width: 240px;"><cs-preview-card [name]="name" [showLogo]="true"><cs-icon logo name="file-text" [size]="16"></cs-icon></cs-preview-card></div>`,
  }),
};

export const WithLogoAndImage: Story = {
  args: { showLogo: true, showImage: true, name: 'Homepage cover.png' },
  render: (args) => ({
    props: args,
    template: `<div style="width: 240px;"><cs-preview-card [name]="name" [showLogo]="true" [showImage]="true"><cs-icon logo name="file-text" [size]="16"></cs-icon><div image style="width: 100%; height: 100%; background: linear-gradient(135deg, var(--color-background-brand-default), var(--color-background-brand-subtle));"></div></cs-preview-card></div>`,
  }),
};
