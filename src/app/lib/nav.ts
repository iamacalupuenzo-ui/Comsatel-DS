import type { IconName } from 'comsatel-ds';

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
  /** Nombre de ícono del registro curado. Tipado contra `IconName` (no un
   * `string` suelto) para que un nombre que no exista en el registro sea
   * un error de compilación, no un ícono vacío en silencio. Solo en el
   * nivel raíz, igual que en React: es lo único visible si el sidebar
   * alguna vez suma un modo rail/colapsado. Los hijos no llevan ícono
   * propio. */
  icon?: IconName;
  children?: NavItem[];
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const NAVIGATION: NavSection[] = [
  {
    title: 'Seguimiento temporal',
    items: [
      { title: 'Estado de evaluación', href: '/tracking/evaluation', icon: 'check-square' },
    ],
  },
  {
    title: 'Fundamentos',
    items: [
      {
        title: 'Tokens',
        href: '/foundations/tokens',
        icon: 'layers',
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
        icon: 'palette',
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
        icon: 'type',
        children: [
          { title: 'Fundamentos', href: '/foundations/typography' },
          { title: 'Tokens tipográficos', href: '/foundations/typography/tokens' },
        ],
      },
      {
        title: 'Espaciado',
        href: '/foundations/spacing',
        icon: 'ruler',
        children: [
          { title: 'Fundamentos', href: '/foundations/spacing' },
          { title: 'Tokens de espaciado', href: '/foundations/spacing/tokens' },
        ],
      },
      { title: 'Radios', href: '/foundations/radius', icon: 'square' },
      { title: 'Íconos', href: '/foundations/icons', icon: 'shapes' },
      { title: 'Logos', href: '/foundations/logos', pending: true, icon: 'image' },
      { title: 'Grids', href: '/foundations/grids', pending: true, icon: 'layout-grid' },
      { title: 'Layout', href: '/foundations/layout', icon: 'panels-top-left' },
      { title: 'Efectos', href: '/foundations/effects', icon: 'sparkles' },
    ],
  },
  {
    title: 'Componentes',
    items: [
      { title: 'Accordion', href: '/components/accordion', icon: 'chevrons-down-up' },
      { title: 'App Layout', href: '/components/app-layout', icon: 'layout-grid' },
      { title: 'Avatar', href: '/components/avatar', icon: 'user' },
      { title: 'Badge', href: '/components/badge', icon: 'badge-check' },
      { title: 'Banner', href: '/components/banner', icon: 'megaphone' },
      { title: 'Button', href: '/components/button', icon: 'mouse-pointer-click' },
      { title: 'Calendar', href: '/components/calendar', icon: 'calendar' },
      { title: 'Card', href: '/components/card', icon: 'credit-card' },
      { title: 'Checkbox', href: '/components/checkbox', icon: 'check-square' },
      { title: 'Date time picker', href: '/components/datetime-picker', icon: 'calendar-clock' },
      { title: 'Date time range picker', href: '/components/datetime-range-picker', icon: 'calendar-range' },
      { title: 'Dropdown', href: '/components/dropdown', icon: 'chevron-down' },
      { title: 'Header', href: '/components/header', pending: true, icon: 'panel-top' },
      { title: 'Input', href: '/components/input', icon: 'text-cursor-input' },
      { title: 'List item', href: '/components/list-item', pending: true, icon: 'list' },
      { title: 'Menu', href: '/components/menu', icon: 'menu' },
      { title: 'Modal', href: '/components/modal', icon: 'app-window' },
      { title: 'Pagination', href: '/components/pagination', icon: 'chevrons-right' },
      { title: 'Popover', href: '/components/popover', icon: 'picture-in-picture-2' },
      { title: 'Progress indicator', href: '/components/progress-indicator', icon: 'loader' },
      { title: 'Radio', href: '/components/radio', icon: 'circle-dot' },
      { title: 'Select', href: '/components/select', icon: 'chevrons-up-down' },
      { title: 'Spotlight', href: '/components/spotlight', icon: 'flashlight' },
      { title: 'Stepper', href: '/components/stepper', pending: true, icon: 'list-ordered' },
      { title: 'Tab', href: '/components/tab', icon: 'rows' },
      {
        title: 'Table',
        href: '/components/table',
        icon: 'table-2',
        children: [
          { title: 'Table', href: '/components/table' },
          { title: 'Table tree', href: '/components/table-tree' },
        ],
      },
      { title: 'Tag', href: '/components/tag', icon: 'tag' },
      { title: 'Toast', href: '/components/toast', icon: 'bell-ring' },
      { title: 'Toggle', href: '/components/toggle', icon: 'toggle-left' },
      { title: 'Tooltip', href: '/components/tooltip', icon: 'message-circle' },
    ],
  },
  {
    title: 'Mapa',
    items: [
      { title: 'Tema del mapa', href: '/map/theme', icon: 'map-pin' },
      { title: 'Marcadores', href: '/map/markers', icon: 'locate-fixed' },
    ],
  },
  {
    title: 'Animaciones',
    items: [
      { title: 'Motion tokens', href: '/animations/tokens', icon: 'timer' },
      { title: 'Motion', href: '/animations/motion', icon: 'wand-2' },
      { title: 'PressScale', href: '/animations/press-scale', icon: 'mouse-pointer-click' },
    ],
  },
];
