import type { Meta, StoryObj } from '@storybook/angular';
import { CardBanner } from './card-banner';

const meta: Meta<CardBanner> = {
  title: 'Componentes/Card/CardBanner',
  component: CardBanner,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'brand', 'destructive', 'warning', 'success'],
    },
  },
  args: {
    variant: 'brand',
    title: 'Proyecto en equipo',
    description: 'Comparte avances y sincroniza cambios de diseño.',
    badgeLabel: 'Nuevo',
    showAvatar: true,
    showBadge: true,
    avatars: [{ initials: 'AB' }, { initials: 'CD' }, { initials: 'EF' }],
  },
};

export default meta;
type Story = StoryObj<CardBanner>;

export const Brand: Story = {};

export const WithoutAvatars: Story = {
  args: { avatars: [] },
};

export const WithoutBadge: Story = {
  args: { showBadge: false },
};

export const AllVariants: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; width: 320px;">
        <cs-card-banner variant="neutral" title="Neutral" description="Descripción del banner." badgeLabel="Label" [avatars]="avatars"></cs-card-banner>
        <cs-card-banner variant="brand" title="Brand" description="Descripción del banner." badgeLabel="Nuevo" [avatars]="avatars"></cs-card-banner>
        <cs-card-banner variant="success" title="Success" description="Descripción del banner." badgeLabel="Activo" [avatars]="avatars"></cs-card-banner>
        <cs-card-banner variant="warning" title="Warning" description="Descripción del banner." badgeLabel="Atención" [avatars]="avatars"></cs-card-banner>
        <cs-card-banner variant="destructive" title="Destructive" description="Descripción del banner." badgeLabel="Urgente" [avatars]="avatars"></cs-card-banner>
      </div>
    `,
  }),
};
