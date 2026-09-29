import type { StorybookConfig } from '@storybook/angular';

// Componentes reales de la librería y composiciones verificadas que consumen
// únicamente su API pública. No incluye páginas completas del catálogo.
const config: StorybookConfig = {
  stories: ['../projects/comsatel-ds/*/src/**/*.stories.ts', '../src/app/pages/motion-demo/collapsible-panel-example.stories.ts'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/angular',
    options: {
      // Builder Vite en vez de Webpack5 (default de @storybook/angular) —
      // el preset de Webpack requiere @angular-devkit/build-angular en
      // tiempo de carga, y ese paquete todavía no publica una versión
      // compatible con Angular 22 (el proyecto ya usa el builder moderno
      // @angular/build, sin @angular-devkit/build-angular instalado).
      builder: '@storybook/builder-vite',
    },
  },
};

export default config;
