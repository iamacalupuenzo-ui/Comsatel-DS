import type { IconName } from '@iamacalupuenzo-ui/comsatel-ds';

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
  /** Marca visible en el menú: componente nuevo o actualizado y la versión en que ocurrió. Se retira
   * cuando la siguiente versión ya no lo toca, para que la marca siga indicando lo reciente. */
  change?: NavChange;
}

export interface NavChange {
  kind: 'nuevo' | 'actualizado';
  version: string;
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
      { title: 'Guía de instalación', href: '/foundations/installation', icon: 'download' },
      {
        title: 'Tokens',
        href: '/foundations/tokens',
        icon: 'layers',
        children: [
          { title: 'All design tokens', href: '/foundations/tokens' },
          { title: 'Tokens explicados', href: '/foundations/tokens/explained' },
          { title: 'Uso en código', href: '/foundations/tokens/code' },
          { title: 'Uso en diseño', href: '/foundations/tokens/design' },
        ],
      },
      {
        title: 'Color',
        href: '/foundations/color',
        icon: 'palette',
        change: { kind: 'actualizado', version: '0.3.0' },
        children: [
          { title: 'Overview', href: '/foundations/color' },
          { title: 'Color palette', href: '/foundations/color/palette' },
          { title: 'Semantic tokens', href: '/foundations/color/semantic' },
          { title: 'Temas', href: '/foundations/color/themes' },
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
      { title: 'Logos', href: '/foundations/logos', icon: 'image' },
      { title: 'Grids', href: '/foundations/grids', icon: 'layout-grid' },
      { title: 'Layout', href: '/foundations/layout', icon: 'panels-top-left' },
      { title: 'Efectos', href: '/foundations/effects', icon: 'sparkles' },
    ],
  },
  {
    title: 'Formularios y entradas',
    items: [
      { title: 'Button', href: '/components/button', icon: 'mouse-pointer-click' },
      { title: 'Checkbox', href: '/components/checkbox', icon: 'check-square' },
      {
        title: 'Fechas y horas',
        href: '/components/group/dates',
        icon: 'calendar',
        change: { kind: 'actualizado', version: '0.3.8' },
        children: [
          { title: 'Calendar', href: '/components/calendar' },
          { title: 'Date range picker', href: '/components/date-range-picker', change: { kind: 'nuevo', version: '0.3.8' } },
          { title: 'Time picker', href: '/components/time-picker', change: { kind: 'nuevo', version: '0.3.8' } },
          { title: 'Date time picker', href: '/components/datetime-picker' },
          { title: 'Date time range picker', href: '/components/datetime-range-picker' },
        ],
      },
      { title: 'Form field', href: '/components/form-field', icon: 'rows', change: { kind: 'nuevo', version: '0.3.12' } },
      { title: 'Input', href: '/components/input', icon: 'text-cursor-input', change: { kind: 'actualizado', version: '0.3.2' } },
      { title: 'Radio', href: '/components/radio', icon: 'circle-dot' },
      {
        title: 'Selectores',
        href: '/components/group/selectors',
        icon: 'chevrons-up-down',
        change: { kind: 'actualizado', version: '0.3.11' },
        children: [
          { title: 'Dropdown', href: '/components/dropdown', change: { kind: 'actualizado', version: '0.3.10' } },
          { title: 'Select', href: '/components/select', change: { kind: 'actualizado', version: '0.3.11' } },
          { title: 'Autocomplete', href: '/components/autocomplete', change: { kind: 'nuevo', version: '0.3.7' } },
        ],
      },
      { title: 'Textarea', href: '/components/textarea', icon: 'text-cursor-input', change: { kind: 'nuevo', version: '0.3.12' } },
      { title: 'Toggle', href: '/components/toggle', icon: 'toggle-left' },
    ],
  },
  {
    title: 'Imágenes e íconos',
    items: [
      { title: 'Avatar', href: '/components/avatar', icon: 'user' },
    ],
  },
  {
    title: 'Mensajes y estado',
    items: [
      { title: 'Badge', href: '/components/badge', icon: 'badge-check' },
      { title: 'Banner', href: '/components/banner', icon: 'megaphone' },
      { title: 'Progress indicator', href: '/components/progress-indicator', icon: 'loader' },
      { title: 'Skeleton', href: '/components/skeleton', icon: 'loader', change: { kind: 'nuevo', version: '0.3.12' } },
      { title: 'Spotlight', href: '/components/spotlight', icon: 'flashlight' },
      { title: 'Tag', href: '/components/tag', icon: 'tag' },
      { title: 'Toast', href: '/components/toast', icon: 'bell-ring' },
    ],
  },
  {
    title: 'Superposiciones',
    items: [
      { title: 'Modal', href: '/components/modal', icon: 'app-window' },
      { title: 'Popover', href: '/components/popover', icon: 'picture-in-picture-2', change: { kind: 'actualizado', version: '0.3.3' } },
      { title: 'Tooltip', href: '/components/tooltip', icon: 'message-circle' },
    ],
  },
  {
    title: 'Navegación',
    items: [
      { title: 'Header', href: '/components/header', icon: 'panel-top' },
      { title: 'Menu', href: '/components/menu', icon: 'menu' },
      { title: 'Pagination', href: '/components/pagination', icon: 'chevrons-right' },
      { title: 'Tab', href: '/components/tab', icon: 'rows' },
    ],
  },
  {
    title: 'Estructura y datos',
    items: [
      { title: 'Accordion', href: '/components/accordion', icon: 'chevrons-down-up' },
      { title: 'App Layout', href: '/components/app-layout', icon: 'layout-grid' },
      { title: 'Card', href: '/components/card', icon: 'credit-card' },
      { title: 'Fleet unit list', href: '/components/fleet-unit-list', icon: 'truck', change: { kind: 'nuevo', version: '0.3.12' } },
      { title: 'List item', href: '/components/list-item', icon: 'list' },
      {
        title: 'Table',
        href: '/components/table-group',
        icon: 'table-2',
        children: [
          { title: 'Table', href: '/components/table' },
          { title: 'Table tree', href: '/components/table-tree' },
          { title: 'Column manager', href: '/components/column-manager', change: { kind: 'nuevo', version: '0.3.12' } },
        ],
      },
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
