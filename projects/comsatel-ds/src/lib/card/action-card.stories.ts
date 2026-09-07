import type { Meta, StoryObj } from '@storybook/angular';
import { ActionCard } from './action-card';

const meta: Meta<ActionCard> = {
  title: 'Componentes/Card/ActionCard',
  component: ActionCard,
  tags: ['autodocs'],
  args: {
    title: 'Notificaciones por correo',
    description: 'Recibe un resumen diario de la actividad de tu cuenta.',
    showLogo: false,
    showToggle: false,
    showButton: true,
    buttonLabel: 'Configurar',
    showLabel: false,
  },
};

export default meta;
type Story = StoryObj<ActionCard>;

export const WithButton: Story = {};

export const WithToggle: Story = {
  args: { showButton: false, showToggle: true, toggleChecked: true },
};

export const WithLabel: Story = {
  args: { showButton: false, showLabel: true, label: 'Próximamente' },
};

export const WithLogo: Story = {
  args: { showLogo: true },
  render: (args) => ({
    props: args,
    template: `<cs-action-card [title]="title" [description]="description" [showLogo]="showLogo" [showButton]="showButton" [buttonLabel]="buttonLabel"><div logo style="width: 32px; height: 32px; border-radius: var(--radius-sm); background: var(--color-background-brand-subtle);"></div></cs-action-card>`,
  }),
};
