// Estructura de navegación — calco 1:1 de nav.ts en el sistema de diseño
// React (mismo orden, mismos hijos, incluidos los links a páginas que ni
// siquiera existen todavía en React — "Tokens explained"/"Use in code"/
// "Use in design" — para que el mapa de la plataforma quede completo y
// honesto en las dos plataformas, no solo en la que ya tiene más avance.
export interface NavItem {
  title: string;
  href: string;
  /** Todavía no construida en ESTA plataforma (Angular) — se lista para
   * mostrar el mapa completo, pero no es un link real todavía. */
  pending?: boolean;
  children?: NavItem[];
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const NAVIGATION: NavSection[] = [
  {
    title: 'Fundamentos',
    items: [
      {
        title: 'Tokens',
        href: '/foundations/tokens',
        children: [
          { title: 'All design tokens', href: '/foundations/tokens' },
          { title: 'Tokens explained', href: '/foundations/tokens/explained', pending: true },
          { title: 'Use in code', href: '/foundations/tokens/code', pending: true },
          { title: 'Use in design', href: '/foundations/tokens/design', pending: true },
        ],
      },
      {
        title: 'Color',
        href: '/foundations/color',
        children: [
          { title: 'Overview', href: '/foundations/color' },
          { title: 'Color palette', href: '/foundations/color/palette' },
          { title: 'Semantic tokens', href: '/foundations/color/semantic' },
          { title: 'Themes', href: '/foundations/color/themes', pending: true },
        ],
      },
      {
        title: 'Tipografía',
        href: '/foundations/typography',
        children: [
          { title: 'Fundamentos', href: '/foundations/typography' },
          { title: 'Tokens tipográficos', href: '/foundations/typography/tokens' },
        ],
      },
      {
        title: 'Espaciado',
        href: '/foundations/spacing',
        children: [
          { title: 'Fundamentos', href: '/foundations/spacing' },
          { title: 'Tokens de espaciado', href: '/foundations/spacing/tokens' },
        ],
      },
      { title: 'Radios', href: '/foundations/radius' },
      { title: 'Íconos', href: '/foundations/icons' },
      { title: 'Logos', href: '/foundations/logos', pending: true },
      { title: 'Grids', href: '/foundations/grids', pending: true },
      { title: 'Efectos', href: '/foundations/effects' },
    ],
  },
  {
    title: 'Componentes',
    items: [
      { title: 'Avatar', href: '/components/avatar' },
      { title: 'Badge', href: '/components/badge' },
      { title: 'Banner', href: '/components/banner' },
      { title: 'Button', href: '/components/button' },
      { title: 'Calendar', href: '/components/calendar' },
      { title: 'Card', href: '/components/card' },
      { title: 'Checkbox', href: '/components/checkbox' },
      { title: 'Date time picker', href: '/components/datetime-picker' },
      { title: 'Dropdown', href: '/components/dropdown' },
      { title: 'Header', href: '/components/header', pending: true },
      { title: 'Input', href: '/components/input' },
      { title: 'List item', href: '/components/list-item', pending: true },
      { title: 'Menu', href: '/components/menu', pending: true },
      { title: 'Modal', href: '/components/modal', pending: true },
      { title: 'Progress indicator', href: '/components/progress-indicator', pending: true },
      { title: 'Radio', href: '/components/radio', pending: true },
      { title: 'Stepper', href: '/components/stepper', pending: true },
      { title: 'Tab', href: '/components/tab', pending: true },
      { title: 'Tag', href: '/components/tag', pending: true },
      { title: 'Toast', href: '/components/toast', pending: true },
      { title: 'Toggle', href: '/components/toggle' },
      { title: 'Tooltip', href: '/components/tooltip' },
    ],
  },
];
