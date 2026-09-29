import type { Meta, StoryObj } from '@storybook/angular';
import { FeatureSpotlightCard } from './feature-spotlight-card';

const meta: Meta<FeatureSpotlightCard> = {
  title: 'Componentes/Card/FeatureSpotlightCard',
  component: FeatureSpotlightCard,
  tags: ['autodocs'],
  args: {
    avatars: [],
  },
  render: (args) => ({
    props: args,
    template: `<div style="width: 320px; height: 220px; position: relative;"><cs-feature-spotlight-card [avatars]="avatars"></cs-feature-spotlight-card></div>`,
  }),
};

export default meta;
type Story = StoryObj<FeatureSpotlightCard>;

export const Placeholders: Story = {};

export const WithAvatars: Story = {
  args: {
    avatars: [
      'https://i.pravatar.cc/80?img=1',
      'https://i.pravatar.cc/80?img=2',
      'https://i.pravatar.cc/80?img=3',
    ],
  },
};
