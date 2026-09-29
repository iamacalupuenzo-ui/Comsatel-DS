import type { Meta, StoryObj } from '@storybook/angular';
import { Header, type HeaderUser } from './header';
const user: HeaderUser = { name: 'Daniel Salas', role: 'Administrador', initials: 'DS' };
const meta: Meta<Header> = { title: 'Componentes/Header', component: Header, tags: ['autodocs'], args: { brand: 'Comsatel', user, notificationCount: 3 } };
export default meta;
type Story = StoryObj<Header>;
export const Default: Story = {};
export const WithoutNotifications: Story = { args: { notificationCount: 0 } };
