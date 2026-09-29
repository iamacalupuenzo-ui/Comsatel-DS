import type { Meta, StoryObj } from '@storybook/angular';
import { SideDrawer } from './side-drawer';

const meta: Meta<SideDrawer> = {
  title: 'Componentes/Side drawer',
  component: SideDrawer,
  tags: ['autodocs'],
  argTypes: {
    surface: { control: 'select', options: ['default', 'canvas'] },
  },
  args: {
    isOpen: true,
    title: 'Recupero REC-0142',
    surface: 'default',
    width: 560,
    closeLabel: 'Cerrar',
    closeOnOverlayClick: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <cs-side-drawer
        [isOpen]="isOpen"
        [title]="title"
        [surface]="surface"
        [width]="width"
        [closeLabel]="closeLabel"
        [closeOnOverlayClick]="closeOnOverlayClick"
        [primaryAction]="primaryAction"
        [secondaryAction]="secondaryAction"
      >
        <p style="margin: 0">Placa BAB711 · Pacífico Seguros · En gestión desde el 27 sep. 2026.</p>
      </cs-side-drawer>
    `,
  }),
};

export default meta;
type Story = StoryObj<SideDrawer>;

export const Detail: Story = {};
export const Form: Story = {
  args: {
    title: 'Editar recupero',
    surface: 'canvas',
    primaryAction: { label: 'Guardar', icon: 'check' },
    secondaryAction: { label: 'Cancelar' },
  },
};
export const Saving: Story = {
  args: {
    title: 'Editar recupero',
    primaryAction: { label: 'Guardar', icon: 'check', loading: true },
    secondaryAction: { label: 'Cancelar', disabled: true },
  },
};
