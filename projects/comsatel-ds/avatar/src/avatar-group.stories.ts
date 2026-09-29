import type { Meta, StoryObj } from '@storybook/angular';
import { AvatarGroup } from './avatar-group';

const meta: Meta<AvatarGroup> = {
  title: 'Componentes/Avatar/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md'],
    },
  },
  args: {
    size: 'sm',
    avatars: [
      { initials: 'AB' },
      { initials: 'CD' },
      { initials: 'EF' },
      { initials: 'GH' },
    ],
    maxVisible: 3,
    showAddButton: true,
  },
};

export default meta;
type Story = StoryObj<AvatarGroup>;

export const Default: Story = {};

export const WithoutAddButton: Story = {
  args: { showAddButton: false },
};

export const WithoutOverflow: Story = {
  args: {
    avatars: [{ initials: 'AB' }, { initials: 'CD' }],
    maxVisible: 3,
  },
};

export const AllSizes: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; align-items: center; gap: 24px;">
        <cs-avatar-group size="xs" [avatars]="avatars" [maxVisible]="3"></cs-avatar-group>
        <cs-avatar-group size="sm" [avatars]="avatars" [maxVisible]="3"></cs-avatar-group>
        <cs-avatar-group size="md" [avatars]="avatars" [maxVisible]="3"></cs-avatar-group>
      </div>
    `,
  }),
};
