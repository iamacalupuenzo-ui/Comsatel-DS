import type { Meta, StoryObj } from '@storybook/angular';
import { AvatarAddButton } from './avatar-add-button';

const meta: Meta<AvatarAddButton> = {
  title: 'Componentes/Avatar/AvatarAddButton',
  component: AvatarAddButton,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md'],
    },
  },
  args: {
    size: 'sm',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<AvatarAddButton>;

export const Default: Story = {};

export const Hover: Story = {
  args: { forceHover: true },
};

export const Focus: Story = {
  args: { forceFocus: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AllStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; align-items: center; gap: 12px;">
        <cs-avatar-add-button></cs-avatar-add-button>
        <cs-avatar-add-button [forceHover]="true"></cs-avatar-add-button>
        <cs-avatar-add-button [forceFocus]="true"></cs-avatar-add-button>
        <cs-avatar-add-button [disabled]="true"></cs-avatar-add-button>
      </div>
    `,
  }),
};
