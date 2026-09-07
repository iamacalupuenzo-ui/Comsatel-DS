import type { Meta, StoryObj } from '@storybook/angular';
import { AvatarLabel } from './avatar-label';

const meta: Meta<AvatarLabel> = {
  title: 'Componentes/Avatar/AvatarLabel',
  component: AvatarLabel,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md'],
    },
    status: {
      control: 'select',
      options: [undefined, 'offline', 'online', 'busy', 'company'],
    },
  },
  args: {
    size: 'sm',
    initials: 'EM',
    name: 'Enzo Macalupu',
    subtitle: 'DesignOps',
  },
};

export default meta;
type Story = StoryObj<AvatarLabel>;

export const Default: Story = {};

export const WithStatus: Story = {
  args: { status: 'online' },
};

export const WithoutSubtitle: Story = {
  args: { subtitle: undefined },
};

export const AllSizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <cs-avatar-label size="xs" [initials]="initials" [name]="name" [subtitle]="subtitle"></cs-avatar-label>
        <cs-avatar-label size="sm" [initials]="initials" [name]="name" [subtitle]="subtitle"></cs-avatar-label>
        <cs-avatar-label size="md" [initials]="initials" [name]="name" [subtitle]="subtitle"></cs-avatar-label>
      </div>
    `,
  }),
};
