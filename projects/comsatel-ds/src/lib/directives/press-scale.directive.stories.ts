import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Button } from '../button/button';
import { PressScale } from './press-scale.directive';

// PressScale es una directiva de comportamiento y requiere un control real
// como anfitrión. Esta misma composición se verificó antes en la ficha Angular.
const meta: Meta = {
  title: 'Componentes/PressScale',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [Button, PressScale] })],
};

export default meta;
type Story = StoryObj;

export const Boton: Story = {
  render: () => ({
    template: '<cs-button csPressScale>Guardar cambios</cs-button>',
  }),
};
