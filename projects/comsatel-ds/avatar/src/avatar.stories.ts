import type { Meta, StoryObj } from '@storybook/angular';
import { Avatar } from './avatar';

const meta: Meta<Avatar> = {
  title: 'Componentes/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    status: {
      control: 'select',
      options: [undefined, 'offline', 'online', 'busy', 'company'],
    },
  },
  args: {
    size: 'md',
    alt: 'Nombre de usuario',
  },
};

export default meta;
type Story = StoryObj<Avatar>;

export const Placeholder: Story = {};

export const WithInitials: Story = {
  args: { initials: 'EM' },
};

export const WithImage: Story = {
  args: { src: 'https://i.pravatar.cc/150?img=12' },
};

export const WithStatus: Story = {
  args: { initials: 'EM', status: 'online' },
};

// `showPlaceholderIcon`/`placeholderBg` no tienen demo propia como Avatar
// suelto — son de uso interno exclusivo de CardBanner/FeatureSpotlightCard
// (ver Componentes/Card), que es donde el sistema real los usa y muestra.

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 12px;">
        <cs-avatar size="xs" initials="XS"></cs-avatar>
        <cs-avatar size="sm" initials="SM"></cs-avatar>
        <cs-avatar size="md" initials="MD"></cs-avatar>
        <cs-avatar size="lg" initials="LG"></cs-avatar>
        <cs-avatar size="xl" initials="XL"></cs-avatar>
      </div>
    `,
  }),
};

export const AllStatuses: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 12px;">
        <cs-avatar initials="OF" status="offline"></cs-avatar>
        <cs-avatar initials="ON" status="online"></cs-avatar>
        <cs-avatar initials="BU" status="busy"></cs-avatar>
        <cs-avatar initials="CO" status="company"></cs-avatar>
      </div>
    `,
  }),
};
