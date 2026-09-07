import type { StorybookConfig } from '@storybook/angular';

// Apunta a la librería comsatel-ds — nunca a la app de documentación
// (src/app). La app sigue siendo el sitio de referencia del sistema de
// diseño en español; Storybook documenta/prueba los componentes reales de
// la librería de forma aislada.
const config: StorybookConfig = {
  stories: ['../projects/comsatel-ds/src/lib/**/*.stories.ts'],
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
