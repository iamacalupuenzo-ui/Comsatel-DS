import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Button } from '../button/button';
import { Spotlight } from './spotlight';

// Spotlight proyecta el target con <ng-content>; cada historia refleja una
// composición ya comprobada en la página de documentación.
const meta: Meta<Spotlight> = {
  title: 'Componentes/Spotlight',
  component: Spotlight,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [Button] })],
  args: {
    isVisible: true,
    placement: 'bottom',
    headline: 'Nuevo: agrupamiento de unidades',
    description: 'Las unidades cercanas se agrupan automáticamente al alejar el zoom.',
    stepCount: '1 de 3',
    primaryActionLabel: 'Entendido',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; justify-content: center; min-height: 220px; padding: var(--layout-padding-4xl);">
        <cs-spotlight
          [isVisible]="isVisible"
          [placement]="placement"
          [headline]="headline"
          [description]="description"
          [stepCount]="stepCount"
          [primaryActionLabel]="primaryActionLabel"
          [secondaryActionLabel]="secondaryActionLabel"
          [dismissible]="dismissible"
          [dismissLabel]="dismissLabel"
        >
          <cs-button variant="primary">Mostrar Spotlight</cs-button>
        </cs-spotlight>
      </div>`,
  }),
};

export default meta;
type Story = StoryObj<Spotlight>;

export const Default: Story = {};

export const Recorrido: Story = {
  args: { headline: 'Paso 2: Agrupamiento', stepCount: '2 de 3', primaryActionLabel: 'Siguiente', secondaryActionLabel: 'Atrás' },
};

export const ConCierre: Story = {
  args: { dismissible: true, dismissLabel: 'Cerrar recorrido' },
};

export const PosicionIzquierda: Story = {
  args: { placement: 'left' },
};
