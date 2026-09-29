import type { Meta, StoryObj } from '@storybook/angular';
import { Stat } from './stat';

const meta: Meta<Stat> = {
  title: 'Componentes/Stat',
  component: Stat,
  tags: ['autodocs'],
  argTypes: {
    trend: { control: 'select', options: ['up-is-good', 'down-is-good', 'neutral'] },
    size: { control: 'select', options: ['lg', 'sm'] },
  },
  args: { label: 'Listas para captura', value: 42, delta: 5, trend: 'up-is-good', size: 'lg', caption: 'vs. hace una semana' },
  render: (args) => ({
    props: args,
    template: `<div style="max-width: 280px"><cs-stat [label]="label" [value]="value" [delta]="delta" [trend]="trend" [size]="size" [caption]="caption" /></div>`,
  }),
};

export default meta;
type Story = StoryObj<Stat>;

export const UpIsGood: Story = {};
export const UpIsBad: Story = { args: { label: 'Requieren revisión', value: 12, delta: 3, trend: 'down-is-good' } };
export const Small: Story = { args: { label: 'Con GPS', value: 318, delta: null, caption: '', size: 'sm' } };
