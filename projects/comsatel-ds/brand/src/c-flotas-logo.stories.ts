import type { Meta, StoryObj } from '@storybook/angular';
import { CFlotasLogo } from './c-locater-flotas-logo';

const meta: Meta<CFlotasLogo> = {
  title: 'Fundamentos/C-Flotas logo',
  component: CFlotasLogo,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['wordmark', 'isotype'] },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', '2xl'] },
    fit: { control: 'select', options: ['content', 'container'] },
  },
  args: { variant: 'wordmark', size: 'md', fit: 'content', decorative: false },
  render: (args) => ({
    props: args,
    template: '<cs-c-flotas-logo [variant]="variant" [size]="size" [fit]="fit" [decorative]="decorative" />',
  }),
};

export default meta;
type Story = StoryObj<CFlotasLogo>;

export const Wordmark: Story = {};
export const Isotype: Story = { args: { variant: 'isotype', size: '2xl' } };
export const WordmarkInContainer: Story = {
  args: { fit: 'container' },
  render: (args) => ({
    props: args,
    template: '<div style="width: 320px;"><cs-c-flotas-logo [variant]="variant" [size]="size" [fit]="fit" /></div>',
  }),
};
