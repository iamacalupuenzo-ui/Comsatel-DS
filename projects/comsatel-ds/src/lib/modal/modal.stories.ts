import type { Meta, StoryObj } from '@storybook/angular';
import { Modal, type ModalAppearance, type ModalWidthToken } from './modal';

const meta: Meta<Modal> = {
  title: 'Componentes/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    appearance: {
      control: 'select',
      options: ['default', 'warning', 'danger'] satisfies ModalAppearance[],
    },
    width: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'] satisfies ModalWidthToken[],
    },
  },
  args: {
    isOpen: true,
    title: 'Duplicar este recorrido',
    appearance: 'default',
    width: 'md',
    hasCloseButton: true,
    closeLabel: 'Cerrar',
    primaryAction: { label: 'Confirmar' },
    secondaryAction: { label: 'Cancelar' },
  },
  render: (args) => ({
    props: args,
    template: `
      <cs-modal
        [isOpen]="isOpen"
        [title]="title"
        [appearance]="appearance"
        [width]="width"
        [hasCloseButton]="hasCloseButton"
        [closeLabel]="closeLabel"
        [primaryAction]="primaryAction"
        [secondaryAction]="secondaryAction"
      >
        Esto crea una copia del recorrido seleccionado dentro del mismo grupo de flota.
      </cs-modal>
    `,
  }),
};

export default meta;
type Story = StoryObj<Modal>;

export const Default: Story = {};

export const Warning: Story = {
  args: {
    appearance: 'warning',
    title: 'Mover esta unidad a otro grupo',
  },
};

export const Danger: Story = {
  args: {
    appearance: 'danger',
    title: 'Eliminar este recorrido permanentemente',
    primaryAction: { label: 'Eliminar recorrido' },
  },
};

export const WithoutCloseButton: Story = {
  args: {
    hasCloseButton: false,
  },
};

export const LongContent: Story = {
  args: {
    title: 'Política de uso de datos',
    width: 'lg',
    primaryAction: { label: 'Confirmar' },
  },
  render: (args) => ({
    props: args,
    template: `
      <cs-modal
        [isOpen]="isOpen"
        [title]="title"
        [width]="width"
        [primaryAction]="primaryAction"
      >
        <p>El historial GPS de esta unidad se guarda durante 12 meses desde la fecha de reporte.</p>
        <p>Exportar un reporte no elimina el dato subyacente de este historial; solo crea una copia puntual.</p>
        <p>Las grabaciones ligadas a un recorrido siguen una ventana de retención distinta y más corta.</p>
      </cs-modal>
    `,
  }),
};
