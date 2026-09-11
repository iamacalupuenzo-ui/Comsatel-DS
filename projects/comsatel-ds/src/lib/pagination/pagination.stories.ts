import type { Meta, StoryObj } from '@storybook/angular';
import { Pagination } from './pagination';

const meta: Meta<Pagination> = {
  title: 'Componentes/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['numbered', 'simple'] },
  },
  args: {
    totalPages: 10,
    page: 4,
    variant: 'numbered',
  },
};

export default meta;
type Story = StoryObj<Pagination>;

export const Numbered: Story = {};

export const Simple: Story = {
  args: { variant: 'simple' },
};

export const LargeSet: Story = {
  args: { totalPages: 40, page: 18 },
};
