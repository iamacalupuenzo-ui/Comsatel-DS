import type { Meta, StoryObj } from '@storybook/angular';
import { Toast } from './toast';

const meta: Meta<Toast> = {
  title: 'Componentes/Toast',
  component: Toast,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<Toast>;

export const Default: Story = {
  args: { title: 'Nueva versión publicada', description: 'Actualiza para ver los cambios.' },
};

export const SuccessWithAction: Story = {
  args: {
    variant: 'success',
    title: 'Tarea creada correctamente',
    description: 'START-42 se agregó al backlog.',
    actions: [{ label: 'Ver tarea' }],
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Esta página es visible externamente',
    description: 'Verifica el contenido antes de publicar.',
    actions: [{ label: 'Revisar' }],
  },
};
