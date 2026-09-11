import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { AppLayout } from './app-layout';
import { Icon } from '../icons/icon';

const meta: Meta<AppLayout> = {
  title: 'Patrones/App Layout',
  component: AppLayout,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [AppLayout, Icon],
    }),
  ],
  argTypes: {
    hasPanel: { control: 'boolean' },
    showCollapseButton: { control: 'boolean' },
  },
  args: {
    hasPanel: true,
    showCollapseButton: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="story-frame">
        <cs-app-layout [hasPanel]="hasPanel" [showCollapseButton]="showCollapseButton">
          <header topnav class="story-topnav">
            <span class="story-brand">Mi producto</span>
          </header>
          <nav sidenav aria-label="Navegación del producto" class="story-sidenav">
            <button type="button"><cs-icon name="layout-grid" [size]="16" />Resumen</button>
            <button type="button"><cs-icon name="table-2" [size]="16" />Reportes</button>
          </nav>
          <main class="story-main">Contenido de la vista actual</main>
          <aside panel class="story-panel">Panel contextual</aside>
        </cs-app-layout>
      </div>
    `,
    styles: [`
      .story-frame { position: relative; height: 420px; overflow: hidden; transform: translateZ(0); border: var(--layout-border-thin) solid var(--color-border-neutral-subtle); border-radius: var(--radius-lg); }
      .story-topnav { display: flex; align-items: center; height: 100%; font-weight: var(--font-weight-emphasis); }
      .story-sidenav { display: flex; flex-direction: column; gap: var(--layout-gap-xs); }
      .story-sidenav button { display: flex; align-items: center; gap: var(--layout-gap-sm); border: 0; border-radius: var(--radius-sm); padding: var(--layout-padding-sm) var(--layout-padding-md); background: transparent; color: var(--color-text-base-subtle); font: inherit; text-align: left; }
      .story-sidenav button:focus-visible { outline: none; box-shadow: 0 0 0 var(--layout-border-thick) var(--elevation-surface-default), 0 0 0 var(--layout-border-thicker) var(--color-border-focused); }
      .story-main { padding: var(--layout-padding-2xl); color: var(--color-text-base-subtle); }
      .story-panel { padding: var(--layout-padding-lg); color: var(--color-text-base-subtle); }
    `],
  }),
};

export default meta;
type Story = StoryObj<AppLayout>;

export const Default: Story = {};

export const WithoutPanel: Story = {
  args: { hasPanel: false },
};

export const WithoutCollapseButton: Story = {
  args: { showCollapseButton: false },
};
