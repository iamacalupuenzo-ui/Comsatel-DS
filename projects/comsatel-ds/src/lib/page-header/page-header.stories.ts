import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { Button } from '../button/button';
import { PageHeader } from './page-header';

const meta: Meta<PageHeader> = {
  title: 'Componentes/Page header',
  component: PageHeader,
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [Button] })],
  args: { title: 'Capturas', description: 'Consulta y gestiona las órdenes de captura registradas para las unidades.', titleId: 'capture-title' },
  render: (args) => ({
    props: args,
    template: `
      <cs-page-header [title]="title" [description]="description" [titleId]="titleId">
        <cs-button variant="default" size="sm">Historial de cargas</cs-button>
        <cs-button variant="primary" size="sm">Carga masiva de capturas</cs-button>
      </cs-page-header>
    `,
  }),
};

export default meta;
type Story = StoryObj<PageHeader>;

export const WithActions: Story = {};
export const WithoutDescription: Story = { args: { description: '' } };
