import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { Popover } from './popover';
import { Modal } from '../modal/modal';
import { Select } from '../select/select';

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

export const DentroDeUnModal: Story = {
  name: 'Dentro de un modal',
  decorators: [moduleMetadata({ imports: [Modal, Select] })],
  render: () => ({
    props: {
      isOpen: true,
      value: undefined as string | string[] | undefined,
      options: [
        { label: 'Mantener decisión', value: 'keep' },
        { label: 'Revisar captura', value: 'review' },
      ],
    },
    template: `
      <cs-modal [isOpen]="isOpen" title="Revisión de captura" (closed)="isOpen = false">
        <cs-select label="Decisión" [options]="options" [value]="value" (valueChange)="value = $event" />
      </cs-modal>
    `,
  }),
};
