import type { Meta, StoryObj } from '@storybook/angular';
import {
  ProgressIndicator,
  ProgressIndicatorStep,
} from './progress-indicator';

const steps: ProgressIndicatorStep[] = [
  { id: 'inicio', label: 'Inicio', description: 'Información', state: 'done' },
  { id: 'revision', label: 'Revisión', description: 'Validación', state: 'active' },
  { id: 'completo', label: 'Completado', description: 'Confirmación', state: 'pending' },
];

const meta: Meta<ProgressIndicator> = {
  title: 'Componentes/Progress indicator',
  component: ProgressIndicator,
  tags: ['autodocs'],
  args: {
    steps,
    orientation: 'horizontal',
    interactive: false,
    ariaLabel: 'Progreso',
  },
};

export default meta;
type Story = StoryObj<ProgressIndicator>;

export const Default: Story = {};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
};

export const Interactive: Story = {
  args: { interactive: true },
};
