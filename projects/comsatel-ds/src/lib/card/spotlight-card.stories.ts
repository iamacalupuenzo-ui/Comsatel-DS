import type { Meta, StoryObj } from '@storybook/angular';
import { SpotlightCard } from './spotlight-card';

const meta: Meta<SpotlightCard> = {
  title: 'Componentes/Card/SpotlightCard',
  component: SpotlightCard,
  tags: ['autodocs'],
  args: {
    title: 'Invita a tu equipo',
    description: 'Comparte avances y sincroniza cambios de diseño.',
    avatars: [],
  },
  render: (args) => ({
    props: args,
    template: `<div style="width: 320px;"><cs-spotlight-card [title]="title" [description]="description" [avatars]="avatars"></cs-spotlight-card></div>`,
  }),
};

export default meta;
type Story = StoryObj<SpotlightCard>;

export const Placeholders: Story = {};

export const WithAvatars: Story = {
  args: {
    avatars: ['https://i.pravatar.cc/80?img=5', 'https://i.pravatar.cc/80?img=6'],
  },
};
