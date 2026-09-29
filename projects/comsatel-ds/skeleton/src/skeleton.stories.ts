import type { Meta, StoryObj } from '@storybook/angular';
import { Skeleton } from './skeleton';

const meta: Meta<Skeleton> = {
  title: 'Primitivos/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  args: { variant: 'text', width: '14rem' },
  argTypes: { variant: { control: 'select', options: ['text', 'rectangle', 'circle'] } },
};

export default meta;
type Story = StoryObj<Skeleton>;

export const Text: Story = {};
export const Rectangle: Story = { args: { variant: 'rectangle', width: '18rem', height: '7rem' } };
export const Circle: Story = { args: { variant: 'circle', height: 40 } };
export const ProfilePlaceholder: Story = {
  render: () => ({ template: '<div style="display:flex; align-items:center; gap:12px"><cs-skeleton variant="circle" [height]="40"></cs-skeleton><div style="display:grid; gap:8px; width:180px"><cs-skeleton width="70%"></cs-skeleton><cs-skeleton width="100%"></cs-skeleton></div></div>' }),
};
