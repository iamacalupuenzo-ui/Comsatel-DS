import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { DateTimeRangePicker } from '../datetime-range-picker/datetime-range-picker';
import { DateTimePicker } from './datetime-picker';

const meta: Meta<DateTimePicker> = {
  title: 'Componentes/Date time picker',
  component: DateTimePicker,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [DateTimeRangePicker] })],
  args: { dateLabel: 'Fecha', timeLabel: 'Hora', size: 'md', disabled: false, invalid: false, errorMessage: '' },
  argTypes: { size: { control: 'select', options: ['sm', 'md', 'lg'] } },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 560px; min-height: 420px">
        <cs-datetime-picker aria-label="Fecha y hora de la captura" [dateLabel]="dateLabel" [timeLabel]="timeLabel" [size]="size" [disabled]="disabled" [invalid]="invalid" [errorMessage]="errorMessage" />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<DateTimePicker>;

export const Default: Story = {};
export const WithValue: Story = {
  render: () => ({ template: `<div style="max-width: 560px; min-height: 420px"><cs-datetime-picker aria-label="Fecha y hora" [value]="{ date: '2026-09-27', time: '16:56' }" /></div>` }),
};
export const Invalid: Story = { args: { invalid: true, errorMessage: 'Selecciona la hora de la captura.' } };
export const Range: Story = {
  render: () => ({ template: `<div style="max-width: 760px; min-height: 420px"><cs-datetime-range-picker aria-label="Periodo de la bitácora" [value]="{ startDate: '2026-09-27', endDate: '2026-09-28', startTime: '08:00', endTime: '18:30' }" /></div>` }),
};
