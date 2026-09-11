import type { Meta, StoryObj } from '@storybook/angular';
import { Header, type HeaderNavItem, type HeaderUser } from './header';

const navigation: HeaderNavItem[] = [
  { id: 'inicio', label: 'Inicio', active: true },
  { id: 'operaciones', label: 'Operaciones' },
  { id: 'reportes', label: 'Reportes' },
];
const user: HeaderUser = { name: 'Daniel Salas', role: 'Administrador', initials: 'DS' };
const meta: Meta<Header> = { title: 'Componentes/Header', component: Header, tags: ['autodocs'], args: { brand: 'Comsatel', navigation, user, notificationCount: 3 } };
export default meta;
type Story = StoryObj<Header>;
export const Default: Story = {};
export const WithoutNavigation: Story = { args: { navigation: [] } };
export const WithoutNotifications: Story = { args: { notificationCount: 0 } };
