import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Button } from '../button/button';
import { EmptyState } from './empty-state';

const meta: Meta<EmptyState> = {
  title: 'Componentes/Empty state',
  component: EmptyState,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [Button] })],
  args: { icon: 'file-text', title: 'No encontramos capturas', description: 'Prueba con otra orden, unidad o estado.' },
  render: (args) => ({
    props: args,
    template: `<cs-empty-state [icon]="icon" [title]="title" [description]="description"><cs-button variant="default" size="sm">Limpiar filtros</cs-button></cs-empty-state>`,
  }),
};

export default meta;
type Story = StoryObj<EmptyState>;

export const WithAction: Story = {};
export const WithoutIcon: Story = { args: { icon: undefined } };
