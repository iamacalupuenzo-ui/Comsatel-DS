import type { Meta, StoryObj } from '@storybook/angular';
import { Calendar } from './calendar';

const meta: Meta<Calendar> = {
  title: 'Componentes/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  args: {
    defaultMonth: 9,
    defaultYear: 2026,
  },
};

export default meta;
type Story = StoryObj<Calendar>;

export const Default: Story = {};

export const WithSelectedDate: Story = {
  args: { selected: ['2026-09-15'] },
};

export const DateRange: Story = {
  args: { rangeSelected: ['2026-09-10', '2026-09-18'] },
};

export const WithDisabledDates: Story = {
  args: { disabledDates: ['2026-09-05', '2026-09-06', '2026-09-12', '2026-09-13'] },
};

export const MinMaxDate: Story = {
  args: { minDate: '2026-09-08', maxDate: '2026-09-24' },
};

export const WeekStartMonday: Story = {
  args: { weekStartDay: 1, selected: ['2026-09-15'] },
};
