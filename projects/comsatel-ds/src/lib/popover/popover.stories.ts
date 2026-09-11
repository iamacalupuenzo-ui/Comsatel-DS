import type { Meta, StoryObj } from '@storybook/angular';
import { Popover } from './popover';

const meta: Meta<Popover> = {
  title: 'Componentes/Popover',
  component: Popover,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<Popover>;

const renderPopover = (args: any) => ({
  props: args,
  template: `
    <button #trigger type="button" style="padding: 8px 12px;">Abrir popover</button>
    <cs-popover [isOpen]="isOpen" [triggerRef]="trigger" [placement]="placement" [ariaLabel]="ariaLabel" [matchTriggerWidth]="matchTriggerWidth">
      <div style="width: 220px; padding: 16px;">Detalle breve del dispositivo.</div>
    </cs-popover>`,
});

export const Default: Story = {
  args: { isOpen: true, placement: 'bottom-start', ariaLabel: 'Detalle del dispositivo' },
  render: renderPopover,
};

export const RightEnd: Story = {
  args: { isOpen: true, placement: 'right-end', ariaLabel: 'Detalle del dispositivo' },
  render: renderPopover,
};

export const MatchTriggerWidth: Story = {
  args: { isOpen: true, placement: 'bottom-start', matchTriggerWidth: true, ariaLabel: 'Opciones de recorrido' },
  render: renderPopover,
};
