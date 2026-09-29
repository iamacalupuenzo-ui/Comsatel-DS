import type { Meta, StoryObj } from '@storybook/angular';
import { Stepper, type StepperStep } from './stepper';

const steps: StepperStep[] = [
  { id: 'asignado', label: 'Asignado', description: '08:00', state: 'done' },
  { id: 'recogida', label: 'Recogida', description: '08:45', state: 'active' },
  { id: 'transito', label: 'En tránsito', description: 'En ruta', state: 'pending' },
  { id: 'entregado', label: 'Entregado', description: 'Pendiente', state: 'pending' },
];

const meta: Meta<Stepper> = {
  title: 'Componentes/Stepper', component: Stepper, tags: ['autodocs'],
  args: { steps, orientation: 'horizontal', interactive: false, ariaLabel: 'Estado del recorrido' },
};

export default meta;
type Story = StoryObj<Stepper>;
export const Default: Story = {};
export const Vertical: Story = { args: { orientation: 'vertical' } };
export const Interactive: Story = { args: { interactive: true } };
