import type { Meta, StoryObj } from '@storybook/angular';
import { PasswordInput } from './password-input';

const meta: Meta<PasswordInput> = {
  title: 'Componentes/Input/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  args: {
    ariaLabel: 'Password',
    autocomplete: 'current-password',
    placeholder: 'Enter your password',
  },
};

export default meta;
type Story = StoryObj<PasswordInput>;

export const Default: Story = {};

export const WithoutLeadingIcon: Story = {
  args: { leadingIcon: null },
};

export const Invalid: Story = {
  args: { invalid: true, value: 'invalid-password' },
};

export const Disabled: Story = {
  args: { disabled: true, value: 'disabled-password' },
};
