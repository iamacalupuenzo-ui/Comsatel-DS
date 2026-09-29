import type { Meta, StoryObj } from '@storybook/angular';
import { Banner } from './banner';

// Banner usa <ng-content> para el cuerpo (no un @Input) — por eso cada
// story define su propio `template` en vez de dejar que Storybook infiera
// el markup solo desde los args.
const meta: Meta<Banner> = {
  title: 'Componentes/Banner',
  component: Banner,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['brand', 'neutral', 'danger', 'success', 'warning'],
    },
  },
  args: {
    variant: 'brand',
    title: 'Título del banner',
    icon: true,
    dismissible: false,
  },
  render: (args) => ({
    props: args,
    template: `<cs-banner [variant]="variant" [title]="title" [icon]="icon" [dismissible]="dismissible">Contenido del mensaje.</cs-banner>`,
  }),
};

export default meta;
type Story = StoryObj<Banner>;

export const Brand: Story = {};

export const Danger: Story = {
  args: { variant: 'danger', title: 'Error al guardar' },
};

export const Success: Story = {
  args: { variant: 'success', title: 'Cambios guardados' },
};

export const Warning: Story = {
  args: { variant: 'warning', title: 'Revisa antes de continuar' },
};

export const Dismissible: Story = {
  args: { dismissible: true },
};

export const WithAction: Story = {
  render: (args) => ({
    props: args,
    template: `<cs-banner [variant]="variant" [title]="title" [action]="{ label: 'Ver detalle' }">Contenido con acción.</cs-banner>`,
  }),
};

export const WithoutIcon: Story = {
  args: { icon: false },
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <cs-banner variant="brand" title="Brand">Mensaje informativo destacado.</cs-banner>
        <cs-banner variant="neutral" title="Neutral">Mensaje informativo estándar.</cs-banner>
        <cs-banner variant="success" title="Success">Operación completada con éxito.</cs-banner>
        <cs-banner variant="warning" title="Warning">Revisa esto antes de continuar.</cs-banner>
        <cs-banner variant="danger" title="Danger">Ocurrió un error al procesar la solicitud.</cs-banner>
      </div>
    `,
  }),
};
