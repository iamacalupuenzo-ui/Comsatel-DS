import type { Preview } from '@storybook/angular';

// Los estilos globales (tokens.css, typography-tokens.css, fuentes) NO se
// importan acá — ya están declarados en el target Angular "storybook-build"
// (angular.json > architect.storybook-build.options.styles), que es donde
// el builder de Storybook los inyecta realmente. Un import directo de
// '../projects/comsatel-ds/src/styles/index.css' en este archivo rompe el
// build (Storybook no tiene loader de CSS configurado para ese entry).

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#111827' },
      ],
    },
  },
};

export default preview;
